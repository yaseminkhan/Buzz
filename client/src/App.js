import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import EditPage from "scenes/editProfile";
import AboutPage from "scenes/aboutPage";

function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state)=> state.token));
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme = {theme}>
          <CssBaseline />
          <Routes>
            <Route path ="/" element = {<LoginPage/>}/>
            <Route 
              path ="/home" 
              element = {isAuth ? <HomePage/> : <Navigate to ="/" />}
            />
            <Route 
              path ="/profile/:userId" 
              element = {isAuth ? <ProfilePage/> : <Navigate to ="/" />}
            />
            <Route 
              path="/edit-profile/:id" 
              element = {isAuth ? <EditPage /> : <Navigate to ="/" />}
            />
            <Route 
              path ="/about" 
              element = {isAuth ? <AboutPage/> : <Navigate to ="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
