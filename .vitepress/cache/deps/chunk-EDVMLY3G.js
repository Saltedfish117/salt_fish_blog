import {
  computed,
  onMounted,
  readonly,
  shallowRef
} from "./chunk-P4SAR47T.js";

// node_modules/vuetify/lib/composables/ssrBoot.mjs
function useSsrBoot() {
  const isBooted = shallowRef(false);
  onMounted(() => {
    window.requestAnimationFrame(() => {
      isBooted.value = true;
    });
  });
  const ssrBootStyles = computed(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}

export {
  useSsrBoot
};
//# sourceMappingURL=chunk-EDVMLY3G.js.map
