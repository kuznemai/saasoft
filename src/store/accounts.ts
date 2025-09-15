import { defineStore } from "pinia";

export const useAccountsStore = defineStore("accounts", {
  state: () => ({
    accounts: [],
  }),
  getters: {
    addAccount: (id) => state.accounts * 2,
  },
  actions: {
    addAccount(id) {
      this.accounts;
    },
    removeAccount(id) {},
  },
});
