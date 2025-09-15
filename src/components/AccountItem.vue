<script setup>
import { useAccountsStore } from "@/store/accounts.js";
const store = useAccountsStore();

const props = defineProps({
  account: Object,
});
</script>

<template>
  <a-space class="mb-2" wrap>
    <a-input
      v-model:value="props.account.labelsString"
      placeholder="Метки через ;"
      :maxlength="50"
    />
    <a-select
      v-model:value="props.account.type"
      style="width: 140px"
      placeholder="Тип записи"
    >
      <a-select-option value="Локальная">Локальная</a-select-option>
      <a-select-option value="LDAP">LDAP</a-select-option>
    </a-select>
    <a-input
      v-model:value="props.account.login"
      placeholder="Логин"
      :maxlength="100"
    />
    <a-input-password
      v-if="props.account.type === 'Локальная'"
      v-model:value="props.account.password"
      placeholder="Пароль"
      :maxlength="100"
    />
    <a-button danger @click="store.removeAccount(props.account.id)"
      >Удалить</a-button
    >
  </a-space>
</template>

<style scoped></style>
