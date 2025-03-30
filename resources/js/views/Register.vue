<template>
    <div class="container mt-5">
        <h2>Register</h2>
        <form @submit.prevent="register">
            <input v-model="name" class="form-control mb-2" placeholder="Name">
            <input v-model="email" class="form-control mb-2" placeholder="Email">
            <input v-model="password" type="password" class="form-control mb-2" placeholder="Password">
            <button class="btn btn-success">Register</button>
        </form>
        <p class="mt-3">
            Already have an account? <router-link to="/login">Login</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
    try {
        const { data } = await api.post('/register', { name: name.value, email: email.value, password: password.value });
        localStorage.setItem('token', data.token);
        router.push('/notes');
    } catch (error) {
        alert('Registration failed');
    }
};
</script>