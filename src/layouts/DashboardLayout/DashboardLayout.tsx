import Box from "@mui/material/Box";
import "./DashboardLayout.styles..css";
import Sidebar from "../../components/Sidebar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";

import level1Json from "./data/poziom1.json";
import { IconButton } from "@mui/material";
import i18n from "../../i18n";

import PlFlag from "../../assets/Flag_of_Poland.svg";
import GbFlag from "../../assets/Flag_of_the_United_Kingdom.svg";
import { useTranslation } from "react-i18next";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Box className="DashboardLayout" display={"flex"} position={"relative"}>
      <Sidebar
        sidebarItems={[
          {
            variant: "no-dropdown",
            icon: <DashboardIcon />,
            label: t("account"),
            to: "/account",
          },
          {
            variant: "with-dropdown",
            icon: <InboxIcon />,
            label: level1Json.name,
            dropdownItems: level1Json.topics.map((level) => ({
              label: level.topic_name,
              to: `/${level.url}`,
            })),
          },
        ]}
      />
      {children}

      <Box
        position={"absolute"}
        top={5}
        right={5}
        display={"flex"}
        className="language-switch"
      >
        <Box mr={1}>
          <IconButton onClick={() => i18n.changeLanguage("pl")}>
            <img src={PlFlag} alt="PlFlag" width={32} />
          </IconButton>
        </Box>
        <IconButton onClick={() => i18n.changeLanguage("en")}>
          <img src={GbFlag} alt="PlFlag" width={32} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
