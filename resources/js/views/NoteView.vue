<template>
    <div class="container mt-5">
        <h2>Note Details</h2>
        <div v-if="note">
            <h4>{{ note.title }}</h4>
            <p>{{ note.content }}</p>
        </div>
        <router-link to="/notes" class="btn btn-secondary mt-3">Back to Notes</router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';

const route = useRoute();
const note = ref(null);

const fetchNote = async () => {
    const { data } = await api.get(`/notes/${route.params.id}`);
    note.value = data;
};

onMounted(fetchNote);
</script>