<template>
  <div>
    <Tutorial :message="message" />

    <b-button variant="danger" @click="getMessagingToken">Button</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  async mounted() {
    this.readFromFirestore();
    this.listenTokenRefresh();
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
    },
    getMessagingToken() {
      this.$fire.messaging
        .getToken()
        .then(async token => {
          if (token) {
            const currentMessageToken = window.localStorage.getItem(
              "messagingToken"
            );
            console.log("token will be updated", currentMessageToken != token);
            if (currentMessageToken != token) {
              await this.saveToken(token);
            }
          } else {
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            this.notificationsPermisionRequest();
          }
        })
        .catch(function(err) {
          console.log("An error occurred while retrieving token. ", err);
        });
    },
    notificationsPermisionRequest() {
      this.$fire.messaging
        .requestPermission()
        .then(() => {
          this.getMessagingToken();
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    listenTokenRefresh() {
      const currentMessageToken = window.localStorage.getItem("messagingToken");
      console.log("currentMessageToken", currentMessageToken);
      if (!!currentMessageToken) {
        this.$fire.messaging.onTokenRefresh(function() {
          this.$fire.messaging
            .getToken()
            .then(function(token) {
              this.saveToken(token);
            })
            .catch(function(err) {
              console.log("Unable to retrieve refreshed token ", err);
            });
        });
      }
    },
    saveToken(token) {
      console.log("tokens", token);
      this.$axios
        .$post(
          `https://us-central1-otra-vez-hn.cloudfunctions.net/GeneralSubscription`,
          { token }
        )
        .then(response => {
          window.localStorage.setItem("messagingToken", token);
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
