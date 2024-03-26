import React, { useContext } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from '../../pages/Dashboard/DashboardTheme.js'; // Ajusta la ruta según la ubicación real
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";

const TopBar = ({ colorMode, theme }) => {
  const mode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <div className='dashboard-title'><h2>Dashboard</h2></div>
      <Box
        display="flex"
        backgroundColor={theme.palette.primary[400]}
        borderRadius="3px"
      >
        {/* Aquí va tu barra de búsqueda */}
        <IconButton type="button" sx={{ p: 1 }}>
     
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        {/* Agrega tus otros iconos aquí */}
      </Box>
    </Box>
  );
};

export default TopBar;
