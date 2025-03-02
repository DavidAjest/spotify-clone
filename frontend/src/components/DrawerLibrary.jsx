import { useContext } from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MailIcon from "@mui/icons-material/Mail";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import PauseIcon from "@mui/icons-material/Pause";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
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
  const {
    currentSong,
    isPlaying,
    songs,
    playerRefs,
    playingButton,
    // newSongDispatch,
    // artist,
    isPlayingBottomPlayer,
  } = useContext(NewSongsContext);

  const { window } = props;
  const { user, likedSongs } = useAuthContext();

  const likedSongsByUser = songs.filter((song) =>
    likedSongs.includes(song._id)
  );

  // // const { artists, dispatch: artistDispatch } = useContext(ArtistsContext);
  // // const artistOfSongsLiked = artists.filter((artist) =>
  // //   artist.songs.some((song) => song._id === currentSong)
  // // );
  // console.log("this is from drawer ARTIST", artists);
  // console.log("this is from Drawer Library likedSongsByUser", likedSongsByUser);
  // console.log("this is from Drawer Library", likedSongs);
  const drawer = (
    <div>
      <Toolbar sx={{ marginBottom: "0" }} />
      {/* <Divider /> */}
      {user ? (
        <List sx={{ color: "blue" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.87)",
            }}
          >
            Liked Songs
          </Typography>
          {likedSongsByUser.map((song) => (
            <ListItem key={song._id} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box>
                      <IconButton
                        onClick={() =>
                          playingButton(
                            isPlaying,
                            playerRefs.current.get(song._id),
                            currentSong,
                            song._id,
                            isPlayingBottomPlayer
                          )
                        }
                        aria-label="play/pause"
                      >
                        {currentSong === song._id && isPlaying ? (
                          <PauseIcon
                            sx={{
                              padding: 1,
                              height: 20,
                              width: 20,
                              color: "white",
                            }}
                          />
                        ) : (
                          <PlayArrowIcon
                            sx={{
                              padding: 1,
                              height: 20,
                              width: 20,
                              color: "white",
                            }}
                          />
                        )}
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        padding: "0.5%",
                        alignItems: "center",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 45, height: 45 }}
                        image={song.image}
                        alt="Live from space album cover"
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 200,
                        marginLeft: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography component="h7" variant="h7">
                        {song.title}
                      </Typography>

                      <Typography
                        variant="subtitle1"
                        component="div"
                      ></Typography>
                    </Box>
                  </Box>
                </ListItemIcon>
                <ListItemText />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 1,
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            To access your liked songs
            <Link style={{ color: "white" }} to="/api/user/login">
              <Button
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                Sign in
              </Button>
            </Link>
          </Typography>
        </Box>
      )}
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
            backgroundColor: "black",
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
            minWidth: "350px",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
