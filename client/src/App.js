import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect} from "react";

// redux
import {Provider} from "react-redux";
import {loadUser} from "./redux/actions/authAction";
import store from "./redux/store";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Container from "./components/layout/Container";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

import "./App.css";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // load the user
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
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
