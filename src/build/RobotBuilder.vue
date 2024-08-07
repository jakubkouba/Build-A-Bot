<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    <div class="top-row">
      <div class="top part">
        <div class="part-title">
          {{ selectedParts.head.title }}
          <span v-if="selectedParts.head.onSale" class="sale">Sale !!!</span>
        </div>
        <img :src="selectedParts.head.imageUrl" alt="head" />
        <button @click="selectPreviousHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedParts.leftArm.imageUrl" alt="left arm" />
        <button @click="selectPreviousLeftArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedParts.torso.imageUrl" alt="torso" />
        <button @click="selectPreviousTorso()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedParts.rightArm.imageUrl" alt="right arm" />
        <button @click="selectPreviousRightArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedParts.base.imageUrl" alt="base" />
        <button @click="selectPreviousBase()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase" class="next-selector">&#9658;</button>
      </div>
    </div>
    <h1>Cart</h1>
    <table>
      <thead>
        <th>Title</th>
        <th>Cost</th>
      </thead>
      <tbody>
        <tr v-for="(parts, index) in cart" :key="index">
          <td>{{ parts.head.title }}</td>
          <td class="cost">{{ toCurrency(parts.cost) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import parts from '../data/parts';
import { toCurrency } from '../shared/formatters';

const getNextValidIndex = (index, length) => {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
};

const getPreviousValidIndex = (index, length) => {
  const decrementedIndex = index - 1;
  return decrementedIndex < 0 ? length - 1 : decrementedIndex;
};

const availableParts = parts;
let headIndex = 0;
let torsoIndex = 0;
let baseIndex = 0;
let leftArmIndex = 0;
let rightArmIndex = 0;
const cart = [];

const selectedParts = computed(() => ({
  head: availableParts.heads[headIndex],
  torso: availableParts.torsos[torsoIndex],
  base: availableParts.bases[baseIndex],
  leftArm: availableParts.arms[leftArmIndex],
  rightArm: availableParts.arms[rightArmIndex],
}));

const addToCart = () => {
  const cost = selectedParts.value.head.cost +
    selectedParts.value.leftArm.cost +
    selectedParts.value.torso.cost +
    selectedParts.value.rightArm.cost +
    selectedParts.value.base.cost;
  cart.push({ ...selectedParts, cost });
  console.log(cart.length);
};

// #region Part Selection Methods
const selectNextHead = () => {
  headIndex = getNextValidIndex(headIndex, availableParts.heads.length);
};
const selectPreviousHead = () => {
  headIndex = getPreviousValidIndex(headIndex, availableParts.heads.length);
};
const selectPreviousTorso = () => {
  torsoIndex = getPreviousValidIndex(torsoIndex, availableParts.torsos.length);
};
const selectNextTorso = () => {
  torsoIndex = getNextValidIndex(torsoIndex, availableParts.torsos.length);
};
const selectPreviousBase = () => {
  baseIndex = getPreviousValidIndex(baseIndex, availableParts.bases.length);
};
const selectNextBase = () => {
  baseIndex = getNextValidIndex(baseIndex, availableParts.bases.length);
};
const selectPreviousLeftArm = () => {
  leftArmIndex = getPreviousValidIndex(leftArmIndex, availableParts.arms.length);
};
const selectNextLeftArm = () => {
  leftArmIndex = getNextValidIndex(leftArmIndex, availableParts.arms.length);
};
const selectPreviousRightArm = () => {
  rightArmIndex = getPreviousValidIndex(
    rightArmIndex,
    availableParts.arms.length,
  );
};
const selectNextRightArm = () => {
  rightArmIndex = getNextValidIndex(rightArmIndex, availableParts.arms.length);
};
// #region Part Selection Methods
</script>

<style>
.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid #aaa;
}

.part img {
  width: 200px;
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

.add-to-cart {
  position: absolute;
  right: 30px;
  width: 220px;
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
