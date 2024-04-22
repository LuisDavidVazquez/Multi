export const navigations = [
  { name: "Home", path: "/dashboard/default", icon: "dashboard" },
  // { label: "PAGES", type: "label" },

  // { label: "Components", type: "label" },
  { name: "Plantulas", path: "/material/form", iconText: "P" },
  {
    name: "Graficas",
    icon: "chart",
    children: [
      { name: "Temperatura", iconText: "T", path: "/charts/echartsTemperatura" },
      { name: "Humedad", iconText: "H", path: "/charts/echartsHumedad" },
      {
        name: "Ph",
        iconText: "PH",
        path: "/charts/echartsPh",
      },
      { name: "Agua", iconText: "A", path: "/charts/echartsAgua" },
    ],
  },
  // {
  //   name: "Components",
  //   icon: "favorite",
  //   badge: { value: "-", color: "secondary" },
  //   children: [
  //     // { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
  //     // { name: "Buttons", path: "/material/buttons", iconText: "B" },
  //     // { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
  //     // { name: "Dialog", path: "/material/dialog", iconText: "D" },
  //     // { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
  //     { name: "Form", path: "/material/form", iconText: "F" },
  //     // { name: "Icons", path: "/material/icons", iconText: "I" },
  //     // { name: "Menu", path: "/material/menu", iconText: "M" },
  //     // { name: "Progress", path: "/material/progress", iconText: "P" },
  //     // { name: "Radio", path: "/material/radio", iconText: "R" },
  //     // { name: "Switch", path: "/material/switch", iconText: "S" },
  //     // { name: "Slider", path: "/material/slider", iconText: "S" },
  //     // { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
  //     // { name: "Table", path: "/material/table", iconText: "T" }
  //   ],
  // },
  // {
  //   name: "Charts",
  //   icon: "trending_up",
  //   children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }],
  // },
  {
    name: "Guia",
    icon: "launch",
  
    path: "/Informacion",
  },
  {
    name: "Documentación",
    icon: "launch",
    type: "extLink",
    path: "https://drive.google.com/file/d/136Qpip1BTMl6TJk5baA4H2M_hagJ_1-g/view",
  },
];
