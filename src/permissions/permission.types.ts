export type Permission =
  | "superuser"
  | "admin"
  | "support"
  | "fileManagement"
  | "meetManagement";

// Define subject actions
export type Action = "create" | "read" | "update" | "delete" | "manage";

// Define subjects
export type Subject = "file" | "meeting" | "user" | "report";
