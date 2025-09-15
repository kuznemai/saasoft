<script setup>
import { ref } from "vue";

const labelsString = ref("");
const type = ref("");
const login = ref("");
const password = ref("");
</script>

<template>
  <a-space class="mb-2" wrap>
    <a-input
      v-model:value="labelsString"
      placeholder="Метки через ;"
      :maxlength="50"
    />
    <a-select
      v-model:value="type"
      style="width: 140px"
      placeholder="Тип записи"
    >
      <a-select-option value="Локальная">Локальная</a-select-option>
      <a-select-option value="LDAP">LDAP</a-select-option>
    </a-select>
    <a-input v-model:value="login" placeholder="Логин" :maxlength="100" />
    <a-input-password
      v-if="type === 'Локальная'"
      v-model:value="password"
      placeholder="Пароль"
      :maxlength="100"
    />
    <a-button danger>Удалить</a-button>
  </a-space>
</template>

<style scoped></style>
