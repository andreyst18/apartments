<template>
  <div class="list-item">
    <div class="list-item__content">
      <div>
        <div class="list-item__title text-medium">{{ apartmentData.title }}</div>
        <div class="list-item__row">
          <div class="text-medium">{{
            String(apartmentData.size).replace('.', ',')
          }}</div>
          <div><span class="text-medium">{{ apartmentData.floor.split(' ')[0] }}</span><span class="text-secondary">{{
            ` из
              ${amountFloors}`
              }}</span></div>
          <div class="text-medium">{{
            `${apartmentData.price.toLocaleString('ru-RU')} ₽`
          }}</div>
        </div>
      </div>
      <div>
        <nuxt-img :src="`/images/${apartmentData.planImage}.svg`" width="80" height="80"></nuxt-img>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['apartmentData', 'amountFloors'])



</script>

<style lang="scss" scoped>
.list-item {
  padding: 16px 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px;

  &__content {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    margin-bottom: 16px;
  }

  &__row {
    display: flex;
    gap: 20px;
  }
}
</style>