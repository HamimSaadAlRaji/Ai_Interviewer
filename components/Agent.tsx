"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";

enum CallState {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Connecting = "CONNECTING",
  FINISHED = "FINISHED",
}
interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  type,
  interviewId,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallState>(CallState.Inactive);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallState.Active);
    const onCallEnd = () => setCallStatus(CallState.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
    const onSpeachStart = () => {
      setIsSpeaking(true);
    };
    const onSpeachEnd = () => {
      setIsSpeaking(false);
    };
    const onError = (error: Error) => {
      console.error("Error:", error);
    };
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeachStart);
    vapi.on("speech-end", onSpeachEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeachStart);
      vapi.off("speech-end", onSpeachEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (message: SavedMessage[]) => {
    console.log("Generating feedback...");
    const { success, id } = {
      success: true,
      id: "feedbackId",
    };
    if (success && id) {
      router.push(`interview/${interviewId}/feedback`);
    } else {
      console.error("Error generating feedback");
      router.push("/");
    }
  };

  useEffect(() => {
    if (callStatus === CallState.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [callStatus, messages, userId, type]);

  const handleCall = async () => {
    setCallStatus(CallState.Connecting);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
        variableValues: {
          username: userName,
          userid: userId,
        },
        clientMessages: [],
        serverMessages: [],
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
        clientMessages: [],
        serverMessages: [],
      });
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallState.FINISHED);
    vapi.stop();
  };

  const isCallInactiveOrFinished =
    callStatus === CallState.Inactive || callStatus === CallState.FINISHED;
  const latestMessage = messages[messages.length - 1]?.content;
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="AI Avatar"
              width={65}
              height={58}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>Ai-Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full size-[120px] object-cover"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={latestMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center">
        {callStatus !== CallState.Active ? (
          <button className="btn-call" onClick={handleCall}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallState.Connecting && "hidden"
              )}
            />
            <span>{isCallInactiveOrFinished ? "Call" : ". . ."}</span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            END
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
