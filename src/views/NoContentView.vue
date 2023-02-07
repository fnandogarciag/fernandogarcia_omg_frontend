<template>
  <WelcomeLayout headerButtonLink="/login">
    <template v-slot:content> No Content </template>
    <template v-slot:header-button>Login</template>
  </WelcomeLayout>
</template>

<script>
import WelcomeLayout from "@/layouts/WelcomeLayout.vue";

export default {
  components: {
    WelcomeLayout,
  },
};
</script>
