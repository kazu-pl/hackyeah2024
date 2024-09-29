import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
// import "./Homepage.styles.css";

import BasicLoginLayout from "../../layouts/BasicLoginLayout";
import { useLocalizedYup } from "../../common/yup/useLocalizedYup";
import TextFieldFormik from "../../components/formik/TextFieldFormik";
import Box from "@mui/material/Box";
import CheckboxFormik from "../../components/formik/CheckboxFormik";

import LowerFormLink from "../../components/LowerFormLink";
import { PATHS_CORE } from "../../common/constants/paths";
import Button from "../../components/Button";
import { Typography } from "@mui/material";
import { getAccount } from "../../common/auth/account";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const initialValues: LoginValues = {
  email: "",
  password: "",
  rememberMe: true,
};

const Homepage = () => {
  const { t } = useTranslation();
  const yup = useLocalizedYup();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    rememberMe: yup.boolean(),
  });

  const handleSubmit = async () => {
    const makeFakeLogin = () =>
      new Promise((res) => {
        setTimeout(() => {
          res("");
        }, 200);
      });

    await makeFakeLogin();

    const account = getAccount();

    if (!account) {
      alert(t("accountDoesNotExist"));
    } else {
      navigate(PATHS_CORE.DASHBOARD);
    }
  };

  return (
    <BasicLoginLayout title={t("login")}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextFieldFormik
              name="email"
              type="text"
              id="email"
              label={t("form.emailInputLabel")}
              fullWidth
            />
            <Box pt={2}>
              <TextFieldFormik
                name="password"
                type="password"
                id="password"
                label={t("form.passwordInputLabel")}
                fullWidth
              />
            </Box>

            <Box
              pt={2}
              display="flex"
              justifyContent="space-between"
              alignItems={"center"}
            >
              <CheckboxFormik
                name="rememberMe"
                id="rememberMe"
                label={t("form.rememberMe")}
              />

              <LowerFormLink
                to={PATHS_CORE.PASSWORD_FORGOT}
                label={t("form.forgotPassword")}
              />
            </Box>

            <Box pt={2} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                type="submit"
                isLoading={isSubmitting}
                fullWidth
              >
                {t("buttons.login")}
              </Button>
            </Box>
            {/* <Box pt={2} display="flex" justifyContent="flex-end">
              <LowerFormLink
                to={PATHS_CORE.PASSWORD_FORGOT}
                label={t("form.forgotPassword")}
              />
            </Box> */}
          </Form>
        )}
      </Formik>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        mt={2}
        alignItems={"center"}
      >
        <Typography>{t("youDontHaveAccount")}</Typography>
        <LowerFormLink to={PATHS_CORE.REGISTER} label={t("signup")} />
      </Box>
    </BasicLoginLayout>
  );
};

export default Homepage;
