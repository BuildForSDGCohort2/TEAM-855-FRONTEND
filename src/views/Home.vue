<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4" v-if="user">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Dashboard</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Share
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Export
          </button>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
        >
          <span data-feather="calendar"></span>
          This week
        </button>
      </div>
    </div>
    <div>
      <div
        class="alert alert-danger border-0 mb-4 mt-5 px-md-5"
        v-if="!user.isVerified"
      >
        <div class="position-relative">
          <div class="row align-items-center justify-content-between">
            <div class="col position-relative">
              <h2 class="text-white">
                Hi, {{ user.firstName }} {{ user.lastName }} 👋
              </h2>
              <p class="">
                Seems like your account is not verified. Please check your email
                to verify your account. If you didn't receive an email from us,
                click the button below
              </p>
              <button @click="confirmEmail" class="btn btn-primary" href="/">
                Resend Verification Email<i
                  class="ml-1"
                  data-feather="arrow-right"
                ></i>
              </button>
            </div>
            <div class="col d-none d-md-block text-right pt-3">
              <img
                class="img-fluid"
                src="img/heros/confirm_email.svg"
                style="max-width: 25rem;"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
  </main>
</template>

<script>
/**
 * sweet alert2
 */
import Swal from "sweetalert2";
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

import axios from "axios";
import { RestURI } from "../config/api";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    confirmEmail() {
      let token = this.$store.state.auth.token;
      axios({
        url: `${RestURI}/api/users/resend-confirmation-email`,
        method: "GET",
        headers: { Authorization: token }
      }).then(res => {
        Toast.fire({
          icon: "success",
          title: res.data.msg
        });
      });
    }
  }
};
</script>
