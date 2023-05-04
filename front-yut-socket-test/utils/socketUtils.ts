import { stompClient } from "@/actions/socket-api/socketInstance";

let obj: any = {}; // obj 객체를 subscribeEvent 함수 외부에 정의합니다.

const stringify = (message: string): any => {
  return JSON.stringify(message);
};

const parse = (message: string): any => {
  return JSON.parse(message);
};

const subscribeEvent = (eventName: string, callback?: any) => {
  stompClient?.subscribe(eventName, (body: any) => {
    obj = parse(body.body);
    if (callback) callback(obj);
  });
};

const sendEvent = (
  eventName: string,
  contents: any,
  header: any,
  callback?: any
) => {
  stompClient?.send(eventName, header, contents);
  if (callback) callback();
};

export { stringify, parse, subscribeEvent, sendEvent, obj };
