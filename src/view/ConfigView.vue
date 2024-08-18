<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div style="text-align: center; margin-top: 3em; margin-bottom: 3em;">

        <h1>BGsystem3-configure</h1>
        <h2>配置工具</h2>
        <div><b>目标路径：<code>{{ infoStore.path }}</code></b></div>

    </div>

    <ol style="margin: 2em 0;" v-show="infoStore.path">
        <!-- <StyleQuestion />
        <Random /> -->
        <Schedule />
        <div style="margin: 5em;"></div>
        <ViewCode />
    </ol>

    <SpeedDial v-show="infoStore.path" />

</template>

<script setup lang="ts">
import SpeedDial from "@/components/comp/SpeedDial.vue";

import { useInfoStore } from "@/store/info";
import ViewCode from "./ViewCode.vue";
import { onMounted, watch } from "vue";

import { window, path, fs } from "@tauri-apps/api";
import { useRoute } from "vue-router";
import { useConfigStore } from "@/store/config";

import { Hex2Str } from "@/core/utils";

import StyleQuestion from "@/components/questions/Style.vue";
import Random from "@/components/questions/Random.vue";
import Schedule from "@/components/questions/Schedule.vue";

const route = useRoute();
const infoStore = useInfoStore();
const configStore = useConfigStore();

console.log(route.params.path);

watch(() => infoStore.path, async () => {
    console.log(infoStore.path);
    // await window.appWindow.maximize();
});

onMounted(async () => {
    infoStore.path = Hex2Str(route.params.path as string);

    const configPath = await path.join(infoStore.path, "default.json");
    const configExist = await fs.exists(configPath);

    console.log(configPath, configExist);
    if (configExist) {
        const configContent = await fs.readTextFile(configPath);
        configStore.updateConfig(JSON.parse(configContent));

        console.log(configStore);
    }
});
</script>