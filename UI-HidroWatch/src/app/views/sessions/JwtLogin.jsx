import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  Checkbox,
  Grid,
  TextField,
  Box,
  styled,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";

import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

// STYLED COMPONENTS
const FlexBox = styled(Box)(() => ({
  display: "flex",
}));

const ContentBox = styled("div")(() => ({
  borderColor: "rgba(0,0,0,0.1)",
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "linear-gradient(45deg, #311b92, #673ab7)",
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
}));

const CustomCard = styled(Card)(() => ({
  borderColor: "#000",
  maxWidth: 800,
  minHeight: 400,
  margin: "1rem",
  display: "flex",
  borderRadius: 12,
  alignItems: "center",
}));

// initial login credentials
const initialValues = {
  email: "correo@upchiapas.com",
  password: "dummyPass",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

export default function JwtLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate("/dashboard/default");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <StyledRoot>
      <CustomCard>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <div className="img-wrapper">
              <img
                src="/assets/images/logos/LogoH.png"
                width="100%"
                alt=""
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                      InputProps={{
                        style: { color: "#fff" },
                      }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Contrasena"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                      InputProps={{
                        style: { color: "#fff" },
                      }}
                    />

                    <FlexBox justifyContent="space-between" alignItems="center">
                      <FlexBox gap={1} alignItems="center">
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{ padding: 0, color: "#fff" }}
                        />

                        <Paragraph sx={{ color: "#fff" }}>Recuerdame</Paragraph>
                      </FlexBox>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                    >
                      Iniciar sesion
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </CustomCard>
    </StyledRoot>
  );
}
