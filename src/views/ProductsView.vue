<template>
  <ProductLayout>
    <template v-slot:left>
      <span class="p-input-icon-left search">
        <i class="pi pi-search" />
        <InputText
          class="search_input"
          type="text"
          v-model="modelSearch"
          placeholder="Search"
        />
      </span>
    </template>
    <template v-slot:right>
      <Button
        label="New"
        icon="pi pi-plus"
        class="button"
        @click="$router.push('/products/create')"
      />
    </template>
    <template v-slot:content>
      <ul class="list">
        <li v-for="p in products" :key="p._id" class="product">
          <ProductInfo
            :data="p"
            :show="true"
            @delete="getProducts"
          ></ProductInfo>
        </li>
      </ul>
    </template>
  </ProductLayout>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
</script>

<script>
import ProductLayout from "@/layouts/ProductLayout.vue";
import ProductInfo from "@/components/ProductInfo.vue";
import api from "@/api";

export default {
  components: [ProductLayout, ProductInfo],
  data() {
    return {
      modelSearch: "",
      productsRAW: [],
      products: [],
    };
  },
  watch: {
    modelSearch(newValue) {
      this.products = this.productsRAW.filter(function (p) {
        return p.name.includes(newValue);
      });
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      this.productsRAW = await api.getProducts();
      this.products = this.productsRAW;
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin-left: 30px;
  > .search_input {
    border: 1px solid rgba(162, 163, 164, 0.2);
    padding-left: 31px;
    border-radius: 4px;
    width: 337px;
    height: 32px;
    font-weight: 400;
    font-size: 9.39167px;
    line-height: 11px;
    &::placeholder {
      color: #a2a3a4;
    }
  }
}
.button {
  background-color: #248aff;
  border: none;
  border-radius: 6px;
  width: 102px;
  height: 35px;
  font-size: 16px;
  line-height: 19px;
  margin-right: 32px;
}
.list {
  width: 90%;
  max-width: 1283px;
  margin: 0 auto;
  list-style-type: none;
  display: flex;
  gap: 31px;
  flex-wrap: wrap;
  align-content: flex-start;
  .product {
    display: block;
  }
}
</style>
