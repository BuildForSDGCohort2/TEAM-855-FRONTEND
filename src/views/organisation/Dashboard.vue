<template>
  <main
    role="main"
    class="col-md-9 ml-sm-auto col-lg-10 px-md-4"
    v-if="organisation"
  >
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">{{ organisation.name }}</h1>
      <div class="mb-2 mb-md-0">
        <p>Dashboard</p>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { RestURI } from "../../config/api";
export default {
  name: "Dashboard",
  data() {
    return {
      organisation: null
    };
  },
  beforeMount() {
    let self = this;
    let id = self.$route.params.id;
    let token = self.$store.state.auth.token;
    axios({
      url: `${RestURI}/api/organisations/organisation/${id}`,
      method: "GET",
      headers: { Authorization: token }
    }).then(res => {
      self.organisation = res.data.organisation;
    });
  }
};
</script>
