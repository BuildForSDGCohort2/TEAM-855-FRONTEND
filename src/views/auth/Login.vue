<template>
  <div class="login">
    <div class="text-center">
      <h4 class="header font-weight-bold">Please sign in</h4>
      <p class="mb-3">Let's fight world hunger together</p>
      <ul v-if="errors">
        <li v-for="(error, index) in errors" :key="index" class="text-danger">
          {{ error }}
        </li>
      </ul>
      <form @submit.prevent="loginUser" class="form-signin">
        <div class="form-group">
          <label class="sr-only">Email address</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="Email address"
            autofocus
          />
        </div>
        <div class="form-group">
          <label class="sr-only">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Password"
          />
        </div>
        <button class="btn btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
      <p class="mt-3 mb-3 text-muted">
        Don't have an account yet? <a href="/register">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      errors: null
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      this.isLoading = true;
      let user = {
        email: this.email,
        password: this.password
      };
      this.login(user)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.isLoading = false;
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    }
  }
};
</script>

<style>
.login {
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
