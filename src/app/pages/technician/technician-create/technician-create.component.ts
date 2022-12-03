import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { TechnicianService } from "./../../../services/technician.service";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { Technician } from "./../../../models/techinician";

@Component({
  selector: "app-technician-create",
  templateUrl: "./technician-create.component.html",
  styleUrls: ["./technician-create.component.css"],
})

export class TechnicianCreateComponent implements OnInit {
  
  tecnico: Technician = {
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
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TechnicianService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.tecnico).subscribe(
      () => {
        this.toast.success("Técnico cadastrado com sucesso", "Cadastro");
        this.router.navigate(["tecnicos"]);
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
    if (this.tecnico.profiles.includes(perfil)) {
      this.tecnico.profiles.splice(this.tecnico.profiles.indexOf(perfil), 1);
    } else {
      this.tecnico.profiles.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
