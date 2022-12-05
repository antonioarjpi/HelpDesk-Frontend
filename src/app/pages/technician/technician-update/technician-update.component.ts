import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { TechnicianService } from "./../../../services/technician.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";
import { Technician } from "./../../../models/techinician";

@Component({
  selector: "app-technician-update",
  templateUrl: "./technician-update.component.html",
  styleUrls: ["./technician-update.component.css"],
})
export class TechnicianUpdateComponent implements OnInit {
  technician: Technician = {
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
  client: number;

  constructor(
    private service: TechnicianService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.technician.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.technician.id).subscribe((response) => {
      this.admin = response.profiles.indexOf('ADMIN');
      this.client = response.profiles.indexOf('CLIENT');
      this.tech = response.profiles.indexOf('TECH');
      response.profiles = [];
      this.technician = response;

    });
  }

  update(): void {
    this.service.update(this.technician).subscribe(
      () => {
        this.toast.success("Técnico atualizado com sucesso", "Atualização");
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
    if (this.technician.profiles.includes(perfil)) {
      this.technician.profiles.splice(
        this.technician.profiles.indexOf(perfil),
        1
      );
    } else {
      this.technician.profiles.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }

  isAdmin(): boolean {
    if(this.admin == 1){
      return true;
    }else{
      return false;
    }
  }

  isClient(): boolean {
    if (this.client == 1) {
      return true;
    }else{
      return false;
    }
  }

  isTech(): boolean {
    if (this.tech == 1) {
      return true;
    }else{
      return false;
    }
  }
}
