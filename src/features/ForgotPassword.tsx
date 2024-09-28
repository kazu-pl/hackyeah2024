import { useTranslation } from "react-i18next";

import BasicLoginLayout from "../layouts/BasicLoginLayout";

const Homepage = () => {
  const { t } = useTranslation();

  return <BasicLoginLayout title={t("form.forgotPassword")}></BasicLoginLayout>;
};

export default Homepage;
