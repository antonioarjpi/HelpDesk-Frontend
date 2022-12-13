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

  admin: boolean;
  tech: boolean;
  client: boolean;

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
}
