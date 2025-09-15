import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref([]);

  function addAccount() {
    accounts.value.push({
      id: Date.now(),
      labelsString: "",
      type: "",
      login: "",
      password: "",
    });
  }

  function removeAccount(id: string) {
    accounts.value = accounts.value.filter((item) => item.id !== id);
  }

  return { accounts, addAccount, removeAccount };
});
