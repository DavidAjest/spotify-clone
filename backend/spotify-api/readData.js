const { exec } = require("child_process");
require("dotenv").config();

// const clientId = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;
const accessToken = process.env.ACCESS_TOKEN;

const artistId = process.env.ARTIST_ID;
const command = `curl -s -X GET "https://api.spotify.com/v1/artists/${artistId}" \
  -H "Authorization: Bearer ${accessToken}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  try {
    console.log(`bruno mars response: ${stdout}`); // Debugging line to print the raw response
  } catch (parseError) {
    console.error(`Failed to parse response: ${parseError.message}`);
  }
});
