import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";

import materialRoutes from "app/views/material-kit/MaterialRoutes";

// SESSION PAGES

const NotFound = Loadable(lazy(() => import("app/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("app/views/sessions/JwtLogin")));
const JwtRegister = Loadable(
  lazy(() => import("app/views/sessions/JwtRegister"))
);
const Tutorial = Loadable(
  lazy(() => import("app/views/charts/echarts/Informacion"))
);
const ForgotPassword = Loadable(
  lazy(() => import("app/views/sessions/ForgotPassword"))
);
// E-CHART PAGE
const AppEchart = Loadable(
  lazy(() => import("app/views/charts/echarts/LineChart"))
);
const AppEchartTemperatura = Loadable(
  lazy(() => import("app/views/charts/echarts/EchartTemperatura"))
);
const AppEchartHumedad = Loadable(
  lazy(() => import("app/views/charts/echarts/EchartHumedad"))
);
const AppEchartAgua = Loadable(
  lazy(() => import("app/views/charts/echarts/EchartAgua"))
);
const AppEchartPh = Loadable(
  lazy(() => import("app/views/charts/echarts/EchartPh"))
);
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: "/dashboard/default",
        element: <Analytics />,
        auth: authRoles.admin,
      },
      // e-chart route
      {
        path: "/charts/echartsTemperatura",
        element: <AppEchartTemperatura />,
        auth: authRoles.editor,
      },
      {
        path: "/charts/echartsAgua",
        element: <AppEchartAgua />,
        auth: authRoles.editor,
      },
      {
        path: "/charts/echartsHumedad",
        element: <AppEchartHumedad />,
        auth: authRoles.editor,
      },
      {
        path: "/charts/echartsPh",
        element: <AppEchartPh />,
        auth: authRoles.editor,
      },
      {
        path: "/informacion",
        element: <Tutorial/>,
        auth: authRoles.editor,
      },
    ],
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },

  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
