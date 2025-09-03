import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Activity, Clock, User, Globe, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminLogsPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Check if user is super admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profile?.role !== "super_admin") {
    redirect("/dashboard");
  }

  // Fetch analytics events (activity logs)
  const { data: events, error } = await supabase
    .from("analytics_events")
    .select(`
      *,
      profiles:user_id (
        full_name,
        email,
        role
      )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching logs:", error);
  }

  // Get log statistics
  const totalEvents = events?.length || 0;
  const todayEvents = events?.filter(e => {
    const today = new Date();
    const eventDate = new Date(e.created_at);
    return eventDate.toDateString() === today.toDateString();
  }).length || 0;

  const uniqueUsers = new Set(events?.map(e => e.user_id).filter(Boolean)).size;
  const errorEvents = events?.filter(e => e.event_type?.includes('error')).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Admin
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring of platform activity and errors</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalEvents}</p>
                  <p className="text-sm text-gray-600">Total Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{todayEvents}</p>
                  <p className="text-sm text-gray-600">Today's Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{uniqueUsers}</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{errorEvents}</p>
                  <p className="text-sm text-gray-600">Errors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Real-time activity logs and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Page/URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">
                            {new Date(event.created_at).toLocaleTimeString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(event.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {event.profiles ? (
                        <div>
                          <p className="font-medium">{event.profiles.full_name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">{event.profiles.email}</p>
                          <Badge variant="outline" className="text-xs">
                            {event.profiles.role}
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-gray-500">Anonymous</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        event.event_type?.includes('error') ? 'destructive' :
                        event.event_type?.includes('login') ? 'default' :
                        event.event_type?.includes('page_view') ? 'secondary' : 'outline'
                      }>
                        {event.event_type || 'Unknown'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-mono">
                          {event.page_url || 'N/A'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {event.event_type?.includes('error') ? (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <span className={
                          event.event_type?.includes('error') ? 'text-red-600' : 'text-green-600'
                        }>
                          {event.event_type?.includes('error') ? 'Error' : 'Success'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-600 truncate">
                          {event.event_data ? JSON.stringify(event.event_data) : 'No data'}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {(!events || events.length === 0) && (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No activity logs found</p>
                <p className="text-sm text-gray-400">Activity will appear here as users interact with the platform</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
