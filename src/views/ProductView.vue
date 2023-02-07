<template>
  <ProductLayout>
    <template v-slot:content>
      <div class="left">
        <h4 class="title">{{ title }} Product</h4>
        <label class="text_label" for="name">
          <span class="text_label_span">Name</span>
          <InputText
            class="text_label_input"
            :class="{ 'p-invalid': validateName }"
            type="text"
            name="name"
            id="name"
            placeholder="John Smith"
            v-model="product.name"
            required
          />
        </label>
        <label class="image_label" for="name">
          <span class="image_label_span">Image</span>
          <InputText
            class="image_label_input"
            type="file"
            name="image"
            id="image"
            accept="image/*"
            placeholder="John Smith"
            @change="setProductImage"
            required
          />
        </label>
        <label class="price_label" for="name">
          <span class="price_label_span">Price</span>
          <InputNumber
            class="price_label_input"
            inputId="currency-us"
            v-model="product.price"
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </label>
        <label class="rate_label" for="name">
          <span class="rate_label_span">Rate</span>
          <Rating class="rate_label_input" v-model="modelRating" />
        </label>
        <Button class="send_button" :label="title" @click="createOrEdit" />
      </div>
      <div class="right">
        <Button
          label="Back"
          class="right_button"
          @click="$router.push('/products')"
        />
        <ProductInfo :data="productData" />
      </div>
    </template>
  </ProductLayout>
</template>

<script setup>
import ProductLayout from "@/layouts/ProductLayout.vue";
import ProductInfo from "@/components/ProductInfo.vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Rating from "primevue/rating";
import Button from "primevue/button";
</script>

<script>
import api from "@/api";

export default {
  data() {
    return {
      title: "Create",
      product: {
        name: "",
        image: null,
        price: 0,
      },
      id: false,
      modelRating: null,
      firstSend: false,
    };
  },
  computed: {
    productRate() {
      if (this.modelRating === null) {
        return 0;
      }
      return this.modelRating;
    },
    productData() {
      return {
        name: this.product.name,
        image: this.product.image,
        price: `${this.product.price}`,
        rate: `${this.productRate}`,
      };
    },
    validateName() {
      return this.firstSend && this.validateInput(this.product.name);
    },
  },
  created() {
    this.id = this.$route.params.id || false;
    if (this.id) {
      this.title = "Edit";
      this.getProduct(this.id);
    }
  },
  methods: {
    setProductImage(e) {
      const file = e.target.files[0];
      let fileSize = file.size / 1024;
      if (fileSize > 50) {
        return alert("El tamaño del archivo no debe superar los 50 KB.");
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.product.image = reader.result;
      };
    },
    validateInput(input) {
      if (input === "" || input === null || input === undefined) {
        return true;
      } else {
        return false;
      }
    },
    async getProduct(id) {
      const data = await api.getProduct(id);
      this.product.name = data.name;
      this.product.image = data.image;
      this.product.price = parseInt(data.price);
      this.modelRating = data.rate === "0" ? null : parseInt(data.rate);
    },
    async createOrEdit() {
      this.firstSend = true;
      if (this.validateName) {
        return;
      }
      try {
        if (this.id) {
          await api.updateProduct(this.id, this.productData);
        } else {
          await api.createProduct(this.productData);
        }
        this.$router.push("/products");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.price_label_input) {
  .p-inputnumber-input {
    height: 57px;
    border: 2px solid #e5e5e5;
    border-radius: 4px;
    padding-left: 19px;
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
  }
}
::v-deep(.rate_label_input) {
  .p-rating-item .p-rating-icon.pi.pi-star {
    color: #c4c4c4;
  }
  .p-rating-item.p-rating-item-active .p-rating-icon.pi.pi-star-fill {
    color: #f8a33c;
  }
}
.left {
  width: 45%;
  max-width: 642px;
  margin-left: auto;
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
    width: 50%;
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
  .image_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    .image_label_span {
      margin-bottom: 14px;
    }
    .image_label_input {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 0;
      &::placeholder {
        color: #c4c4c4;
      }
      &::-webkit-file-upload-button {
        border: 2px solid #e5e5e5;
        border-radius: 4px;
        font-family: "Inter", sans-serif;
        font-weight: 400;
        font-size: 17px;
        line-height: 21px;
        background-color: white;
      }
      &.p-invalid {
        border-color: #f44336;
      }
    }
  }
  .price_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    width: 50%;
    .price_label_span {
      margin-bottom: 14px;
    }
  }
  .rate_label {
    display: flex;
    flex-direction: column;
    margin-bottom: 28px;
    .rate_label_span {
      margin-bottom: 14px;
    }
  }
}
.right {
  width: 45%;
  max-width: 642px;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .right_button {
    margin-bottom: 10px;
  }
}
</style>
