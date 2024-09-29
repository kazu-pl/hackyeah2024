import { NewUserData } from "../../features/Register";

import { LOCALSTORAGE_ACCOUNT } from "../constants/auth";

import { v4 } from "uuid";

interface Account extends NewUserData {
  id: string;
}

export const saveAccound = (data: NewUserData) => {
  const newAccount: Account = {
    ...data,
    id: v4(),
  };

  localStorage.setItem(LOCALSTORAGE_ACCOUNT, JSON.stringify(newAccount));
};

export const getAccount = (): Account | null => {
  const account = localStorage.getItem(LOCALSTORAGE_ACCOUNT);

  if (!account) return null;

  return JSON.parse(account);
};

export const removeAccount = () => {
  localStorage.removeItem(LOCALSTORAGE_ACCOUNT);
};
