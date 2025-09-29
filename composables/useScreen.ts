export const useScreen = () => {
  const isSmallScreen = ref(false);

  const checkScreenSize = () => {
    const width = window.innerWidth;
    isSmallScreen.value = width >= 960 && width < 1440;
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
  });

  return {
    isSmallScreen,
  };
};
