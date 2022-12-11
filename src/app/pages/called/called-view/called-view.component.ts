import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Called, CalledCreate } from "src/app/models/called";
import { Client } from "src/app/models/client";
import { Technician } from "src/app/models/techinician";
import { CalledService } from "src/app/services/called.service";

@Component({
  selector: "app-called-view",
  templateUrl: "./called-view.component.html",
  styleUrls: ["./called-view.component.css"],
})
export class CalledViewComponent implements OnInit {
  technicians: Technician[] = [];
  clients: Client[] = [];

  called: Called = {
    id: '',
    title: '',
    openDate: '',
    closeDate: '',
    observation: '',
    priority: -1,
    status: -1,
    technician: '',
    technicianName: '',
    technicianEmail: '',
    client: '',
    clientName: '',
    clientEmail: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    public dialogRef: MatDialogRef<CalledViewComponent>,
    private service: CalledService
  ) {}

  ngOnInit(): void {
    this.findyById();
  }

  findyById(): void {
    this.service.findById(this.data).subscribe((response) => {
      this.called = response;
    });
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  returnStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }

  returnPriority(status: any): string {
    if (status == "0") {
      return "BAIXA";
    } else if (status == "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }
}
