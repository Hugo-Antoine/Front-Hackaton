"use client";
import { useEffect, useState, useRef } from "react";
import { blobToBase64 } from "@/utils/blobToBase64";
import { createMediaStream } from "@/utils/createMediaStream";
import axiosInstance from "@/axios/axios";
import { ComboboxItem } from "@mantine/core";

export const useTranslateVoice = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [outputAudio, setOutputAudio] = useState("");
  const [inputLang, setInputLang] = useState<ComboboxItem>({
    value: "en",
    label: "English",
  });
  const [outputLang, setOutputLang] = useState<ComboboxItem>({
    value: "en",
    label: "English",
  });
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const isRecording = useRef(false);
  const chunks = useRef([]);

  // Refs to store the latest inputLang and outputLang values
  const inputLangRef = useRef(null);
  const outputLangRef = useRef(null);

  // Update the refs whenever inputLang or outputLang changes
  useEffect(() => {
    inputLangRef.current = inputLang;
  }, [inputLang]);

  useEffect(() => {
    outputLangRef.current = outputLang;
  }, [outputLang]);

  const startRecording = () => {
    if (mediaRecorder) {
      isRecording.current = true;
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      isRecording.current = false;
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const getInputText = async (base64data) => {
    try {
      const inputResponse = await axiosInstance.post(
        "/speechToText",
        {
          audio: base64data,
          inputLang: inputLangRef.current?.value, // Use the ref value here
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setInputText(inputResponse.data.text);
      const outputResponse = await axiosInstance.post(
        "/textToSpeech",
        {
          text: inputResponse.data.text,
          inputLang: inputLangRef.current?.value, // Use the ref value here
          outputLang: outputLangRef.current?.value, // Use the ref value here
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOutputAudio(outputResponse.data.audio);
      setOutputText(outputResponse.data.text);
    } catch (error) {
      console.log(error);
    }
  };

  const initialMediaRecorder = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      createMediaStream(stream);
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      blobToBase64(audioBlob, getInputText);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, []);

  return {
    recording,
    startRecording,
    stopRecording,
    inputLang,
    setInputLang,
    outputLang,
    setOutputLang,
    inputText,
    outputAudio,
    outputText,
  };
};
