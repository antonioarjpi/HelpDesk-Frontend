import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientService } from "./../../../services/client.service";
import { ToastrService } from "ngx-toastr";
import { Client } from "src/app/models/client";

@Component({
  selector: "app-client-update",
  templateUrl: "./client-update.component.html",
  styleUrls: ["./client-update.component.css"],
})
export class ClientUpdateComponent implements OnInit {
  client: Client = {
    id: "",
    name: "",
    cpf: "",
    email: "",
    password: "",
    profiles: [],
    dateCadastre: "",
  };

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(6));
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
    this.client.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.client.profiles = [];
  }

  findById(): void {
    this.service.findById(this.client.id).subscribe(response => {
      this.admin = response.profiles.indexOf('ADMIN');
      this.clientRole = response.profiles.indexOf('CLIENT');
      this.tech = response.profiles.indexOf('TECH');
      console.log(response)

      this.client = response;
    })
  }

  update(): void {
    this.service.update(this.client).subscribe(
      () => {
        this.toast.success("Cliente atualizado com sucesso", "Atualização");
        this.router.navigate(["clientes"]);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
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

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
