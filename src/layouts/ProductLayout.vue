<template>
  <div class="container">
    <header class="header">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
        <i class="pi pi-bell notification" />
        <div class="name">{{ name }}</div>
        <div>
          <picture class="profile-pic">
            <img
              src="https://pbs.twimg.com/profile_images/1292686696648237056/9RE3j99m_400x400.jpg"
              alt=""
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            />
          </picture>
          <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
        </div>
      </div>
    </header>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import Menu from "primevue/menu";
</script>

<script>
import ProductInfo from "@/components/ProductInfo.vue";
import api from "@/api";

export default {
  components: [ProductInfo],
  data() {
    return {
      name: null,
      id: null,
      items: [
        {
          label: "Logout",
          icon: "pi pi-power-off",
          command: this.logout,
        },
      ],
    };
  },
  created() {
    this.setUser();
  },
  methods: {
    async setUser() {
      const data = await api.checkProtected();
      this.name = data.user.name;
      this.id = data.user._id;
    },
    async logout() {
      await api.logout();
      this.$router.push("/login");
    },
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  > .header {
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.75);
    height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
    > .right {
      display: flex;
      align-items: center;
      > .notification {
        margin-right: 32px;
        font-size: 16px;
      }
      > .name {
        margin-right: 28px;
      }
      .profile-pic {
        display: block;
        margin-right: 30px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  > .content {
    background-color: #f4f4f4;
    height: calc(100vh - 68px);
    position: relative;
    z-index: 1;
    padding-top: 56px;
    overflow-y: scroll;
    display: flex;
  }
}
</style>
