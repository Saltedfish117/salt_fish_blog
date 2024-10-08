import {
  propsFactory
} from "./chunk-7XWA5GZY.js";
import {
  Transition,
  TransitionGroup,
  h,
  mergeProps
} from "./chunk-P4SAR47T.js";

// node_modules/vuetify/lib/composables/transition.mjs
var makeTransitionProps = propsFactory({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (val) => val !== true
  }
}, "transition");
var MaybeTransition = (props, _ref) => {
  let {
    slots
  } = _ref;
  const {
    transition,
    disabled,
    group,
    ...rest
  } = props;
  const {
    component = group ? TransitionGroup : Transition,
    ...customProps
  } = typeof transition === "object" ? transition : {};
  return h(component, mergeProps(typeof transition === "string" ? {
    name: disabled ? "" : transition
  } : customProps, typeof transition === "string" ? {} : Object.fromEntries(Object.entries({
    disabled,
    group
  }).filter((_ref2) => {
    let [_, v] = _ref2;
    return v !== void 0;
  })), rest), slots);
};

export {
  makeTransitionProps,
  MaybeTransition
};
//# sourceMappingURL=chunk-2BZKIQHY.js.map
