import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/index';
import BattleGame from 'pages/BattleGame/BattleGame';
import CompanySearch from 'pages/CompanySearch/CompanySearch';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/battle-game" element={<BattleGame />} />
      <Route path="/companySearch" element={<CompanySearch />} />
    </Routes>
  );
};
export default Router;
