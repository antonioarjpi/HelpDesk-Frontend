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

  admin: number;
  tech: number;
  clientRole: number;

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
      this.admin = response.profiles.indexOf("ADMIN");
      this.clientRole = response.profiles.indexOf("CLIENT");
      this.tech = response.profiles.indexOf("TECH");
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
}
