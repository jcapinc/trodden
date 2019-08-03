"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Conversation = /** @class */ (function () {
    function Conversation() {
        this.nodes = [];
    }
    Conversation.prototype.add = function (nodeOrNodes) {
        if (nodeOrNodes instanceof ConversationNode) {
            return this.nodes.push(nodeOrNodes);
        }
        var last;
        for (var _i = 0, nodeOrNodes_1 = nodeOrNodes; _i < nodeOrNodes_1.length; _i++) {
            var node = nodeOrNodes_1[_i];
            last = this.add(node);
        }
        return last;
    };
    Conversation.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.nodes.map(function (node) { return node.execute(_this); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Conversation;
}());
exports.Conversation = Conversation;
var ConversationNode = /** @class */ (function () {
    function ConversationNode(io, dialogue) {
        this.io = io;
        this.dialogue = dialogue;
    }
    ConversationNode.build = function (io, dialogue) {
        return new this(io, dialogue);
    };
    ConversationNode.prototype.execute = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.io.text(this.dialogue)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ConversationNode;
}());
exports.ConversationNode = ConversationNode;
var ConversationOptionNode = /** @class */ (function (_super) {
    __extends(ConversationOptionNode, _super);
    function ConversationOptionNode(io, dialogue, options) {
        var _this = _super.call(this, io, dialogue) || this;
        _this.newline = "\n";
        _this.preamble = "Do you want to...";
        _this.invalid = "invalid choice";
        _this.options = options;
        return _this;
    }
    ConversationOptionNode.prototype.execute = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            var choice, option;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.execute.call(this, conversation);
                        return [4 /*yield*/, this.io.text(this.options.reduce(function (carry, option) {
                                carry = "" + carry + _this.newline + option.key + ": ";
                                return carry;
                            }, this.preamble))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.io.input()];
                    case 2:
                        choice = _a.sent();
                        option = this.options.find(function (option) { return option.key === choice; });
                        if (!(option === undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.io.text(this.invalid)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.execute(conversation)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/, option.action(conversation)];
                }
            });
        });
    };
    return ConversationOptionNode;
}(ConversationNode));
exports.ConversationOptionNode = ConversationOptionNode;
var ConversationInputNode = /** @class */ (function (_super) {
    __extends(ConversationInputNode, _super);
    function ConversationInputNode(io, dialogue, action, validation) {
        var _this = _super.call(this, io, dialogue) || this;
        _this.invalidResponse = "Invalid Input";
        _this.action = action;
        _this.validation = validation != undefined
            ? validation
            : function (_) { return true; };
        return _this;
    }
    ConversationInputNode.prototype.execute = function (conversation) {
        return __awaiter(this, void 0, void 0, function () {
            var choice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.execute.call(this, conversation)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.io.input()];
                    case 2:
                        choice = _a.sent();
                        if (!!this.validation(choice)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.io.text(this.invalidResponse)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.execute(conversation)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [4 /*yield*/, this.action(choice)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ConversationInputNode;
}(ConversationNode));
exports.ConversationInputNode = ConversationInputNode;
var ConversationFactory = /** @class */ (function () {
    function ConversationFactory(io) {
        this.io = io;
    }
    ConversationFactory.prototype.buildSimpleDialogue = function (dialogues) {
        var _this = this;
        var convo = new Conversation();
        dialogues.map(function (dialogue) { return convo.add(new ConversationNode(_this.io, dialogue)); });
        return convo;
    };
    return ConversationFactory;
}());
exports.ConversationFactory = ConversationFactory;
//# sourceMappingURL=Conversation.js.map