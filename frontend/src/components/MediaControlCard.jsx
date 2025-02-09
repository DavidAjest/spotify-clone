// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function MediaControlCard({ song }) {
  // const theme = useTheme();

  return (
    <Card sx={{ margin: "1%", display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton> */}
        <IconButton aria-label="play/pause">
          <PlayArrowIcon sx={{ padding: 1, height: 20, width: 20 }} />
        </IconButton>
        {/* <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton> */}
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
          display: "flex",
          paddingLeft: "1%",
          alignItems: "center",
        }}
        component="div"
      >
        <Typography component="h5" variant="h5">
          {song.title}
        </Typography>
      </Box>
    </Card>
  );
}
