<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAccountsStore, Account } from "@/store/accounts";
import AccountItem from "@/components/AccountItem.vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";

const store = useAccountsStore();

onMounted(() => {
  store.getRecords();
});

const showPassword = computed(() => {
  return store.accounts.some((el) => el.type === "Локальная");
});
</script>

<template>
  <div class="wrapper">
    <div class="wrapper_button">
      <p>Учетные записи</p>
      <a-button type="primary" @click="store.addAccount()" class="custom_addbtn"
        >+
      </a-button>
    </div>
    <div class="info-block">
      <question-circle-outlined />
      <span>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </span>
    </div>

    <div class="accounts-header">
      <div class="header-item">Метки</div>
      <div class="header-item">Тип записи</div>
      <div class="header-item">Логин</div>
      <div v-if="showPassword">
        <div class="header-item">Пароль</div>
      </div>
    </div>

    <div v-for="item in store.accounts" :key="item.id" class="account_item">
      <AccountItem :account="item"></AccountItem>
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

.accounts-header {
  display: grid;
  grid-template-columns: 150px 140px 1fr 1fr 40px; /* ширины как у полей */
  gap: 10px;
  margin-bottom: 8px;
  text-align: left;
  padding: 10px;
}

.header-item {
  display: flex;
  align-items: center;
  color: #676767;
}
</style>
