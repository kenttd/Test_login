"use server";

import { cookies } from "next/headers";

export async function deleteCookie(data: string) {
  cookies().delete(data);
}
export async function setCookie(data: string, value: string) {
  cookies().set(data, value);
}
export async function getCookie(data: string) {
  return cookies().get(data);
}
