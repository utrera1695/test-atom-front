import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../http/services/auth.service";
import { inject, Injector } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const router = inject(Router);
  const auth = injector.get(AuthService);

  const token = auth.getAccessToken();

  let authReq = req;

  /* if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq);
  }
  console.log(token, authReq); */
  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        auth.logout();
        router.navigate(["auth/login"]);
      }
      return throwError(() => err);
    })
  );
};
