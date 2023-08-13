import { Employee } from "./employee.model";

export interface Department {
    id: string;
    name: string;
    children?: Employee[];
}