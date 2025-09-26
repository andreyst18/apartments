<template>
  <div class="apartments-filter">
    <ul class="apartments-filter__rooms">
      <li v-for="(item, index) in roomsFilter" :key="index">
        <button :class="[
          'apartments-filter__rooms-btn',
          { 'apartments-filter__rooms-btn--active': item.isActive },
        ]" @click="toggleRoomsFilter(index)">
          {{ item.title }}
        </button>
      </li>
    </ul>

    <div class="apartments-filter__filter">
      <div class="apartments-filter__filter-title">Стоимость квартиры, ₽</div>
      <div class="apartments-filter__range">
        <div class="apartments-filter__range-item">
          <span class="text-secondary">от</span><span>{{ ` ${price[0].toLocaleString('ru-RU')}` }}</span>
        </div>
        <div class="apartments-filter__range-item">
          <span class="text-secondary">до</span><span>{{ ` ${price[1].toLocaleString('ru-RU')}` }}</span>
        </div>
      </div>
      <div>
        <USlider v-model="price" :min="priceFilterRange[0]" :max="priceFilterRange[1]" :ui="customUi" />
      </div>
    </div>

    <div class="apartments-filter__filter">
      <div class="apartments-filter__filter-title">Площадь, м²</div>
      <div class="apartments-filter__range">
        <div class="apartments-filter__range-item">
          <span class="text-secondary">от</span><span>{{ ` ${size[0]}` }}</span>
        </div>
        <div class="apartments-filter__range-item">
          <span class="text-secondary">до</span><span>{{ ` ${size[1]}` }}</span>
        </div>
      </div>
      <div>
        <USlider v-model="size" :min="sizeFilterRange[0]" :max="sizeFilterRange[1]" :ui="customUi" />
      </div>
    </div>

    <button class="apartments-filter__reset-btn" @click="resetFilters">
      <span>Сбросить параметры</span>
      <img src="/public/svg/cross.svg" alt="">
    </button>
  </div>
</template>

<script setup>
const store = useStore();

const { priceFilterRange, sizeFilterRange, filterByRooms, filterByPrice, filterBySize, resetFilters } =
  store;

const roomsFilter = ref([
  { title: '1к', isActive: false, rooms: '1' },
  { title: '2к', isActive: false, rooms: '2' },
  { title: '3к', isActive: false, rooms: '3' },
  { title: '4к', isActive: false, rooms: '4' },
]);

const toggleRoomsFilter = (index) => {
  roomsFilter.value.forEach((elem, i) => (elem.isActive = i == index));
  filterByRooms(roomsFilter.value.filter((el) => el.isActive)[0].rooms);
};

const price = ref([0, 0]);
const size = ref([0, 0]);

watch(priceFilterRange, () => {
  if (priceFilterRange.length == 2) {
    price.value = [...priceFilterRange];
  }
});

watch(sizeFilterRange, () => {
  if (sizeFilterRange.length == 2) {
    size.value = [...sizeFilterRange];
  }
});

watch(price, () => {
  filterByPrice(price.value[0], price.value[1]);
});

watch(size, () => {
  filterBySize(size.value[0], size.value[1]);
});

const customUi = {
  track: 'h-[3px] bg-[rgba(11,23,57,0.1)]',
  range: 'bg-[#3EB57C]',
  thumb: 'w-[14px] h-[14px] bg-[#3EB57C] ring-0 outline-none',

}
</script>

<style lang="scss" scoped>
.apartments-filter {
  background-image: linear-gradient(rgba(174, 228, 178, 0.5),
      rgba(149, 208, 161, 0.5));
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__rooms {
    display: flex;
    gap: 16px;
  }

  &__rooms-btn {
    border-radius: 50%;
    width: 44px;
    height: 44px;
    background-color: #fff;
    border-color: transparent;
    outline: none;
    cursor: pointer;

    &--active {
      background-color: #3eb57c;
      color: #fff;
      box-shadow: 0px 6px 20px 0px rgba(149, 208, 161, 1);
    }
  }

  &__filter-title {
    margin-bottom: 8px;
    font-size: 14px;
  }

  &__range {
    display: flex;
    margin-bottom: 6px;
  }

  &__range-item {
    flex: 1;

    &>span:nth-child(2) {
      font-family: 'PTRootUIWebMedium';
    }
  }

  &__reset-btn {
    display: flex;
    gap: 8px;
    padding-left: 16px;

  }

}
</style>
