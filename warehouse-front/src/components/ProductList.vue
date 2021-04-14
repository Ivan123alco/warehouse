<template>
  <v-row>
    <v-col sm="12">
      <h1>Available Products</h1>
      <v-row>
        <v-col
          v-for="(product, index) in products"
          :key="`${product.name}-${index}`"
          lg="4"
          md="6"
          sm="12"
        >
          <ProductItem :product="product" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import ProductItem from "@/components/ProductItem";

export default {
  name: "ProductList",
  components: {
    ProductItem
  },
  computed: {
    ...mapState(["products"])
  }
};
</script>
