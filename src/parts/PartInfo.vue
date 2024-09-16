<template>
    <div class="path-info">
        <img :src="part.imageUrl" alt="part-image">
        <h1>{{ part.title }}</h1>
        <div>{{ part.description }}</div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import parts from '@/data/parts';

const props = defineProps(['partType', 'id']);

const part = computed(() => parts[props.partType].find((_part) => _part.id === +props.id));
</script>

<style scoped lang="scss">
.path-info {
  width: auto;
  text-align: center;
}
</style>
