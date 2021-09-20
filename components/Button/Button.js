"use strict";

exports.__esModule = true;
exports.Button = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _propTypes = require("./propTypes");

var _Box = require("../Box");

var _Tip = require("../Tip");

var _Badge = require("./Badge");

var _StyledButton = require("./StyledButton");

var _StyledButtonKind = require("./StyledButtonKind");

var _excluded = ["active", "align", "aria-label", "badge", "color", "children", "disabled", "icon", "focusIndicator", "gap", "fill", "href", "justify", "kind", "label", "onBlur", "onClick", "onFocus", "onMouseOut", "onMouseOver", "plain", "primary", "reverse", "secondary", "selected", "size", "tip", "type", "a11yTitle", "as"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// We have two Styled* components to separate
// the newer default|primary|secondary approach,
// which we use the term "kind" to refer to,
// from the previous approach. Hopefully, when we get to grommet v3,
// we can drop the old way and just use kind.
//
// In the kind approach, we rely on the basic structure of the theme
// being repeated. For example: button.default, button.active,
// button.active.default all refer to a similar object containing
// { background, border, color, padding }.
// This allows us to use the same code to evaluate color and generate CSS.
// We just need to build up CSS, since selectors override previous ones.
// See StyledButtonKind.kindStyles() for this.
// And we build down to determine icon color, once we have a color from
// the latest applicable state, we can stop. See Button.getIconColor() for this.
// backgroundAndTextColor() is used in both cases to ensure we are determining
// color in the same way, so the icon and label align.
// only when default is in the theme
// Used to get the color for the icon to match what StyledButtonKind
// and backgroundStyle() will do for the label.
// The paths are ordered from basic to specific. Go through them
// specific to base until we find one that has a color and use that.
var getIconColor = function getIconColor(paths, theme, colorProp, kind) {
  if (paths === void 0) {
    paths = [];
  }

  var result = [];
  var index = paths.length - 1; // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button

  if (typeof kind === 'object') index = 0; // stop when we have a color or no more paths

  while (index >= 0 && !result[1]) {
    var obj = typeof kind === 'object' && kind || theme.button; // find the sub-object under the button them that corresponds with this path
    // for example: 'active.primary'

    if (paths[index]) {
      var parts = paths[index].split('.');

      while (obj && parts.length) {
        obj = obj[parts.shift()];
      }
    }

    if (obj) {
      // use passed in color for background if the theme has a background color
      var background = colorProp && obj.background && obj.background.color ? colorProp : obj.background; // if theme object explicitly sets the color to undefined, pass false
      // to indicate that the theme doesn't want any text color

      var objColor = obj.color || (Object.prototype.hasOwnProperty.call(obj, 'color') && obj.color === undefined ? false : undefined); // use passed in color for text if the theme doesn't have
      // background or border color

      var color = colorProp && (!obj.background || !obj.background.color) && (!obj.border || !obj.border.color) ? colorProp : objColor;
      result = (0, _utils.backgroundAndTextColors)(background, color, theme);
    }

    index -= 1;
  }

  return result[1] || undefined;
};

var getPropertyColor = function getPropertyColor(property, paths, theme, kind, primary) {
  if (paths === void 0) {
    paths = [];
  }

  var result;

  if (kind) {
    var obj = typeof kind === 'object' && kind || theme.button; // index 0 is default state

    if (paths[0]) {
      var parts = paths[0].split('.');

      while (obj && parts.length) {
        obj = obj[parts.shift()];
      }
    }

    if (obj) {
      result = obj[property] || obj[property] && obj[property].color;
    }
  } else if (primary && theme && theme.button && theme.button.primary) {
    result = theme.button.primary[property] || theme.button.primary[property] && theme.button.primary[property].color;
  } else {
    result = theme && theme.button && theme.button[property] || theme && theme.button && theme.button[property] && theme.button[property].color;
  }

  return result;
};

var Button = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var active = _ref.active,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'center' : _ref$align,
      ariaLabel = _ref['aria-label'],
      badgeProp = _ref.badge,
      color = _ref.color,
      children = _ref.children,
      disabled = _ref.disabled,
      icon = _ref.icon,
      _ref$focusIndicator = _ref.focusIndicator,
      focusIndicator = _ref$focusIndicator === void 0 ? true : _ref$focusIndicator,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 'small' : _ref$gap,
      fill = _ref.fill,
      href = _ref.href,
      justify = _ref.justify,
      kindArg = _ref.kind,
      label = _ref.label,
      _onBlur = _ref.onBlur,
      onClick = _ref.onClick,
      _onFocus = _ref.onFocus,
      onMouseOut = _ref.onMouseOut,
      onMouseOver = _ref.onMouseOver,
      plain = _ref.plain,
      primary = _ref.primary,
      reverse = _ref.reverse,
      secondary = _ref.secondary,
      selected = _ref.selected,
      size = _ref.size,
      tip = _ref.tip,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'button' : _ref$type,
      _ref$a11yTitle = _ref.a11yTitle,
      a11yTitle = _ref$a11yTitle === void 0 ? typeof tip === 'string' ? tip : undefined : _ref$a11yTitle,
      as = _ref.as,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(),
      focus = _useState[0],
      setFocus = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      hover = _useState2[0],
      setHover = _useState2[1];

  if ((icon || label) && children) {
    console.warn('Button should not have children if icon or label is provided');
  } // kindArg is object if we are referencing a theme object
  // outside of theme.button


  var kindObj = (0, _react.useMemo)(function () {
    return typeof kindArg === 'object';
  }, [kindArg]); // if the theme has button.default, what kind of Button is this

  var kind = (0, _react.useMemo)(function () {
    if (theme.button["default"] || kindObj) {
      if (kindArg) return kindArg;
      if (primary) return 'primary';
      if (secondary) return 'secondary';
      return 'default';
    }

    return undefined; // pre-default, no kind
  }, [kindArg, kindObj, primary, secondary, theme]); // When we have a kind and are not plain, themePaths stores the relative
  // paths within the theme for the current kind and state of the button.
  // These paths are used with getIconColor() above and kindStyle() within
  // StyledButtonKind.

  var themePaths = (0, _react.useMemo)(function () {
    if (!kind || plain) return undefined;
    var result = {
      base: [],
      hover: []
    };
    if (!kindObj) result.base.push(kind);

    if (selected) {
      result.base.push('selected');
      if (!kindObj) result.base.push("selected." + kind);
    }

    if (disabled) {
      result.base.push('disabled');
      if (!kindObj) result.base.push("disabled." + kind);
    } else {
      if (active) {
        result.base.push('active');
        if (!kindObj) result.base.push("active." + kind);
      }

      result.hover.push('hover');
      if (!kindObj) result.hover.push("hover." + kind);

      if (active) {
        result.hover.push("hover.active");

        if (!kindObj) {
          result.hover.push("hover.active." + kind);
        }
      }
    }

    return result;
  }, [active, disabled, kind, kindObj, plain, selected]); // only used when theme does not have button.default

  var isDarkBackground = function isDarkBackground() {
    var backgroundColor = (0, _utils.normalizeBackground)((0, _utils.normalizeColor)(color || theme.button.primary && theme.button.primary.color || theme.global.colors.control || 'brand', theme), theme);
    return (0, _utils.colorIsDark)(backgroundColor, theme);
  };

  var onMouseOverButton = function onMouseOverButton(event) {
    setHover(true);

    if (onMouseOver) {
      onMouseOver(event);
    }
  };

  var onMouseOutButton = function onMouseOutButton(event) {
    setHover(false);

    if (onMouseOut) {
      onMouseOut(event);
    }
  };

  var buttonIcon = icon; // only change color if user did not specify the color themselves...

  if (icon && !icon.props.color) {
    if (kind) {
      if (!plain) {
        // match what the label will use
        var iconColor = hover && getIconColor(themePaths.hover, theme) || getIconColor(themePaths.base, theme, color, kind);
        if (iconColor) buttonIcon = /*#__PURE__*/(0, _react.cloneElement)(icon, {
          color: iconColor
        });
      }
    } else if (primary) {
      buttonIcon = /*#__PURE__*/(0, _react.cloneElement)(icon, {
        color: theme.global.colors.text[isDarkBackground() ? 'dark' : 'light']
      });
    }
  }

  var domTag = !as && href ? 'a' : as;
  var first = reverse ? label : buttonIcon;
  var second = reverse ? buttonIcon : label;
  var contents;

  if (first && second) {
    contents = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      direction: "row",
      align: "center",
      justify: justify || (align === 'center' ? 'center' : 'between'),
      gap: gap,
      responsive: false
    }, first, second);
  } else if (typeof children === 'function') {
    contents = children({
      disabled: disabled,
      hover: hover,
      focus: focus
    });
  } else {
    contents = first || second || children;
  }

  var background = getPropertyColor('background', themePaths && themePaths.base, theme, kind, primary);
  var border = getPropertyColor('border', themePaths && themePaths.base, theme, kind, primary); // set the badge relative to the button content
  // when the button doesn't have background or border
  // (!kind && icon && !label) is necessary because for old button logic,
  // if button has icon but not label, it will be considered "plain",
  // so no border or background will be applied

  var innerBadge = !background && !border || !kind && icon && !label;

  if (badgeProp && innerBadge) {
    contents = /*#__PURE__*/_react["default"].createElement(_Badge.Badge, {
      content: badgeProp
    }, contents);
  }

  var styledButtonResult;

  if (kind) {
    styledButtonResult = /*#__PURE__*/_react["default"].createElement(_StyledButtonKind.StyledButtonKind, _extends({}, rest, {
      as: domTag,
      ref: ref,
      active: active,
      align: align,
      "aria-label": ariaLabel || a11yTitle,
      badge: badgeProp,
      colorValue: color,
      disabled: disabled,
      gap: gap,
      fillContainer: fill,
      focus: focus,
      focusIndicator: focusIndicator,
      href: href,
      kind: kind,
      themePaths: themePaths,
      onClick: onClick,
      onFocus: function onFocus(event) {
        setFocus(true);
        if (_onFocus) _onFocus(event);
      },
      onBlur: function onBlur(event) {
        setFocus(false);
        if (_onBlur) _onBlur(event);
      },
      onMouseOver: onMouseOverButton,
      onMouseOut: onMouseOutButton,
      plain: plain || _react.Children.count(children) > 0,
      primary: primary,
      sizeProp: size,
      type: !href ? type : undefined
    }), contents);
  } else {
    styledButtonResult = /*#__PURE__*/_react["default"].createElement(_StyledButton.StyledButton, _extends({}, rest, {
      as: domTag,
      ref: ref,
      "aria-label": ariaLabel || a11yTitle,
      colorValue: color,
      active: active,
      selected: selected,
      disabled: disabled,
      hasIcon: !!icon,
      gap: gap,
      hasLabel: !!label,
      fillContainer: fill,
      focus: focus,
      focusIndicator: focusIndicator,
      href: href,
      kind: kind,
      themePaths: themePaths,
      onClick: onClick,
      onFocus: function onFocus(event) {
        setFocus(true);
        if (_onFocus) _onFocus(event);
      },
      onBlur: function onBlur(event) {
        setFocus(false);
        if (_onBlur) _onBlur(event);
      },
      onMouseOver: onMouseOverButton,
      onMouseOut: onMouseOutButton,
      pad: !plain,
      plain: typeof plain !== 'undefined' ? plain : _react.Children.count(children) > 0 || icon && !label,
      primary: primary,
      sizeProp: size,
      type: !href ? type : undefined
    }), contents);
  }

  if (tip) {
    if (typeof tip === 'string') {
      styledButtonResult = /*#__PURE__*/_react["default"].createElement(_Tip.Tip, {
        content: tip
      }, styledButtonResult);
    } else {
      styledButtonResult = /*#__PURE__*/_react["default"].createElement(_Tip.Tip, tip, styledButtonResult);
    }
  } // if button has background or border, place badge relative
  // to outer edge of button


  if (badgeProp && !innerBadge) {
    styledButtonResult = /*#__PURE__*/_react["default"].createElement(_Badge.Badge, {
      content: badgeProp
    }, styledButtonResult);
  }

  return styledButtonResult;
});
exports.Button = Button;
Button.displayName = 'Button';
Button.propTypes = _propTypes.ButtonPropTypes;