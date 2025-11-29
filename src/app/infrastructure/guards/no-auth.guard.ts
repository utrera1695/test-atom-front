import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../http/services/auth.service";

export const noAuthGuard = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (auth.isLoggedIn()) {
    router.navigate(["/dashboard"]);
    return false;
  }

  return true;
};
