import React from "react";
import Moment from "react-moment";
import {useDispatch} from "react-redux";

import {deleteEducation} from "../../redux/actions/profileAction";

const Education = ({education}) => {
  const dispatch = useDispatch();

  const educations = education?.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={(e) => dispatch(deleteEducation(edu._id))}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      {educations?.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      ) : (
        <h5>No Data To Show</h5>
      )}
    </>
  );
};

export default Education;
