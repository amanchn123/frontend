"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatestoryReduces = exports.deletePost = exports.currentPost = exports.postShareReducer = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var postShareReducer = function postShareReducer(state, action) {
  switch (action.type) {
    case "POSTSHARE_REQUEST":
      return _objectSpread({}, state, {
        loading: true
      });

    case "POSTSHARE_SUCCESS":
      return _objectSpread({}, state, {
        postData: action.data,
        loading: false
      });

    case "POSTSHARE_SUCCESS":
      return _objectSpread({}, state, {
        loading: false
      });

    default:
      return _objectSpread({}, state);
  }
};

exports.postShareReducer = postShareReducer;

var currentPost = function currentPost(state, action) {
  switch (action.type) {
    case "GETPOST_REQUEST":
      return _objectSpread({}, state, {
        loading: true
      });

    case "GETPOST_SUCCESS":
      return _objectSpread({}, state, {
        data: action.data.data,
        loading: false
      });

    case "GETPOST_FAILED":
      return _objectSpread({}, state, {
        loading: false
      });

    default:
      return _objectSpread({}, state);
  }
};

exports.currentPost = currentPost;

var deletePost = function deletePost(state, action) {
  switch (action.type) {
    case "DELETEPOST_REQUEST":
      return _objectSpread({}, state);

    case "DELETEPOST_SUCCESS":
      return _objectSpread({}, state);
  }
};

exports.deletePost = deletePost;

var CreatestoryReduces = function CreatestoryReduces(state, action) {
  switch (action.type) {
    case "CREATESTORY_REQUEST":
      return _objectSpread({}, state);

    case "CREATESTORY_SUCCESS":
      return _objectSpread({}, state, {
        data: action.data
      });

    case "CREATESTORY_FAIL":
      return _objectSpread({}, state);

    default:
      return _objectSpread({}, state);
  }
};

exports.CreatestoryReduces = CreatestoryReduces;