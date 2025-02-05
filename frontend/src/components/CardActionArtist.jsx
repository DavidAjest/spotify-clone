import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardActionArtist({ artist }) {
  return (
    <Card sx={{ width: "18%", minWidth: "150px", m: 2 }}>
      <CardActionArea component={Link} to={`/api/artists/${artist.id}`}>
        <CardMedia
          style={{
            borderRadius: "50%", // Makes the image round
            objectFit: "cover",

            // Ensures the image covers the area without distortion
          }}
          className="img-artist-home"
          component="img"
          height="200"
          image={artist.imgURL}
          alt="green iguana"
        />
        <CardContent>
          <Box sx={{ width: "100%", maxWidth: 500 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <Link style={{ textDecoration: "none", color: "inherit" }}>
                {artist.firstName} <br></br>
              </Link>
              Artist
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
