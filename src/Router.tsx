import { Routes, Route } from "react-router-dom";

import { PATHS_CORE } from "./common/constants/paths";

import useTokenListener from "./common/auth/useTokenListener";
import Homepage from "./features/Homepage";
import Page2 from "./features/page2";
import NotFound from "./features/NotFound";
import PrivateRoute from "./common/router/PrivateRoute";
import Page3 from "./features/Page3";

const Router = () => {
  useTokenListener();

  return (
    <Routes>
      <Route
        path={PATHS_CORE.HOMEPAGE}
        element={<Homepage />}
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
