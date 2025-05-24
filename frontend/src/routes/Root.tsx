import { Box, Toolbar } from "@mui/material";
import AppDrawer from "../components/AppDrawer";
import RequireAuth from "../components/auth/RequireAuth";

function Root() {
  return (
    <Box sx={{ display: "flex", bgcolor: "white", color: "black", minHeight: "100vh" }}>
      <>
        <AppDrawer />
        <Box sx={{ p: 5, width: "100%", bgcolor: "white", color: "black" }}>
          <Toolbar />
          <RequireAuth />
        </Box>
      </>
    </Box>
  );
}

export default Root;
