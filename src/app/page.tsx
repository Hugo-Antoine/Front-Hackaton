"use client";

import {
  Container,
  Group,
  Image,
  Stack,
  Title,
  Button,
  NavLink,
} from "@mantine/core";
import Link from "next/link";
import { IconPlaneTilt } from "@tabler/icons-react";

import { Berkshire_Swash } from "@next/font/google";

const berkshire_Swash = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HomePage() {
  return (
    <div
      style={{
        backgroundImage: "url('/landing.png')",
        backgroundSize: "cover",
        backgroundPosition: "-130px center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="./logo.png"
          alt="Logo"
          style={{ borderRadius: "9999px", width: "150px", height: "150px" }}
        />
        <Title
          order={1}
          className={berkshire_Swash.className}
          style={{ color: "#352646" }}
        >
          Tourism Companion
        </Title>
      </div>
      <Container
        size="md"
        style={{ textAlign: "center", marginBottom: "30px" }}
      >
        <Stack align="center">
          <Link
            href="/chat"
            style={{
              background:
                "radial-gradient(circle, rgba(62,43,83,1) 0%, rgba(54,40,70,1) 100%)",
              color: "white",
              borderRadius: "10px",
              padding: "10px 20px",
              textDecoration: "none",
              fontSize: "20px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <span>Start talking with your companion</span>
            <IconPlaneTilt size={24} stroke={1.5} />
          </Link>
        </Stack>
      </Container>
    </div>
  );
}
