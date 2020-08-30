<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4" v-if="user">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Dashboard</h1>
      <div class="mb-2 mb-md-0">
        <p>Dashboard</p>
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
      <div v-else class="container-fluid">
        <div class="row">
          <div class="border-0 mb-4 mt-5 px-md-5 col-md-12">
            <div
              v-if="organisations.length == 0"
              class="text-center px-5 py-5 bg-translucent-success"
            >
              <h4 class="mb-3">
                You currently don't have a registered organisation on our
                platform
              </h4>
              <a class="btn btn-primary" href="/register-organisation"
                >Register an organisation</a
              >
            </div>
            <div v-else>
              <div class="col-md-12">
                <a href="/register-organisation" class="mb-5 btn btn-success"
                  >Register an Organisation</a
                >
                <div class="row">
                  <div
                    class="col-md-4 mb-3"
                    v-for="(organisation, index) in organisations"
                    :key="index"
                  >
                    <a
                      @click="goToOrganisation(organisation._id)"
                      class="card bg-primary organisation-card"
                    >
                      <div class="card-body">
                        <div class="media">
                          <div class="media-body">
                            <h4 class="mb-0 text-white">
                              {{ organisation.name }}
                            </h4>
                            <p class="text-success" v-if="organisation.active">
                              Activated
                            </p>
                            <p class="text-danger" v-else>Not active</p>
                          </div>

                          <div
                            class="avatar-sm rounded-circle align-self-center"
                          >
                            <span class="avatar-title">
                              <img
                                src="img/icons/building.svg"
                                class="company-icon"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(["user"]),
    ...mapGetters(["organisations"])
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
    },
    ...mapActions(["getOrganisations"]),
    goToOrganisation(val) {
      let id = val;
      this.$router.push(`/dashboard/${id}`);
    }
  },
  beforeMount() {
    this.getOrganisations();
  }
};
</script>

<style scoped>
.company-icon {
  height: 60px;
  width: 60px;
}
.organisation-card {
  border-left: 6px solid #4bbf73;
}
</style>
