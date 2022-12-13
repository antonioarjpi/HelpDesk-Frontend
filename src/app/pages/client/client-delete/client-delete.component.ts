import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from "./../../../services/client.service";
import { ToastrService } from "ngx-toastr";
import { Client } from "src/app/models/client";

@Component({
  selector: "app-client-delete",
  templateUrl: "./client-delete.component.html",
  styleUrls: ["./client-delete.component.css"],
})
export class ClientDeleteComponent implements OnInit {
  client: Client = {
    id: "",
    name: "",
    cpf: "",
    email: "",
    password: "",
    profiles: [],
    dateCadastre: "",
  };

  admin: boolean;
  tech: boolean;
  clientRole: boolean;

  constructor(
    private service: ClientService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.client.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.client.id).subscribe((response) => {
      const profiles = response.profiles;
      response.profiles = [];
      let prof = [];

      if (profiles.indexOf('ADMIN') != -1) {
        prof.push(0);
        this.admin = true;
      }
      if (profiles.indexOf('CLIENT') != -1) {
        prof.push(1);
        this.clientRole = true;
      }
      if (profiles.indexOf('TECH') != -1) {
        prof.push(2);

        this.tech = true;
      }
      
      response.profiles = prof;
      this.client = response;
    });
  }

  delete(): void {
    this.service.delete(this.client.id).subscribe(
      () => {
        this.toast.success("Cliente deletado com sucesso", "Exclusão");
        this.router.navigate(["clientes"]);
      },
      (ex) => {
        this.toast.error(ex.error.message);
      }
    );
  }

  addPerfil(perfil: any): void {
    if (this.client.profiles.includes(perfil)) {
      this.client.profiles.splice(this.client.profiles.indexOf(perfil), 1);
    } else {
      this.client.profiles.push(perfil);
    }
  }
}
