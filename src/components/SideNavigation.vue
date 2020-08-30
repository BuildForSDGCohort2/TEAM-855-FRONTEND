<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-primary sidebar collapse"
  >
    <div class="sidebar-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" href="/">
            Dashboard <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">
            Profile
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideNavigation"
};
</script>

<style></style>
