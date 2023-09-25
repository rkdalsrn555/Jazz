import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/index';
import BattleGame from 'pages/BattleGame/BattleGame';
import CompanySearch from 'pages/CompanySearch/CompanySearch';
import Statement from 'pages/Statement/Statement';
import ShortAnswerQuestionPage from 'pages/Quiz/ShortAnswerQuestionPage';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Result from 'pages/Quiz/Result';
import PrivateRoute from 'hooks/PrivateRoute';

const route = [
  { path: '/', component: <Home /> },
  { path: '/home', component: <Home /> },
  { path: '/battle-game', component: <BattleGame /> },
  { path: '/companySearch', component: <CompanySearch /> },
  { path: '/statement/:companyId', component: <Statement /> },
  { path: '/short-answer-question', component: <ShortAnswerQuestionPage /> },
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
