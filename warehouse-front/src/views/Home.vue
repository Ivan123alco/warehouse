<template>
  <v-container>
    <ProductList :products="products" />
  </v-container>
</template>

<script>
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Home",
  data() {
    return {
      products: [
        {
          name: "Dining Chair",
          contain_articles: [
            {
              art_id: "1",
              amount_of: "4"
            },
            {
              art_id: "2",
              amount_of: "8"
            },
            {
              art_id: "3",
              amount_of: "1"
            }
          ],
          stock: 27
        },
        {
          name: "Dinning Table",
          contain_articles: [
            {
              art_id: "1",
              amount_of: "4"
            },
            {
              art_id: "2",
              amount_of: "8"
            },
            {
              art_id: "4",
              amount_of: "1"
            }
          ],
          stock: 27
        }
      ]
    };
  },
  components: {
    ProductList
  }
};
</script>
