<template>
    <div>
        <h2>Chat Room</h2>
        <button @click="logout">Logout</button>
        <div v-for="message in messages" :key="message.id">
            <strong>{{ message.user }}:</strong> {{ message.text }}
        </div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message">
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth, db } from '../firebaseConfig';
import { signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

export default {
    setup() {
        const newMessage = ref('');
        const messages = ref([]);

        const sendMessage = async () => {
            if (newMessage.value.trim() === '') return;

            await addDoc(collection(db, 'messages'), {
                text: newMessage.value,
                user: auth.currentUser.email,
                createdAt: new Date()
            });

            newMessage.value = '';
        };

        const logout = async () => {
            try {
                await signOut(auth);
                alert("You have logged out.");
            } catch (error) {
                console.error("Error logging out: ", error);
                alert("Error logging out.");
            }
        };

        onMounted(() => {
            const q = query(collection(db, 'messages'), orderBy('createdAt'));
            onSnapshot(q, (snapshot) => {
                messages.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            });
        });

        return { newMessage, messages, sendMessage, logout };
    }
};
</script>