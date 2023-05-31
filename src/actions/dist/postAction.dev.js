"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStory = exports.deletePost = exports.currentUserPost = exports.postShareAction = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postShareAction = function postShareAction(data) {
  return function _callee(dispatch) {
    var tok, response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tok = JSON.parse(localStorage.getItem("Auth")) ? JSON.parse(localStorage.getItem("Auth")).token : "";
            dispatch({
              type: "POSTSHARE_REQUEST"
            });
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:5000/apii/newPost", {
              userId: data.userid,
              image: data.pic,
              username: data.username,
              desc: data.alpha
            }, {
              headers: {
                authorization: tok
              }
            }));

          case 5:
            response = _context.sent;
            dispatch({
              type: "POSTSHARE_SUCCESS",
              data: response.data
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            dispatch({
              type: "POSTSHARE_FAILED"
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 9]]);
  };
};

exports.postShareAction = postShareAction;

var currentUserPost = function currentUserPost(id) {
  return function _callee2(dispatch) {
    var tok, response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tok = JSON.parse(localStorage.getItem("Auth")) ? JSON.parse(localStorage.getItem("Auth")).token : "";
            dispatch({
              type: "GETPOST_REQUEST"
            });
            _context2.prev = 2;
            _context2.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].get("http://localhost:5000/apii/getpost?userId=".concat(id), {
              headers: {
                authorization: tok
              }
            }));

          case 5:
            response = _context2.sent;
            console.log("currpost", response);
            dispatch({
              type: "GETPOST_SUCCESS",
              data: response
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            dispatch({
              type: "GETPOST_FAILED"
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 10]]);
  };
};

exports.currentUserPost = currentUserPost;

var deletePost = function deletePost(id) {
  return function _callee3(dispatch) {
    var tok, response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tok = JSON.parse(localStorage.getItem("Auth")) ? JSON.parse(localStorage.getItem("Auth")).token : "";
            dispatch({
              type: "DELETEPOST_REQUEST"
            });
            _context3.prev = 2;
            _context3.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:5000/apii/deletepost", {
              id: id
            }, {
              headers: {
                authorization: tok
              }
            }));

          case 5:
            response = _context3.sent;
            console.log("deele", response);
            dispatch({
              type: "DELETEPOST_SUCCESS"
            });
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](2);
            dispatch({
              type: "DELETEPOST_FAILED"
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[2, 10]]);
  };
};

exports.deletePost = deletePost;

var createStory = function createStory(data) {
  return function _callee4(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dispatch({
              type: "CREATESTORY_REQUEST"
            });
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post("http://localhost:5000/apii/createStory", {
              story: data.story,
              userId: data.userId
            }));

          case 4:
            response = _context4.sent;
            console.log("story", response);
            dispatch({
              type: "CREATESTORY_SUCCESS"
            });
            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            dispatch({
              type: "CREATESTORY_FAIL"
            });
            console.log(_context4.t0);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 9]]);
  };
};

exports.createStory = createStory;