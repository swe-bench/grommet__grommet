var _excluded = ["drop", "id", "responsive"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useEffect, useState } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { DataContext } from '../../contexts/DataContext';
import { DropButton } from '../DropButton';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormField } from '../FormField';
import { useSkeleton } from '../Skeleton';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { DataSearchPropTypes } from './propTypes';
import { isSmall } from '../../utils/responsive';
import { useDebounce } from '../../utils/use-debounce';
var dropProps = {
  align: {
    top: 'bottom',
    left: 'left'
  }
};

// 300ms was chosen empirically as a reasonable default
var DEBOUNCE_TIMEOUT = 300;
export var DataSearch = function DataSearch(_ref) {
  var _theme$data$button;
  var drop = _ref.drop,
    idProp = _ref.id,
    responsive = _ref.responsive,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    addToolbarKey = _useContext.addToolbarKey,
    onView = _useContext.onView,
    view = _useContext.view,
    views = _useContext.views;
  var _useContext2 = useContext(DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useContext3 = useContext(MessageContext),
    format = _useContext3.format;
  var theme = useContext(ThemeContext);
  var size = useContext(ResponsiveContext);
  var skeleton = useSkeleton();
  var debounce = useDebounce(DEBOUNCE_TIMEOUT);
  var _useState = useState(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var _useState2 = useState(view == null ? void 0 : view.search),
    value = _useState2[0],
    setValue = _useState2[1];
  var id = idProp || dataId + "--search";
  useEffect(function () {
    if (!inDataForm) addToolbarKey('_search');
  }, [addToolbarKey, inDataForm]);
  useEffect(function () {
    return setValue(view == null ? void 0 : view.search);
  }, [view == null ? void 0 : view.search]);
  var onChange = function onChange(e) {
    var _e$target, _e$target2;
    var nextValue = _extends({}, view, {
      search: (_e$target = e.target) == null ? void 0 : _e$target.value
    });

    // If there's a named view in effect that has a search term
    // we'll clear the named view (but leave it's other filters)
    var currentView = nextValue.view && (views == null ? void 0 : views.find(function (v) {
      return v.name === nextValue.view;
    }));
    if (currentView != null && currentView.search) {
      delete nextValue.view;
      delete nextValue.name;
    }
    setValue((_e$target2 = e.target) == null ? void 0 : _e$target2.value);
    debounce(function () {
      return function () {
        return onView(nextValue);
      };
    });
  };
  var content = skeleton ? null : /*#__PURE__*/React.createElement(TextInput, _extends({
    "aria-label": format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    }),
    id: id,
    name: "_search",
    icon: /*#__PURE__*/React.createElement(Search, null),
    type: "search",
    value: value,
    onChange: onChange
  }, rest));
  if (!inDataForm)
    // likely in Toolbar.
    // Wrap in Box to give it a reasonable width
    content = /*#__PURE__*/React.createElement(Box, null, content);else content = /*#__PURE__*/React.createElement(FormField, {
    htmlFor: id,
    label: format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    })
  }, content);
  if (!drop && (!responsive || !isSmall(size))) return content;
  var control = /*#__PURE__*/React.createElement(DropButton, _extends({
    id: dataId + "--search-control",
    "aria-label": format({
      id: 'dataSearch.open',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
    icon: /*#__PURE__*/React.createElement(Search, null),
    dropProps: dropProps,
    dropContent: /*#__PURE__*/React.createElement(Box, {
      pad: "small"
    }, content),
    open: showContent,
    onOpen: function onOpen() {
      return setShowContent(undefined);
    },
    onClose: function onClose() {
      return setShowContent(undefined);
    }
  }, rest));
  return control;
};
DataSearch.propTypes = DataSearchPropTypes;