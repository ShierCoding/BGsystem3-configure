<template>
    <Dialog v-model:visible="infoStore.showCode" maximizable modal header="配置源代码" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <VMonaco v-model="code" class="code" language="json" height="calc(100vh - 15em)"></VMonaco>
        <div style="margin-top: 1em;"></div>
        <div style="float: right; display: flex; gap: 10px;">
            <Button @click="infoStore.showCode = false">关闭</Button>
            <!-- <Button @click="updateConfig(); infoStore.showCode = false">更新配置</Button> -->
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import VMonaco from "@/components/monaco/VMonaco.vue";
import { useConfigStore } from "@/store/config";
import { useInfoStore } from "@/store/info";
import { useSignalStore } from "@/store/signal";
import { ref } from "vue";

const infoStore = useInfoStore();
const config = useConfigStore();
const signalStore = useSignalStore();

const code = ref("");

config.$subscribe(() => {
    code.value = JSON.stringify(config.$state, null, 4);
});

const updateConfig = () => {
    try {
        const value = JSON.parse(code.value);
        config.updateConfig(value);
        infoStore.showCode = false;
    } catch (error) {
        console.error(error);
    }

    signalStore.updateSignal();
};

</script>

<style scoped>
</style>