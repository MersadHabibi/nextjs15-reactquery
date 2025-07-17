export enum Permissions {
  // Product
  CREATE_PRODUCT = "CREATE_PRODUCT",
  EDIT_PRODUCT = "EDIT_PRODUCT",
  GET_PRODUCT = "GET_PRODUCT",

  // Users
  EDIT_USERS = "EDIT_USERS",
  GET_USER = "GET_USER",

  // Categories
  CREATE_CATEGORY = "CREATE_CAT",
  EDIT_CATEGORY = "EDIT_CAT",
  GET_CATEGORY = "GET_CAT",

  // Sessions
  CREATE_SESSION = "CREATE_SESSION",
  EDIT_SESSION = "EDIT_SESSION",
  GET_SESSION = "GET_SESSION",

  // Roles
  SUPER_USER = "SUPER_USER",
  USER = "USER",
  OWNER = "OWNER",
}

// Define subject actions
export enum Action {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
  MANAGE = "manage",
}

// Define subjects
export enum Subject {
  ESTATES = "estates",
  USERS = "users",
  CATEGORIES = "categories",
  LANDINGS = "landings",
  SUPERUSERS = "superusers",
  SESSIONS = "sessions",
}
