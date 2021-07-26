<template>
  <b-container>
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ alertMessage }}
    </b-alert>
    {{ alertMessage }}
    <Tutorial :message="message" />

    <b-button variant="danger" @click="getMessagingToken">Button</b-button>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      showDismissibleAlert: false,
      alertMessage: "test"
    };
  },
  async mounted() {
    const currentToken = await this.$fire.messaging.getToken();
    console.log(`currentToken`, currentToken);
    this.readFromFirestore();
    this.$fire.messaging.onMessage(payload => {
      console.info("Message received: ", payload);
    });
    this.$fire.messaging.onTokenRefresh(async () => {
      const refreshToken = await this.$fire.messaging.getToken();
      console.log("Token Refreshed", refreshToken);
    });
  },
  // async mounted() {
  //   this.readFromFirestore();
  //   this.listenTokenRefresh();
  //   const _this = this;
  //   this.$fire.messaging
  //     .requestPermission()
  //     .then(() => {
  //       console.log("Notification permission granted.");
  //       return this.$fire.messaging.getToken();
  //     })
  //     .then(token => {
  //       // You update this token for server by call api
  //       console.log("The token is: ", token);
  //     })
  //     .catch(function(err) {
  //       console.log("Unable to get permission to notify.", err);
  //     });

  //   this.$fire.messaging.onMessage(function(payload) {
  //     _this.showDismissibleAlert = true;
  //     _this.alertMessage = "Message received";
  //     console.log("Message received. ", payload);
  //     alert("hola");
  //   });
  // },
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
