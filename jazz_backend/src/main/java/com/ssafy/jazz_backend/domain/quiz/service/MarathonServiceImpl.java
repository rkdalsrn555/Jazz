package com.ssafy.jazz_backend.domain.quiz.service;

import com.ssafy.jazz_backend.domain.jwt.service.serviceImpl.JwtServiceImpl;
import com.ssafy.jazz_backend.domain.member.record.repository.MarathonJpaRepository;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonQuizResponseDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultRequestDto;
import com.ssafy.jazz_backend.domain.quiz.dto.MarathonResultResponseDto;
import com.ssafy.jazz_backend.domain.quiz.entity.Choice;
import com.ssafy.jazz_backend.domain.quiz.entity.Quiz;
import com.ssafy.jazz_backend.domain.quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MarathonServiceImpl implements MarathonService {

    private final QuizRepository quizRepository;
    private final JwtServiceImpl jwtService;
    private final MarathonJpaRepository marathonJpaRepository;

    //Sorted Set 을 위한 DI
    //키 : String , Value : String, 스코어는 Double로 고정임
    private final ZSetOperations<String, String> zSetOperations;
    // 마라톤 퀴즈 하나 뽑아서 주기
    @Override
    public MarathonQuizResponseDto getMarathonQuiz(String accessToken) {
        Integer quizMaxId = getQuizMaxId();
        Integer quizMinId = getQuizMinId();
        Integer randomQuizId = getRandomQuizId(quizMinId,quizMaxId);

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

        if(quiz.getKind()==2){
            //주관식이니까 1개 짜리 리스트임
            List<Choice> choiceList = quiz.getCases();
            //주관식이니까 1개 짜리 리스트임
            List<String> contentList = getContentList(choiceList);
            return MarathonQuizResponseDto.create(quiz.getId(),quiz.getQuestion(),contentList,1,false,quiz.getKind());

        }else{
            //퀴즈에 대한 보기들 리스트에 담음
            List<Choice> choiceList = quiz.getCases();
            //퀴즈 보기 내용들 리스트 만들기
            List<String> contentList = getContentList(choiceList);
            //해당 퀴즈의 정답 찾기
            String correctAnswer = getCorrectAnswer(quiz);
            //퀴즈 보기 셔플
            Collections.shuffle(contentList);
            //정답 번호 저장
            int correctAnswerIndex = contentList.indexOf(correctAnswer)+1;

            return MarathonQuizResponseDto.create(quiz.getId(),quiz.getQuestion(),contentList,correctAnswerIndex,true,quiz.getKind());
        }
    }


    //마라톤 결과 DB에 적용
    @Override
    public MarathonResultResponseDto applyMarathonQuizResult(String accessToken, List<MarathonResultRequestDto> marathonResultRequestDtoList) {
        String userUUID = jwtService.getInfo("account", accessToken);
        int solveCount = marathonResultRequestDtoList.size();








        return MarathonResultResponseDto.create(solveCount);
    }

    //DB에 있는 퀴즈 id 중 max 값 하나 뽑음
    private Integer getQuizMaxId(){
        return quizRepository.getMaxId().orElseThrow(()->new NullPointerException("quiz 테이블에 max id 가 없습니다."));
    }
    //DB에 있는 퀴즈 id 중 min 값 하나 뽑음
    private Integer getQuizMinId(){
        return quizRepository.getMinId().orElseThrow(()->new NullPointerException("quiz 테이블에 min id 가 없습니다."));
    }
    //min~max 중에 아무 값이나 하나 뽑음
    private Integer getRandomQuizId(int quizMinId, int quizMaxId){
        Random random = new Random();
        return random.nextInt((quizMaxId-quizMinId) + 1) + quizMinId;
    }
    //randomQuizId에 맞는 퀴즈 객체 하나 찾아옴
    private Quiz findByRandomQuizId(Integer randomQuizId){
        return quizRepository.findById(randomQuizId).orElseThrow(()->new NullPointerException("randomQuizId에 해당하는 quiz 가 없습니다." ));
    }
    //chiceList를 통해 contentList(보기내용) 구현
    private List<String> getContentList(List<Choice> choiceList){
        List<String> contentList = new ArrayList<>();
        for(Choice choice : choiceList){
            contentList.add(choice.getContent());
        }
        return contentList;
    }
    //해당 quiz의 정답 보기내용(content)이 뭔지 저장 -> caseNum 1번에 들어있는 content 가져옴
    private String getCorrectAnswer(Quiz quiz){
        return quiz.getCases().stream()
                .filter(choice -> choice.getId().getCaseNum() == 1)
                .findFirst()
                .map(Choice::getContent).orElseThrow(()->new NullPointerException("해당 문제의 1번 보기가 없습니다. 즉, 정답이 없습니다."));
    }



}
