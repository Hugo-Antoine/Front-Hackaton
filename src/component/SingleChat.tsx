"use client";

import React from "react";
import { Avatar, Box } from "@mantine/core";

function SingleChat({
  text,
  author,
  alignment,
}: {
  text: string;
  author: "user" | "ai";
  alignment: "flex-start" | "flex-end";
}) {
  return (
    <Box
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        alignSelf: alignment,
      }}
    >
      {author === "ai" && (
        <Avatar
          src="logo.png"
          size={30}
          radius="xl"
          style={{ marginRight: "10px" }}
        />
      )}
      <span style={{ flex: 1, display: "flex" }}>{text}</span>
      {author === "user" && (
        <Avatar
          src="https://amaxfireandsecurity.co.uk/wp-content/uploads/2023/12/profile-pic-MD.jpg"
          size={30}
          radius="xl"
          style={{ marginLeft: "10px" }}
        />
      )}
    </Box>
  );
}

export default SingleChat;
