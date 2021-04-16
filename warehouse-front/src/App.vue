<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon large color="white darken-2" class="shrink ml-2 mr-2">
          mdi-warehouse
        </v-icon>

        <h1 class="h1">Warehouse</h1>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
  methods: {
    ...mapActions(["getProducts"])
  },
  async created() {
    await this.getProducts();
  }
};
</script>
