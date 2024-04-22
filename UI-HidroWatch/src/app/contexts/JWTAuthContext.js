import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { MatxLoading } from "app/components";
import opt from "../../settings.json";

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isAuthenticated: !!action.payload.user,
        isInitialized: true,
        user: action.payload.user,
      };
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    case "REGISTER":
      return { ...state, isAuthenticated: true, user: action.payload.user };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  login: () => { },
  logout: () => { },
  register: () => { },
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await axios.post(
      `${opt.protocol}://${opt.host}:${opt.port}/users/access`,
      {
        email,
        password,
      }
    );
    console.log("response", response);
    const token1 = response.data.data.token;
    const email1 = response.data.data.email;
    const id1 = response.data.data.id;
    const station_id1 = response.data.data.station_id;
    console.log(token1, email1);
    localStorage.setItem("jwtToken", token1); // Guardar el token en localStorage
    localStorage.setItem("user", JSON.stringify(email1)); // Guardar el usuario en localStorage
    localStorage.setItem("id", JSON.stringify(id1));
    localStorage.setItem("station_id", JSON.stringify(station_id1));
    console.log("response", response);

    dispatch({ type: "LOGIN", payload: { email1 } });

  };

  const register = async (correo, nombre, contrasena) => {
    const response = await axios.post(
      `${opt.protocol}://${opt.host}:${opt.port}/usuarios/one`,
      {
        correo,
        nombre,
        contrasena,
      }
    );
    const { user } = response.data;

    dispatch({ type: "REGISTER", payload: { user } });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("jwtToken");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch({ type: "INIT", payload: { user } });
      } else {
        dispatch({ type: "INIT", payload: { user: null } });
      }
    };

    init();
  }, []);

  // SHOW LOADER
  if (!state.isInitialized) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
