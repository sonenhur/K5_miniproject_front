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
        alert("Email address, password, name and birth cannot be empty!");
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
        throw new Error(errorData.error || "Failed to register.");
      }

      navigate("/Login"); // 회원가입 성공 시 로그인 페이지로 이동합니다.
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError(error.message || "Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
  );
}
