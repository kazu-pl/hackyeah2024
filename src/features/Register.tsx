import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
// import "./Register.styles.css";

import BasicLoginLayout from "../layouts/BasicLoginLayout";
import { useLocalizedYup } from "../common/yup/useLocalizedYup";
import { removeTokens } from "../common/auth/tokens";
import TextFieldFormik from "../components/formik/TextFieldFormik";
import Box from "@mui/material/Box";
import CheckboxFormik from "../components/formik/CheckboxFormik";

import LowerFormLink from "../components/LowerFormLink";
import { PATHS_CORE } from "../common/constants/paths";
import Button from "../components/Button";
import { Typography } from "@mui/material";

interface LoginFormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  rememberMe?: boolean;
}

const initialValues: LoginFormValues = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
  rememberMe: true,
};

const handleRememberMe = () => {
  removeTokens();
};

const Register = () => {
  const { t } = useTranslation();
  const yup = useLocalizedYup();

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    rememberMe: yup.boolean(),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    if (!values.rememberMe) {
      // if you login and rememberMe is false, then add listener that will remove tokens from LocalStorage when user closes the tab or the whole browser
      window.addEventListener("unload", handleRememberMe);
    }

    try {
      const makeFakeLogin = () =>
        new Promise((res) => {
          setTimeout(() => {
            alert("ok");
            res("");
          }, 2000);
        });

      makeFakeLogin();
      // await dispatch(login({ values, cancelToken: loginSource.token }));
      // if (location.state && location.state[urlFromQuery]) {
      //   navigate(location.state[urlFromQuery]); // I can't use path() here because location.state[urlFromQuery] can be from axiosInterceptor where I can't use PathWithoutLang to pass only path without lang prefix
      // } else {
      //   navigate(path(PATHS_DASHBOARD.DASHBOARD));
      // }
    } catch (err) {
      alert(err as string);
    }
  };

  return (
    <BasicLoginLayout title={t("signup")}>
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

      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
        <Typography>{t("alreadyHaveAnAccount")}</Typography>
        <LowerFormLink to={PATHS_CORE.REGISTER} label={t("login")} />
      </Box>
    </BasicLoginLayout>
  );
};

export default Register;
