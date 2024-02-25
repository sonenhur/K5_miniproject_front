import React from "react";

const MemberDeletePage = () => {
  // 회원 계정을 삭제하는 함수
  const handleDelete = async () => {
    try {
      const response = await fetch("/member/delete", {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data); // 성공 메시지 처리
    } catch (error) {
      console.error("회원 계정 삭제 에러:", error);
    }
  };

  return (
    <div>
      <h2>회원 계정 삭제</h2>
      <p>정말로 계정을 삭제하시겠습니까?</p>
      <button onClick={handleDelete}>계정 삭제</button>
    </div>
  );
};

export default MemberDeletePage;
