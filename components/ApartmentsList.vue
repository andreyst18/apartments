<template>
  <div class="apartments-list">

    <!-- 1440+ -->
    <table class="apartments-list__table" v-if="!isSmallScreen">
      <thead>
        <tr>
          <th>Планировка</th>
          <th>Квартира</th>
          <th>
            <div>
              <span :class="[{ 'text-active-filter': sortingParameter == 'size' }]">S, м²</span>
              <SortButton type="size" />
            </div>
          </th>
          <th>
            <div>
              <span :class="[{ 'text-active-filter': sortingParameter == 'floor' }]">Этаж</span>
              <SortButton type="floor" />
            </div>
          </th>
          <th>
            <div>
              <span :class="[{ 'text-active-filter': sortingParameter == 'price' }]">Цена, ₽</span>
              <SortButton type="price" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="apartmentItem in filteredApartments" :key="apartmentItem.title">
          <td v-for="(value, key) in apartmentItem" :key="value + key">
            <nuxt-img v-if="key === 'planImage'" :src="`/images/${value}.svg`" width="80" height="80"></nuxt-img>
            <span v-else-if="key == 'title'" class="text-medium">{{
              value
              }}</span>
            <span v-else-if="key == 'size'">{{
              String(value).replace('.', ',')
              }}</span>
            <span v-else-if="key == 'floor'"><span>{{ value.split(' ')[0] }}</span><span class="text-secondary">{{
              ` из
                ${amountFloors}`
                }}</span></span>
            <span v-else-if="key == 'price'">{{
              value.toLocaleString('ru-RU')
              }}</span>
            <span v-else>{{ value }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 960 - 1440 -->
    <div v-if="isSmallScreen">
      <ul class="apartments-list__sorting-params">
        <li>
          <div>
            <span :class="[{ 'text-active-filter': sortingParameter == 'size' }]">S, м²</span>
            <SortButton type="size" />
          </div>
        </li>
        <li>
          <div>
            <span :class="[{ 'text-active-filter': sortingParameter == 'floor' }]">Этаж</span>
            <SortButton type="floor" />
          </div>
        </li>
        <li>
          <div>
            <span :class="[{ 'text-active-filter': sortingParameter == 'price' }]">Цена, ₽</span>
            <SortButton type="price" />
          </div>
        </li>
      </ul>
      <ul class="apartments-list__list">
        <li v-for="apartmentItem in filteredApartments" :key="apartmentItem.title">
          <ListItem :apartmentData="apartmentItem" :amountFloors />
        </li>
      </ul>
    </div>

    <button class="apartments-list__download-btn" @click="downloadMore" v-if="lastIndex < apartments.length">Загрузить
      еще</button>
  </div>
</template>

<script setup>

const store = useStore();
const { fetchApartments, downloadMore } = store;
const { apartments, filteredApartments, sortingParameter, lastIndex } = storeToRefs(store);

const amountFloors = ref(17);

const { isSmallScreen } = useScreen()

onMounted(() => {
  fetchApartments();

});
</script>

<style lang="scss" scoped>
.apartments-list {
  &__table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 20px;
    margin-bottom: 48px;

    th {
      text-align: left;
      font-weight: normal;
      font-size: 14px;
    }

    th>div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    tr {
      height: 120px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    }

    thead>tr {
      height: 36px;
    }

    th:nth-child(1),
    td:nth-child(1) {
      width: 80px;
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 280px;
    }

    th:nth-child(3),
    td:nth-child(3),
    th:nth-child(4),
    td:nth-child(4),
    th:nth-child(5),
    td:nth-child(5) {
      width: 120px;
    }

    td,
    th {
      padding-right: 20px;
      vertical-align: top;
      padding-top: 16px;
    }

    thead th {
      padding-top: 0;
    }

    td:last-child,
    th:last-child {
      padding-right: 0;
    }
  }

  &__download-btn {
    border: 1px solid rgba(11, 23, 57, 0.2);
    min-width: 156px;
    padding: 8px;
    border-radius: 25px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 24px;
  }

  &__sorting-params {
    display: flex;
    gap: 20px;
    margin-bottom: 12px;

    li>div {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
