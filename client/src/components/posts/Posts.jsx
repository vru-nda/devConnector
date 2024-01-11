import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getPosts} from "../../redux/actions/postAction";

import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = () => {
  const dispatch = useDispatch();
  const {loading, posts} = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>

      {/* <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form className='form my-1'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div> */}

      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
