import { defineStore } from "pinia";

export const useSignalStore = defineStore("signal", {
    state: () => {
        return {
            HomeViewRefresh: false,
        };
    },
});