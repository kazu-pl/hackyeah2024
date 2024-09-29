import { Routes, Route } from "react-router-dom";

import { PATHS_CORE } from "./common/constants/paths";
import useTokenListener from "./common/auth/useTokenListener";

import Homepage from "./features/Homepage";
import ForgotPassword from "./features/ForgotPassword";

import NotFound from "./features/NotFound";

import Dashboard from "./features/Dashboard";
import Register from "./features/Register";
import Account from "./features/Account";

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

      <Route path={PATHS_CORE.DASHBOARD} element={<Dashboard />} />
      <Route path={PATHS_CORE.ACCOUNT} element={<Account />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
