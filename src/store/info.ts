import { defineStore } from "pinia";

export const useInfoStore = defineStore("info", {
    state: () => {
        return {

            /** 目标文件夹 */
            path: "",

            /** 显示配置文件源代码 */
            showCode: false,
        };
    },
});