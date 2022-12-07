import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Technician } from "src/app/models/techinician";
import { TechnicianService } from "src/app/services/technician.service";

@Component({
  selector: "app-technician-delete",
  templateUrl: "./technician-delete.component.html",
  styleUrls: ["./technician-delete.component.css"],
})
export class TechnicianDeleteComponent implements OnInit {
  technician: Technician = {
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
      this.admin = response.profiles.indexOf("ADMIN");
      this.client = response.profiles.indexOf("CLIENT");
      this.tech = response.profiles.indexOf("TECH");
      response.profiles = [];
      this.technician = response;
    });
  }

  delete(): void {
    this.service.delete(this.technician.id).subscribe(
      () => {
        this.toast.success("Técnico deletado com sucesso", "Exclusão");
        this.router.navigate(["tecnicos"]);
      },
      (ex) => {
        this.toast.error(ex.error.message);
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

  isAdmin(): boolean {
    if (this.admin == 1) {
      return true;
    } else {
      return false;
    }
  }

  isClient(): boolean {
    if (this.client == 1) {
      return true;
    } else {
      return false;
    }
  }

  isTech(): boolean {
    if (this.tech == 1) {
      return true;
    } else {
      return false;
    }
  }
}
