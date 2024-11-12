import { Typography } from "@mui/material";
import { PageCardContainer } from "../components/layout/PageCardContainer";

export default async function NotFound() {
  return (
    <PageCardContainer elevation={0}>
      <Typography variant="body1">Page not found</Typography>
    </PageCardContainer>
  );
}
