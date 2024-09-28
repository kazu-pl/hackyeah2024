import { Navigate, RouteProps, useNavigate } from "react-router-dom";
import { PATHS_CORE } from "../constants/paths";
import { getTokens, isTokenExpired } from "../auth/tokens";
import UserProfileWrapper from "../wrappers/UserProfileWrapper";

// import { refreshAccessToken } from "core/store/userSlice";

import { useState, useLayoutEffect } from "react";

import { useTranslation } from "react-i18next";
import { urlFromQuery } from "../auth/useTokenListener";

export type PrivateRouteProps = RouteProps & {
  allowedRolle?: "student" | "teacher";
};

const PrivateRoute = ({ children }: RouteProps) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const tokens = getTokens();
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  useLayoutEffect(() => {
    const handleRefreshToken = async () => {
      try {
        // await refreshAccessToken();
        setIsCheckingAuth(false);
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const error = err;

        const from = window.location.href.slice(window.location.origin.length);

        setIsCheckingAuth(false);
        alert(t("notifications.sessionEnd"));
        navigate(PATHS_CORE.HOMEPAGE, {
          state: {
            [urlFromQuery]: from,
          },
        });
      }
    };

    if (
      tokens &&
      isTokenExpired(tokens.accessToken) &&
      !isTokenExpired(tokens.refreshToken)
    ) {
      setIsCheckingAuth(true);
      handleRefreshToken();
    }
  }, [tokens, navigate, t]);

  if (!tokens) {
    const from = window.location.href.slice(window.location.origin.length);
    return (
      <Navigate
        to={PATHS_CORE.HOMEPAGE}
        replace
        state={{
          [urlFromQuery]: from,
        }}
      />
    );
  }

  if (
    isTokenExpired(tokens!.refreshToken) &&
    isTokenExpired(tokens!.accessToken)
  ) {
    t("notifications.sessionEnd");
    const from = window.location.href.slice(window.location.origin.length);
    return (
      <Navigate
        to={PATHS_CORE.HOMEPAGE}
        replace
        state={{
          [urlFromQuery]: from,
        }}
      />
    );
  }

  return isCheckingAuth ? (
    <p>Authorizing...</p>
  ) : (
    <UserProfileWrapper>{children}</UserProfileWrapper>
  );
};

export default PrivateRoute;
