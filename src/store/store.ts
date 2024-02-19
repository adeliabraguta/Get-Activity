import {defineStore} from "pinia";

interface State {
    activity: Activity | null
    activities: Activity[]
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
}

interface HistoryState {
    isHistoryVisible: boolean
}

export interface Activity {
    activity: string
    accessibility: number
    type: string
    participants: number
    price: number
    link: string
    key: number
    error?: any
}

export const useActivitiesStore = defineStore("Activities", {
    state: (): State => {
        return {
            activity: null,
            activities: [],
            isLoading: false,
            isError: false,
            isSuccess: false
        }
    },
    actions: {
        async getActivity({participants, type, price}: { participants: string, type: string, price: string }) {
            this.isLoading = true
            this.activity = null
            const searchParams = new URLSearchParams()
            searchParams.append('participants', participants)
            type && searchParams.append('type', type)
            price && searchParams.append('price', price)
            try {
                const response = await fetch(`http://www.boredapi.com/api/activity?${searchParams.toString()}`)
                const data = await response.json()
                this.isSuccess = !data.error;
                this.activity = data
                this.isSuccess && this.activities.unshift(data)
                this.isLoading = false
                this.isError = false
            } catch (error) {
                this.isError = true
                this.isLoading = false
            }
        },
        setHistoryActivity(activity: Activity) {
            this.activity = activity
        }
    }
})

export const useHistoryStore = defineStore('History',{
    state: (): HistoryState => {
        return {
            isHistoryVisible: false
        }
    },
    actions: {
        showHistory() {
            this.isHistoryVisible = true
        },
        hideHistory() {
            this.isHistoryVisible = false
        },
    }
})