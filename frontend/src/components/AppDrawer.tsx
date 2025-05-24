import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { navigation } from "../navigation";
import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";

const drawerWidth = 240;
interface Props {
  window?: () => Window;
}

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Typography variant="body1" component="h1" fontWeight={600} sx={{ my: 2 }}>
        BudgetTracker
      </Typography>
      <Divider />
      <List>
        {navigation.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "black" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "white",
          borderBottom: `1px solid #ddd`,
          color: "black",
        }}
      >
        <Toolbar sx={{ mx: 2, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: "black", mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="body1"
              component="h1"
              fontWeight={600}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              BudgetTracker
            </Typography>
            <Divider
              orientation="vertical"
              sx={{
                display: { xs: "none", xl: "flex" },
                justifyContent: "center",
                borderColor: "#ddd",
                height: "30px",
                p: 2,
                mr: 2,
              }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navigation.map((item) => (
                <Link
                  to={item.path}
                  key={item.label}
                  style={{
                    color: "black",
                    marginRight: 28,
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <UserDropdown />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            style: { backgroundColor: "white", color: "black" },
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
