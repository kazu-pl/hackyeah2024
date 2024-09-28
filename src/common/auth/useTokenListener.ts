import { PATHS_CORE } from "../constants/paths";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { LOCALSTORAGE_AUTH_TOKENS } from "../constants/auth";

export const urlLogoutReasonQuery = {
  key: "reason",
  value: "refreshtokenexpired",
};

export const urlFromQuery = "from";

const useTokenListener = () => {
  const navigate = useNavigate(); // instead of history = useHistory()

  const handleStorageChange = useCallback(
    (e: StorageEvent) => {
      if (e.key === LOCALSTORAGE_AUTH_TOKENS && e.newValue === null) {
        navigate(
          `${PATHS_CORE.LOGOUT}?${urlLogoutReasonQuery.key}=${urlLogoutReasonQuery.value}`
        );
      }
    },
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);
};

export default useTokenListener;
