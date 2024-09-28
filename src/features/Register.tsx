import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";

import BasicLoginLayout from "../layouts/BasicLoginLayout";
import { useLocalizedYup } from "../common/yup/useLocalizedYup";
import TextFieldFormik from "../components/formik/TextFieldFormik";
import Box from "@mui/material/Box";

import LowerFormLink from "../components/LowerFormLink";
import { PATHS_CORE } from "../common/constants/paths";
import Button from "../components/Button";
import { Typography } from "@mui/material";
import AutocompleteSyncFormik from "../components/formik/AutocompleteSyncFormik";
import { useMemo } from "react";

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

interface UserStatusValue {
  id: string;
  label: string;
  code: string;
}

const Register = () => {
  const { t } = useTranslation();
  const yup = useLocalizedYup();

  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().required().oneOf(["student", "teacher"]),
  });

  const userStatusValues = useMemo(() => {
    const values: UserStatusValue[] = [
      {
        id: "student",
        label: t("form.student"),
        code: "student",
      },
      {
        id: "teacher",
        label: t("form.teacher"),
        code: "teacher",
      },
    ];

    return values;
  }, [t]);

  const handleSubmit = async (values: FormValues) => {
    console.log({ values });
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
    <BasicLoginLayout title={t("signup")} lemurPlacement="bottom-left">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextFieldFormik
              name="name"
              type="text"
              id="name"
              label={t("form.name")}
              fullWidth
            />
            <Box pt={2}>
              <TextFieldFormik
                name="email"
                type="text"
                id="email"
                label={t("form.emailInputLabel")}
                fullWidth
              />
            </Box>
            <Box pt={2}>
              <TextFieldFormik
                name="password"
                type="password"
                id="password"
                label={t("form.passwordInputLabel")}
                fullWidth
              />
            </Box>
            <Box pt={2}>
              <AutocompleteSyncFormik
                inputLabel={t("form.status")}
                name="role"
                options={userStatusValues}
                fullWidth
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
        alignItems={"center"}
        mt={2}
      >
        <Typography>{t("alreadyHaveAnAccount")}</Typography>
        <LowerFormLink to={PATHS_CORE.HOMEPAGE} label={t("login")} />
      </Box>
    </BasicLoginLayout>
  );
};

export default Register;
