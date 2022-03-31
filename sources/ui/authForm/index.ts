webix.protoUI(
  {
    name: "authForm",
    defaults: {
      modal: true,
    },
    $init(config) {
      config.head = config.formType;
    },
  },
  webix.ui.window
);
