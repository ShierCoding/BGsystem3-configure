import { defineStore } from "pinia";
import { DefaultConfig } from "./types";
import deepmerge from "deepmerge";

export const useConfigStore = defineStore("config", {
    state: () => {
        return DefaultConfig();
    },
    actions: {
        update(config: Partial<ReturnType<typeof DefaultConfig>>) {
            this.$patch(deepmerge(this.$state, config));
        },
        updateConfig(config: Partial<ReturnType<typeof DefaultConfig>>) {
            this.update(config);
        },
    }
});