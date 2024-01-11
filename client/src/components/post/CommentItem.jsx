import React from "react";
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {deleteComment} from "../../redux/actions/postAction";

const CommentItem = ({
  comment: {_id, name, avatar, text, date, user},
  postId,
}) => {
  const dispatch = useDispatch();

  const {user: authUser, loading} = useSelector((state) => state.auth);

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!loading && user === authUser._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => dispatch(deleteComment(postId, _id))}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
