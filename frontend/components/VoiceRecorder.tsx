"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };
    recognition.onend = () => {
      setRecording(false);
      sendTranscript();
    };
    recognitionRef.current = recognition;
    setRecording(true);
    recognition.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  const sendTranscript = async () => {
    if (!transcript) return;
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      });
      const data = await res.json();
      setTranscript(data.transcript);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </Button>
      {transcript && <p className="mt-4">{transcript}</p>}
    </div>
  );
}
