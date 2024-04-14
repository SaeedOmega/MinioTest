import { TextField } from "@mui/material";
import { NatsConnection, connect, StringCodec } from "nats.ws";
import { useEffect, useRef, useState } from "react";

const NatsPage = () => {
  const sc = StringCodec();
  const messageContainer = useRef<HTMLDivElement>(null);
  const [nats, setNats] = useState<NatsConnection>();
  const [message, setMessage] = useState("");

  const sendMessage = (e: any) => {
    e.preventDefault();
    nats?.publish(">", message);
    messageContainer.current!.innerHTML += `<div class="self-end w-fit">${message}</div>`;
    setMessage("");
  };

  useEffect(() => {
    (async () => {
      const nc = await connect({ servers: ["ws://localhost:8080"] });
      setNats(nc);
      nats?.subscribe(">", {
        callback: async (err, msg) => {
          messageContainer.current!.innerHTML += `<div>${sc.decode(
            msg.data
          )}</div>`;
          console.log(sc.decode(msg.data));
        },
      });
    })();
    return () => {
      nats?.drain();
    };
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
