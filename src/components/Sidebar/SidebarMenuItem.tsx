import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useLocation } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";

import "./SidebarMenuItem.styles.css";

export interface SidebarMenuItemWithoutDropdown {
  variant: "no-dropdown";
  icon: React.ReactNode;
  label: string;
  to: string;
  renderBottomLine?: boolean;
}

export interface SidebarMenuItemWithDropdown {
  variant: "with-dropdown";
  icon: React.ReactNode;
  label: string;
  renderBottomLine?: boolean;
  dropdownItems: {
    to: string;
    label: string;
  }[];
}

export type SidebarMenuItemProps =
  | SidebarMenuItemWithoutDropdown
  | SidebarMenuItemWithDropdown;

const SidebarMenuItem = (props: SidebarMenuItemProps) => {
  const location = useLocation();

  const isSubmenuExpandedByDefault =
    props.variant === "with-dropdown"
      ? props.dropdownItems.some((item) => location.pathname.includes(item.to))
      : false;

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(
    isSubmenuExpandedByDefault
  );

  const handleClick = () => setIsSubmenuOpen((prev) => !prev);

  return props.variant === "with-dropdown" ? (
    <>
      <button className="StyledListItemButton" onClick={handleClick}>
        <ListItemIcon className="StyledListItemIcon">{props.icon}</ListItemIcon>
        <ListItemText
          className="StyledListItemText"
          primary={props.label}
          color="#ffffff"
        />
        {isSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
      </button>
      <Collapse
        // `navigator.userAgent === "ReactSnap"` checks if react-snap is running. If so, then open tabs so they are mounted into DOM so react-snap can detect its children (Links) and create links based on that
        in={isSubmenuOpen}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {props.dropdownItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className="StyledLink asSubmenuItem"
            >
              {item.label}
            </NavLink>
          ))}
        </List>
      </Collapse>
      {props.renderBottomLine && (
        <div className="StyledDividerWrapper">
          <Divider />
        </div>
      )}
    </>
  ) : (
    <>
      <NavLink to={props.to} className="StyledLink">
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.label} />
      </NavLink>
      {props.renderBottomLine && (
        <div className="StyledDividerWrapper">
          <Divider />
        </div>
      )}
    </>
  );
};

export default SidebarMenuItem;
