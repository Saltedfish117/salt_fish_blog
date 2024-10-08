import {
  getCurrentInstanceName,
  propsFactory
} from "./chunk-7XWA5GZY.js";
import {
  computed
} from "./chunk-P4SAR47T.js";

// node_modules/vuetify/lib/composables/position.mjs
var positionValues = ["static", "relative", "fixed", "absolute", "sticky"];
var makePositionProps = propsFactory({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (v) => positionValues.includes(v)
    )
  }
}, "position");
function usePosition(props) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getCurrentInstanceName();
  const positionClasses = computed(() => {
    return props.position ? `${name}--${props.position}` : void 0;
  });
  return {
    positionClasses
  };
}

export {
  makePositionProps,
  usePosition
};
//# sourceMappingURL=chunk-6KMW22XD.js.map
