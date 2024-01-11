import React from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

import {addLike, removeLike} from "../../redux/actions/postAction";

const PostItem = ({
  post: {_id, avatar, name, text, user, likes, comments, date},
}) => {
  const dispatch = useDispatch();
  const {loading, user: authUser} = useSelector((state) => state.auth);

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to='/profile'>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        <button
          type='button'
          className='btn btn-light'
          onClick={() => dispatch(addLike(_id))}
        >
          <i className='fas fa-thumbs-up'></i>{" "}
          {likes?.length > 0 && <span>{likes?.length}</span>}
        </button>

        <button
          type='button'
          className='btn btn-light'
          onClick={() => dispatch(removeLike(_id))}
        >
          <i className='fas fa-thumbs-down'></i>
        </button>

        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion{" "}
          {comments?.length > 0 && (
            <span className='comment-count'>{comments?.length}</span>
          )}
        </Link>
        {!loading && user === authUser._id && (
          <button type='button' className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
