"use client";

import { Container, Box, Textarea, Group } from "@mantine/core";
import BottomNavbar from "@/component/NavBar";
import TopHeader from "@/component/Header";
import { useEffect, useState } from "react";
import SingleChat from "@/component/SingleChat";
import { IconMicrophone, IconSend } from "@tabler/icons-react";
import axiosInstance from "@/axios/axios";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import Cookies from "js-cookie";

export default function Home() {
  const [texts, setTexts] = useState([]);
  const { startRecording, stopRecording, text } = useRecordVoice();
  const [isRecording, setIsRecording] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    setPrompt(text);
  }, [text]);

  useEffect(() => {
    async function fetchChatHistory() {
      try {
        const response = await axiosInstance.get("/chat/history/1/1");
        setTexts(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }

    fetchChatHistory();
  }, []);

  function buttonPressed() {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
      setIsRecording(false);
    }
  }

  async function sendMessage() {
    if (prompt) {
      const targetLang = Cookies.get("defaultLang");

      try {
        await axiosInstance.post("/chat", {
          target_lang: targetLang,
          text: prompt,
          user_id: 1,
        });

        // Fetch the updated chat history after sending the message
        const response = await axiosInstance.get("/chat/history/1/1");
        setTexts(response.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setPrompt("");
    }
  }

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
          backgroundImage: "url('/chat.png')",
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
        <Box
          style={{
            overflowY: "auto",
            wordBreak: "break-word",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            flex: 1,
            overflow: "scroll",
          }}
        >
          {texts.map((text, index) => (
            <SingleChat
              key={index}
              author={text.author}
              text={text.text}
              alignment={text.author === "ai" ? "flex-start" : "flex-end"}
            />
          ))}
        </Box>
        <Group
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            marginBottom: "60px",
          }}
        >
          <Textarea
            placeholder="Type a message"
            value={prompt}
            onChange={(event) => setPrompt(event.currentTarget.value)}
            style={{ flex: 1 }}
            radius="md"
            size="lg"
            autosize
            minRows={1}
            maxRows={4}
            leftSection={
              <IconMicrophone
                size={isRecording ? 24 : 20}
                style={{ cursor: "pointer" }}
                onClick={buttonPressed}
                color={isRecording ? "red" : "gray"}
              />
            }
            rightSection={
              <IconSend size={24} color="#352646" onClick={sendMessage} />
            }
          />
        </Group>
      </Container>
      <BottomNavbar active="chat" />
    </div>
  );
}
