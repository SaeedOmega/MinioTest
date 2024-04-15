import { Payload, SubscriptionOptions, connect } from "nats.ws";

/**
 * a socket to nats
 */
export const NatsWs = await connect({ servers: ["ws://localhost:8080"] });

/**
 * a function for subscribe to nats server subject
 * @param payload subOts Object
 */
export function NatsSub(payload: SubscriptionOptions) {
  NatsWs.subscribe(">", payload);
}

/**
 *  a function for send data to nats server subject
 * @param payload a data for send to nats server subject
 */
export function NatsPub(payload: Payload) {
  NatsWs.publish(">", payload);
}

/**
 * drain socket to nats server
 */
export function DrainNats() {
  NatsWs.drain();
}
