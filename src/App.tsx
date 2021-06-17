import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

// screens
import SignInOrUp from './screens/SignInOrUp';

// Functional Componentのスタイルで書くのが基本
const App: React.FC = () => (
  <Router>
    {/*
      Switch：
      上から順にURLとpathを比較し、一致するルート内容を返す
    */}
    <Switch>
      {/* 
      exactをつけることでpathに指定したlocation.pathNameが完全に一致した時のみ
      コンポーネトを返すようになる
       */}
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Route exact path="/signin" component={SignInOrUp} />
    </Switch>
  </Router>
);

export default App;
