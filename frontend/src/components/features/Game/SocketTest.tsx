import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import TalkBlock from './TalkBlock';
import * as StompJs from '@stomp/stompjs';

const TextBox = styled.div`
  width: 500px;
  height: 800px;
  border-radius: 40px;
  background-color: #fff;
  position: relative;
  margin: 0 auto;
  padding: 50px;
`;

const InputContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 70px;
  border-radius: 0 0 40px 40px;
  display: flex;
  flex-direction: row;
`;

const TextInput = styled.input`
  width: 380px;
  height: 70px;
  border: none;
  font-size: 24px;
  background-color: aliceblue;
  padding: 10px 24px 10px 24px;
`;

const SocketTest = () => {
  // 채널 구독, 구독중인 채널에서 메시지가 왔을 때 처리하는 코드
  const [talkList, setTalkList] = useState<string[]>([]); // 화면에 표시될 채팅 기록
  const { apply_id } = useParams(); // 채널을 구분하는 식별자를 URL 파라미터로 받는다.

  const subscribe = () => {
    client.subscribe('/sub/chat/' + apply_id, (body: any) => {
      const json_body = JSON.parse(body.body);
      setTalkList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const [text, setText] = useState<string>(''); // 입력되는 채팅
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value !== '') {
      setText(e.target.value);
    } else {
      setText('');
    }
  };

  // 메세지 발행
  const publish = (text: any) => {
    if (!client.connected) return; // 연결되지 않았으면 메시지를 보내지 않는다.

    client.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        applyId: apply_id,
        chat: text,
      }), // 형식에 맞게 수정해서 보내야 함.
    });

    setText('');
  };

  // 클라이언트 생성
  const client = new StompJs.Client({
    brokerURL: '/api/ws',
    onConnect: () => {
      subscribe(); // 연결 성공 시 구독하는 로직 실행
    },
  });

  // 연결하려고 할 때 클라이언트 활성화
  const connect = () => {
    client.activate();
  };

  // 연결이 끊을 때 클라이언트 비활성화
  const disconnect = () => {
    client.deactivate();
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <TextBox>
      {talkList.map((item) => (
        <TalkBlock text={item} />
      ))}
      <InputContainer>
        <TextInput type="text" value={text} onChange={handleChange} />
        <button
          style={{ backgroundColor: 'yellow' }}
          onClick={() => {
            if (text !== '') {
              setTalkList([...talkList, text]);
              setText('');
            }
          }}
        >
          확인
        </button>
      </InputContainer>
    </TextBox>
  );
};

export default SocketTest;
