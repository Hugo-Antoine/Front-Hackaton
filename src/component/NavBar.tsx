import React from "react";
import { Box, Center } from "@mantine/core";
import {
  IconMap,
  IconMessageCircle,
  IconLanguage,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";

const lightColor = "#ede6f2";
const activeColor = "#f97a66";

const BottomNavbar = ({ active }: { active: string }) => {
  return (
    <Box
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background:
          "radial-gradient(circle, rgba(62,43,83,1) 0%, rgba(54,40,70,1) 100%)",
        padding: "10px 0",
        display: "flex",
        justifyContent: "space-evenly",
        borderRadius: "15px 15px 0 0",
        zIndex: 1000,
      }}
    >
      <Link href="/map" passHref>
        <IconMap
          size={30}
          color={active === "map" ? activeColor : lightColor}
        />
      </Link>
      <Link href="/chat" passHref>
        <IconMessageCircle
          size={30}
          color={active === "chat" ? activeColor : lightColor}
        />
      </Link>
      <Link href="/translate">
        <IconLanguage
          size={30}
          color={active === "translate" ? activeColor : lightColor}
        />
      </Link>
      <Link href="/settings">
        <IconSettings
          size={30}
          color={active === "settings" ? activeColor : lightColor}
        />
      </Link>
    </Box>
  );
};

export default BottomNavbar;
