import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'hooks/PrivateRoute';
import Home from 'pages/Home/index';
import BattleGame from 'pages/BattleGame/BattleGame';
import CompanySearch from 'pages/CompanySearch/CompanySearch';
import Statement from 'pages/Statement/Statement';
import ShortAnswerQuestionPage from 'pages/Quiz/ShortAnswerQuestionPage';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Dictionary from 'pages/Dictionary/Dictionary';
import DictionaryResult from 'pages/DictionaryResult/DictionaryResult';
import Result from 'pages/Quiz/Result';
import ShortAnswerMultipleQuestionPage from 'pages/Quiz/ShortAnswerMultipleQuestionPage';
import DescriptiveMultipleQuestionPage from 'pages/Quiz/DescriptiveMultipleQuestionPage';

const route = [
  { path: '/', component: <Home /> },
  { path: '/home', component: <Home /> },
  { path: '/battle-game', component: <BattleGame /> },
  { path: '/companySearch', component: <CompanySearch /> },
  { path: '/statement/:companyId', component: <Statement /> },
  { path: '/dictionary', component: <Dictionary /> },
  { path: '/dictionaryResult/:searchWord', component: <DictionaryResult /> },
  { path: '/short-answer-question', component: <ShortAnswerQuestionPage /> },
  {
    path: '/short-answer-multiple-question',
    component: <ShortAnswerMultipleQuestionPage />,
  },
  {
    path: '/description-mutiple-question',
    component: <DescriptiveMultipleQuestionPage />,
  },
  { path: '/result', component: <Result /> },
];

const Router = () => {
  const userAccessToken = window.localStorage.getItem('userAccessToken');

  return (
    <Routes>
      {route.map((item) => (
        <Route
          path={item.path}
          element={
            <PrivateRoute
              component={item.component}
              authenticated={userAccessToken}
            />
          }
        />
      ))}
      {/* 로그인, 회원가입 */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
};
export default Router;
