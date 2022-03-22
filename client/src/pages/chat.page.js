import React, { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';

const Chat = () => {
  const [chat, setChat] = useState({
    userId: '6235b0c7f71568778bf3a336',
    text: '',
  });

  const users = [
    {
      name: 'Faizan',
    },
    {
      name: 'Waqas',
    },
  ];

  const onChange = (field, value) => {
    setChat((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  useEffect(() => {
    const SERVER = 'http://localhost:5000';

    const socket = socketClient(SERVER);

    socket.on('connection', () => {
      console.log('I am connected with backend............');
    });

    socket.on('message', (data) => {
      console.log('Message Event............', data);
    });
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '30px',
        }}
      >
        <label>
          Select User:
          <select>
            {users.map((obj) => (
              <option value={obj.name}>{obj.name}</option>
            ))}
          </select>
        </label>

        <textarea
          style={{ marginTop: '20px' }}
          placeholder='Enter your message...'
          name='text'
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />

        <input
          type='submit'
          value='Send'
          style={{ width: '100px', marginTop: '20px' }}
        />
      </form>
    </>
  );
};

export default Chat;
