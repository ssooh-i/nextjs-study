import SockJS from "sockjs-client";
import { useRecoilState } from "recoil";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { userInfoState } from "@/store/UserStore";
import {
  stringify,
  parse,
  subscribeEvent,
  sendEvent,
} from "@/utils/socketUtils";

// stomp 연결 객체
let stompClient: CompatClient | null = null;
// session ID
let sessionId: string = "";

function connect() {
  let socket = new SockJS("https://k8d109.p.ssafy.io:8888/yut");

  //stomp.js를 사용하여 SockJS와 웹 소켓 통신을 수행
  stompClient = Stomp.over(socket);
  stompClient.connect(
    {},
    // onConnected
    () => {
      //@ts-ignore
      sessionId = socket._transport.url.split("/")[5];
      onConnected(sessionId);
      //userId 저장
      localStorage.setItem("userId", sessionId);
    },
    // onError
    (frame: any) => {
      onError(frame);
    }
  );
}
/**
 * Socket 연결에 성공했을 때 실행하는 함수
 *
 * @param sessionId socket을 연결한 sessionID
 */
// function onConnected(sessionId: string, callback: () => void) {
//   console.log("success");
//   console.log();
//   // TODO: roomCode를 변수로 바꾸기!
//   stompClient?.subscribe("/topic/chat/{roomCode}", (body: any) => {
//     const data = JSON.parse(body.body);
//     console.log(data);
//     callback();
//   });

//   // 서버에 입장한다는 메시지 전송
//   stompClient?.send(
//     `/room/enter`,
//     {},
//     JSON.stringify({
//       userId: sessionId,
//       roomCode: "abcde",
//     })
//   );
// }

function onConnected(sessionId: string) {
  console.log("success");
  console.log();

  // TODO: roomCode를 변수로 바꾸기!
  stompClient?.subscribe(`/topic/chat/{roomCode}`, (body: any) => {
    const data = JSON.parse(body.body);
    // console.log(data);
  });

  // 서버에 입장한다는 메시지 전송
  stompClient?.send(
    `/room/enter`,
    {},
    JSON.stringify({
      userId: sessionId,
      roomCode: "abcde",
    })
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
function sending(topic: any, content: any) {
  stompClient?.send(
    // TOPIC
    topic,
    {},
    // CONTENT
    JSON.stringify(content)
  );
}

//예시
// sending(`/chat`, {
//   type: "CHAT",
//   userId: sessionId,
//   // TODO: roomCode 변수로 바꾸기
//   roomCode: "abcde",
//   content: "dkfjasldfjsd",
// });

export { connect, onConnected, onError, sending };
