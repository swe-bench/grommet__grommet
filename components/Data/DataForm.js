"use strict";

exports.__esModule = true;
exports.formStepKey = exports.formSortKey = exports.formSearchKey = exports.formRangeKey = exports.formPageKey = exports.formColumnsKey = exports.DataForm = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Box = require("../Box");
var _Button = require("../Button");
var _Footer = require("../Footer");
var _Form = require("../Form");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _excluded = ["children", "footer", "gap", "onDone", "onTouched", "pad"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var HideableButton = (0, _styledComponents["default"])(_Button.Button).withConfig({
  displayName: "DataForm__HideableButton",
  componentId: "sc-v64e1r-0"
})(["", ""], function (props) {
  return props.disabled && "\n  opacity: 0;";
});
var hideButtonProps = {
  'aria-hidden': true,
  disabled: true,
  tabIndex: -1
};

// We convert the view structure to something more flat to work better
// with the Form inputs. These keys are how we flatten the Form value object
// from the view object.
var formSearchKey = '_search';
exports.formSearchKey = formSearchKey;
var formSortKey = '_sort';
exports.formSortKey = formSortKey;
var formRangeKey = '_range';
exports.formRangeKey = formRangeKey;
var formStepKey = '_step';
exports.formStepKey = formStepKey;
var formPageKey = '_page';
exports.formPageKey = formPageKey;
var formColumnsKey = '_columns';
exports.formColumnsKey = formColumnsKey;
var viewFormKeyMap = {
  search: formSearchKey,
  sort: formSortKey,
  step: formStepKey,
  page: formPageKey,
  columns: formColumnsKey
};

// converts from the external view format to the internal Form value format
var viewToFormValue = function viewToFormValue(view) {
  var result = _extends({}, (view == null ? void 0 : view.properties) || {});
  // convert { min: , max: } range to [min, max] for RangeSelector
  Object.keys(result).forEach(function (key) {
    var _result$key, _result$key2;
    if (typeof ((_result$key = result[key]) == null ? void 0 : _result$key.min) === 'number' || typeof ((_result$key2 = result[key]) == null ? void 0 : _result$key2.max) === 'number') {
      var _result$key3;
      result[key] = (_result$key3 = {}, _result$key3[formRangeKey] = [result[key].min, result[key].max], _result$key3);
    }
  });

  // convert formal view keys to their form '_' prefixed counterparts
  Object.keys(viewFormKeyMap).forEach(function (key) {
    if (view != null && view[key]) result[viewFormKeyMap[key]] = view[key];
  });
  // always have some blank search text
  if (!result[formSearchKey]) result[formSearchKey] = '';
  if (view != null && view.columns) result[formColumnsKey] = view.columns;
  return result;
};

// converts from the internal Form value format to the external view format
var formValueToView = function formValueToView(value) {
  var result = {};
  var valueCopy = _extends({}, value);
  Object.keys(viewFormKeyMap).forEach(function (key) {
    if (valueCopy[viewFormKeyMap[key]]) {
      result[key] = valueCopy[viewFormKeyMap[key]];
      delete valueCopy[viewFormKeyMap[key]];
    }
  });
  result.properties = valueCopy;

  // convert any ranges
  Object.keys(result.properties).forEach(function (key) {
    if (result.properties[key][formRangeKey]) {
      result.properties[key] = {
        min: result.properties[key][formRangeKey][0],
        max: result.properties[key][formRangeKey][1]
      };
    }
  });
  return result;
};

// remove any empty arrays of property values by deleting the key for
// that property in the view properties
var clearEmpty = function clearEmpty(properties) {
  Object.keys(properties).filter(function (k) {
    return k !== formSearchKey;
  }).forEach(function (k) {
    if (Array.isArray(properties[k]) && properties[k].length === 0)
      // eslint-disable-next-line no-param-reassign
      delete properties[k];
  });
};

// if paging, when anything other than the page changes, reset the page to 1
var resetPage = function resetPage(nextFormValue, prevFormValue) {
  if (prevFormValue[formPageKey] && prevFormValue[formPageKey] > 1)
    // eslint-disable-next-line no-param-reassign
    nextFormValue[formPageKey] = 1;
};
var transformTouched = function transformTouched(touched, value) {
  var result = {};
  Object.keys(touched).forEach(function (key) {
    result[key] = value[key];
  });
  return result;
};
var DataForm = function DataForm(_ref) {
  var children = _ref.children,
    footer = _ref.footer,
    gap = _ref.gap,
    onDone = _ref.onDone,
    onTouched = _ref.onTouched,
    pad = _ref.pad,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    messages = _useContext.messages,
    onView = _useContext.onView,
    updateOn = _useContext.updateOn,
    view = _useContext.view;
  var _useContext2 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext2.format;
  var _useState = (0, _react.useState)(viewToFormValue(view)),
    formValue = _useState[0],
    setFormValue = _useState[1];
  var _useState2 = (0, _react.useState)(),
    changed = _useState2[0],
    setChanged = _useState2[1];
  (0, _react.useEffect)(function () {
    return setFormValue(viewToFormValue(view));
  }, [view]);
  return /*#__PURE__*/_react["default"].createElement(_Form.Form, _extends({}, rest, {
    value: formValue,
    onSubmit: updateOn === 'submit' ? function (_ref2) {
      var nextValue = _ref2.value,
        touched = _ref2.touched;
      clearEmpty(nextValue);
      resetPage(nextValue, formValue);
      setFormValue(nextValue);
      setChanged(false);
      if (onTouched) onTouched(transformTouched(touched, nextValue));
      onView(formValueToView(nextValue));
      if (onDone) onDone();
    } : undefined,
    onChange: function onChange(nextValue, _ref3) {
      var touched = _ref3.touched;
      clearEmpty(nextValue);
      resetPage(nextValue, formValue);
      setFormValue(nextValue);
      setChanged(true);
      if (updateOn === 'change') {
        if (onTouched) onTouched(transformTouched(touched, nextValue));
        onView(formValueToView(nextValue));
      }
    }
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    flex: false,
    pad: pad,
    gap: gap
  }, children, footer !== false && updateOn === 'submit' && /*#__PURE__*/_react["default"].createElement(_Footer.Footer, null, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    label: format({
      id: 'dataForm.submit',
      messages: messages == null ? void 0 : messages.dataForm
    }),
    type: "submit",
    primary: true
  }), /*#__PURE__*/_react["default"].createElement(HideableButton, _extends({
    label: format({
      id: 'dataForm.reset',
      messages: messages == null ? void 0 : messages.dataForm
    }),
    type: "reset",
    onClick: function onClick() {
      setFormValue(viewToFormValue(view));
      setChanged(false);
    }
  }, !changed ? hideButtonProps : {})))));
};
exports.DataForm = DataForm;