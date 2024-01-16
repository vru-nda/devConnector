import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import Post from "../post/Post";
import Posts from "../posts/Posts";
import AddEducation from "../profile-forms/AddEducation";
import AddExperience from "../profile-forms/AddExperience";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import Profile from "../profile/Profile";
import Profiles from "../profiles/Profiles";

export const publicRoutes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profiles",
    element: <Profiles />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  },
];

export const privateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/create-profile",
    element: <CreateProfile />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/add-experience",
    element: <AddExperience />,
  },
  {
    path: "/add-education",
    element: <AddEducation />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },

  {
    path: "/posts/:postId",
    element: <Post />,
  },
];
