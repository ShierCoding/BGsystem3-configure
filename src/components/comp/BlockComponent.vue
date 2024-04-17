<template>
    <div class="block">
        <li class="title">{{ props.title }}</li>
        <div><slot></slot></div>
    </div>
</template>


<script setup lang="ts">
const props = defineProps<{
    title: string
}>();
</script>

<style scoped>
.title {
    font-size: 1.3em;
    margin-bottom: 0.5em;
    font-weight: bold;
}

.block {
    margin: 30px 0;
}
</style>