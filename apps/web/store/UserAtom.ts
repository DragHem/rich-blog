"use client";

import { atom, selector } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    email: "",
    name: "",
  },
});

export const userDataSelector = selector({
  key: "userData",
  get: async () => {
    const response = await fetch("http://app.com:4000/user", {
      credentials: "include",
    });

    return await response.json();
  },
});
