<template>
  <div>
    <div class="top-row">
      <div class="top part">
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
        <button @click="selectNextTorso()" class="prev-selector">&#9668;</button>
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
  </div>
</template>

<script>
import parts from '../data/parts';

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

function getPreviousValidIndex(index, length) {
  const decrementedIndex = index - 1;
  return decrementedIndex < 0 ? length - 1 : decrementedIndex;
}

export default {
  name: 'RobotBuilder',
  data() {
    return {
      availableParts: parts,
      headIndex: 0,
      torsoIndex: 0,
      baseIndex: 0,
      leftArmIndex: 0,
      rightArmIndex: 0,
    };
  },
  computed: {
    selectedParts() {
      return {
        head: this.availableParts.heads[this.headIndex],
        torso: this.availableParts.torsos[this.torsoIndex],
        base: this.availableParts.bases[this.baseIndex],
        leftArm: this.availableParts.arms[this.leftArmIndex],
        rightArm: this.availableParts.arms[this.rightArmIndex],
      };
    },
  },
  methods: {
    selectNextHead() {
      this.headIndex = getNextValidIndex(this.headIndex, this.availableParts.heads.length);
    },
    selectPreviousHead() {
      this.headIndex = getPreviousValidIndex(this.headIndex, this.availableParts.heads.length);
    },
    selectPreviousTorso() {
      this.torsoIndex = getPreviousValidIndex(this.torsoIndex, this.availableParts.torsos.length);
    },
    selectNextTorso() {
      this.torsoIndex = getNextValidIndex(this.torsoIndex, this.availableParts.torsos.length);
    },
    selectPreviousBase() {
      this.baseIndex = getPreviousValidIndex(this.baseIndex, this.availableParts.bases.length);
    },
    selectNextBase() {
      this.baseIndex = getNextValidIndex(this.baseIndex, this.availableParts.bases.length);
    },
    selectPreviousLeftArm() {
      this.leftArmIndex = getPreviousValidIndex(this.leftArmIndex, this.availableParts.arms.length);
    },
    selectNextLeftArm() {
      this.leftArmIndex = getNextValidIndex(this.leftArmIndex, this.availableParts.arms.length);
    },
    selectPreviousRightArm() {
      this.rightArmIndex = getPreviousValidIndex(
        this.rightArmIndex,
        this.availableParts.arms.length,
      );
    },
    selectNextRightArm() {
      this.rightArmIndex = getNextValidIndex(this.rightArmIndex, this.availableParts.arms.length);
    },
  },
};
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

.right .next-selector {
  right: -3px;
}
</style>
