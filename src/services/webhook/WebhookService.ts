import { AxiosResponse } from "axios";
import { api } from "../api/api";
import { credentials } from "../../types/credentials/credentials";
import { payload } from "../../types/payload/payload";

export async function getCredentials<T>(webhook: string) {
  const response: AxiosResponse<T> = await api.get(webhook);

  return response;
}

export async function sendMessage<T>(credentials: credentials, payload: payload, files?: File[]) {
  const formData = new FormData();

  files?.forEach((file, index) => {
    formData.append(`file${index}`, file, file.name);
  });

  formData.append('payload_json', JSON.stringify(payload));

  const response: AxiosResponse<T> = await api.post(`/${credentials.id}/${credentials.token}`, formData)

  return response;
}