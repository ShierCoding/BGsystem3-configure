import { defineStore } from "pinia";

export const useSignalStore = defineStore("signal", {
    state: () => {
        return {
            HomeViewRefresh: false,
            reloadSignal: 0,
        };
    },
    actions: {
        updateSignal() {
            this.reloadSignal = (this.reloadSignal + 1) % 100;
        },
    }
});