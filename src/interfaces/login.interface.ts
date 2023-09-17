export type { ILoginRequest, ILoginResponse };

interface ILoginRequest {
  username: string;
  password: string;
}

interface ILoginResponse {
  refresh: string;
  access: string;
}
