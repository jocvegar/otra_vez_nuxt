<template>
  <b-jumbotron>
    <b-list-group>
      <b-list-group-item v-for="(mountain, idx) in mountains" :key="idx">
        {{ mountain.title }}
      </b-list-group-item>
    </b-list-group>
  </b-jumbotron>
</template>

<script>
export default {
  props: ["mountains"]
};
</script>
