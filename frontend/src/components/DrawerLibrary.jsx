import React, { useContext } from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
// import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { NewSongsContext } from "../context/NewSongContext";

// import { NewSongsContext } from "../context/NewSongContext";
// import { useAuthContext } from "../hooks/useAuthContext";

const drawerWidth = `30%`;
export default function DrawerLibrary({
  props,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}) {
  const { songs } = useContext(NewSongsContext);
  const { window } = props;
  const { user, likedSongs, dispatch: authDispatch } = useAuthContext();

  const likedSongsByUser = songs.filter((song) =>
    likedSongs.includes(song._id)
  );

  console.log("this is from Drawer Library likedSongsByUser", likedSongsByUser);
  console.log("this is from Drawer Library", likedSongs);
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Typography variant="h5" sx={{ color: "white" }}>
        Library
      </Typography>

      <List sx={{ color: "blue" }}>
        {likedSongsByUser.map((song) => (
          <ListItem key={song._id} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}>{song.title}</ListItemIcon>
              <ListItemText />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List sx={{ color: "green" }}>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, zIndex: 30, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",

            zIndex: 0,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: " rgb(30, 30, 30)",
            marginTop: "77px",
            borderRadius: "10px",
            marginBottom: `30%`,
            marginLeft: 2,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
