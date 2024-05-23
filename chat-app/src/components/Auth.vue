<template>
    <div>
        <h2>Login</h2>
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <button @click="login">Login</button>
        <button @click="register">Register</button>
    </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    setup() {
        const email = ref('');
        const password = ref('');

        const login = async () => {
            try {
                await signInWithEmailAndPassword(auth, email.value, password.value);
                alert("Logged in successfully!");
            } catch (error) {
                console.error(error);
                alert("Error logging in");
            }
        };

        const register = async () => {
            try {
                await createUserWithEmailAndPassword(auth, email.value, password.value);
                alert("Registered successfully!");
            } catch (error) {
                console.error(error);
                alert("Error registering");
            }
        };

        return { email, password, login, register };
    }
};
</script>