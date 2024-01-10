import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

import {getProfileById} from "../../redux/actions/profileAction";

import Spinner from "../layout/Spinner";

const Profile = () => {
  const dispatch = useDispatch();
  const {userId} = useParams();

  const {profile, loading} = useSelector((state) => state.profile);
  const {isAuthenticated, user} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfileById(userId));
  }, [dispatch, userId]);

  // @todo - loggedin user can only see the details

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-white'>
            Back to Profiles
          </Link>
          {isAuthenticated && !loading && user._id === profile.user._id && (
            <Link to={"/edit-profile"} className='btn btn-dark'>
              Edit Profile
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
