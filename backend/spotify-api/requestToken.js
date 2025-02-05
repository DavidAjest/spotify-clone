const { exec } = require("child_process");
require("dotenv").config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const command = `curl -s -X POST "https://accounts.spotify.com/api/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}"`;

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
    console.log(`Raw Response: ${stdout}`); // Debugging line to print the raw response
    const response = JSON.parse(stdout);
    const accessToken = response.access_token;
    console.log(`Access Token: ${accessToken}`);
  } catch (parseError) {
    console.error(`Failed to parse response: ${parseError.message}`);
  }
});
