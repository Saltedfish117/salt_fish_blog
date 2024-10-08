import {
  breakpoints
} from "./chunk-PV3PWKKX.js";
import {
  makeTagProps
} from "./chunk-YRGVOYWN.js";
import {
  makeDimensionProps,
  useDimension
} from "./chunk-KFICKRVJ.js";
import {
  useRtl
} from "./chunk-4BJMNJMY.js";
import {
  createSimpleFunctional,
  genericComponent,
  makeComponentProps,
  propsFactory,
  useRender
} from "./chunk-7XWA5GZY.js";
import {
  capitalize,
  computed,
  createVNode,
  h
} from "./chunk-P4SAR47T.js";

// node_modules/vuetify/lib/components/VGrid/VContainer.mjs
import "D:/Practice/myBlog/node_modules/vuetify/lib/components/VGrid/VGrid.css";
var makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps()
}, "VContainer");
var VContainer = genericComponent()({
  name: "VContainer",
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createVNode(props.tag, {
      "class": ["v-container", {
        "v-container--fluid": props.fluid
      }, rtlClasses.value, props.class],
      "style": [dimensionStyles.value, props.style]
    }, slots));
    return {};
  }
});

// node_modules/vuetify/lib/components/VGrid/VCol.mjs
import "D:/Practice/myBlog/node_modules/vuetify/lib/components/VGrid/VGrid.css";
var breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
var offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = "offset" + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
var orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = "order" + capitalize(val);
    props[orderKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
var propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  if (type === "col") {
    className = "v-" + className;
  }
  if (type === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
var ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
var makeVColProps = propsFactory({
  cols: {
    type: [Boolean, String, Number],
    default: false
  },
  ...breakpointProps,
  offset: {
    type: [String, Number],
    default: null
  },
  ...offsetProps,
  order: {
    type: [String, Number],
    default: null
  },
  ...orderProps,
  alignSelf: {
    type: String,
    default: null,
    validator: (str) => ALIGN_SELF_VALUES.includes(str)
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCol");
var VCol = genericComponent()({
  name: "VCol",
  props: makeVColProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: [classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});

// node_modules/vuetify/lib/components/VGrid/VRow.mjs
import "D:/Practice/myBlog/node_modules/vuetify/lib/components/VGrid/VGrid.css";
var ALIGNMENT = ["start", "end", "center"];
var SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
var ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
var alignValidator = (str) => ALIGN_VALUES.includes(str);
var alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
var JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
var justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
var justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
var ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
var alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
var alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
var propMap2 = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
var classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass2(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
var makeVRowProps = propsFactory({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: alignValidator
  },
  ...alignProps,
  justify: {
    type: String,
    default: null,
    validator: justifyValidator
  },
  ...justifyProps,
  alignContent: {
    type: String,
    default: null,
    validator: alignContentValidator
  },
  ...alignContentProps,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VRow");
var VRow = genericComponent()({
  name: "VRow",
  props: makeVRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap2) {
        propMap2[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass2(type, prop, value);
          if (className) classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: ["v-row", classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});

// node_modules/vuetify/lib/components/VGrid/VSpacer.mjs
import "D:/Practice/myBlog/node_modules/vuetify/lib/components/VGrid/VGrid.css";
var VSpacer = createSimpleFunctional("v-spacer", "div", "VSpacer");

export {
  VContainer,
  VCol,
  VRow,
  VSpacer
};
//# sourceMappingURL=chunk-VM2QMX6Z.js.map
