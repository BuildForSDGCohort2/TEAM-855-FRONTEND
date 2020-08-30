import axios from "axios";
import { RestURI } from "../../config/api";
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
  organisations: [],
  errors: [],
  state: ""
};

const mutations = {
  request_organisations(state) {
    state.error = null;
    state.status = "loading";
  },
  user_organisations(state, organisations) {
    state.organisations = organisations;
    state.status = "success";
    state.error = null;
  }
};

const actions = {
  // get organisations action
  async getOrganisations({ commit }) {
    commit("request_organisations");
    let token = state.token;
    await axios({
      url: `${RestURI}/api/organisations/my-organisations`,
      headers: { Authorization: token }
    }).then(res => {
      let organisations = res.data.organisations;
      commit("user_organisations", organisations);
    });
  },
  async registerOrganisation({ commit }, organisation) {
    commit("request_organisations");
    let token = state.token;
    await axios({
      url: `${RestURI}/api/organisations/register`,
      data: organisation,
      method: "POST",
      headers: { Authorization: token }
    })
      .then(res => {
        // success toast notification
        Toast.fire({
          icon: "success",
          title: "Organisation was successfully registered"
        });
        let organisation = res.data.organisation;
        state.organisations.push(organisation);
        router.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const getters = {
  organisations: state => state.organisations,
  errors: state => state.error
};

export default {
  state,
  mutations,
  actions,
  getters
};
