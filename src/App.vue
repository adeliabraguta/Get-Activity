<script setup lang="ts">
import ActivitiesHistory from "./components/ActivitiesHistory.vue";
import {useHistoryStore} from "./store/store";

const historyStore = useHistoryStore()

const handler = () => {
    historyStore.hideHistory();
};

</script>

<template>
    <router-view v-slot="{Component}">
        <component :is="Component" :key="$route.path" ref="history" @mousedown="handler"/>
        <Transition name="slide-fade">
            <ActivitiesHistory :isHistoryVisible="historyStore.isHistoryVisible" v-if="historyStore.isHistoryVisible"/>
        </transition>
    </router-view>
</template>

<style scoped>
.slide-fade-enter-active,.slide-fade-leave-active {
    transition: opacity 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
}
</style>
