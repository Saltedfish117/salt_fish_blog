import {
  createForm,
  makeFormProps
} from "./chunk-Z5QZRFFI.js";
import {
  forwardRefs
} from "./chunk-M5MBIOLE.js";
import {
  genericComponent,
  makeComponentProps,
  propsFactory,
  useRender
} from "./chunk-7XWA5GZY.js";
import {
  createVNode,
  ref
} from "./chunk-P4SAR47T.js";

// node_modules/vuetify/lib/components/VForm/VForm.mjs
var makeVFormProps = propsFactory({
  ...makeComponentProps(),
  ...makeFormProps()
}, "VForm");
var VForm = genericComponent()({
  name: "VForm",
  props: makeVFormProps(),
  emits: {
    "update:modelValue": (val) => true,
    submit: (e) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const form = createForm(props);
    const formRef = ref();
    function onReset(e) {
      e.preventDefault();
      form.reset();
    }
    function onSubmit(_e) {
      const e = _e;
      const ready = form.validate();
      e.then = ready.then.bind(ready);
      e.catch = ready.catch.bind(ready);
      e.finally = ready.finally.bind(ready);
      emit("submit", e);
      if (!e.defaultPrevented) {
        ready.then((_ref2) => {
          var _a;
          let {
            valid
          } = _ref2;
          if (valid) {
            (_a = formRef.value) == null ? void 0 : _a.submit();
          }
        });
      }
      e.preventDefault();
    }
    useRender(() => {
      var _a;
      return createVNode("form", {
        "ref": formRef,
        "class": ["v-form", props.class],
        "style": props.style,
        "novalidate": true,
        "onReset": onReset,
        "onSubmit": onSubmit
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, form)]);
    });
    return forwardRefs(form, formRef);
  }
});

export {
  VForm
};
//# sourceMappingURL=chunk-DAP6RFMS.js.map
