import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

export const LowerFormLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Typography
      component={Link}
      to={to}
      sx={(theme) => ({
        textDecoration: "none",
        color: theme.palette.text.primary,
        "&:hover": {
          textdecoration: "underline",
        },
      })}
    >
      {label}
    </Typography>
  );
};

export default LowerFormLink;
