import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import budget from "../assets/budget.png"

function AuthRoot() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${budget})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </Box>
  );
}

export default AuthRoot;
