"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  ScreenShare,
  PhoneOff,
  MessageSquare,
  UsersIcon,
  Hand,
  Settings,
  Send,
  Smile,
} from "lucide-react"
import { VideoGrid } from "@/components/meeting/video-grid"
import { ChatMessage } from "@/components/meeting/chat-message"
import { ParticipantItem } from "@/components/meeting/participant-item"

export default function MeetingPage({ params }: { params: { id: string } }) {
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [screenShareEnabled, setScreenShareEnabled] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [participantsOpen, setParticipantsOpen] = useState(false)

  // Sample data
  const participants = [
    { id: "1", name: "You", isHost: true, audioOn: true, videoOn: true, isScreenSharing: false },
    { id: "2", name: "John Smith", isHost: false, audioOn: true, videoOn: true, isScreenSharing: false },
    { id: "3", name: "Emily Johnson", isHost: false, audioOn: false, videoOn: true, isScreenSharing: false },
    { id: "4", name: "Michael Brown", isHost: false, audioOn: true, videoOn: false, isScreenSharing: false },
    { id: "5", name: "Sarah Davis", isHost: false, audioOn: false, videoOn: false, isScreenSharing: false },
  ]

  const messages = [
    { id: "1", sender: "John Smith", content: "Hi everyone! Glad to be here.", time: "10:02 AM" },
    { id: "2", sender: "Emily Johnson", content: "Hello! Looking forward to our discussion today.", time: "10:03 AM" },
    { id: "3", sender: "You", content: "Welcome everyone. Let's get started in a few minutes.", time: "10:05 AM" },
    {
      id: "4",
      sender: "Michael Brown",
      content: "I have a presentation prepared. Should I share my screen?",
      time: "10:06 AM",
    },
    { id: "5", sender: "Sarah Davis", content: "👍", time: "10:06 AM" },
  ]

  const toggleAudio = () => setAudioEnabled(!audioEnabled)
  const toggleVideo = () => setVideoEnabled(!videoEnabled)
  const toggleScreenShare = () => setScreenShareEnabled(!screenShareEnabled)
  const toggleHandRaise = () => setHandRaised(!handRaised)
  const toggleChat = () => {
    setChatOpen(!chatOpen)
    if (participantsOpen) setParticipantsOpen(false)
  }
  const toggleParticipants = () => {
    setParticipantsOpen(!participantsOpen)
    if (chatOpen) setChatOpen(false)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex flex-1 flex-col">
          {/* Video grid */}
          <div className={`flex-1 p-2 ${chatOpen || participantsOpen ? "md:pr-[320px]" : ""}`}>
            <VideoGrid participants={participants} />
          </div>

          {/* Controls */}
          <div className="border-t bg-background p-4">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <Button
                variant={audioEnabled ? "default" : "destructive"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={toggleAudio}
              >
                {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={videoEnabled ? "default" : "destructive"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={toggleVideo}
              >
                {videoEnabled ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={screenShareEnabled ? "secondary" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={toggleScreenShare}
              >
                <ScreenShare className="h-5 w-5" />
              </Button>
              <Button
                variant={handRaised ? "secondary" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={toggleHandRaise}
              >
                <Hand className="h-5 w-5" />
              </Button>
              <Button
                variant={chatOpen ? "secondary" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={toggleChat}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button
                variant={participantsOpen ? "secondary" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={toggleParticipants}
              >
                <UsersIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full">
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {(chatOpen || participantsOpen) && (
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] border-l bg-background md:relative">
            <Tabs defaultValue={chatOpen ? "chat" : "participants"}>
              <TabsList className="w-full">
                <TabsTrigger value="chat" className="flex-1" onClick={() => setChatOpen(true)}>
                  Chat
                </TabsTrigger>
                <TabsTrigger value="participants" className="flex-1" onClick={() => setParticipantsOpen(true)}>
                  Participants ({participants.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="h-[calc(100vh-8rem)] flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea placeholder="Type a message..." className="min-h-[40px] resize-none" />
                    <div className="flex flex-col gap-2">
                      <Button size="icon" variant="ghost">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="participants" className="h-[calc(100vh-8rem)]">
                <ScrollArea className="h-full">
                  <div className="space-y-2 p-4">
                    {participants.map((participant) => (
                      <ParticipantItem key={participant.id} participant={participant} />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

