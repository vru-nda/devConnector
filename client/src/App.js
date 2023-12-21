import { BrowserRouter, Route, Routes } from "react-router-dom";

// redux
import { useEffect } from "react";
import { Provider } from "react-redux";
import { loadUser } from "./redux/actions/authAction";
import store from "./redux/store";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Container from "./components/layout/Container";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

import "./App.css";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route element={<Container />}>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
