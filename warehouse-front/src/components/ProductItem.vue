<template>
  <v-card elevation="2">
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-text>Stock: {{ product.stock }}</v-card-text>
    <v-card-actions>
      <v-btn @click="buyProduct(product.name)">Buy</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ProductItem",
  props: ["product"],
  methods: {
    ...mapActions(["buyProduct"])
  }
};
</script>
