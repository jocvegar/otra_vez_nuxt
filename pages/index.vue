<template>
  <div>
    <Tutorial :message="message" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  mounted() {
    this.readFromFirestore();
  },
  methods: {
    async readFromFirestore() {
      const testRef = this.$fire.firestore
        .collection("test")
        .doc("GtDccyodR6KKKEcLBdna");
      try {
        const messageDoc = await testRef.get();
        this.message = messageDoc.data().sample;
      } catch (e) {
        this.message = "";
        alert(e);
        return;
      }
    }
  }
};
</script>
