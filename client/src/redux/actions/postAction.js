import axios from "axios";
import {setAlert} from "./alertAction";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from "./types";

// get all the posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// get a single post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// Add a like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {postId, likes: res.data},
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// Remove a like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {postId, likes: res.data},
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert("Post Deleted!", "danger"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// Add new Post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created!", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// Add a comment
export const addComment = (formData, postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added!", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

// Delete a Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Deleted!", "danger"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};
