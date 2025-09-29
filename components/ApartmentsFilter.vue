<template>
  <div class="apartments-filter">
    <ul class="apartments-filter__rooms">
      <li v-for="(item, index) in roomsFilter" :key="index">
        <button :class="[
          'apartments-filter__rooms-btn',
          { 'apartments-filter__rooms-btn--active': item.isActive },
          { 'apartments-filter__rooms-btn--disabled': item.disabled },
        ]" @click="toggleRoomsFilter(index)" :disabled="item.disabled">
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

    <button class="apartments-filter__reset-btn" @click="resetParams">
      <span>Сбросить параметры</span>
      <img src="/public/svg/cross.svg" alt="">
    </button>
  </div>
</template>

<script setup>

const store = useStore();

const { priceFilterRange, sizeFilterRange, filterByRooms, filterByPrice, filterBySize, resetFilters, filterList, fetchApartments } =
  store;

const { activeFilter } = storeToRefs(store);


const roomsFilter = ref([
  { title: '1к', isActive: false, rooms: '1', disabled: false },
  { title: '2к', isActive: false, rooms: '2', disabled: false },
  { title: '3к', isActive: false, rooms: '3', disabled: false },
  { title: '4к', isActive: false, rooms: '4', disabled: true },
]);

const toggleRoomsFilter = (index) => {
  roomsFilter.value.forEach((elem, i) => (elem.isActive = i == index));
  filterByRooms(roomsFilter.value.filter((el) => el.isActive)[0].rooms);
};

const price = ref([0, 0]);
const size = ref([0, 0]);

watch(priceFilterRange, () => {
  if (!stored.value && priceFilterRange.length == 2) {
    price.value = [...priceFilterRange];
  }
});

watch(sizeFilterRange, () => {
  if (!stored.value && sizeFilterRange.length == 2) {
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

const resetParams = () => {
  resetFilters()
  roomsFilter.value.forEach((elem, i) => (elem.isActive = false));
  price.value = [...priceFilterRange];
  size.value = [...sizeFilterRange];
}

watch(
  activeFilter,
  () => {
    filterList()
    console.log(store)
    localStorage.setItem('userStore', JSON.stringify(store))
  },
  { deep: true }
)

const stored = ref(null)

onMounted(async () => {
  stored.value = localStorage.getItem('userStore')
  if (stored.value) {
    const savedStore = JSON.parse(stored.value)
    //rooms
    activeFilter.value = savedStore.activeFilter
    toggleRoomsFilter(savedStore.activeFilter.rooms ? savedStore.activeFilter.rooms - 1 : '')
    //price
    price.value[0] = savedStore.activeFilter.price.min
    price.value[1] = savedStore.activeFilter.price.max
    //size
    size.value[0] = savedStore.activeFilter.size.min
    size.value[1] = savedStore.activeFilter.size.max

    console.log(2)
    await fetchApartments()
    filterList()
  }
})
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

  @media (max-width: $breakpoint-xl) {
    padding: 20px;
  }

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
    transition: all 250ms ease;


    &--active {
      background-color: #3eb57c;
      color: #fff;
      box-shadow: 0px 6px 20px 0px rgba(149, 208, 161, 1);
    }

    &--disabled {
      color: rgba(121, 126, 142, 0.2);
      cursor: auto;
    }

    &:hover {
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
    outline: none;

    &:hover {
      color: #fff;

      img {
        filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7469%) hue-rotate(33deg) brightness(98%) contrast(110%);
      }

    }
  }

}
</style>
