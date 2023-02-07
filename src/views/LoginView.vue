<template>
  <WelcomeLayout headerButtonLink="/register">
    <template v-slot:content>
      <div class="container">
        <h4 class="title">Enter your credentials</h4>
        <label class="email_label" for="email">
          <span class="email_label_span">Email Address</span>
          <InputText
            class="email_label_input"
            :class="{ 'p-invalid': validateEmail }"
            type="email"
            name="email"
            id="email"
            placeholder="yourname@gmail.com"
            v-model="user.email"
            required
          />
        </label>
        <label class="password_label" for="password">
          <div class="password_label_description">
            <span>Password</span>
            <router-link class="link" to="/forgot-password"
              >Forgot password?</router-link
            >
          </div>
          <Password
            inputClass="password_label_input"
            :class="{ 'p-invalid': validatePassword }"
            name="password"
            inputId="password"
            placeholder="smallTiger21"
            v-model="user.password"
            :feedback="false"
            @keyup.enter="login"
            toggleMask
            required
          />
        </label>
        <label class="check_label" for="keep">
          <Checkbox
            v-model="modelKeep"
            :binary="true"
            inputClass="check_label_input"
            name="keep"
            id="keep"
            required
          />
          <span class="check_label_span">Keep me signed in</span>
        </label>
        <Button class="send_button" label="Login" @click="login" />
        <div class="register">
          <span>Not a member? </span>
          <router-link class="link" to="/register">Sign up</router-link>
        </div>
      </div>
    </template>
    <template v-slot:header-text>
      <div class="header-text">No employer account yet?</div>
    </template>
    <template v-slot:header-button>Register</template>
  </WelcomeLayout>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
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
      showModal: true,
      user: {
        email: null,
        password: null,
      },
      modelKeep: false,
      firstSend: false,
    };
  },
  computed: {
    validateEmail() {
      return this.firstSend && this.validateInput(this.user.email);
    },
    validatePassword() {
      return this.firstSend && this.validateInput(this.user.password);
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
    async login() {
      this.firstSend = true;
      if (this.validateEmail || this.validatePassword) {
        return;
      }
      try {
        const data = await api.login(this.user);
        localStorage.setItem("token", data.token);
        this.$router.push("/products");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.password_label_input) {
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
.header-text {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #757575;
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
  .email_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    .email_label_span {
      margin-bottom: 14px;
    }
    .email_label_input {
      height: 57px;
      border: 2px solid #e5e5e5;
      border-radius: 4px;
      padding-left: 19px;
      font-family: "Inter", sans-serif;
      font-weight: 400;
      font-size: 17px;
      line-height: 21px;
      &.p-invalid {
        border-color: #f44336;
      }
      &::placeholder {
        color: #c4c4c4;
      }
    }
  }
  .password_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 52px;
    .password_label_description {
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
  .check_label {
    display: flex;
    align-items: center;
    margin-bottom: 31px;
    .check_label_span {
      margin-left: 9px;
    }
  }
  .register {
    span {
      cursor: initial;
    }
    .link {
      color: #248aff;
      text-decoration: none;
    }
  }
}
</style>
