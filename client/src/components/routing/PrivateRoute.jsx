import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

import React from "react";

const PrivateRoute = () => {
  const {isAuthenticated, loading} = useSelector((state) => state.auth);

  return (
    <div>
      {isAuthenticated && !loading ? <Outlet /> : <Navigate to={"/login"} />}
    </div>
  );
};

export default PrivateRoute;

// const PrivateRoute = ({component: Component, ...rest}) => {
//   const {isAuthenticated, loading} = useSelector((state) => state.auth);

//   return (
//     <Route
//       {...rest}
//       element={(props) =>
//         !isAuthenticated && !loading ? (
//           <Navigate to={"/login"} />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
