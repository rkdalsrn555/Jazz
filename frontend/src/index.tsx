import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import Main from 'pages/Main/Main';
import 'styles/css/root.css';
// import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    {/* <CookiesProvider> */}
    <Main />
    {/* </CookiesProvider> */}
  </RecoilRoot>
);
