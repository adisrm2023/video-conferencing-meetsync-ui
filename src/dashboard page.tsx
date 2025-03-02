import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, Plus, Video } from "lucide-react"
import { MeetingCard } from "@/components/dashboard/meeting-card"
import { MobileNav } from "@/components/dashboard/mobile-nav"

export default function DashboardPage() {
  // Sample data for recent and upcoming meetings
  const recentMeetings = [
    {
      id: "1",
      title: "Weekly Team Sync",
      date: "Today",
      time: "10:00 AM",
      duration: "45 min",
      participants: 8,
    },
    {
      id: "2",
      title: "Product Review",
      date: "Yesterday",
      time: "2:30 PM",
      duration: "60 min",
      participants: 5,
    },
    {
      id: "3",
      title: "Client Presentation",
      date: "Mar 28, 2024",
      time: "11:00 AM",
      duration: "30 min",
      participants: 12,
    },
  ]

  const upcomingMeetings = [
    {
      id: "4",
      title: "Design Sprint Planning",
      date: "Tomorrow",
      time: "9:00 AM",
      duration: "90 min",
      participants: 6,
    },
    {
      id: "5",
      title: "Marketing Strategy",
      date: "Apr 2, 2024",
      time: "3:00 PM",
      duration: "60 min",
      participants: 4,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Manage your meetings and schedule.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/meetings/new">
            <Button className="w-full sm:w-auto gap-2">
              <Plus className="h-4 w-4" />
              New Meeting
            </Button>
          </Link>
          <Link href="/meetings/join">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Video className="h-4 w-4" />
              Join Meeting
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meeting Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.5h</div>
            <p className="text-xs text-muted-foreground">+2.5h from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Join</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter meeting code" />
              <Button size="sm">Join</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <MobileNav />
    </div>
  )
}

