<template>
    <div class="container mt-5">
        <h2>Your Notes</h2>

        <!-- Alert Messages -->
        <Alert v-if="alertMessage" :message="alertMessage" :type="alertType" @clear="alertMessage = ''" />

        <button class="btn btn-danger mb-3" @click="logout">Logout</button>

        <form @submit.prevent="addNote">
            <input v-model="title" class="form-control mb-2" placeholder="Title">
            <textarea v-model="content" class="form-control mb-2" placeholder="Content"></textarea>
            <button class="btn btn-primary">Add Note</button>
        </form>

        <ul class="list-group mt-3">
            <!-- Search Input -->
            <input v-model="searchQuery" class="form-control mb-3" placeholder="Search notes...">
            <li v-for="note in filteredNotes" :key="note.id" class="list-group-item">
                <h4>{{ note.title }}</h4>
                <p>{{ note.content }}</p>
                <router-link :to="`/notes/${note.id}`" class="btn btn-info btn-sm me-2">View</router-link>
                <router-link :to="`/notes/${note.id}/edit`" class="btn btn-warning btn-sm me-2">Edit</router-link>
                <button class="btn btn-danger btn-sm" @click="deleteNote(note.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../api';
import { useRouter } from 'vue-router';
import Alert from '../components/Alert.vue';

const notes = ref([]);
const title = ref('');
const content = ref('');
const searchQuery = ref('');
const router = useRouter();

// Alert state
const alertMessage = ref('');
const alertType = ref('success');

const showAlert = (message, type = 'success') => {
    alertMessage.value = message;
    alertType.value = type;
    setTimeout(() => (alertMessage.value = ''), 5000);
};

// Fetch notes from the API
const fetchNotes = async () => {
    try {
        const { data } = await api.get('/notes');
        notes.value = data;
    } catch (error) {
        showAlert('Failed to fetch notes', 'danger');
    }
};

// Computed property to filter notes based on search query
const filteredNotes = computed(() => {
    return notes.value.filter(note =>
        note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const addNote = async () => {
    try {
        await api.post('/notes', { title: title.value, content: content.value });
        title.value = '';
        content.value = '';
        fetchNotes();
        showAlert('Note added successfully!');
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to add note';
        showAlert(message, 'danger');
    }
};

const deleteNote = async (id) => {
    try {
        await api.delete(`/notes/${id}`);
        fetchNotes();
        showAlert('Note deleted successfully!');
    } catch (error) {
        showAlert('Failed to delete note', 'danger');
    }
};

const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
};

onMounted(fetchNotes);
</script>