<template>
  <div class="container">
    <picture class="picture">
      <img
        :src="
          data.image ||
          'https://pbs.twimg.com/profile_images/1292686696648237056/9RE3j99m_400x400.jpg'
        "
        alt=""
      />
    </picture>
    <div class="info">
      <div class="info_name">
        <span class="info_name_span">{{ data.name }}</span>
        <div>
          <i
            class="pi pi-ellipsis-v info_name_icon"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
          <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
        </div>
      </div>
      <div class="info_price">$ {{ data.price }}</div>
      <div class="info_details">
        <div class="info_details_time">
          <i class="pi pi-clock info_details_time_clock" />
          <span class="info_details_time_span">5f 16h</span>
        </div>
        <div class="info_details_rate">
          <template v-for="n in 5" :key="n">
            <template v-if="data.rate >= n">
              <i class="pi pi-star-fill info_details_rate_icon" />
            </template>
            <template v-else>
              <i class="pi pi-star info_details_rate_icon" />
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Menu from "primevue/menu";
</script>

<script>
import api from "@/api";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      items: [
        {
          label: "Edit",
          icon: "pi pi-pencil",
          command: () => {
            this.$router.push(`/products/${this.data._id}`);
          },
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: this.deleteProduct,
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      if (!this.show) {
        return;
      }
      this.$refs.menu.toggle(event);
    },
    async deleteProduct() {
      try {
        await api.deleteProduct(this.data._id);
        this.$emit("delete");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 188px;
  min-width: 188px;
  background: #ffffff;
  box-shadow: 0px 3.13056px 34.4361px -16.4354px rgba(0, 0, 0, 0.25);
  border-radius: 29px;
  overflow: hidden;
  .picture {
    display: block;
    width: 100%;
    height: 155px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  .info {
    padding: 12px 15px 18px 10px;
    .info_name {
      margin-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info_name_icon {
        font-size: 11px;
      }
    }
    .info_price {
      margin-bottom: 22px;
      font-weight: 700;
      font-size: 15.6528px;
      line-height: 19px;
      color: #050505;
    }
    .info_details {
      display: flex;
      justify-content: space-between;
      .info_details_time {
        display: flex;
        align-items: center;
        .info_details_time_clock {
          font-size: 10px;
        }
        .info_details_time_span {
          margin-left: 8px;
          font-weight: 400;
          font-size: 7.82639px;
          line-height: 9px;
        }
      }
      .info_details_rate {
        .info_details_rate_icon {
          font-size: 14px;
          margin-left: 3px;
          &.pi-star {
            color: #c4c4c4;
          }
          &.pi-star-fill {
            color: #f8a33c;
          }
        }
      }
    }
  }
}
</style>
