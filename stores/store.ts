import type { Apartment, ActiveFilter } from '../types/types';

export const useStore = defineStore('store', () => {
  //State
  const apartments = ref<Apartment[]>([]);
  const filteredApartments = ref<Apartment[]>([]);

  const sortingParameter = ref('');
  const sortingType = ref('');
  const priceFilterRange = ref<number[]>([]);
  const sizeFilterRange = ref<number[]>([]);

  const activeFilter = ref<ActiveFilter>({
    rooms: '',
    price: { min: 0, max: 0 },
    size: { min: 0, max: 0 },
  });

  //Actions
  async function fetchApartments() {
    try {
      const response = await fetch('/data/data-2.json');
      const data = await response.json();
      apartments.value = data;
      filteredApartments.value = [...apartments.value];
      getFilterRange();
    } catch (error) {
      console.log(error);
    }
  }

  function sortList(param: string, direction: string) {
    sortingParameter.value = param;
    sortingType.value = direction;

    if (param == 'price' && direction == 'asc') {
      filteredApartments.value.sort((a, b) => a.price - b.price);
    } else if (param == 'price' && direction == 'desc') {
      filteredApartments.value.sort((a, b) => b.price - a.price);
    }

    if (param == 'size' && direction == 'asc') {
      filteredApartments.value.sort((a, b) => a.size - b.size);
    } else if (param == 'size' && direction == 'desc') {
      filteredApartments.value.sort((a, b) => b.size - a.size);
    }

    if (param == 'floor' && direction == 'asc') {
      filteredApartments.value.sort(
        (a, b) => +a.floor.split(' ')[0] - +b.floor.split(' ')[0]
      );
    } else if (param == 'floor' && direction == 'desc') {
      filteredApartments.value.sort(
        (a, b) => +b.floor.split(' ')[0] - +a.floor.split(' ')[0]
      );
    }
  }

  function getFilterRange() {
    const apartmentsCopy = [...apartments.value];
    //price
    apartmentsCopy.sort((a, b) => a.price - b.price);
    priceFilterRange.value.push(apartmentsCopy[0].price);
    priceFilterRange.value.push(
      apartmentsCopy[apartmentsCopy.length - 1].price
    );

    //size
    apartmentsCopy.sort((a, b) => a.size - b.size);
    sizeFilterRange.value.push(apartmentsCopy[0].size);
    sizeFilterRange.value.push(apartmentsCopy[apartmentsCopy.length - 1].size);
  }

  function filterByRooms(roomsValue: string) {
    activeFilter.value.rooms = roomsValue;
  }

  function filterByPrice(min: number, max: number) {
    activeFilter.value.price = { min, max };
  }

  function filterBySize(min: number, max: number) {
    activeFilter.value.size = { min, max };
  }

  function filterList() {
    filteredApartments.value = apartments.value.filter((el) => {
      const roomFilterPass =
        activeFilter.value.rooms.length > 0
          ? el.title[0] === activeFilter.value.rooms
          : true;

      const priceFilterPass =
        el.price >= activeFilter.value.price.min &&
        el.price <= activeFilter.value.price.max;

      const sizeFilterPass =
        el.size >= activeFilter.value.size.min &&
        el.size <= activeFilter.value.size.max;

      return roomFilterPass && priceFilterPass && sizeFilterPass;
    });
  }

  function resetFilters() {
    console.log('reset 1');
    activeFilter.value = {
      rooms: '',
      price: { min: priceFilterRange.value[0], max: priceFilterRange.value[1] },
      size: { min: sizeFilterRange.value[0], max: sizeFilterRange.value[1] },
    };
  }

  return {
    apartments,
    fetchApartments,
    sortList,
    sortingParameter,
    sortingType,
    priceFilterRange,
    sizeFilterRange,
    getFilterRange,
    filterByRooms,
    filteredApartments,
    filterByPrice,
    filterBySize,
    resetFilters,
    activeFilter,
    filterList,
  };
});
