import { ChatBubbleBottomCenterIcon, PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

interface Message {
  text: string;
  isBot: boolean;
}

function Chatbot() {
  const msgEnd = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi I am a Chat-bot",
      isBot: true
    }
  ]);

  const loremMessages: string[] = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Nisi ut aliquip ex ea commodo consequat. Duis aute ",
    "In voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, "
  ];

  const getRandomLoremMessage = (): string => {
    const randomIndex = Math.floor(Math.random() * loremMessages.length);
    return loremMessages[randomIndex];
  };

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  function handleSubmit() {
    const text = input.trim();
    if (!text) return;

    setInput("");
    const newMessages: Message[] = [
      ...messages,
      { text, isBot: false }
    ];
    const res = getRandomLoremMessage();
    setMessages([
      ...newMessages,
      { text: res, isBot: true }
    ]);
  }

  return (
    <div className='font-sans text-white bg-custom-dark-blue'>
      <div className="container border-4 border-gray-800 rounded-3xl mx-auto p-4 my-4 max-w-2xl  shadow-md" style={{ height: 'calc(100vh - 2rem)' }}>
        <div className='min-h-[calc(100vh-14rem)]'>
          <div className='chats overflow-hidden overflow-y-scroll scroll-smooth w-full max-w-7xl h-[calc(100vh-10rem)]'>
            {
              messages.map((message, i) => (
                <div key={i} className={message.isBot ? "m-4 p-8 px-12 text-[1.2rem] flex items-start bg-gray-800 w-fit rounded-md p-4" : "m-4 p-8 px-12 text-[1.2rem] flex items-start"}>
                  {message.isBot ? <ChatBubbleBottomCenterIcon className="h-8 w-8 text-blue-500" /> : <UserCircleIcon className="h-8 w-8 text-blue-500" />}
                  <p className='px-2'>{message.text}</p>
                </div>
              ))
            }
            <div ref={msgEnd} />
          </div>
          <div>
            <div className='p-2 bg-gray-800 flex items-center rounded-md'>
              <input className='bg-transparent w-full outline-none p-5 text-white text-[1.2rem]' type='text' name='' id='' value={input} onChange={(e) => { setInput(e.target.value) }} placeholder='Send a Message' />
              <PaperAirplaneIcon className="h-8 w-8 text-blue-500 cursor-pointer" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
