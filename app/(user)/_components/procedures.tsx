import { getProcedures, getUserProcedures } from "@/dal/procedures";
import React from "react";
import AddDesiredProcedure from "./add-desired-procedure";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Procedures = async () => {
  const proceduresData = getProcedures();
  const desiredProceduresData = getUserProcedures();

  const [procedures, desiredProcedures] = await Promise.all([
    proceduresData,
    desiredProceduresData,
  ]);

  const getPainLevelColor = (level: number | null) => {
    if (!level) return "secondary";
    if (level <= 3) return "default";
    if (level <= 6) return "secondary";
    return "destructive";
  };

  const getPainLevelBgColor = (level: number | null) => {
    if (!level) return "bg-gray-50";
    if (level <= 3) return "bg-green-50";
    if (level <= 6) return "bg-yellow-50";
    return "bg-red-50";
  };

  const getDiagnosisStatusColor = (status: string | null) => {
    if (status === "yes") return "default";
    if (status === "awaiting") return "secondary";
    return "outline";
  };

  const getTimelineBadgeColor = (timeline: string | null) => {
    if (!timeline) return "secondary";
    if (timeline === "immediate") return "destructive";
    if (timeline === "within a month") return "default";
    if (timeline === "researching") return "outline";
    return "secondary";
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            Desired Procedures
          </CardTitle>
          <AddDesiredProcedure procedures={procedures} />
        </CardHeader>
        <CardContent>
          {desiredProcedures.length > 0 ? (
            <div className="space-y-4">
              {desiredProcedures.map((item) => (
                <div
                  key={item.desired_procedures.id}
                  className={`border rounded-lg p-4 space-y-3 transition-colors ${getPainLevelBgColor(
                    item.desired_procedures.pain_level
                  )}`}
                >
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">
                      {item.procedure_name}
                    </h3>
                    {item.procedure_description && (
                      <p className="text-sm text-slate-600 mt-1">
                        {item.procedure_description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {item.desired_procedures.treatment_timeline && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">Expected Timeline:</span>
                        <Badge
                          variant={getTimelineBadgeColor(
                            item.desired_procedures.treatment_timeline
                          )}
                          className="font-medium"
                        >
                          {item.desired_procedures.treatment_timeline}
                        </Badge>
                      </div>
                    )}

                    {item.desired_procedures.pain_level !== null && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">Pain Level:</span>
                        <Badge
                          variant={getPainLevelColor(
                            item.desired_procedures.pain_level
                          )}
                          className="font-medium"
                        >
                          {item.desired_procedures.pain_level}/10
                        </Badge>
                      </div>
                    )}

                    {item.desired_procedures.diagnosis_status && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">Diagnosis Status:</span>
                        <Badge
                          variant={getDiagnosisStatusColor(
                            item.desired_procedures.diagnosis_status
                          )}
                          className="font-medium capitalize"
                        >
                          {item.desired_procedures.diagnosis_status}
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-700">Added:</span>
                      <span className="text-slate-600 font-medium">
                        {new Date(
                          item.desired_procedures.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {item.desired_procedures.notes && (
                    <div className="pt-2 border-t border-slate-200">
                      <p className="font-medium text-sm text-slate-700">Notes:</p>
                      <p className="text-sm text-slate-600 mt-1 italic">
                        {item.desired_procedures.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-4">No desired procedures found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Procedures;
