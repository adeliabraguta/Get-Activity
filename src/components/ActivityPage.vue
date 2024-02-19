<script setup lang="ts">
import {computed} from "vue";
import {useActivitiesStore, useHistoryStore} from "../store/store";
import Loader from "./Loader.vue";
import Range from "./Range.vue";

const store = useActivitiesStore()
const historyStore = useHistoryStore()

const activity = computed(() => {
    return store.activity
})

const range: number = 10
const filledAccessibilityRange = computed(() => {
    const filledRange = range - activity.value?.accessibility * range;
    return Array.from({length: filledRange}, (_, index) => index);
})

const unfilledAccessibilityRange = computed(() => {
    const unfilledRange = range - filledAccessibilityRange.value.length;
    return Array.from({length: unfilledRange}, (_, index) => index);
})

</script>

<template>
    <div class="page_wrapper">
        <div class="container" :class="{history_active: historyStore.isHistoryVisible}">
            <div v-if="store.isLoading" class="activity_details">
                <Loader/>
            </div>
            <div v-else-if="store.isError">
                Failed to get data
            </div>
            <div v-else>
                <div v-if="activity === null">No activity found for your search</div>
                <div v-else class="activity_details">
                    <div v-if="activity?.participants == 1">
                        <img src="../assets/1%20participant.png" alt="1 participant">
                    </div>
                    <div v-else-if="activity?.participants == 2">
                        <img src="../assets/2%20participants.png" alt="2 perticipants">
                    </div>
                    <div v-else>
                        <img src="../assets/3%20participants.png" alt="3 participants">
                    </div>
                    <h2>{{ activity?.activity }}</h2>
                    <div class="activity_detail"><span>Number of participants: </span>
                        <p>{{ activity?.participants }}</p>
                    </div>
                    <div class="activity_detail"><span>Type of activity: </span>
                        <p>{{ activity?.type }}</p>
                    </div>
                    <div class="activity_detail">
                        <span>Accessibility: </span>
                        <Range :filled="filledAccessibilityRange"
                               :unfilled="unfilledAccessibilityRange"/>
                    </div>
                    <div v-if="activity?.link" class="activity_detail"><span>Link: </span>
                        <a :href=activity?.link>{{ activity?.link }}</a>
                    </div>
                    <div class="activity_detail" v-if="activity?.price != '0'">
                        <span>Price: </span>
                        <p>~ {{ activity?.price * 10 }} $</p>
                    </div>
                    <div class="activity_detail" v-else><span>Price: </span>
                        <p>Free</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="navigation navigation_activity_page">
            <RouterLink to="/">< Back to Main Page</RouterLink>
            <span v-on:click="historyStore.showHistory" class="navigation_text">Activities History ></span>
        </div>
    </div>
</template>

<style scoped>
.activity_details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    place-items: center;
    @media screen and (max-width: 480px) {
        width: 80vw;
    }
}

.activity_detail {
    width: inherit;
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    word-break: break-all;
}

p {
    color: #646cff;
    font-weight: 500;
}

.navigation_activity_page {
    display: flex;
    justify-content: space-between;
}


</style>