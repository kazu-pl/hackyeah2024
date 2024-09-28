import { Routes, Route } from "react-router-dom";

import { PATHS_CORE } from "./common/constants/paths";
import PrivateRoute from "./common/router/PrivateRoute";
import useTokenListener from "./common/auth/useTokenListener";

import Homepage from "./features/Homepage";
import ForgotPassword from "./features/ForgotPassword";

import Page2 from "./features/page2";
import NotFound from "./features/NotFound";

import Page3 from "./features/Page3";
import Register from "./features/register";

const Router = () => {
  useTokenListener();

  return (
    <Routes>
      <Route
        path={PATHS_CORE.HOMEPAGE}
        element={<Homepage />}
        // exact - this no longer is needed (rr6 looks for exact matches by default)
      />
      <Route
        path={PATHS_CORE.REGISTER}
        element={<Register />}
        // exact - this no longer is needed (rr6 looks for exact matches by default)
      />
      <Route
        path={PATHS_CORE.PASSWORD_FORGOT}
        element={<ForgotPassword />}
        // exact - this no longer is needed (rr6 looks for exact matches by default)
      />

      <Route path={PATHS_CORE.PAGE2} element={<Page2 />} />

      <Route
        path={PATHS_CORE.PAGE3}
        element={
          <PrivateRoute>
            <Page3 />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
