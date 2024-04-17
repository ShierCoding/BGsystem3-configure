import { defineStore } from "pinia";
import { DefaultConfig } from "./types";
import deepmerge from "deepmerge";

export const useConfigStore = defineStore("config", {
    state: () => {
        return DefaultConfig();
    },
    actions: {
        updateConfig(config: Partial<ReturnType<typeof DefaultConfig>>) {
            this.$patch(deepmerge(this.$state, config));
        },
    }
});