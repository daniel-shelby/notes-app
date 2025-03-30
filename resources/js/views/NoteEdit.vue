<template>
    <div class="container mt-5">
        <h2>Edit Note</h2>

        <!-- Alert Component -->
        <Alert v-if="alertMessage" :message="alertMessage" :type="alertType" @clear="alertMessage = ''" />
        <form @submit.prevent="updateNote">
            <input v-model="title" class="form-control mb-2" placeholder="Title">
            <textarea v-model="content" class="form-control mb-2" placeholder="Content"></textarea>
            <div class="d-grid gap-3 column-gap-2" style="grid-template-columns: repeat(auto-fit, minmax(0, 100px));">
                <button class="btn btn-success btn-sm">Update</button>
                <router-link to="/notes" class="btn btn-secondary btn-sm">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../api';
import Alert from '../components/Alert.vue';

const route = useRoute();
const router = useRouter();
const title = ref('');
const content = ref('');

// Alert state
const alertMessage = ref('');
const alertType = ref('success');

const showAlert = (message, type = 'success') => {
    alertMessage.value = message;
    alertType.value = type;
    setTimeout(() => (alertMessage.value = ''), 5000);
};

const fetchNote = async () => {
    try {
        const { data } = await api.get(`/notes/${route.params.id}`);
        title.value = data.title;
        content.value = data.content;
    } catch (error) {
        showAlert('Failed to load note', 'danger');
    }
};

const updateNote = async () => {
    try {
        await api.put(`/notes/${route.params.id}`, { title: title.value, content: content.value });
        showAlert('Note updated successfully!');
        router.push('/notes');
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update note';
        showAlert(message, 'danger');
    }
};

onMounted(fetchNote);
</script>