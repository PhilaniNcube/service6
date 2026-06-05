
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Stethoscope } from "lucide-react";

export function ClientMedicalHistorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical History
        </CardTitle>
        <CardDescription>
            Comprehensive medical history including allergies, medications, and past surgeries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-4">
                 <Skeleton className="h-9 rounded-md" />
                 <Skeleton className="h-9 rounded-md" />
                 <Skeleton className="h-9 rounded-md" />
                 <Skeleton className="h-9 rounded-md" />
                 <Skeleton className="h-9 rounded-md" />
            </TabsList>
            <div className="space-y-4 border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-9 w-24" />
                  </div>
                  <div className="space-y-4">
                       {Array.from({ length: 2 }).map((_, i) => (
                           <div key={i}>
                               <div className="flex justify-between items-start mb-2">
                                   <Skeleton className="h-5 w-1/3" />
                                   <Skeleton className="h-4 w-24" />
                               </div>
                               <Skeleton className="h-20 w-full" />
                               {i < 1 && <div className="my-4 border-b" />}
                           </div>
                       ))}
                  </div>
            </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
