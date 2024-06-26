package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.jwt.service.serviceImpl.JwtServiceImpl;
import com.ssafy.jazz_backend.domain.member.entity.Member;
import com.ssafy.jazz_backend.domain.member.profile.entity.Profile;
import com.ssafy.jazz_backend.domain.member.profile.repository.ProfileRepository;
import com.ssafy.jazz_backend.domain.member.record.entity.Marathon;
import com.ssafy.jazz_backend.domain.member.record.entity.MarathonId;
import com.ssafy.jazz_backend.domain.member.record.entity.Season;
import com.ssafy.jazz_backend.domain.member.record.repository.MarathonJpaRepository;
import com.ssafy.jazz_backend.domain.member.record.repository.SeasonJpaRepository;
import com.ssafy.jazz_backend.domain.member.repository.MemberRepository;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonAndTierQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import com.ssafy.jazz_backend.global.Util;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MarathonServiceImpl implements MarathonService {

    private final Util util;
    private final QuizRepository quizRepository;
    private final JwtServiceImpl jwtService;
    private final MarathonJpaRepository marathonJpaRepository;
    private final SeasonJpaRepository seasonJpaRepository;
    private final MemberRepository memberRepository;
    private final ProfileRepository profileRepository;

    @PersistenceContext
    private final EntityManager entityManager;


    //Sorted Set 을 위한 DI
    //키 : String , Value : String, 스코어는 Double로 고정임
    private final ZSetOperations<String, String> zSetOperations;

    // 마라톤 퀴즈 하나 뽑아서 주기
    @Override
    public MarathonAndTierQuizResponseDto getMarathonQuiz(String accessToken) {
        Integer quizMaxId = getQuizMaxId();
        Integer quizMinId = getQuizMinId();
        Integer randomQuizId = getRandomQuizId(quizMinId, quizMaxId);

        //전체 퀴즈에서 quiz 하나 뽑음
        Quiz quiz = findByRandomQuizId(randomQuizId);
        //1 : 단어형 객관식
        //2 : 단어형 주관식
        //3 : 사례형 객관식

        // 주관식인 경우 -> 보기 1번만 있음 그대로 출력
        // 객관식인 경우 -> 보기 1~4번까지 있음
        //               1번이 정답이니까 일단 정답을 담아 놓고
        //               보기를 랜덤으로 섞어
        //               몇 번이 정답인지 확인
        //               그 상태로 responseDto에 넣어서 보내기

        if (quiz.getKind() == 2) {
            //주관식이니까 1개 짜리 리스트임
            List<Choice> choiceList = quiz.getCases();
            //주관식이니까 1개 짜리 리스트임
            List<String> contentList = getContentList(choiceList);

            return MarathonAndTierQuizResponseDto.create(quiz.getId(), quiz.getQuestion(),
                contentList, 1,
                false, quiz.getKind());

        } else {
            //퀴즈에 대한 보기들 리스트에 담음
            List<Choice> choiceList = quiz.getCases();
            //퀴즈 보기 내용들 리스트 만들기
            List<String> contentList = getContentList(choiceList);
            //해당 퀴즈의 정답 찾기
            String correctAnswer = getCorrectAnswer(quiz);
            //퀴즈 보기 셔플
            Collections.shuffle(contentList);
            //정답 번호 저장
            int correctAnswerIndex = contentList.indexOf(correctAnswer) + 1;

            return MarathonAndTierQuizResponseDto.create(quiz.getId(), quiz.getQuestion(),
                contentList,
                correctAnswerIndex, true, quiz.getKind());
        }
    }


    //마라톤 결과 DB에 적용
    @Transactional
    @Override
    public MarathonResultResponseDto applyMarathonQuizResult(String accessToken,
        MarathonResultRequestDto marathonResultRequestDto) {
        String userUUID = jwtService.getInfo("account", accessToken);
        //uuid를 통해 member 찾음
        Member member = findMemberById(userUUID);

        //현재 시즌 찾음
        Season nowSeason = getNowSeason();

        //findMarathonByMemberAndNowSeason 해서 dailyMarathon 없으면 새로 만들어서 return 해줌
        Marathon dailyMarathon = findMarathonByMemberAndNowSeason(member, nowSeason);

        //DB에서 지금 monthly 시즌 중에서 가장 높은 record를 가지고 있는 marathon을 받아옴
        List<Marathon> monthlyMarathonList = marathonJpaRepository.findMarathonWithMaxQuizRecordByMonthlySeason(
            nowSeason.getMonthlySeason(),userUUID);



        //monthlyMarathon이 null 인 경우 새로 만들어줌 -> 이미 dailyMarathon 을 먼저 생성했기 때문에 무조건 있을 듯
        if (monthlyMarathonList.size() == 0) {
            System.out.println("monthlyMarathon 이 null 인 경우");
            MarathonId marathonId = MarathonId.create(member, nowSeason.getDailySeason(),
                nowSeason.getMonthlySeason());
            monthlyMarathonList.add(generateMarathon(marathonId));
        }

        int solveCount = marathonResultRequestDto.getSolveCount();

        //일간 랭킹보다 solveCount 큰 경우 db에 저장 + redis에 저장
        if (solveCount > dailyMarathon.getQuizRecord()) {
            //marathon 정보 DB에 저장
            updateQuizRecord(dailyMarathon, solveCount);
            //redis에도 등록
            zSetOperations.add(util.getDailyMarathonRankKeyName(), userUUID, solveCount);
        }

        //월간 랭킹보다 solveCount 큰 경우 redis에만 저장
        if (solveCount >= monthlyMarathonList.get(0).getQuizRecord()) {
            zSetOperations.add(util.getMonthlyMarathonRankKeyName(), userUUID, solveCount);
        }

        return MarathonResultResponseDto.create(solveCount);
    }


    private void updateDiamond(Profile profile, int diamondCount) {
        System.out.println(diamondCount);
        profile.setDiamond(diamondCount);
        profileRepository.save(profile);

    }

    private Profile findProfileById(String userUUID) {
        return profileRepository.findById(userUUID)
//            .orElseThrow(() -> new MemberException(MemberErrorInfo.NOT_FOUNT_MEMBER));
            .orElseThrow(() -> new NullPointerException("uuid에 해당하는 profile이 없습니다."));
    }

    private void updateQuizRecord(Marathon marathon, int solveCount) {

        marathon.setQuizRecord(solveCount);
        marathonJpaRepository.save(marathon);
    }

    private Marathon findMarathonByMemberAndNowSeason(Member member, Season nowSeason) {

        MarathonId marathonId = MarathonId.create(member, nowSeason.getDailySeason(),
            nowSeason.getMonthlySeason());
        Marathon marathon = marathonJpaRepository.findById(marathonId).orElse(null);
        //empty인 경우 새로 만들어서 저장
        if (marathon == null) {
            System.out.println("마라톤이 null ");
            marathon = generateMarathon(marathonId);
        }
        return marathon;
    }

    private Marathon generateMarathon(MarathonId marathonId) {
        Marathon marathon = Marathon.create(marathonId, 0);

        marathonJpaRepository.save(marathon);
        entityManager.flush();
        return marathon;
    }

    private Member findMemberById(String userUUID) {
        return memberRepository.findById(userUUID)
            .orElseThrow(() -> new NullPointerException("uuid에 해당하는 member가 없습니다."));
    }

    //DB에 있는 퀴즈 id 중 max 값 하나 뽑음
    private Integer getQuizMaxId() {
        return quizRepository.getMaxId()
            .orElseThrow(() -> new NullPointerException("quiz 테이블에 max id 가 없습니다."));
    }

    //DB에 있는 퀴즈 id 중 min 값 하나 뽑음
    private Integer getQuizMinId() {
        return quizRepository.getMinId()
            .orElseThrow(() -> new NullPointerException("quiz 테이블에 min id 가 없습니다."));
    }

    //min~max 중에 아무 값이나 하나 뽑음
    private Integer getRandomQuizId(int quizMinId, int quizMaxId) {
        Random random = new Random();
        return random.nextInt((quizMaxId - quizMinId) + 1) + quizMinId;
    }

    //randomQuizId에 맞는 퀴즈 객체 하나 찾아옴
    private Quiz findByRandomQuizId(Integer randomQuizId) {
        return quizRepository.findById(randomQuizId)
            .orElseThrow(() -> new NullPointerException("randomQuizId에 해당하는 quiz 가 없습니다."));
    }

    //chiceList를 통해 contentList(보기내용) 구현
    private List<String> getContentList(List<Choice> choiceList) {
        List<String> contentList = new ArrayList<>();
        for (Choice choice : choiceList) {
            contentList.add(choice.getContent());
        }
        return contentList;
    }

    //해당 quiz의 정답 보기내용(content)이 뭔지 저장 -> caseNum 1번에 들어있는 content 가져옴
    private String getCorrectAnswer(Quiz quiz) {
        return quiz.getCases().stream()
            .filter(choice -> choice.getId().getCaseNum() == 1)
            .findFirst()
            .map(Choice::getContent)
            .orElseThrow(() -> new NullPointerException("해당 문제의 1번 보기가 없습니다. 즉, 정답이 없습니다."));
    }

    private Season getNowSeason() {
        return seasonJpaRepository.findById(1)
            .orElseThrow(() -> new NullPointerException("Season 테이블에 값이 존재하지 않습니다."));
    }

}
