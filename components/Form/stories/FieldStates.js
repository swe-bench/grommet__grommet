"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldStates = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var FieldStates = exports.FieldStates = function FieldStates() {
  var inputRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    inputRef.current.focus();
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: true,
      gap: "medium",
      pad: "large",
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "enabled-id",
      name: "enabled",
      label: "Default"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "enabled-id",
      name: "enabled",
      placeholder: "Enter a username"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "focus-id",
      name: "focus",
      label: "Focus State"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "focus-id",
      name: "focus",
      placeholder: "Enter a username",
      ref: inputRef
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "info-id",
      name: "info-demo",
      label: "Info State",
      info: "Unique name. No spaces. May include '-' as a separator."
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "info-id",
      name: "info-demo",
      placeholder: "Enter a username",
      value: "fluffyKi"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "error-id",
      name: "error-demo",
      label: "Error State",
      error: "It looks like that username is already taken. Bummer."
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "error-id",
      name: "error-demo",
      placeholder: "Enter a username",
      value: "fluffyKitty123"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "disabled-id",
      name: "disabled",
      label: "Disabled State",
      disabled: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "disabled-id",
      name: "disabled",
      placeholder: "Enter a username",
      disabled: true
    })))))
    // </Grommet>
  );
};
FieldStates.storyName = 'Field states';
var _default = exports["default"] = {
  title: 'Input/Form/Field states'
};