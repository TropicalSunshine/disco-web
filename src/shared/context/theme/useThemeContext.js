import { useContext } from "react";
import ThemeContext from "./ThemeContext";

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;