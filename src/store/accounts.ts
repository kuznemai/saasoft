import { defineStore } from "pinia";
import { ref } from "vue";

interface Label {
  text: string;
}

export interface Account {
  id: number;
  labels: Label[];
  type: "Локальная" | "LDAP" | "";
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<Account[]>([]);

  function addAccount() {
    accounts.value.push({
      id: Date.now(),
      labels: [],
      type: "",
      login: "",
      password: "",
    });
  }

  function removeAccount(id: number) {
    accounts.value = accounts.value.filter((item) => item.id !== id);
    saveRecords();
  }

  function isValidAccount(account: Account): boolean {
    if (!account.type || !account.login?.trim()) return false;
    if (account.type === "Локальная" && !account.password?.trim()) return false;
    return true;
  }

  function saveRecords() {
    const validAccounts = accounts.value.filter(isValidAccount);
    if (validAccounts.length !== accounts.value.length) {
      console.warn(
        "Не все учётные записи заполнены корректно, сохранены только валидные",
      );
    }
    localStorage.setItem("accounts", JSON.stringify(validAccounts));
  }

  function getRecords() {
    accounts.value = JSON.parse(localStorage.getItem("accounts") || "[]");
  }

  return { accounts, addAccount, removeAccount, saveRecords, getRecords };
});
