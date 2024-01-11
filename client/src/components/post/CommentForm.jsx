import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {addComment} from "../../redux/actions/postAction";

const CommentForm = ({postId}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({text}, postId));
    setText("");
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form className='form my-1' onSubmit={handleSubmit}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;
