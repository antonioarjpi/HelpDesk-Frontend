import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { NavComponent } from "./components/nav/nav.component";
import { ClientListComponent } from "./pages/client/client-list/client-list.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { TechnicianComponent } from "./pages/technician/list/technician.component";
import { TechnicianCreateComponent } from "./pages/technician/technician-create/technician-create.component";
import { TechnicianDeleteComponent } from "./pages/technician/technician-delete/technician-delete.component";
import { TechnicianUpdateComponent } from "./pages/technician/technician-update/technician-update.component";
import { ClientCreateComponent } from "./pages/client/client-create/client-create.component";
import { ClientUpdateComponent } from "./pages/client/client-update/client-update.component";
import { ClientDeleteComponent } from "./pages/client/client-delete/client-delete.component";

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
      {
        path: "tecnicos/deletar/:id",
        component: TechnicianDeleteComponent,
      },
      {
        path: "clientes",
        component: ClientListComponent,
      },
      {
        path: "clientes/criar",
        component: ClientCreateComponent,
      },
      {
        path: "clientes/atualizar/:id",
        component: ClientUpdateComponent,
      },
      {
        path: "clientes/deletar/:id",
        component: ClientDeleteComponent,
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
