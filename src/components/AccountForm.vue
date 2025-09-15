<script setup>
import { Button } from "antd";
import { useAccountsStore } from "@/store/accounts.js";

const store = useAccountsStore();
</script>

<template>
  <p>Учетные записи</p>
  <a-button type="primary">Кнопка</a-button>
</template>

<style scoped></style>
