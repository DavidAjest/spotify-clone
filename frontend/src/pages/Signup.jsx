import { useState } from "react";
import { Typography } from "@mui/material";
import { useSignup } from "../hooks/useSignup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, username);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          height: "75vh",

          borderRadius: 10,
          padding: "2rem", // Optional: padding for the form

          background:
            "linear-gradient(to top right,rgb(57, 57, 57),rgb(0, 0, 0))", // Corrected gradient background
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            borderRadius: 5,
            background:
              "linear-gradient(to top right,rgb(125, 125, 125),rgb(213, 213, 213))", // Corrected gradient background
            padding: 15,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                marginBottom: "10%",
                width: "100%",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Signup to spotify-clone
            </Typography>
          </Box>
          <Box>
            <TextField
              sx={{ marginBottom: "10%" }}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="current-email"
              id="outlined-basic"
              label="Enter Username"
              variant="outlined"
            />
          </Box>
          <Box>
            <TextField
              sx={{ marginBottom: "10%" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="current-email"
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
            />
          </Box>
          <Box>
            <TextField
              sx={{ marginBottom: "10%", color: "white" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              id="outlined-basic"
              label="Enter Password"
              variant="outlined"
            />
          </Box>
          <Box>
            <Button
              sx={{
                width: "100%",
                borderRadius: 5,
                backgroundColor: "green",
                color: "black",
                fontWeight: "bold",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)", // Scale up the button on hover
                },
              }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Signup
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10%",
              }}
            >
              {error && (
                <div
                  style={{
                    position: "absolute",

                    borderRadius: 5,
                    backgroundColor: "rgb(162, 111, 111)",
                    color: "white",
                    padding: 5,
                    marginTop: 10,
                  }}
                  className="error"
                >
                  {error}
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <form action="" onSubmit={handleSubmit} className="signup">
        <h3>Sign up</h3>
        <label htmlFor="">Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="">Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form> */}
    </>
  );
};

export default Signup;
