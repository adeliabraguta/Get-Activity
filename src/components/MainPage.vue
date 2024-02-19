<script setup lang="ts">
import {useActivitiesStore, useHistoryStore} from "../store/store";
import {computed, ref, watch, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {ActivityTypes} from "./activityTypes";

const router = useRouter()
const participants = ref<string>('')
const activity = ref<string>('')
const price = ref<string>('')

const store = useActivitiesStore()
const historyStore = useHistoryStore()


const getActivity = async () => {
    await store.getActivity({participants: participants.value, type: activity.value, price: price.value})
    if(!store.isSuccess){
        alert('No activity found for the specified parameters')
    }
    if(store.isSuccess) {
        await router.push('/activity')
        participants.value = ''
        activity.value = ''
        price.value = ''
    }}


const getMoreParticipants = computed(() => {
    return Math.random() * (2) + 3;
})

function Ada(arg1, arg2) {
    arg1.item = "bar"
    arg2 = {item: 'bar'}
}

var ob1 = {item: 'foo'}, ob2 = {item: 'foo'}
Ada(ob1, ob2)


</script>

<template>
    <div class="page_wrapper">
        <div class="container" :class="{history_active: historyStore.isHistoryVisible}">
            <img src="../assets/movie.png" alt="activity img"/>
            <h2>Find an activity</h2>
            <form v-on:submit.prevent="getActivity">
                <div class="input_container">
                    <label>Number of participants: </label>
                    <select v-model="participants">
                        <option value="" selected disabled hidden>Choose</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option :value="getMoreParticipants.toFixed()">3+</option>
                    </select>
                </div>
                <div class="input_container">
                    <label>Type of activity:</label>
                    <select v-model="activity">
                        <option value="" selected>Choose</option>
                        <option v-for="type in ActivityTypes" :value=type>{{ type }}</option>
                    </select>
                </div>
                <div class="input_container">
                    <label>Free activity? </label>
                    <div class="input_container_option">
                        <label>
                            <input v-model="price" value="0" type="radio" name="choice-radio">
                            Yes
                        </label>
                        <label>
                            <input v-model="price" value="" type="radio" name="choice-radio">
                            No
                        </label>
                    </div>
                </div>
                <button type="submit" v-if="participants === ''" disabled>Search</button>
                <button type="submit" v-else>Search</button>
            </form>
        </div>
        <div class="navigation">
            <span></span>
            <span v-on:click="historyStore.showHistory" class="navigation_text">Activities History ></span>
        </div>
<!--        <p id="foo" class="bar">Adelia</p>-->
    </div>
</template>


<style scoped>
#foo .bar {
    color: blue;
}

#foo p {
    color: yellow;
}

.bar#foo {
    color: red;
}

p#foo {
    color: green;
}

form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.input_container {
    display: flex;
    justify-content: space-between;
    gap: 22px;

    .input_container_option {
        width: 35vw;
        display: flex;
        justify-content: space-between;
    }
}
input[type='radio'] {
    accent-color: #535bf2;
}

.navigation_text {
    align-self: end;
}
</style>