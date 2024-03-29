import React from "react";
import {Link} from "react-router-dom";

const ProfileItem = ({profile}) => {
  const {
    user: {_id, avatar, name},
    status,
    location,
    skills,
    company,
  } = profile;

  return (
    <div className='profile bg-light' key={_id}>
      <img className='round-img' src={avatar} alt='' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        {location && <p>{location}</p>}
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills?.slice(0, 4)?.map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check'></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
