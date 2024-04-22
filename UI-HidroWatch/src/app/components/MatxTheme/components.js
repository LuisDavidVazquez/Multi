import { themeShadows } from "./themeColors";

export const components = {
  MuiTable: {
    styleOverrides: {
      root: { tableLayout: "fixed" },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: { fontSize: "13px", padding: "12px 0px", color: "#FFFFFF" },
      root: {
        fontSize: "14px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
        padding: "12px 8px 12px 0px",
        color: "#FFFFFF",
      },
    },
  },
  MUIDataTableSelectCell: {
    styleOverrides: {
      root: { paddingLeft: 12 },
    },
  },
  MUIDataTableHeadCell: {
    styleOverrides: {
      root: { paddingLeft: 16 },
    },
  },
  MUIDataTableBodyCell: {
    styleOverrides: {
      root: { paddingLeft: 8 },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontSize: "14px",
        textTransform: "none",
        fontWeight: "400",
        color: "#FFFFFF",
        backgroundColor: "#6A1B9A", // Morado
        "&:hover": {
          backgroundColor: "#9C4DCC", // Morado más claro al pasar el mouse
        },
      },
      contained: {
        boxShadow:
          "0px 3px 3px -2px rgba(0, 0, 0, 0.6), 0px 3px 4px 0px rgba(0, 0, 0, 0.4), 0px 1px 8px 0px rgba(0, 0, 0, 0.4) !important",
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      "*": { boxSizing: "border-box" },
      html: {
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        height: "100%",
        width: "100%",
      },
      body: { height: "100%", backgroundColor: "#6A1B9A" }, // Morado
      a: { textDecoration: "none", color: "inherit" },
      "#root": { height: "100%" },
      "#nprogress .bar": { zIndex: "2000 !important" },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow:
          "0px 4px 5px 0px rgba(0, 0, 0, 0.6), 0px 3px 14px 0px rgba(0, 0, 0, 0.4), 0px 8px 10px 1px rgba(0, 0, 0, 0.4) !important",
        backgroundColor: "#6A1B9A", // Morado
        color: "#FFFFFF", // Blanco
        "&:hover": {
          backgroundColor: "#9C4DCC", // Morado más claro al pasar el mouse
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        "&:before": { display: "none" },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        fontSize: "11px",
        backgroundColor: "#6A1B9A",
        color: "#FFFFFF",
      }, // Morado con texto blanco
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontSize: "0.875rem",
        color: "#FFFFFF", // Blanco
      },
    },
  },
  MuiExpansionPanel: {
    styleOverrides: {
      root: {
        "&:before": {
          display: "none",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        boxShadow:
          "0px 3px 3px -2px rgba(0, 0, 0, 0.6), 0px 3px 4px 0px rgba(0, 0, 0, 0.4), 0px 1px 8px 0px rgba(0, 0, 0, 0.4) !important",
        backgroundColor: "#FFFFFF", // Blanco
        color: "#000000", // Negro
      },
    },
  },
};
