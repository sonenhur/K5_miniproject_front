import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]); // navigate가 변경될 때마다 이펙트를 다시 실행하도록 함

  return null; // 렌더링할 내용이 없으므로 null을 반환
}
