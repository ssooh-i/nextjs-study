import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

// stomp 연결 객체
let stompClient: CompatClient | null = null;
// session ID
let sessionId: string = "";

//STOMP over SockJS 연결
function connect(callback: () => void) {
  // let socket = new SockJS("https://k8d109.p.ssafy.io:8888/yut");
  let socket = new SockJS("https://k8d109.p.ssafy.io/yut");
  //stomp.js를 사용하여 SockJS와 웹 소켓 통신을 수행
  stompClient = Stomp.over(socket);
  stompClient.connect(
    {},
    // onConnected
    () => {
      //@ts-ignore
      sessionId = socket._transport.url.split("/")[5];
      localStorage.setItem("userId", sessionId);
      console.log("socket connection success!");
      console.log("userId: ", sessionId);
    },
    // onError
    (frame: any) => {
      onError(frame);
    }
  );
}

/**
 * Socket 연결 시 오류가 발생했을 때 실행하는 함수
 *
 * @param frame 연결 실패 시 반환하는 parameter
 */
function onError(frame: any) {
  console.log(frame.headers);
}

/**
 * 채팅 메시지 보내기
 *
 * @param content 사용자가 보내는 메시지
 */
// function sending(topic: any, content: any) {
//   stompClient?.send(
//     // TOPIC
//     topic,
//     {},
//     // CONTENT
//     JSON.stringify(content)
//   );
// }

//예시
// sending(`/chat`, {
//   type: "CHAT",
//   userId: sessionId,
//   // TODO: roomCode 변수로 바꾸기
//   roomCode: "abcde",
//   content: "dkfjasldfjsd",
// });

export { connect, onError, stompClient };
