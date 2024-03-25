import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
//import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../pages/Dashboard/DashboardTheme.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const DashboardSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Sidebar collapsed={isCollapsed} width="10%">
      <Menu iconShape="square">
        <MenuItem icon={<BarChartOutlinedIcon />} onClick={() => handleItemClick('bar')} />
        <MenuItem icon={<PieChartOutlineOutlinedIcon />} onClick={() => handleItemClick('pie')} />
        <MenuItem icon={<TimelineOutlinedIcon />} onClick={() => handleItemClick('line')} />
        <MenuItem icon={<MapOutlinedIcon />} onClick={() => handleItemClick('geography')} />
        <MenuItem icon={<PersonOutlinedIcon />} onClick={() => handleItemClick('form')} />
        <MenuItem icon={<CalendarTodayOutlinedIcon />} onClick={() => handleItemClick('calendar')} />
        <MenuItem icon={<HelpOutlineOutlinedIcon />} onClick={() => handleItemClick('faq')} />
      </Menu>
    </Sidebar>
  );
};

export default DashboardSidebar;
