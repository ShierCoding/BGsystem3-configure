<template>
    <div :style="{ position: 'fixed', height: '100%', width: 'calc(100vw - 1em)', left: 0, top: 0 }" style="pointer-events: none;">
        <SpeedDial :model="items" direction="up" :style="{ right: '0.5em', bottom: '0.8em' }" style="pointer-events: all;" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SpeedDial from "primevue/speeddial";
import { useInfoStore } from "@/store/info";

const infoStore = useInfoStore();

const items = ref([
    {
        label: "Vue Website",
        icon: "pi pi-code",
        command: () => {
            infoStore.showCode = true;
        }
    }
]);
</script>

<style scoped></style>
