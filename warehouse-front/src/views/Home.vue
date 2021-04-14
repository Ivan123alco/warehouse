<template>
  <v-container>
    <ProductList />
  </v-container>
</template>

<script>
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Home",
  components: {
    ProductList
  }
};
</script>
