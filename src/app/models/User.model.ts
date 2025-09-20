import { IRole } from "../interfaces/IRole";

export class User {
    id: number;
    name: string;
    role: IRole;
    email: string;
  
    constructor(id: number, name: string, role: IRole, email: string) {
      this.id = id;
      this.name = name;
      this.role = role;
      this.email = email;
    }
  }
  