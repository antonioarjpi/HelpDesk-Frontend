import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Credentials } from "./../../models/credentials";
import { AuthService } from "./../../services/auth.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  creds: Credentials = {
    email: "",
    password: "",
  };

  email = new UntypedFormControl(null, Validators.email);
  password = new UntypedFormControl(null, Validators.minLength(6));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.service.authenticate(this.creds).subscribe(
      (response) => {
        this.service.successLogin(
          response.headers.get("Authorization").substring(7));
          this.router.navigate(['home']);
      },
      () => {
        this.toast.error("Usuário ou/e senha inválidos.", "Login");
      }
    );
  }

  validateFields(): boolean {
    if (this.email.valid && this.password.valid) {
      return true;
    }
    return false;
  }
}
