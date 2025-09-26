<template>
  <div class="sort-button">
    <button @click="sortList(type, 'asc')">
      <img class="sort-button__icon" :src="imgPathAsc" alt="" />
    </button>
    <button @click="sortList(type, 'desc')">
      <img class="sort-button__icon" :src="imgPathDesc" alt="" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['type']);

const store = useStore();
const { sortList } = store;
const { sortingType, sortingParameter } = storeToRefs(store);

const imgPathAsc = computed(() => {
  return `/svg/sort-btn${sortingType.value == 'asc' && sortingParameter.value == props.type ? '-active' : ''}.svg`;
});

const imgPathDesc = computed(() => {
  return `/svg/sort-btn${sortingType.value == 'desc' && sortingParameter.value == props.type ? '-active' : ''}.svg`;
});
</script>

<style lang="scss" scoped>
.sort-button {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &__icon {
    width: 7px;
    height: 4px;

    &--active {
      filter: invert(52%) sepia(69%) saturate(355%) hue-rotate(99deg)
        brightness(100%) contrast(92%);
    }
  }

  button {
    background-color: transparent;
    outline: none;
    border: none;
    width: fit-content;
    cursor: pointer;

    &:last-child {
      transform: rotate(180deg);
    }
  }
}
</style>
