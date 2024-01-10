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
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/Profile/Profile";

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
            <Route path='/profiles' element={<Profiles />} />
            <Route path='/profile/:userId' element={<Profile />} />

            {/* private routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/create-profile' element={<CreateProfile />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/add-experience' element={<AddExperience />} />
              <Route path='/add-education' element={<AddEducation />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
