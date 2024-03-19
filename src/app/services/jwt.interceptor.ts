import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = localStorage.getItem('myToken')
  if (jwtToken) {
    var cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return next(cloned);
  }
  return next(req);
};


