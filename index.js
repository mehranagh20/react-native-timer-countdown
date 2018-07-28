"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimerCountdown =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimerCountdown, _React$Component);

  function TimerCountdown() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimerCountdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimerCountdown)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mounted", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      secondsRemaining: _this.props.initialSecondsRemaining,
      timeoutId: null,
      previousSeconds: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "tick", function () {
      var currentSeconds = Date.now();
      var dt = _this.state.previousSeconds ? currentSeconds - _this.state.previousSeconds : 0;
      var interval = _this.props.interval; // correct for small variations in actual timeout time

      var intervalSecondsRemaing = interval - dt % interval;
      var timeout = intervalSecondsRemaing;

      if (intervalSecondsRemaing < interval / 2.0) {
        timeout += interval;
      }

      var secondsRemaining = Math.max(_this.state.secondsRemaining - dt, 0);
      var isComplete = _this.state.previousSeconds && secondsRemaining <= 0;

      if (_this.mounted) {
        if (_this.state.timeoutId) {
          clearTimeout(_this.state.timeoutId);
        }

        _this.setState({
          timeoutId: isComplete ? null : setTimeout(_this.tick, timeout),
          previousSeconds: currentSeconds,
          secondsRemaining: secondsRemaining
        });
      }

      if (isComplete) {
        if (_this.props.onTimeElapsed) {
          _this.props.onTimeElapsed();
        }

        return;
      }

      if (_this.props.onTick) {
        _this.props.onTick(secondsRemaining);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFormattedTime", function (milliseconds) {
      if (_this.props.formatSecondsRemaining) {
        return _this.props.formatSecondsRemaining(milliseconds);
      }

      var remainingSec = Math.round(milliseconds / 1000);
      var seconds = parseInt((remainingSec % 60).toString(), 10);
      var minutes = parseInt((remainingSec / 60 % 60).toString(), 10);
      var hours = parseInt((remainingSec / 3600).toString(), 10);
      var s = seconds < 10 ? '0' + seconds : seconds;
      var m = minutes < 10 ? '0' + minutes : minutes;
      var h = hours < 10 ? '0' + hours : hours;
      h = h === '00' ? '' : h + ':';
      return h + m + ':' + s;
    });

    return _this;
  }

  _createClass(TimerCountdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.tick();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (this.state.timeoutId) {
        clearTimeout(this.state.timeoutId);
      }

      this.setState({
        previousSeconds: null,
        secondsRemaining: newProps.initialSecondsRemaining
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.state.previousSeconds && this.state.secondsRemaining > 0 && this.mounted) {
        this.tick();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      clearTimeout(this.state.timeoutId);
    }
  }, {
    key: "render",
    value: function render() {
      var secondsRemaining = this.state.secondsRemaining;
      var allowFontScaling = this.props.allowFontScaling;
      var style = this.props.style;
      return <_reactNative.Text allowFontScaling={allowFontScaling} style={style}>
        {this.getFormattedTime(secondsRemaining)}
      </_reactNative.Text>;
    }
  }]);

  return TimerCountdown;
}(React.Component);

exports.default = TimerCountdown;

_defineProperty(TimerCountdown, "defaultProps", {
  interval: 1000,
  formatSecondsRemaining: null,
  onTick: null,
  onTimeElapsed: null
});