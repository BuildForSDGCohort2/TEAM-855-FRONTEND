<template>
  <div id="app">
    <TopNavigation v-if="user" />
    <div class="container-fluid">
      <div class="row">
        <SideNavigation v-if="user" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TopNavigation from "@/components/TopNavigation";
import SideNavigation from "@/components/SideNavigation";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
      businesses: null
    };
  },
  components: {
    TopNavigation,
    SideNavigation
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
    ...mapActions(["getProfile"])
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    this.isLoggedIn = this.$store.getters.isLoggedIn;
    if (this.isLoggedIn) {
      this.getProfile();
    }
  }
};
</script>
