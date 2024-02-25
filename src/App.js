import MainMenu from "./UI/MainMenu";
import LoginForm from "./Component/LoginForm";
import Register from "./Component/Register";
import MovieDetail from "./Component/MovieDetail";

import { RecoilRoot } from "recoil";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/movie/:index" Component={MovieDetail} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
