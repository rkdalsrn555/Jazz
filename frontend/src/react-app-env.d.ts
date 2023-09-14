/// <reference types="react-scripts" />

// env파일에 작성한 것 여기에도 작성해줘야함(타입스크립트때문)
declare namespace NodeJS {
  interface ProcessEnv {
    // 예시
    // REACT_APP_VAPID_KEY: string;
  }
}
