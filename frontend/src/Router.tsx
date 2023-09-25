import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/index';
import BattleGame from 'pages/BattleGame/BattleGame';
import CompanySearch from 'pages/CompanySearch/CompanySearch';
import Statement from 'pages/Statement/Statement';
import ShortAnswerQuestionPage from 'pages/Quiz/ShortAnswerQuestionPage';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Dictionary from 'pages/Dictionary/Dictionary';
import DictionaryResult from 'pages/DictionaryResult/DictionaryResult';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/battle-game" element={<BattleGame />} />
      <Route path="/companySearch" element={<CompanySearch />} />
      <Route path="/statement/:companyId" element={<Statement />} />
      <Route path="/dictionary" element={<Dictionary />} />
      <Route
        path="/dictionaryResult/:searchWord"
        element={<DictionaryResult />}
      />
      <Route
        path="/short-answer-question"
        element={<ShortAnswerQuestionPage />}
      />

      {/* 로그인, 회원가입 */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
};
export default Router;
