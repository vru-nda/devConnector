import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import {getCurrentProfile} from "../../redux/actions/profileAction";
import Spinner from "../layout/Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {profile, loading} = useSelector((state) => state.profile);
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>Has </>
      ) : (
        <>
          <p>You have not yet setup a profile. Please add some information.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;