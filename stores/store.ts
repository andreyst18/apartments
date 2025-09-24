import type {Apartment}  from '../types/types'

export const useStore = defineStore('store', () => {
   //State
   const apartments = ref<Apartment[]>([])

   const sortingParameter = ref('')
   const sortingType = ref('')


   //Actions
   async function fetchApartments(){
    try {
      const response = await fetch('/data/data-2.json')
      const data = await response.json()
      console.log(data)
      apartments.value = data
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

  return {apartments, fetchApartments, sortList, sortingParameter, sortingType}
})