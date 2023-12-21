import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";

import {setAlert} from "../../redux/actions/alertAction";
import {register} from "../../redux/actions/authAction";

const Register = () => {
  const dispatch = useDispatch();

  const {isAuthenticated} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {name, email, password, password2} = formData;

  const handleChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "danger"));
    } else {
      dispatch(register({name, email, password}));
    }
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            value={name}
            onChange={(e) => handleChange(e)}
            type='text'
            placeholder='Name'
            name='name'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={email}
            onChange={(e) => handleChange(e)}
            type='email'
            placeholder='Email Address'
            name='email'
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            value={password}
            onChange={(e) => handleChange(e)}
            type='password'
            placeholder='Password'
            name='password'
          />
        </div>
        <div className='form-group'>
          <input
            value={password2}
            onChange={(e) => handleChange(e)}
            type='password'
            placeholder='Confirm Password'
            name='password2'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </>
  );
};

export default Register;
