import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// import { NewSongsContext } from "../context/NewSongContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DrawerLibrary from "./DrawerLibrary";
import { useLogout } from "../hooks/useLogout";

const drawerWidth = `30%`;

function ResponsiveNavBarDrawer(props) {
  // adding player to responsive drawer

  const { logout } = useLogout();
  const { user, dispatch } = useAuthContext();

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "black",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center", // Ensure items are centered vertically
              width: "100%", // Ensure the Box takes full width
            }}
          >
            <Box>
              <Typography variant="h6" noWrap component="div">
                <Link style={{ color: "white" }} to="/home">
                  {" "}
                  Spotify welcome {user && user.email}
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              {!user && (
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h6" noWrap component="div">
                    <Link
                      style={{ color: "white", marginRight: "0" }}
                      to="/api/user/login"
                    >
                      <Button> LOGIN </Button>
                    </Link>
                  </Typography>
                  <Typography variant="h6" noWrap component="div">
                    <Link
                      style={{ color: "white", marginRight: "0" }}
                      to="/api/user/signup"
                    >
                      <Button> SINGUP </Button>
                    </Link>
                  </Typography>
                </Box>
              )}
              {user && (
                <Box>
                  <Typography variant="h6" noWrap component="div">
                    <Link style={{ color: "white", marginRight: "0" }}>
                      <Button onClick={() => logout()}> Logout </Button>
                    </Link>
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {!user ? (
        <h2>Please sign in first</h2>
      ) : (
        <DrawerLibrary
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          props={props}
        />
      )}
    </Box>
  );
}

ResponsiveNavBarDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveNavBarDrawer;
