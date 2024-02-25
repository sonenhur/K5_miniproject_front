import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (name, email, password, birth) => {
    try {
      setLoading(true);
      setError(null);

      if (
        name.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        birth.trim() === ""
      ) {
        alert("이메일 주소, 비밀번호, 이름 및 생년월일은 필수 항목입니다");
        return;
      }

      // const response = await fetch("http://10.125.121.181:8080/member/join", {
      const response = await fetch("http://localhost:8080/member/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          birth: birth,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "가입에 실패했습니다.");
      }

      navigate("/Login"); // 회원가입 성공 시 로그인 페이지로 이동합니다.
    } catch (error) {
      console.error("가입 실패:", error.message);
      setError(error.message || "가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
  );
}
