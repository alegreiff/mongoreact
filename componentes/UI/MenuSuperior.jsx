import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { estadoUsuario } from "../../data/StateZustand";
import { auth } from "../../data/firebase";
import { menu } from "../../data/elementosMenu.js";
import Link from "next/link";
import { NaviLink } from "../../utils/NaviLink";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const MenuSuperior = () => {
  const { setUsuario, usuario } = estadoUsuario((state) => state);
  const [mmenu, setMmenu] = useState([]);
  useEffect(() => {
    const elementos = menu.filter((e) => e.auth);
    setMmenu(elementos);
  }, []);
  const cierraSesion = async () => {
    await auth.signOut();
    setUsuario(null);
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            @alegreiff
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {mmenu.map((item) => (
                <MenuItem key={item.id} onClick={handleCloseNavMenu}>
                  <Link
                    key={item.id}
                    href={item.enlace}
                    handleCloseNavMenu={handleCloseNavMenu}
                  >
                    {item.nombre}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {mmenu.map((item) => (
              <NaviLink
                key={item.id}
                enlace={item.enlace}
                nombre={item.nombre}
                handleCloseNavMenu={handleCloseNavMenu}
              ></NaviLink>
            ))}
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained" onClick={cierraSesion}>
              {" "}
              Salir{" "}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuSuperior;
