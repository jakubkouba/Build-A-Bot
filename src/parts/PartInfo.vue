<template>
    <div class="path-info">
        <img :src="part.imageUrl" alt="part-image">
        <h1>{{ part.title }}</h1>
        <div>{{ part.description }}</div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import usePartsStore from '@/stores/partsStore';

const props = defineProps(['partType', 'id']);
const partsStore = usePartsStore();

partsStore.getParts();

const part = computed(() => {
  const typeList = partsStore.parts[props.partType];
  return typeList.find((_part) => _part.id === +props.id);
});
</script>

<style scoped lang="scss">
.path-info {
  width: auto;
  text-align: center;
}
</style>
