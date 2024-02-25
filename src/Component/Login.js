import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stLogin } from "./AtomSt";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useRecoilState(stLogin);
  console.log("login", isLogin);

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/Login");
  };

  useEffect(() => {
    // 로컬 스토리지에서 로그인 토큰을 확인하고, 로그인 상태 업데이트
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      setIsLogin(true);
    }
  }, [setIsLogin]);

  const handleLogout = () => {
    // 로그아웃 처리: 로컬 스토리지에서 토큰 제거 및 로그인 상태 업데이트
    localStorage.removeItem("loginToken");
    setIsLogin(false);
    navigate("/Login"); // 로그인 페이지로 이동
  };

  return (
    <div>
      {isLogin ? ( // 로그인 상태일 때 로그아웃 버튼 표시
        <button
          className="block lg:inline-block p-1.5 mr-3 border rounded text-lg font-appleB text-white border-white hover:text-red-400 hover:bg-white"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      ) : (
        <button // 로그아웃 상태일 때 로그인 페이지로 이동하는 버튼 표시
          className="block lg:inline-block p-1.5 mr-3 border rounded text-lg font-appleB text-white border-white hover:text-red-400 hover:bg-white"
          onClick={navigateToLogin}
        >
          로그인
        </button>
      )}
    </div>
  );
}
