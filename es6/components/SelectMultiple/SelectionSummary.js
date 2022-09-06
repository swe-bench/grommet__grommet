import React, { useCallback } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { applyKey, getOptionValue, useDisabled } from '../Select/utils';

var SelectionSummary = function SelectionSummary(_ref) {
  var allOptions = _ref.allOptions,
      clearRef = _ref.clearRef,
      disabled = _ref.disabled,
      disabledKey = _ref.disabledKey,
      isSelected = _ref.isSelected,
      labelKey = _ref.labelKey,
      limit = _ref.limit,
      onChange = _ref.onChange,
      options = _ref.options,
      search = _ref.search,
      setActiveIndex = _ref.setActiveIndex,
      showSelectedInline = _ref.showSelectedInline,
      value = _ref.value,
      valueKey = _ref.valueKey;
  var isDisabled = useDisabled(disabled, disabledKey, options, valueKey || labelKey);
  var selectedValuesDisabled = useCallback(function () {
    var disabledSelected = 0;

    for (var i = 0; i < allOptions.length; i += 1) {
      if (value.includes(getOptionValue(i, options, valueKey || labelKey)) && isDisabled(i)) disabledSelected += 1;
    }

    if (value.length === disabledSelected) return true;
    return false;
  }, [value, allOptions, options, valueKey, labelKey, isDisabled]);
  if (search === '' || search === undefined) return /*#__PURE__*/React.createElement(Box, {
    pad: showSelectedInline ? {
      vertical: 'xsmall'
    } : 'small',
    direction: "row",
    justify: "between",
    gap: "small",
    fill: "horizontal",
    flex: true
  }, /*#__PURE__*/React.createElement(Box, {
    alignSelf: "center"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, value.length === 0 ? "0 selected" : value.length + " selected of " + options.length)), (options.length && (!limit || !(value.length === 0 && selectedValuesDisabled()))) > 0 && /*#__PURE__*/React.createElement(Button, {
    a11yTitle: value.length === 0 || selectedValuesDisabled() ? "Select all " + options.length + " options" : value.length + " options selected. Clear all?",
    label: value.length === 0 || selectedValuesDisabled() ? 'Select All' : 'Clear All',
    onClick: function onClick(event) {
      var selectAll = value.length === 0 || selectedValuesDisabled();

      if (onChange) {
        var nextSelected = options.filter(function (i, index) {
          return selectAll ? !isDisabled(index) || isSelected(index) : isDisabled(index) && isSelected(index);
        });
        var nextValue = nextSelected.map(function (i) {
          return valueKey && valueKey.reduce ? applyKey(i, valueKey) : i;
        });
        onChange(event, {
          option: options,
          value: nextValue,
          selected: nextSelected
        });
      }

      if (limit && !selectAll) setActiveIndex(0);
    },
    onFocus: function onFocus() {
      return setActiveIndex(-1);
    },
    ref: clearRef
  }));
  return /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }, value.length + " selected");
};

export { SelectionSummary };