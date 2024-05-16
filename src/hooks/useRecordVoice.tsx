"use client";
import { useEffect, useState, useRef } from "react";
import { blobToBase64 } from "@/utils/blobToBase64";
import { createMediaStream } from "@/utils/createMediaStream";
import axiosInstance from "@/axios/axios";

export const useRecordVoice = () => {
  const [text, setText] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recording, setRecording] = useState(false);
  const [lang, setLang] = useState("en"); // ["en", "fr", "yo"
  const isRecording = useRef(false);
  const chunks = useRef<Blob[]>([]);

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

  const getText = async (base64data: string) => {
    try {
      const response = await axiosInstance.post(
        "/api/speechToText",
        {
          audio: base64data,
          inputLang: lang,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { text } = response.data;
      setText(text);
    } catch (error) {
      console.log(error);
    }
  };

  const initialMediaRecorder = (stream: any) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      createMediaStream(stream, true, () => {});
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      blobToBase64(audioBlob, getText);
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

  return { recording, startRecording, stopRecording, setLang, text };
};
