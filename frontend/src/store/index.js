import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    setToken(state, token) {
      console.log('Token set:', token); // Comprobar el valor del token
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('clearToken');
      localStorage.removeItem('token'); // Elimina el token del localStorage
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});

export default store;
