<template>
    <div class="path-info">
        <img :src="part.imageUrl" alt="part-image">
        <h1>{{ part.title }}</h1>
        <div>{{ part.description }}</div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import parts from '@/data/parts';

const part = computed(() => {
  const route = useRoute();
  const { partType } = route.params;
  const { id } = route.params;
  return parts[partType].find((_part) => _part.id === +id);
});
</script>

<style scoped lang="scss">
.path-info {
  width: auto;
  text-align: center;
}
</style>
