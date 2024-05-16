import React from "react";
import { Box, Group, Avatar, Text } from "@mantine/core";
import { Berkshire_Swash } from "@next/font/google";

const berkshire_Swash = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

const darkColor = "#352646";
const lightColor = "#ede6f2";

const TopHeader = () => {
  return (
    <Box
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
      }}
    >
      <Group>
        <Avatar src="/logo.png" size={60} />
        <Text
          style={{ color: darkColor, fontSize: "34px" }}
          className={berkshire_Swash.className}
        >
          Tourism Companion
        </Text>
      </Group>
    </Box>
  );
};

export default TopHeader;
