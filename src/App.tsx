import React, { useState } from "react";
import {
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { AppBarComponent, SideBar, Menu } from "./components";
import { BLOTTER, MAIN, ROUTES, TRADETICKET } from "./routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Blotter, Dashboard, TradeTicket } from "./features";

export const App: React.FC = (): JSX.Element => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [sideBarToggle, setSideBarToggle] = useState<boolean>(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
    typography: {
      fontSize: 14,
    },
  });

  const handleDrawerToggle = React.useCallback(() => {
    setSideBarToggle(!sideBarToggle);
  }, [sideBarToggle]);

  const onThemeChange = React.useCallback(() => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  }, [themeMode]);

  const menuClickHandler = React.useCallback(
    (link) => {
      navigate(link);
      setSideBarToggle(!sideBarToggle);
    },
    [navigate, sideBarToggle]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBarComponent
        handleDrawerToggle={handleDrawerToggle}
        onThemeChange={onThemeChange}
        isDarkMode={themeMode === "dark"}
        isDrawerOpen={sideBarToggle}
      />
      <SideBar
        isOpen={sideBarToggle}
        handleDrawerToggle={handleDrawerToggle}
        children={<Menu links={ROUTES} menuClickHandler={menuClickHandler} />}
      />
      <Routes>
        <Route path={MAIN} element={<Dashboard />} />
        <Route path={BLOTTER} element={<Blotter />} />
        <Route path={TRADETICKET} element={<TradeTicket />} />
      </Routes>
    </ThemeProvider>
  );
};
