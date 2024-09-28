import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { Link } from "react-router-dom";
import { PATHS_CORE } from "../common/constants/paths";

const Page2 = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>PAGE 2</h1>
      <button onClick={() => i18n.changeLanguage("en")}>change language</button>
      <button onClick={() => i18n.changeLanguage("pl")}>zmeń jezyk</button>

      <p>onlyTranslationFile: {t("onlyTranslationFile")}</p>
      <p>welcome: {t("welcome")}</p>

      <Link to={PATHS_CORE.HOMEPAGE}>Go to page 1</Link>
      <br />
      <Link to={PATHS_CORE.PAGE2}>Go to page 2</Link>
      <br />
      <Link to={PATHS_CORE.PAGE3}>Go to page 3 - protected</Link>
    </>
  );
};

export default Page2;
