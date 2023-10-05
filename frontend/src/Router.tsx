import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'hooks/PrivateRoute';
import PublicRoute from 'hooks/PublicRoute';
import Home from 'pages/Home/index';
import BattleGame from 'pages/BattleGame/BattleGame';
import CompanySearch from 'pages/CompanySearch/CompanySearch';
import Statement from 'pages/Statement/Statement';
import ShortAnswerQuestionPage from 'pages/Quiz/ShortAnswerQuestionPage';
import Login from 'pages/Login/Login';
import Signup from 'pages/Signup/Signup';
import Dictionary from 'pages/Dictionary/Dictionary';
import DictionaryResult from 'pages/DictionaryResult/DictionaryResult';
import QuizResultPage from 'pages/Quiz/QuizResultPage';
import ShortAnswerMultipleQuestionPage from 'pages/Quiz/ShortAnswerMultipleQuestionPage';
import DescriptiveMultipleQuestionPage from 'pages/Quiz/DescriptiveMultipleQuestionPage';
import MarathonPage from 'pages/Quiz/MarathonPage';
import MarathonResultPage from 'pages/Quiz/MarathonResultPage';
import FavoritePage from 'pages/Favorite/FavoritePage';
import FavoriteRandomQuestionPage from 'pages/Quiz/FavoriteRandomQuestionPage';
import FavoriteRandomQuizResult from 'pages/Quiz/FavoriteRandomQuizResult';
import StorePage from 'pages/Store/StorePage';
import Error404 from 'components/utils/Error/Error404';
import { themeProps } from '@emotion/react';
import { useTheme } from '@mui/material';
import { Suspense } from 'react';

const PrivatePath = [
  { path: '/', component: <Home /> },
  { path: '/home', component: <Home /> },
  { path: '/battle-game/:gameRoomId', component: <BattleGame /> },
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
  { path: '/marathon', component: <MarathonPage /> },
  { path: '/marathon/result', component: <MarathonResultPage /> },
  { path: '/quiz/result', component: <QuizResultPage /> },
  { path: '/favorite', component: <FavoritePage /> },
  { path: '/favorite/random-quiz', component: <FavoriteRandomQuestionPage /> },
  {
    path: '/favorite/random-quiz/result',
    component: <FavoriteRandomQuizResult />,
  },
  {
    path: '/store',
    component: <StorePage />,
  },
];

const Router = () => {
  const userAccessToken = window.localStorage.getItem('userAccessToken');

  return (
    <Routes>
      {PrivatePath.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={
            <PrivateRoute
              component={item.component}
              authenticated={userAccessToken}
            />
          }
        />
      ))}
      {/*   
      // restricted = false 로그인 여부와 관계없이 접근 가능 페이지
      // restricted = true 로그인한 상태에선 접근 불가능: 로그인, 회원가입 
      */}
      <Route
        path="/login"
        element={
          <PublicRoute
            authenticated={!userAccessToken}
            restricted={true}
            component={<Login />}
          />
        }
      />
      <Route
        path="/sign-up"
        element={
          <PublicRoute
            authenticated={!userAccessToken}
            restricted={true}
            component={<Signup />}
          />
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
export default Router;
