import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SidebarMenuItem, { SidebarMenuItemProps } from "./SidebarMenuItem";
import { Avatar, Typography } from "@mui/material";
import { getAccount } from "../../common/auth/account";

import AvatarUrl from "../../assets/avatar.png";

export interface SidebarProps {
  width?: number;
  sidebarItems: SidebarMenuItemProps[];
}

const Sidebar = ({ width = 280, sidebarItems }: SidebarProps) => {
  return (
    <Box
      sx={{
        width: width,
        backgroundColor: `rgb(81, 0, 67)`,
        borderRight: `2px solid rgba(255,255,255,0.6)`,
        minHeight: "100%",
        p: 1,
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Avatar src={AvatarUrl} />

        <Box ml={2}>
          <Typography>{getAccount()?.name}</Typography>
        </Box>
      </Box>

      <List sx={{ width: "100%" }} component="nav">
        {sidebarItems.map((item, index) => (
          <SidebarMenuItem key={index} {...item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
