import { ReactNode } from "react";

import Page404 from "../../features/NotFound";

export interface NotFoundWrapperProps {
  isLoadingData: boolean;
  isNotFound: boolean;
  children: ReactNode;
}

const NotFoundWrapper = ({
  children,
  isLoadingData,
  isNotFound,
}: NotFoundWrapperProps) => {
  return isLoadingData ? (
    <p>loading...</p>
  ) : isNotFound ? (
    <Page404 />
  ) : (
    <>{children}</>
  );
};

export default NotFoundWrapper;
