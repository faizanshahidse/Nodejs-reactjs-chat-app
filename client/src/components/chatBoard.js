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
      {list?.length ? (
        list?.map((chat) => (
          <div key={chat?._id}>
            <h3>{chat?.sender?.name}</h3>
            <p>{chat.text}</p>
          </div>
        ))
      ) : (
        <p>No Chat available...</p>
      )}
    </div>
  );
};

export default ChatBoard;
