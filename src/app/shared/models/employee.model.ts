export interface Employee {
    id: string;
    name: string;
    type: string;
    allocation: number;
    subordinates?: Employee[];
}