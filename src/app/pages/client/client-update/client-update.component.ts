import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
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

  nome: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3));
  cpf: UntypedFormControl = new UntypedFormControl(null, Validators.required);
  email: UntypedFormControl = new UntypedFormControl(null, Validators.email);
  senha: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(6));
  admin: boolean;
  tech: boolean;
  clientRole: boolean;

  constructor(
    private service: ClientService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.client.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.client.id).subscribe(response => {
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
    })
  }

  update(): void {
    if (!this.validaCampos()) {
      return;
    }
    this.service.update(this.client).subscribe(
      () => {
        this.toast.success("Cliente atualizado com sucesso", "Atualiza????o");
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
