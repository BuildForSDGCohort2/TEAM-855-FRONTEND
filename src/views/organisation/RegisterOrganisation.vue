<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 content">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h2 class="h4">Register an Organisation</h2>
    </div>
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <h6 class="header-title mb-3">
            Register an organisation and fight world hunger together
          </h6>
          <ul v-if="errors">
            <li
              v-for="(error, index) in errors"
              :key="index"
              class="text-danger"
            >
              {{ error }}
            </li>
          </ul>
          <div class="col-lg-12">
            <form class="mt-5" @submit.prevent="register">
              <div class="form-group">
                <label>What type of organisation or business are you?</label>
                <select class="form-control" v-model="organisationType">
                  <option value="nonprofit">Nonprofit</option>
                  <option value="farm">Farming</option>
                  <option value="supermarket">Supermarket</option>
                  <option value="food_manufacturer">Food Manufacturer</option>
                </select>
              </div>
              <div class="form-group">
                <label>Organisation name</label>
                <input v-model="name" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Email address</label>
                <input v-model="email" type="email" class="form-control" />
              </div>
              <div class="form-group">
                <label>Phone number</label>
                <input v-model="phoneNumber" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Location</label>
                <input v-model="address" type="text" class="form-control" />
              </div>
              <button class="btn btn-success" type="submit">Submit</button>
            </form>
          </div>
        </div>
        <!-- end card-body -->
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "RegisterOrganisation",
  data() {
    return {
      name: "",
      organisationType: null,
      email: "",
      phoneNumber: "",
      address: "",
      isLoading: false,
      errors: null
    };
  },
  methods: {
    ...mapActions(["registerOrganisation"]),
    register() {
      this.errors = [];
      let organisation = {
        name: this.name,
        organisationType: this.organisationType,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address
      };
      if (organisation.name == "") {
        this.errors.push("Organisation name is required");
      }
      if (organisation.organisationType == null) {
        this.errors.push("Organisation type is requires");
      }
      if (organisation.email == "") {
        this.errors.push("Email address is required");
      }
      if (organisation.phoneNumber == "") {
        this.errors.push("Phone number is required");
      }
      if (organisation.address == "") {
        this.errors.push("Location is required");
      }
      if (organisation) {
        this.registerOrganisation(organisation);
      }
    }
  }
};
</script>
