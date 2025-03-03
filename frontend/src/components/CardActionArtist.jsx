import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardActionArtist({ artist }) {
  return (
    <Card
      sx={{
        width: "18%",
        minWidth: "150px",
        m: 2,
        backgroundColor: "transparent",
        color: "white",
      }}
    >
      <CardActionArea component={Link} to={`/api/artists/${artist._id}`}>
        <CardMedia
          style={{
            borderRadius: "50%", // Makes the image round
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",

            // Ensures the image covers the area without distortion
          }}
          className="img-artist-home"
          component="img"
          image={artist.image}
          alt="green iguana"
        />
        <CardContent>
          <Box sx={{ width: "100%", maxWidth: 500 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {artist.name}
            </Typography>
            <Typography variant="h7" sx={{ color: "grey" }}>
              {artist.type}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
