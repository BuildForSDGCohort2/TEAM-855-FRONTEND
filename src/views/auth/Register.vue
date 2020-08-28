<template>
  <div class="register">
    <div>
      <div class="text-center">
        <h4 class="mb-3 header font-weight-bold">Please sign up</h4>
        <p>Let's fight world hunger together</p>
      </div>
      <ul v-if="errors">
        <li
          v-for="(error, index) in errors"
          :key="index"
          class="text-danger small"
        >
          {{ error }}
        </li>
      </ul>
      <form @submit.prevent="registerUser" class="form-signup">
        <div class="row">
          <div class="col-md-6 form-group">
            <label>First name</label>
            <input
              v-model="firstName"
              type="text"
              class="form-control"
              placeholder="Enter your first name"
            />
          </div>
          <div class="col-md-6 form-group">
            <label>Last name</label>
            <input
              v-model="lastName"
              type="text"
              class="form-control"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 form-group">
            <label>Phone number</label>
            <input
              v-model="phoneNumber"
              type="text"
              class="form-control"
              placeholder="Enter your contact number"
            />
          </div>
          <div class="col-md-6 form-group">
            <label>Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 form-group">
            <label>Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter your password"
            />
          </div>
          <div class="col-md-6 form-group">
            <label>Confirm password</label>
            <input
              v-model="confirmPassword"
              type="password"
              class="form-control"
              placeholder="Re-type your password"
            />
          </div>
        </div>
        <div class="form-group">
          <label>Address</label>
          <input
            v-model="address"
            type="text"
            class="form-control"
            placeholder="Enter your home or work address"
          />
        </div>
        <button class="btn btn-primary btn-block mt-4" type="submit">
          <span
            v-if="isLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Sign up
        </button>
      </form>
      <p class="mt-3 mb-3 text-muted text-center">
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      errors: [],
      isLoading: false
    };
  },
  methods: {
    ...mapActions(["register"]),
    registerUser() {
      this.isLoading = true;
      this.errors = [];
      let user = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        address: this.address
      };
      if (user.firstName == "") {
        this.errors.push("First name is required");
        this.isLoading = false;
      }
      if (user.lastName == "") {
        this.errors.push("Last name is required");
        this.isLoading = false;
      }
      if (user.phoneNumber == "") {
        this.errors.push("Phone number is required");
        this.isLoading = false;
      }
      if (user.email == "") {
        this.errors.push("Email address is required");
        this.isLoading = false;
      }
      if (user.password == "") {
        this.errors.push("Password is required");
        this.isLoading = false;
      }
      if (user.confirmPassword != user.password) {
        this.errors.push("Password and confirm password don't match");
        this.isLoading = false;
      }
      if (!this.errors) {
        this.register(user).then(res => {
          console.log(res);
        });
      }
    }
  }
};
</script>

<style>
.register {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
}
</style>
