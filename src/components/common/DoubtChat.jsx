// import { useState } from "react"

// const SUBJECTS = ["General", "Math", "DSA", "DBMS", "OS", "CN", "Web Dev"]

// function AIDoubtHelper() {
//   const [subject, setSubject] = useState("General")
//   const [input, setInput] = useState("")
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       from: "bot",
//       text: "Hi! I'm your AI tutor. Ask me any doubt 🙂",
//     },
//   ])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [voiceOn, setVoiceOn] = useState(false)
//   const [isPlaying, setIsPlaying] = useState(false)

//   const handleSend = async () => {
//     const trimmed = input.trim()
//     if (!trimmed || loading) return

//     const userMessage = {
//       id: Date.now(),
//       from: "user",
//       text: trimmed,
//     }

//     // optimistic update
//     setMessages((prev) => [...prev, userMessage])
//     setInput("")
//     setError("")
//     setLoading(true)

//     try {
//       const res = await fetch("http://localhost:4000/api/v1/doubt", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           question: trimmed,
//           subject,
//           history: messages.map((m) => ({
//             role: m.from === "user" ? "user" : "model",
//             content: m.text,
//           })),
//         }),
//       })

//       const data = await res.json()

//       if (!res.ok || !data?.success) {
//         throw new Error(data?.message || "Something went wrong")
//       }

//       const botMessage = {
//         id: Date.now() + 1,
//         from: "bot",
//         text: data.answer,
//       }

//       setMessages((prev) => [...prev, botMessage])

//       // optional: basic voice (browser speechSynthesis)
//       if (voiceOn && "speechSynthesis" in window) {
//         const utterance = new SpeechSynthesisUtterance(data.answer)
//         setIsPlaying(true)
//         utterance.onend = () => setIsPlaying(false)
//         window.speechSynthesis.speak(utterance)
//       }
//     } catch (err) {
//       console.error(err)
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 2,
//           from: "bot",
//           text: "Sorry, something went wrong 🥺",
//         },
//       ])
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSend()
//     }
//   }

//   const stopVoice = () => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.cancel()
//       setIsPlaying(false)
//     }
//   }

//   return (
//     <div className="flex flex-col h-[calc(100vh-120px)] rounded-2xl bg-richblack-900 border border-richblack-700 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between px-6 py-3 border-b border-richblack-700 bg-richblack-800">
//         <div>
//           <h2 className="text-lg font-semibold text-richblack-5">
//             AI Doubt Helper
//           </h2>
//         </div>

//         <div className="flex items-center gap-3 text-xs">
//           <span className="px-2 py-1 rounded-full bg-richblack-700 text-richblack-200">
//             Subject: {subject}
//           </span>

//           <button
//             onClick={() => setVoiceOn((v) => !v)}
//             className={`px-3 py-1 rounded-full border text-xs ${
//               voiceOn
//                 ? "bg-yellow-50 text-richblack-900 border-yellow-50"
//                 : "border-richblack-600 text-richblack-200"
//             }`}
//           >
//             Voice {voiceOn ? "On" : "Off"}
//           </button>

//           <button
//             onClick={handleSend}
//             disabled={loading}
//             className="px-3 py-1 rounded-full bg-yellow-50 text-richblack-900 text-xs font-medium disabled:opacity-60"
//           >
//             {loading ? "Thinking..." : "Play"}
//           </button>

//           <button
//             onClick={stopVoice}
//             disabled={!isPlaying}
//             className="px-3 py-1 rounded-full bg-richblack-700 text-richblack-200 text-xs disabled:opacity-50"
//           >
//             Stop
//           </button>
//         </div>
//       </div>

//       {/* Subject tabs */}
//       <div className="px-4 py-3 flex flex-wrap gap-2 border-b border-richblack-700 bg-richblack-900">
//         {SUBJECTS.map((subj) => (
//           <button
//             key={subj}
//             onClick={() => setSubject(subj)}
//             className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
//               subject === subj
//                 ? "bg-yellow-50 text-richblack-900"
//                 : "bg-richblack-800 text-richblack-200 hover:bg-richblack-700"
//             }`}
//           >
//             {subj}
//           </button>
//         ))}
//       </div>

//       {/* Chat area */}
//       <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-richblack-900">
//         {messages.map((m) => (
//           <div
//             key={m.id}
//             className={`flex ${
//               m.from === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
//                 m.from === "user"
//                   ? "bg-yellow-50 text-richblack-900"
//                   : "bg-richblack-700 text-richblack-5"
//               }`}
//             >
//               {m.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input area */}
//       <div className="px-4 py-3 border-t border-richblack-700 bg-richblack-900">
//         <div className="flex items-center gap-3">
//           <textarea
//             rows={1}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask your doubt..."
//             className="flex-1 resize-none rounded-full bg-richblack-800 text-richblack-5 px-4 py-2 text-sm outline-none border border-richblack-700 focus:border-yellow-50"
//           />
//           <button
//             onClick={handleSend}
//             disabled={loading || !input.trim()}
//             className="rounded-full p-3 bg-yellow-50 text-richblack-900 font-semibold text-sm disabled:opacity-60"
//           >
//             ➤
//           </button>
//         </div>
//         {error && (
//           <p className="mt-1 text-xs text-pink-200">
//             Error: {error}. Please try again.
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AIDoubtHelper


import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { BsMic, BsMicMuteFill } from "react-icons/bs";

const subjects = ["General", "Math", "DSA", "DBMS", "OS", "CN", "Web Dev"];

const DoubtChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! I'm your AI tutor. Ask me any doubt 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("General");

  // ---- Voice input (mic) ----
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // ---- Voice output (TTS) global state ----
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // ---------------- SPEECH-TO-TEXT (Mic) ----------------
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setInput((prev) =>
        prev ? prev + " " + transcript.trim() : transcript.trim()
      );
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleToggleRecord = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error starting speech recognition:", err);
        setIsRecording(false);
      }
    }
  };

  // ---------------- TEXT-TO-SPEECH HELPERS ----------------

  const speakText = (text) => {
    if (typeof window === "undefined") return;

    if (!("speechSynthesis" in window)) {
      console.warn("Speech Synthesis not supported in this browser");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN"; // "en-US" / "hi-IN" bhi try kar sakte ho
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const handlePauseSpeech = () => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  };

  const handleStopSpeech = () => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
  };

  const getLastModelMessageText = () => {
    const reversed = [...messages].reverse();
    const lastModel = reversed.find((m) => m.role === "model");
    return lastModel?.text || "";
  };

  const handleGlobalPlay = () => {
    const text = getLastModelMessageText();
    if (text) {
      speakText(text);
    }
  };

  // Auto-speak latest AI reply if voiceEnabled = true
  useEffect(() => {
    if (!voiceEnabled) return;
    if (!messages.length) return;

    const last = messages[messages.length - 1];
    if (last.role === "model") {
      speakText(last.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, voiceEnabled]);

  // ---------------- SEND HANDLER ----------------

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: "user", text: input };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // greeting (index 0, role: "model") ko history se hata do
    const historyToSend = updatedMessages.filter((_, idx) => idx !== 0);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/doubt",
        {
          message: input,
          history: historyToSend,
          subject: selectedSubject,
        }
      );

      const botMessage = {
        role: "model",
        text: res.data.reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Sorry, something went wrong 😔" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ---------------- UI ----------------

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex justify-center bg-richblack-900 px-2 py-4">
      {/* Card */}
      <div className="w-11/12 max-w-6xl rounded-2xl bg-richblack-900/80 border border-richblack-700 shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 py-2 border-b border-richblack-700 flex items-center justify-between">
          <span className="text-lg sm:text-lg text-richblack-100 font-semibold">
            AI Doubt Helper
          </span>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className="text-[13px] px-2 py-0.5 rounded-full bg-richblack-800 text-richblack-300 border border-richblack-700">
              Subject: {selectedSubject}
            </span>

            {/* Global voice controls */}
            <button
              type="button"
              onClick={() => setVoiceEnabled((prev) => !prev)}
              className={`text-[11px] px-2 py-0.5 rounded-full border transition-all ${
                voiceEnabled
                  ? "bg-yellow-400 text-richblack-900 border-yellow-300"
                  : "bg-richblack-800 text-richblack-200 border-richblack-700 hover:bg-richblack-700"
              }`}
            >
              {voiceEnabled ? "🔊 Voice Auto" : "🔈 Voice Off"}
            </button>

            {/* <button
              type="button"
              onClick={handleGlobalPlay}
              className="text-[11px] px-2 py-0.5 rounded-full border border-richblack-700 bg-richblack-800 text-yellow-200 hover:bg-richblack-700"
            >
              ▶ Play
            </button> */}

            {/* <button
              type="button"
              onClick={handlePauseSpeech}
              className="text-[11px] px-2 py-0.5 rounded-full border border-richblack-700 bg-richblack-800 text-yellow-200 hover:bg-richblack-700"
            >
              ⏸ Pause
            </button> */}

            {/* <button
              type="button"
              onClick={handleStopSpeech}
              className="text-[11px] px-2 py-0.5 rounded-full border border-richblack-700 bg-richblack-800 text-yellow-200 hover:bg-richblack-700"
            >
              ⏹ Stop
            </button> */}
          </div>
        </div>

        {/* Subject pills */}
        <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1 border-b border-richblack-800">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-2.5 py-0.5 rounded-full text-[15px] sm:text-[16px] border transition-all
                ${
                  selectedSubject === sub
                    ? "bg-yellow-50 text-richblack-900 border-yellow-300"
                    : "bg-richblack-800 text-richblack-200 border-richblack-700 hover:bg-richblack-700"
                }
              `}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Messages area */}
        <div className="flex-1 max-h-[55vh] min-h-[260px] overflow-y-auto px-3 py-3 space-y-2">
          {messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            const isModel = msg.role === "model";
            return (
              <div
                key={idx}
                className={`flex w-full ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-[16px] sm:text-lg leading-relaxed whitespace-pre-wrap
                    ${
                      isUser
                        ? "bg-yellow-400 text-richblack-900 rounded-br-sm"
                        : "bg-richblack-800 text-richblack-25 border border-richblack-700 rounded-bl-sm"
                    }
                  `}
                >
                  {msg.text}

                  {/* Per-message controls (optional, use same global handlers) */}
                 
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="text-[11px] px-3 py-1.5 rounded-2xl bg-richblack-800 text-richblack-200 border border-richblack-700">
                Thinking…
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="px-3 py-2 border-t border-richblack-800 bg-richblack-900 flex items-center gap-2">
          <div className="flex-1 flex items-center rounded-full bg-richblack-800 border border-richblack-700 px-3 py-1.5">
            <textarea
              rows={1}
              className="w-full bg-transparent text-[16px] sm:text-lg text-richblack-5 resize-none focus:outline-none placeholder:text-richblack-400 leading-snug"
              placeholder="Ask your doubt..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Mic button */}
          <button
            onClick={handleToggleRecord}
            className={`h-8 w-8 flex items-center justify-center rounded-full border text-xs shadow-md transition-all ${
              isRecording
                ? "bg-red-500 border-red-400 text-white animate-pulse"
                : "bg-richblack-800 border-richblack-700 text-richblack-100 hover:bg-richblack-700"
            }`}
          >
            {isRecording ? <BsMicMuteFill size={14} /> : <BsMic size={14} />}
          </button>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={loading}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-yellow-400 text-richblack-900 text-xs hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
          >
            <FiSend size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoubtChat;

