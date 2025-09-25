import type {Apartment}  from '../types/types'

export const useStore = defineStore('store', () => {
   //State
   const apartments = ref<Apartment[]>([])
   const filteredApartments = ref<Apartment[]>([])

   const sortingParameter = ref('')
   const sortingType = ref('')
   const priceFilterRange = ref<number[]>([])
   const sizeFilterRange = ref<number[]>([])

   const activeFilter = ref({})
   


   //Actions
   async function fetchApartments(){
    try {
      const response = await fetch('/data/data-2.json')
      const data = await response.json()
      apartments.value = data
      filteredApartments.value = [...apartments.value]
      getFilterRange()
    } catch(error) {
      console.log(error)
    }
   }

   function sortList(param: string, direction: string) {
    sortingParameter.value = param
    sortingType.value = direction

    if (param == 'price' && direction == 'asc') {
       apartments.value.sort((a, b) => a.price - b.price)
       
    } else if (param == 'price' && direction == 'desc') {
       apartments.value.sort((a, b) => b.price - a.price)
    }

    if (param == 'size' && direction == 'asc') {
      apartments.value.sort((a, b) => a.size - b.size)
    } else if (param == 'size' && direction == 'desc') {
       apartments.value.sort((a, b) => b.size - a.size)
    }

    if (param == 'floor' && direction == 'asc') {
      apartments.value.sort((a, b) => +a.floor.split(' ')[0] - +b.floor.split(' ')[0])
    } else if (param == 'floor' && direction == 'desc') {
      apartments.value.sort((a, b) => +b.floor.split(' ')[0] - +a.floor.split(' ')[0])    }
      
   }

   function getFilterRange() {
    const apartmentsCopy = [...apartments.value]
    //price
    apartmentsCopy.sort((a, b) => a.price - b.price)
    priceFilterRange.value.push(apartmentsCopy[0].price)
    priceFilterRange.value.push(apartmentsCopy[apartmentsCopy.length - 1].price)
    
    //size
    apartmentsCopy.sort((a, b) => a.size - b.size)
    sizeFilterRange.value.push(apartmentsCopy[0].size)
    sizeFilterRange.value.push(apartmentsCopy[apartmentsCopy.length - 1].size)
  }

  function filterByRooms(roomsValue: string) {
    filteredApartments.value = [...apartments.value]
    filteredApartments.value = filteredApartments.value.filter(el => el.title[0] == roomsValue)
  }

  function filterByPrice(min: number, max: number) {
    filteredApartments.value = [...apartments.value]
    console.log(min)
    filteredApartments.value = filteredApartments.value.filter(el => el.price >= min && el.price <= max)
  }


  return {apartments, fetchApartments, sortList, sortingParameter, sortingType, priceFilterRange, sizeFilterRange, getFilterRange, filterByRooms, filteredApartments, filterByPrice}
})