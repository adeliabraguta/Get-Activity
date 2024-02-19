<script setup lang="ts">
import {Activity, useActivitiesStore, useHistoryStore} from "../store/store";
import {computed} from "vue";

defineProps({
    isHistoryVisible: {
        type: Boolean,
        required: true
    }
})

const store = useActivitiesStore()
const historyStore = useHistoryStore()

const activities = computed(() => {
    return store.activities
})

const handleClick = (activity: Activity) => {
    store.setHistoryActivity(activity)
    historyStore.hideHistory()
}

</script>

<template>
    <div class="history_container">
        <div class="history">
            <div v-if="activities.length === 0">No activities yet</div>
            <div v-for="activity in activities">
                <div>
                    <p><span>Participants: </span>{{ activity?.participants }}</p>
                    <RouterLink to="/activity" v-on:click="handleClick(activity)">{{activity?.activity}}
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="navigation">
            <span class="navigation_text" v-on:click="historyStore.hideHistory">< Close</span>
        </div>
    </div>
</template>

<style scoped>
.history_container {
    z-index: 1;
    top: 0;
    right: 0;
    position: absolute;
    height: 100vh;
    width: 30vw;
    background-color: #f0f0ff;
    display: flex;
    flex-direction: column;
    justify-content: end;
    @media screen and (max-width: 480px) {
        width: 80vw;
    }
}

.history {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}


</style>