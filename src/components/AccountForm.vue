<script setup>
import { useAccountsStore } from "@/store/accounts.js";
import AccountItem from "@/components/AccountItem.vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";

const store = useAccountsStore();

function getEmit(payload) {
  console.log(payload);
}
</script>

<template>
  <div class="wrapper">
    <div class="wrapper_button">
      <p>Учетные записи</p>
      <a-button type="primary" @click="store.addAccount()" class="custom_addbtn"
        >+</a-button
      >
    </div>
    <div class="info-block">
      <question-circle-outlined />
      <span>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </span>
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
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 50px;
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
.info-block {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  background-color: #cccccc;
  font-size: 14px;
  padding: 5px;
}
.info-block .anticon {
  margin-right: 6px;
  color: #1677ff;
  font-size: 16px;
}
.custom_addbtn {
  background-color: #ffffff;
  color: #282828;
  border: 1px solid #cdcdcd;
}
</style>
