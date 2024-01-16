import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

// redux
import {Provider} from "react-redux";
import {loadUser} from "./redux/actions/authAction";
import store from "./redux/store";

import Container from "./components/layout/Container";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/layout/NotFound";
import PrivateRoute from "./components/routing/PrivateRoute";
import {privateRoutes, publicRoutes} from "./components/routing/Routes";

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
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route />

            {/* private routes */}
            <Route element={<PrivateRoute />}>
              {privateRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
