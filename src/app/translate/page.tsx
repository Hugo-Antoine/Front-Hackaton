"use client";

import { useEffect, useState } from "react";
import { Select, Button, Text } from "@mantine/core";
import {
  IconSwitchVertical,
  IconMicrophone,
  IconRepeat,
} from "@tabler/icons-react";
import { useTranslateVoice } from "@/hooks/useTranslateVoice";
import TopHeader from "@/component/Header";
import BottomNavbar from "@/component/NavBar";

const LanguageSwitcher = () => {
  const languageOptions = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "yo", label: "Yoruba" },
  ];

  const {
    startRecording,
    stopRecording,
    inputLang,
    outputLang,
    setInputLang,
    outputAudio,
    setOutputLang,
    inputText,
    outputText,
  } = useTranslateVoice();

  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  function buttonPressed() {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
      setIsRecording(false);
    }
  }

  function switchLanguages() {
    console.log("switching languages");
    const temp = inputLang;
    setInputLang(outputLang);
    setOutputLang(temp);
  }

  useEffect(() => {
    if (outputAudio !== "") {
      const audio = new Audio(`data:audio/wav;base64,${outputAudio}`);
      audio.play();
      setAudioFile(audio);
    }
  }, [outputAudio]);

  function playAudio() {
    audioFile.play();
  }

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TopHeader />
      <div
        style={{
          backgroundImage: "url('/translate.png')",
          backgroundSize: "cover",
          backgroundPosition: "-302px center",
          height: "100vh",
          width: "100%",
          position: "absolute",
          filter: "blur(5px)",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></div>
      <BottomNavbar active="translate" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Text
          style={{ fontWeight: "bold", color: "#352646", fontSize: "24px" }}
        >
          Select Input Language
        </Text>
        <Select
          value={inputLang?.value}
          onChange={(_event, option) => setInputLang(option)}
          placeholder="Select input language"
          data={languageOptions}
          size="md"
        />
        <IconSwitchVertical
          size={40}
          color="#352646"
          stroke={2}
          onClick={switchLanguages}
          style={{ cursor: "pointer", alignSelf: "center" }}
        />
        <Text
          style={{ fontWeight: "bold", color: "#352646", fontSize: "24px" }}
        >
          Select Output Language
        </Text>
        <Select
          value={outputLang?.value}
          onChange={(_event, option) => setOutputLang(option)}
          placeholder="Select output language"
          data={languageOptions}
          size="md"
        />

        <Text
          style={{
            fontWeight: "bold",
            color: "#352646",
            fontSize: "24px",
            marginTop: "40px",
          }}
        >
          {isRecording ? "Recording..." : "Press the microphone to record"}
        </Text>
        <Button
          radius="lg"
          size="xl"
          onClick={buttonPressed}
          color={isRecording ? "red" : "#352646"}
        >
          <IconMicrophone size={32} />
        </Button>
        {inputText !== "" && (
          <>
            <Text
              style={{ fontWeight: "bold", color: "#352646", fontSize: "24px" }}
            >
              Text :
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#352646", fontSize: "18px" }}
            >
              {inputText}
            </Text>
          </>
        )}
        {audioFile && (
          <>
            <Text
              style={{ fontWeight: "bold", color: "#352646", fontSize: "24px" }}
            >
              Translation :
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#352646", fontSize: "18px" }}
            >
              {outputText}
            </Text>
            <Button radius="md" size="md" color="#352646" onClick={playAudio}>
              <IconRepeat size={32} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
