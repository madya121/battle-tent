import React, { useState, useEffect } from 'react';
import { Button, Input } from '../../../components/basics';
import {
  emitChat,
  subscribeChat,
  subscribePlayerLeftTheRoom,
} from '../../../api';
import styled from 'styled-components';

export default function ChatPanel() {
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<ChatLog[]>([]);

  useEffect(function subscribe() {
    function pushLog(newLog: ChatLog) {
      setLogs([...logs, newLog]);
    }

    const sChat = subscribeChat(({ name, message }) => {
      pushLog({ type: 'chat', name, message });
    });

    const sPlayerLeftTheRoom = subscribePlayerLeftTheRoom(({ name }) => {
      pushLog({
        type: 'alert',
        message: `Player ${name} left the room!`,
      });
    });

    return function unsubscribe() {
      sChat.off();
      sPlayerLeftTheRoom.off();
    }
  }, [logs]);

  function onClickSend() {
    emitChat(message);
  }

  return (
    <div>
      <ChatLogsPanel>
        {logs.map(({ type, name, message }, index) => (
          <ChatRow type={type} key={index}>
            {name && `${name}: `}
            {message}
          </ChatRow>
        ))}
      </ChatLogsPanel>
      <div style={{ display: 'flex' }}>
        <ChatInput
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button
          disabled={!message}
          onClick={onClickSend}
        >
          Send
        </Button>
      </div>
    </div >
  );
}

interface ChatLog {
  type: string;
  name?: string;
  message: string;
}

const ChatLogsPanel = styled.div`
  height: 120px;
  overflow: scroll;
`;

const ChatRow = styled.div<{ type: string }>`
  color: ${({ type }) => getChatRowColor(type)};
`;

const ChatInput = styled(Input)`
  width: 100%;
`;

function getChatRowColor(type: string) {
  switch (type) {
    case 'alert': return 'red';
    case 'chat': return 'black';
    default: return 'gray';
  }
}