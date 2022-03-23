import React from 'react';

const ChatBoard = ({ list }) => {
  //   const list = [
  //     {
  //       name: 'Faizan',
  //       text: 'This is Faizan chat message',
  //     },
  //     {
  //       name: 'Amin',
  //       text: 'This is amin from america',
  //     },
  //     {
  //       name: 'Waqas',
  //       text: 'Hello guys how are you i am waqas from Lahore',
  //     },
  //   ]

  return (
    <div
      style={{
        border: '3px solid green',
        minHeight: '500px',
        minWidth: '500px',
        borderRadius: '5px',
      }}
    >
      {list?.map((chat) => (
        <div>
          <h3>{chat.userId.name}</h3>
          <p>{chat.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatBoard;
