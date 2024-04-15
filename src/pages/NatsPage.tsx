import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  NatsCloseSocket,
  NatsPublish,
  NatsSubscribe,
} from "../repository/nats";

const NatsPage = () => {
  const messageContainer = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  const sendMessage = (e: any) => {
    e.preventDefault();
    NatsPublish(message);
    setMessage("");
  };

  useEffect(() => {
    NatsSubscribe(messageContainer.current!);
    return NatsCloseSocket;
  }, []);
  return (
    <div className="h-[95%]">
      <form className="m-5 flex flex-col h-full" onSubmit={sendMessage}>
        <div ref={messageContainer} className="grow flex flex-col"></div>
        <TextField
          label="message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default NatsPage;
