<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div style="text-align: center; margin-top: 4em; margin-bottom: 3em;">
        <div style="height: calc(50vh - 10em);"></div>

        <h1>BGsystem3-configure</h1>
        <h2>配置工具</h2>

        <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <SelectConfigFolder @update="open(`/#/config/${Str2Hex(infoStore.path)}`, `配置 ${infoStore.path}`, true)" />
            <Button label="关于我们" @click="open('/#/about', '关于我们')" />
        </div>

    </div>

</template>

<script setup lang="ts">
import SelectConfigFolder from "@/components/questions/SelectConfigFolder.vue";

import { useInfoStore } from "@/store/info";
import { open } from "@/core/utils";
import { Str2Hex } from "@/core/utils";

const infoStore = useInfoStore();
</script>