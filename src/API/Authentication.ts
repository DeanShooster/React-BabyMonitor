import { errorHandler, server } from "./config";

export async function AppSign(credentials: { [key: string]: string }) {
  const result = await fetch(`${server}/sign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return errorHandler(result);
}

export async function IsAuth(token: string) {
  const result = await fetch(`${server}/auth`, {
    method: "GET",
    headers: { token },
  });
  return errorHandler(result);
}
