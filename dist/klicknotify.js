(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './config/app', './config/style', './views/main'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./config/app'), require('./config/style'), require('./views/main'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.app, global.style, global.main);
    global.main = mod.exports;
  }
})(this, function (exports, _app, _style, _main) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var AppConfig = _interopRequireWildcard(_app);

  var StyleConfig = _interopRequireWildcard(_style);

  var _main2 = _interopRequireDefault(_main);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var CONTAINER = (0, _main2.default)();
  var MESSAGE = CONTAINER.querySelector('.' + StyleConfig.MESSAGE_CLASS);
  var CLOSE_BUTTON = CONTAINER.querySelector('.' + StyleConfig.CLOSE_CLASS);
  var MESSAGE_TYPES = AppConfig.MESSAGE_TYPES,
      DEFAULT_CONFIG = AppConfig.DEFAULT_CONFIG;

  var METHODS = {};

  var showTimeout = void 0;

  var resetTimeouts = function resetTimeouts() {
    if (showTimeout) {
      clearTimeout(showTimeout);
    }
  };

  var resetStyles = function resetStyles() {
    MESSAGE_TYPES.forEach(function (type) {
      CONTAINER.classList.remove(type);
    });
  };

  METHODS.close = function () {
    MESSAGE.textContent = '';
    CONTAINER.classList.remove(StyleConfig.IS_VISIBLE_CLASS);
  };

  METHODS.show = function (options) {
    var currentOptions = Object.assign({}, DEFAULT_CONFIG, options);

    if (!currentOptions.message) {
      throw new Error('Notify: Message is invalid.');
    }

    resetTimeouts();
    resetStyles();

    MESSAGE.textContent = currentOptions.message;

    CONTAINER.classList.add(StyleConfig.IS_VISIBLE_CLASS);

    if (MESSAGE_TYPES.indexOf(currentOptions.type) > -1) {
      CONTAINER.classList.add(currentOptions.type);
    }

    if (currentOptions.autoHide) {
      showTimeout = setTimeout(function () {
        METHODS.close();
      }, currentOptions.autoHideDelay);
    }
  };

  METHODS.init = function () {
    document.body.appendChild(CONTAINER);

    CLOSE_BUTTON.addEventListener('click', function () {
      METHODS.close();
    });
  };

  MESSAGE_TYPES.forEach(function (type) {
    METHODS[type] = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      METHODS.show(Object.assign(options, { type: type }));
    };
  });

  exports.default = METHODS;
});
