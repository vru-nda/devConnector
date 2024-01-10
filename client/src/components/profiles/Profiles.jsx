import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getAllProfiles} from "../../redux/actions/profileAction";

import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();
  const {profiles, loading} = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : profiles?.length > 0 ? (
        <>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles?.map((item, index) => (
              <ProfileItem key={index} profile={item} />
            ))}
          </div>
        </>
      ) : (
        <h4>No Profiles found.</h4>
      )}
    </>
  );
};

export default Profiles;
