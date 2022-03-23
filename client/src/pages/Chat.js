import React, { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import { GetAllUsers } from '../features/userSlice';
import { create, GetList } from '../features/chatSlice';
import ChatBoard from '../components/chatBoard';
// import jwt from 'jsonwebtoken';

const Chat = () => {
  const [chat, setChat] = useState({
    userId: '',
    text: '',
  });

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.chat);

  const userList = () => {
    dispatch(GetAllUsers());
  };

  const GetChatList = (id) => {
    dispatch(GetList(id));
  };

  const handleChange = (field, value) => {
    setChat((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(create(chat));
  };

  useEffect(() => {
    const SERVER = 'http://localhost:5000';

    userList();

    const socket = socketClient(SERVER);

    socket.on('connection', () => {
      console.log('I am connected with backend............');
    });

    socket.on('message', (data) => {
      console.log('Message Event............', data);
    });
  }, []);

  useEffect(() => {
    if (users?.length) setChat((prev) => ({ ...prev, userId: users[0]._id }));
  }, [users?.length]);

  useEffect(() => {
    GetChatList(chat?.userId);
  }, [chat?.userId]);

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
          <select
            name='userId'
            value={chat.userId}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            {users.map((obj) => (
              <option value={obj._id}>{obj.name}</option>
            ))}
          </select>
        </label>

        <textarea
          style={{ marginTop: '20px' }}
          placeholder='Enter your message...'
          name='text'
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />

        <input
          type='submit'
          value='Send'
          style={{ width: '100px', marginTop: '20px' }}
        />
      </form>
      <ChatBoard list={list} />
    </>
  );
};

export default Chat;
