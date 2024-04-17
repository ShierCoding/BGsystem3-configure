<template>
    <div class="author">
        <a :href="props.link">
            <span style="margin-right: 2px;">{{ props.name }}</span>
            <!-- <span class="pi pi-external-link author-icon"></span> -->
        </a>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string;
    link: string;
}>();
</script>

<style scoped>
.author {
    display: inline-flex;
    cursor: pointer;
    align-items: center;
}

.author > a {
    text-decoration: none;
    color: var(--primary-color);
}

.author > a:hover {
    text-decoration: underline;
}

.author-icon {
    font-size: 0.7rem;
}
</style>