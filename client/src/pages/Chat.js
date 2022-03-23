import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import { GetAllUsers } from '../features/userSlice';
import { Create, GetList } from '../features/chatSlice';
import ChatBoard from '../components/chatBoard';
import { useJwtDecode } from '../hooks/useJwtDecode';

const Chat = () => {
  const userId = useJwtDecode();

  const [chat, setChat] = useState({
    receiver: '',
    text: '',
  });

  // useEffect(() => {
  //   console.log(chat);
  //   debugger;
  // }, [chat]);

  const [chatList, setChatList] = useState([]);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { list, newChat } = useSelector((state) => state.chat);

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

    dispatch(Create(chat));
  };

  useEffect(() => {
    const SERVER = 'http://localhost:5000';

    userList();

    const socket = io(SERVER);

    socket.on('connect', () => {
      console.log('I am connected with backend............');
    });

    socket.on(userId, (data) => {
      setChatList((prev) => [...prev, { ...data }]);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (users?.length) setChat((prev) => ({ ...prev, receiver: users[0]._id }));
  }, [users?.length]);

  useEffect(() => {
    GetChatList(chat?.receiver);
  }, [chat?.receiver]);

  useEffect(() => {
    if (list?.length) setChatList((prev) => [...prev, ...list]);
  }, [list?.length]);

  useEffect(() => {
    console.log(newChat);

    if (newChat) setChatList((prev) => [...prev, { ...newChat }]);
  }, [newChat]);

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
            name='receiver'
            value={chat.userId}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            {users.map((obj) => (
              <option key={obj._id} value={obj._id}>
                {obj.name}
              </option>
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
      <ChatBoard list={chatList} />
    </>
  );
};

export default Chat;
