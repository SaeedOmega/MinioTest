import { Payload, StringCodec, SubscriptionOptions } from "nats.ws";
import { DrainNats, NatsPub, NatsSub, NatsWs } from "../datasource/nats";

const sc = StringCodec();

/**
 * a function for receive data
 * @param payload data receive from subject
 */
export function NatsSubscribe(msgContainer: HTMLDivElement) {
  NatsSub({
    callback: async (err, msg) => {
      msgContainer.innerHTML += `<div>${sc.decode(msg.data)}</div>`;
    },
  });
}

/**
 * a function for send data
 * @param data data for send to subject
 */
export function NatsPublish(data: Payload) {
  NatsPub(data);
}

/**
 * a function for close socket
 */
export function NatsCloseSocket() {
  DrainNats();
}
