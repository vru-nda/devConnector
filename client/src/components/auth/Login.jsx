import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";

import {login} from "../../redux/actions/authAction";

const Login = () => {
  const dispatch = useDispatch();

  const {isAuthenticated} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign In To Your Account
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            value={email}
            onChange={(e) => handleChange(e)}
            type='email'
            placeholder='Email Address'
            name='email'
          />
        </div>
        <div className='form-group'>
          <input
            value={password}
            onChange={(e) => handleChange(e)}
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </>
  );
};

export default Login;
