
<template>
    <div class="card flex flex-wrap gap-3 p-fluid">
        <div class="flex-auto">
            <label for="calendar-24h" class="font-bold block mb-2" v-if="props.label">时间与日期</label>
            <Calendar inputId="calendar-24h" v-model="time" showTime hourFormat="24" inline />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    label?: string
}>();

const initTime = () => {
    const time = new Date();

    time.setHours(8);
    time.setMinutes(0);
    time.setSeconds(0);

    return time;
};

const time = ref(initTime());

watch(time, () => {
    console.log(time.value);
});

defineExpose({
    time
});
</script>
