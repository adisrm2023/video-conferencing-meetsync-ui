"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MicOff, PinIcon } from "lucide-react"

interface Participant {
  id: string
  name: string
  isHost: boolean
  audioOn: boolean
  videoOn: boolean
  isScreenSharing: boolean
}

interface VideoGridProps {
  participants: Participant[]
}

export function VideoGrid({ participants }: VideoGridProps) {
  const [layout, setLayout] = useState<"grid" | "spotlight">("grid")
  const [spotlightUser, setSpotlightUser] = useState<string | null>(null)

  // Determine grid layout based on participant count
  const getGridClass = () => {
    const count = participants.length

    if (layout === "spotlight" && spotlightUser) {
      return "grid-cols-1 md:grid-cols-[3fr_1fr] md:grid-rows-[repeat(auto-fill,minmax(180px,1fr))]"
    }

    if (count === 1) return "grid-cols-1"
    if (count === 2) return "grid-cols-1 md:grid-cols-2"
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2"
    if (count <= 6) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  }

  const toggleSpotlight = (participantId: string) => {
    if (spotlightUser === participantId) {
      setSpotlightUser(null)
      setLayout("grid")
    } else {
      setSpotlightUser(participantId)
      setLayout("spotlight")
    }
  }

  return (
    <div className={`grid h-full gap-2 ${getGridClass()}`}>
      {participants.map((participant) => (
        <div
          key={participant.id}
          className={`relative flex items-center justify-center rounded-lg bg-muted ${
            layout === "spotlight" && spotlightUser === participant.id ? "col-span-1 row-span-2 md:col-span-1" : ""
          }`}
        >
          {participant.videoOn ? (
            <div className="h-full w-full bg-black">
              {/* Video would be here in a real implementation */}
              <div className="flex h-full items-center justify-center text-white">
                <img
                  src={`/placeholder.svg?height=300&width=400`}
                  alt={`${participant.name}'s video`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ) : (
            <Avatar className="h-20 w-20">
              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}

          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-md bg-background/80 px-2 py-1 text-sm backdrop-blur-sm">
              {participant.isHost && (
                <span className="mr-1 rounded bg-primary px-1 text-xs text-primary-foreground">Host</span>
              )}
              <span>{participant.name}</span>
              {!participant.audioOn && <MicOff className="ml-1 h-3 w-3" />}
            </div>

            <button
              className="rounded-md bg-background/80 p-1 backdrop-blur-sm"
              onClick={() => toggleSpotlight(participant.id)}
            >
              <PinIcon className="h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

