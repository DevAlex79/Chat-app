<template>
  <div id="app">
    <Auth v-if="!user" />
    <Chat v-else />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';
import Auth from './components/Auth.vue';
import Chat from './components/Chat.vue';

export default {
  components: { Auth, Chat },
  setup() {
    const user = ref(null);

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
        if (!currentUser) {
          // Redirection ou autre action si nécessaire
          console.log('User logged out');
        }
      });
    });
    return { user };
  }
};
</script>
