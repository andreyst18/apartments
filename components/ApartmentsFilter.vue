<template>
  <div class="apartments-filter">
    <ul class="apartments-filter__rooms">
      <li v-for="(item, index) in roomsFilter" :key="index">
        <button :class="['apartments-filter__rooms-btn', { 'apartments-filter__rooms-btn--active': item.isActive }]"
          @click="toggleRoomsFilter(index)">{{ item.title }}</button>
      </li>
    </ul>
    <div class="apartments-filter__filter">
      <div class="apartments-filter__filter-title">Стоимость квартиры, ₽</div>
      <div class="apartments-filter__range">
        <div>
          <span>от</span><span>{{ ` ${price[0]}` }}</span>
        </div>
        <div>
          <span>до</span><span>{{ ` ${price[1]}` }}</span>
        </div>
      </div>
      <div>
        <USlider v-model="price" :min="priceFilterRange[0]" :max="priceFilterRange[1]" />
      </div>
    </div>


  </div>
</template>

<script setup>
const store = useStore()

const { priceFilterRange, sizeFilterRange, filterByRooms, filterByPrice } = store

const roomsFilter = ref([
  { title: '1к', isActive: false, rooms: '1' },
  { title: '2к', isActive: false, rooms: '2' },
  { title: '3к', isActive: false, rooms: '3' },
  { title: '4к', isActive: false, rooms: '4' }
])

const toggleRoomsFilter = (index) => {
  console.log(index)
  roomsFilter.value.forEach((elem, i) => elem.isActive = (i == index))
  filterByRooms(roomsFilter.value.filter(el => el.isActive)[0].rooms)
}

const price = ref([0, 0])

watch(
  priceFilterRange,
  () => {
    if (priceFilterRange.length == 2) {
      console.log(priceFilterRange)
      price.value = [...priceFilterRange]
    }

  }
)

watch(
  price,
  () => {
    console.log(1)
    filterByPrice(price.value[0], price.value[1])
  }
)



</script>

<style lang="scss" scoped>
.apartments-filter {
  background-image: linear-gradient(rgba(174, 228, 178, 0.5), rgba(149, 208, 161, 0.5));
  padding: 40px;
  border-radius: 10px;

  &__rooms {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
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
      background-color: #3EB57C;
      color: #fff;
      box-shadow: 0px 6px 20px 0px rgba(149, 208, 161, 1);

    }

  }

  &__filter {
    &__filter-title {
      margin-bottom: 8px;
    }

  }

  &__range {
    display: flex;
    gap: 60px;
  }

}
</style>