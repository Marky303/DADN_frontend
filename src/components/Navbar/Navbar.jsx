import * as React from "react";
import { useEffect, useContext } from "react";
import AuthContext from "../../context/UserauthContext";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import GrassIcon from "@mui/icons-material/Grass";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

// Route -> Nav link highlight dictionary
const dict = {
  "/": "navlink-home",
  "/dashboard": "navlink-dashboard",
  "/plants": "navlink-plants",
  "/plans": "navlink-plans",
  "/info": "navlink-account"
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Get functions + variables from contexts
  let { accessToken, logout } = useContext(AuthContext);

  // Check for location and highlights
  const location = useLocation().pathname;
  useEffect(() => {
    if (dict[location] && document.getElementsByClassName(dict[location])[0]) {
      // Highlight
      let e = document.getElementsByClassName(dict[location])[0];
      e.style.color = "#ff793f";
      // Remove highlight from other elements
      for (let i in dict) {
        if (i !== location) {
          let e = document.getElementsByClassName(dict[i])[0];
          if (e) {
            e.style.color = "white";
            if (i === "/info") {
              e.style.color = "black";
            }
          }
        }
      }
    }
  }, [location]);

  // Logout
  const handleLogout = () => {
    logout();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate(); // Sử dụng useNavigate
  // Right Navbar
  const HandleClickAccout = () => {
    // Navigate to the account page
    navigate("/info");
    handleCloseUserMenu(); // Đóng menu sau khi click
  };
  const HandleClickLogout = () => {
    // Navigate to the account page
    handleLogout();
    handleCloseUserMenu(); // Đóng menu sau khi click
  };
  const HandleClickLogin = () => {
    // Navigate to the account page
    navigate("/login");
    handleCloseUserMenu(); // Đóng menu sau khi click
  };
  const HandleClickSignup = () => {
    // Navigate to the account page
    navigate("/signup");
    handleCloseUserMenu(); // Đóng menu sau khi click
  };

  // Left Navbar
  const HandleClickDashboard = () => {
    // Navigate to the account page
    navigate("/");
    handleCloseNavMenu(); // Đóng menu sau khi click
  };
  const HandleClickPlants = () => {
    // Navigate to the account page
    navigate("/plants");
    handleCloseNavMenu(); // Đóng menu sau khi click
  };
  const HandleClickPlans = () => {
    // Navigate to the account page
    navigate("/plans");
    handleCloseNavMenu(); // Đóng menu sau khi click
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GrassIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {import.meta.env.VITE_APPLICATION_NAME}
          </Typography>

          { accessToken && <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem key={"Dashboard"} onClick={HandleClickDashboard}>
                <Typography sx={{ textAlign: "center" }} className="navlink-dashboard">Dashboard</Typography>
              </MenuItem>
              <MenuItem key={"Plants"} onClick={HandleClickPlants}>
                <Typography sx={{ textAlign: "center" }} className="navlink-plants">Plants</Typography>
              </MenuItem>
              <MenuItem key={"Plans"} onClick={HandleClickPlans}>
                <Typography sx={{ textAlign: "center" }} className="navlink-plans">Plans</Typography>
              </MenuItem>
            </Menu>
          </Box>}
          <GrassIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {import.meta.env.VITE_APPLICATION_NAME}
          </Typography>
          {accessToken ? (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key={"Dashboard"}
                className="navlink-dashboard"
                onClick={HandleClickDashboard}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button>
              <Button
                key={"Plants"}
                className="navlink-plants"
                onClick={HandleClickPlants}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Plants
              </Button>
              <Button
                key={"Plans"}
                className="navlink-plans"
                onClick={HandleClickPlans}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Plans
              </Button>
            </Box>
          ) : (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          )}
          {/* Right Navbar */}
          {accessToken ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/472216957_1924617648026190_5823984232582036858_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGhfUvwlJn7Uq3b3j5yplmEl_szgKf1KTKX-zOAp_UpMth3c9rqnFKjlwb9ZUEAgNnkW60p7eSV_D8onxTLgx7L&_nc_ohc=0h4Sn3echA0Q7kNvgFngwZE&_nc_oc=AdkIYl5DxlAZFX6kZ0utWqOs1LwrsRYRAkDMTJPYh8J8acQpvM-HrjlupfKagqtT-70&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=2FUrLzxo5RY-w2oYgzzNhQ&oh=00_AYHREaJ1rBjv3TB8ZQ1GuBzjbFceT7ptiO4AFk1qtgC83g&oe=67E96688"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={HandleClickAccout} className="navlink-account">
                  <ListItemIcon>
                    <PersonOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Account</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={HandleClickLogout} className="navlink-logout">
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Login or Register">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={HandleClickLogin}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={HandleClickSignup}>
                  <ListItemIcon>
                    <AppRegistrationIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Signup</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
