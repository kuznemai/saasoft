<script lang="ts" setup>
import { reactive, watch, ref } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useAccountsStore, Account } from "@/store/accounts";

const store = useAccountsStore();

interface Errors {
  login: boolean;
  password: boolean;
  type: boolean;
}

const props = defineProps<{
  account: Account;
  indexAccount: Number;
}>();

const errors = reactive<Errors>({
  login: false,
  password: false,
  type: false,
});

function validate() {
  errors.login = false;
  errors.password = false;
  errors.type = false;

  props.account.login = props.account.login.trim();
  if (!props.account.login) errors.login = true;
  if (!props.account.type) errors.type = true;

  if (props.account.type === "Локальная") {
    if (!props.account.password || props.account.password.trim() === "")
      errors.password = true;
  } else {
    props.account.password = null;
  }
}

function trimOnBlur(field: keyof Account) {
  if (props.account[field] && typeof props.account[field] === "string") {
    props.account[field] = props.account[field].trim() as any;
  }
  validate();
  store.saveRecords();
}

function parseLabels(labelsString: string) {
  console.log("labelsString", labelsString);
  store.accounts[props.indexAccount].labels = labelsString
    .split(";")
    .map((label) => label.trim())
    .filter((label) => label)
    .map((label) => ({ text: label }));

  store.saveRecords();
}

const labelToString = ref("");

watch(
  () => props.account.labels,
  (newLabels) => {
    if (newLabels.length === 0) {
      labelToString.value = "";
      return;
    }
    labelToString.value = newLabels
      .map((elem) => elem.text.trim())
      .filter((text) => text)
      .join("; ");
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div class="account-row">
    <a-input
      :value="labelToString"
      placeholder="Метки через ;"
      :maxlength="50"
      @blur="parseLabels($event.target.value)"
      style="width: 150px"
    />
    <a-select
      v-model:value="props.account.type"
      style="width: 140px"
      placeholder="Тип записи"
      :status="errors.type ? 'error' : ''"
    >
      <a-select-option value="Локальная">Локальная</a-select-option>
      <a-select-option value="LDAP">LDAP</a-select-option>
    </a-select>

    <div class="login-password-wrapper">
      <a-input
        v-model:value="props.account.login"
        placeholder="Логин"
        :maxlength="100"
        @blur="trimOnBlur('login')"
        :status="errors.login ? 'error' : ''"
      />
      <a-input-password
        v-if="props.account.type === 'Локальная'"
        v-model:value="props.account.password"
        placeholder="Пароль"
        :maxlength="100"
        @blur="trimOnBlur('password')"
        :status="errors.password ? 'error' : ''"
      />
    </div>

    <a-button
      danger
      type="text"
      @click="store.removeAccount(props.account.id)"
      class="custom-button"
    >
      <delete-outlined />
    </a-button>
  </div>
</template>

<style scoped>
.custom-button {
  color: gray;
  font-size: 20px;
  padding: 0 10px;
}

.custom-button:hover {
  color: darkgray;
}
.account-row {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
}

.login-password-wrapper {
  display: flex;
  gap: 10px;
  flex: 1;
}

.login-password-wrapper a-input,
.login-password-wrapper a-input-password {
  flex: 1;
}
</style>
