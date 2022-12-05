import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { NavComponent } from "./components/nav/nav.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { TechnicianComponent } from "./pages/technician/list/technician.component";
import { TechnicianCreateComponent } from "./pages/technician/technician-create/technician-create.component";
import { TechnicianUpdateComponent } from "./pages/technician/technician-update/technician-update.component";

const routes: Routes = [
  {
    path: "",
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "tecnicos",
        component: TechnicianComponent,
      },
      {
        path: "tecnicos/criar",
        component: TechnicianCreateComponent,
      },
      {
        path: "tecnicos/atualizar/:id",
        component: TechnicianUpdateComponent,
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
