import { Box, Typography } from "@mui/material";
import DashboardLayout from "../../layouts/DashboardLayout";
import data from "../../layouts/DashboardLayout/data/poziom5.json";

import "./SingleTopic.styles.css";

const SingleTopic = () => {
  const dataToUse = data.topics.find(
    (topic) => topic.topic_name === "Zasada zachowania energii"
  );

  return (
    <DashboardLayout whiteBg>
      <Box>
        <Typography className="SingleTopic__title">
          {dataToUse?.topic_name}
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default SingleTopic;
