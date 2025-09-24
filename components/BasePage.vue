<template>
  <div class="base-page wrapper">
    <div class="base-page__row">
      <div>
        <h1>Квартиры</h1>
        <ApartmentsList />

      </div>
      <div>
        <ApartmentsFilter />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.base-page {
  &__row {
    display: flex;
    gap: 80px;

    & div:nth-child(1) {
      flex: 2;
    }

    & div:nth-child(2) {
      flex: 1;
    }

    h1 {
      margin-bottom: 48px;
    }
  }
}
</style>