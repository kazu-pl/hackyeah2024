import Box from "@mui/material/Box";
import "./BasicLoginLayout.styles.css";
import { IconButton, Typography } from "@mui/material";

import i18n from "../../i18n";

import PlFlag from "../../assets/Flag_of_Poland.svg";
import GbFlag from "../../assets/Flag_of_the_United_Kingdom.svg";

import LemurImg from "../../assets/img/lemur.png";

export interface BasicLoginLayoutProps {
  title: string;
  children?: React.ReactNode;
  isLemurVisible?: boolean;
  lemurPlacement?: "top-right" | "bottom-left";
}

const BasicLoginLayout = ({
  title,
  children,
  isLemurVisible = true,
  lemurPlacement = "top-right",
}: BasicLoginLayoutProps) => {
  return (
    <Box className="BasicLoginLayout">
      <Box
        minWidth={320}
        border={(theme) => `6px solid ${theme.palette.primary.main}`}
        borderRadius={"5px"}
        p={2}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        position={"absolute"}
        className="BasicLoginLayout__contentWrpaper"

        // background={`linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) 100%)`}
      >
        <Box mx={0} my={2}>
          <Typography component={"p"} variant="h4">
            {title}
          </Typography>
        </Box>
        {children}

        {isLemurVisible && (
          <img
            src={LemurImg}
            alt="lemur"
            style={{
              position: "absolute",

              ...(lemurPlacement === "top-right" && {
                top: `0%`,
                right: "0%",
                transform: "translate(20px,-118px)",
              }),
              ...(lemurPlacement === "bottom-left" && {
                bottom: `0%`,
                left: "0%",
                transform: "translateX(-100px)",
              }),
            }}
            width={100}
            height={128}
          />
        )}
      </Box>

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

export default BasicLoginLayout;
