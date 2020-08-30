import { RestURI } from "../../config/api";
import axios from "axios";
import Swal from "sweetalert2";
import router from "../../router";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

const state = {
  token: localStorage.getItem("token") || "",
  user: null,
  state: "",
  error: []
};

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = "success";
    state.error = null;
  },
  auth_error(state, error) {
    state.error = error;
  },
  profile_request(state) {
    state.status = "loading";
  },
  user_profile(state, user) {
    state.user = user;
  },
  logout(state) {
    state.error = null;
    state.status = "";
    state.token = "";
    state.user = null;
  }
};

const actions = {
  // login action
  async login({ commit }, user) {
    axios
      .post(`${RestURI}/api/users/login`, user)
      .then(res => {
        if (res.data.success) {
          // success toast notification
          Toast.fire({
            icon: "success",
            title: res.data.msg
          });
          const token = res.data.token;
          const user = res.data.user;
          // Store the token into the localstorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          // Set the axios defaults
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", user);
          commit("auth_success", token);
          router.push("/");
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          error = error.response.data.msg;
          // success toast notification
          Toast.fire({
            icon: "success",
            title: error
          });
          commit("auth_error", error);
        }
      });
  },
  // register action
  async register({ commit }, user) {
    commit("auth_request");
    await axios
      .post(`${RestURI}/api/users/register`, user)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  },
  // Get the user Profile action
  async getProfile({ commit }) {
    commit("profile_request");
    let token = state.token;
    axios({
      url: `${RestURI}/api/users/profile`,
      headers: { Authorization: token },
      method: "GET"
    })
      .then(res => {
        let user = res.data.user;
        commit("user_profile", user);
      })
      .catch(error => {
        console.log(error);
      });
  },
  // Logout
  async logout({ commit }) {
    await localStorage.removeItem("token");
    await localStorage.removeItem("user");
    commit("logout");
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
    return;
  }
};

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user,
  error: state => state.error
};

export default {
  state,
  actions,
  mutations,
  getters
};
