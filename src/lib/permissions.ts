import { type Roles } from "@/server/db/schema/organization";

export const ACCESS = {
  read: 0b1,
  write: 0b10,
  admin: 0b100,
} as const;

export const ACCESS_ROLES = {
  viewer: ACCESS.read,
  manager: ACCESS.read | ACCESS.write,
  admin: ACCESS.read | ACCESS.write | ACCESS.admin,
};

export const convertRoleToPermission = (role: Roles) => {
  switch (role) {
    case "viewer":
      return ACCESS_ROLES.viewer;
    case "manager":
      return ACCESS_ROLES.manager;
    case "admin":
      return ACCESS_ROLES.admin;
  }
};
