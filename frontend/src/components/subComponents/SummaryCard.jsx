import { Card, CardContent, Typography } from "@mui/material";

const SummaryCard = ({ title, value }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
