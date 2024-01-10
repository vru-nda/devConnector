import React from "react";
import Moment from "react-moment";
import {useDispatch} from "react-redux";

import {deleteExperience} from "../../redux/actions/profileAction";

const Experience = ({experience}) => {
  const dispatch = useDispatch();

  const experiences = experience?.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      {experiences?.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th className='hide-sm'>Title</th>
              <th className='hide-sm'>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      ) : (
        <h5>No Data To Show</h5>
      )}
    </>
  );
};

export default Experience;
