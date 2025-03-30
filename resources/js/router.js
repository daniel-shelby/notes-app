import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Notes from './views/Notes.vue';
import NoteView from './views/NoteView.vue';
import NoteEdit from './views/NoteEdit.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/notes', component: Notes, meta: { requiresAuth: true } },
    { path: '/notes/:id', component: NoteView, meta: { requiresAuth: true } },
    { path: '/notes/:id/edit', component: NoteEdit, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;