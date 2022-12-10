export interface Called {
  id?: string;
  title: string;
  openDate: Date;
  closeDate: Date;
  observation: string;
  priority: number;
  status: number;
  technician: string;
  technicianName: string;
  technicianEmail: string;
  client: string;
  clientName: string;
  clientEmail: string;
}

export interface CalledCreate {
  id?: string;
  title: string;
  observation: string;
  priority: number;
  status: number;
  technician: string;
  client: string;
}
