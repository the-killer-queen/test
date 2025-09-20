import { authRoutes, protectedRoutes } from './constant';

export function isAuthRoute(pathname: string, locale: string) {
  const basePath = pathname.replace(`/${locale}`, '') || '/';
  return authRoutes.some((route) => {
    const routePath = route.startsWith('/') ? route : `/${route}`;
    return basePath === routePath || basePath.startsWith(`${routePath}/`);
  });
}

export function isProtectedRoute(pathname: string, locale: string) {
  const basePath = pathname.replace(`/${locale}`, '') || '/';
  return protectedRoutes.some((route) => {
    const routePath = route.startsWith('/') ? route : `/${route}`;
    return basePath === routePath || basePath.startsWith(`${routePath}/`);
  });
}
