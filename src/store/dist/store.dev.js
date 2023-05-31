"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthReducer = require("../reducers/AuthReducer");

var _redux = require("redux");

var _toolkit = require("@reduxjs/toolkit");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _reduxPersist = require("redux-persist");

var _postShareReducer = require("../reducers/postShareReducer");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var persistConfig = {
  key: "root",
  version: 1,
  storage: _storage["default"]
}; // const persistedState = loadState()

var rootreducer = (0, _redux.combineReducers)({
  ReducerLogin: _AuthReducer.ReducerLogin,
  ReducerRegister: _AuthReducer.ReducerRegister,
  postShareReducer: _postShareReducer.postShareReducer,
  getFollower: _AuthReducer.getFollower,
  getAllUserReducer: _AuthReducer.getAllUserReducer,
  followUnfollow: _AuthReducer.followUnfollow,
  currentUserReducer: _AuthReducer.currentUserReducer,
  currentPost: _postShareReducer.currentPost,
  CreatestoryReduces: _postShareReducer.CreatestoryReduces
});
var persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, rootreducer);

var storages = _storage["default"].getItem("Auth"); // const parsedStorages = JSON.parse(storages);
// console.log("st",storages.type)


var store = (0, _toolkit.configureStore)({
  reducer: persistedReducer,
  // initialState:{
  //     ReducerLogin:storages?.response ?? null
  // },
  // middleware: getDefaultMiddleware =>
  // getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
  // middleware: [thunk]
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [_reduxThunk["default"]]
});
var _default = store;
exports["default"] = _default;