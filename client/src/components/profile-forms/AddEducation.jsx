import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {addEducation} from "../../redux/actions/profileAction";

const AddEducation = () => {
  const navigate = useNavigate();
  const disaptch = useDispatch();

  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [toDateDisabled, setToDateDisabled] = useState(false);

  const {degree, school, fieldofstudy, from, to, current, description} =
    formData;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    disaptch(addEducation(formData, navigate));
  };

  return (
    <>
      <h1 className='large text-primary'>Add An Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school/bootcamp that you
        have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree'
            name='degree'
            required
            value={degree}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School/Bootcamp'
            name='school'
            required
            value={school}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field of study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value=''
              checked={current}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: !current,
                });
                setToDateDisabled(!toDateDisabled);
              }}
            />{" "}
            Current School
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => handleChange(e)}
            disabled={toDateDisabled}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddEducation;
