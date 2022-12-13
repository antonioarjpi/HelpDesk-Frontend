import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CalledCreate } from "src/app/models/called";
import { Client } from "src/app/models/client";
import { Technician } from "src/app/models/techinician";
import { CalledService } from "src/app/services/called.service";
import { ClientService } from "src/app/services/client.service";
import { TechnicianService } from "src/app/services/technician.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-called-update",
  templateUrl: "./called-update.component.html",
  styleUrls: ["./called-update.component.css"],
})
export class CalledUpdateComponent implements OnInit {
  technicians: Technician[] = [];
  clients: Client[] = [];

  called: CalledCreate = {
    id: "",
    title: "",
    observation: "",
    priority: -1,
    status: -1,
    technician: "",
    client: "",
  };

  title: FormControl = new FormControl(null, Validators.minLength(10));
  status: FormControl = new FormControl(null, Validators.min(0));
  priority: FormControl = new FormControl(null, Validators.min(0));
  technician: FormControl = new FormControl(null, Validators.required);
  client: FormControl = new FormControl(null, Validators.required);
  observation: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: CalledService,
    private clientService: ClientService,
    private technicianService: TechnicianService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.called.id = this.route.snapshot.paramMap.get("id");
    this.findyById();
    this.findAllTechnician();
    this.findAllClients();
  }

  updateCalled(): void {
    if (
      this.title.invalid ||
      this.technician.invalid ||
      this.client.invalid ||
      this.priority.invalid ||
      this.status.invalid ||
      this.observation.invalid
    ) {
      return;
    }

    this.service.update(this.called).subscribe((response) => {
      this.toast.success(
        "Sucesso ao alterar chamado",
        "Atualização de chamado"
      );
      this.router.navigate(["chamados"]);
    });
  }

  findyById(): void {
    this.service.findById(this.called.id).subscribe((response) => {
      this.called.id = response.id;
      this.called.client = response.client;
      this.called.observation = response.observation;
      this.called.priority = response.priority;
      this.called.status = response.status;
      this.called.technician = response.technician;
      this.called.title = response.title;
    });
  }

  findAllTechnician(): void {
    this.technicianService.findAll().subscribe((response) => {
      this.technicians = response;
    });
  }

  findAllClients(): void {
    this.clientService.findAll().subscribe((response) => {
      this.clients = response;
    });
  }

  returnStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "ANDAMENTO";
    } else {
      return "FECHADO";
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
