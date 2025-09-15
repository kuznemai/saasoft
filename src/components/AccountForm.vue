<script setup>
import { useAccountsStore } from "@/store/accounts.js";
import AccountItem from "@/components/AccountItem.vue";

const store = useAccountsStore();

function getEmit(payload) {
  console.log(payload);
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper_button">
      <p>Учетные записи</p>
      <a-button type="primary" @click="store.addAccount()">+</a-button>
    </div>
    <div v-for="item in store.accounts" :key="item.id" class="account_item">
      <AccountItem :account="item" @update:model-value="getEmit"></AccountItem>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.wrapper_button {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 20px;
}
.account_item {
  margin: 10px;
}
</style>
