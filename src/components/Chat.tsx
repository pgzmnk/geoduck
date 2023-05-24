"use client";
import React from "react";
import Image from "next/image";
import useState from "react-usestateref";

const botPic = "/openai.svg";
const userPic = "/vercel.svg";

enum Creator {
  User = 0,
  Bot = 1,
}

interface MessageProps {
  text: string;
  from: Creator;
  key: number;
}

interface InputProps {
  onSend: (input: string) => void;
  disabled: boolean;
}

const ChatMessage = ({ text, from }: MessageProps) => {
  return (
    <>
      {from == Creator.User && (
        <div className="bg-white p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          {/* <Image src={userPic} alt="User" width={40} height={40} /> */}
          <p className="text-gray-700">{text}</p>
        </div>
      )}
      {from == Creator.Bot && (
        <div className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center whitespace-pre-wrap">
          <Image src={botPic} alt="Bot" width={40} height={40} />
          <p className="text-gray-700">{text}</p>
        </div>
      )}
    </>
  );
};

const ChatInput = ({ onSend, disabled }: InputProps) => {
  const [input, setInput] = useState("");

  const sendInput = () => {
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      console.log("- enter pressed");
      sendInput();
    }
  };

  return (
    <div className="bg-white border-2 p-2 rounded-lg flex justify-center">
      <input
        value={input}
        onChange={(ev: any) => setInput(ev.target.value)}
        className="bg-white w-full py-2 px-3 text-gray-800 rounded-lg focus:outline-none"
        type="text"
        placeholder="Type a message..."
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      {disabled && (
        <button className="p-2 rounded-md text-gray-500 bottom-1.5 right-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      )}

      {!disabled && (
        <button
          onClick={sendInput}
          className="p-2 rounded-md text-gray-500 bottom-1.5 right-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export const Chat = () => {
  const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(false);

  const callApi = async (input: string) => {
    setLoading(true);
    const myMessage: MessageProps = {
      text: input,
      from: Creator.User,
      key: new Date().getTime(),
    };
    setMessages([...messagesRef.current, myMessage]);
    const response = await fetch("/api/v0/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    }).then((res) => res.json());

    setLoading(false);

    if (response.text) {
      const botMessage: MessageProps = {
        text: response.text,
        from: Creator.Bot,
        key: new Date().getTime(),
      };
      setMessages([...messagesRef.current, botMessage]);
    } else {
      // show error
    }
  };

  return (
    <>
      <div className="flex w-full pt-10 px-4">
        <ChatInput onSend={(input) => callApi(input)} disabled={loading} />
      </div>

      <div className="mt-10 px-4">
        {messages.map((msg: MessageProps) => (
          <ChatMessage key={msg.key} text={msg.text} from={msg.from} />
        ))}
        {messages.length == 0 && (
          <p className="text-center text-gray-400">Start prompting!</p>
        )}
      </div>
    </>
  );
};
