import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

import {getProfileById} from "../../redux/actions/profileAction";

import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

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
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience?.length > 0 ? (
                <>
                  {profile.experience.map((exp) => (
                    <ProfileExperience key={exp._id} exp={exp} />
                  ))}
                </>
              ) : (
                <h4>No Experience Credentials.</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education?.length > 0 ? (
                <>
                  {profile.education.map((edu) => (
                    <ProfileEducation key={edu._id} edu={edu} />
                  ))}
                </>
              ) : (
                <h4>No Education Credentials.</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
