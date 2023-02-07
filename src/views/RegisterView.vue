<template>
  <WelcomeLayout headerButtonLink="/login">
    <template v-slot:content>
      <div class="container">
        <h4 class="title">Create your account</h4>
        <label class="text_label" for="name">
          <span class="text_label_span">Name</span>
          <InputText
            class="text_label_input"
            :class="{ 'p-invalid': validateName }"
            type="text"
            name="name"
            id="name"
            placeholder="John Smith"
            v-model="user.name"
            required
          />
        </label>
        <label class="text_label" for="email">
          <span class="text_label_span">Email Address</span>
          <InputText
            class="text_label_input"
            :class="{ 'p-invalid': validateEmail }"
            type="email"
            name="email"
            id="email"
            placeholder="yourname@gmail.com"
            v-model="user.email"
            required
          />
        </label>
        <label class="input_password" for="password">
          <span>Password</span>
          <Password
            inputClass="password_input"
            :class="{ 'p-invalid': validatePassword }"
            name="password"
            inputId="password"
            placeholder="smallTiger21"
            v-model="user.password"
            :feedback="false"
            toggleMask
            required
          />
        </label>
        <label class="input_password" for="repeatPassword">
          <span>Repeat Password</span>
          <Password
            inputClass="password_input"
            :class="{ 'p-invalid': validateRepeatPassword }"
            name="repeatPassword"
            inputId="repeatPassword"
            placeholder="smallTiger21"
            v-model="modelRepeatPassword"
            :feedback="false"
            toggleMask
            required
          />
        </label>
        <Button class="send_button" label="Register" @click="register" />
      </div>
    </template>
    <template v-slot:header-button>Login</template>
  </WelcomeLayout>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
</script>

<script>
import WelcomeLayout from "@/layouts/WelcomeLayout.vue";
import api from "@/api";

export default {
  components: {
    WelcomeLayout,
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
      },
      modelRepeatPassword: null,
      firstSend: false,
    };
  },
  computed: {
    validateName() {
      return this.firstSend && this.validateInput(this.user.name);
    },
    validateEmail() {
      return this.firstSend && this.validateInput(this.user.email);
    },
    validatePassword() {
      return this.firstSend && this.validateInput(this.user.password);
    },
    validateRepeatPassword() {
      return (
        this.firstSend &&
        (this.validateInput(this.modelRepeatPassword) ||
          this.user.password !== this.modelRepeatPassword)
      );
    },
  },
  methods: {
    validateInput(input) {
      if (input === "" || input === null || input === undefined) {
        return true;
      } else {
        return false;
      }
    },
    async register() {
      this.firstSend = true;
      if (
        this.validateName ||
        this.validateEmail ||
        this.validatePassword ||
        this.validateRepeatPassword
      ) {
        return;
      }
      try {
        await api.register(this.user);
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.send_button) {
  margin-bottom: 27px;
  background: #248aff;
  border-radius: 6px;
  height: 54px;
  width: 100%;
  border: none;
  text-transform: uppercase;
  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
}
::v-deep(.password_input) {
  height: 57px;
  border: 2px solid #e5e5e5;
  border-radius: 4px;
  padding-left: 19px;
  width: 100%;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  &::placeholder {
    color: #c4c4c4;
  }
}
.container {
  width: 450px;
  span {
    font-size: 16px;
    line-height: 19px;
    color: #4a4844;
  }
  .title {
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    color: #000000;
    margin-bottom: 22px;
  }
  .text_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    .text_label_span {
      margin-bottom: 14px;
    }
    .text_label_input {
      height: 57px;
      border: 2px solid #e5e5e5;
      border-radius: 4px;
      padding-left: 19px;
      font-family: "Inter", sans-serif;
      font-weight: 400;
      font-size: 17px;
      line-height: 21px;
      &::placeholder {
        color: #c4c4c4;
      }
      &.p-invalid {
        border-color: #f44336;
      }
    }
  }
  .input_password {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    .description {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      .link {
        font-size: 16px;
        line-height: 19px;
        color: #5177fd;
        text-decoration: none;
      }
    }
  }
}
</style>
