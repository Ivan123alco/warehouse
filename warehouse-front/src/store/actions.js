import axios from "axios"

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

const actions = {
  async getProducts({ commit }) {
    const { data } = await instance.get("/products");
    commit("setProducts", data);
    return data;
  },
  async buyProduct({ dispatch }, name) {
    await instance.put(`/sell/${name}`, null);
    dispatch("getProducts");
  }
};

export default actions;
