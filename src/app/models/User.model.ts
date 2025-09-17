import { Role } from "./Role.model";

export class User {
    id: number;
    name: string;
    role: Role;
    email: string;
  
    constructor(id: number, name: string, role: Role, email: string) {
      this.id = id;
      this.name = name;
      this.role = role;
      this.email = email;
    }
  }
  