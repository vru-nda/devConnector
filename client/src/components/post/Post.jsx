import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

import {getPost} from "../../redux/actions/postAction";

const Post = () => {
  const dispatch = useDispatch();
  const {postId} = useParams();

  const {loading, post} = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  return post === null || loading ? (
    <Spinner />
  ) : (
    <>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>

      <PostItem post={post} showActions={false} />
      <CommentForm postId={postId} />

      <div className='comments'>
        {post?.comments?.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))}
      </div>
    </>
  );
};

export default Post;
