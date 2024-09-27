import {
  getCurrentInstance,
  propsFactory
} from "./chunk-7XWA5GZY.js";
import {
  computed,
  shallowRef,
  watch
} from "./chunk-P4SAR47T.js";

// node_modules/vuetify/lib/composables/lazy.mjs
var makeLazyProps = propsFactory({
  eager: Boolean
}, "lazy");
function useLazy(props, active) {
  const isBooted = shallowRef(false);
  const hasContent = computed(() => isBooted.value || props.eager || active.value);
  watch(active, () => isBooted.value = true);
  function onAfterLeave() {
    if (!props.eager) isBooted.value = false;
  }
  return {
    isBooted,
    hasContent,
    onAfterLeave
  };
}

// node_modules/vuetify/lib/composables/scopeId.mjs
function useScopeId() {
  const vm = getCurrentInstance("useScopeId");
  const scopeId = vm.vnode.scopeId;
  return {
    scopeId: scopeId ? {
      [scopeId]: ""
    } : void 0
  };
}

export {
  makeLazyProps,
  useLazy,
  useScopeId
};
//# sourceMappingURL=chunk-N32AOJGU.js.map
