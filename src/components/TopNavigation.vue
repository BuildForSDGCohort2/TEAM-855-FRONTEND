<template>
  <nav
    class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow"
  >
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">Kulusha</a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="/login" @click="logout">Sign out</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "TopNavigation",
  methods: {
    logout() {
      this.$parent.logoutUser();
    }
  }
};
</script>

<style></style>
