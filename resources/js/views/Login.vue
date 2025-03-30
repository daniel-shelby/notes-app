<template>
    <div class="container mt-5">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" class="form-control mb-2" placeholder="Email">
            <input v-model="password" type="password" class="form-control mb-2" placeholder="Password">
            <button class="btn btn-primary">Login</button>
        </form>
        <p class="mt-3">
            Don't have an account? <router-link to="/register">Register</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    try {
        const { data } = await api.post('/login', { email: email.value, password: password.value });
        localStorage.setItem('token', data.token);
        router.push('/notes');
    } catch (error) {
        alert('Login failed');
    }
};
</script>