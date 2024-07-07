import { errorHandler, server } from "./config";

interface IInformation {
  weight?: number;
  height?: number;
  birthDate?: Date;
  lastUpdate: Date;
}

const baseURL = "/information";

export async function UpdateInformation(babyInformation: IInformation, token: string) {
  const result = await fetch(`${server}${baseURL}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify(babyInformation),
  });
  return errorHandler(result);
}

export async function UploadAvatar(avatar: FormData, token: string) {
  const result = await fetch(`${server}${baseURL}/avatar`, {
    method: "PUT",
    headers: { token },
    body: avatar,
  });
  return errorHandler(result);
}
