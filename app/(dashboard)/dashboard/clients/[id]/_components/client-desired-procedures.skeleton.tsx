
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Stethoscope } from "lucide-react";

export function ClientDesiredProceduresSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Desired Procedures
        </CardTitle>
        <CardDescription>
          Procedures the client is interested in or considering
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                 <Skeleton className="h-5 w-40" />
                 <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <div className="space-y-2 mt-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
               <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                   <div className="flex items-center gap-1">
                       <Skeleton className="h-4 w-4" />
                       <Skeleton className="h-4 w-24" />
                   </div>
                   <div className="flex items-center gap-1">
                       <Skeleton className="h-4 w-4" />
                       <Skeleton className="h-4 w-32" />
                   </div>
               </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
