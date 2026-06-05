
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Phone, MapPin, Calendar, Mail } from "lucide-react";

export function ClientOverviewSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Client Overview
        </CardTitle>
        <CardDescription>
          Personal and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
           <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
               <Skeleton className="h-5 w-56" />
            </div>
          </div>
          <div className="pt-4 border-t mt-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2 mt-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
