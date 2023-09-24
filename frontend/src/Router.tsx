import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/index';
import BattleGame from 'pages/BattleGame/BattleGame';
import CompanySearch from 'pages/CompanySearch/CompanySearch';
import Statement from 'pages/Statement/Statement';
import ShortAnswerQuestionPage from 'pages/Quiz/ShortAnswerQuestionPage';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Result from 'pages/Quiz/Result';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/battle-game" element={<BattleGame />} />
      <Route path="/companySearch" element={<CompanySearch />} />
      <Route path="/statement/:companyId" element={<Statement />} />
      <Route
        path="/short-answer-question"
        element={<ShortAnswerQuestionPage />}
      />
      <Route path="/result" element={<Result />} />
      {/* 로그인, 회원가입 */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
};
export default Router;
