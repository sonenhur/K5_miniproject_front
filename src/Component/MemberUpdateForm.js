import React, { useState } from "react";

const MemberUpdatePage = () => {
  const [name, setName] = useState(""); // 이름 상태
  const [birth, setBirth] = useState(""); // 생년월일 상태

  // 회원 정보를 업데이트하는 함수
  const handleUpdate = async () => {
    try {
      const response = await fetch("/member/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, birth }), // JSON 형태로 데이터 전송
      });
      const data = await response.json();
      console.log(data); // 성공 메시지 처리
    } catch (error) {
      console.error("회원 정보 업데이트 에러:", error);
    }
  };

  return (
    <div>
      <h2>회원 정보 수정</h2>
      <div>
        <label>이름:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>생년월일:</label>
        <input
          type="text"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>수정</button>
    </div>
  );
};

export default MemberUpdatePage;
