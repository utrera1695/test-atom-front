import { Routes } from "@angular/router";
import { noAuthGuard } from "./infrastructure/guards/no-auth.guard";
import { authGuard } from "./infrastructure/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "auth",
    loadComponent: () =>
      import("./presentation/pages/auth/auth.component").then(
        (m) => m.AuthComponent
      ),
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "login",
      },
      {
        path: "login",
        canActivate: [noAuthGuard],
        loadComponent: () =>
          import(
            "./presentation/components/auth/loginform/loginform.component"
          ).then((m) => m.LoginformComponent),
      },
    ],
  },
  {
    path: "home",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./presentation/pages/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full",
  },
];
