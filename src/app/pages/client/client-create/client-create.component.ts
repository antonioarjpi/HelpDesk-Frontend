import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

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
  cpf: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(11));
  email: UntypedFormControl = new UntypedFormControl(null, Validators.email);
  senha: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(6));

  constructor(
    private service: ClientService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  create(): void {

    if (!this.validaCampos()) {
      return;
    }

    this.service.create(this.client).subscribe(
      () => {
        this.toast.success("Cliente cadastrado com sucesso", "Cadastro");
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
