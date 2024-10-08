<template>
  <div class="content" v-if="partsStore.parts">
    <div class="preview">
      <ColaplsibleSection>
        <template v-slot:collapse>&#x25B2; Hide</template>
        <template v-slot:expand>&#x25BC; Show</template>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedParts.head.imageUrl" alt="robot-head"/>
          </div>
          <div class="middle-row">
            <img :src="selectedParts.leftArm.imageUrl" class="rotate-left" alt="robot-left-arm"/>
            <img :src="selectedParts.torso.imageUrl" alt="robot-torso"/>
            <img :src="selectedParts.rightArm.imageUrl" class="rotate-right" alt="robot-right-arm"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedParts.base.imageUrl" alt="robot-base"/>
          </div>
        </div>
      </ColaplsibleSection>
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
    <div class="top-row">
      <div class="part-title">
        {{ selectedParts.head.title }}
        <span v-if="selectedParts.head.onSale" class="sale">Sale !!!</span>
      </div>
      <PartSelector :parts="partsStore.parts.heads"
        position="top"
        @partSelected="part => selectedParts.head = part"
      />
    </div>
    <div class="middle-row">
      <PartSelector :parts="partsStore.parts.arms"
        position="left"
        @partSelected="part => selectedParts.leftArm = part"
      />
      <PartSelector :parts="partsStore.parts.torsos"
        position="center"
        @partSelected="part => selectedParts.torso = part"
      />
      <PartSelector :parts="partsStore.parts.arms"
        position="right"
        @partSelected="part => selectedParts.rightArm = part"
      />
    </div>
    <div class="bottom-row">
      <PartSelector :parts="partsStore.parts.bases"
        position="bottom"
        @partSelected="part => selectedParts.base = part"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useCartStore from '@/stores/cartStore';
import usePartsStore from '@/stores/partsStore';
import PartSelector from './PartSelector.vue';
import ColaplsibleSection from '../shared/ColaplsibleSection.vue';

onMounted(() => console.log('onMounted: executed'));

const cartStore = useCartStore();
const partsStore = usePartsStore();

partsStore.getParts();

const selectedParts = ref({
  head: {},
  torso: {},
  base: {},
  leftArm: {},
  rightArm: {},
});

// const headBorderColor = computed(() => (selectedParts.value.head.onSale ? 'red' : 'gray'));

const addToCart = () => {
  const cost = selectedParts.value.head.cost +
    selectedParts.value.leftArm.cost +
    selectedParts.value.torso.cost +
    selectedParts.value.rightArm.cost +
    selectedParts.value.base.cost;
  cartStore.cart.push({ ...selectedParts.value, cost });
};
</script>

<style scoped lang="scss">
.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid gray;
}

.top.part {
  border: 3px solid gray;
}

.sale-border {
  border: 3px solid red;
}

.part {
  img {
    width: 200px;
  }
}

.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.top {
  border-bottom: none;
}

.left {
  border-right: none;
}

.right {
  border-left: none;
}

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg);
}

.bottom {
  border-top: none;
}

.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 206px;
}

.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 206px;
}

.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.part-title {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}

.sale {
  color: red;
}

.right .next-selector {
  right: -3px;
}

.content {
  position: relative;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 310px;
  height: 310px;
  padding: 5px;
}

.preview-content {
  border: 1px solid #999;
}

.preview img {
  width: 70px;
  height: 70px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}

.add-to-cart {
  position: absolute;
  width: 310px;
  padding: 3px;
  font-size: 16px;
}

td,
th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}

.cost {
  text-align: right;
}
</style>
