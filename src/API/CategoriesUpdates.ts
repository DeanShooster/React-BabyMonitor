import { errorHandler, server } from "./config";

interface IDiaperInformation {
  isPee: boolean;
  time: Date;
  note: string;
}

interface ISleepInformation {
  startTime?: Date;
  endTime?: Date;
  note: string;
}

const baseURL = "/information";

export async function UpdateDiaperInformation(diaperInformation: IDiaperInformation, token: string) {
  const result = await fetch(`${server}${baseURL}/diaper`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify(diaperInformation),
  });
  return errorHandler(result);
}

export async function UpdateSleepInformation(sleepInformation: ISleepInformation, token: string) {
  const result = await fetch(`${server}${baseURL}/sleep`, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify(sleepInformation),
  });
  return errorHandler(result);
}
