// h for host.. (prefix)
const h = (pathname: string) => `${process.env.NEXT_PUBLIC_API}${pathname}`;

export default {
  authValidateToken: h("/auth/validate_token"),
  authSignIn: h("/auth/sign_in"),
  auth: h("/auth"),
};
