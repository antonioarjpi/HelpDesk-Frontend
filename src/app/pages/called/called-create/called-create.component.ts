import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CalledService } from "src/app/services/called.service";
import { ClientService } from "src/app/services/client.service";
import { TechnicianService } from "./../../../services/technician.service";
import { Technician } from 'src/app/models/techinician';
import { Client } from "src/app/models/client";
import { ToastrService } from 'ngx-toastr';
import { CalledCreate } from "src/app/models/called";

@Component({
  selector: "app-called-create",
  templateUrl: "./called-create.component.html",
  styleUrls: ["./called-create.component.css"],
})
export class CalledCreateComponent implements OnInit {

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
  }


  title: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(10));
  status: UntypedFormControl = new UntypedFormControl(null, Validators.min(0));
  priority: UntypedFormControl = new UntypedFormControl(null, Validators.min(0));
  technician: UntypedFormControl = new UntypedFormControl(null, Validators.required);
  client: UntypedFormControl = new UntypedFormControl(null, Validators.required);
  observation: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3));

  constructor(
    private service: CalledService,
    private clientService: ClientService,
    private technicianService: TechnicianService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllTechnician();
    this.findAllClients();
  }

  openCalled(): void{

    if (this.title.invalid || this.technician.invalid || this.client.invalid || this.priority.invalid || this.status.invalid || this.observation.invalid){
      return;
    }

    this.service.create(this.called).subscribe(response => {
      this.toast.success('Sucesso ao abrir chamado', 'Novo chamado');
      this.router.navigate(['chamados'])
    })
  }

  findAllTechnician(): void{
    this.technicianService.findAll().subscribe(response => {
      this.technicians = response;
    })
  }

  findAllClients(): void{
    this.clientService.findAll().subscribe(response => {
      this.clients = response;
    })
  }
}
