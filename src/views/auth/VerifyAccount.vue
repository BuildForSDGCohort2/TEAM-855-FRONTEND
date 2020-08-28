<template>
  <div class="verify" v-if="secretCode && successful">
    <div class="text-center">
      <h4 class="header font-weight-bold mb-5">
        Your account was successfully verified
      </h4>
      <a href="/" class="btn btn-primary btn-block">Go to Homepage</a>
      <form @submit.prevent="verifyUser" class="form-signin">
        <input v-model="secretCode" type="text" class="form-control" hidden />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { RestURI } from "../../config/api";
export default {
  name: "verify-account",
  data() {
    return {
      isLoading: false,
      secretCode: null,
      successful: false
    };
  },
  methods: {
    verifyUser() {
      let self = this;
      axios({
        url: `${RestURI}/api/users/verify-account`,
        data: { secretCode: self.secretCode },
        method: "POST"
      }).then(res => {
        if (res.data.success) {
          this.successful = res.data.success;
        }
        console.log(res);
      });
    }
  },
  beforeMount() {
    this.secretCode = this.$route.params.secretCode;
    this.verifyUser();
  }
};
</script>

<style>
.verify {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
</style>
