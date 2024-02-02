<script setup>
  import Navbarr from "./components/Navbarr.vue";
   components: { Navbarr }
  </script>

<template>
  <div id="app">
    <header>
      <navbarr />
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>