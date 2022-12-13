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
  admin: boolean;
  tech: boolean;
  client: boolean;

  constructor(
    private service: TechnicianService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.technician.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.technician.id).subscribe((response) => {

      const profiles = response.profiles;
      response.profiles = [];
      let prof = [];

      if (profiles.indexOf('ADMIN') != -1) {
        prof.push(0);
        this.admin = true;
      }
      if (profiles.indexOf('CLIENT') != -1) {
        prof.push(1);
        this.client = true;
      }
      if (profiles.indexOf('TECH') != -1) {
        prof.push(2);

        this.tech = true;
      }

      response.profiles = prof;
      this.technician = response;

    });
  }

  update(): void {

    if (!this.validaCampos()) {
      return;
    }

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
      this.nome.valid && this.cpf.valid && this.email.valid
    );
  }
}
