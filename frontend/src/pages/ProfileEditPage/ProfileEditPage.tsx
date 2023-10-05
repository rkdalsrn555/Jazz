import { useBeforeunload } from 'react-beforeunload';
import { useState, useEffect } from 'react';
import * as S from './ProfileEditPage.styled';
import { userApis } from 'hooks/api/userApis';
import useDebounce from 'hooks/useDebounce';
import Enlarge from 'components/Effect/Enlarge/Enlarge';

type AbleCharactorList = {
  id: {
    item: { id: number; price: number; kind: string };
  };
  own: boolean;
  used: boolean;
}[];

const DrawCharactor = (charactorNumber: number) => {
  let charactor = '';
  let charactorName = '';
  switch (charactorNumber) {
    case 1:
      charactor = 'circle.png';
      charactorName = '동그리';
      break;
    case 2:
      charactor = 'rectangle.png';
      charactorName = '네모';
      break;
    case 3:
      charactor = 'triangle.png';
      charactorName = '세모';
      break;
    case 4:
      charactor = 'rock.png';
      charactorName = '바위';
      break;
    case 5:
      charactor = 'warrier.png';
      charactorName = '전사';
      break;
  }
  return { charactor, charactorName };
};

const ProfileEditPage = () => {
  //   useBeforeunload((event: any) => event.preventDefault());
  const [ableCharactorList, setAbleCharactorList] = useState<AbleCharactorList>(
    []
  );
  const [currentCharactor, setCurrentCharactor] = useState<number>(1);
  const [selectCharactor, setSelectCharactor] = useState<number>(0);

  const [currentNickname, setCurrentNickname] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const debounceCheckNickname = useDebounce<string>(nickname, 200);
  const [successNickname, setSuccessNickname] = useState<boolean>(false);
  const [errorNickname, setErrorNickname] = useState<boolean>(false);
  const [completeChange, setCompleteChange] = useState<boolean>(false);

  const getUserInfo = async () => {
    await userApis
      .get('/user/profile')
      .then((res) => {
        setCurrentNickname(res.data.nickname);
        setNickname(res.data.nickname);
        setCurrentCharactor(res.data.takeCharacterId);
        setAbleCharactorList(res.data.ableCharacterList);
      })
      .catch((err) => {});
  };

  const patchNickname = async () => {
    await userApis
      .patch(`/user/nickname`, {
        nickname: debounceCheckNickname,
      })
      .then((res) => {
        setCurrentNickname(() => debounceCheckNickname);
        setSuccessNickname(false);
        setCompleteChange(true);
        setTimeout(() => {
          setCompleteChange(false);
        }, 1500);
      })
      .catch((err) => {});
  };

  // debounce를 이용한 유저닉네임 중복검사, 0.2초마다 서버에 요청보내서 중복검사 실시간으로 시행
  useEffect(() => {
    if (debounceCheckNickname === currentNickname) {
      setErrorNickname(false);
      setSuccessNickname(false);
      return;
    }
    if (debounceCheckNickname === '') {
      setErrorNickname(false);
      setSuccessNickname(false);
      return;
    }
    if (debounceCheckNickname) {
      userApis
        .get(`/user/nickname/${debounceCheckNickname}`)
        .then((res) => {
          if (res.data.duplicated) {
            setErrorNickname(true);
            setSuccessNickname(false);
          } else {
            setErrorNickname(false);
            setSuccessNickname(true);
          }
        })
        .catch((err) => {
          setErrorNickname(true);
          setSuccessNickname(false);
        });
    }
  }, [debounceCheckNickname]);

  useEffect(() => {
    getUserInfo();
  }, [currentNickname]);

  return (
    <S.Container>
      <S.ProfileContainer>
        <S.CharactorBox>
          <img
            src={`/assets/img/modelAsset/${
              DrawCharactor(currentCharactor).charactor
            }`}
            alt="내캐릭터"
            width={250}
          />
        </S.CharactorBox>
        <S.InputContaier>
          <S.LabelContainer isDisabled={successNickname}>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <button onClick={successNickname ? patchNickname : () => {}}>
              변경
            </button>
          </S.LabelContainer>
          <S.ErrorMessage isError={errorNickname}>중복입니다</S.ErrorMessage>
          <S.SuccessMessage isSuccess={successNickname}>
            변경가능합니다. 버튼을 누르면변경됩니다.
          </S.SuccessMessage>
          <S.CompleteMessage isComplete={completeChange}>
            변경성공!
          </S.CompleteMessage>
        </S.InputContaier>
      </S.ProfileContainer>
      <S.CharactorListContaier
        isDisabled={selectCharactor === 0 ? true : false}
      >
        <h1>보유한 캐릭터</h1>
        <S.CharactorListBox>
          {ableCharactorList.map((item) => {
            let { charactor, charactorName } = DrawCharactor(item.id.item.id);
            if (item.used) {
              return '';
            } else {
              return (
                <Enlarge>
                  <S.selectBox
                    isSelected={
                      selectCharactor === item.id.item.id ? true : false
                    }
                    onClick={() => {
                      setSelectCharactor((prev) => {
                        if (item.id.item.id === prev) {
                          return 0;
                        } else {
                          return item.id.item.id;
                        }
                      });
                    }}
                  >
                    <img
                      src={`/assets/img/modelAsset/${charactor}`}
                      alt="보유캐릭터"
                      width={190}
                    />
                    <p>{charactorName}</p>
                  </S.selectBox>
                </Enlarge>
              );
            }
          })}
        </S.CharactorListBox>
        <button>캐릭터 변경하기</button>
      </S.CharactorListContaier>
    </S.Container>
  );
};

export default ProfileEditPage;
