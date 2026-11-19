export function safeReturnPath(path: string | null): string {
  if (!path?.startsWith("/") || path.startsWith("//") || /[\\\u0000-\u001f\u007f]/.test(path)) {
    return "/dashboard";
  }
  const pathname = path.split(/[?#]/, 1)[0];
  return pathname === "/auth" || pathname.startsWith("/auth/") || pathname === "/sign-in"
    ? "/dashboard"
    : path;
}
