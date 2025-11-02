import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, User, Users, Heart } from "lucide-react";

export function ProfileCardSkeleton() {
  return (
    <Card className="overflow-hidden p-0">
      {/* Banner */}
      <div className="relative h-32 bg-linear-to-r from-muted via-muted/80 to-muted">
        <div className="absolute -bottom-16 left-8">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
            <AvatarFallback className="text-3xl font-bold">
              <Skeleton className="h-full w-full rounded-full" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardHeader className="pt-20 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-5 w-64" />
          </div>
          {/* Edit button skeleton */}
          <Skeleton className="h-10 w-32" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pb-8">
        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-primary/5 to-transparent border border-primary/10">
              <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </Label>
                <Skeleton className="h-6 w-48" />
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-accent/5 to-transparent border border-accent/10">
              <Phone className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Phone Number
                </Label>
                <Skeleton className="h-6 w-36" />
              </div>
            </div>

            {/* Country */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-secondary/5 to-transparent border border-secondary/10">
              <MapPin className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Country
                </Label>
                <Skeleton className="h-6 w-32" />
              </div>
            </div>

            {/* Preferred Contact */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-primary/5 to-transparent border border-primary/10">
              <Heart className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Preferred Contact
                </Label>
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="space-y-4 pt-6 border-t">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Next of Kin Name */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-accent/5 to-transparent border border-accent/10">
              <User className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Next of Kin Name
                </Label>
                <Skeleton className="h-6 w-40" />
              </div>
            </div>

            {/* Next of Kin Contact */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-secondary/5 to-transparent border border-secondary/10">
              <Phone className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Next of Kin Contact
                </Label>
                <Skeleton className="h-6 w-44" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
