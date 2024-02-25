import { atom } from "recoil";

// 전역 상태: 로그인 상태 (변동이 일어날 때 다른 컴포넌트에서도 반영됨)
export const stLogin = atom({
  key: "stLogin",
  default: false, // 기본값은 false로 설정
});

// 전역 상태: 사용자 이메일
export const userEmail = atom({
  key: "userEmail",
  default: "", // 기본값은 빈 문자열로 설정
});
