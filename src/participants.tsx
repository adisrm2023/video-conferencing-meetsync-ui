import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, MoreHorizontal, Video, VideoOff } from "lucide-react"

interface ParticipantItemProps {
  participant: {
    id: string
    name: string
    isHost: boolean
    audioOn: boolean
    videoOn: boolean
    isScreenSharing: boolean
  }
}

export function ParticipantItem({ participant }: ParticipantItemProps) {
  return (
    <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{participant.name}</span>
            {participant.isHost && (
              <span className="rounded bg-primary px-1 text-xs text-primary-foreground">Host</span>
            )}
            {participant.isScreenSharing && (
              <span className="rounded bg-blue-500 px-1 text-xs text-white">Sharing</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {participant.audioOn ? (
          <Mic className="h-4 w-4 text-muted-foreground" />
        ) : (
          <MicOff className="h-4 w-4 text-destructive" />
        )}
        {participant.videoOn ? (
          <Video className="h-4 w-4 text-muted-foreground" />
        ) : (
          <VideoOff className="h-4 w-4 text-destructive" />
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

