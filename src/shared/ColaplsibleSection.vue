<template>
  <div>
    <div class="header">
      <span v-if="open" @click="open = !open">
        <slot name="collapse">&#x25B2; Collapse</slot>
      </span>
      <span v-if="!open" @click="open = !open">
        <slot name="expand">&#x25BC; Expand</slot>
      </span>
    </div>
    <slot v-if="open">
      <p>Something default</p>
    </slot>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>

<style>
.header {
    background-color: #bbb;
    padding: 3px;
    cursor: pointer;
    font-size: 22px;
}
</style>
