import { Box, Image } from "@mantine/core";
import WickLogo from "./WickLogoWhite.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Box component={Link} to="/">
      <Image height="40" src={WickLogo} />
    </Box>
  );
}

export default Logo;
