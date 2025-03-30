<template>
    <div v-if="message" :class="`alert alert-${type} alert-dismissible fade show`" role="alert">
        {{ message }}
        <button type="button" class="btn-close" @click="clear"></button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    message: String,
    type: { type: String, default: 'success' } // 'success' or 'danger'
});

const emit = defineEmits(['clear']);

const clear = () => {
    emit('clear');
};
</script>