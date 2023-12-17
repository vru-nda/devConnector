import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

import "./App.css";
import Container from "./components/layout/Container";

const App = () => (
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
);

export default App;
