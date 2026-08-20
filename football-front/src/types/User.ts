import type { Role } from "./Role"

export type User = {
    id: string,
    name: string,
    email: string,
    password?: string,
    role: Role
}