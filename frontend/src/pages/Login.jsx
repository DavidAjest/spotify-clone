import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLogin } from "../hooks/useLogin";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

// import { useSignup } from "../hooks/useSignup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit", email, password);
    await login(email, password);
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
              Login to spotify-clone
            </Typography>
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
              LogIn
            </Button>

            <Typography
              variant="h8"
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              dont have an account?
              <Link to="/api/user/signup"> sign up to spotify-clone here</Link>
            </Typography>
          </Box>
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
    </>
  );
};

export default Login;
