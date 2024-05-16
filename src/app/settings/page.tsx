"use client";

import { Container, Text, Select } from "@mantine/core";
import BottomNavbar from "@/component/NavBar";
import TopHeader from "@/component/Header";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [defaultLang, setDefaultLang] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const languages = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "yo", label: "Yoruba" },
    { value: "fon", label: "Fon" },
  ];

  // Load the default language from cookies when the component mounts
  useEffect(() => {
    const savedLang = Cookies.get("defaultLang");
    if (savedLang) {
      setDefaultLang(languages.find((lang) => lang.value === savedLang)!);
    }
  }, []);

  // Save the selected language to cookies
  const handleLangChange = (
    option: { value: string; label: string } | null
  ) => {
    setDefaultLang(option);
    if (option) {
      Cookies.set("defaultLang", option.value);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TopHeader />
      <div
        style={{
          backgroundImage: "url('/settings.png')",
          backgroundSize: "cover",
          backgroundPosition: "-130px center",
          height: "100vh",
          width: "100%",
          position: "absolute",
          filter: "blur(5px)",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></div>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          marginTop: "80px",
          zIndex: 1,
          maxHeight: "calc(100vh - 80px)",
        }}
      >
        <Text style={{ color: "#352646", fontSize: "34px" }}>Settings</Text>
        <Text style={{ color: "#352646", fontSize: "20px" }}>
          Choose default language :
        </Text>
        <Select
          value={defaultLang?.value}
          onChange={(_event, option) => handleLangChange(option)}
          placeholder="Select output language"
          data={languages}
          size="md"
        />
      </Container>
      <BottomNavbar active="settings" />
    </div>
  );
}
