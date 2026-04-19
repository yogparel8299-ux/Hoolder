export type TaskStatus =
  | "pending"
  | "queued"
  | "running"
  | "awaiting_approval"
  | "approved"
  | "rejected"
  | "failed"
  | "completed";

export type Priority = "low" | "medium" | "high";
export type AssignmentType = "agent" | "swarm";
export type SwarmTopology = "hierarchy" | "mesh";
