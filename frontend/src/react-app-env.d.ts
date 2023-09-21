/// <reference types="react-scripts" />

// env파일에 작성한 것 여기에도 작성해줘야함(타입스크립트때문)
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BASE_URL: string;
    REACT_APP_ACCESS_TOKEN: string;
  }
}
