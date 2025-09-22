#!/usr/bin/env node
import { createRequire } from "node:module";
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = /* @__PURE__ */ createRequire(import.meta.url);

// node_modules/yoctocolors-cjs/index.js
var require_yoctocolors_cjs = __commonJS((exports, module) => {
  var tty = __require("node:tty");
  var hasColors = tty?.WriteStream?.prototype?.hasColors?.() ?? false;
  var format = (open, close) => {
    if (!hasColors) {
      return (input) => input;
    }
    const openCode = `\x1B[${open}m`;
    const closeCode = `\x1B[${close}m`;
    return (input) => {
      const string = input + "";
      let index = string.indexOf(closeCode);
      if (index === -1) {
        return openCode + string + closeCode;
      }
      let result = openCode;
      let lastIndex = 0;
      const reopenOnNestedClose = close === 22;
      const replaceCode = (reopenOnNestedClose ? closeCode : "") + openCode;
      while (index !== -1) {
        result += string.slice(lastIndex, index) + replaceCode;
        lastIndex = index + closeCode.length;
        index = string.indexOf(closeCode, lastIndex);
      }
      result += string.slice(lastIndex) + closeCode;
      return result;
    };
  };
  var colors = {};
  colors.reset = format(0, 0);
  colors.bold = format(1, 22);
  colors.dim = format(2, 22);
  colors.italic = format(3, 23);
  colors.underline = format(4, 24);
  colors.overline = format(53, 55);
  colors.inverse = format(7, 27);
  colors.hidden = format(8, 28);
  colors.strikethrough = format(9, 29);
  colors.black = format(30, 39);
  colors.red = format(31, 39);
  colors.green = format(32, 39);
  colors.yellow = format(33, 39);
  colors.blue = format(34, 39);
  colors.magenta = format(35, 39);
  colors.cyan = format(36, 39);
  colors.white = format(37, 39);
  colors.gray = format(90, 39);
  colors.bgBlack = format(40, 49);
  colors.bgRed = format(41, 49);
  colors.bgGreen = format(42, 49);
  colors.bgYellow = format(43, 49);
  colors.bgBlue = format(44, 49);
  colors.bgMagenta = format(45, 49);
  colors.bgCyan = format(46, 49);
  colors.bgWhite = format(47, 49);
  colors.bgGray = format(100, 49);
  colors.redBright = format(91, 39);
  colors.greenBright = format(92, 39);
  colors.yellowBright = format(93, 39);
  colors.blueBright = format(94, 39);
  colors.magentaBright = format(95, 39);
  colors.cyanBright = format(96, 39);
  colors.whiteBright = format(97, 39);
  colors.bgRedBright = format(101, 49);
  colors.bgGreenBright = format(102, 49);
  colors.bgYellowBright = format(103, 49);
  colors.bgBlueBright = format(104, 49);
  colors.bgMagentaBright = format(105, 49);
  colors.bgCyanBright = format(106, 49);
  colors.bgWhiteBright = format(107, 49);
  module.exports = colors;
});

// node_modules/cli-width/index.js
var require_cli_width = __commonJS((exports, module) => {
  module.exports = cliWidth;
  function normalizeOpts(options) {
    const defaultOpts = {
      defaultWidth: 0,
      output: process.stdout,
      tty: __require("tty")
    };
    if (!options) {
      return defaultOpts;
    }
    Object.keys(defaultOpts).forEach(function(key) {
      if (!options[key]) {
        options[key] = defaultOpts[key];
      }
    });
    return options;
  }
  function cliWidth(options) {
    const opts = normalizeOpts(options);
    if (opts.output.getWindowSize) {
      return opts.output.getWindowSize()[0] || opts.defaultWidth;
    }
    if (opts.tty.getWindowSize) {
      return opts.tty.getWindowSize()[1] || opts.defaultWidth;
    }
    if (opts.output.columns) {
      return opts.output.columns;
    }
    if (process.env.CLI_WIDTH) {
      const width = parseInt(process.env.CLI_WIDTH, 10);
      if (!isNaN(width) && width !== 0) {
        return width;
      }
    }
    return opts.defaultWidth;
  }
});

// node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS((exports, module) => {
  module.exports = ({ onlyFirst = false } = {}) => {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(pattern, onlyFirst ? undefined : "g");
  };
});

// node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS((exports, module) => {
  var ansiRegex = require_ansi_regex();
  module.exports = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
});

// node_modules/is-fullwidth-code-point/index.js
var require_is_fullwidth_code_point = __commonJS((exports, module) => {
  var isFullwidthCodePoint = (codePoint) => {
    if (Number.isNaN(codePoint)) {
      return false;
    }
    if (codePoint >= 4352 && (codePoint <= 4447 || codePoint === 9001 || codePoint === 9002 || 11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || 12880 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65131 || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 262141)) {
      return true;
    }
    return false;
  };
  module.exports = isFullwidthCodePoint;
  module.exports.default = isFullwidthCodePoint;
});

// node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS((exports, module) => {
  module.exports = function() {
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
  };
});

// node_modules/string-width/index.js
var require_string_width = __commonJS((exports, module) => {
  var stripAnsi = require_strip_ansi();
  var isFullwidthCodePoint = require_is_fullwidth_code_point();
  var emojiRegex = require_emoji_regex();
  var stringWidth = (string) => {
    if (typeof string !== "string" || string.length === 0) {
      return 0;
    }
    string = stripAnsi(string);
    if (string.length === 0) {
      return 0;
    }
    string = string.replace(emojiRegex(), "  ");
    let width = 0;
    for (let i = 0;i < string.length; i++) {
      const code = string.codePointAt(i);
      if (code <= 31 || code >= 127 && code <= 159) {
        continue;
      }
      if (code >= 768 && code <= 879) {
        continue;
      }
      if (code > 65535) {
        i++;
      }
      width += isFullwidthCodePoint(code) ? 2 : 1;
    }
    return width;
  };
  module.exports = stringWidth;
  module.exports.default = stringWidth;
});

// node_modules/color-name/index.js
var require_color_name = __commonJS((exports, module) => {
  module.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS((exports, module) => {
  var cssKeywords = require_color_name();
  var reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  var convert = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  module.exports = convert;
  for (const model of Object.keys(convert)) {
    if (!("channels" in convert[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert[model].labels.length !== convert[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const { channels, labels } = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", { value: channels });
    Object.defineProperty(convert[model], "labels", { value: labels });
  }
  convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)) {
      const value = cssKeywords[keyword];
      const distance = comparativeDistance(rgb, value);
      if (distance < currentClosestDistance) {
        currentClosestDistance = distance;
        currentClosestKeyword = keyword;
      }
    }
    return currentClosestKeyword;
  };
  convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    const t1 = 2 * l - t2;
    const rgb = [0, 0, 0];
    for (let i = 0;i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 0.0031308 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g = g > 0.0031308 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
    b = b > 0.0031308 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a, b];
  };
  convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert.hsv.ansi16 = function(args) {
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
  };
  convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert.ansi16.rgb = function(args) {
    let color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    let colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map((char) => {
        return char + char;
      }).join("");
    }
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 255;
    const g = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g, b];
  };
  convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    const pure = [0, 0, 0];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert.gray.hsv = convert.gray.hsl;
  convert.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
});

// node_modules/color-convert/route.js
var require_route = __commonJS((exports, module) => {
  var conversions = require_conversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions);
    for (let len = models.length, i = 0;i < len; i++) {
      graph[models[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      const current = queue.pop();
      const adjacents = Object.keys(conversions[current]);
      for (let len = adjacents.length, i = 0;i < len; i++) {
        const adjacent = adjacents[i];
        const node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path = [graph[toModel].parent, toModel];
    let fn = conversions[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
  }
  module.exports = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0;i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS((exports, module) => {
  var conversions = require_conversions();
  var route = require_route();
  var convert = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === undefined || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    const wrappedFn = function(...args) {
      const arg0 = args[0];
      if (arg0 === undefined || arg0 === null) {
        return arg0;
      }
      if (arg0.length > 1) {
        args = arg0;
      }
      const result = fn(args);
      if (typeof result === "object") {
        for (let len = result.length, i = 0;i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
    Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  module.exports = convert;
});

// node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS((exports, module) => {
  var wrapAnsi16 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `\x1B[${code + offset}m`;
  };
  var wrapAnsi256 = (fn, offset) => (...args) => {
    const code = fn(...args);
    return `\x1B[${38 + offset};5;${code}m`;
  };
  var wrapAnsi16m = (fn, offset) => (...args) => {
    const rgb = fn(...args);
    return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  };
  var ansi2ansi = (n) => n;
  var rgb2rgb = (r, g, b) => [r, g, b];
  var setLazyProperty = (object, property, get) => {
    Object.defineProperty(object, property, {
      get: () => {
        const value = get();
        Object.defineProperty(object, property, {
          value,
          enumerable: true,
          configurable: true
        });
        return value;
      },
      enumerable: true,
      configurable: true
    });
  };
  var colorConvert;
  var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
    if (colorConvert === undefined) {
      colorConvert = require_color_convert();
    }
    const offset = isBackground ? 10 : 0;
    const styles = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
      const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles[name] = wrap(identity, offset);
      } else if (typeof suite === "object") {
        styles[name] = wrap(suite[targetSpace], offset);
      }
    }
    return styles;
  };
  function assembleStyles() {
    const codes = new Map;
    const styles = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
    setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
    return styles;
  }
  Object.defineProperty(module, "exports", {
    enumerable: true,
    get: assembleStyles
  });
});

// node_modules/wrap-ansi/index.js
var require_wrap_ansi = __commonJS((exports, module) => {
  var stringWidth = require_string_width();
  var stripAnsi = require_strip_ansi();
  var ansiStyles = require_ansi_styles();
  var ESCAPES = new Set([
    "\x1B",
    ""
  ]);
  var END_CODE = 39;
  var wrapAnsi = (code) => `${ESCAPES.values().next().value}[${code}m`;
  var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
  var wrapWord = (rows, word, columns) => {
    const characters = [...word];
    let isInsideEscape = false;
    let visible = stringWidth(stripAnsi(rows[rows.length - 1]));
    for (const [index, character] of characters.entries()) {
      const characterLength = stringWidth(character);
      if (visible + characterLength <= columns) {
        rows[rows.length - 1] += character;
      } else {
        rows.push(character);
        visible = 0;
      }
      if (ESCAPES.has(character)) {
        isInsideEscape = true;
      } else if (isInsideEscape && character === "m") {
        isInsideEscape = false;
        continue;
      }
      if (isInsideEscape) {
        continue;
      }
      visible += characterLength;
      if (visible === columns && index < characters.length - 1) {
        rows.push("");
        visible = 0;
      }
    }
    if (!visible && rows[rows.length - 1].length > 0 && rows.length > 1) {
      rows[rows.length - 2] += rows.pop();
    }
  };
  var stringVisibleTrimSpacesRight = (str) => {
    const words = str.split(" ");
    let last = words.length;
    while (last > 0) {
      if (stringWidth(words[last - 1]) > 0) {
        break;
      }
      last--;
    }
    if (last === words.length) {
      return str;
    }
    return words.slice(0, last).join(" ") + words.slice(last).join("");
  };
  var exec = (string, columns, options = {}) => {
    if (options.trim !== false && string.trim() === "") {
      return "";
    }
    let pre = "";
    let ret = "";
    let escapeCode;
    const lengths = wordLengths(string);
    let rows = [""];
    for (const [index, word] of string.split(" ").entries()) {
      if (options.trim !== false) {
        rows[rows.length - 1] = rows[rows.length - 1].trimLeft();
      }
      let rowLength = stringWidth(rows[rows.length - 1]);
      if (index !== 0) {
        if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
          rows.push("");
          rowLength = 0;
        }
        if (rowLength > 0 || options.trim === false) {
          rows[rows.length - 1] += " ";
          rowLength++;
        }
      }
      if (options.hard && lengths[index] > columns) {
        const remainingColumns = columns - rowLength;
        const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
        const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
        if (breaksStartingNextLine < breaksStartingThisLine) {
          rows.push("");
        }
        wrapWord(rows, word, columns);
        continue;
      }
      if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
        if (options.wordWrap === false && rowLength < columns) {
          wrapWord(rows, word, columns);
          continue;
        }
        rows.push("");
      }
      if (rowLength + lengths[index] > columns && options.wordWrap === false) {
        wrapWord(rows, word, columns);
        continue;
      }
      rows[rows.length - 1] += word;
    }
    if (options.trim !== false) {
      rows = rows.map(stringVisibleTrimSpacesRight);
    }
    pre = rows.join(`
`);
    for (const [index, character] of [...pre].entries()) {
      ret += character;
      if (ESCAPES.has(character)) {
        const code2 = parseFloat(/\d[^m]*/.exec(pre.slice(index, index + 4)));
        escapeCode = code2 === END_CODE ? null : code2;
      }
      const code = ansiStyles.codes.get(Number(escapeCode));
      if (escapeCode && code) {
        if (pre[index + 1] === `
`) {
          ret += wrapAnsi(code);
        } else if (character === `
`) {
          ret += wrapAnsi(escapeCode);
        }
      }
    }
    return ret;
  };
  module.exports = (string, columns, options) => {
    return String(string).normalize().replace(/\r\n/g, `
`).split(`
`).map((line) => exec(line, columns, options)).join(`
`);
  };
});

// node_modules/mute-stream/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var Stream = __require("stream");

  class MuteStream extends Stream {
    #isTTY = null;
    constructor(opts = {}) {
      super(opts);
      this.writable = this.readable = true;
      this.muted = false;
      this.on("pipe", this._onpipe);
      this.replace = opts.replace;
      this._prompt = opts.prompt || null;
      this._hadControl = false;
    }
    #destSrc(key, def) {
      if (this._dest) {
        return this._dest[key];
      }
      if (this._src) {
        return this._src[key];
      }
      return def;
    }
    #proxy(method, ...args) {
      if (typeof this._dest?.[method] === "function") {
        this._dest[method](...args);
      }
      if (typeof this._src?.[method] === "function") {
        this._src[method](...args);
      }
    }
    get isTTY() {
      if (this.#isTTY !== null) {
        return this.#isTTY;
      }
      return this.#destSrc("isTTY", false);
    }
    set isTTY(val) {
      this.#isTTY = val;
    }
    get rows() {
      return this.#destSrc("rows");
    }
    get columns() {
      return this.#destSrc("columns");
    }
    mute() {
      this.muted = true;
    }
    unmute() {
      this.muted = false;
    }
    _onpipe(src) {
      this._src = src;
    }
    pipe(dest, options) {
      this._dest = dest;
      return super.pipe(dest, options);
    }
    pause() {
      if (this._src) {
        return this._src.pause();
      }
    }
    resume() {
      if (this._src) {
        return this._src.resume();
      }
    }
    write(c) {
      if (this.muted) {
        if (!this.replace) {
          return true;
        }
        if (c.match(/^\u001b/)) {
          if (c.indexOf(this._prompt) === 0) {
            c = c.slice(this._prompt.length);
            c = c.replace(/./g, this.replace);
            c = this._prompt + c;
          }
          this._hadControl = true;
          return this.emit("data", c);
        } else {
          if (this._prompt && this._hadControl && c.indexOf(this._prompt) === 0) {
            this._hadControl = false;
            this.emit("data", this._prompt);
            c = c.slice(this._prompt.length);
          }
          c = c.toString().replace(/./g, this.replace);
        }
      }
      this.emit("data", c);
    }
    end(c) {
      if (this.muted) {
        if (c && this.replace) {
          c = c.toString().replace(/./g, this.replace);
        } else {
          c = null;
        }
      }
      if (c) {
        this.emit("data", c);
      }
      this.emit("end");
    }
    destroy(...args) {
      return this.#proxy("destroy", ...args);
    }
    destroySoon(...args) {
      return this.#proxy("destroySoon", ...args);
    }
    close(...args) {
      return this.#proxy("close", ...args);
    }
  }
  module.exports = MuteStream;
});

// node_modules/commander/lib/error.js
var require_error = __commonJS((exports) => {
  class CommanderError extends Error {
    constructor(exitCode, code, message) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      this.code = code;
      this.exitCode = exitCode;
      this.nestedError = undefined;
    }
  }

  class InvalidArgumentError extends CommanderError {
    constructor(message) {
      super(1, "commander.invalidArgument", message);
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
    }
  }
  exports.CommanderError = CommanderError;
  exports.InvalidArgumentError = InvalidArgumentError;
});

// node_modules/commander/lib/argument.js
var require_argument = __commonJS((exports) => {
  var { InvalidArgumentError } = require_error();

  class Argument {
    constructor(name, description) {
      this.description = description || "";
      this.variadic = false;
      this.parseArg = undefined;
      this.defaultValue = undefined;
      this.defaultValueDescription = undefined;
      this.argChoices = undefined;
      switch (name[0]) {
        case "<":
          this.required = true;
          this._name = name.slice(1, -1);
          break;
        case "[":
          this.required = false;
          this._name = name.slice(1, -1);
          break;
        default:
          this.required = true;
          this._name = name;
          break;
      }
      if (this._name.length > 3 && this._name.slice(-3) === "...") {
        this.variadic = true;
        this._name = this._name.slice(0, -3);
      }
    }
    name() {
      return this._name;
    }
    _concatValue(value, previous) {
      if (previous === this.defaultValue || !Array.isArray(previous)) {
        return [value];
      }
      return previous.concat(value);
    }
    default(value, description) {
      this.defaultValue = value;
      this.defaultValueDescription = description;
      return this;
    }
    argParser(fn) {
      this.parseArg = fn;
      return this;
    }
    choices(values) {
      this.argChoices = values.slice();
      this.parseArg = (arg, previous) => {
        if (!this.argChoices.includes(arg)) {
          throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(", ")}.`);
        }
        if (this.variadic) {
          return this._concatValue(arg, previous);
        }
        return arg;
      };
      return this;
    }
    argRequired() {
      this.required = true;
      return this;
    }
    argOptional() {
      this.required = false;
      return this;
    }
  }
  function humanReadableArgName(arg) {
    const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
    return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
  }
  exports.Argument = Argument;
  exports.humanReadableArgName = humanReadableArgName;
});

// node_modules/commander/lib/help.js
var require_help = __commonJS((exports) => {
  var { humanReadableArgName } = require_argument();

  class Help {
    constructor() {
      this.helpWidth = undefined;
      this.sortSubcommands = false;
      this.sortOptions = false;
      this.showGlobalOptions = false;
    }
    visibleCommands(cmd) {
      const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
      const helpCommand = cmd._getHelpCommand();
      if (helpCommand && !helpCommand._hidden) {
        visibleCommands.push(helpCommand);
      }
      if (this.sortSubcommands) {
        visibleCommands.sort((a, b) => {
          return a.name().localeCompare(b.name());
        });
      }
      return visibleCommands;
    }
    compareOptions(a, b) {
      const getSortKey = (option) => {
        return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
      };
      return getSortKey(a).localeCompare(getSortKey(b));
    }
    visibleOptions(cmd) {
      const visibleOptions = cmd.options.filter((option) => !option.hidden);
      const helpOption = cmd._getHelpOption();
      if (helpOption && !helpOption.hidden) {
        const removeShort = helpOption.short && cmd._findOption(helpOption.short);
        const removeLong = helpOption.long && cmd._findOption(helpOption.long);
        if (!removeShort && !removeLong) {
          visibleOptions.push(helpOption);
        } else if (helpOption.long && !removeLong) {
          visibleOptions.push(cmd.createOption(helpOption.long, helpOption.description));
        } else if (helpOption.short && !removeShort) {
          visibleOptions.push(cmd.createOption(helpOption.short, helpOption.description));
        }
      }
      if (this.sortOptions) {
        visibleOptions.sort(this.compareOptions);
      }
      return visibleOptions;
    }
    visibleGlobalOptions(cmd) {
      if (!this.showGlobalOptions)
        return [];
      const globalOptions = [];
      for (let ancestorCmd = cmd.parent;ancestorCmd; ancestorCmd = ancestorCmd.parent) {
        const visibleOptions = ancestorCmd.options.filter((option) => !option.hidden);
        globalOptions.push(...visibleOptions);
      }
      if (this.sortOptions) {
        globalOptions.sort(this.compareOptions);
      }
      return globalOptions;
    }
    visibleArguments(cmd) {
      if (cmd._argsDescription) {
        cmd.registeredArguments.forEach((argument) => {
          argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
        });
      }
      if (cmd.registeredArguments.find((argument) => argument.description)) {
        return cmd.registeredArguments;
      }
      return [];
    }
    subcommandTerm(cmd) {
      const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
      return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + (args ? " " + args : "");
    }
    optionTerm(option) {
      return option.flags;
    }
    argumentTerm(argument) {
      return argument.name();
    }
    longestSubcommandTermLength(cmd, helper) {
      return helper.visibleCommands(cmd).reduce((max, command) => {
        return Math.max(max, helper.subcommandTerm(command).length);
      }, 0);
    }
    longestOptionTermLength(cmd, helper) {
      return helper.visibleOptions(cmd).reduce((max, option) => {
        return Math.max(max, helper.optionTerm(option).length);
      }, 0);
    }
    longestGlobalOptionTermLength(cmd, helper) {
      return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
        return Math.max(max, helper.optionTerm(option).length);
      }, 0);
    }
    longestArgumentTermLength(cmd, helper) {
      return helper.visibleArguments(cmd).reduce((max, argument) => {
        return Math.max(max, helper.argumentTerm(argument).length);
      }, 0);
    }
    commandUsage(cmd) {
      let cmdName = cmd._name;
      if (cmd._aliases[0]) {
        cmdName = cmdName + "|" + cmd._aliases[0];
      }
      let ancestorCmdNames = "";
      for (let ancestorCmd = cmd.parent;ancestorCmd; ancestorCmd = ancestorCmd.parent) {
        ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
      }
      return ancestorCmdNames + cmdName + " " + cmd.usage();
    }
    commandDescription(cmd) {
      return cmd.description();
    }
    subcommandDescription(cmd) {
      return cmd.summary() || cmd.description();
    }
    optionDescription(option) {
      const extraInfo = [];
      if (option.argChoices) {
        extraInfo.push(`choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`);
      }
      if (option.defaultValue !== undefined) {
        const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
        if (showDefault) {
          extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
        }
      }
      if (option.presetArg !== undefined && option.optional) {
        extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
      }
      if (option.envVar !== undefined) {
        extraInfo.push(`env: ${option.envVar}`);
      }
      if (extraInfo.length > 0) {
        return `${option.description} (${extraInfo.join(", ")})`;
      }
      return option.description;
    }
    argumentDescription(argument) {
      const extraInfo = [];
      if (argument.argChoices) {
        extraInfo.push(`choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`);
      }
      if (argument.defaultValue !== undefined) {
        extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
      }
      if (extraInfo.length > 0) {
        const extraDescripton = `(${extraInfo.join(", ")})`;
        if (argument.description) {
          return `${argument.description} ${extraDescripton}`;
        }
        return extraDescripton;
      }
      return argument.description;
    }
    formatHelp(cmd, helper) {
      const termWidth = helper.padWidth(cmd, helper);
      const helpWidth = helper.helpWidth || 80;
      const itemIndentWidth = 2;
      const itemSeparatorWidth = 2;
      function formatItem(term, description) {
        if (description) {
          const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
          return helper.wrap(fullText, helpWidth - itemIndentWidth, termWidth + itemSeparatorWidth);
        }
        return term;
      }
      function formatList(textArray) {
        return textArray.join(`
`).replace(/^/gm, " ".repeat(itemIndentWidth));
      }
      let output = [`Usage: ${helper.commandUsage(cmd)}`, ""];
      const commandDescription = helper.commandDescription(cmd);
      if (commandDescription.length > 0) {
        output = output.concat([
          helper.wrap(commandDescription, helpWidth, 0),
          ""
        ]);
      }
      const argumentList = helper.visibleArguments(cmd).map((argument) => {
        return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument));
      });
      if (argumentList.length > 0) {
        output = output.concat(["Arguments:", formatList(argumentList), ""]);
      }
      const optionList = helper.visibleOptions(cmd).map((option) => {
        return formatItem(helper.optionTerm(option), helper.optionDescription(option));
      });
      if (optionList.length > 0) {
        output = output.concat(["Options:", formatList(optionList), ""]);
      }
      if (this.showGlobalOptions) {
        const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
          return formatItem(helper.optionTerm(option), helper.optionDescription(option));
        });
        if (globalOptionList.length > 0) {
          output = output.concat([
            "Global Options:",
            formatList(globalOptionList),
            ""
          ]);
        }
      }
      const commandList = helper.visibleCommands(cmd).map((cmd2) => {
        return formatItem(helper.subcommandTerm(cmd2), helper.subcommandDescription(cmd2));
      });
      if (commandList.length > 0) {
        output = output.concat(["Commands:", formatList(commandList), ""]);
      }
      return output.join(`
`);
    }
    padWidth(cmd, helper) {
      return Math.max(helper.longestOptionTermLength(cmd, helper), helper.longestGlobalOptionTermLength(cmd, helper), helper.longestSubcommandTermLength(cmd, helper), helper.longestArgumentTermLength(cmd, helper));
    }
    wrap(str, width, indent, minColumnWidth = 40) {
      const indents = " \\f\\t\\v   -   　\uFEFF";
      const manualIndent = new RegExp(`[\\n][${indents}]+`);
      if (str.match(manualIndent))
        return str;
      const columnWidth = width - indent;
      if (columnWidth < minColumnWidth)
        return str;
      const leadingStr = str.slice(0, indent);
      const columnText = str.slice(indent).replace(`\r
`, `
`);
      const indentString = " ".repeat(indent);
      const zeroWidthSpace = "​";
      const breaks = `\\s${zeroWidthSpace}`;
      const regex = new RegExp(`
|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`, "g");
      const lines = columnText.match(regex) || [];
      return leadingStr + lines.map((line, i) => {
        if (line === `
`)
          return "";
        return (i > 0 ? indentString : "") + line.trimEnd();
      }).join(`
`);
    }
  }
  exports.Help = Help;
});

// node_modules/commander/lib/option.js
var require_option = __commonJS((exports) => {
  var { InvalidArgumentError } = require_error();

  class Option {
    constructor(flags, description) {
      this.flags = flags;
      this.description = description || "";
      this.required = flags.includes("<");
      this.optional = flags.includes("[");
      this.variadic = /\w\.\.\.[>\]]$/.test(flags);
      this.mandatory = false;
      const optionFlags = splitOptionFlags(flags);
      this.short = optionFlags.shortFlag;
      this.long = optionFlags.longFlag;
      this.negate = false;
      if (this.long) {
        this.negate = this.long.startsWith("--no-");
      }
      this.defaultValue = undefined;
      this.defaultValueDescription = undefined;
      this.presetArg = undefined;
      this.envVar = undefined;
      this.parseArg = undefined;
      this.hidden = false;
      this.argChoices = undefined;
      this.conflictsWith = [];
      this.implied = undefined;
    }
    default(value, description) {
      this.defaultValue = value;
      this.defaultValueDescription = description;
      return this;
    }
    preset(arg) {
      this.presetArg = arg;
      return this;
    }
    conflicts(names) {
      this.conflictsWith = this.conflictsWith.concat(names);
      return this;
    }
    implies(impliedOptionValues) {
      let newImplied = impliedOptionValues;
      if (typeof impliedOptionValues === "string") {
        newImplied = { [impliedOptionValues]: true };
      }
      this.implied = Object.assign(this.implied || {}, newImplied);
      return this;
    }
    env(name) {
      this.envVar = name;
      return this;
    }
    argParser(fn) {
      this.parseArg = fn;
      return this;
    }
    makeOptionMandatory(mandatory = true) {
      this.mandatory = !!mandatory;
      return this;
    }
    hideHelp(hide = true) {
      this.hidden = !!hide;
      return this;
    }
    _concatValue(value, previous) {
      if (previous === this.defaultValue || !Array.isArray(previous)) {
        return [value];
      }
      return previous.concat(value);
    }
    choices(values) {
      this.argChoices = values.slice();
      this.parseArg = (arg, previous) => {
        if (!this.argChoices.includes(arg)) {
          throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(", ")}.`);
        }
        if (this.variadic) {
          return this._concatValue(arg, previous);
        }
        return arg;
      };
      return this;
    }
    name() {
      if (this.long) {
        return this.long.replace(/^--/, "");
      }
      return this.short.replace(/^-/, "");
    }
    attributeName() {
      return camelcase(this.name().replace(/^no-/, ""));
    }
    is(arg) {
      return this.short === arg || this.long === arg;
    }
    isBoolean() {
      return !this.required && !this.optional && !this.negate;
    }
  }

  class DualOptions {
    constructor(options) {
      this.positiveOptions = new Map;
      this.negativeOptions = new Map;
      this.dualOptions = new Set;
      options.forEach((option) => {
        if (option.negate) {
          this.negativeOptions.set(option.attributeName(), option);
        } else {
          this.positiveOptions.set(option.attributeName(), option);
        }
      });
      this.negativeOptions.forEach((value, key2) => {
        if (this.positiveOptions.has(key2)) {
          this.dualOptions.add(key2);
        }
      });
    }
    valueFromOption(value, option) {
      const optionKey = option.attributeName();
      if (!this.dualOptions.has(optionKey))
        return true;
      const preset = this.negativeOptions.get(optionKey).presetArg;
      const negativeValue = preset !== undefined ? preset : false;
      return option.negate === (negativeValue === value);
    }
  }
  function camelcase(str) {
    return str.split("-").reduce((str2, word) => {
      return str2 + word[0].toUpperCase() + word.slice(1);
    });
  }
  function splitOptionFlags(flags) {
    let shortFlag;
    let longFlag;
    const flagParts = flags.split(/[ |,]+/);
    if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1]))
      shortFlag = flagParts.shift();
    longFlag = flagParts.shift();
    if (!shortFlag && /^-[^-]$/.test(longFlag)) {
      shortFlag = longFlag;
      longFlag = undefined;
    }
    return { shortFlag, longFlag };
  }
  exports.Option = Option;
  exports.DualOptions = DualOptions;
});

// node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS((exports) => {
  var maxDistance = 3;
  function editDistance(a, b) {
    if (Math.abs(a.length - b.length) > maxDistance)
      return Math.max(a.length, b.length);
    const d = [];
    for (let i = 0;i <= a.length; i++) {
      d[i] = [i];
    }
    for (let j = 0;j <= b.length; j++) {
      d[0][j] = j;
    }
    for (let j = 1;j <= b.length; j++) {
      for (let i = 1;i <= a.length; i++) {
        let cost = 1;
        if (a[i - 1] === b[j - 1]) {
          cost = 0;
        } else {
          cost = 1;
        }
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[a.length][b.length];
  }
  function suggestSimilar(word, candidates) {
    if (!candidates || candidates.length === 0)
      return "";
    candidates = Array.from(new Set(candidates));
    const searchingOptions = word.startsWith("--");
    if (searchingOptions) {
      word = word.slice(2);
      candidates = candidates.map((candidate) => candidate.slice(2));
    }
    let similar = [];
    let bestDistance = maxDistance;
    const minSimilarity = 0.4;
    candidates.forEach((candidate) => {
      if (candidate.length <= 1)
        return;
      const distance = editDistance(word, candidate);
      const length = Math.max(word.length, candidate.length);
      const similarity = (length - distance) / length;
      if (similarity > minSimilarity) {
        if (distance < bestDistance) {
          bestDistance = distance;
          similar = [candidate];
        } else if (distance === bestDistance) {
          similar.push(candidate);
        }
      }
    });
    similar.sort((a, b) => a.localeCompare(b));
    if (searchingOptions) {
      similar = similar.map((candidate) => `--${candidate}`);
    }
    if (similar.length > 1) {
      return `
(Did you mean one of ${similar.join(", ")}?)`;
    }
    if (similar.length === 1) {
      return `
(Did you mean ${similar[0]}?)`;
    }
    return "";
  }
  exports.suggestSimilar = suggestSimilar;
});

// node_modules/commander/lib/command.js
var require_command = __commonJS((exports) => {
  var EventEmitter = __require("node:events").EventEmitter;
  var childProcess = __require("node:child_process");
  var path = __require("node:path");
  var fs = __require("node:fs");
  var process4 = __require("node:process");
  var { Argument, humanReadableArgName } = require_argument();
  var { CommanderError } = require_error();
  var { Help } = require_help();
  var { Option, DualOptions } = require_option();
  var { suggestSimilar } = require_suggestSimilar();

  class Command extends EventEmitter {
    constructor(name) {
      super();
      this.commands = [];
      this.options = [];
      this.parent = null;
      this._allowUnknownOption = false;
      this._allowExcessArguments = true;
      this.registeredArguments = [];
      this._args = this.registeredArguments;
      this.args = [];
      this.rawArgs = [];
      this.processedArgs = [];
      this._scriptPath = null;
      this._name = name || "";
      this._optionValues = {};
      this._optionValueSources = {};
      this._storeOptionsAsProperties = false;
      this._actionHandler = null;
      this._executableHandler = false;
      this._executableFile = null;
      this._executableDir = null;
      this._defaultCommandName = null;
      this._exitCallback = null;
      this._aliases = [];
      this._combineFlagAndOptionalValue = true;
      this._description = "";
      this._summary = "";
      this._argsDescription = undefined;
      this._enablePositionalOptions = false;
      this._passThroughOptions = false;
      this._lifeCycleHooks = {};
      this._showHelpAfterError = false;
      this._showSuggestionAfterError = true;
      this._outputConfiguration = {
        writeOut: (str) => process4.stdout.write(str),
        writeErr: (str) => process4.stderr.write(str),
        getOutHelpWidth: () => process4.stdout.isTTY ? process4.stdout.columns : undefined,
        getErrHelpWidth: () => process4.stderr.isTTY ? process4.stderr.columns : undefined,
        outputError: (str, write) => write(str)
      };
      this._hidden = false;
      this._helpOption = undefined;
      this._addImplicitHelpCommand = undefined;
      this._helpCommand = undefined;
      this._helpConfiguration = {};
    }
    copyInheritedSettings(sourceCommand) {
      this._outputConfiguration = sourceCommand._outputConfiguration;
      this._helpOption = sourceCommand._helpOption;
      this._helpCommand = sourceCommand._helpCommand;
      this._helpConfiguration = sourceCommand._helpConfiguration;
      this._exitCallback = sourceCommand._exitCallback;
      this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
      this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
      this._allowExcessArguments = sourceCommand._allowExcessArguments;
      this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
      this._showHelpAfterError = sourceCommand._showHelpAfterError;
      this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
      return this;
    }
    _getCommandAndAncestors() {
      const result = [];
      for (let command = this;command; command = command.parent) {
        result.push(command);
      }
      return result;
    }
    command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
      let desc = actionOptsOrExecDesc;
      let opts = execOpts;
      if (typeof desc === "object" && desc !== null) {
        opts = desc;
        desc = null;
      }
      opts = opts || {};
      const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
      const cmd = this.createCommand(name);
      if (desc) {
        cmd.description(desc);
        cmd._executableHandler = true;
      }
      if (opts.isDefault)
        this._defaultCommandName = cmd._name;
      cmd._hidden = !!(opts.noHelp || opts.hidden);
      cmd._executableFile = opts.executableFile || null;
      if (args)
        cmd.arguments(args);
      this._registerCommand(cmd);
      cmd.parent = this;
      cmd.copyInheritedSettings(this);
      if (desc)
        return this;
      return cmd;
    }
    createCommand(name) {
      return new Command(name);
    }
    createHelp() {
      return Object.assign(new Help, this.configureHelp());
    }
    configureHelp(configuration) {
      if (configuration === undefined)
        return this._helpConfiguration;
      this._helpConfiguration = configuration;
      return this;
    }
    configureOutput(configuration) {
      if (configuration === undefined)
        return this._outputConfiguration;
      Object.assign(this._outputConfiguration, configuration);
      return this;
    }
    showHelpAfterError(displayHelp = true) {
      if (typeof displayHelp !== "string")
        displayHelp = !!displayHelp;
      this._showHelpAfterError = displayHelp;
      return this;
    }
    showSuggestionAfterError(displaySuggestion = true) {
      this._showSuggestionAfterError = !!displaySuggestion;
      return this;
    }
    addCommand(cmd, opts) {
      if (!cmd._name) {
        throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
      }
      opts = opts || {};
      if (opts.isDefault)
        this._defaultCommandName = cmd._name;
      if (opts.noHelp || opts.hidden)
        cmd._hidden = true;
      this._registerCommand(cmd);
      cmd.parent = this;
      cmd._checkForBrokenPassThrough();
      return this;
    }
    createArgument(name, description) {
      return new Argument(name, description);
    }
    argument(name, description, fn, defaultValue) {
      const argument = this.createArgument(name, description);
      if (typeof fn === "function") {
        argument.default(defaultValue).argParser(fn);
      } else {
        argument.default(fn);
      }
      this.addArgument(argument);
      return this;
    }
    arguments(names) {
      names.trim().split(/ +/).forEach((detail) => {
        this.argument(detail);
      });
      return this;
    }
    addArgument(argument) {
      const previousArgument = this.registeredArguments.slice(-1)[0];
      if (previousArgument && previousArgument.variadic) {
        throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
      }
      if (argument.required && argument.defaultValue !== undefined && argument.parseArg === undefined) {
        throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
      }
      this.registeredArguments.push(argument);
      return this;
    }
    helpCommand(enableOrNameAndArgs, description) {
      if (typeof enableOrNameAndArgs === "boolean") {
        this._addImplicitHelpCommand = enableOrNameAndArgs;
        return this;
      }
      enableOrNameAndArgs = enableOrNameAndArgs ?? "help [command]";
      const [, helpName, helpArgs] = enableOrNameAndArgs.match(/([^ ]+) *(.*)/);
      const helpDescription = description ?? "display help for command";
      const helpCommand = this.createCommand(helpName);
      helpCommand.helpOption(false);
      if (helpArgs)
        helpCommand.arguments(helpArgs);
      if (helpDescription)
        helpCommand.description(helpDescription);
      this._addImplicitHelpCommand = true;
      this._helpCommand = helpCommand;
      return this;
    }
    addHelpCommand(helpCommand, deprecatedDescription) {
      if (typeof helpCommand !== "object") {
        this.helpCommand(helpCommand, deprecatedDescription);
        return this;
      }
      this._addImplicitHelpCommand = true;
      this._helpCommand = helpCommand;
      return this;
    }
    _getHelpCommand() {
      const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
      if (hasImplicitHelpCommand) {
        if (this._helpCommand === undefined) {
          this.helpCommand(undefined, undefined);
        }
        return this._helpCommand;
      }
      return null;
    }
    hook(event, listener) {
      const allowedValues = ["preSubcommand", "preAction", "postAction"];
      if (!allowedValues.includes(event)) {
        throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
      }
      if (this._lifeCycleHooks[event]) {
        this._lifeCycleHooks[event].push(listener);
      } else {
        this._lifeCycleHooks[event] = [listener];
      }
      return this;
    }
    exitOverride(fn) {
      if (fn) {
        this._exitCallback = fn;
      } else {
        this._exitCallback = (err) => {
          if (err.code !== "commander.executeSubCommandAsync") {
            throw err;
          } else {}
        };
      }
      return this;
    }
    _exit(exitCode, code, message) {
      if (this._exitCallback) {
        this._exitCallback(new CommanderError(exitCode, code, message));
      }
      process4.exit(exitCode);
    }
    action(fn) {
      const listener = (args) => {
        const expectedArgsCount = this.registeredArguments.length;
        const actionArgs = args.slice(0, expectedArgsCount);
        if (this._storeOptionsAsProperties) {
          actionArgs[expectedArgsCount] = this;
        } else {
          actionArgs[expectedArgsCount] = this.opts();
        }
        actionArgs.push(this);
        return fn.apply(this, actionArgs);
      };
      this._actionHandler = listener;
      return this;
    }
    createOption(flags, description) {
      return new Option(flags, description);
    }
    _callParseArg(target, value, previous, invalidArgumentMessage) {
      try {
        return target.parseArg(value, previous);
      } catch (err) {
        if (err.code === "commander.invalidArgument") {
          const message = `${invalidArgumentMessage} ${err.message}`;
          this.error(message, { exitCode: err.exitCode, code: err.code });
        }
        throw err;
      }
    }
    _registerOption(option) {
      const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
      if (matchingOption) {
        const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
        throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
      }
      this.options.push(option);
    }
    _registerCommand(command) {
      const knownBy = (cmd) => {
        return [cmd.name()].concat(cmd.aliases());
      };
      const alreadyUsed = knownBy(command).find((name) => this._findCommand(name));
      if (alreadyUsed) {
        const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
        const newCmd = knownBy(command).join("|");
        throw new Error(`cannot add command '${newCmd}' as already have command '${existingCmd}'`);
      }
      this.commands.push(command);
    }
    addOption(option) {
      this._registerOption(option);
      const oname = option.name();
      const name = option.attributeName();
      if (option.negate) {
        const positiveLongFlag = option.long.replace(/^--no-/, "--");
        if (!this._findOption(positiveLongFlag)) {
          this.setOptionValueWithSource(name, option.defaultValue === undefined ? true : option.defaultValue, "default");
        }
      } else if (option.defaultValue !== undefined) {
        this.setOptionValueWithSource(name, option.defaultValue, "default");
      }
      const handleOptionValue = (val, invalidValueMessage, valueSource) => {
        if (val == null && option.presetArg !== undefined) {
          val = option.presetArg;
        }
        const oldValue = this.getOptionValue(name);
        if (val !== null && option.parseArg) {
          val = this._callParseArg(option, val, oldValue, invalidValueMessage);
        } else if (val !== null && option.variadic) {
          val = option._concatValue(val, oldValue);
        }
        if (val == null) {
          if (option.negate) {
            val = false;
          } else if (option.isBoolean() || option.optional) {
            val = true;
          } else {
            val = "";
          }
        }
        this.setOptionValueWithSource(name, val, valueSource);
      };
      this.on("option:" + oname, (val) => {
        const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
        handleOptionValue(val, invalidValueMessage, "cli");
      });
      if (option.envVar) {
        this.on("optionEnv:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "env");
        });
      }
      return this;
    }
    _optionEx(config, flags, description, fn, defaultValue) {
      if (typeof flags === "object" && flags instanceof Option) {
        throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
      }
      const option = this.createOption(flags, description);
      option.makeOptionMandatory(!!config.mandatory);
      if (typeof fn === "function") {
        option.default(defaultValue).argParser(fn);
      } else if (fn instanceof RegExp) {
        const regex = fn;
        fn = (val, def) => {
          const m = regex.exec(val);
          return m ? m[0] : def;
        };
        option.default(defaultValue).argParser(fn);
      } else {
        option.default(fn);
      }
      return this.addOption(option);
    }
    option(flags, description, parseArg, defaultValue) {
      return this._optionEx({}, flags, description, parseArg, defaultValue);
    }
    requiredOption(flags, description, parseArg, defaultValue) {
      return this._optionEx({ mandatory: true }, flags, description, parseArg, defaultValue);
    }
    combineFlagAndOptionalValue(combine = true) {
      this._combineFlagAndOptionalValue = !!combine;
      return this;
    }
    allowUnknownOption(allowUnknown = true) {
      this._allowUnknownOption = !!allowUnknown;
      return this;
    }
    allowExcessArguments(allowExcess = true) {
      this._allowExcessArguments = !!allowExcess;
      return this;
    }
    enablePositionalOptions(positional = true) {
      this._enablePositionalOptions = !!positional;
      return this;
    }
    passThroughOptions(passThrough = true) {
      this._passThroughOptions = !!passThrough;
      this._checkForBrokenPassThrough();
      return this;
    }
    _checkForBrokenPassThrough() {
      if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
        throw new Error(`passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`);
      }
    }
    storeOptionsAsProperties(storeAsProperties = true) {
      if (this.options.length) {
        throw new Error("call .storeOptionsAsProperties() before adding options");
      }
      if (Object.keys(this._optionValues).length) {
        throw new Error("call .storeOptionsAsProperties() before setting option values");
      }
      this._storeOptionsAsProperties = !!storeAsProperties;
      return this;
    }
    getOptionValue(key2) {
      if (this._storeOptionsAsProperties) {
        return this[key2];
      }
      return this._optionValues[key2];
    }
    setOptionValue(key2, value) {
      return this.setOptionValueWithSource(key2, value, undefined);
    }
    setOptionValueWithSource(key2, value, source) {
      if (this._storeOptionsAsProperties) {
        this[key2] = value;
      } else {
        this._optionValues[key2] = value;
      }
      this._optionValueSources[key2] = source;
      return this;
    }
    getOptionValueSource(key2) {
      return this._optionValueSources[key2];
    }
    getOptionValueSourceWithGlobals(key2) {
      let source;
      this._getCommandAndAncestors().forEach((cmd) => {
        if (cmd.getOptionValueSource(key2) !== undefined) {
          source = cmd.getOptionValueSource(key2);
        }
      });
      return source;
    }
    _prepareUserArgs(argv, parseOptions) {
      if (argv !== undefined && !Array.isArray(argv)) {
        throw new Error("first parameter to parse must be array or undefined");
      }
      parseOptions = parseOptions || {};
      if (argv === undefined && parseOptions.from === undefined) {
        if (process4.versions?.electron) {
          parseOptions.from = "electron";
        }
        const execArgv = process4.execArgv ?? [];
        if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
          parseOptions.from = "eval";
        }
      }
      if (argv === undefined) {
        argv = process4.argv;
      }
      this.rawArgs = argv.slice();
      let userArgs;
      switch (parseOptions.from) {
        case undefined:
        case "node":
          this._scriptPath = argv[1];
          userArgs = argv.slice(2);
          break;
        case "electron":
          if (process4.defaultApp) {
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
          } else {
            userArgs = argv.slice(1);
          }
          break;
        case "user":
          userArgs = argv.slice(0);
          break;
        case "eval":
          userArgs = argv.slice(1);
          break;
        default:
          throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
      }
      if (!this._name && this._scriptPath)
        this.nameFromFilename(this._scriptPath);
      this._name = this._name || "program";
      return userArgs;
    }
    parse(argv, parseOptions) {
      const userArgs = this._prepareUserArgs(argv, parseOptions);
      this._parseCommand([], userArgs);
      return this;
    }
    async parseAsync(argv, parseOptions) {
      const userArgs = this._prepareUserArgs(argv, parseOptions);
      await this._parseCommand([], userArgs);
      return this;
    }
    _executeSubCommand(subcommand, args) {
      args = args.slice();
      let launchWithNode = false;
      const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
      function findFile(baseDir, baseName) {
        const localBin = path.resolve(baseDir, baseName);
        if (fs.existsSync(localBin))
          return localBin;
        if (sourceExt.includes(path.extname(baseName)))
          return;
        const foundExt = sourceExt.find((ext) => fs.existsSync(`${localBin}${ext}`));
        if (foundExt)
          return `${localBin}${foundExt}`;
        return;
      }
      this._checkForMissingMandatoryOptions();
      this._checkForConflictingOptions();
      let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
      let executableDir = this._executableDir || "";
      if (this._scriptPath) {
        let resolvedScriptPath;
        try {
          resolvedScriptPath = fs.realpathSync(this._scriptPath);
        } catch (err) {
          resolvedScriptPath = this._scriptPath;
        }
        executableDir = path.resolve(path.dirname(resolvedScriptPath), executableDir);
      }
      if (executableDir) {
        let localFile = findFile(executableDir, executableFile);
        if (!localFile && !subcommand._executableFile && this._scriptPath) {
          const legacyName = path.basename(this._scriptPath, path.extname(this._scriptPath));
          if (legacyName !== this._name) {
            localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`);
          }
        }
        executableFile = localFile || executableFile;
      }
      launchWithNode = sourceExt.includes(path.extname(executableFile));
      let proc;
      if (process4.platform !== "win32") {
        if (launchWithNode) {
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process4.execArgv).concat(args);
          proc = childProcess.spawn(process4.argv[0], args, { stdio: "inherit" });
        } else {
          proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
        }
      } else {
        args.unshift(executableFile);
        args = incrementNodeInspectorPort(process4.execArgv).concat(args);
        proc = childProcess.spawn(process4.execPath, args, { stdio: "inherit" });
      }
      if (!proc.killed) {
        const signals2 = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
        signals2.forEach((signal) => {
          process4.on(signal, () => {
            if (proc.killed === false && proc.exitCode === null) {
              proc.kill(signal);
            }
          });
        });
      }
      const exitCallback = this._exitCallback;
      proc.on("close", (code) => {
        code = code ?? 1;
        if (!exitCallback) {
          process4.exit(code);
        } else {
          exitCallback(new CommanderError(code, "commander.executeSubCommandAsync", "(close)"));
        }
      });
      proc.on("error", (err) => {
        if (err.code === "ENOENT") {
          const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
          const executableMissing = `'${executableFile}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
          throw new Error(executableMissing);
        } else if (err.code === "EACCES") {
          throw new Error(`'${executableFile}' not executable`);
        }
        if (!exitCallback) {
          process4.exit(1);
        } else {
          const wrappedError = new CommanderError(1, "commander.executeSubCommandAsync", "(error)");
          wrappedError.nestedError = err;
          exitCallback(wrappedError);
        }
      });
      this.runningCommand = proc;
    }
    _dispatchSubcommand(commandName, operands, unknown) {
      const subCommand = this._findCommand(commandName);
      if (!subCommand)
        this.help({ error: true });
      let promiseChain;
      promiseChain = this._chainOrCallSubCommandHook(promiseChain, subCommand, "preSubcommand");
      promiseChain = this._chainOrCall(promiseChain, () => {
        if (subCommand._executableHandler) {
          this._executeSubCommand(subCommand, operands.concat(unknown));
        } else {
          return subCommand._parseCommand(operands, unknown);
        }
      });
      return promiseChain;
    }
    _dispatchHelpCommand(subcommandName) {
      if (!subcommandName) {
        this.help();
      }
      const subCommand = this._findCommand(subcommandName);
      if (subCommand && !subCommand._executableHandler) {
        subCommand.help();
      }
      return this._dispatchSubcommand(subcommandName, [], [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]);
    }
    _checkNumberOfArguments() {
      this.registeredArguments.forEach((arg, i) => {
        if (arg.required && this.args[i] == null) {
          this.missingArgument(arg.name());
        }
      });
      if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
        return;
      }
      if (this.args.length > this.registeredArguments.length) {
        this._excessArguments(this.args);
      }
    }
    _processArguments() {
      const myParseArg = (argument, value, previous) => {
        let parsedValue = value;
        if (value !== null && argument.parseArg) {
          const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
          parsedValue = this._callParseArg(argument, value, previous, invalidValueMessage);
        }
        return parsedValue;
      };
      this._checkNumberOfArguments();
      const processedArgs = [];
      this.registeredArguments.forEach((declaredArg, index) => {
        let value = declaredArg.defaultValue;
        if (declaredArg.variadic) {
          if (index < this.args.length) {
            value = this.args.slice(index);
            if (declaredArg.parseArg) {
              value = value.reduce((processed, v) => {
                return myParseArg(declaredArg, v, processed);
              }, declaredArg.defaultValue);
            }
          } else if (value === undefined) {
            value = [];
          }
        } else if (index < this.args.length) {
          value = this.args[index];
          if (declaredArg.parseArg) {
            value = myParseArg(declaredArg, value, declaredArg.defaultValue);
          }
        }
        processedArgs[index] = value;
      });
      this.processedArgs = processedArgs;
    }
    _chainOrCall(promise, fn) {
      if (promise && promise.then && typeof promise.then === "function") {
        return promise.then(() => fn());
      }
      return fn();
    }
    _chainOrCallHooks(promise, event) {
      let result = promise;
      const hooks = [];
      this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== undefined).forEach((hookedCommand) => {
        hookedCommand._lifeCycleHooks[event].forEach((callback) => {
          hooks.push({ hookedCommand, callback });
        });
      });
      if (event === "postAction") {
        hooks.reverse();
      }
      hooks.forEach((hookDetail) => {
        result = this._chainOrCall(result, () => {
          return hookDetail.callback(hookDetail.hookedCommand, this);
        });
      });
      return result;
    }
    _chainOrCallSubCommandHook(promise, subCommand, event) {
      let result = promise;
      if (this._lifeCycleHooks[event] !== undefined) {
        this._lifeCycleHooks[event].forEach((hook) => {
          result = this._chainOrCall(result, () => {
            return hook(this, subCommand);
          });
        });
      }
      return result;
    }
    _parseCommand(operands, unknown) {
      const parsed = this.parseOptions(unknown);
      this._parseOptionsEnv();
      this._parseOptionsImplied();
      operands = operands.concat(parsed.operands);
      unknown = parsed.unknown;
      this.args = operands.concat(unknown);
      if (operands && this._findCommand(operands[0])) {
        return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
      }
      if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
        return this._dispatchHelpCommand(operands[1]);
      }
      if (this._defaultCommandName) {
        this._outputHelpIfRequested(unknown);
        return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
      }
      if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
        this.help({ error: true });
      }
      this._outputHelpIfRequested(parsed.unknown);
      this._checkForMissingMandatoryOptions();
      this._checkForConflictingOptions();
      const checkForUnknownOptions = () => {
        if (parsed.unknown.length > 0) {
          this.unknownOption(parsed.unknown[0]);
        }
      };
      const commandEvent = `command:${this.name()}`;
      if (this._actionHandler) {
        checkForUnknownOptions();
        this._processArguments();
        let promiseChain;
        promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
        promiseChain = this._chainOrCall(promiseChain, () => this._actionHandler(this.processedArgs));
        if (this.parent) {
          promiseChain = this._chainOrCall(promiseChain, () => {
            this.parent.emit(commandEvent, operands, unknown);
          });
        }
        promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
        return promiseChain;
      }
      if (this.parent && this.parent.listenerCount(commandEvent)) {
        checkForUnknownOptions();
        this._processArguments();
        this.parent.emit(commandEvent, operands, unknown);
      } else if (operands.length) {
        if (this._findCommand("*")) {
          return this._dispatchSubcommand("*", operands, unknown);
        }
        if (this.listenerCount("command:*")) {
          this.emit("command:*", operands, unknown);
        } else if (this.commands.length) {
          this.unknownCommand();
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      } else if (this.commands.length) {
        checkForUnknownOptions();
        this.help({ error: true });
      } else {
        checkForUnknownOptions();
        this._processArguments();
      }
    }
    _findCommand(name) {
      if (!name)
        return;
      return this.commands.find((cmd) => cmd._name === name || cmd._aliases.includes(name));
    }
    _findOption(arg) {
      return this.options.find((option) => option.is(arg));
    }
    _checkForMissingMandatoryOptions() {
      this._getCommandAndAncestors().forEach((cmd) => {
        cmd.options.forEach((anOption) => {
          if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === undefined) {
            cmd.missingMandatoryOptionValue(anOption);
          }
        });
      });
    }
    _checkForConflictingLocalOptions() {
      const definedNonDefaultOptions = this.options.filter((option) => {
        const optionKey = option.attributeName();
        if (this.getOptionValue(optionKey) === undefined) {
          return false;
        }
        return this.getOptionValueSource(optionKey) !== "default";
      });
      const optionsWithConflicting = definedNonDefaultOptions.filter((option) => option.conflictsWith.length > 0);
      optionsWithConflicting.forEach((option) => {
        const conflictingAndDefined = definedNonDefaultOptions.find((defined) => option.conflictsWith.includes(defined.attributeName()));
        if (conflictingAndDefined) {
          this._conflictingOption(option, conflictingAndDefined);
        }
      });
    }
    _checkForConflictingOptions() {
      this._getCommandAndAncestors().forEach((cmd) => {
        cmd._checkForConflictingLocalOptions();
      });
    }
    parseOptions(argv) {
      const operands = [];
      const unknown = [];
      let dest = operands;
      const args = argv.slice();
      function maybeOption(arg) {
        return arg.length > 1 && arg[0] === "-";
      }
      let activeVariadicOption = null;
      while (args.length) {
        const arg = args.shift();
        if (arg === "--") {
          if (dest === unknown)
            dest.push(arg);
          dest.push(...args);
          break;
        }
        if (activeVariadicOption && !maybeOption(arg)) {
          this.emit(`option:${activeVariadicOption.name()}`, arg);
          continue;
        }
        activeVariadicOption = null;
        if (maybeOption(arg)) {
          const option = this._findOption(arg);
          if (option) {
            if (option.required) {
              const value = args.shift();
              if (value === undefined)
                this.optionMissingArgument(option);
              this.emit(`option:${option.name()}`, value);
            } else if (option.optional) {
              let value = null;
              if (args.length > 0 && !maybeOption(args[0])) {
                value = args.shift();
              }
              this.emit(`option:${option.name()}`, value);
            } else {
              this.emit(`option:${option.name()}`);
            }
            activeVariadicOption = option.variadic ? option : null;
            continue;
          }
        }
        if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
          const option = this._findOption(`-${arg[1]}`);
          if (option) {
            if (option.required || option.optional && this._combineFlagAndOptionalValue) {
              this.emit(`option:${option.name()}`, arg.slice(2));
            } else {
              this.emit(`option:${option.name()}`);
              args.unshift(`-${arg.slice(2)}`);
            }
            continue;
          }
        }
        if (/^--[^=]+=/.test(arg)) {
          const index = arg.indexOf("=");
          const option = this._findOption(arg.slice(0, index));
          if (option && (option.required || option.optional)) {
            this.emit(`option:${option.name()}`, arg.slice(index + 1));
            continue;
          }
        }
        if (maybeOption(arg)) {
          dest = unknown;
        }
        if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
          if (this._findCommand(arg)) {
            operands.push(arg);
            if (args.length > 0)
              unknown.push(...args);
            break;
          } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
            operands.push(arg);
            if (args.length > 0)
              operands.push(...args);
            break;
          } else if (this._defaultCommandName) {
            unknown.push(arg);
            if (args.length > 0)
              unknown.push(...args);
            break;
          }
        }
        if (this._passThroughOptions) {
          dest.push(arg);
          if (args.length > 0)
            dest.push(...args);
          break;
        }
        dest.push(arg);
      }
      return { operands, unknown };
    }
    opts() {
      if (this._storeOptionsAsProperties) {
        const result = {};
        const len = this.options.length;
        for (let i = 0;i < len; i++) {
          const key2 = this.options[i].attributeName();
          result[key2] = key2 === this._versionOptionName ? this._version : this[key2];
        }
        return result;
      }
      return this._optionValues;
    }
    optsWithGlobals() {
      return this._getCommandAndAncestors().reduce((combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()), {});
    }
    error(message, errorOptions) {
      this._outputConfiguration.outputError(`${message}
`, this._outputConfiguration.writeErr);
      if (typeof this._showHelpAfterError === "string") {
        this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
      } else if (this._showHelpAfterError) {
        this._outputConfiguration.writeErr(`
`);
        this.outputHelp({ error: true });
      }
      const config = errorOptions || {};
      const exitCode = config.exitCode || 1;
      const code = config.code || "commander.error";
      this._exit(exitCode, code, message);
    }
    _parseOptionsEnv() {
      this.options.forEach((option) => {
        if (option.envVar && option.envVar in process4.env) {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === undefined || ["default", "config", "env"].includes(this.getOptionValueSource(optionKey))) {
            if (option.required || option.optional) {
              this.emit(`optionEnv:${option.name()}`, process4.env[option.envVar]);
            } else {
              this.emit(`optionEnv:${option.name()}`);
            }
          }
        }
      });
    }
    _parseOptionsImplied() {
      const dualHelper = new DualOptions(this.options);
      const hasCustomOptionValue = (optionKey) => {
        return this.getOptionValue(optionKey) !== undefined && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
      };
      this.options.filter((option) => option.implied !== undefined && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option)).forEach((option) => {
        Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
          this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], "implied");
        });
      });
    }
    missingArgument(name) {
      const message = `error: missing required argument '${name}'`;
      this.error(message, { code: "commander.missingArgument" });
    }
    optionMissingArgument(option) {
      const message = `error: option '${option.flags}' argument missing`;
      this.error(message, { code: "commander.optionMissingArgument" });
    }
    missingMandatoryOptionValue(option) {
      const message = `error: required option '${option.flags}' not specified`;
      this.error(message, { code: "commander.missingMandatoryOptionValue" });
    }
    _conflictingOption(option, conflictingOption) {
      const findBestOptionFromValue = (option2) => {
        const optionKey = option2.attributeName();
        const optionValue = this.getOptionValue(optionKey);
        const negativeOption = this.options.find((target) => target.negate && optionKey === target.attributeName());
        const positiveOption = this.options.find((target) => !target.negate && optionKey === target.attributeName());
        if (negativeOption && (negativeOption.presetArg === undefined && optionValue === false || negativeOption.presetArg !== undefined && optionValue === negativeOption.presetArg)) {
          return negativeOption;
        }
        return positiveOption || option2;
      };
      const getErrorMessage = (option2) => {
        const bestOption = findBestOptionFromValue(option2);
        const optionKey = bestOption.attributeName();
        const source = this.getOptionValueSource(optionKey);
        if (source === "env") {
          return `environment variable '${bestOption.envVar}'`;
        }
        return `option '${bestOption.flags}'`;
      };
      const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
      this.error(message, { code: "commander.conflictingOption" });
    }
    unknownOption(flag) {
      if (this._allowUnknownOption)
        return;
      let suggestion = "";
      if (flag.startsWith("--") && this._showSuggestionAfterError) {
        let candidateFlags = [];
        let command = this;
        do {
          const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
          candidateFlags = candidateFlags.concat(moreFlags);
          command = command.parent;
        } while (command && !command._enablePositionalOptions);
        suggestion = suggestSimilar(flag, candidateFlags);
      }
      const message = `error: unknown option '${flag}'${suggestion}`;
      this.error(message, { code: "commander.unknownOption" });
    }
    _excessArguments(receivedArgs) {
      if (this._allowExcessArguments)
        return;
      const expected = this.registeredArguments.length;
      const s = expected === 1 ? "" : "s";
      const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
      const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
      this.error(message, { code: "commander.excessArguments" });
    }
    unknownCommand() {
      const unknownName = this.args[0];
      let suggestion = "";
      if (this._showSuggestionAfterError) {
        const candidateNames = [];
        this.createHelp().visibleCommands(this).forEach((command) => {
          candidateNames.push(command.name());
          if (command.alias())
            candidateNames.push(command.alias());
        });
        suggestion = suggestSimilar(unknownName, candidateNames);
      }
      const message = `error: unknown command '${unknownName}'${suggestion}`;
      this.error(message, { code: "commander.unknownCommand" });
    }
    version(str, flags, description) {
      if (str === undefined)
        return this._version;
      this._version = str;
      flags = flags || "-V, --version";
      description = description || "output the version number";
      const versionOption = this.createOption(flags, description);
      this._versionOptionName = versionOption.attributeName();
      this._registerOption(versionOption);
      this.on("option:" + versionOption.name(), () => {
        this._outputConfiguration.writeOut(`${str}
`);
        this._exit(0, "commander.version", str);
      });
      return this;
    }
    description(str, argsDescription) {
      if (str === undefined && argsDescription === undefined)
        return this._description;
      this._description = str;
      if (argsDescription) {
        this._argsDescription = argsDescription;
      }
      return this;
    }
    summary(str) {
      if (str === undefined)
        return this._summary;
      this._summary = str;
      return this;
    }
    alias(alias) {
      if (alias === undefined)
        return this._aliases[0];
      let command = this;
      if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
        command = this.commands[this.commands.length - 1];
      }
      if (alias === command._name)
        throw new Error("Command alias can't be the same as its name");
      const matchingCommand = this.parent?._findCommand(alias);
      if (matchingCommand) {
        const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
        throw new Error(`cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`);
      }
      command._aliases.push(alias);
      return this;
    }
    aliases(aliases) {
      if (aliases === undefined)
        return this._aliases;
      aliases.forEach((alias) => this.alias(alias));
      return this;
    }
    usage(str) {
      if (str === undefined) {
        if (this._usage)
          return this._usage;
        const args = this.registeredArguments.map((arg) => {
          return humanReadableArgName(arg);
        });
        return [].concat(this.options.length || this._helpOption !== null ? "[options]" : [], this.commands.length ? "[command]" : [], this.registeredArguments.length ? args : []).join(" ");
      }
      this._usage = str;
      return this;
    }
    name(str) {
      if (str === undefined)
        return this._name;
      this._name = str;
      return this;
    }
    nameFromFilename(filename) {
      this._name = path.basename(filename, path.extname(filename));
      return this;
    }
    executableDir(path2) {
      if (path2 === undefined)
        return this._executableDir;
      this._executableDir = path2;
      return this;
    }
    helpInformation(contextOptions) {
      const helper = this.createHelp();
      if (helper.helpWidth === undefined) {
        helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
      }
      return helper.formatHelp(this, helper);
    }
    _getHelpContext(contextOptions) {
      contextOptions = contextOptions || {};
      const context = { error: !!contextOptions.error };
      let write;
      if (context.error) {
        write = (arg) => this._outputConfiguration.writeErr(arg);
      } else {
        write = (arg) => this._outputConfiguration.writeOut(arg);
      }
      context.write = contextOptions.write || write;
      context.command = this;
      return context;
    }
    outputHelp(contextOptions) {
      let deprecatedCallback;
      if (typeof contextOptions === "function") {
        deprecatedCallback = contextOptions;
        contextOptions = undefined;
      }
      const context = this._getHelpContext(contextOptions);
      this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", context));
      this.emit("beforeHelp", context);
      let helpInformation = this.helpInformation(context);
      if (deprecatedCallback) {
        helpInformation = deprecatedCallback(helpInformation);
        if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
          throw new Error("outputHelp callback must return a string or a Buffer");
        }
      }
      context.write(helpInformation);
      if (this._getHelpOption()?.long) {
        this.emit(this._getHelpOption().long);
      }
      this.emit("afterHelp", context);
      this._getCommandAndAncestors().forEach((command) => command.emit("afterAllHelp", context));
    }
    helpOption(flags, description) {
      if (typeof flags === "boolean") {
        if (flags) {
          this._helpOption = this._helpOption ?? undefined;
        } else {
          this._helpOption = null;
        }
        return this;
      }
      flags = flags ?? "-h, --help";
      description = description ?? "display help for command";
      this._helpOption = this.createOption(flags, description);
      return this;
    }
    _getHelpOption() {
      if (this._helpOption === undefined) {
        this.helpOption(undefined, undefined);
      }
      return this._helpOption;
    }
    addHelpOption(option) {
      this._helpOption = option;
      return this;
    }
    help(contextOptions) {
      this.outputHelp(contextOptions);
      let exitCode = process4.exitCode || 0;
      if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
        exitCode = 1;
      }
      this._exit(exitCode, "commander.help", "(outputHelp)");
    }
    addHelpText(position, text) {
      const allowedValues = ["beforeAll", "before", "after", "afterAll"];
      if (!allowedValues.includes(position)) {
        throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
      }
      const helpEvent = `${position}Help`;
      this.on(helpEvent, (context) => {
        let helpStr;
        if (typeof text === "function") {
          helpStr = text({ error: context.error, command: context.command });
        } else {
          helpStr = text;
        }
        if (helpStr) {
          context.write(`${helpStr}
`);
        }
      });
      return this;
    }
    _outputHelpIfRequested(args) {
      const helpOption = this._getHelpOption();
      const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
      if (helpRequested) {
        this.outputHelp();
        this._exit(0, "commander.helpDisplayed", "(outputHelp)");
      }
    }
  }
  function incrementNodeInspectorPort(args) {
    return args.map((arg) => {
      if (!arg.startsWith("--inspect")) {
        return arg;
      }
      let debugOption;
      let debugHost = "127.0.0.1";
      let debugPort = "9229";
      let match;
      if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
        debugOption = match[1];
      } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
        debugOption = match[1];
        if (/^\d+$/.test(match[3])) {
          debugPort = match[3];
        } else {
          debugHost = match[3];
        }
      } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
        debugOption = match[1];
        debugHost = match[3];
        debugPort = match[4];
      }
      if (debugOption && debugPort !== "0") {
        return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
      }
      return arg;
    });
  }
  exports.Command = Command;
});

// node_modules/commander/index.js
var require_commander = __commonJS((exports) => {
  var { Argument } = require_argument();
  var { Command } = require_command();
  var { CommanderError, InvalidArgumentError } = require_error();
  var { Help } = require_help();
  var { Option } = require_option();
  exports.program = new Command;
  exports.createCommand = (name) => new Command(name);
  exports.createOption = (flags, description) => new Option(flags, description);
  exports.createArgument = (name, description) => new Argument(name, description);
  exports.Command = Command;
  exports.Option = Option;
  exports.Argument = Argument;
  exports.Help = Help;
  exports.CommanderError = CommanderError;
  exports.InvalidArgumentError = InvalidArgumentError;
  exports.InvalidOptionArgumentError = InvalidArgumentError;
});

// src/cli.ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// node_modules/@inquirer/core/dist/esm/lib/key.js
var isUpKey = (key) => key.name === "up";
var isDownKey = (key) => key.name === "down";
var isBackspaceKey = (key) => key.name === "backspace";
var isTabKey = (key) => key.name === "tab";
var isNumberKey = (key) => "1234567890".includes(key.name);
var isEnterKey = (key) => key.name === "enter" || key.name === "return";
// node_modules/@inquirer/core/dist/esm/lib/errors.js
class AbortPromptError extends Error {
  name = "AbortPromptError";
  message = "Prompt was aborted";
  constructor(options) {
    super();
    this.cause = options?.cause;
  }
}

class CancelPromptError extends Error {
  name = "CancelPromptError";
  message = "Prompt was canceled";
}

class ExitPromptError extends Error {
  name = "ExitPromptError";
}

class HookError extends Error {
  name = "HookError";
}

class ValidationError extends Error {
  name = "ValidationError";
}
// node_modules/@inquirer/core/dist/esm/lib/use-state.js
import { AsyncResource as AsyncResource2 } from "node:async_hooks";

// node_modules/@inquirer/core/dist/esm/lib/hook-engine.js
import { AsyncLocalStorage, AsyncResource } from "node:async_hooks";
var hookStorage = new AsyncLocalStorage;
function createStore(rl) {
  const store = {
    rl,
    hooks: [],
    hooksCleanup: [],
    hooksEffect: [],
    index: 0,
    handleChange() {}
  };
  return store;
}
function withHooks(rl, cb) {
  const store = createStore(rl);
  return hookStorage.run(store, () => {
    function cycle(render) {
      store.handleChange = () => {
        store.index = 0;
        render();
      };
      store.handleChange();
    }
    return cb(cycle);
  });
}
function getStore() {
  const store = hookStorage.getStore();
  if (!store) {
    throw new HookError("[Inquirer] Hook functions can only be called from within a prompt");
  }
  return store;
}
function readline() {
  return getStore().rl;
}
function withUpdates(fn) {
  const wrapped = (...args) => {
    const store = getStore();
    let shouldUpdate = false;
    const oldHandleChange = store.handleChange;
    store.handleChange = () => {
      shouldUpdate = true;
    };
    const returnValue = fn(...args);
    if (shouldUpdate) {
      oldHandleChange();
    }
    store.handleChange = oldHandleChange;
    return returnValue;
  };
  return AsyncResource.bind(wrapped);
}
function withPointer(cb) {
  const store = getStore();
  const { index } = store;
  const pointer = {
    get() {
      return store.hooks[index];
    },
    set(value) {
      store.hooks[index] = value;
    },
    initialized: index in store.hooks
  };
  const returnValue = cb(pointer);
  store.index++;
  return returnValue;
}
function handleChange() {
  getStore().handleChange();
}
var effectScheduler = {
  queue(cb) {
    const store = getStore();
    const { index } = store;
    store.hooksEffect.push(() => {
      store.hooksCleanup[index]?.();
      const cleanFn = cb(readline());
      if (cleanFn != null && typeof cleanFn !== "function") {
        throw new ValidationError("useEffect return value must be a cleanup function or nothing.");
      }
      store.hooksCleanup[index] = cleanFn;
    });
  },
  run() {
    const store = getStore();
    withUpdates(() => {
      store.hooksEffect.forEach((effect) => {
        effect();
      });
      store.hooksEffect.length = 0;
    })();
  },
  clearAll() {
    const store = getStore();
    store.hooksCleanup.forEach((cleanFn) => {
      cleanFn?.();
    });
    store.hooksEffect.length = 0;
    store.hooksCleanup.length = 0;
  }
};

// node_modules/@inquirer/core/dist/esm/lib/use-state.js
function useState(defaultValue) {
  return withPointer((pointer) => {
    const setState = AsyncResource2.bind(function setState(newValue) {
      if (pointer.get() !== newValue) {
        pointer.set(newValue);
        handleChange();
      }
    });
    if (pointer.initialized) {
      return [pointer.get(), setState];
    }
    const value = typeof defaultValue === "function" ? defaultValue() : defaultValue;
    pointer.set(value);
    return [value, setState];
  });
}

// node_modules/@inquirer/core/dist/esm/lib/use-effect.js
function useEffect(cb, depArray) {
  withPointer((pointer) => {
    const oldDeps = pointer.get();
    const hasChanged = !Array.isArray(oldDeps) || depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    if (hasChanged) {
      effectScheduler.queue(cb);
    }
    pointer.set(depArray);
  });
}

// node_modules/@inquirer/core/dist/esm/lib/theme.js
var import_yoctocolors_cjs = __toESM(require_yoctocolors_cjs(), 1);

// node_modules/@inquirer/figures/dist/esm/index.js
import process2 from "node:process";
function isUnicodeSupported() {
  if (process2.platform !== "win32") {
    return process2.env["TERM"] !== "linux";
  }
  return Boolean(process2.env["WT_SESSION"]) || Boolean(process2.env["TERMINUS_SUBLIME"]) || process2.env["ConEmuTask"] === "{cmd::Cmder}" || process2.env["TERM_PROGRAM"] === "Terminus-Sublime" || process2.env["TERM_PROGRAM"] === "vscode" || process2.env["TERM"] === "xterm-256color" || process2.env["TERM"] === "alacritty" || process2.env["TERMINAL_EMULATOR"] === "JetBrains-JediTerm";
}
var common = {
  circleQuestionMark: "(?)",
  questionMarkPrefix: "(?)",
  square: "█",
  squareDarkShade: "▓",
  squareMediumShade: "▒",
  squareLightShade: "░",
  squareTop: "▀",
  squareBottom: "▄",
  squareLeft: "▌",
  squareRight: "▐",
  squareCenter: "■",
  bullet: "●",
  dot: "․",
  ellipsis: "…",
  pointerSmall: "›",
  triangleUp: "▲",
  triangleUpSmall: "▴",
  triangleDown: "▼",
  triangleDownSmall: "▾",
  triangleLeftSmall: "◂",
  triangleRightSmall: "▸",
  home: "⌂",
  heart: "♥",
  musicNote: "♪",
  musicNoteBeamed: "♫",
  arrowUp: "↑",
  arrowDown: "↓",
  arrowLeft: "←",
  arrowRight: "→",
  arrowLeftRight: "↔",
  arrowUpDown: "↕",
  almostEqual: "≈",
  notEqual: "≠",
  lessOrEqual: "≤",
  greaterOrEqual: "≥",
  identical: "≡",
  infinity: "∞",
  subscriptZero: "₀",
  subscriptOne: "₁",
  subscriptTwo: "₂",
  subscriptThree: "₃",
  subscriptFour: "₄",
  subscriptFive: "₅",
  subscriptSix: "₆",
  subscriptSeven: "₇",
  subscriptEight: "₈",
  subscriptNine: "₉",
  oneHalf: "½",
  oneThird: "⅓",
  oneQuarter: "¼",
  oneFifth: "⅕",
  oneSixth: "⅙",
  oneEighth: "⅛",
  twoThirds: "⅔",
  twoFifths: "⅖",
  threeQuarters: "¾",
  threeFifths: "⅗",
  threeEighths: "⅜",
  fourFifths: "⅘",
  fiveSixths: "⅚",
  fiveEighths: "⅝",
  sevenEighths: "⅞",
  line: "─",
  lineBold: "━",
  lineDouble: "═",
  lineDashed0: "┄",
  lineDashed1: "┅",
  lineDashed2: "┈",
  lineDashed3: "┉",
  lineDashed4: "╌",
  lineDashed5: "╍",
  lineDashed6: "╴",
  lineDashed7: "╶",
  lineDashed8: "╸",
  lineDashed9: "╺",
  lineDashed10: "╼",
  lineDashed11: "╾",
  lineDashed12: "−",
  lineDashed13: "–",
  lineDashed14: "‐",
  lineDashed15: "⁃",
  lineVertical: "│",
  lineVerticalBold: "┃",
  lineVerticalDouble: "║",
  lineVerticalDashed0: "┆",
  lineVerticalDashed1: "┇",
  lineVerticalDashed2: "┊",
  lineVerticalDashed3: "┋",
  lineVerticalDashed4: "╎",
  lineVerticalDashed5: "╏",
  lineVerticalDashed6: "╵",
  lineVerticalDashed7: "╷",
  lineVerticalDashed8: "╹",
  lineVerticalDashed9: "╻",
  lineVerticalDashed10: "╽",
  lineVerticalDashed11: "╿",
  lineDownLeft: "┐",
  lineDownLeftArc: "╮",
  lineDownBoldLeftBold: "┓",
  lineDownBoldLeft: "┒",
  lineDownLeftBold: "┑",
  lineDownDoubleLeftDouble: "╗",
  lineDownDoubleLeft: "╖",
  lineDownLeftDouble: "╕",
  lineDownRight: "┌",
  lineDownRightArc: "╭",
  lineDownBoldRightBold: "┏",
  lineDownBoldRight: "┎",
  lineDownRightBold: "┍",
  lineDownDoubleRightDouble: "╔",
  lineDownDoubleRight: "╓",
  lineDownRightDouble: "╒",
  lineUpLeft: "┘",
  lineUpLeftArc: "╯",
  lineUpBoldLeftBold: "┛",
  lineUpBoldLeft: "┚",
  lineUpLeftBold: "┙",
  lineUpDoubleLeftDouble: "╝",
  lineUpDoubleLeft: "╜",
  lineUpLeftDouble: "╛",
  lineUpRight: "└",
  lineUpRightArc: "╰",
  lineUpBoldRightBold: "┗",
  lineUpBoldRight: "┖",
  lineUpRightBold: "┕",
  lineUpDoubleRightDouble: "╚",
  lineUpDoubleRight: "╙",
  lineUpRightDouble: "╘",
  lineUpDownLeft: "┤",
  lineUpBoldDownBoldLeftBold: "┫",
  lineUpBoldDownBoldLeft: "┨",
  lineUpDownLeftBold: "┥",
  lineUpBoldDownLeftBold: "┩",
  lineUpDownBoldLeftBold: "┪",
  lineUpDownBoldLeft: "┧",
  lineUpBoldDownLeft: "┦",
  lineUpDoubleDownDoubleLeftDouble: "╣",
  lineUpDoubleDownDoubleLeft: "╢",
  lineUpDownLeftDouble: "╡",
  lineUpDownRight: "├",
  lineUpBoldDownBoldRightBold: "┣",
  lineUpBoldDownBoldRight: "┠",
  lineUpDownRightBold: "┝",
  lineUpBoldDownRightBold: "┡",
  lineUpDownBoldRightBold: "┢",
  lineUpDownBoldRight: "┟",
  lineUpBoldDownRight: "┞",
  lineUpDoubleDownDoubleRightDouble: "╠",
  lineUpDoubleDownDoubleRight: "╟",
  lineUpDownRightDouble: "╞",
  lineDownLeftRight: "┬",
  lineDownBoldLeftBoldRightBold: "┳",
  lineDownLeftBoldRightBold: "┯",
  lineDownBoldLeftRight: "┰",
  lineDownBoldLeftBoldRight: "┱",
  lineDownBoldLeftRightBold: "┲",
  lineDownLeftRightBold: "┮",
  lineDownLeftBoldRight: "┭",
  lineDownDoubleLeftDoubleRightDouble: "╦",
  lineDownDoubleLeftRight: "╥",
  lineDownLeftDoubleRightDouble: "╤",
  lineUpLeftRight: "┴",
  lineUpBoldLeftBoldRightBold: "┻",
  lineUpLeftBoldRightBold: "┷",
  lineUpBoldLeftRight: "┸",
  lineUpBoldLeftBoldRight: "┹",
  lineUpBoldLeftRightBold: "┺",
  lineUpLeftRightBold: "┶",
  lineUpLeftBoldRight: "┵",
  lineUpDoubleLeftDoubleRightDouble: "╩",
  lineUpDoubleLeftRight: "╨",
  lineUpLeftDoubleRightDouble: "╧",
  lineUpDownLeftRight: "┼",
  lineUpBoldDownBoldLeftBoldRightBold: "╋",
  lineUpDownBoldLeftBoldRightBold: "╈",
  lineUpBoldDownLeftBoldRightBold: "╇",
  lineUpBoldDownBoldLeftRightBold: "╊",
  lineUpBoldDownBoldLeftBoldRight: "╉",
  lineUpBoldDownLeftRight: "╀",
  lineUpDownBoldLeftRight: "╁",
  lineUpDownLeftBoldRight: "┽",
  lineUpDownLeftRightBold: "┾",
  lineUpBoldDownBoldLeftRight: "╂",
  lineUpDownLeftBoldRightBold: "┿",
  lineUpBoldDownLeftBoldRight: "╃",
  lineUpBoldDownLeftRightBold: "╄",
  lineUpDownBoldLeftBoldRight: "╅",
  lineUpDownBoldLeftRightBold: "╆",
  lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
  lineUpDoubleDownDoubleLeftRight: "╫",
  lineUpDownLeftDoubleRightDouble: "╪",
  lineCross: "╳",
  lineBackslash: "╲",
  lineSlash: "╱"
};
var specialMainSymbols = {
  tick: "✔",
  info: "ℹ",
  warning: "⚠",
  cross: "✘",
  squareSmall: "◻",
  squareSmallFilled: "◼",
  circle: "◯",
  circleFilled: "◉",
  circleDotted: "◌",
  circleDouble: "◎",
  circleCircle: "ⓞ",
  circleCross: "ⓧ",
  circlePipe: "Ⓘ",
  radioOn: "◉",
  radioOff: "◯",
  checkboxOn: "☒",
  checkboxOff: "☐",
  checkboxCircleOn: "ⓧ",
  checkboxCircleOff: "Ⓘ",
  pointer: "❯",
  triangleUpOutline: "△",
  triangleLeft: "◀",
  triangleRight: "▶",
  lozenge: "◆",
  lozengeOutline: "◇",
  hamburger: "☰",
  smiley: "㋡",
  mustache: "෴",
  star: "★",
  play: "▶",
  nodejs: "⬢",
  oneSeventh: "⅐",
  oneNinth: "⅑",
  oneTenth: "⅒"
};
var specialFallbackSymbols = {
  tick: "√",
  info: "i",
  warning: "‼",
  cross: "×",
  squareSmall: "□",
  squareSmallFilled: "■",
  circle: "( )",
  circleFilled: "(*)",
  circleDotted: "( )",
  circleDouble: "( )",
  circleCircle: "(○)",
  circleCross: "(×)",
  circlePipe: "(│)",
  radioOn: "(*)",
  radioOff: "( )",
  checkboxOn: "[×]",
  checkboxOff: "[ ]",
  checkboxCircleOn: "(×)",
  checkboxCircleOff: "( )",
  pointer: ">",
  triangleUpOutline: "∆",
  triangleLeft: "◄",
  triangleRight: "►",
  lozenge: "♦",
  lozengeOutline: "◊",
  hamburger: "≡",
  smiley: "☺",
  mustache: "┌─┐",
  star: "✶",
  play: "►",
  nodejs: "♦",
  oneSeventh: "1/7",
  oneNinth: "1/9",
  oneTenth: "1/10"
};
var mainSymbols = { ...common, ...specialMainSymbols };
var fallbackSymbols = {
  ...common,
  ...specialFallbackSymbols
};
var shouldUseMain = isUnicodeSupported();
var figures = shouldUseMain ? mainSymbols : fallbackSymbols;
var esm_default = figures;
var replacements = Object.entries(specialMainSymbols);

// node_modules/@inquirer/core/dist/esm/lib/theme.js
var defaultTheme = {
  prefix: {
    idle: import_yoctocolors_cjs.default.blue("?"),
    done: import_yoctocolors_cjs.default.green(esm_default.tick)
  },
  spinner: {
    interval: 80,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((frame) => import_yoctocolors_cjs.default.yellow(frame))
  },
  style: {
    answer: import_yoctocolors_cjs.default.cyan,
    message: import_yoctocolors_cjs.default.bold,
    error: (text) => import_yoctocolors_cjs.default.red(`> ${text}`),
    defaultAnswer: (text) => import_yoctocolors_cjs.default.dim(`(${text})`),
    help: import_yoctocolors_cjs.default.dim,
    highlight: import_yoctocolors_cjs.default.cyan,
    key: (text) => import_yoctocolors_cjs.default.cyan(import_yoctocolors_cjs.default.bold(`<${text}>`))
  }
};

// node_modules/@inquirer/core/dist/esm/lib/make-theme.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
function deepMerge(...objects) {
  const output = {};
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      const prevValue = output[key];
      output[key] = isPlainObject(prevValue) && isPlainObject(value) ? deepMerge(prevValue, value) : value;
    }
  }
  return output;
}
function makeTheme(...themes) {
  const themesToMerge = [
    defaultTheme,
    ...themes.filter((theme) => theme != null)
  ];
  return deepMerge(...themesToMerge);
}

// node_modules/@inquirer/core/dist/esm/lib/use-prefix.js
function usePrefix({ status = "idle", theme }) {
  const [showLoader, setShowLoader] = useState(false);
  const [tick, setTick] = useState(0);
  const { prefix, spinner } = makeTheme(theme);
  useEffect(() => {
    if (status === "loading") {
      let tickInterval;
      let inc = -1;
      const delayTimeout = setTimeout(() => {
        setShowLoader(true);
        tickInterval = setInterval(() => {
          inc = inc + 1;
          setTick(inc % spinner.frames.length);
        }, spinner.interval);
      }, 300);
      return () => {
        clearTimeout(delayTimeout);
        clearInterval(tickInterval);
      };
    } else {
      setShowLoader(false);
    }
  }, [status]);
  if (showLoader) {
    return spinner.frames[tick];
  }
  const iconName = status === "loading" ? "idle" : status;
  return typeof prefix === "string" ? prefix : prefix[iconName] ?? prefix["idle"];
}
// node_modules/@inquirer/core/dist/esm/lib/use-memo.js
function useMemo(fn, dependencies) {
  return withPointer((pointer) => {
    const prev = pointer.get();
    if (!prev || prev.dependencies.length !== dependencies.length || prev.dependencies.some((dep, i) => dep !== dependencies[i])) {
      const value = fn();
      pointer.set({ value, dependencies });
      return value;
    }
    return prev.value;
  });
}
// node_modules/@inquirer/core/dist/esm/lib/use-ref.js
function useRef(val) {
  return useState({ current: val })[0];
}
// node_modules/@inquirer/core/dist/esm/lib/use-keypress.js
function useKeypress(userHandler) {
  const signal = useRef(userHandler);
  signal.current = userHandler;
  useEffect((rl) => {
    let ignore = false;
    const handler = withUpdates((_input, event) => {
      if (ignore)
        return;
      signal.current(event, rl);
    });
    rl.input.on("keypress", handler);
    return () => {
      ignore = true;
      rl.input.removeListener("keypress", handler);
    };
  }, []);
}
// node_modules/@inquirer/core/dist/esm/lib/utils.js
var import_cli_width = __toESM(require_cli_width(), 1);
var import_wrap_ansi = __toESM(require_wrap_ansi(), 1);
function breakLines(content, width) {
  return content.split(`
`).flatMap((line) => import_wrap_ansi.default(line, width, { trim: false, hard: true }).split(`
`).map((str) => str.trimEnd())).join(`
`);
}
function readlineWidth() {
  return import_cli_width.default({ defaultWidth: 80, output: readline().output });
}

// node_modules/@inquirer/core/dist/esm/lib/pagination/use-pagination.js
function usePointerPosition({ active, renderedItems, pageSize, loop }) {
  const state = useRef({
    lastPointer: active,
    lastActive: undefined
  });
  const { lastPointer, lastActive } = state.current;
  const middle = Math.floor(pageSize / 2);
  const renderedLength = renderedItems.reduce((acc, item) => acc + item.length, 0);
  const defaultPointerPosition = renderedItems.slice(0, active).reduce((acc, item) => acc + item.length, 0);
  let pointer = defaultPointerPosition;
  if (renderedLength > pageSize) {
    if (loop) {
      pointer = lastPointer;
      if (lastActive != null && lastActive < active && active - lastActive < pageSize) {
        pointer = Math.min(middle, Math.abs(active - lastActive) === 1 ? Math.min(lastPointer + (renderedItems[lastActive]?.length ?? 0), Math.max(defaultPointerPosition, lastPointer)) : lastPointer + active - lastActive);
      }
    } else {
      const spaceUnderActive = renderedItems.slice(active).reduce((acc, item) => acc + item.length, 0);
      pointer = spaceUnderActive < pageSize - middle ? pageSize - spaceUnderActive : Math.min(defaultPointerPosition, middle);
    }
  }
  state.current.lastPointer = pointer;
  state.current.lastActive = active;
  return pointer;
}
function usePagination({ items, active, renderItem, pageSize, loop = true }) {
  const width = readlineWidth();
  const bound = (num) => (num % items.length + items.length) % items.length;
  const renderedItems = items.map((item, index) => {
    if (item == null)
      return [];
    return breakLines(renderItem({ item, index, isActive: index === active }), width).split(`
`);
  });
  const renderedLength = renderedItems.reduce((acc, item) => acc + item.length, 0);
  const renderItemAtIndex = (index) => renderedItems[index] ?? [];
  const pointer = usePointerPosition({ active, renderedItems, pageSize, loop });
  const activeItem = renderItemAtIndex(active).slice(0, pageSize);
  const activeItemPosition = pointer + activeItem.length <= pageSize ? pointer : pageSize - activeItem.length;
  const pageBuffer = Array.from({ length: pageSize });
  pageBuffer.splice(activeItemPosition, activeItem.length, ...activeItem);
  const itemVisited = new Set([active]);
  let bufferPointer = activeItemPosition + activeItem.length;
  let itemPointer = bound(active + 1);
  while (bufferPointer < pageSize && !itemVisited.has(itemPointer) && (loop && renderedLength > pageSize ? itemPointer !== active : itemPointer > active)) {
    const lines = renderItemAtIndex(itemPointer);
    const linesToAdd = lines.slice(0, pageSize - bufferPointer);
    pageBuffer.splice(bufferPointer, linesToAdd.length, ...linesToAdd);
    itemVisited.add(itemPointer);
    bufferPointer += linesToAdd.length;
    itemPointer = bound(itemPointer + 1);
  }
  bufferPointer = activeItemPosition - 1;
  itemPointer = bound(active - 1);
  while (bufferPointer >= 0 && !itemVisited.has(itemPointer) && (loop && renderedLength > pageSize ? itemPointer !== active : itemPointer < active)) {
    const lines = renderItemAtIndex(itemPointer);
    const linesToAdd = lines.slice(Math.max(0, lines.length - bufferPointer - 1));
    pageBuffer.splice(bufferPointer - linesToAdd.length + 1, linesToAdd.length, ...linesToAdd);
    itemVisited.add(itemPointer);
    bufferPointer -= linesToAdd.length;
    itemPointer = bound(itemPointer - 1);
  }
  return pageBuffer.filter((line) => typeof line === "string").join(`
`);
}
// node_modules/@inquirer/core/dist/esm/lib/create-prompt.js
var import_mute_stream = __toESM(require_lib(), 1);
import * as readline2 from "node:readline";
import { AsyncResource as AsyncResource3 } from "node:async_hooks";

// node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// node_modules/signal-exit/dist/mjs/index.js
var processOk = (process3) => !!process3 && typeof process3 === "object" && typeof process3.removeListener === "function" && typeof process3.emit === "function" && typeof process3.reallyExit === "function" && typeof process3.listeners === "function" && typeof process3.kill === "function" && typeof process3.pid === "number" && typeof process3.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);

class Emitter {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global[kExitEmitter]) {
      return global[kExitEmitter];
    }
    ObjectDefineProperty(global, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
}

class SignalExitBase {
}
var signalExitWrap = (handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    }
  };
};

class SignalExitFallback extends SignalExitBase {
  onExit() {
    return () => {};
  }
  load() {}
  unload() {}
}

class SignalExit extends SignalExitBase {
  #hupSig = process3.platform === "win32" ? "SIGINT" : "SIGHUP";
  #emitter = new Emitter;
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process3) {
    super();
    this.#process = process3;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process3;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process3.kill(process3.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process3.reallyExit;
    this.#originalProcessEmit = process3.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {};
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = opts?.alwaysLast ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn)
          this.#process.on(sig, fn);
      } catch (_) {}
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_) {}
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
}
var process3 = globalThis.process;
var {
  onExit,
  load,
  unload
} = signalExitWrap(processOk(process3) ? new SignalExit(process3) : new SignalExitFallback);

// node_modules/@inquirer/core/dist/esm/lib/screen-manager.js
import { stripVTControlCharacters } from "node:util";

// node_modules/@inquirer/ansi/dist/esm/index.js
var ESC = "\x1B[";
var cursorLeft = ESC + "G";
var cursorHide = ESC + "?25l";
var cursorShow = ESC + "?25h";
var cursorUp = (rows = 1) => rows > 0 ? `${ESC}${rows}A` : "";
var cursorDown = (rows = 1) => rows > 0 ? `${ESC}${rows}B` : "";
var cursorTo = (x, y) => {
  if (typeof y === "number" && !Number.isNaN(y)) {
    return `${ESC}${y + 1};${x + 1}H`;
  }
  return `${ESC}${x + 1}G`;
};
var eraseLine = ESC + "2K";
var eraseLines = (lines) => lines > 0 ? (eraseLine + cursorUp(1)).repeat(lines - 1) + eraseLine + cursorLeft : "";

// node_modules/@inquirer/core/dist/esm/lib/screen-manager.js
var height = (content) => content.split(`
`).length;
var lastLine = (content) => content.split(`
`).pop() ?? "";

class ScreenManager {
  height = 0;
  extraLinesUnderPrompt = 0;
  cursorPos;
  rl;
  constructor(rl) {
    this.rl = rl;
    this.cursorPos = rl.getCursorPos();
  }
  write(content) {
    this.rl.output.unmute();
    this.rl.output.write(content);
    this.rl.output.mute();
  }
  render(content, bottomContent = "") {
    const promptLine = lastLine(content);
    const rawPromptLine = stripVTControlCharacters(promptLine);
    let prompt = rawPromptLine;
    if (this.rl.line.length > 0) {
      prompt = prompt.slice(0, -this.rl.line.length);
    }
    this.rl.setPrompt(prompt);
    this.cursorPos = this.rl.getCursorPos();
    const width = readlineWidth();
    content = breakLines(content, width);
    bottomContent = breakLines(bottomContent, width);
    if (rawPromptLine.length % width === 0) {
      content += `
`;
    }
    let output = content + (bottomContent ? `
` + bottomContent : "");
    const promptLineUpDiff = Math.floor(rawPromptLine.length / width) - this.cursorPos.rows;
    const bottomContentHeight = promptLineUpDiff + (bottomContent ? height(bottomContent) : 0);
    if (bottomContentHeight > 0)
      output += cursorUp(bottomContentHeight);
    output += cursorTo(this.cursorPos.cols);
    this.write(cursorDown(this.extraLinesUnderPrompt) + eraseLines(this.height) + output);
    this.extraLinesUnderPrompt = bottomContentHeight;
    this.height = height(output);
  }
  checkCursorPos() {
    const cursorPos = this.rl.getCursorPos();
    if (cursorPos.cols !== this.cursorPos.cols) {
      this.write(cursorTo(cursorPos.cols));
      this.cursorPos = cursorPos;
    }
  }
  done({ clearContent }) {
    this.rl.setPrompt("");
    let output = cursorDown(this.extraLinesUnderPrompt);
    output += clearContent ? eraseLines(this.height) : `
`;
    output += cursorShow;
    this.write(output);
    this.rl.close();
  }
}

// node_modules/@inquirer/core/dist/esm/lib/promise-polyfill.js
class PromisePolyfill extends Promise {
  static withResolver() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
}

// node_modules/@inquirer/core/dist/esm/lib/create-prompt.js
function getCallSites() {
  const _prepareStackTrace = Error.prepareStackTrace;
  let result = [];
  try {
    Error.prepareStackTrace = (_, callSites) => {
      const callSitesWithoutCurrent = callSites.slice(1);
      result = callSitesWithoutCurrent;
      return callSitesWithoutCurrent;
    };
    new Error().stack;
  } catch {
    return result;
  }
  Error.prepareStackTrace = _prepareStackTrace;
  return result;
}
function createPrompt(view) {
  const callSites = getCallSites();
  const prompt = (config, context = {}) => {
    const { input = process.stdin, signal } = context;
    const cleanups = new Set;
    const output = new import_mute_stream.default;
    output.pipe(context.output ?? process.stdout);
    const rl = readline2.createInterface({
      terminal: true,
      input,
      output
    });
    const screen = new ScreenManager(rl);
    const { promise, resolve, reject } = PromisePolyfill.withResolver();
    const cancel = () => reject(new CancelPromptError);
    if (signal) {
      const abort = () => reject(new AbortPromptError({ cause: signal.reason }));
      if (signal.aborted) {
        abort();
        return Object.assign(promise, { cancel });
      }
      signal.addEventListener("abort", abort);
      cleanups.add(() => signal.removeEventListener("abort", abort));
    }
    cleanups.add(onExit((code, signal2) => {
      reject(new ExitPromptError(`User force closed the prompt with ${code} ${signal2}`));
    }));
    const sigint = () => reject(new ExitPromptError(`User force closed the prompt with SIGINT`));
    rl.on("SIGINT", sigint);
    cleanups.add(() => rl.removeListener("SIGINT", sigint));
    const checkCursorPos = () => screen.checkCursorPos();
    rl.input.on("keypress", checkCursorPos);
    cleanups.add(() => rl.input.removeListener("keypress", checkCursorPos));
    return withHooks(rl, (cycle) => {
      const hooksCleanup = AsyncResource3.bind(() => effectScheduler.clearAll());
      rl.on("close", hooksCleanup);
      cleanups.add(() => rl.removeListener("close", hooksCleanup));
      cycle(() => {
        try {
          const nextView = view(config, (value) => {
            setImmediate(() => resolve(value));
          });
          if (nextView === undefined) {
            const callerFilename = callSites[1]?.getFileName();
            throw new Error(`Prompt functions must return a string.
    at ${callerFilename}`);
          }
          const [content, bottomContent] = typeof nextView === "string" ? [nextView] : nextView;
          screen.render(content, bottomContent);
          effectScheduler.run();
        } catch (error) {
          reject(error);
        }
      });
      return Object.assign(promise.then((answer) => {
        effectScheduler.clearAll();
        return answer;
      }, (error) => {
        effectScheduler.clearAll();
        throw error;
      }).finally(() => {
        cleanups.forEach((cleanup) => cleanup());
        screen.done({ clearContent: Boolean(context.clearPromptOnDone) });
        output.end();
      }).then(() => promise), { cancel });
    });
  };
  return prompt;
}
// node_modules/@inquirer/core/dist/esm/lib/Separator.js
var import_yoctocolors_cjs2 = __toESM(require_yoctocolors_cjs(), 1);
class Separator {
  separator = import_yoctocolors_cjs2.default.dim(Array.from({ length: 15 }).join(esm_default.line));
  type = "separator";
  constructor(separator) {
    if (separator) {
      this.separator = separator;
    }
  }
  static isSeparator(choice) {
    return Boolean(choice && typeof choice === "object" && "type" in choice && choice.type === "separator");
  }
}
// node_modules/@inquirer/confirm/dist/esm/index.js
function getBooleanValue(value, defaultValue) {
  let answer = defaultValue !== false;
  if (/^(y|yes)/i.test(value))
    answer = true;
  else if (/^(n|no)/i.test(value))
    answer = false;
  return answer;
}
function boolToString(value) {
  return value ? "Yes" : "No";
}
var esm_default2 = createPrompt((config, done) => {
  const { transformer = boolToString } = config;
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState("");
  const theme = makeTheme(config.theme);
  const prefix = usePrefix({ status, theme });
  useKeypress((key2, rl) => {
    if (status !== "idle")
      return;
    if (isEnterKey(key2)) {
      const answer = getBooleanValue(value, config.default);
      setValue(transformer(answer));
      setStatus("done");
      done(answer);
    } else if (isTabKey(key2)) {
      const answer = boolToString(!getBooleanValue(value, config.default));
      rl.clearLine(0);
      rl.write(answer);
      setValue(answer);
    } else {
      setValue(rl.line);
    }
  });
  let formattedValue = value;
  let defaultValue = "";
  if (status === "done") {
    formattedValue = theme.style.answer(value);
  } else {
    defaultValue = ` ${theme.style.defaultAnswer(config.default === false ? "y/N" : "Y/n")}`;
  }
  const message = theme.style.message(config.message, status);
  return `${prefix} ${message}${defaultValue} ${formattedValue}`;
});
// node_modules/@inquirer/select/dist/esm/index.js
var import_yoctocolors_cjs3 = __toESM(require_yoctocolors_cjs(), 1);
var selectTheme = {
  icon: { cursor: esm_default.pointer },
  style: {
    disabled: (text) => import_yoctocolors_cjs3.default.dim(`- ${text}`),
    description: (text) => import_yoctocolors_cjs3.default.cyan(text)
  },
  helpMode: "auto",
  indexMode: "hidden"
};
function isSelectable(item) {
  return !Separator.isSeparator(item) && !item.disabled;
}
function normalizeChoices(choices) {
  return choices.map((choice) => {
    if (Separator.isSeparator(choice))
      return choice;
    if (typeof choice === "string") {
      return {
        value: choice,
        name: choice,
        short: choice,
        disabled: false
      };
    }
    const name = choice.name ?? String(choice.value);
    const normalizedChoice = {
      value: choice.value,
      name,
      short: choice.short ?? name,
      disabled: choice.disabled ?? false
    };
    if (choice.description) {
      normalizedChoice.description = choice.description;
    }
    return normalizedChoice;
  });
}
var esm_default3 = createPrompt((config, done) => {
  const { loop = true, pageSize = 7 } = config;
  const firstRender = useRef(true);
  const theme = makeTheme(selectTheme, config.theme);
  const [status, setStatus] = useState("idle");
  const prefix = usePrefix({ status, theme });
  const searchTimeoutRef = useRef();
  const items = useMemo(() => normalizeChoices(config.choices), [config.choices]);
  const bounds = useMemo(() => {
    const first = items.findIndex(isSelectable);
    const last = items.findLastIndex(isSelectable);
    if (first === -1) {
      throw new ValidationError("[select prompt] No selectable choices. All choices are disabled.");
    }
    return { first, last };
  }, [items]);
  const defaultItemIndex = useMemo(() => {
    if (!("default" in config))
      return -1;
    return items.findIndex((item) => isSelectable(item) && item.value === config.default);
  }, [config.default, items]);
  const [active, setActive] = useState(defaultItemIndex === -1 ? bounds.first : defaultItemIndex);
  const selectedChoice = items[active];
  useKeypress((key2, rl) => {
    clearTimeout(searchTimeoutRef.current);
    if (isEnterKey(key2)) {
      setStatus("done");
      done(selectedChoice.value);
    } else if (isUpKey(key2) || isDownKey(key2)) {
      rl.clearLine(0);
      if (loop || isUpKey(key2) && active !== bounds.first || isDownKey(key2) && active !== bounds.last) {
        const offset = isUpKey(key2) ? -1 : 1;
        let next = active;
        do {
          next = (next + offset + items.length) % items.length;
        } while (!isSelectable(items[next]));
        setActive(next);
      }
    } else if (isNumberKey(key2) && !Number.isNaN(Number(rl.line))) {
      const selectedIndex = Number(rl.line) - 1;
      let selectableIndex = -1;
      const position = items.findIndex((item2) => {
        if (Separator.isSeparator(item2))
          return false;
        selectableIndex++;
        return selectableIndex === selectedIndex;
      });
      const item = items[position];
      if (item != null && isSelectable(item)) {
        setActive(position);
      }
      searchTimeoutRef.current = setTimeout(() => {
        rl.clearLine(0);
      }, 700);
    } else if (isBackspaceKey(key2)) {
      rl.clearLine(0);
    } else {
      const searchTerm = rl.line.toLowerCase();
      const matchIndex = items.findIndex((item) => {
        if (Separator.isSeparator(item) || !isSelectable(item))
          return false;
        return item.name.toLowerCase().startsWith(searchTerm);
      });
      if (matchIndex !== -1) {
        setActive(matchIndex);
      }
      searchTimeoutRef.current = setTimeout(() => {
        rl.clearLine(0);
      }, 700);
    }
  });
  useEffect(() => () => {
    clearTimeout(searchTimeoutRef.current);
  }, []);
  const message = theme.style.message(config.message, status);
  let helpTipTop = "";
  let helpTipBottom = "";
  if (theme.helpMode === "always" || theme.helpMode === "auto" && firstRender.current) {
    firstRender.current = false;
    if (items.length > pageSize) {
      helpTipBottom = `
${theme.style.help(`(${config.instructions?.pager ?? "Use arrow keys to reveal more choices"})`)}`;
    } else {
      helpTipTop = theme.style.help(`(${config.instructions?.navigation ?? "Use arrow keys"})`);
    }
  }
  let separatorCount = 0;
  const page = usePagination({
    items,
    active,
    renderItem({ item, isActive, index }) {
      if (Separator.isSeparator(item)) {
        separatorCount++;
        return ` ${item.separator}`;
      }
      const indexLabel = theme.indexMode === "number" ? `${index + 1 - separatorCount}. ` : "";
      if (item.disabled) {
        const disabledLabel = typeof item.disabled === "string" ? item.disabled : "(disabled)";
        return theme.style.disabled(`${indexLabel}${item.name} ${disabledLabel}`);
      }
      const color = isActive ? theme.style.highlight : (x) => x;
      const cursor = isActive ? theme.icon.cursor : ` `;
      return color(`${cursor} ${indexLabel}${item.name}`);
    },
    pageSize,
    loop
  });
  if (status === "done") {
    return `${prefix} ${message} ${theme.style.answer(selectedChoice.short)}`;
  }
  const choiceDescription = selectedChoice.description ? `
${theme.style.description(selectedChoice.description)}` : ``;
  return `${[prefix, message, helpTipTop].filter(Boolean).join(" ")}
${page}${helpTipBottom}${choiceDescription}${cursorHide}`;
});
// node_modules/commander/esm.mjs
var import__ = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  Command,
  Argument,
  Option,
  Help
} = import__.default;
// acls.toml
var acls_default = {
  roles: {
    admin: {
      description: "Full administrative access to all cluster resources",
      acls: [
        {
          resource_type: "TOPIC",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "ALL",
          permission_type: "ALLOW",
          host: "*"
        },
        {
          resource_type: "GROUP",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "ALL",
          permission_type: "ALLOW",
          host: "*"
        },
        {
          resource_type: "CLUSTER",
          resource_name: "kafka-cluster",
          resource_pattern_type: "LITERAL",
          operation: "ALL",
          permission_type: "ALLOW",
          host: "*"
        },
        {
          resource_type: "TRANSACTIONAL_ID",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "ALL",
          permission_type: "ALLOW",
          host: "*"
        },
        {
          resource_type: "REGISTRY",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "ALL",
          permission_type: "ALLOW",
          host: "*"
        },
        {
          resource_type: "SUBJECT",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "ALL",
          permission_type: "ALLOW",
          host: "*"
        }
      ]
    },
    writer: {
      description: "Write access to topics and groups",
      acls: [
        {
          resource_type: "TOPIC",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "WRITE",
          permission_type: "ALLOW",
          host: "*"
        },
        {
          resource_type: "GROUP",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "WRITE",
          permission_type: "ALLOW",
          host: "*"
        }
      ]
    },
    reader: {
      description: "Read access to topics and groups",
      acls: [
        {
          resource_type: "TOPIC",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "READ",
          permission_type: "ALLOW",
          host: "*"
        },
        {
          resource_type: "GROUP",
          resource_name: "*",
          resource_pattern_type: "LITERAL",
          operation: "READ",
          permission_type: "ALLOW",
          host: "*"
        }
      ]
    }
  }
};

// node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
function protoCamelCase(snakeCase) {
  let capNext = false;
  const b = [];
  for (let i = 0;i < snakeCase.length; i++) {
    let c = snakeCase.charAt(i);
    switch (c) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        b.push(c);
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c = c.toUpperCase();
        }
        b.push(c);
        break;
    }
  }
  return b.join("");
}
var reservedObjectProperties = new Set([
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function safeObjectProperty(name) {
  return reservedObjectProperties.has(name) ? name + "$" : name;
}

// node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
function varint64read() {
  let lowBits = 0;
  let highBits = 0;
  for (let shift = 0;shift < 28; shift += 7) {
    let b = this.buf[this.pos++];
    lowBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  let middleByte = this.buf[this.pos++];
  lowBits |= (middleByte & 15) << 28;
  highBits = (middleByte & 112) >> 4;
  if ((middleByte & 128) == 0) {
    this.assertBounds();
    return [lowBits, highBits];
  }
  for (let shift = 3;shift <= 31; shift += 7) {
    let b = this.buf[this.pos++];
    highBits |= (b & 127) << shift;
    if ((b & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  throw new Error("invalid varint");
}
function varint64write(lo, hi, bytes) {
  for (let i = 0;i < 28; i = i + 7) {
    const shift = lo >>> i;
    const hasNext = !(shift >>> 7 == 0 && hi == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
  const hasMoreBits = !(hi >> 3 == 0);
  bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
  if (!hasMoreBits) {
    return;
  }
  for (let i = 3;i < 31; i = i + 7) {
    const shift = hi >>> i;
    const hasNext = !(shift >>> 7 == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  bytes.push(hi >>> 31 & 1);
}
var TWO_PWR_32_DBL = 4294967296;
function int64FromString(dec) {
  const minus = dec[0] === "-";
  if (minus) {
    dec = dec.slice(1);
  }
  const base = 1e6;
  let lowBits = 0;
  let highBits = 0;
  function add1e6digit(begin, end) {
    const digit1e6 = Number(dec.slice(begin, end));
    highBits *= base;
    lowBits = lowBits * base + digit1e6;
    if (lowBits >= TWO_PWR_32_DBL) {
      highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
      lowBits = lowBits % TWO_PWR_32_DBL;
    }
  }
  add1e6digit(-24, -18);
  add1e6digit(-18, -12);
  add1e6digit(-12, -6);
  add1e6digit(-6);
  return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
function int64ToString(lo, hi) {
  let bits = newBits(lo, hi);
  const negative = bits.hi & 2147483648;
  if (negative) {
    bits = negate(bits.lo, bits.hi);
  }
  const result = uInt64ToString(bits.lo, bits.hi);
  return negative ? "-" + result : result;
}
function uInt64ToString(lo, hi) {
  ({ lo, hi } = toUnsigned(lo, hi));
  if (hi <= 2097151) {
    return String(TWO_PWR_32_DBL * hi + lo);
  }
  const low = lo & 16777215;
  const mid = (lo >>> 24 | hi << 8) & 16777215;
  const high = hi >> 16 & 65535;
  let digitA = low + mid * 6777216 + high * 6710656;
  let digitB = mid + high * 8147497;
  let digitC = high * 2;
  const base = 1e7;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }
  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }
  return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi) {
  return { lo: lo >>> 0, hi: hi >>> 0 };
}
function newBits(lo, hi) {
  return { lo: lo | 0, hi: hi | 0 };
}
function negate(lowBits, highBits) {
  highBits = ~highBits;
  if (lowBits) {
    lowBits = ~lowBits + 1;
  } else {
    highBits += 1;
  }
  return newBits(lowBits, highBits);
}
var decimalFrom1e7WithLeadingZeros = (digit1e7) => {
  const partial = String(digit1e7);
  return "0000000".slice(partial.length) + partial;
};
function varint32write(value, bytes) {
  if (value >= 0) {
    while (value > 127) {
      bytes.push(value & 127 | 128);
      value = value >>> 7;
    }
    bytes.push(value);
  } else {
    for (let i = 0;i < 9; i++) {
      bytes.push(value & 127 | 128);
      value = value >> 7;
    }
    bytes.push(1);
  }
}
function varint32read() {
  let b = this.buf[this.pos++];
  let result = b & 127;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 7;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 14;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 127) << 21;
  if ((b & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b = this.buf[this.pos++];
  result |= (b & 15) << 28;
  for (let readBytes = 5;(b & 128) !== 0 && readBytes < 10; readBytes++)
    b = this.buf[this.pos++];
  if ((b & 128) != 0)
    throw new Error("invalid varint");
  this.assertBounds();
  return result >>> 0;
}

// node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
var protoInt64 = /* @__PURE__ */ makeInt64Support();
function makeInt64Support() {
  const dv = new DataView(new ArrayBuffer(8));
  const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1");
  if (ok) {
    const MIN = BigInt("-9223372036854775808");
    const MAX = BigInt("9223372036854775807");
    const UMIN = BigInt("0");
    const UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > MAX || bi < MIN) {
          throw new Error(`invalid int64: ${value}`);
        }
        return bi;
      },
      uParse(value) {
        const bi = typeof value == "bigint" ? value : BigInt(value);
        if (bi > UMAX || bi < UMIN) {
          throw new Error(`invalid uint64: ${value}`);
        }
        return bi;
      },
      enc(value) {
        dv.setBigInt64(0, this.parse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      uEnc(value) {
        dv.setBigInt64(0, this.uParse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      dec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigInt64(0, true);
      },
      uDec(lo, hi) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi, true);
        return dv.getBigUint64(0, true);
      }
    };
  }
  return {
    zero: "0",
    supported: false,
    parse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return value;
    },
    uParse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return value;
    },
    enc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return int64FromString(value);
    },
    uEnc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return int64FromString(value);
    },
    dec(lo, hi) {
      return int64ToString(lo, hi);
    },
    uDec(lo, hi) {
      return uInt64ToString(lo, hi);
    }
  };
}
function assertInt64String(value) {
  if (!/^-?[0-9]+$/.test(value)) {
    throw new Error("invalid int64: " + value);
  }
}
function assertUInt64String(value) {
  if (!/^[0-9]+$/.test(value)) {
    throw new Error("invalid uint64: " + value);
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
var ScalarType;
(function(ScalarType2) {
  ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
  ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
  ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
  ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
  ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
  ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
  ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
  ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
  ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
  ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
  ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
  ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
  ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
  ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
  ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));

// node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
function scalarZeroValue(type, longAsString) {
  switch (type) {
    case ScalarType.STRING:
      return "";
    case ScalarType.BOOL:
      return false;
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0;
    case ScalarType.INT64:
    case ScalarType.UINT64:
    case ScalarType.SFIXED64:
    case ScalarType.FIXED64:
    case ScalarType.SINT64:
      return longAsString ? "0" : protoInt64.zero;
    case ScalarType.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}
function isScalarZeroValue(type, value) {
  switch (type) {
    case ScalarType.BOOL:
      return value === false;
    case ScalarType.STRING:
      return value === "";
    case ScalarType.BYTES:
      return value instanceof Uint8Array && !value.byteLength;
    default:
      return value == 0;
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
var IMPLICIT = 2;
var unsafeLocal = Symbol.for("reflect unsafe local");
function unsafeOneofCase(target, oneof) {
  const c = target[oneof.localName].case;
  if (c === undefined) {
    return c;
  }
  return oneof.fields.find((f) => f.localName === c);
}
function unsafeIsSet(target, field) {
  const name = field.localName;
  if (field.oneof) {
    return target[field.oneof.localName].case === name;
  }
  if (field.presence != IMPLICIT) {
    return target[name] !== undefined && Object.prototype.hasOwnProperty.call(target, name);
  }
  switch (field.fieldKind) {
    case "list":
      return target[name].length > 0;
    case "map":
      return Object.keys(target[name]).length > 0;
    case "scalar":
      return !isScalarZeroValue(field.scalar, target[name]);
    case "enum":
      return target[name] !== field.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function unsafeIsSetExplicit(target, localName) {
  return Object.prototype.hasOwnProperty.call(target, localName) && target[localName] !== undefined;
}
function unsafeGet(target, field) {
  if (field.oneof) {
    const oneof = target[field.oneof.localName];
    if (oneof.case === field.localName) {
      return oneof.value;
    }
    return;
  }
  return target[field.localName];
}
function unsafeSet(target, field, value) {
  if (field.oneof) {
    target[field.oneof.localName] = {
      case: field.localName,
      value
    };
  } else {
    target[field.localName] = value;
  }
}
function unsafeClear(target, field) {
  const name = field.localName;
  if (field.oneof) {
    const oneofLocalName = field.oneof.localName;
    if (target[oneofLocalName].case === name) {
      target[oneofLocalName] = { case: undefined };
    }
  } else if (field.presence != IMPLICIT) {
    delete target[name];
  } else {
    switch (field.fieldKind) {
      case "map":
        target[name] = {};
        break;
      case "list":
        target[name] = [];
        break;
      case "enum":
        target[name] = field.enum.values[0].number;
        break;
      case "scalar":
        target[name] = scalarZeroValue(field.scalar, field.longAsString);
        break;
    }
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/restore-json-names.js
function restoreJsonNames(message) {
  for (const f of message.field) {
    if (!unsafeIsSetExplicit(f, "jsonName")) {
      f.jsonName = protoCamelCase(f.name);
    }
  }
  message.nestedType.forEach(restoreJsonNames);
}

// node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
function parseTextFormatEnumValue(descEnum, value) {
  const enumValue = descEnum.values.find((v) => v.name === value);
  if (!enumValue) {
    throw new Error(`cannot parse ${descEnum} default value: ${value}`);
  }
  return enumValue.number;
}
function parseTextFormatScalarValue(type, value) {
  switch (type) {
    case ScalarType.STRING:
      return value;
    case ScalarType.BYTES: {
      const u = unescapeBytesDefaultValue(value);
      if (u === false) {
        throw new Error(`cannot parse ${ScalarType[type]} default value: ${value}`);
      }
      return u;
    }
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return protoInt64.parse(value);
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return protoInt64.uParse(value);
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      switch (value) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(value);
      }
    case ScalarType.BOOL:
      return value === "true";
    case ScalarType.INT32:
    case ScalarType.UINT32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
      return parseInt(value, 10);
  }
}
function unescapeBytesDefaultValue(str) {
  const b = [];
  const input = {
    tail: str,
    c: "",
    next() {
      if (this.tail.length == 0) {
        return false;
      }
      this.c = this.tail[0];
      this.tail = this.tail.substring(1);
      return true;
    },
    take(n) {
      if (this.tail.length >= n) {
        const r = this.tail.substring(0, n);
        this.tail = this.tail.substring(n);
        return r;
      }
      return false;
    }
  };
  while (input.next()) {
    switch (input.c) {
      case "\\":
        if (input.next()) {
          switch (input.c) {
            case "\\":
              b.push(input.c.charCodeAt(0));
              break;
            case "b":
              b.push(8);
              break;
            case "f":
              b.push(12);
              break;
            case "n":
              b.push(10);
              break;
            case "r":
              b.push(13);
              break;
            case "t":
              b.push(9);
              break;
            case "v":
              b.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 8);
              if (Number.isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "x": {
              const s = input.c;
              const t = input.take(2);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (Number.isNaN(n)) {
                return false;
              }
              b.push(n);
              break;
            }
            case "u": {
              const s = input.c;
              const t = input.take(4);
              if (t === false) {
                return false;
              }
              const n = parseInt(s + t, 16);
              if (Number.isNaN(n)) {
                return false;
              }
              const chunk = new Uint8Array(4);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, n, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3]);
              break;
            }
            case "U": {
              const s = input.c;
              const t = input.take(8);
              if (t === false) {
                return false;
              }
              const tc = protoInt64.uEnc(s + t);
              const chunk = new Uint8Array(8);
              const view = new DataView(chunk.buffer);
              view.setInt32(0, tc.lo, true);
              view.setInt32(4, tc.hi, true);
              b.push(chunk[0], chunk[1], chunk[2], chunk[3], chunk[4], chunk[5], chunk[6], chunk[7]);
              break;
            }
          }
        }
        break;
      default:
        b.push(input.c.charCodeAt(0));
    }
  }
  return new Uint8Array(b);
}

// node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
function* nestedTypes(desc) {
  switch (desc.kind) {
    case "file":
      for (const message of desc.messages) {
        yield message;
        yield* nestedTypes(message);
      }
      yield* desc.enums;
      yield* desc.services;
      yield* desc.extensions;
      break;
    case "message":
      for (const message of desc.nestedMessages) {
        yield message;
        yield* nestedTypes(message);
      }
      yield* desc.nestedEnums;
      yield* desc.nestedExtensions;
      break;
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/registry.js
function createFileRegistry(...args) {
  const registry = createBaseRegistry();
  if (!args.length) {
    return registry;
  }
  if ("$typeName" in args[0] && args[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const file of args[0].file) {
      addFile(file, registry);
    }
    return registry;
  }
  if ("$typeName" in args[0]) {
    let recurseDeps = function(file) {
      const deps = [];
      for (const protoFileName of file.dependency) {
        if (registry.getFile(protoFileName) != null) {
          continue;
        }
        if (seen.has(protoFileName)) {
          continue;
        }
        const dep = resolve(protoFileName);
        if (!dep) {
          throw new Error(`Unable to resolve ${protoFileName}, imported by ${file.name}`);
        }
        if ("kind" in dep) {
          registry.addFile(dep, false, true);
        } else {
          seen.add(dep.name);
          deps.push(dep);
        }
      }
      return deps.concat(...deps.map(recurseDeps));
    };
    const input = args[0];
    const resolve = args[1];
    const seen = new Set;
    for (const file of [input, ...recurseDeps(input)].reverse()) {
      addFile(file, registry);
    }
  } else {
    for (const fileReg of args) {
      for (const file of fileReg.files) {
        registry.addFile(file);
      }
    }
  }
  return registry;
}
function createBaseRegistry() {
  const types = new Map;
  const extendees = new Map;
  const files = new Map;
  return {
    kind: "registry",
    types,
    extendees,
    [Symbol.iterator]() {
      return types.values();
    },
    get files() {
      return files.values();
    },
    addFile(file, skipTypes, withDeps) {
      files.set(file.proto.name, file);
      if (!skipTypes) {
        for (const type of nestedTypes(file)) {
          this.add(type);
        }
      }
      if (withDeps) {
        for (const f of file.dependencies) {
          this.addFile(f, skipTypes, withDeps);
        }
      }
    },
    add(desc) {
      if (desc.kind == "extension") {
        let numberToExt = extendees.get(desc.extendee.typeName);
        if (!numberToExt) {
          extendees.set(desc.extendee.typeName, numberToExt = new Map);
        }
        numberToExt.set(desc.number, desc);
      }
      types.set(desc.typeName, desc);
    },
    get(typeName) {
      return types.get(typeName);
    },
    getFile(fileName) {
      return files.get(fileName);
    },
    getMessage(typeName) {
      const t = types.get(typeName);
      return (t === null || t === undefined ? undefined : t.kind) == "message" ? t : undefined;
    },
    getEnum(typeName) {
      const t = types.get(typeName);
      return (t === null || t === undefined ? undefined : t.kind) == "enum" ? t : undefined;
    },
    getExtension(typeName) {
      const t = types.get(typeName);
      return (t === null || t === undefined ? undefined : t.kind) == "extension" ? t : undefined;
    },
    getExtensionFor(extendee, no) {
      var _a;
      return (_a = extendees.get(extendee.typeName)) === null || _a === undefined ? undefined : _a.get(no);
    },
    getService(typeName) {
      const t = types.get(typeName);
      return (t === null || t === undefined ? undefined : t.kind) == "service" ? t : undefined;
    }
  };
}
var EDITION_PROTO2 = 998;
var EDITION_PROTO3 = 999;
var TYPE_STRING = 9;
var TYPE_GROUP = 10;
var TYPE_MESSAGE = 11;
var TYPE_BYTES = 12;
var TYPE_ENUM = 14;
var LABEL_REPEATED = 3;
var LABEL_REQUIRED = 2;
var JS_STRING = 1;
var IDEMPOTENCY_UNKNOWN = 0;
var EXPLICIT = 1;
var IMPLICIT2 = 2;
var LEGACY_REQUIRED = 3;
var PACKED = 1;
var DELIMITED = 2;
var OPEN = 1;
var featureDefaults = {
  998: {
    fieldPresence: 1,
    enumType: 2,
    repeatedFieldEncoding: 2,
    utf8Validation: 3,
    messageEncoding: 1,
    jsonFormat: 2,
    enforceNamingStyle: 2,
    defaultSymbolVisibility: 1
  },
  999: {
    fieldPresence: 2,
    enumType: 1,
    repeatedFieldEncoding: 1,
    utf8Validation: 2,
    messageEncoding: 1,
    jsonFormat: 1,
    enforceNamingStyle: 2,
    defaultSymbolVisibility: 1
  },
  1000: {
    fieldPresence: 1,
    enumType: 1,
    repeatedFieldEncoding: 1,
    utf8Validation: 2,
    messageEncoding: 1,
    jsonFormat: 1,
    enforceNamingStyle: 2,
    defaultSymbolVisibility: 1
  },
  1001: {
    fieldPresence: 1,
    enumType: 1,
    repeatedFieldEncoding: 1,
    utf8Validation: 2,
    messageEncoding: 1,
    jsonFormat: 1,
    enforceNamingStyle: 1,
    defaultSymbolVisibility: 2
  }
};
function addFile(proto, reg) {
  var _a, _b;
  const file = {
    kind: "file",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === undefined ? undefined : _a.deprecated) !== null && _b !== undefined ? _b : false,
    edition: getFileEdition(proto),
    name: proto.name.replace(/\.proto$/, ""),
    dependencies: findFileDependencies(proto, reg),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${proto.name}`;
    }
  };
  const mapEntriesStore = new Map;
  const mapEntries = {
    get(typeName) {
      return mapEntriesStore.get(typeName);
    },
    add(desc) {
      var _a2;
      assert(((_a2 = desc.proto.options) === null || _a2 === undefined ? undefined : _a2.mapEntry) === true);
      mapEntriesStore.set(desc.typeName, desc);
    }
  };
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, undefined, reg);
  }
  for (const messageProto of proto.messageType) {
    addMessage(messageProto, file, undefined, reg, mapEntries);
  }
  for (const serviceProto of proto.service) {
    addService(serviceProto, file, reg);
  }
  addExtensions(file, reg);
  for (const mapEntry of mapEntriesStore.values()) {
    addFields(mapEntry, reg, mapEntries);
  }
  for (const message of file.messages) {
    addFields(message, reg, mapEntries);
    addExtensions(message, reg);
  }
  reg.addFile(file, true);
}
function addExtensions(desc, reg) {
  switch (desc.kind) {
    case "file":
      for (const proto of desc.proto.extension) {
        const ext = newField(proto, desc, reg);
        desc.extensions.push(ext);
        reg.add(ext);
      }
      break;
    case "message":
      for (const proto of desc.proto.extension) {
        const ext = newField(proto, desc, reg);
        desc.nestedExtensions.push(ext);
        reg.add(ext);
      }
      for (const message of desc.nestedMessages) {
        addExtensions(message, reg);
      }
      break;
  }
}
function addFields(message, reg, mapEntries) {
  const allOneofs = message.proto.oneofDecl.map((proto) => newOneof(proto, message));
  const oneofsSeen = new Set;
  for (const proto of message.proto.field) {
    const oneof = findOneof(proto, allOneofs);
    const field = newField(proto, message, reg, oneof, mapEntries);
    message.fields.push(field);
    message.field[field.localName] = field;
    if (oneof === undefined) {
      message.members.push(field);
    } else {
      oneof.fields.push(field);
      if (!oneofsSeen.has(oneof)) {
        oneofsSeen.add(oneof);
        message.members.push(oneof);
      }
    }
  }
  for (const oneof of allOneofs.filter((o) => oneofsSeen.has(o))) {
    message.oneofs.push(oneof);
  }
  for (const child of message.nestedMessages) {
    addFields(child, reg, mapEntries);
  }
}
function addEnum(proto, file, parent, reg) {
  var _a, _b, _c, _d, _e;
  const sharedPrefix = findEnumSharedPrefix(proto.name, proto.value);
  const desc = {
    kind: "enum",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === undefined ? undefined : _a.deprecated) !== null && _b !== undefined ? _b : false,
    file,
    parent,
    open: true,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    value: {},
    values: [],
    sharedPrefix,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  desc.open = isEnumOpen(desc);
  reg.add(desc);
  for (const p of proto.value) {
    const name = p.name;
    desc.values.push(desc.value[p.number] = {
      kind: "enum_value",
      proto: p,
      deprecated: (_d = (_c = p.options) === null || _c === undefined ? undefined : _c.deprecated) !== null && _d !== undefined ? _d : false,
      parent: desc,
      name,
      localName: safeObjectProperty(sharedPrefix == undefined ? name : name.substring(sharedPrefix.length)),
      number: p.number,
      toString() {
        return `enum value ${desc.typeName}.${name}`;
      }
    });
  }
  ((_e = parent === null || parent === undefined ? undefined : parent.nestedEnums) !== null && _e !== undefined ? _e : file.enums).push(desc);
}
function addMessage(proto, file, parent, reg, mapEntries) {
  var _a, _b, _c, _d;
  const desc = {
    kind: "message",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === undefined ? undefined : _a.deprecated) !== null && _b !== undefined ? _b : false,
    file,
    parent,
    name: proto.name,
    typeName: makeTypeName(proto, parent, file),
    fields: [],
    field: {},
    oneofs: [],
    members: [],
    nestedEnums: [],
    nestedMessages: [],
    nestedExtensions: [],
    toString() {
      return `message ${this.typeName}`;
    }
  };
  if (((_c = proto.options) === null || _c === undefined ? undefined : _c.mapEntry) === true) {
    mapEntries.add(desc);
  } else {
    ((_d = parent === null || parent === undefined ? undefined : parent.nestedMessages) !== null && _d !== undefined ? _d : file.messages).push(desc);
    reg.add(desc);
  }
  for (const enumProto of proto.enumType) {
    addEnum(enumProto, file, desc, reg);
  }
  for (const messageProto of proto.nestedType) {
    addMessage(messageProto, file, desc, reg, mapEntries);
  }
}
function addService(proto, file, reg) {
  var _a, _b;
  const desc = {
    kind: "service",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === undefined ? undefined : _a.deprecated) !== null && _b !== undefined ? _b : false,
    file,
    name: proto.name,
    typeName: makeTypeName(proto, undefined, file),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  file.services.push(desc);
  reg.add(desc);
  for (const methodProto of proto.method) {
    const method = newMethod(methodProto, desc, reg);
    desc.methods.push(method);
    desc.method[method.localName] = method;
  }
}
function newMethod(proto, parent, reg) {
  var _a, _b, _c, _d;
  let methodKind;
  if (proto.clientStreaming && proto.serverStreaming) {
    methodKind = "bidi_streaming";
  } else if (proto.clientStreaming) {
    methodKind = "client_streaming";
  } else if (proto.serverStreaming) {
    methodKind = "server_streaming";
  } else {
    methodKind = "unary";
  }
  const input = reg.getMessage(trimLeadingDot(proto.inputType));
  const output = reg.getMessage(trimLeadingDot(proto.outputType));
  assert(input, `invalid MethodDescriptorProto: input_type ${proto.inputType} not found`);
  assert(output, `invalid MethodDescriptorProto: output_type ${proto.inputType} not found`);
  const name = proto.name;
  return {
    kind: "rpc",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === undefined ? undefined : _a.deprecated) !== null && _b !== undefined ? _b : false,
    parent,
    name,
    localName: safeObjectProperty(name.length ? safeObjectProperty(name[0].toLowerCase() + name.substring(1)) : name),
    methodKind,
    input,
    output,
    idempotency: (_d = (_c = proto.options) === null || _c === undefined ? undefined : _c.idempotencyLevel) !== null && _d !== undefined ? _d : IDEMPOTENCY_UNKNOWN,
    toString() {
      return `rpc ${parent.typeName}.${name}`;
    }
  };
}
function newOneof(proto, parent) {
  return {
    kind: "oneof",
    proto,
    deprecated: false,
    parent,
    fields: [],
    name: proto.name,
    localName: safeObjectProperty(protoCamelCase(proto.name)),
    toString() {
      return `oneof ${parent.typeName}.${this.name}`;
    }
  };
}
function newField(proto, parentOrFile, reg, oneof, mapEntries) {
  var _a, _b, _c;
  const isExtension = mapEntries === undefined;
  const field = {
    kind: "field",
    proto,
    deprecated: (_b = (_a = proto.options) === null || _a === undefined ? undefined : _a.deprecated) !== null && _b !== undefined ? _b : false,
    name: proto.name,
    number: proto.number,
    scalar: undefined,
    message: undefined,
    enum: undefined,
    presence: getFieldPresence(proto, oneof, isExtension, parentOrFile),
    listKind: undefined,
    mapKind: undefined,
    mapKey: undefined,
    delimitedEncoding: undefined,
    packed: undefined,
    longAsString: false,
    getDefaultValue: undefined
  };
  if (isExtension) {
    const file = parentOrFile.kind == "file" ? parentOrFile : parentOrFile.file;
    const parent = parentOrFile.kind == "file" ? undefined : parentOrFile;
    const typeName = makeTypeName(proto, parent, file);
    field.kind = "extension";
    field.file = file;
    field.parent = parent;
    field.oneof = undefined;
    field.typeName = typeName;
    field.jsonName = `[${typeName}]`;
    field.toString = () => `extension ${typeName}`;
    const extendee = reg.getMessage(trimLeadingDot(proto.extendee));
    assert(extendee, `invalid FieldDescriptorProto: extendee ${proto.extendee} not found`);
    field.extendee = extendee;
  } else {
    const parent = parentOrFile;
    assert(parent.kind == "message");
    field.parent = parent;
    field.oneof = oneof;
    field.localName = oneof ? protoCamelCase(proto.name) : safeObjectProperty(protoCamelCase(proto.name));
    field.jsonName = proto.jsonName;
    field.toString = () => `field ${parent.typeName}.${proto.name}`;
  }
  const label = proto.label;
  const type = proto.type;
  const jstype = (_c = proto.options) === null || _c === undefined ? undefined : _c.jstype;
  if (label === LABEL_REPEATED) {
    const mapEntry = type == TYPE_MESSAGE ? mapEntries === null || mapEntries === undefined ? undefined : mapEntries.get(trimLeadingDot(proto.typeName)) : undefined;
    if (mapEntry) {
      field.fieldKind = "map";
      const { key: key2, value } = findMapEntryFields(mapEntry);
      field.mapKey = key2.scalar;
      field.mapKind = value.fieldKind;
      field.message = value.message;
      field.delimitedEncoding = false;
      field.enum = value.enum;
      field.scalar = value.scalar;
      return field;
    }
    field.fieldKind = "list";
    switch (type) {
      case TYPE_MESSAGE:
      case TYPE_GROUP:
        field.listKind = "message";
        field.message = reg.getMessage(trimLeadingDot(proto.typeName));
        assert(field.message);
        field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
        break;
      case TYPE_ENUM:
        field.listKind = "enum";
        field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
        assert(field.enum);
        break;
      default:
        field.listKind = "scalar";
        field.scalar = type;
        field.longAsString = jstype == JS_STRING;
        break;
    }
    field.packed = isPackedField(proto, parentOrFile);
    return field;
  }
  switch (type) {
    case TYPE_MESSAGE:
    case TYPE_GROUP:
      field.fieldKind = "message";
      field.message = reg.getMessage(trimLeadingDot(proto.typeName));
      assert(field.message, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
      field.delimitedEncoding = isDelimitedEncoding(proto, parentOrFile);
      field.getDefaultValue = () => {
        return;
      };
      break;
    case TYPE_ENUM: {
      const enumeration = reg.getEnum(trimLeadingDot(proto.typeName));
      assert(enumeration !== undefined, `invalid FieldDescriptorProto: type_name ${proto.typeName} not found`);
      field.fieldKind = "enum";
      field.enum = reg.getEnum(trimLeadingDot(proto.typeName));
      field.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatEnumValue(enumeration, proto.defaultValue) : undefined;
      };
      break;
    }
    default: {
      field.fieldKind = "scalar";
      field.scalar = type;
      field.longAsString = jstype == JS_STRING;
      field.getDefaultValue = () => {
        return unsafeIsSetExplicit(proto, "defaultValue") ? parseTextFormatScalarValue(type, proto.defaultValue) : undefined;
      };
      break;
    }
  }
  return field;
}
function getFileEdition(proto) {
  switch (proto.syntax) {
    case "":
    case "proto2":
      return EDITION_PROTO2;
    case "proto3":
      return EDITION_PROTO3;
    case "editions":
      if (proto.edition in featureDefaults) {
        return proto.edition;
      }
      throw new Error(`${proto.name}: unsupported edition`);
    default:
      throw new Error(`${proto.name}: unsupported syntax "${proto.syntax}"`);
  }
}
function findFileDependencies(proto, reg) {
  return proto.dependency.map((wantName) => {
    const dep = reg.getFile(wantName);
    if (!dep) {
      throw new Error(`Cannot find ${wantName}, imported by ${proto.name}`);
    }
    return dep;
  });
}
function findEnumSharedPrefix(enumName, values) {
  const prefix = camelToSnakeCase(enumName) + "_";
  for (const value of values) {
    if (!value.name.toLowerCase().startsWith(prefix)) {
      return;
    }
    const shortName = value.name.substring(prefix.length);
    if (shortName.length == 0) {
      return;
    }
    if (/^\d/.test(shortName)) {
      return;
    }
  }
  return prefix;
}
function camelToSnakeCase(camel) {
  return (camel.substring(0, 1) + camel.substring(1).replace(/[A-Z]/g, (c) => "_" + c)).toLowerCase();
}
function makeTypeName(proto, parent, file) {
  let typeName;
  if (parent) {
    typeName = `${parent.typeName}.${proto.name}`;
  } else if (file.proto.package.length > 0) {
    typeName = `${file.proto.package}.${proto.name}`;
  } else {
    typeName = `${proto.name}`;
  }
  return typeName;
}
function trimLeadingDot(typeName) {
  return typeName.startsWith(".") ? typeName.substring(1) : typeName;
}
function findOneof(proto, allOneofs) {
  if (!unsafeIsSetExplicit(proto, "oneofIndex")) {
    return;
  }
  if (proto.proto3Optional) {
    return;
  }
  const oneof = allOneofs[proto.oneofIndex];
  assert(oneof, `invalid FieldDescriptorProto: oneof #${proto.oneofIndex} for field #${proto.number} not found`);
  return oneof;
}
function getFieldPresence(proto, oneof, isExtension, parent) {
  if (proto.label == LABEL_REQUIRED) {
    return LEGACY_REQUIRED;
  }
  if (proto.label == LABEL_REPEATED) {
    return IMPLICIT2;
  }
  if (!!oneof || proto.proto3Optional) {
    return EXPLICIT;
  }
  if (isExtension) {
    return EXPLICIT;
  }
  const resolved = resolveFeature("fieldPresence", { proto, parent });
  if (resolved == IMPLICIT2 && (proto.type == TYPE_MESSAGE || proto.type == TYPE_GROUP)) {
    return EXPLICIT;
  }
  return resolved;
}
function isPackedField(proto, parent) {
  if (proto.label != LABEL_REPEATED) {
    return false;
  }
  switch (proto.type) {
    case TYPE_STRING:
    case TYPE_BYTES:
    case TYPE_GROUP:
    case TYPE_MESSAGE:
      return false;
  }
  const o = proto.options;
  if (o && unsafeIsSetExplicit(o, "packed")) {
    return o.packed;
  }
  return PACKED == resolveFeature("repeatedFieldEncoding", {
    proto,
    parent
  });
}
function findMapEntryFields(mapEntry) {
  const key2 = mapEntry.fields.find((f) => f.number === 1);
  const value = mapEntry.fields.find((f) => f.number === 2);
  assert(key2 && key2.fieldKind == "scalar" && key2.scalar != ScalarType.BYTES && key2.scalar != ScalarType.FLOAT && key2.scalar != ScalarType.DOUBLE && value && value.fieldKind != "list" && value.fieldKind != "map");
  return { key: key2, value };
}
function isEnumOpen(desc) {
  var _a;
  return OPEN == resolveFeature("enumType", {
    proto: desc.proto,
    parent: (_a = desc.parent) !== null && _a !== undefined ? _a : desc.file
  });
}
function isDelimitedEncoding(proto, parent) {
  if (proto.type == TYPE_GROUP) {
    return true;
  }
  return DELIMITED == resolveFeature("messageEncoding", {
    proto,
    parent
  });
}
function resolveFeature(name, ref) {
  var _a, _b;
  const featureSet = (_a = ref.proto.options) === null || _a === undefined ? undefined : _a.features;
  if (featureSet) {
    const val = featureSet[name];
    if (val != 0) {
      return val;
    }
  }
  if ("kind" in ref) {
    if (ref.kind == "message") {
      return resolveFeature(name, (_b = ref.parent) !== null && _b !== undefined ? _b : ref.file);
    }
    const editionDefaults = featureDefaults[ref.edition];
    if (!editionDefaults) {
      throw new Error(`feature default for edition ${ref.edition} not found`);
    }
    return editionDefaults[name];
  }
  return resolveFeature(name, ref.parent);
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/boot.js
function boot(boot2) {
  const root = bootFileDescriptorProto(boot2);
  root.messageType.forEach(restoreJsonNames);
  const reg = createFileRegistry(root, () => {
    return;
  });
  return reg.getFile(root.name);
}
function bootFileDescriptorProto(init) {
  const proto = Object.create({
    syntax: "",
    edition: 0
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], optionDependency: [], service: [], extension: [] }, init), { messageType: init.messageType.map(bootDescriptorProto), enumType: init.enumType.map(bootEnumDescriptorProto) }));
}
function bootDescriptorProto(init) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const proto = Object.create({
    visibility: 0
  });
  return Object.assign(proto, {
    $typeName: "google.protobuf.DescriptorProto",
    name: init.name,
    field: (_b = (_a = init.field) === null || _a === undefined ? undefined : _a.map(bootFieldDescriptorProto)) !== null && _b !== undefined ? _b : [],
    extension: [],
    nestedType: (_d = (_c = init.nestedType) === null || _c === undefined ? undefined : _c.map(bootDescriptorProto)) !== null && _d !== undefined ? _d : [],
    enumType: (_f = (_e = init.enumType) === null || _e === undefined ? undefined : _e.map(bootEnumDescriptorProto)) !== null && _f !== undefined ? _f : [],
    extensionRange: (_h = (_g = init.extensionRange) === null || _g === undefined ? undefined : _g.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e))) !== null && _h !== undefined ? _h : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  });
}
function bootFieldDescriptorProto(init) {
  const proto = Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: false
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, init), { options: init.options ? bootFieldOptions(init.options) : undefined }));
}
function bootFieldOptions(init) {
  var _a, _b, _c;
  const proto = Object.create({
    ctype: 0,
    packed: false,
    jstype: 0,
    lazy: false,
    unverifiedLazy: false,
    deprecated: false,
    weak: false,
    debugRedact: false,
    retention: 0
  });
  return Object.assign(proto, Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, init), { targets: (_a = init.targets) !== null && _a !== undefined ? _a : [], editionDefaults: (_c = (_b = init.editionDefaults) === null || _b === undefined ? undefined : _b.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e))) !== null && _c !== undefined ? _c : [], uninterpretedOption: [] }));
}
function bootEnumDescriptorProto(init) {
  const proto = Object.create({
    visibility: 0
  });
  return Object.assign(proto, {
    $typeName: "google.protobuf.EnumDescriptorProto",
    name: init.name,
    reservedName: [],
    reservedRange: [],
    value: init.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
  });
}

// node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
function base64Decode(base64Str) {
  const table = getDecodeTable();
  let es = base64Str.length * 3 / 4;
  if (base64Str[base64Str.length - 2] == "=")
    es -= 2;
  else if (base64Str[base64Str.length - 1] == "=")
    es -= 1;
  let bytes = new Uint8Array(es), bytePos = 0, groupPos = 0, b, p = 0;
  for (let i = 0;i < base64Str.length; i++) {
    b = table[base64Str.charCodeAt(i)];
    if (b === undefined) {
      switch (base64Str[i]) {
        case "=":
          groupPos = 0;
        case `
`:
        case "\r":
        case "\t":
        case " ":
          continue;
        default:
          throw Error("invalid base64 string");
      }
    }
    switch (groupPos) {
      case 0:
        p = b;
        groupPos = 1;
        break;
      case 1:
        bytes[bytePos++] = p << 2 | (b & 48) >> 4;
        p = b;
        groupPos = 2;
        break;
      case 2:
        bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
        p = b;
        groupPos = 3;
        break;
      case 3:
        bytes[bytePos++] = (p & 3) << 6 | b;
        groupPos = 0;
        break;
    }
  }
  if (groupPos == 1)
    throw Error("invalid base64 string");
  return bytes.subarray(0, bytePos);
}
function base64Encode(bytes, encoding = "std") {
  const table = getEncodeTable(encoding);
  const pad = encoding == "std";
  let base64 = "", groupPos = 0, b, p = 0;
  for (let i = 0;i < bytes.length; i++) {
    b = bytes[i];
    switch (groupPos) {
      case 0:
        base64 += table[b >> 2];
        p = (b & 3) << 4;
        groupPos = 1;
        break;
      case 1:
        base64 += table[p | b >> 4];
        p = (b & 15) << 2;
        groupPos = 2;
        break;
      case 2:
        base64 += table[p | b >> 6];
        base64 += table[b & 63];
        groupPos = 0;
        break;
    }
  }
  if (groupPos) {
    base64 += table[p];
    if (pad) {
      base64 += "=";
      if (groupPos == 1)
        base64 += "=";
    }
  }
  return base64;
}
var encodeTableStd;
var encodeTableUrl;
var decodeTable;
function getEncodeTable(encoding) {
  if (!encodeTableStd) {
    encodeTableStd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    encodeTableUrl = encodeTableStd.slice(0, -2).concat("-", "_");
  }
  return encoding == "url" ? encodeTableUrl : encodeTableStd;
}
function getDecodeTable() {
  if (!decodeTable) {
    decodeTable = [];
    const encodeTable = getEncodeTable("std");
    for (let i = 0;i < encodeTable.length; i++)
      decodeTable[encodeTable[i].charCodeAt(0)] = i;
    decodeTable[45] = encodeTable.indexOf("+");
    decodeTable[95] = encodeTable.indexOf("/");
  }
  return decodeTable;
}

// node_modules/@bufbuild/protobuf/dist/esm/is-message.js
function isMessage(arg, schema) {
  const isMessage2 = arg !== null && typeof arg == "object" && "$typeName" in arg && typeof arg.$typeName == "string";
  if (!isMessage2) {
    return false;
  }
  if (schema === undefined) {
    return true;
  }
  return schema.typeName === arg.$typeName;
}

// node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
var errorNames = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];

class FieldError extends Error {
  constructor(fieldOrOneof, message, name = "FieldValueInvalidError") {
    super(message);
    this.name = name;
    this.field = () => fieldOrOneof;
  }
}
function isFieldError(arg) {
  return arg instanceof Error && errorNames.includes(arg.name) && "field" in arg && typeof arg.field == "function";
}

// node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
function isObject(arg) {
  return arg !== null && typeof arg == "object" && !Array.isArray(arg);
}
function isReflectList(arg, field) {
  var _a, _b, _c, _d;
  if (isObject(arg) && unsafeLocal in arg && "add" in arg && "field" in arg && typeof arg.field == "function") {
    if (field !== undefined) {
      const a = field;
      const b = arg.field();
      return a.listKind == b.listKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === undefined ? undefined : _a.typeName) === ((_b = b.message) === null || _b === undefined ? undefined : _b.typeName) && ((_c = a.enum) === null || _c === undefined ? undefined : _c.typeName) === ((_d = b.enum) === null || _d === undefined ? undefined : _d.typeName);
    }
    return true;
  }
  return false;
}
function isReflectMap(arg, field) {
  var _a, _b, _c, _d;
  if (isObject(arg) && unsafeLocal in arg && "has" in arg && "field" in arg && typeof arg.field == "function") {
    if (field !== undefined) {
      const a = field, b = arg.field();
      return a.mapKey === b.mapKey && a.mapKind == b.mapKind && a.scalar === b.scalar && ((_a = a.message) === null || _a === undefined ? undefined : _a.typeName) === ((_b = b.message) === null || _b === undefined ? undefined : _b.typeName) && ((_c = a.enum) === null || _c === undefined ? undefined : _c.typeName) === ((_d = b.enum) === null || _d === undefined ? undefined : _d.typeName);
    }
    return true;
  }
  return false;
}
function isReflectMessage(arg, messageDesc) {
  return isObject(arg) && unsafeLocal in arg && "desc" in arg && isObject(arg.desc) && arg.desc.kind === "message" && (messageDesc === undefined || arg.desc.typeName == messageDesc.typeName);
}

// node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var symbol = Symbol.for("@bufbuild/protobuf/text-encoding");
function getTextEncoding() {
  if (globalThis[symbol] == undefined) {
    const te = new globalThis.TextEncoder;
    const td = new globalThis.TextDecoder;
    globalThis[symbol] = {
      encodeUtf8(text) {
        return te.encode(text);
      },
      decodeUtf8(bytes) {
        return td.decode(bytes);
      },
      checkUtf8(text) {
        try {
          encodeURIComponent(text);
          return true;
        } catch (_) {
          return false;
        }
      }
    };
  }
  return globalThis[symbol];
}

// node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
var WireType;
(function(WireType2) {
  WireType2[WireType2["Varint"] = 0] = "Varint";
  WireType2[WireType2["Bit64"] = 1] = "Bit64";
  WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
  WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
  WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
  WireType2[WireType2["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
var FLOAT32_MAX = 340282346638528860000000000000000000000;
var FLOAT32_MIN = -340282346638528860000000000000000000000;
var UINT32_MAX = 4294967295;
var INT32_MAX = 2147483647;
var INT32_MIN = -2147483648;

class BinaryWriter {
  constructor(encodeUtf8 = getTextEncoding().encodeUtf8) {
    this.encodeUtf8 = encodeUtf8;
    this.stack = [];
    this.chunks = [];
    this.buf = [];
  }
  finish() {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    let len = 0;
    for (let i = 0;i < this.chunks.length; i++)
      len += this.chunks[i].length;
    let bytes = new Uint8Array(len);
    let offset = 0;
    for (let i = 0;i < this.chunks.length; i++) {
      bytes.set(this.chunks[i], offset);
      offset += this.chunks[i].length;
    }
    this.chunks = [];
    return bytes;
  }
  fork() {
    this.stack.push({ chunks: this.chunks, buf: this.buf });
    this.chunks = [];
    this.buf = [];
    return this;
  }
  join() {
    let chunk = this.finish();
    let prev = this.stack.pop();
    if (!prev)
      throw new Error("invalid state, fork stack empty");
    this.chunks = prev.chunks;
    this.buf = prev.buf;
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  tag(fieldNo, type) {
    return this.uint32((fieldNo << 3 | type) >>> 0);
  }
  raw(chunk) {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    this.chunks.push(chunk);
    return this;
  }
  uint32(value) {
    assertUInt32(value);
    while (value > 127) {
      this.buf.push(value & 127 | 128);
      value = value >>> 7;
    }
    this.buf.push(value);
    return this;
  }
  int32(value) {
    assertInt32(value);
    varint32write(value, this.buf);
    return this;
  }
  bool(value) {
    this.buf.push(value ? 1 : 0);
    return this;
  }
  bytes(value) {
    this.uint32(value.byteLength);
    return this.raw(value);
  }
  string(value) {
    let chunk = this.encodeUtf8(value);
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  float(value) {
    assertFloat32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setFloat32(0, value, true);
    return this.raw(chunk);
  }
  double(value) {
    let chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setFloat64(0, value, true);
    return this.raw(chunk);
  }
  fixed32(value) {
    assertUInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setUint32(0, value, true);
    return this.raw(chunk);
  }
  sfixed32(value) {
    assertInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setInt32(0, value, true);
    return this.raw(chunk);
  }
  sint32(value) {
    assertInt32(value);
    value = (value << 1 ^ value >> 31) >>> 0;
    varint32write(value, this.buf);
    return this;
  }
  sfixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.enc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  fixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.uEnc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  int64(value) {
    let tc = protoInt64.enc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
  sint64(value) {
    const tc = protoInt64.enc(value), sign = tc.hi >> 31, lo = tc.lo << 1 ^ sign, hi = (tc.hi << 1 | tc.lo >>> 31) ^ sign;
    varint64write(lo, hi, this.buf);
    return this;
  }
  uint64(value) {
    const tc = protoInt64.uEnc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
}

class BinaryReader {
  constructor(buf, decodeUtf8 = getTextEncoding().decodeUtf8) {
    this.decodeUtf8 = decodeUtf8;
    this.varint64 = varint64read;
    this.uint32 = varint32read;
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  tag() {
    let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5)
      throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
    return [fieldNo, wireType];
  }
  skip(wireType, fieldNo) {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 128) {}
        break;
      case WireType.Bit64:
        this.pos += 4;
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        for (;; ) {
          const [fn, wt] = this.tag();
          if (wt === WireType.EndGroup) {
            if (fieldNo !== undefined && fn !== fieldNo) {
              throw new Error("invalid end group tag");
            }
            break;
          }
          this.skip(wt, fn);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  int32() {
    return this.uint32() | 0;
  }
  sint32() {
    let zze = this.uint32();
    return zze >>> 1 ^ -(zze & 1);
  }
  int64() {
    return protoInt64.dec(...this.varint64());
  }
  uint64() {
    return protoInt64.uDec(...this.varint64());
  }
  sint64() {
    let [lo, hi] = this.varint64();
    let s = -(lo & 1);
    lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
    hi = hi >>> 1 ^ s;
    return protoInt64.dec(lo, hi);
  }
  bool() {
    let [lo, hi] = this.varint64();
    return lo !== 0 || hi !== 0;
  }
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }
  fixed64() {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }
  sfixed64() {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }
  bytes() {
    let len = this.uint32(), start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }
  string() {
    return this.decodeUtf8(this.bytes());
  }
}
function assertInt32(arg) {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid int32: " + typeof arg);
  }
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
    throw new Error("invalid int32: " + arg);
}
function assertUInt32(arg) {
  if (typeof arg == "string") {
    arg = Number(arg);
  } else if (typeof arg != "number") {
    throw new Error("invalid uint32: " + typeof arg);
  }
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
    throw new Error("invalid uint32: " + arg);
}
function assertFloat32(arg) {
  if (typeof arg == "string") {
    const o = arg;
    arg = Number(arg);
    if (Number.isNaN(arg) && o !== "NaN") {
      throw new Error("invalid float32: " + o);
    }
  } else if (typeof arg != "number") {
    throw new Error("invalid float32: " + typeof arg);
  }
  if (Number.isFinite(arg) && (arg > FLOAT32_MAX || arg < FLOAT32_MIN))
    throw new Error("invalid float32: " + arg);
}

// node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect-check.js
function checkField(field, value) {
  const check = field.fieldKind == "list" ? isReflectList(value, field) : field.fieldKind == "map" ? isReflectMap(value, field) : checkSingular(field, value);
  if (check === true) {
    return;
  }
  let reason;
  switch (field.fieldKind) {
    case "list":
      reason = `expected ${formatReflectList(field)}, got ${formatVal(value)}`;
      break;
    case "map":
      reason = `expected ${formatReflectMap(field)}, got ${formatVal(value)}`;
      break;
    default: {
      reason = reasonSingular(field, value, check);
    }
  }
  return new FieldError(field, reason);
}
function checkListItem(field, index, value) {
  const check = checkSingular(field, value);
  if (check !== true) {
    return new FieldError(field, `list item #${index + 1}: ${reasonSingular(field, value, check)}`);
  }
  return;
}
function checkMapEntry(field, key2, value) {
  const checkKey = checkScalarValue(key2, field.mapKey);
  if (checkKey !== true) {
    return new FieldError(field, `invalid map key: ${reasonSingular({ scalar: field.mapKey }, key2, checkKey)}`);
  }
  const checkVal = checkSingular(field, value);
  if (checkVal !== true) {
    return new FieldError(field, `map entry ${formatVal(key2)}: ${reasonSingular(field, value, checkVal)}`);
  }
  return;
}
function checkSingular(field, value) {
  if (field.scalar !== undefined) {
    return checkScalarValue(value, field.scalar);
  }
  if (field.enum !== undefined) {
    if (field.enum.open) {
      return Number.isInteger(value);
    }
    return field.enum.values.some((v) => v.number === value);
  }
  return isReflectMessage(value, field.message);
}
function checkScalarValue(value, scalar) {
  switch (scalar) {
    case ScalarType.DOUBLE:
      return typeof value == "number";
    case ScalarType.FLOAT:
      if (typeof value != "number") {
        return false;
      }
      if (Number.isNaN(value) || !Number.isFinite(value)) {
        return true;
      }
      if (value > FLOAT32_MAX || value < FLOAT32_MIN) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      if (typeof value !== "number" || !Number.isInteger(value)) {
        return false;
      }
      if (value > INT32_MAX || value < INT32_MIN) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      if (typeof value !== "number" || !Number.isInteger(value)) {
        return false;
      }
      if (value > UINT32_MAX || value < 0) {
        return `${value.toFixed()} out of range`;
      }
      return true;
    case ScalarType.BOOL:
      return typeof value == "boolean";
    case ScalarType.STRING:
      if (typeof value != "string") {
        return false;
      }
      return getTextEncoding().checkUtf8(value) || "invalid UTF8";
    case ScalarType.BYTES:
      return value instanceof Uint8Array;
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) {
        try {
          protoInt64.parse(value);
          return true;
        } catch (_) {
          return `${value} out of range`;
        }
      }
      return false;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (typeof value == "bigint" || typeof value == "number" || typeof value == "string" && value.length > 0) {
        try {
          protoInt64.uParse(value);
          return true;
        } catch (_) {
          return `${value} out of range`;
        }
      }
      return false;
  }
}
function reasonSingular(field, val, details) {
  details = typeof details == "string" ? `: ${details}` : `, got ${formatVal(val)}`;
  if (field.scalar !== undefined) {
    return `expected ${scalarTypeDescription(field.scalar)}` + details;
  }
  if (field.enum !== undefined) {
    return `expected ${field.enum.toString()}` + details;
  }
  return `expected ${formatReflectMessage(field.message)}` + details;
}
function formatVal(val) {
  switch (typeof val) {
    case "object":
      if (val === null) {
        return "null";
      }
      if (val instanceof Uint8Array) {
        return `Uint8Array(${val.length})`;
      }
      if (Array.isArray(val)) {
        return `Array(${val.length})`;
      }
      if (isReflectList(val)) {
        return formatReflectList(val.field());
      }
      if (isReflectMap(val)) {
        return formatReflectMap(val.field());
      }
      if (isReflectMessage(val)) {
        return formatReflectMessage(val.desc);
      }
      if (isMessage(val)) {
        return `message ${val.$typeName}`;
      }
      return "object";
    case "string":
      return val.length > 30 ? "string" : `"${val.split('"').join("\\\"")}"`;
    case "boolean":
      return String(val);
    case "number":
      return String(val);
    case "bigint":
      return String(val) + "n";
    default:
      return typeof val;
  }
}
function formatReflectMessage(desc) {
  return `ReflectMessage (${desc.typeName})`;
}
function formatReflectList(field) {
  switch (field.listKind) {
    case "message":
      return `ReflectList (${field.message.toString()})`;
    case "enum":
      return `ReflectList (${field.enum.toString()})`;
    case "scalar":
      return `ReflectList (${ScalarType[field.scalar]})`;
  }
}
function formatReflectMap(field) {
  switch (field.mapKind) {
    case "message":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${field.message.toString()})`;
    case "enum":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${field.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${ScalarType[field.mapKey]}, ${ScalarType[field.scalar]})`;
  }
}
function scalarTypeDescription(scalar) {
  switch (scalar) {
    case ScalarType.STRING:
      return "string";
    case ScalarType.BOOL:
      return "boolean";
    case ScalarType.INT64:
    case ScalarType.SINT64:
    case ScalarType.SFIXED64:
      return "bigint (int64)";
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      return "bigint (uint64)";
    case ScalarType.BYTES:
      return "Uint8Array";
    case ScalarType.DOUBLE:
      return "number (float64)";
    case ScalarType.FLOAT:
      return "number (float32)";
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      return "number (uint32)";
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      return "number (int32)";
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
function isWrapper(arg) {
  return isWrapperTypeName(arg.$typeName);
}
function isWrapperDesc(messageDesc) {
  const f = messageDesc.fields[0];
  return isWrapperTypeName(messageDesc.typeName) && f !== undefined && f.fieldKind == "scalar" && f.name == "value" && f.number == 1;
}
function isWrapperTypeName(name) {
  return name.startsWith("google.protobuf.") && [
    "DoubleValue",
    "FloatValue",
    "Int64Value",
    "UInt64Value",
    "Int32Value",
    "UInt32Value",
    "BoolValue",
    "StringValue",
    "BytesValue"
  ].includes(name.substring(16));
}

// node_modules/@bufbuild/protobuf/dist/esm/create.js
var EDITION_PROTO32 = 999;
var EDITION_PROTO22 = 998;
var IMPLICIT3 = 2;
function create(schema, init) {
  if (isMessage(init, schema)) {
    return init;
  }
  const message = createZeroMessage(schema);
  if (init !== undefined) {
    initMessage(schema, message, init);
  }
  return message;
}
function initMessage(messageDesc, message, init) {
  for (const member of messageDesc.members) {
    let value = init[member.localName];
    if (value == null) {
      continue;
    }
    let field;
    if (member.kind == "oneof") {
      const oneofField = unsafeOneofCase(init, member);
      if (!oneofField) {
        continue;
      }
      field = oneofField;
      value = unsafeGet(init, oneofField);
    } else {
      field = member;
    }
    switch (field.fieldKind) {
      case "message":
        value = toMessage(field, value);
        break;
      case "scalar":
        value = initScalar(field, value);
        break;
      case "list":
        value = initList(field, value);
        break;
      case "map":
        value = initMap(field, value);
        break;
    }
    unsafeSet(message, field, value);
  }
  return message;
}
function initScalar(field, value) {
  if (field.scalar == ScalarType.BYTES) {
    return toU8Arr(value);
  }
  return value;
}
function initMap(field, value) {
  if (isObject(value)) {
    if (field.scalar == ScalarType.BYTES) {
      return convertObjectValues(value, toU8Arr);
    }
    if (field.mapKind == "message") {
      return convertObjectValues(value, (val) => toMessage(field, val));
    }
  }
  return value;
}
function initList(field, value) {
  if (Array.isArray(value)) {
    if (field.scalar == ScalarType.BYTES) {
      return value.map(toU8Arr);
    }
    if (field.listKind == "message") {
      return value.map((item) => toMessage(field, item));
    }
  }
  return value;
}
function toMessage(field, value) {
  if (field.fieldKind == "message" && !field.oneof && isWrapperDesc(field.message)) {
    return initScalar(field.message.fields[0], value);
  }
  if (isObject(value)) {
    if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName !== "google.protobuf.Value") {
      return value;
    }
    if (!isMessage(value, field.message)) {
      return create(field.message, value);
    }
  }
  return value;
}
function toU8Arr(value) {
  return Array.isArray(value) ? new Uint8Array(value) : value;
}
function convertObjectValues(obj, fn) {
  const ret = {};
  for (const entry of Object.entries(obj)) {
    ret[entry[0]] = fn(entry[1]);
  }
  return ret;
}
var tokenZeroMessageField = Symbol();
var messagePrototypes = new WeakMap;
function createZeroMessage(desc) {
  let msg;
  if (!needsPrototypeChain(desc)) {
    msg = {
      $typeName: desc.typeName
    };
    for (const member of desc.members) {
      if (member.kind == "oneof" || member.presence == IMPLICIT3) {
        msg[member.localName] = createZeroField(member);
      }
    }
  } else {
    const cached = messagePrototypes.get(desc);
    let prototype;
    let members;
    if (cached) {
      ({ prototype, members } = cached);
    } else {
      prototype = {};
      members = new Set;
      for (const member of desc.members) {
        if (member.kind == "oneof") {
          continue;
        }
        if (member.fieldKind != "scalar" && member.fieldKind != "enum") {
          continue;
        }
        if (member.presence == IMPLICIT3) {
          continue;
        }
        members.add(member);
        prototype[member.localName] = createZeroField(member);
      }
      messagePrototypes.set(desc, { prototype, members });
    }
    msg = Object.create(prototype);
    msg.$typeName = desc.typeName;
    for (const member of desc.members) {
      if (members.has(member)) {
        continue;
      }
      if (member.kind == "field") {
        if (member.fieldKind == "message") {
          continue;
        }
        if (member.fieldKind == "scalar" || member.fieldKind == "enum") {
          if (member.presence != IMPLICIT3) {
            continue;
          }
        }
      }
      msg[member.localName] = createZeroField(member);
    }
  }
  return msg;
}
function needsPrototypeChain(desc) {
  switch (desc.file.edition) {
    case EDITION_PROTO32:
      return false;
    case EDITION_PROTO22:
      return true;
    default:
      return desc.fields.some((f) => f.presence != IMPLICIT3 && f.fieldKind != "message" && !f.oneof);
  }
}
function createZeroField(field) {
  if (field.kind == "oneof") {
    return { case: undefined };
  }
  if (field.fieldKind == "list") {
    return [];
  }
  if (field.fieldKind == "map") {
    return {};
  }
  if (field.fieldKind == "message") {
    return tokenZeroMessageField;
  }
  const defaultValue = field.getDefaultValue();
  if (defaultValue !== undefined) {
    return field.fieldKind == "scalar" && field.longAsString ? defaultValue.toString() : defaultValue;
  }
  return field.fieldKind == "scalar" ? scalarZeroValue(field.scalar, field.longAsString) : field.enum.values[0].number;
}

// node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect.js
function reflect(messageDesc, message, check = true) {
  return new ReflectMessageImpl(messageDesc, message, check);
}

class ReflectMessageImpl {
  get sortedFields() {
    var _a;
    return (_a = this._sortedFields) !== null && _a !== undefined ? _a : this._sortedFields = this.desc.fields.concat().sort((a, b) => a.number - b.number);
  }
  constructor(messageDesc, message, check = true) {
    this.lists = new Map;
    this.maps = new Map;
    this.check = check;
    this.desc = messageDesc;
    this.message = this[unsafeLocal] = message !== null && message !== undefined ? message : create(messageDesc);
    this.fields = messageDesc.fields;
    this.oneofs = messageDesc.oneofs;
    this.members = messageDesc.members;
  }
  findNumber(number) {
    if (!this._fieldsByNumber) {
      this._fieldsByNumber = new Map(this.desc.fields.map((f) => [f.number, f]));
    }
    return this._fieldsByNumber.get(number);
  }
  oneofCase(oneof) {
    assertOwn(this.message, oneof);
    return unsafeOneofCase(this.message, oneof);
  }
  isSet(field) {
    assertOwn(this.message, field);
    return unsafeIsSet(this.message, field);
  }
  clear(field) {
    assertOwn(this.message, field);
    unsafeClear(this.message, field);
  }
  get(field) {
    assertOwn(this.message, field);
    const value = unsafeGet(this.message, field);
    switch (field.fieldKind) {
      case "list":
        let list = this.lists.get(field);
        if (!list || list[unsafeLocal] !== value) {
          this.lists.set(field, list = new ReflectListImpl(field, value, this.check));
        }
        return list;
      case "map":
        let map = this.maps.get(field);
        if (!map || map[unsafeLocal] !== value) {
          this.maps.set(field, map = new ReflectMapImpl(field, value, this.check));
        }
        return map;
      case "message":
        return messageToReflect(field, value, this.check);
      case "scalar":
        return value === undefined ? scalarZeroValue(field.scalar, false) : longToReflect(field, value);
      case "enum":
        return value !== null && value !== undefined ? value : field.enum.values[0].number;
    }
  }
  set(field, value) {
    assertOwn(this.message, field);
    if (this.check) {
      const err = checkField(field, value);
      if (err) {
        throw err;
      }
    }
    let local;
    if (field.fieldKind == "message") {
      local = messageToLocal(field, value);
    } else if (isReflectMap(value) || isReflectList(value)) {
      local = value[unsafeLocal];
    } else {
      local = longToLocal(field, value);
    }
    unsafeSet(this.message, field, local);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(value) {
    this.message.$unknown = value;
  }
}
function assertOwn(owner, member) {
  if (member.parent.typeName !== owner.$typeName) {
    throw new FieldError(member, `cannot use ${member.toString()} with message ${owner.$typeName}`, "ForeignFieldError");
  }
}
class ReflectListImpl {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(field, unsafeInput, check) {
    this._field = field;
    this._arr = this[unsafeLocal] = unsafeInput;
    this.check = check;
  }
  get(index) {
    const item = this._arr[index];
    return item === undefined ? undefined : listItemToReflect(this._field, item, this.check);
  }
  set(index, item) {
    if (index < 0 || index >= this._arr.length) {
      throw new FieldError(this._field, `list item #${index + 1}: out of range`);
    }
    if (this.check) {
      const err = checkListItem(this._field, index, item);
      if (err) {
        throw err;
      }
    }
    this._arr[index] = listItemToLocal(this._field, item);
  }
  add(item) {
    if (this.check) {
      const err = checkListItem(this._field, this._arr.length, item);
      if (err) {
        throw err;
      }
    }
    this._arr.push(listItemToLocal(this._field, item));
    return;
  }
  clear() {
    this._arr.splice(0, this._arr.length);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  keys() {
    return this._arr.keys();
  }
  *values() {
    for (const item of this._arr) {
      yield listItemToReflect(this._field, item, this.check);
    }
  }
  *entries() {
    for (let i = 0;i < this._arr.length; i++) {
      yield [i, listItemToReflect(this._field, this._arr[i], this.check)];
    }
  }
}
class ReflectMapImpl {
  constructor(field, unsafeInput, check = true) {
    this.obj = this[unsafeLocal] = unsafeInput !== null && unsafeInput !== undefined ? unsafeInput : {};
    this.check = check;
    this._field = field;
  }
  field() {
    return this._field;
  }
  set(key2, value) {
    if (this.check) {
      const err = checkMapEntry(this._field, key2, value);
      if (err) {
        throw err;
      }
    }
    this.obj[mapKeyToLocal(key2)] = mapValueToLocal(this._field, value);
    return this;
  }
  delete(key2) {
    const k = mapKeyToLocal(key2);
    const has = Object.prototype.hasOwnProperty.call(this.obj, k);
    if (has) {
      delete this.obj[k];
    }
    return has;
  }
  clear() {
    for (const key2 of Object.keys(this.obj)) {
      delete this.obj[key2];
    }
  }
  get(key2) {
    let val = this.obj[mapKeyToLocal(key2)];
    if (val !== undefined) {
      val = mapValueToReflect(this._field, val, this.check);
    }
    return val;
  }
  has(key2) {
    return Object.prototype.hasOwnProperty.call(this.obj, mapKeyToLocal(key2));
  }
  *keys() {
    for (const objKey of Object.keys(this.obj)) {
      yield mapKeyToReflect(objKey, this._field.mapKey);
    }
  }
  *entries() {
    for (const objEntry of Object.entries(this.obj)) {
      yield [
        mapKeyToReflect(objEntry[0], this._field.mapKey),
        mapValueToReflect(this._field, objEntry[1], this.check)
      ];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const val of Object.values(this.obj)) {
      yield mapValueToReflect(this._field, val, this.check);
    }
  }
  forEach(callbackfn, thisArg) {
    for (const mapEntry of this.entries()) {
      callbackfn.call(thisArg, mapEntry[1], mapEntry[0], this);
    }
  }
}
function messageToLocal(field, value) {
  if (!isReflectMessage(value)) {
    return value;
  }
  if (isWrapper(value.message) && !field.oneof && field.fieldKind == "message") {
    return value.message.value;
  }
  if (value.desc.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value") {
    return wktStructToLocal(value.message);
  }
  return value.message;
}
function messageToReflect(field, value, check) {
  if (value !== undefined) {
    if (isWrapperDesc(field.message) && !field.oneof && field.fieldKind == "message") {
      value = {
        $typeName: field.message.typeName,
        value: longToReflect(field.message.fields[0], value)
      };
    } else if (field.message.typeName == "google.protobuf.Struct" && field.parent.typeName != "google.protobuf.Value" && isObject(value)) {
      value = wktStructToReflect(value);
    }
  }
  return new ReflectMessageImpl(field.message, value, check);
}
function listItemToLocal(field, value) {
  if (field.listKind == "message") {
    return messageToLocal(field, value);
  }
  return longToLocal(field, value);
}
function listItemToReflect(field, value, check) {
  if (field.listKind == "message") {
    return messageToReflect(field, value, check);
  }
  return longToReflect(field, value);
}
function mapValueToLocal(field, value) {
  if (field.mapKind == "message") {
    return messageToLocal(field, value);
  }
  return longToLocal(field, value);
}
function mapValueToReflect(field, value, check) {
  if (field.mapKind == "message") {
    return messageToReflect(field, value, check);
  }
  return value;
}
function mapKeyToLocal(key2) {
  return typeof key2 == "string" || typeof key2 == "number" ? key2 : String(key2);
}
function mapKeyToReflect(key2, type) {
  switch (type) {
    case ScalarType.STRING:
      return key2;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32: {
      const n = Number.parseInt(key2);
      if (Number.isFinite(n)) {
        return n;
      }
      break;
    }
    case ScalarType.BOOL:
      switch (key2) {
        case "true":
          return true;
        case "false":
          return false;
      }
      break;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
      try {
        return protoInt64.uParse(key2);
      } catch (_a) {}
      break;
    default:
      try {
        return protoInt64.parse(key2);
      } catch (_b) {}
      break;
  }
  return key2;
}
function longToReflect(field, value) {
  switch (field.scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if ("longAsString" in field && field.longAsString && typeof value == "string") {
        value = protoInt64.parse(value);
      }
      break;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if ("longAsString" in field && field.longAsString && typeof value == "string") {
        value = protoInt64.uParse(value);
      }
      break;
  }
  return value;
}
function longToLocal(field, value) {
  switch (field.scalar) {
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if ("longAsString" in field && field.longAsString) {
        value = String(value);
      } else if (typeof value == "string" || typeof value == "number") {
        value = protoInt64.parse(value);
      }
      break;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if ("longAsString" in field && field.longAsString) {
        value = String(value);
      } else if (typeof value == "string" || typeof value == "number") {
        value = protoInt64.uParse(value);
      }
      break;
  }
  return value;
}
function wktStructToReflect(json) {
  const struct = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (isObject(json)) {
    for (const [k, v] of Object.entries(json)) {
      struct.fields[k] = wktValueToReflect(v);
    }
  }
  return struct;
}
function wktStructToLocal(val) {
  const json = {};
  for (const [k, v] of Object.entries(val.fields)) {
    json[k] = wktValueToLocal(v);
  }
  return json;
}
function wktValueToLocal(val) {
  switch (val.kind.case) {
    case "structValue":
      return wktStructToLocal(val.kind.value);
    case "listValue":
      return val.kind.value.values.map(wktValueToLocal);
    case "nullValue":
    case undefined:
      return null;
    default:
      return val.kind.value;
  }
}
function wktValueToReflect(json) {
  const value = {
    $typeName: "google.protobuf.Value",
    kind: { case: undefined }
  };
  switch (typeof json) {
    case "number":
      value.kind = { case: "numberValue", value: json };
      break;
    case "string":
      value.kind = { case: "stringValue", value: json };
      break;
    case "boolean":
      value.kind = { case: "boolValue", value: json };
      break;
    case "object":
      if (json === null) {
        const nullValue = 0;
        value.kind = { case: "nullValue", value: nullValue };
      } else if (Array.isArray(json)) {
        const listValue = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(json)) {
          for (const e of json) {
            listValue.values.push(wktValueToReflect(e));
          }
        }
        value.kind = {
          case: "listValue",
          value: listValue
        };
      } else {
        value.kind = {
          case: "structValue",
          value: wktStructToReflect(json)
        };
      }
      break;
  }
  return value;
}

// node_modules/@bufbuild/protobuf/dist/esm/to-binary.js
var LEGACY_REQUIRED2 = 3;
var writeDefaults = {
  writeUnknownFields: true
};
function makeWriteOptions(options) {
  return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function toBinary(schema, message, options) {
  return writeFields(new BinaryWriter, makeWriteOptions(options), reflect(schema, message)).finish();
}
function writeFields(writer, opts, msg) {
  var _a;
  for (const f of msg.sortedFields) {
    if (!msg.isSet(f)) {
      if (f.presence == LEGACY_REQUIRED2) {
        throw new Error(`cannot encode ${f} to binary: required field not set`);
      }
      continue;
    }
    writeField(writer, opts, msg, f);
  }
  if (opts.writeUnknownFields) {
    for (const { no, wireType, data } of (_a = msg.getUnknown()) !== null && _a !== undefined ? _a : []) {
      writer.tag(no, wireType).raw(data);
    }
  }
  return writer;
}
function writeField(writer, opts, msg, field) {
  var _a;
  switch (field.fieldKind) {
    case "scalar":
    case "enum":
      writeScalar(writer, msg.desc.typeName, field.name, (_a = field.scalar) !== null && _a !== undefined ? _a : ScalarType.INT32, field.number, msg.get(field));
      break;
    case "list":
      writeListField(writer, opts, field, msg.get(field));
      break;
    case "message":
      writeMessageField(writer, opts, field, msg.get(field));
      break;
    case "map":
      for (const [key2, val] of msg.get(field)) {
        writeMapEntry(writer, opts, field, key2, val);
      }
      break;
  }
}
function writeScalar(writer, msgName, fieldName, scalarType, fieldNo, value) {
  writeScalarValue(writer.tag(fieldNo, writeTypeOfScalar(scalarType)), msgName, fieldName, scalarType, value);
}
function writeMessageField(writer, opts, field, message) {
  if (field.delimitedEncoding) {
    writeFields(writer.tag(field.number, WireType.StartGroup), opts, message).tag(field.number, WireType.EndGroup);
  } else {
    writeFields(writer.tag(field.number, WireType.LengthDelimited).fork(), opts, message).join();
  }
}
function writeListField(writer, opts, field, list) {
  var _a;
  if (field.listKind == "message") {
    for (const item of list) {
      writeMessageField(writer, opts, field, item);
    }
    return;
  }
  const scalarType = (_a = field.scalar) !== null && _a !== undefined ? _a : ScalarType.INT32;
  if (field.packed) {
    if (!list.size) {
      return;
    }
    writer.tag(field.number, WireType.LengthDelimited).fork();
    for (const item of list) {
      writeScalarValue(writer, field.parent.typeName, field.name, scalarType, item);
    }
    writer.join();
    return;
  }
  for (const item of list) {
    writeScalar(writer, field.parent.typeName, field.name, scalarType, field.number, item);
  }
}
function writeMapEntry(writer, opts, field, key2, value) {
  var _a;
  writer.tag(field.number, WireType.LengthDelimited).fork();
  writeScalar(writer, field.parent.typeName, field.name, field.mapKey, 1, key2);
  switch (field.mapKind) {
    case "scalar":
    case "enum":
      writeScalar(writer, field.parent.typeName, field.name, (_a = field.scalar) !== null && _a !== undefined ? _a : ScalarType.INT32, 2, value);
      break;
    case "message":
      writeFields(writer.tag(2, WireType.LengthDelimited).fork(), opts, value).join();
      break;
  }
  writer.join();
}
function writeScalarValue(writer, msgName, fieldName, type, value) {
  try {
    switch (type) {
      case ScalarType.STRING:
        writer.string(value);
        break;
      case ScalarType.BOOL:
        writer.bool(value);
        break;
      case ScalarType.DOUBLE:
        writer.double(value);
        break;
      case ScalarType.FLOAT:
        writer.float(value);
        break;
      case ScalarType.INT32:
        writer.int32(value);
        break;
      case ScalarType.INT64:
        writer.int64(value);
        break;
      case ScalarType.UINT64:
        writer.uint64(value);
        break;
      case ScalarType.FIXED64:
        writer.fixed64(value);
        break;
      case ScalarType.BYTES:
        writer.bytes(value);
        break;
      case ScalarType.FIXED32:
        writer.fixed32(value);
        break;
      case ScalarType.SFIXED32:
        writer.sfixed32(value);
        break;
      case ScalarType.SFIXED64:
        writer.sfixed64(value);
        break;
      case ScalarType.SINT64:
        writer.sint64(value);
        break;
      case ScalarType.UINT32:
        writer.uint32(value);
        break;
      case ScalarType.SINT32:
        writer.sint32(value);
        break;
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`cannot encode field ${msgName}.${fieldName} to binary: ${e.message}`);
    }
    throw e;
  }
}
function writeTypeOfScalar(type) {
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      return WireType.LengthDelimited;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      return WireType.Bit64;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      return WireType.Bit32;
    default:
      return WireType.Varint;
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/message.js
function messageDesc(file, path, ...paths) {
  return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]);
}

// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/enum.js
function enumDesc(file, path, ...paths) {
  if (paths.length == 0) {
    return file.enums[path];
  }
  const e = paths.pop();
  return paths.reduce((acc, cur) => acc.nestedMessages[cur], file.messages[path]).nestedEnums[e];
}
function tsEnum(desc) {
  const enumObject = {};
  for (const value of desc.values) {
    enumObject[value.localName] = value.number;
    enumObject[value.number] = value.localName;
  }
  return enumObject;
}

// node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/descriptor_pb.js
var file_google_protobuf_descriptor = /* @__PURE__ */ boot({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }], extensionRange: [{ start: 536000000, end: 536000001 }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "option_dependency", number: 15, type: 9, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }, { name: "visibility", number: 11, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }, { name: "visibility", number: 6, type: 14, label: 1, typeName: ".google.protobuf.SymbolVisibility" }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: true } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: true } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false", options: { deprecated: true } }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: true } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1000, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1000 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }, { name: "enforce_naming_style", number: 7, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle", options: { retention: 2, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9], editionDefaults: [{ value: "STYLE_LEGACY", edition: 900 }, { value: "STYLE2024", edition: 1001 }] } }, { name: "default_symbol_visibility", number: 8, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility", options: { retention: 2, targets: [1], editionDefaults: [{ value: "EXPORT_ALL", edition: 900 }, { value: "EXPORT_TOP_LEVEL", edition: 1001 }] } }], nestedType: [{ name: "VisibilityFeature", enumType: [{ name: "DefaultSymbolVisibility", value: [{ name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", number: 0 }, { name: "EXPORT_ALL", number: 1 }, { name: "EXPORT_TOP_LEVEL", number: 2 }, { name: "LOCAL_ALL", number: 3 }, { name: "STRICT", number: 4 }] }] }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }, { name: "EnforceNamingStyle", value: [{ name: "ENFORCE_NAMING_STYLE_UNKNOWN", number: 0 }, { name: "STYLE2024", number: 1 }, { name: "STYLE_LEGACY", number: 2 }] }], extensionRange: [{ start: 1000, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: true } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: true } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }], extensionRange: [{ start: 536000000, end: 536000001 }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: true } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1000 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }, { name: "SymbolVisibility", value: [{ name: "VISIBILITY_UNSET", number: 0 }, { name: "VISIBILITY_LOCAL", number: 1 }, { name: "VISIBILITY_EXPORT", number: 2 }] }] });
var FileDescriptorProtoSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_descriptor, 1);
var ExtensionRangeOptions_VerificationState;
(function(ExtensionRangeOptions_VerificationState2) {
  ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["DECLARATION"] = 0] = "DECLARATION";
  ExtensionRangeOptions_VerificationState2[ExtensionRangeOptions_VerificationState2["UNVERIFIED"] = 1] = "UNVERIFIED";
})(ExtensionRangeOptions_VerificationState || (ExtensionRangeOptions_VerificationState = {}));
var FieldDescriptorProto_Type;
(function(FieldDescriptorProto_Type2) {
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["DOUBLE"] = 1] = "DOUBLE";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FLOAT"] = 2] = "FLOAT";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT64"] = 3] = "INT64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT64"] = 4] = "UINT64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["INT32"] = 5] = "INT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED64"] = 6] = "FIXED64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["FIXED32"] = 7] = "FIXED32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BOOL"] = 8] = "BOOL";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["STRING"] = 9] = "STRING";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["GROUP"] = 10] = "GROUP";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["MESSAGE"] = 11] = "MESSAGE";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["BYTES"] = 12] = "BYTES";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["UINT32"] = 13] = "UINT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["ENUM"] = 14] = "ENUM";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED32"] = 15] = "SFIXED32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SFIXED64"] = 16] = "SFIXED64";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT32"] = 17] = "SINT32";
  FieldDescriptorProto_Type2[FieldDescriptorProto_Type2["SINT64"] = 18] = "SINT64";
})(FieldDescriptorProto_Type || (FieldDescriptorProto_Type = {}));
var FieldDescriptorProto_Label;
(function(FieldDescriptorProto_Label2) {
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["OPTIONAL"] = 1] = "OPTIONAL";
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REPEATED"] = 3] = "REPEATED";
  FieldDescriptorProto_Label2[FieldDescriptorProto_Label2["REQUIRED"] = 2] = "REQUIRED";
})(FieldDescriptorProto_Label || (FieldDescriptorProto_Label = {}));
var FileOptions_OptimizeMode;
(function(FileOptions_OptimizeMode2) {
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["SPEED"] = 1] = "SPEED";
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["CODE_SIZE"] = 2] = "CODE_SIZE";
  FileOptions_OptimizeMode2[FileOptions_OptimizeMode2["LITE_RUNTIME"] = 3] = "LITE_RUNTIME";
})(FileOptions_OptimizeMode || (FileOptions_OptimizeMode = {}));
var FieldOptions_CType;
(function(FieldOptions_CType2) {
  FieldOptions_CType2[FieldOptions_CType2["STRING"] = 0] = "STRING";
  FieldOptions_CType2[FieldOptions_CType2["CORD"] = 1] = "CORD";
  FieldOptions_CType2[FieldOptions_CType2["STRING_PIECE"] = 2] = "STRING_PIECE";
})(FieldOptions_CType || (FieldOptions_CType = {}));
var FieldOptions_JSType;
(function(FieldOptions_JSType2) {
  FieldOptions_JSType2[FieldOptions_JSType2["JS_NORMAL"] = 0] = "JS_NORMAL";
  FieldOptions_JSType2[FieldOptions_JSType2["JS_STRING"] = 1] = "JS_STRING";
  FieldOptions_JSType2[FieldOptions_JSType2["JS_NUMBER"] = 2] = "JS_NUMBER";
})(FieldOptions_JSType || (FieldOptions_JSType = {}));
var FieldOptions_OptionRetention;
(function(FieldOptions_OptionRetention2) {
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_UNKNOWN"] = 0] = "RETENTION_UNKNOWN";
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_RUNTIME"] = 1] = "RETENTION_RUNTIME";
  FieldOptions_OptionRetention2[FieldOptions_OptionRetention2["RETENTION_SOURCE"] = 2] = "RETENTION_SOURCE";
})(FieldOptions_OptionRetention || (FieldOptions_OptionRetention = {}));
var FieldOptions_OptionTargetType;
(function(FieldOptions_OptionTargetType2) {
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_UNKNOWN"] = 0] = "TARGET_TYPE_UNKNOWN";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FILE"] = 1] = "TARGET_TYPE_FILE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_EXTENSION_RANGE"] = 2] = "TARGET_TYPE_EXTENSION_RANGE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_MESSAGE"] = 3] = "TARGET_TYPE_MESSAGE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_FIELD"] = 4] = "TARGET_TYPE_FIELD";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ONEOF"] = 5] = "TARGET_TYPE_ONEOF";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM"] = 6] = "TARGET_TYPE_ENUM";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_ENUM_ENTRY"] = 7] = "TARGET_TYPE_ENUM_ENTRY";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_SERVICE"] = 8] = "TARGET_TYPE_SERVICE";
  FieldOptions_OptionTargetType2[FieldOptions_OptionTargetType2["TARGET_TYPE_METHOD"] = 9] = "TARGET_TYPE_METHOD";
})(FieldOptions_OptionTargetType || (FieldOptions_OptionTargetType = {}));
var MethodOptions_IdempotencyLevel;
(function(MethodOptions_IdempotencyLevel2) {
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENCY_UNKNOWN"] = 0] = "IDEMPOTENCY_UNKNOWN";
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["NO_SIDE_EFFECTS"] = 1] = "NO_SIDE_EFFECTS";
  MethodOptions_IdempotencyLevel2[MethodOptions_IdempotencyLevel2["IDEMPOTENT"] = 2] = "IDEMPOTENT";
})(MethodOptions_IdempotencyLevel || (MethodOptions_IdempotencyLevel = {}));
var FeatureSet_VisibilityFeature_DefaultSymbolVisibility;
(function(FeatureSet_VisibilityFeature_DefaultSymbolVisibility2) {
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["DEFAULT_SYMBOL_VISIBILITY_UNKNOWN"] = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN";
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["EXPORT_ALL"] = 1] = "EXPORT_ALL";
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["EXPORT_TOP_LEVEL"] = 2] = "EXPORT_TOP_LEVEL";
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["LOCAL_ALL"] = 3] = "LOCAL_ALL";
  FeatureSet_VisibilityFeature_DefaultSymbolVisibility2[FeatureSet_VisibilityFeature_DefaultSymbolVisibility2["STRICT"] = 4] = "STRICT";
})(FeatureSet_VisibilityFeature_DefaultSymbolVisibility || (FeatureSet_VisibilityFeature_DefaultSymbolVisibility = {}));
var FeatureSet_FieldPresence;
(function(FeatureSet_FieldPresence2) {
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["FIELD_PRESENCE_UNKNOWN"] = 0] = "FIELD_PRESENCE_UNKNOWN";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["EXPLICIT"] = 1] = "EXPLICIT";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["IMPLICIT"] = 2] = "IMPLICIT";
  FeatureSet_FieldPresence2[FeatureSet_FieldPresence2["LEGACY_REQUIRED"] = 3] = "LEGACY_REQUIRED";
})(FeatureSet_FieldPresence || (FeatureSet_FieldPresence = {}));
var FeatureSet_EnumType;
(function(FeatureSet_EnumType2) {
  FeatureSet_EnumType2[FeatureSet_EnumType2["ENUM_TYPE_UNKNOWN"] = 0] = "ENUM_TYPE_UNKNOWN";
  FeatureSet_EnumType2[FeatureSet_EnumType2["OPEN"] = 1] = "OPEN";
  FeatureSet_EnumType2[FeatureSet_EnumType2["CLOSED"] = 2] = "CLOSED";
})(FeatureSet_EnumType || (FeatureSet_EnumType = {}));
var FeatureSet_RepeatedFieldEncoding;
(function(FeatureSet_RepeatedFieldEncoding2) {
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["REPEATED_FIELD_ENCODING_UNKNOWN"] = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN";
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["PACKED"] = 1] = "PACKED";
  FeatureSet_RepeatedFieldEncoding2[FeatureSet_RepeatedFieldEncoding2["EXPANDED"] = 2] = "EXPANDED";
})(FeatureSet_RepeatedFieldEncoding || (FeatureSet_RepeatedFieldEncoding = {}));
var FeatureSet_Utf8Validation;
(function(FeatureSet_Utf8Validation2) {
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["UTF8_VALIDATION_UNKNOWN"] = 0] = "UTF8_VALIDATION_UNKNOWN";
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["VERIFY"] = 2] = "VERIFY";
  FeatureSet_Utf8Validation2[FeatureSet_Utf8Validation2["NONE"] = 3] = "NONE";
})(FeatureSet_Utf8Validation || (FeatureSet_Utf8Validation = {}));
var FeatureSet_MessageEncoding;
(function(FeatureSet_MessageEncoding2) {
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["MESSAGE_ENCODING_UNKNOWN"] = 0] = "MESSAGE_ENCODING_UNKNOWN";
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["LENGTH_PREFIXED"] = 1] = "LENGTH_PREFIXED";
  FeatureSet_MessageEncoding2[FeatureSet_MessageEncoding2["DELIMITED"] = 2] = "DELIMITED";
})(FeatureSet_MessageEncoding || (FeatureSet_MessageEncoding = {}));
var FeatureSet_JsonFormat;
(function(FeatureSet_JsonFormat2) {
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["JSON_FORMAT_UNKNOWN"] = 0] = "JSON_FORMAT_UNKNOWN";
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["ALLOW"] = 1] = "ALLOW";
  FeatureSet_JsonFormat2[FeatureSet_JsonFormat2["LEGACY_BEST_EFFORT"] = 2] = "LEGACY_BEST_EFFORT";
})(FeatureSet_JsonFormat || (FeatureSet_JsonFormat = {}));
var FeatureSet_EnforceNamingStyle;
(function(FeatureSet_EnforceNamingStyle2) {
  FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["ENFORCE_NAMING_STYLE_UNKNOWN"] = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN";
  FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE2024"] = 1] = "STYLE2024";
  FeatureSet_EnforceNamingStyle2[FeatureSet_EnforceNamingStyle2["STYLE_LEGACY"] = 2] = "STYLE_LEGACY";
})(FeatureSet_EnforceNamingStyle || (FeatureSet_EnforceNamingStyle = {}));
var GeneratedCodeInfo_Annotation_Semantic;
(function(GeneratedCodeInfo_Annotation_Semantic2) {
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["NONE"] = 0] = "NONE";
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["SET"] = 1] = "SET";
  GeneratedCodeInfo_Annotation_Semantic2[GeneratedCodeInfo_Annotation_Semantic2["ALIAS"] = 2] = "ALIAS";
})(GeneratedCodeInfo_Annotation_Semantic || (GeneratedCodeInfo_Annotation_Semantic = {}));
var Edition;
(function(Edition2) {
  Edition2[Edition2["EDITION_UNKNOWN"] = 0] = "EDITION_UNKNOWN";
  Edition2[Edition2["EDITION_LEGACY"] = 900] = "EDITION_LEGACY";
  Edition2[Edition2["EDITION_PROTO2"] = 998] = "EDITION_PROTO2";
  Edition2[Edition2["EDITION_PROTO3"] = 999] = "EDITION_PROTO3";
  Edition2[Edition2["EDITION_2023"] = 1000] = "EDITION_2023";
  Edition2[Edition2["EDITION_2024"] = 1001] = "EDITION_2024";
  Edition2[Edition2["EDITION_1_TEST_ONLY"] = 1] = "EDITION_1_TEST_ONLY";
  Edition2[Edition2["EDITION_2_TEST_ONLY"] = 2] = "EDITION_2_TEST_ONLY";
  Edition2[Edition2["EDITION_99997_TEST_ONLY"] = 99997] = "EDITION_99997_TEST_ONLY";
  Edition2[Edition2["EDITION_99998_TEST_ONLY"] = 99998] = "EDITION_99998_TEST_ONLY";
  Edition2[Edition2["EDITION_99999_TEST_ONLY"] = 99999] = "EDITION_99999_TEST_ONLY";
  Edition2[Edition2["EDITION_MAX"] = 2147483647] = "EDITION_MAX";
})(Edition || (Edition = {}));
var SymbolVisibility;
(function(SymbolVisibility2) {
  SymbolVisibility2[SymbolVisibility2["VISIBILITY_UNSET"] = 0] = "VISIBILITY_UNSET";
  SymbolVisibility2[SymbolVisibility2["VISIBILITY_LOCAL"] = 1] = "VISIBILITY_LOCAL";
  SymbolVisibility2[SymbolVisibility2["VISIBILITY_EXPORT"] = 2] = "VISIBILITY_EXPORT";
})(SymbolVisibility || (SymbolVisibility = {}));

// node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
var readDefaults = {
  readUnknownFields: true
};
function makeReadOptions(options) {
  return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
}
function fromBinary(schema, bytes, options) {
  const msg = reflect(schema, undefined, false);
  readMessage(msg, new BinaryReader(bytes), makeReadOptions(options), false, bytes.byteLength);
  return msg.message;
}
function readMessage(message, reader, options, delimited, lengthOrDelimitedFieldNo) {
  var _a;
  const end = delimited ? reader.len : reader.pos + lengthOrDelimitedFieldNo;
  let fieldNo;
  let wireType;
  const unknownFields = (_a = message.getUnknown()) !== null && _a !== undefined ? _a : [];
  while (reader.pos < end) {
    [fieldNo, wireType] = reader.tag();
    if (delimited && wireType == WireType.EndGroup) {
      break;
    }
    const field = message.findNumber(fieldNo);
    if (!field) {
      const data = reader.skip(wireType, fieldNo);
      if (options.readUnknownFields) {
        unknownFields.push({ no: fieldNo, wireType, data });
      }
      continue;
    }
    readField(message, reader, field, wireType, options);
  }
  if (delimited) {
    if (wireType != WireType.EndGroup || fieldNo !== lengthOrDelimitedFieldNo) {
      throw new Error("invalid end group tag");
    }
  }
  if (unknownFields.length > 0) {
    message.setUnknown(unknownFields);
  }
}
function readField(message, reader, field, wireType, options) {
  var _a;
  switch (field.fieldKind) {
    case "scalar":
      message.set(field, readScalar(reader, field.scalar));
      break;
    case "enum":
      const val = readScalar(reader, ScalarType.INT32);
      if (field.enum.open) {
        message.set(field, val);
      } else {
        const ok = field.enum.values.some((v) => v.number === val);
        if (ok) {
          message.set(field, val);
        } else if (options.readUnknownFields) {
          const bytes = [];
          varint32write(val, bytes);
          const unknownFields = (_a = message.getUnknown()) !== null && _a !== undefined ? _a : [];
          unknownFields.push({
            no: field.number,
            wireType,
            data: new Uint8Array(bytes)
          });
          message.setUnknown(unknownFields);
        }
      }
      break;
    case "message":
      message.set(field, readMessageField(reader, options, field, message.get(field)));
      break;
    case "list":
      readListField(reader, wireType, message.get(field), options);
      break;
    case "map":
      readMapEntry(reader, message.get(field), options);
      break;
  }
}
function readMapEntry(reader, map, options) {
  const field = map.field();
  let key2;
  let val;
  const len = reader.uint32();
  const end = reader.pos + len;
  while (reader.pos < end) {
    const [fieldNo] = reader.tag();
    switch (fieldNo) {
      case 1:
        key2 = readScalar(reader, field.mapKey);
        break;
      case 2:
        switch (field.mapKind) {
          case "scalar":
            val = readScalar(reader, field.scalar);
            break;
          case "enum":
            val = reader.int32();
            break;
          case "message":
            val = readMessageField(reader, options, field);
            break;
        }
        break;
    }
  }
  if (key2 === undefined) {
    key2 = scalarZeroValue(field.mapKey, false);
  }
  if (val === undefined) {
    switch (field.mapKind) {
      case "scalar":
        val = scalarZeroValue(field.scalar, false);
        break;
      case "enum":
        val = field.enum.values[0].number;
        break;
      case "message":
        val = reflect(field.message, undefined, false);
        break;
    }
  }
  map.set(key2, val);
}
function readListField(reader, wireType, list, options) {
  var _a;
  const field = list.field();
  if (field.listKind === "message") {
    list.add(readMessageField(reader, options, field));
    return;
  }
  const scalarType = (_a = field.scalar) !== null && _a !== undefined ? _a : ScalarType.INT32;
  const packed = wireType == WireType.LengthDelimited && scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES;
  if (!packed) {
    list.add(readScalar(reader, scalarType));
    return;
  }
  const e = reader.uint32() + reader.pos;
  while (reader.pos < e) {
    list.add(readScalar(reader, scalarType));
  }
}
function readMessageField(reader, options, field, mergeMessage) {
  const delimited = field.delimitedEncoding;
  const message = mergeMessage !== null && mergeMessage !== undefined ? mergeMessage : reflect(field.message, undefined, false);
  readMessage(message, reader, options, delimited, delimited ? field.number : reader.uint32());
  return message;
}
function readScalar(reader, type) {
  switch (type) {
    case ScalarType.STRING:
      return reader.string();
    case ScalarType.BOOL:
      return reader.bool();
    case ScalarType.DOUBLE:
      return reader.double();
    case ScalarType.FLOAT:
      return reader.float();
    case ScalarType.INT32:
      return reader.int32();
    case ScalarType.INT64:
      return reader.int64();
    case ScalarType.UINT64:
      return reader.uint64();
    case ScalarType.FIXED64:
      return reader.fixed64();
    case ScalarType.BYTES:
      return reader.bytes();
    case ScalarType.FIXED32:
      return reader.fixed32();
    case ScalarType.SFIXED32:
      return reader.sfixed32();
    case ScalarType.SFIXED64:
      return reader.sfixed64();
    case ScalarType.SINT64:
      return reader.sint64();
    case ScalarType.UINT32:
      return reader.uint32();
    case ScalarType.SINT32:
      return reader.sint32();
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/file.js
function fileDesc(b64, imports) {
  var _a;
  const root = fromBinary(FileDescriptorProtoSchema, base64Decode(b64));
  root.messageType.forEach(restoreJsonNames);
  root.dependency = (_a = imports === null || imports === undefined ? undefined : imports.map((f) => f.proto.name)) !== null && _a !== undefined ? _a : [];
  const reg = createFileRegistry(root, (protoFileName) => imports === null || imports === undefined ? undefined : imports.find((f) => f.proto.name === protoFileName));
  return reg.getFile(root.name);
}

// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/service.js
function serviceDesc(file, path, ...paths) {
  if (paths.length > 0) {
    throw new Error;
  }
  return file.services[path];
}

// node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/timestamp_pb.js
var file_google_protobuf_timestamp = /* @__PURE__ */ fileDesc("Ch9nb29nbGUvcHJvdG9idWYvdGltZXN0YW1wLnByb3RvEg9nb29nbGUucHJvdG9idWYiKwoJVGltZXN0YW1wEg8KB3NlY29uZHMYASABKAMSDQoFbmFub3MYAiABKAVChQEKE2NvbS5nb29nbGUucHJvdG9idWZCDlRpbWVzdGFtcFByb3RvUAFaMmdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3RpbWVzdGFtcHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");

// node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/any_pb.js
var file_google_protobuf_any = /* @__PURE__ */ fileDesc("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");
var AnySchema = /* @__PURE__ */ messageDesc(file_google_protobuf_any, 0);

// node_modules/@bufbuild/protobuf/dist/esm/wkt/any.js
function anyPack(schema, message, into) {
  let ret = false;
  if (!into) {
    into = create(AnySchema);
    ret = true;
  }
  into.value = toBinary(schema, message);
  into.typeUrl = typeNameToUrl(message.$typeName);
  return ret ? into : undefined;
}
function anyIs(any, descOrTypeName) {
  if (any.typeUrl === "") {
    return false;
  }
  const want = typeof descOrTypeName == "string" ? descOrTypeName : descOrTypeName.typeName;
  const got = typeUrlToName(any.typeUrl);
  return want === got;
}
function anyUnpack(any, registryOrMessageDesc) {
  if (any.typeUrl === "") {
    return;
  }
  const desc = registryOrMessageDesc.kind == "message" ? registryOrMessageDesc : registryOrMessageDesc.getMessage(typeUrlToName(any.typeUrl));
  if (!desc || !anyIs(any, desc)) {
    return;
  }
  return fromBinary(desc, any.value);
}
function typeNameToUrl(name) {
  return `type.googleapis.com/${name}`;
}
function typeUrlToName(url) {
  const slash = url.lastIndexOf("/");
  const name = slash >= 0 ? url.substring(slash + 1) : url;
  if (!name.length) {
    throw new Error(`invalid type url: ${url}`);
  }
  return name;
}

// node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/duration_pb.js
var file_google_protobuf_duration = /* @__PURE__ */ fileDesc("Ch5nb29nbGUvcHJvdG9idWYvZHVyYXRpb24ucHJvdG8SD2dvb2dsZS5wcm90b2J1ZiIqCghEdXJhdGlvbhIPCgdzZWNvbmRzGAEgASgDEg0KBW5hbm9zGAIgASgFQoMBChNjb20uZ29vZ2xlLnByb3RvYnVmQg1EdXJhdGlvblByb3RvUAFaMWdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2R1cmF0aW9ucGL4AQGiAgNHUEKqAh5Hb29nbGUuUHJvdG9idWYuV2VsbEtub3duVHlwZXNiBnByb3RvMw");

// node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/field_mask_pb.js
var file_google_protobuf_field_mask = /* @__PURE__ */ fileDesc("CiBnb29nbGUvcHJvdG9idWYvZmllbGRfbWFzay5wcm90bxIPZ29vZ2xlLnByb3RvYnVmIhoKCUZpZWxkTWFzaxINCgVwYXRocxgBIAMoCUKFAQoTY29tLmdvb2dsZS5wcm90b2J1ZkIORmllbGRNYXNrUHJvdG9QAVoyZ29vZ2xlLmdvbGFuZy5vcmcvcHJvdG9idWYvdHlwZXMva25vd24vZmllbGRtYXNrcGL4AQGiAgNHUEKqAh5Hb29nbGUuUHJvdG9idWYuV2VsbEtub3duVHlwZXNiBnByb3RvMw");

// node_modules/@bufbuild/protobuf/dist/esm/wkt/gen/google/protobuf/struct_pb.js
var file_google_protobuf_struct = /* @__PURE__ */ fileDesc("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM");
var StructSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 0);
var ValueSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 1);
var ListValueSchema = /* @__PURE__ */ messageDesc(file_google_protobuf_struct, 2);
var NullValue;
(function(NullValue2) {
  NullValue2[NullValue2["NULL_VALUE"] = 0] = "NULL_VALUE";
})(NullValue || (NullValue = {}));

// node_modules/@buf/redpandadata_dataplane.bufbuild_es/node_modules/@buf/bufbuild_protovalidate.bufbuild_es/buf/validate/validate_pb.js
var file_buf_validate_validate = /* @__PURE__ */ fileDesc("ChtidWYvdmFsaWRhdGUvdmFsaWRhdGUucHJvdG8SDGJ1Zi52YWxpZGF0ZSI3CgRSdWxlEgoKAmlkGAEgASgJEg8KB21lc3NhZ2UYAiABKAkSEgoKZXhwcmVzc2lvbhgDIAEoCSJBCgxNZXNzYWdlUnVsZXMSEAoIZGlzYWJsZWQYASABKAgSHwoDY2VsGAMgAygLMhIuYnVmLnZhbGlkYXRlLlJ1bGUiHgoKT25lb2ZSdWxlcxIQCghyZXF1aXJlZBgBIAEoCCK/CAoKRmllbGRSdWxlcxIfCgNjZWwYFyADKAsyEi5idWYudmFsaWRhdGUuUnVsZRIQCghyZXF1aXJlZBgZIAEoCBIkCgZpZ25vcmUYGyABKA4yFC5idWYudmFsaWRhdGUuSWdub3JlEikKBWZsb2F0GAEgASgLMhguYnVmLnZhbGlkYXRlLkZsb2F0UnVsZXNIABIrCgZkb3VibGUYAiABKAsyGS5idWYudmFsaWRhdGUuRG91YmxlUnVsZXNIABIpCgVpbnQzMhgDIAEoCzIYLmJ1Zi52YWxpZGF0ZS5JbnQzMlJ1bGVzSAASKQoFaW50NjQYBCABKAsyGC5idWYudmFsaWRhdGUuSW50NjRSdWxlc0gAEisKBnVpbnQzMhgFIAEoCzIZLmJ1Zi52YWxpZGF0ZS5VSW50MzJSdWxlc0gAEisKBnVpbnQ2NBgGIAEoCzIZLmJ1Zi52YWxpZGF0ZS5VSW50NjRSdWxlc0gAEisKBnNpbnQzMhgHIAEoCzIZLmJ1Zi52YWxpZGF0ZS5TSW50MzJSdWxlc0gAEisKBnNpbnQ2NBgIIAEoCzIZLmJ1Zi52YWxpZGF0ZS5TSW50NjRSdWxlc0gAEi0KB2ZpeGVkMzIYCSABKAsyGi5idWYudmFsaWRhdGUuRml4ZWQzMlJ1bGVzSAASLQoHZml4ZWQ2NBgKIAEoCzIaLmJ1Zi52YWxpZGF0ZS5GaXhlZDY0UnVsZXNIABIvCghzZml4ZWQzMhgLIAEoCzIbLmJ1Zi52YWxpZGF0ZS5TRml4ZWQzMlJ1bGVzSAASLwoIc2ZpeGVkNjQYDCABKAsyGy5idWYudmFsaWRhdGUuU0ZpeGVkNjRSdWxlc0gAEicKBGJvb2wYDSABKAsyFy5idWYudmFsaWRhdGUuQm9vbFJ1bGVzSAASKwoGc3RyaW5nGA4gASgLMhkuYnVmLnZhbGlkYXRlLlN0cmluZ1J1bGVzSAASKQoFYnl0ZXMYDyABKAsyGC5idWYudmFsaWRhdGUuQnl0ZXNSdWxlc0gAEicKBGVudW0YECABKAsyFy5idWYudmFsaWRhdGUuRW51bVJ1bGVzSAASLwoIcmVwZWF0ZWQYEiABKAsyGy5idWYudmFsaWRhdGUuUmVwZWF0ZWRSdWxlc0gAEiUKA21hcBgTIAEoCzIWLmJ1Zi52YWxpZGF0ZS5NYXBSdWxlc0gAEiUKA2FueRgUIAEoCzIWLmJ1Zi52YWxpZGF0ZS5BbnlSdWxlc0gAEi8KCGR1cmF0aW9uGBUgASgLMhsuYnVmLnZhbGlkYXRlLkR1cmF0aW9uUnVsZXNIABIxCgl0aW1lc3RhbXAYFiABKAsyHC5idWYudmFsaWRhdGUuVGltZXN0YW1wUnVsZXNIAEIGCgR0eXBlSgQIGBAZSgQIGhAbUgdza2lwcGVkUgxpZ25vcmVfZW1wdHkiUwoPUHJlZGVmaW5lZFJ1bGVzEh8KA2NlbBgBIAMoCzISLmJ1Zi52YWxpZGF0ZS5SdWxlSgQIGBAZSgQIGhAbUhNza2lwcGVkaWdub3JlX2VtcHR5ItoXCgpGbG9hdFJ1bGVzEoMBCgVjb25zdBgBIAEoAkJ0wkhxCm8KC2Zsb2F0LmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSnwEKAmx0GAIgASgCQpABwkiMAQqJAQoIZmxvYXQubHQafSFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASrwEKA2x0ZRgDIAEoAkKfAcJImwEKmAEKCWZsb2F0Lmx0ZRqKASFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEu8HCgJndBgEIAEoAkLgB8JI3AcKjQEKCGZsb2F0Lmd0GoABIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKwwEKC2Zsb2F0Lmd0X2x0GrMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKzQEKFWZsb2F0Lmd0X2x0X2V4Y2x1c2l2ZRqzAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCtMBCgxmbG9hdC5ndF9sdGUawgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrdAQoWZmxvYXQuZ3RfbHRlX2V4Y2x1c2l2ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESuggKA2d0ZRgFIAEoAkKqCMJIpggKmwEKCWZsb2F0Lmd0ZRqNASFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrSAQoMZmxvYXQuZ3RlX2x0GsEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrcAQoWZmxvYXQuZ3RlX2x0X2V4Y2x1c2l2ZRrBAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK4gEKDWZsb2F0Lmd0ZV9sdGUa0AFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCuwBChdmbG9hdC5ndGVfbHRlX2V4Y2x1c2l2ZRrQAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ/CgJpbhgGIAMoAkJzwkhwCm4KCGZsb2F0LmluGmIhKHRoaXMgaW4gZ2V0RmllbGQocnVsZXMsICdpbicpKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdpbicpXSkgOiAnJxJ2CgZub3RfaW4YByADKAJCZsJIYwphCgxmbG9hdC5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxJ1CgZmaW5pdGUYCCABKAhCZcJIYgpgCgxmbG9hdC5maW5pdGUaUHJ1bGVzLmZpbml0ZSA/ICh0aGlzLmlzTmFuKCkgfHwgdGhpcy5pc0luZigpID8gJ3ZhbHVlIG11c3QgYmUgZmluaXRlJyA6ICcnKSA6ICcnEisKB2V4YW1wbGUYCSADKAJCGsJIFwoVCg1mbG9hdC5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiLtFwoLRG91YmxlUnVsZXMShAEKBWNvbnN0GAEgASgBQnXCSHIKcAoMZG91YmxlLmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSoAEKAmx0GAIgASgBQpEBwkiNAQqKAQoJZG91YmxlLmx0Gn0haGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID49IHJ1bGVzLmx0KT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAErABCgNsdGUYAyABKAFCoAHCSJwBCpkBCgpkb3VibGUubHRlGooBIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA+IHJ1bGVzLmx0ZSk/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAAS9AcKAmd0GAQgASgBQuUHwkjhBwqOAQoJZG91YmxlLmd0GoABIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKxAEKDGRvdWJsZS5ndF9sdBqzAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCs4BChZkb3VibGUuZ3RfbHRfZXhjbHVzaXZlGrMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycK1AEKDWRvdWJsZS5ndF9sdGUawgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwreAQoXZG91YmxlLmd0X2x0ZV9leGNsdXNpdmUawgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEr8ICgNndGUYBSABKAFCrwjCSKsICpwBCgpkb3VibGUuZ3RlGo0BIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCtMBCg1kb3VibGUuZ3RlX2x0GsEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrdAQoXZG91YmxlLmd0ZV9sdF9leGNsdXNpdmUawQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCuMBCg5kb3VibGUuZ3RlX2x0ZRrQAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK7QEKGGRvdWJsZS5ndGVfbHRlX2V4Y2x1c2l2ZRrQAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKAAQoCaW4YBiADKAFCdMJIcQpvCglkb3VibGUuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEncKBm5vdF9pbhgHIAMoAUJnwkhkCmIKDWRvdWJsZS5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxJ2CgZmaW5pdGUYCCABKAhCZsJIYwphCg1kb3VibGUuZmluaXRlGlBydWxlcy5maW5pdGUgPyAodGhpcy5pc05hbigpIHx8IHRoaXMuaXNJbmYoKSA/ICd2YWx1ZSBtdXN0IGJlIGZpbml0ZScgOiAnJykgOiAnJxIsCgdleGFtcGxlGAkgAygBQhvCSBgKFgoOZG91YmxlLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIowVCgpJbnQzMlJ1bGVzEoMBCgVjb25zdBgBIAEoBUJ0wkhxCm8KC2ludDMyLmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSigEKAmx0GAIgASgFQnzCSHkKdwoIaW50MzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnAEKA2x0ZRgDIAEoBUKMAcJIiAEKhQEKCWludDMyLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASlwcKAmd0GAQgASgFQogHwkiEBwp6CghpbnQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKswEKC2ludDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq7AQoVaW50MzIuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKwwEKDGludDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKywEKFmludDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEuMHCgNndGUYBSABKAVC0wfCSM8HCogBCglpbnQzMi5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrCAQoMaW50MzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCsoBChZpbnQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrSAQoNaW50MzIuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwraAQoXaW50MzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESfwoCaW4YBiADKAVCc8JIcApuCghpbnQzMi5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSdgoGbm90X2luGAcgAygFQmbCSGMKYQoMaW50MzIubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSKwoHZXhhbXBsZRgIIAMoBUIawkgXChUKDWludDMyLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIowVCgpJbnQ2NFJ1bGVzEoMBCgVjb25zdBgBIAEoA0J0wkhxCm8KC2ludDY0LmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSigEKAmx0GAIgASgDQnzCSHkKdwoIaW50NjQubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnAEKA2x0ZRgDIAEoA0KMAcJIiAEKhQEKCWludDY0Lmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASlwcKAmd0GAQgASgDQogHwkiEBwp6CghpbnQ2NC5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKswEKC2ludDY0Lmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq7AQoVaW50NjQuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKwwEKDGludDY0Lmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKywEKFmludDY0Lmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEuMHCgNndGUYBSABKANC0wfCSM8HCogBCglpbnQ2NC5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrCAQoMaW50NjQuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCsoBChZpbnQ2NC5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrSAQoNaW50NjQuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwraAQoXaW50NjQuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESfwoCaW4YBiADKANCc8JIcApuCghpbnQ2NC5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSdgoGbm90X2luGAcgAygDQmbCSGMKYQoMaW50NjQubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSKwoHZXhhbXBsZRgJIAMoA0IawkgXChUKDWludDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIp4VCgtVSW50MzJSdWxlcxKEAQoFY29uc3QYASABKA1CdcJIcgpwCgx1aW50MzIuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKLAQoCbHQYAiABKA1CfcJIegp4Cgl1aW50MzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnQEKA2x0ZRgDIAEoDUKNAcJIiQEKhgEKCnVpbnQzMi5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEpwHCgJndBgEIAEoDUKNB8JIiQcKewoJdWludDMyLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq0AQoMdWludDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq8AQoWdWludDMyLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsQBCg11aW50MzIuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrMAQoXdWludDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEugHCgNndGUYBSABKA1C2AfCSNQHCokBCgp1aW50MzIuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKwwEKDXVpbnQzMi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKywEKF3VpbnQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrTAQoOdWludDMyLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK2wEKGHVpbnQzMi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKAAQoCaW4YBiADKA1CdMJIcQpvCgl1aW50MzIuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEncKBm5vdF9pbhgHIAMoDUJnwkhkCmIKDXVpbnQzMi5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIsCgdleGFtcGxlGAggAygNQhvCSBgKFgoOdWludDMyLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIp4VCgtVSW50NjRSdWxlcxKEAQoFY29uc3QYASABKARCdcJIcgpwCgx1aW50NjQuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKLAQoCbHQYAiABKARCfcJIegp4Cgl1aW50NjQubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnQEKA2x0ZRgDIAEoBEKNAcJIiQEKhgEKCnVpbnQ2NC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEpwHCgJndBgEIAEoBEKNB8JIiQcKewoJdWludDY0Lmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq0AQoMdWludDY0Lmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq8AQoWdWludDY0Lmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsQBCg11aW50NjQuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrMAQoXdWludDY0Lmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEugHCgNndGUYBSABKARC2AfCSNQHCokBCgp1aW50NjQuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKwwEKDXVpbnQ2NC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKywEKF3VpbnQ2NC5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrTAQoOdWludDY0Lmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK2wEKGHVpbnQ2NC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKAAQoCaW4YBiADKARCdMJIcQpvCgl1aW50NjQuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEncKBm5vdF9pbhgHIAMoBEJnwkhkCmIKDXVpbnQ2NC5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIsCgdleGFtcGxlGAggAygEQhvCSBgKFgoOdWludDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIp4VCgtTSW50MzJSdWxlcxKEAQoFY29uc3QYASABKBFCdcJIcgpwCgxzaW50MzIuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKLAQoCbHQYAiABKBFCfcJIegp4CglzaW50MzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnQEKA2x0ZRgDIAEoEUKNAcJIiQEKhgEKCnNpbnQzMi5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEpwHCgJndBgEIAEoEUKNB8JIiQcKewoJc2ludDMyLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq0AQoMc2ludDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq8AQoWc2ludDMyLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsQBCg1zaW50MzIuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrMAQoXc2ludDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEugHCgNndGUYBSABKBFC2AfCSNQHCokBCgpzaW50MzIuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKwwEKDXNpbnQzMi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKywEKF3NpbnQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrTAQoOc2ludDMyLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK2wEKGHNpbnQzMi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKAAQoCaW4YBiADKBFCdMJIcQpvCglzaW50MzIuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEncKBm5vdF9pbhgHIAMoEUJnwkhkCmIKDXNpbnQzMi5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIsCgdleGFtcGxlGAggAygRQhvCSBgKFgoOc2ludDMyLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIp4VCgtTSW50NjRSdWxlcxKEAQoFY29uc3QYASABKBJCdcJIcgpwCgxzaW50NjQuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKLAQoCbHQYAiABKBJCfcJIegp4CglzaW50NjQubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnQEKA2x0ZRgDIAEoEkKNAcJIiQEKhgEKCnNpbnQ2NC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEpwHCgJndBgEIAEoEkKNB8JIiQcKewoJc2ludDY0Lmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq0AQoMc2ludDY0Lmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq8AQoWc2ludDY0Lmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsQBCg1zaW50NjQuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrMAQoXc2ludDY0Lmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEugHCgNndGUYBSABKBJC2AfCSNQHCokBCgpzaW50NjQuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKwwEKDXNpbnQ2NC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKywEKF3NpbnQ2NC5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrTAQoOc2ludDY0Lmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK2wEKGHNpbnQ2NC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKAAQoCaW4YBiADKBJCdMJIcQpvCglzaW50NjQuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEncKBm5vdF9pbhgHIAMoEkJnwkhkCmIKDXNpbnQ2NC5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIsCgdleGFtcGxlGAggAygSQhvCSBgKFgoOc2ludDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIq8VCgxGaXhlZDMyUnVsZXMShQEKBWNvbnN0GAEgASgHQnbCSHMKcQoNZml4ZWQzMi5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEowBCgJsdBgCIAEoB0J+wkh7CnkKCmZpeGVkMzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASngEKA2x0ZRgDIAEoB0KOAcJIigEKhwEKC2ZpeGVkMzIubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKhBwoCZ3QYBCABKAdCkgfCSI4HCnwKCmZpeGVkMzIuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrUBCg1maXhlZDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq9AQoXZml4ZWQzMi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrFAQoOZml4ZWQzMi5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCs0BChhmaXhlZDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEu0HCgNndGUYBSABKAdC3QfCSNkHCooBCgtmaXhlZDMyLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsQBCg5maXhlZDMyLmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrMAQoYZml4ZWQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrUAQoPZml4ZWQzMi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtwBChlmaXhlZDMyLmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEoEBCgJpbhgGIAMoB0J1wkhyCnAKCmZpeGVkMzIuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEngKBm5vdF9pbhgHIAMoB0JowkhlCmMKDmZpeGVkMzIubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLQoHZXhhbXBsZRgIIAMoB0IcwkgZChcKD2ZpeGVkMzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4irxUKDEZpeGVkNjRSdWxlcxKFAQoFY29uc3QYASABKAZCdsJIcwpxCg1maXhlZDY0LmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSjAEKAmx0GAIgASgGQn7CSHsKeQoKZml4ZWQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKeAQoDbHRlGAMgASgGQo4BwkiKAQqHAQoLZml4ZWQ2NC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqEHCgJndBgEIAEoBkKSB8JIjgcKfAoKZml4ZWQ2NC5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtQEKDWZpeGVkNjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr0BChdmaXhlZDY0Lmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsUBCg5maXhlZDY0Lmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzQEKGGZpeGVkNjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES7QcKA2d0ZRgFIAEoBkLdB8JI2QcKigEKC2ZpeGVkNjQuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxAEKDmZpeGVkNjQuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCswBChhmaXhlZDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtQBCg9maXhlZDY0Lmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3AEKGWZpeGVkNjQuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESgQEKAmluGAYgAygGQnXCSHIKcAoKZml4ZWQ2NC5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSeAoGbm90X2luGAcgAygGQmjCSGUKYwoOZml4ZWQ2NC5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxItCgdleGFtcGxlGAggAygGQhzCSBkKFwoPZml4ZWQ2NC5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiLAFQoNU0ZpeGVkMzJSdWxlcxKGAQoFY29uc3QYASABKA9Cd8JIdApyCg5zZml4ZWQzMi5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEo0BCgJsdBgCIAEoD0J/wkh8CnoKC3NmaXhlZDMyLmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp8BCgNsdGUYAyABKA9CjwHCSIsBCogBCgxzZml4ZWQzMi5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqYHCgJndBgEIAEoD0KXB8JIkwcKfQoLc2ZpeGVkMzIuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrYBCg5zZml4ZWQzMi5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvgEKGHNmaXhlZDMyLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsYBCg9zZml4ZWQzMi5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCs4BChlzZml4ZWQzMi5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLyBwoDZ3RlGAUgASgPQuIHwkjeBwqLAQoMc2ZpeGVkMzIuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxQEKD3NmaXhlZDMyLmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrNAQoZc2ZpeGVkMzIuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK1QEKEHNmaXhlZDMyLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3QEKGnNmaXhlZDMyLmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEoIBCgJpbhgGIAMoD0J2wkhzCnEKC3NmaXhlZDMyLmluGmIhKHRoaXMgaW4gZ2V0RmllbGQocnVsZXMsICdpbicpKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdpbicpXSkgOiAnJxJ5CgZub3RfaW4YByADKA9CacJIZgpkCg9zZml4ZWQzMi5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIuCgdleGFtcGxlGAggAygPQh3CSBoKGAoQc2ZpeGVkMzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4iwBUKDVNGaXhlZDY0UnVsZXMShgEKBWNvbnN0GAEgASgQQnfCSHQKcgoOc2ZpeGVkNjQuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKNAQoCbHQYAiABKBBCf8JIfAp6CgtzZml4ZWQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKfAQoDbHRlGAMgASgQQo8BwkiLAQqIAQoMc2ZpeGVkNjQubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKmBwoCZ3QYBCABKBBClwfCSJMHCn0KC3NmaXhlZDY0Lmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq2AQoOc2ZpeGVkNjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr4BChhzZml4ZWQ2NC5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrGAQoPc2ZpeGVkNjQuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrOAQoZc2ZpeGVkNjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES8gcKA2d0ZRgFIAEoEELiB8JI3gcKiwEKDHNmaXhlZDY0Lmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsUBCg9zZml4ZWQ2NC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzQEKGXNmaXhlZDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtUBChBzZml4ZWQ2NC5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCt0BChpzZml4ZWQ2NC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKCAQoCaW4YBiADKBBCdsJIcwpxCgtzZml4ZWQ2NC5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSeQoGbm90X2luGAcgAygQQmnCSGYKZAoPc2ZpeGVkNjQubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLgoHZXhhbXBsZRgIIAMoEEIdwkgaChgKEHNmaXhlZDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIscBCglCb29sUnVsZXMSggEKBWNvbnN0GAEgASgIQnPCSHAKbgoKYm9vbC5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEioKB2V4YW1wbGUYAiADKAhCGcJIFgoUCgxib29sLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAiKQNwoLU3RyaW5nUnVsZXMShgEKBWNvbnN0GAEgASgJQnfCSHQKcgoMc3RyaW5nLmNvbnN0GmJ0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsIGAlc2AnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxJ+CgNsZW4YEyABKARCccJIbgpsCgpzdHJpbmcubGVuGl51aW50KHRoaXMuc2l6ZSgpKSAhPSBydWxlcy5sZW4gPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgJXMgY2hhcmFjdGVycycuZm9ybWF0KFtydWxlcy5sZW5dKSA6ICcnEpkBCgdtaW5fbGVuGAIgASgEQocBwkiDAQqAAQoOc3RyaW5nLm1pbl9sZW4abnVpbnQodGhpcy5zaXplKCkpIDwgcnVsZXMubWluX2xlbiA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSBhdCBsZWFzdCAlcyBjaGFyYWN0ZXJzJy5mb3JtYXQoW3J1bGVzLm1pbl9sZW5dKSA6ICcnEpcBCgdtYXhfbGVuGAMgASgEQoUBwkiBAQp/Cg5zdHJpbmcubWF4X2xlbhptdWludCh0aGlzLnNpemUoKSkgPiBydWxlcy5tYXhfbGVuID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlIGF0IG1vc3QgJXMgY2hhcmFjdGVycycuZm9ybWF0KFtydWxlcy5tYXhfbGVuXSkgOiAnJxKbAQoJbGVuX2J5dGVzGBQgASgEQocBwkiDAQqAAQoQc3RyaW5nLmxlbl9ieXRlcxpsdWludChieXRlcyh0aGlzKS5zaXplKCkpICE9IHJ1bGVzLmxlbl9ieXRlcyA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSAlcyBieXRlcycuZm9ybWF0KFtydWxlcy5sZW5fYnl0ZXNdKSA6ICcnEqMBCgltaW5fYnl0ZXMYBCABKARCjwHCSIsBCogBChBzdHJpbmcubWluX2J5dGVzGnR1aW50KGJ5dGVzKHRoaXMpLnNpemUoKSkgPCBydWxlcy5taW5fYnl0ZXMgPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgYXQgbGVhc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWluX2J5dGVzXSkgOiAnJxKiAQoJbWF4X2J5dGVzGAUgASgEQo4BwkiKAQqHAQoQc3RyaW5nLm1heF9ieXRlcxpzdWludChieXRlcyh0aGlzKS5zaXplKCkpID4gcnVsZXMubWF4X2J5dGVzID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlIGF0IG1vc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWF4X2J5dGVzXSkgOiAnJxKNAQoHcGF0dGVybhgGIAEoCUJ8wkh5CncKDnN0cmluZy5wYXR0ZXJuGmUhdGhpcy5tYXRjaGVzKHJ1bGVzLnBhdHRlcm4pID8gJ3ZhbHVlIGRvZXMgbm90IG1hdGNoIHJlZ2V4IHBhdHRlcm4gYCVzYCcuZm9ybWF0KFtydWxlcy5wYXR0ZXJuXSkgOiAnJxKEAQoGcHJlZml4GAcgASgJQnTCSHEKbwoNc3RyaW5nLnByZWZpeBpeIXRoaXMuc3RhcnRzV2l0aChydWxlcy5wcmVmaXgpID8gJ3ZhbHVlIGRvZXMgbm90IGhhdmUgcHJlZml4IGAlc2AnLmZvcm1hdChbcnVsZXMucHJlZml4XSkgOiAnJxKCAQoGc3VmZml4GAggASgJQnLCSG8KbQoNc3RyaW5nLnN1ZmZpeBpcIXRoaXMuZW5kc1dpdGgocnVsZXMuc3VmZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHN1ZmZpeCBgJXNgJy5mb3JtYXQoW3J1bGVzLnN1ZmZpeF0pIDogJycSkAEKCGNvbnRhaW5zGAkgASgJQn7CSHsKeQoPc3RyaW5nLmNvbnRhaW5zGmYhdGhpcy5jb250YWlucyhydWxlcy5jb250YWlucykgPyAndmFsdWUgZG9lcyBub3QgY29udGFpbiBzdWJzdHJpbmcgYCVzYCcuZm9ybWF0KFtydWxlcy5jb250YWluc10pIDogJycSmAEKDG5vdF9jb250YWlucxgXIAEoCUKBAcJIfgp8ChNzdHJpbmcubm90X2NvbnRhaW5zGmV0aGlzLmNvbnRhaW5zKHJ1bGVzLm5vdF9jb250YWlucykgPyAndmFsdWUgY29udGFpbnMgc3Vic3RyaW5nIGAlc2AnLmZvcm1hdChbcnVsZXMubm90X2NvbnRhaW5zXSkgOiAnJxKAAQoCaW4YCiADKAlCdMJIcQpvCglzdHJpbmcuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEncKBm5vdF9pbhgLIAMoCUJnwkhkCmIKDXN0cmluZy5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxLfAQoFZW1haWwYDCABKAhCzQHCSMkBCmEKDHN0cmluZy5lbWFpbBIjdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGVtYWlsIGFkZHJlc3MaLCFydWxlcy5lbWFpbCB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNFbWFpbCgpCmQKEnN0cmluZy5lbWFpbF9lbXB0eRIydmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIGVtYWlsIGFkZHJlc3MaGiFydWxlcy5lbWFpbCB8fCB0aGlzICE9ICcnSAAS5wEKCGhvc3RuYW1lGA0gASgIQtIBwkjOAQplCg9zdHJpbmcuaG9zdG5hbWUSHnZhbHVlIG11c3QgYmUgYSB2YWxpZCBob3N0bmFtZRoyIXJ1bGVzLmhvc3RuYW1lIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0hvc3RuYW1lKCkKZQoVc3RyaW5nLmhvc3RuYW1lX2VtcHR5Ei12YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgaG9zdG5hbWUaHSFydWxlcy5ob3N0bmFtZSB8fCB0aGlzICE9ICcnSAASxwEKAmlwGA4gASgIQrgBwki0AQpVCglzdHJpbmcuaXASIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUCBhZGRyZXNzGiYhcnVsZXMuaXAgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXAoKQpbCg9zdHJpbmcuaXBfZW1wdHkSL3ZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUCBhZGRyZXNzGhchcnVsZXMuaXAgfHwgdGhpcyAhPSAnJ0gAEtYBCgRpcHY0GA8gASgIQsUBwkjBAQpcCgtzdHJpbmcuaXB2NBIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjQgYWRkcmVzcxopIXJ1bGVzLmlwdjQgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXAoNCkKYQoRc3RyaW5nLmlwdjRfZW1wdHkSMXZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IGFkZHJlc3MaGSFydWxlcy5pcHY0IHx8IHRoaXMgIT0gJydIABLWAQoEaXB2NhgQIAEoCELFAcJIwQEKXAoLc3RyaW5nLmlwdjYSInZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY2IGFkZHJlc3MaKSFydWxlcy5pcHY2IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwKDYpCmEKEXN0cmluZy5pcHY2X2VtcHR5EjF2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NiBhZGRyZXNzGhkhcnVsZXMuaXB2NiB8fCB0aGlzICE9ICcnSAASvwEKA3VyaRgRIAEoCEKvAcJIqwEKUQoKc3RyaW5nLnVyaRIZdmFsdWUgbXVzdCBiZSBhIHZhbGlkIFVSSRooIXJ1bGVzLnVyaSB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNVcmkoKQpWChBzdHJpbmcudXJpX2VtcHR5Eih2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgVVJJGhghcnVsZXMudXJpIHx8IHRoaXMgIT0gJydIABJwCgd1cmlfcmVmGBIgASgIQl3CSFoKWAoOc3RyaW5nLnVyaV9yZWYSI3ZhbHVlIG11c3QgYmUgYSB2YWxpZCBVUkkgUmVmZXJlbmNlGiEhcnVsZXMudXJpX3JlZiB8fCB0aGlzLmlzVXJpUmVmKClIABKQAgoHYWRkcmVzcxgVIAEoCEL8AcJI+AEKgQEKDnN0cmluZy5hZGRyZXNzEi12YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaG9zdG5hbWUsIG9yIGlwIGFkZHJlc3MaQCFydWxlcy5hZGRyZXNzIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0hvc3RuYW1lKCkgfHwgdGhpcy5pc0lwKCkKcgoUc3RyaW5nLmFkZHJlc3NfZW1wdHkSPHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBob3N0bmFtZSwgb3IgaXAgYWRkcmVzcxocIXJ1bGVzLmFkZHJlc3MgfHwgdGhpcyAhPSAnJ0gAEpgCCgR1dWlkGBYgASgIQocCwkiDAgqlAQoLc3RyaW5nLnV1aWQSGnZhbHVlIG11c3QgYmUgYSB2YWxpZCBVVUlEGnohcnVsZXMudXVpZCB8fCB0aGlzID09ICcnIHx8IHRoaXMubWF0Y2hlcygnXlswLTlhLWZBLUZdezh9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezEyfSQnKQpZChFzdHJpbmcudXVpZF9lbXB0eRIpdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIFVVSUQaGSFydWxlcy51dWlkIHx8IHRoaXMgIT0gJydIABLwAQoFdHV1aWQYISABKAhC3gHCSNoBCnMKDHN0cmluZy50dXVpZBIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIHRyaW1tZWQgVVVJRBo/IXJ1bGVzLnR1dWlkIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5tYXRjaGVzKCdeWzAtOWEtZkEtRl17MzJ9JCcpCmMKEnN0cmluZy50dXVpZF9lbXB0eRIxdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIHRyaW1tZWQgVVVJRBoaIXJ1bGVzLnR1dWlkIHx8IHRoaXMgIT0gJydIABKWAgoRaXBfd2l0aF9wcmVmaXhsZW4YGiABKAhC+AHCSPQBCngKGHN0cmluZy5pcF93aXRoX3ByZWZpeGxlbhIfdmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQIHByZWZpeBo7IXJ1bGVzLmlwX3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KCkKeAoec3RyaW5nLmlwX3dpdGhfcHJlZml4bGVuX2VtcHR5Ei52YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVAgcHJlZml4GiYhcnVsZXMuaXBfd2l0aF9wcmVmaXhsZW4gfHwgdGhpcyAhPSAnJ0gAEs8CChNpcHY0X3dpdGhfcHJlZml4bGVuGBsgASgIQq8CwkirAgqTAQoac3RyaW5nLmlwdjRfd2l0aF9wcmVmaXhsZW4SNXZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY0IGFkZHJlc3Mgd2l0aCBwcmVmaXggbGVuZ3RoGj4hcnVsZXMuaXB2NF93aXRoX3ByZWZpeGxlbiB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcFByZWZpeCg0KQqSAQogc3RyaW5nLmlwdjRfd2l0aF9wcmVmaXhsZW5fZW1wdHkSRHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IGFkZHJlc3Mgd2l0aCBwcmVmaXggbGVuZ3RoGighcnVsZXMuaXB2NF93aXRoX3ByZWZpeGxlbiB8fCB0aGlzICE9ICcnSAASzwIKE2lwdjZfd2l0aF9wcmVmaXhsZW4YHCABKAhCrwLCSKsCCpMBChpzdHJpbmcuaXB2Nl93aXRoX3ByZWZpeGxlbhI1dmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgYWRkcmVzcyB3aXRoIHByZWZpeCBsZW5ndGgaPiFydWxlcy5pcHY2X3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KDYpCpIBCiBzdHJpbmcuaXB2Nl93aXRoX3ByZWZpeGxlbl9lbXB0eRJEdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjYgYWRkcmVzcyB3aXRoIHByZWZpeCBsZW5ndGgaKCFydWxlcy5pcHY2X3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgIT0gJydIABLyAQoJaXBfcHJlZml4GB0gASgIQtwBwkjYAQpsChBzdHJpbmcuaXBfcHJlZml4Eh92YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVAgcHJlZml4GjchcnVsZXMuaXBfcHJlZml4IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KHRydWUpCmgKFnN0cmluZy5pcF9wcmVmaXhfZW1wdHkSLnZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUCBwcmVmaXgaHiFydWxlcy5pcF9wcmVmaXggfHwgdGhpcyAhPSAnJ0gAEoMCCgtpcHY0X3ByZWZpeBgeIAEoCELrAcJI5wEKdQoSc3RyaW5nLmlwdjRfcHJlZml4EiF2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVB2NCBwcmVmaXgaPCFydWxlcy5pcHY0X3ByZWZpeCB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcFByZWZpeCg0LCB0cnVlKQpuChhzdHJpbmcuaXB2NF9wcmVmaXhfZW1wdHkSMHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IHByZWZpeBogIXJ1bGVzLmlwdjRfcHJlZml4IHx8IHRoaXMgIT0gJydIABKDAgoLaXB2Nl9wcmVmaXgYHyABKAhC6wHCSOcBCnUKEnN0cmluZy5pcHY2X3ByZWZpeBIhdmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgcHJlZml4GjwhcnVsZXMuaXB2Nl9wcmVmaXggfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXBQcmVmaXgoNiwgdHJ1ZSkKbgoYc3RyaW5nLmlwdjZfcHJlZml4X2VtcHR5EjB2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NiBwcmVmaXgaICFydWxlcy5pcHY2X3ByZWZpeCB8fCB0aGlzICE9ICcnSAAStQIKDWhvc3RfYW5kX3BvcnQYICABKAhCmwLCSJcCCpkBChRzdHJpbmcuaG9zdF9hbmRfcG9ydBJBdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGhvc3QgKGhvc3RuYW1lIG9yIElQIGFkZHJlc3MpIGFuZCBwb3J0IHBhaXIaPiFydWxlcy5ob3N0X2FuZF9wb3J0IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0hvc3RBbmRQb3J0KHRydWUpCnkKGnN0cmluZy5ob3N0X2FuZF9wb3J0X2VtcHR5Ejd2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgaG9zdCBhbmQgcG9ydCBwYWlyGiIhcnVsZXMuaG9zdF9hbmRfcG9ydCB8fCB0aGlzICE9ICcnSAASqAUKEHdlbGxfa25vd25fcmVnZXgYGCABKA4yGC5idWYudmFsaWRhdGUuS25vd25SZWdleELxBMJI7QQK8AEKI3N0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl9uYW1lEiZ2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSFRUUCBoZWFkZXIgbmFtZRqgAXJ1bGVzLndlbGxfa25vd25fcmVnZXggIT0gMSB8fCB0aGlzID09ICcnIHx8IHRoaXMubWF0Y2hlcyghaGFzKHJ1bGVzLnN0cmljdCkgfHwgcnVsZXMuc3RyaWN0ID8nXjo/WzAtOWEtekEtWiEjJCUmXCcqKy0uXl98flx4NjBdKyQnIDonXlteXHUwMDAwXHUwMDBBXHUwMDBEXSskJykKjQEKKXN0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl9uYW1lX2VtcHR5EjV2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSFRUUCBoZWFkZXIgbmFtZRopcnVsZXMud2VsbF9rbm93bl9yZWdleCAhPSAxIHx8IHRoaXMgIT0gJycK5wEKJHN0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl92YWx1ZRIndmFsdWUgbXVzdCBiZSBhIHZhbGlkIEhUVFAgaGVhZGVyIHZhbHVlGpUBcnVsZXMud2VsbF9rbm93bl9yZWdleCAhPSAyIHx8IHRoaXMubWF0Y2hlcyghaGFzKHJ1bGVzLnN0cmljdCkgfHwgcnVsZXMuc3RyaWN0ID8nXlteXHUwMDAwLVx1MDAwOFx1MDAwQS1cdTAwMUZcdTAwN0ZdKiQnIDonXlteXHUwMDAwXHUwMDBBXHUwMDBEXSokJylIABIOCgZzdHJpY3QYGSABKAgSLAoHZXhhbXBsZRgiIAMoCUIbwkgYChYKDnN0cmluZy5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCDAoKd2VsbF9rbm93biLqEAoKQnl0ZXNSdWxlcxKAAQoFY29uc3QYASABKAxCccJIbgpsCgtieXRlcy5jb25zdBpddGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBiZSAleCcuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEngKA2xlbhgNIAEoBEJrwkhoCmYKCWJ5dGVzLmxlbhpZdWludCh0aGlzLnNpemUoKSkgIT0gcnVsZXMubGVuID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlICVzIGJ5dGVzJy5mb3JtYXQoW3J1bGVzLmxlbl0pIDogJycSkAEKB21pbl9sZW4YAiABKARCf8JIfAp6Cg1ieXRlcy5taW5fbGVuGml1aW50KHRoaXMuc2l6ZSgpKSA8IHJ1bGVzLm1pbl9sZW4gPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgYXQgbGVhc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWluX2xlbl0pIDogJycSiAEKB21heF9sZW4YAyABKARCd8JIdApyCg1ieXRlcy5tYXhfbGVuGmF1aW50KHRoaXMuc2l6ZSgpKSA+IHJ1bGVzLm1heF9sZW4gPyAndmFsdWUgbXVzdCBiZSBhdCBtb3N0ICVzIGJ5dGVzJy5mb3JtYXQoW3J1bGVzLm1heF9sZW5dKSA6ICcnEpABCgdwYXR0ZXJuGAQgASgJQn/CSHwKegoNYnl0ZXMucGF0dGVybhppIXN0cmluZyh0aGlzKS5tYXRjaGVzKHJ1bGVzLnBhdHRlcm4pID8gJ3ZhbHVlIG11c3QgbWF0Y2ggcmVnZXggcGF0dGVybiBgJXNgJy5mb3JtYXQoW3J1bGVzLnBhdHRlcm5dKSA6ICcnEoEBCgZwcmVmaXgYBSABKAxCccJIbgpsCgxieXRlcy5wcmVmaXgaXCF0aGlzLnN0YXJ0c1dpdGgocnVsZXMucHJlZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHByZWZpeCAleCcuZm9ybWF0KFtydWxlcy5wcmVmaXhdKSA6ICcnEn8KBnN1ZmZpeBgGIAEoDEJvwkhsCmoKDGJ5dGVzLnN1ZmZpeBpaIXRoaXMuZW5kc1dpdGgocnVsZXMuc3VmZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHN1ZmZpeCAleCcuZm9ybWF0KFtydWxlcy5zdWZmaXhdKSA6ICcnEoMBCghjb250YWlucxgHIAEoDEJxwkhuCmwKDmJ5dGVzLmNvbnRhaW5zGlohdGhpcy5jb250YWlucyhydWxlcy5jb250YWlucykgPyAndmFsdWUgZG9lcyBub3QgY29udGFpbiAleCcuZm9ybWF0KFtydWxlcy5jb250YWluc10pIDogJycSpwEKAmluGAggAygMQpoBwkiWAQqTAQoIYnl0ZXMuaW4ahgFnZXRGaWVsZChydWxlcywgJ2luJykuc2l6ZSgpID4gMCAmJiAhKHRoaXMgaW4gZ2V0RmllbGQocnVsZXMsICdpbicpKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdpbicpXSkgOiAnJxJ2CgZub3RfaW4YCSADKAxCZsJIYwphCgxieXRlcy5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxLrAQoCaXAYCiABKAhC3AHCSNgBCnQKCGJ5dGVzLmlwEiB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVAgYWRkcmVzcxpGIXJ1bGVzLmlwIHx8IHRoaXMuc2l6ZSgpID09IDAgfHwgdGhpcy5zaXplKCkgPT0gNCB8fCB0aGlzLnNpemUoKSA9PSAxNgpgCg5ieXRlcy5pcF9lbXB0eRIvdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQIGFkZHJlc3MaHSFydWxlcy5pcCB8fCB0aGlzLnNpemUoKSAhPSAwSAAS5AEKBGlwdjQYCyABKAhC0wHCSM8BCmUKCmJ5dGVzLmlwdjQSInZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY0IGFkZHJlc3MaMyFydWxlcy5pcHY0IHx8IHRoaXMuc2l6ZSgpID09IDAgfHwgdGhpcy5zaXplKCkgPT0gNApmChBieXRlcy5pcHY0X2VtcHR5EjF2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NCBhZGRyZXNzGh8hcnVsZXMuaXB2NCB8fCB0aGlzLnNpemUoKSAhPSAwSAAS5QEKBGlwdjYYDCABKAhC1AHCSNABCmYKCmJ5dGVzLmlwdjYSInZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY2IGFkZHJlc3MaNCFydWxlcy5pcHY2IHx8IHRoaXMuc2l6ZSgpID09IDAgfHwgdGhpcy5zaXplKCkgPT0gMTYKZgoQYnl0ZXMuaXB2Nl9lbXB0eRIxdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjYgYWRkcmVzcxofIXJ1bGVzLmlwdjYgfHwgdGhpcy5zaXplKCkgIT0gMEgAEisKB2V4YW1wbGUYDiADKAxCGsJIFwoVCg1ieXRlcy5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCDAoKd2VsbF9rbm93biLUAwoJRW51bVJ1bGVzEoIBCgVjb25zdBgBIAEoBUJzwkhwCm4KCmVudW0uY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxIUCgxkZWZpbmVkX29ubHkYAiABKAgSfgoCaW4YAyADKAVCcsJIbwptCgdlbnVtLmluGmIhKHRoaXMgaW4gZ2V0RmllbGQocnVsZXMsICdpbicpKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdpbicpXSkgOiAnJxJ1CgZub3RfaW4YBCADKAVCZcJIYgpgCgtlbnVtLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEioKB2V4YW1wbGUYBSADKAVCGcJIFgoUCgxlbnVtLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAiL7AwoNUmVwZWF0ZWRSdWxlcxKeAQoJbWluX2l0ZW1zGAEgASgEQooBwkiGAQqDAQoScmVwZWF0ZWQubWluX2l0ZW1zGm11aW50KHRoaXMuc2l6ZSgpKSA8IHJ1bGVzLm1pbl9pdGVtcyA/ICd2YWx1ZSBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgJWQgaXRlbShzKScuZm9ybWF0KFtydWxlcy5taW5faXRlbXNdKSA6ICcnEqIBCgltYXhfaXRlbXMYAiABKARCjgHCSIoBCocBChJyZXBlYXRlZC5tYXhfaXRlbXMacXVpbnQodGhpcy5zaXplKCkpID4gcnVsZXMubWF4X2l0ZW1zID8gJ3ZhbHVlIG11c3QgY29udGFpbiBubyBtb3JlIHRoYW4gJXMgaXRlbShzKScuZm9ybWF0KFtydWxlcy5tYXhfaXRlbXNdKSA6ICcnEnAKBnVuaXF1ZRgDIAEoCEJgwkhdClsKD3JlcGVhdGVkLnVuaXF1ZRIocmVwZWF0ZWQgdmFsdWUgbXVzdCBjb250YWluIHVuaXF1ZSBpdGVtcxoeIXJ1bGVzLnVuaXF1ZSB8fCB0aGlzLnVuaXF1ZSgpEicKBWl0ZW1zGAQgASgLMhguYnVmLnZhbGlkYXRlLkZpZWxkUnVsZXMqCQjoBxCAgICAAiKKAwoITWFwUnVsZXMSjwEKCW1pbl9wYWlycxgBIAEoBEJ8wkh5CncKDW1hcC5taW5fcGFpcnMaZnVpbnQodGhpcy5zaXplKCkpIDwgcnVsZXMubWluX3BhaXJzID8gJ21hcCBtdXN0IGJlIGF0IGxlYXN0ICVkIGVudHJpZXMnLmZvcm1hdChbcnVsZXMubWluX3BhaXJzXSkgOiAnJxKOAQoJbWF4X3BhaXJzGAIgASgEQnvCSHgKdgoNbWFwLm1heF9wYWlycxpldWludCh0aGlzLnNpemUoKSkgPiBydWxlcy5tYXhfcGFpcnMgPyAnbWFwIG11c3QgYmUgYXQgbW9zdCAlZCBlbnRyaWVzJy5mb3JtYXQoW3J1bGVzLm1heF9wYWlyc10pIDogJycSJgoEa2V5cxgEIAEoCzIYLmJ1Zi52YWxpZGF0ZS5GaWVsZFJ1bGVzEigKBnZhbHVlcxgFIAEoCzIYLmJ1Zi52YWxpZGF0ZS5GaWVsZFJ1bGVzKgkI6AcQgICAgAIiJgoIQW55UnVsZXMSCgoCaW4YAiADKAkSDgoGbm90X2luGAMgAygJIpkXCg1EdXJhdGlvblJ1bGVzEqEBCgVjb25zdBgCIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkJ3wkh0CnIKDmR1cmF0aW9uLmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSqAEKAmx0GAMgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQn/CSHwKegoLZHVyYXRpb24ubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASugEKA2x0ZRgEIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkKPAcJIiwEKiAEKDGR1cmF0aW9uLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASwQcKAmd0GAUgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQpcHwkiTBwp9CgtkdXJhdGlvbi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtgEKDmR1cmF0aW9uLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq+AQoYZHVyYXRpb24uZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxgEKD2R1cmF0aW9uLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzgEKGWR1cmF0aW9uLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEo0ICgNndGUYBiABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25C4gfCSN4HCosBCgxkdXJhdGlvbi5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrFAQoPZHVyYXRpb24uZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCs0BChlkdXJhdGlvbi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrVAQoQZHVyYXRpb24uZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrdAQoaZHVyYXRpb24uZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESnQEKAmluGAcgAygLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQnbCSHMKcQoLZHVyYXRpb24uaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEpQBCgZub3RfaW4YCCADKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CacJIZgpkCg9kdXJhdGlvbi5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxJJCgdleGFtcGxlGAkgAygLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQh3CSBoKGAoQZHVyYXRpb24uZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4ikhgKDlRpbWVzdGFtcFJ1bGVzEqMBCgVjb25zdBgCIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBCeMJIdQpzCg90aW1lc3RhbXAuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKrAQoCbHQYAyABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQoABwkh9CnsKDHRpbWVzdGFtcC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABK8AQoDbHRlGAQgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcEKQAcJIjAEKiQEKDXRpbWVzdGFtcC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEmwKBmx0X25vdxgHIAEoCEJawkhXClUKEHRpbWVzdGFtcC5sdF9ub3caQShydWxlcy5sdF9ub3cgJiYgdGhpcyA+IG5vdykgPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gbm93JyA6ICcnSAASxwcKAmd0GAUgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcEKcB8JImAcKfgoMdGltZXN0YW1wLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq3AQoPdGltZXN0YW1wLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq/AQoZdGltZXN0YW1wLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCscBChB0aW1lc3RhbXAuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrPAQoadGltZXN0YW1wLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEpMICgNndGUYBiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQucHwkjjBwqMAQoNdGltZXN0YW1wLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsYBChB0aW1lc3RhbXAuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCs4BChp0aW1lc3RhbXAuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK1gEKEXRpbWVzdGFtcC5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCt4BCht0aW1lc3RhbXAuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESbwoGZ3Rfbm93GAggASgIQl3CSFoKWAoQdGltZXN0YW1wLmd0X25vdxpEKHJ1bGVzLmd0X25vdyAmJiB0aGlzIDwgbm93KSA/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBub3cnIDogJydIARK4AQoGd2l0aGluGAkgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQowBwkiIAQqFAQoQdGltZXN0YW1wLndpdGhpbhpxdGhpcyA8IG5vdy1ydWxlcy53aXRoaW4gfHwgdGhpcyA+IG5vdytydWxlcy53aXRoaW4gPyAndmFsdWUgbXVzdCBiZSB3aXRoaW4gJXMgb2Ygbm93Jy5mb3JtYXQoW3J1bGVzLndpdGhpbl0pIDogJycSSwoHZXhhbXBsZRgKIAMoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBCHsJIGwoZChF0aW1lc3RhbXAuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4iOQoKVmlvbGF0aW9ucxIrCgp2aW9sYXRpb25zGAEgAygLMhcuYnVmLnZhbGlkYXRlLlZpb2xhdGlvbiKfAQoJVmlvbGF0aW9uEiYKBWZpZWxkGAUgASgLMhcuYnVmLnZhbGlkYXRlLkZpZWxkUGF0aBIlCgRydWxlGAYgASgLMhcuYnVmLnZhbGlkYXRlLkZpZWxkUGF0aBIPCgdydWxlX2lkGAIgASgJEg8KB21lc3NhZ2UYAyABKAkSDwoHZm9yX2tleRgEIAEoCEoECAEQAlIKZmllbGRfcGF0aCI9CglGaWVsZFBhdGgSMAoIZWxlbWVudHMYASADKAsyHi5idWYudmFsaWRhdGUuRmllbGRQYXRoRWxlbWVudCLpAgoQRmllbGRQYXRoRWxlbWVudBIUCgxmaWVsZF9udW1iZXIYASABKAUSEgoKZmllbGRfbmFtZRgCIAEoCRI+CgpmaWVsZF90eXBlGAMgASgOMiouZ29vZ2xlLnByb3RvYnVmLkZpZWxkRGVzY3JpcHRvclByb3RvLlR5cGUSPAoIa2V5X3R5cGUYBCABKA4yKi5nb29nbGUucHJvdG9idWYuRmllbGREZXNjcmlwdG9yUHJvdG8uVHlwZRI+Cgp2YWx1ZV90eXBlGAUgASgOMiouZ29vZ2xlLnByb3RvYnVmLkZpZWxkRGVzY3JpcHRvclByb3RvLlR5cGUSDwoFaW5kZXgYBiABKARIABISCghib29sX2tleRgHIAEoCEgAEhEKB2ludF9rZXkYCCABKANIABISCgh1aW50X2tleRgJIAEoBEgAEhQKCnN0cmluZ19rZXkYCiABKAlIAEILCglzdWJzY3JpcHQqhwEKBklnbm9yZRIWChJJR05PUkVfVU5TUEVDSUZJRUQQABIZChVJR05PUkVfSUZfVU5QT1BVTEFURUQQARIbChdJR05PUkVfSUZfREVGQVVMVF9WQUxVRRACEhEKDUlHTk9SRV9BTFdBWVMQAyoaSUdOT1JFX0VNUFRZSUdOT1JFX0RFRkFVTFQqbgoKS25vd25SZWdleBIbChdLTk9XTl9SRUdFWF9VTlNQRUNJRklFRBAAEiAKHEtOT1dOX1JFR0VYX0hUVFBfSEVBREVSX05BTUUQARIhCh1LTk9XTl9SRUdFWF9IVFRQX0hFQURFUl9WQUxVRRACOlYKB21lc3NhZ2USHy5nb29nbGUucHJvdG9idWYuTWVzc2FnZU9wdGlvbnMYhwkgASgLMhouYnVmLnZhbGlkYXRlLk1lc3NhZ2VSdWxlc1IHbWVzc2FnZTpOCgVvbmVvZhIdLmdvb2dsZS5wcm90b2J1Zi5PbmVvZk9wdGlvbnMYhwkgASgLMhguYnVmLnZhbGlkYXRlLk9uZW9mUnVsZXNSBW9uZW9mOk4KBWZpZWxkEh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxiHCSABKAsyGC5idWYudmFsaWRhdGUuRmllbGRSdWxlc1IFZmllbGQ6XQoKcHJlZGVmaW5lZBIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMYiAkgASgLMh0uYnVmLnZhbGlkYXRlLlByZWRlZmluZWRSdWxlc1IKcHJlZGVmaW5lZEJuChJidWlsZC5idWYudmFsaWRhdGVCDVZhbGlkYXRlUHJvdG9QAVpHYnVmLmJ1aWxkL2dlbi9nby9idWZidWlsZC9wcm90b3ZhbGlkYXRlL3Byb3RvY29sYnVmZmVycy9nby9idWYvdmFsaWRhdGU", [file_google_protobuf_descriptor, file_google_protobuf_duration, file_google_protobuf_timestamp]);

// node_modules/@buf/googleapis_googleapis.bufbuild_es/google/api/http_pb.js
var file_google_api_http = /* @__PURE__ */ fileDesc("ChVnb29nbGUvYXBpL2h0dHAucHJvdG8SCmdvb2dsZS5hcGkiVAoESHR0cBIjCgVydWxlcxgBIAMoCzIULmdvb2dsZS5hcGkuSHR0cFJ1bGUSJwofZnVsbHlfZGVjb2RlX3Jlc2VydmVkX2V4cGFuc2lvbhgCIAEoCCKBAgoISHR0cFJ1bGUSEAoIc2VsZWN0b3IYASABKAkSDQoDZ2V0GAIgASgJSAASDQoDcHV0GAMgASgJSAASDgoEcG9zdBgEIAEoCUgAEhAKBmRlbGV0ZRgFIAEoCUgAEg8KBXBhdGNoGAYgASgJSAASLwoGY3VzdG9tGAggASgLMh0uZ29vZ2xlLmFwaS5DdXN0b21IdHRwUGF0dGVybkgAEgwKBGJvZHkYByABKAkSFQoNcmVzcG9uc2VfYm9keRgMIAEoCRIxChNhZGRpdGlvbmFsX2JpbmRpbmdzGAsgAygLMhQuZ29vZ2xlLmFwaS5IdHRwUnVsZUIJCgdwYXR0ZXJuIi8KEUN1c3RvbUh0dHBQYXR0ZXJuEgwKBGtpbmQYASABKAkSDAoEcGF0aBgCIAEoCUJnCg5jb20uZ29vZ2xlLmFwaUIJSHR0cFByb3RvUAFaQWdvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvYXBpL2Fubm90YXRpb25zO2Fubm90YXRpb25zogIER0FQSWIGcHJvdG8z");

// node_modules/@buf/googleapis_googleapis.bufbuild_es/google/api/annotations_pb.js
var file_google_api_annotations = /* @__PURE__ */ fileDesc("Chxnb29nbGUvYXBpL2Fubm90YXRpb25zLnByb3RvEgpnb29nbGUuYXBpOksKBGh0dHASHi5nb29nbGUucHJvdG9idWYuTWV0aG9kT3B0aW9ucxiwyrwiIAEoCzIULmdvb2dsZS5hcGkuSHR0cFJ1bGVSBGh0dHBCbgoOY29tLmdvb2dsZS5hcGlCEEFubm90YXRpb25zUHJvdG9QAVpBZ29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy9hcGkvYW5ub3RhdGlvbnM7YW5ub3RhdGlvbnOiAgRHQVBJYgZwcm90bzM", [file_google_api_http, file_google_protobuf_descriptor]);

// node_modules/@buf/googleapis_googleapis.bufbuild_es/google/api/field_behavior_pb.js
var file_google_api_field_behavior = /* @__PURE__ */ fileDesc("Ch9nb29nbGUvYXBpL2ZpZWxkX2JlaGF2aW9yLnByb3RvEgpnb29nbGUuYXBpKrYBCg1GaWVsZEJlaGF2aW9yEh4KGkZJRUxEX0JFSEFWSU9SX1VOU1BFQ0lGSUVEEAASDAoIT1BUSU9OQUwQARIMCghSRVFVSVJFRBACEg8KC09VVFBVVF9PTkxZEAMSDgoKSU5QVVRfT05MWRAEEg0KCUlNTVVUQUJMRRAFEhIKDlVOT1JERVJFRF9MSVNUEAYSFQoRTk9OX0VNUFRZX0RFRkFVTFQQBxIOCgpJREVOVElGSUVSEAg6ZAoOZmllbGRfYmVoYXZpb3ISHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGJwIIAMoDjIZLmdvb2dsZS5hcGkuRmllbGRCZWhhdmlvckICEABSDWZpZWxkQmVoYXZpb3JCcAoOY29tLmdvb2dsZS5hcGlCEkZpZWxkQmVoYXZpb3JQcm90b1ABWkFnb29nbGUuZ29sYW5nLm9yZy9nZW5wcm90by9nb29nbGVhcGlzL2FwaS9hbm5vdGF0aW9uczthbm5vdGF0aW9uc6ICBEdBUEliBnByb3RvMw", [file_google_protobuf_descriptor]);

// node_modules/@buf/googleapis_googleapis.bufbuild_es/google/rpc/status_pb.js
var file_google_rpc_status = /* @__PURE__ */ fileDesc("Chdnb29nbGUvcnBjL3N0YXR1cy5wcm90bxIKZ29vZ2xlLnJwYyJOCgZTdGF0dXMSDAoEY29kZRgBIAEoBRIPCgdtZXNzYWdlGAIgASgJEiUKB2RldGFpbHMYAyADKAsyFC5nb29nbGUucHJvdG9idWYuQW55QmEKDmNvbS5nb29nbGUucnBjQgtTdGF0dXNQcm90b1ABWjdnb29nbGUuZ29sYW5nLm9yZy9nZW5wcm90by9nb29nbGVhcGlzL3JwYy9zdGF0dXM7c3RhdHVz+AEBogIDUlBDYgZwcm90bzM", [file_google_protobuf_any]);

// node_modules/@buf/redpandadata_dataplane.bufbuild_es/node_modules/@buf/grpc-ecosystem_grpc-gateway.bufbuild_es/protoc-gen-openapiv2/options/openapiv2_pb.js
var file_protoc_gen_openapiv2_options_openapiv2 = /* @__PURE__ */ fileDesc("Cixwcm90b2MtZ2VuLW9wZW5hcGl2Mi9vcHRpb25zL29wZW5hcGl2Mi5wcm90bxIpZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMilQcKB1N3YWdnZXISDwoHc3dhZ2dlchgBIAEoCRI9CgRpbmZvGAIgASgLMi8uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSW5mbxIMCgRob3N0GAMgASgJEhEKCWJhc2VfcGF0aBgEIAEoCRJCCgdzY2hlbWVzGAUgAygOMjEuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2NoZW1lEhAKCGNvbnN1bWVzGAYgAygJEhAKCHByb2R1Y2VzGAcgAygJElQKCXJlc3BvbnNlcxgKIAMoCzJBLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlN3YWdnZXIuUmVzcG9uc2VzRW50cnkSXAoUc2VjdXJpdHlfZGVmaW5pdGlvbnMYCyABKAsyPi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5TZWN1cml0eURlZmluaXRpb25zElAKCHNlY3VyaXR5GAwgAygLMj4uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlSZXF1aXJlbWVudBI8CgR0YWdzGA0gAygLMi4uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuVGFnElcKDWV4dGVybmFsX2RvY3MYDiABKAsyQC5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5FeHRlcm5hbERvY3VtZW50YXRpb24SVgoKZXh0ZW5zaW9ucxgPIAMoCzJCLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlN3YWdnZXIuRXh0ZW5zaW9uc0VudHJ5GmUKDlJlc3BvbnNlc0VudHJ5EgsKA2tleRgBIAEoCRJCCgV2YWx1ZRgCIAEoCzIzLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlJlc3BvbnNlOgI4ARpJCg9FeHRlbnNpb25zRW50cnkSCwoDa2V5GAEgASgJEiUKBXZhbHVlGAIgASgLMhYuZ29vZ2xlLnByb3RvYnVmLlZhbHVlOgI4AUoECAgQCUoECAkQCiKxBgoJT3BlcmF0aW9uEgwKBHRhZ3MYASADKAkSDwoHc3VtbWFyeRgCIAEoCRITCgtkZXNjcmlwdGlvbhgDIAEoCRJXCg1leHRlcm5hbF9kb2NzGAQgASgLMkAuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuRXh0ZXJuYWxEb2N1bWVudGF0aW9uEhQKDG9wZXJhdGlvbl9pZBgFIAEoCRIQCghjb25zdW1lcxgGIAMoCRIQCghwcm9kdWNlcxgHIAMoCRJWCglyZXNwb25zZXMYCSADKAsyQy5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5PcGVyYXRpb24uUmVzcG9uc2VzRW50cnkSQgoHc2NoZW1lcxgKIAMoDjIxLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNjaGVtZRISCgpkZXByZWNhdGVkGAsgASgIElAKCHNlY3VyaXR5GAwgAygLMj4uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlSZXF1aXJlbWVudBJYCgpleHRlbnNpb25zGA0gAygLMkQuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuT3BlcmF0aW9uLkV4dGVuc2lvbnNFbnRyeRJJCgpwYXJhbWV0ZXJzGA4gASgLMjUuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuUGFyYW1ldGVycxplCg5SZXNwb25zZXNFbnRyeRILCgNrZXkYASABKAkSQgoFdmFsdWUYAiABKAsyMy5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5SZXNwb25zZToCOAEaSQoPRXh0ZW5zaW9uc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAFKBAgIEAkiWQoKUGFyYW1ldGVycxJLCgdoZWFkZXJzGAEgAygLMjouZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSGVhZGVyUGFyYW1ldGVyIvgBCg9IZWFkZXJQYXJhbWV0ZXISDAoEbmFtZRgBIAEoCRITCgtkZXNjcmlwdGlvbhgCIAEoCRJNCgR0eXBlGAMgASgOMj8uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSGVhZGVyUGFyYW1ldGVyLlR5cGUSDgoGZm9ybWF0GAQgASgJEhAKCHJlcXVpcmVkGAUgASgIIkUKBFR5cGUSCwoHVU5LTk9XThAAEgoKBlNUUklORxABEgoKBk5VTUJFUhACEgsKB0lOVEVHRVIQAxILCgdCT09MRUFOEARKBAgGEAdKBAgHEAgiqwEKBkhlYWRlchITCgtkZXNjcmlwdGlvbhgBIAEoCRIMCgR0eXBlGAIgASgJEg4KBmZvcm1hdBgDIAEoCRIPCgdkZWZhdWx0GAYgASgJEg8KB3BhdHRlcm4YDSABKAlKBAgEEAVKBAgFEAZKBAgHEAhKBAgIEAlKBAgJEApKBAgKEAtKBAgLEAxKBAgMEA1KBAgOEA9KBAgPEBBKBAgQEBFKBAgREBJKBAgSEBMiwgQKCFJlc3BvbnNlEhMKC2Rlc2NyaXB0aW9uGAEgASgJEkEKBnNjaGVtYRgCIAEoCzIxLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNjaGVtYRJRCgdoZWFkZXJzGAMgAygLMkAuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuUmVzcG9uc2UuSGVhZGVyc0VudHJ5ElMKCGV4YW1wbGVzGAQgAygLMkEuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuUmVzcG9uc2UuRXhhbXBsZXNFbnRyeRJXCgpleHRlbnNpb25zGAUgAygLMkMuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuUmVzcG9uc2UuRXh0ZW5zaW9uc0VudHJ5GmEKDEhlYWRlcnNFbnRyeRILCgNrZXkYASABKAkSQAoFdmFsdWUYAiABKAsyMS5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5IZWFkZXI6AjgBGi8KDUV4YW1wbGVzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARpJCg9FeHRlbnNpb25zRW50cnkSCwoDa2V5GAEgASgJEiUKBXZhbHVlGAIgASgLMhYuZ29vZ2xlLnByb3RvYnVmLlZhbHVlOgI4ASL/AgoESW5mbxINCgV0aXRsZRgBIAEoCRITCgtkZXNjcmlwdGlvbhgCIAEoCRIYChB0ZXJtc19vZl9zZXJ2aWNlGAMgASgJEkMKB2NvbnRhY3QYBCABKAsyMi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5Db250YWN0EkMKB2xpY2Vuc2UYBSABKAsyMi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5MaWNlbnNlEg8KB3ZlcnNpb24YBiABKAkSUwoKZXh0ZW5zaW9ucxgHIAMoCzI/LmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLkluZm8uRXh0ZW5zaW9uc0VudHJ5GkkKD0V4dGVuc2lvbnNFbnRyeRILCgNrZXkYASABKAkSJQoFdmFsdWUYAiABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWU6AjgBIjMKB0NvbnRhY3QSDAoEbmFtZRgBIAEoCRILCgN1cmwYAiABKAkSDQoFZW1haWwYAyABKAkiJAoHTGljZW5zZRIMCgRuYW1lGAEgASgJEgsKA3VybBgCIAEoCSI5ChVFeHRlcm5hbERvY3VtZW50YXRpb24SEwoLZGVzY3JpcHRpb24YASABKAkSCwoDdXJsGAIgASgJIu4BCgZTY2hlbWESSgoLanNvbl9zY2hlbWEYASABKAsyNS5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5KU09OU2NoZW1hEhUKDWRpc2NyaW1pbmF0b3IYAiABKAkSEQoJcmVhZF9vbmx5GAMgASgIElcKDWV4dGVybmFsX2RvY3MYBSABKAsyQC5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5FeHRlcm5hbERvY3VtZW50YXRpb24SDwoHZXhhbXBsZRgGIAEoCUoECAQQBSKiCAoKSlNPTlNjaGVtYRILCgNyZWYYAyABKAkSDQoFdGl0bGUYBSABKAkSEwoLZGVzY3JpcHRpb24YBiABKAkSDwoHZGVmYXVsdBgHIAEoCRIRCglyZWFkX29ubHkYCCABKAgSDwoHZXhhbXBsZRgJIAEoCRITCgttdWx0aXBsZV9vZhgKIAEoARIPCgdtYXhpbXVtGAsgASgBEhkKEWV4Y2x1c2l2ZV9tYXhpbXVtGAwgASgIEg8KB21pbmltdW0YDSABKAESGQoRZXhjbHVzaXZlX21pbmltdW0YDiABKAgSEgoKbWF4X2xlbmd0aBgPIAEoBBISCgptaW5fbGVuZ3RoGBAgASgEEg8KB3BhdHRlcm4YESABKAkSEQoJbWF4X2l0ZW1zGBQgASgEEhEKCW1pbl9pdGVtcxgVIAEoBBIUCgx1bmlxdWVfaXRlbXMYFiABKAgSFgoObWF4X3Byb3BlcnRpZXMYGCABKAQSFgoObWluX3Byb3BlcnRpZXMYGSABKAQSEAoIcmVxdWlyZWQYGiADKAkSDQoFYXJyYXkYIiADKAkSWQoEdHlwZRgjIAMoDjJLLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLkpTT05TY2hlbWEuSlNPTlNjaGVtYVNpbXBsZVR5cGVzEg4KBmZvcm1hdBgkIAEoCRIMCgRlbnVtGC4gAygJEmYKE2ZpZWxkX2NvbmZpZ3VyYXRpb24Y6QcgASgLMkguZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSlNPTlNjaGVtYS5GaWVsZENvbmZpZ3VyYXRpb24SWQoKZXh0ZW5zaW9ucxgwIAMoCzJFLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLkpTT05TY2hlbWEuRXh0ZW5zaW9uc0VudHJ5Gi0KEkZpZWxkQ29uZmlndXJhdGlvbhIXCg9wYXRoX3BhcmFtX25hbWUYLyABKAkaSQoPRXh0ZW5zaW9uc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEidwoVSlNPTlNjaGVtYVNpbXBsZVR5cGVzEgsKB1VOS05PV04QABIJCgVBUlJBWRABEgsKB0JPT0xFQU4QAhILCgdJTlRFR0VSEAMSCAoETlVMTBAEEgoKBk5VTUJFUhAFEgoKBk9CSkVDVBAGEgoKBlNUUklORxAHSgQIARACSgQIAhADSgQIBBAFSgQIEhATSgQIExAUSgQIFxAYSgQIGxAcSgQIHBAdSgQIHRAeSgQIHhAiSgQIJRAqSgQIKhArSgQIKxAuIqACCgNUYWcSDAoEbmFtZRgBIAEoCRITCgtkZXNjcmlwdGlvbhgCIAEoCRJXCg1leHRlcm5hbF9kb2NzGAMgASgLMkAuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuRXh0ZXJuYWxEb2N1bWVudGF0aW9uElIKCmV4dGVuc2lvbnMYBCADKAsyPi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5UYWcuRXh0ZW5zaW9uc0VudHJ5GkkKD0V4dGVuc2lvbnNFbnRyeRILCgNrZXkYASABKAkSJQoFdmFsdWUYAiABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWU6AjgBIuEBChNTZWN1cml0eURlZmluaXRpb25zEl4KCHNlY3VyaXR5GAEgAygLMkwuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlEZWZpbml0aW9ucy5TZWN1cml0eUVudHJ5GmoKDVNlY3VyaXR5RW50cnkSCwoDa2V5GAEgASgJEkgKBXZhbHVlGAIgASgLMjkuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlTY2hlbWU6AjgBIqAGCg5TZWN1cml0eVNjaGVtZRJMCgR0eXBlGAEgASgOMj4uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlTY2hlbWUuVHlwZRITCgtkZXNjcmlwdGlvbhgCIAEoCRIMCgRuYW1lGAMgASgJEkgKAmluGAQgASgOMjwuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlTY2hlbWUuSW4STAoEZmxvdxgFIAEoDjI+LmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNlY3VyaXR5U2NoZW1lLkZsb3cSGQoRYXV0aG9yaXphdGlvbl91cmwYBiABKAkSEQoJdG9rZW5fdXJsGAcgASgJEkEKBnNjb3BlcxgIIAEoCzIxLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNjb3BlcxJdCgpleHRlbnNpb25zGAkgAygLMkkuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlTY2hlbWUuRXh0ZW5zaW9uc0VudHJ5GkkKD0V4dGVuc2lvbnNFbnRyeRILCgNrZXkYASABKAkSJQoFdmFsdWUYAiABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWU6AjgBIksKBFR5cGUSEAoMVFlQRV9JTlZBTElEEAASDgoKVFlQRV9CQVNJQxABEhAKDFRZUEVfQVBJX0tFWRACEg8KC1RZUEVfT0FVVEgyEAMiMQoCSW4SDgoKSU5fSU5WQUxJRBAAEgwKCElOX1FVRVJZEAESDQoJSU5fSEVBREVSEAIiagoERmxvdxIQCgxGTE9XX0lOVkFMSUQQABIRCg1GTE9XX0lNUExJQ0lUEAESEQoNRkxPV19QQVNTV09SRBACEhQKEEZMT1dfQVBQTElDQVRJT04QAxIUChBGTE9XX0FDQ0VTU19DT0RFEAQizQIKE1NlY3VyaXR5UmVxdWlyZW1lbnQSdQoUc2VjdXJpdHlfcmVxdWlyZW1lbnQYASADKAsyVy5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5TZWN1cml0eVJlcXVpcmVtZW50LlNlY3VyaXR5UmVxdWlyZW1lbnRFbnRyeRopChhTZWN1cml0eVJlcXVpcmVtZW50VmFsdWUSDQoFc2NvcGUYASADKAkakwEKGFNlY3VyaXR5UmVxdWlyZW1lbnRFbnRyeRILCgNrZXkYASABKAkSZgoFdmFsdWUYAiABKAsyVy5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5TZWN1cml0eVJlcXVpcmVtZW50LlNlY3VyaXR5UmVxdWlyZW1lbnRWYWx1ZToCOAEigwEKBlNjb3BlcxJLCgVzY29wZRgBIAMoCzI8LmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNjb3Blcy5TY29wZUVudHJ5GiwKClNjb3BlRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ASo7CgZTY2hlbWUSCwoHVU5LTk9XThAAEggKBEhUVFAQARIJCgVIVFRQUxACEgYKAldTEAMSBwoDV1NTEARCSFpGZ2l0aHViLmNvbS9ncnBjLWVjb3N5c3RlbS9ncnBjLWdhdGV3YXkvdjIvcHJvdG9jLWdlbi1vcGVuYXBpdjIvb3B0aW9uc2IGcHJvdG8z", [file_google_protobuf_struct]);

// node_modules/@buf/redpandadata_dataplane.bufbuild_es/node_modules/@buf/grpc-ecosystem_grpc-gateway.bufbuild_es/protoc-gen-openapiv2/options/annotations_pb.js
var file_protoc_gen_openapiv2_options_annotations = /* @__PURE__ */ fileDesc("Ci5wcm90b2MtZ2VuLW9wZW5hcGl2Mi9vcHRpb25zL2Fubm90YXRpb25zLnByb3RvEilncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9uczp+ChFvcGVuYXBpdjJfc3dhZ2dlchIcLmdvb2dsZS5wcm90b2J1Zi5GaWxlT3B0aW9ucxiSCCABKAsyMi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5Td2FnZ2VyUhBvcGVuYXBpdjJTd2FnZ2VyOoYBChNvcGVuYXBpdjJfb3BlcmF0aW9uEh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMYkgggASgLMjQuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuT3BlcmF0aW9uUhJvcGVuYXBpdjJPcGVyYXRpb246fgoQb3BlbmFwaXYyX3NjaGVtYRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxiSCCABKAsyMS5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5TY2hlbWFSD29wZW5hcGl2MlNjaGVtYTp1Cg1vcGVuYXBpdjJfdGFnEh8uZ29vZ2xlLnByb3RvYnVmLlNlcnZpY2VPcHRpb25zGJIIIAEoCzIuLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlRhZ1IMb3BlbmFwaXYyVGFnOn4KD29wZW5hcGl2Ml9maWVsZBIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMYkgggASgLMjUuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSlNPTlNjaGVtYVIOb3BlbmFwaXYyRmllbGRCSFpGZ2l0aHViLmNvbS9ncnBjLWVjb3N5c3RlbS9ncnBjLWdhdGV3YXkvdjIvcHJvdG9jLWdlbi1vcGVuYXBpdjIvb3B0aW9uc2IGcHJvdG8z", [file_google_protobuf_descriptor, file_protoc_gen_openapiv2_options_openapiv2]);

// node_modules/@buf/redpandadata_dataplane.bufbuild_es/redpanda/api/auth/v1/authorization_pb.js
var file_redpanda_api_auth_v1_authorization = /* @__PURE__ */ fileDesc("CihyZWRwYW5kYS9hcGkvYXV0aC92MS9hdXRob3JpemF0aW9uLnByb3RvEhRyZWRwYW5kYS5hcGkuYXV0aC52MSKCAQoZQXV0aG9yaXphdGlvblJlcXVpcmVtZW50cxI9ChNyZXF1aXJlZF9wZXJtaXNzaW9uGAEgASgOMiAucmVkcGFuZGEuYXBpLmF1dGgudjEuUGVybWlzc2lvbhImCgNhcGkYAiABKA4yGS5yZWRwYW5kYS5hcGkuYXV0aC52MS5BUEkqwgEKA0FQSRITCg9BUElfVU5TUEVDSUZJRUQQABINCglBUElfS0FGS0EQARIXChNBUElfU0NIRU1BX1JFR0lTVFJZEAISFgoSQVBJX1JFRFBBTkRBX0FETUlOEAMSGAoUQVBJX1JFRFBBTkRBX0NPTk5FQ1QQBBIVChFBUElfS0FGS0FfQ09OTkVDVBAFEg8KC0FQSV9DT05TT0xFEAYSEgoOQVBJX01DUF9TRVJWRVIQBxIQCgxBUElfQUlfQUdFTlQQCCpoCgpQZXJtaXNzaW9uEhoKFlBFUk1JU1NJT05fVU5TUEVDSUZJRUQQABITCg9QRVJNSVNTSU9OX1ZJRVcQARITCg9QRVJNSVNTSU9OX0VESVQQAhIUChBQRVJNSVNTSU9OX0FETUlOEAM6dwoNYXV0aG9yaXphdGlvbhIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGOHUAyABKAsyLy5yZWRwYW5kYS5hcGkuYXV0aC52MS5BdXRob3JpemF0aW9uUmVxdWlyZW1lbnRzUg1hdXRob3JpemF0aW9uYgZwcm90bzM", [file_google_protobuf_descriptor]);

// node_modules/@buf/redpandadata_dataplane.bufbuild_es/redpanda/api/dataplane/v1/acl_pb.js
var file_redpanda_api_dataplane_v1_acl = /* @__PURE__ */ fileDesc("CiNyZWRwYW5kYS9hcGkvZGF0YXBsYW5lL3YxL2FjbC5wcm90bxIZcmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MSL/BwoDQUNMIqgCCgxSZXNvdXJjZVR5cGUSHQoZUkVTT1VSQ0VfVFlQRV9VTlNQRUNJRklFRBAAEhUKEVJFU09VUkNFX1RZUEVfQU5ZEAESFwoTUkVTT1VSQ0VfVFlQRV9UT1BJQxACEhcKE1JFU09VUkNFX1RZUEVfR1JPVVAQAxIZChVSRVNPVVJDRV9UWVBFX0NMVVNURVIQBBIiCh5SRVNPVVJDRV9UWVBFX1RSQU5TQUNUSU9OQUxfSUQQBRIiCh5SRVNPVVJDRV9UWVBFX0RFTEVHQVRJT05fVE9LRU4QBhIWChJSRVNPVVJDRV9UWVBFX1VTRVIQBxIaChZSRVNPVVJDRV9UWVBFX1JFR0lTVFJZEAgSGQoVUkVTT1VSQ0VfVFlQRV9TVUJKRUNUEAkiwwEKE1Jlc291cmNlUGF0dGVyblR5cGUSJQohUkVTT1VSQ0VfUEFUVEVSTl9UWVBFX1VOU1BFQ0lGSUVEEAASHQoZUkVTT1VSQ0VfUEFUVEVSTl9UWVBFX0FOWRABEh8KG1JFU09VUkNFX1BBVFRFUk5fVFlQRV9NQVRDSBACEiEKHVJFU09VUkNFX1BBVFRFUk5fVFlQRV9MSVRFUkFMEAMSIgoeUkVTT1VSQ0VfUEFUVEVSTl9UWVBFX1BSRUZJWEVEEAQihQMKCU9wZXJhdGlvbhIZChVPUEVSQVRJT05fVU5TUEVDSUZJRUQQABIRCg1PUEVSQVRJT05fQU5ZEAESEQoNT1BFUkFUSU9OX0FMTBACEhIKDk9QRVJBVElPTl9SRUFEEAMSEwoPT1BFUkFUSU9OX1dSSVRFEAQSFAoQT1BFUkFUSU9OX0NSRUFURRAFEhQKEE9QRVJBVElPTl9ERUxFVEUQBhITCg9PUEVSQVRJT05fQUxURVIQBxIWChJPUEVSQVRJT05fREVTQ1JJQkUQCBIcChhPUEVSQVRJT05fQ0xVU1RFUl9BQ1RJT04QCRIeChpPUEVSQVRJT05fREVTQ1JJQkVfQ09ORklHUxAKEhsKF09QRVJBVElPTl9BTFRFUl9DT05GSUdTEAsSHgoaT1BFUkFUSU9OX0lERU1QT1RFTlRfV1JJVEUQDBIbChdPUEVSQVRJT05fQ1JFQVRFX1RPS0VOUxANEh0KGU9QRVJBVElPTl9ERVNDUklCRV9UT0tFTlMQDiJ/Cg5QZXJtaXNzaW9uVHlwZRIfChtQRVJNSVNTSU9OX1RZUEVfVU5TUEVDSUZJRUQQABIXChNQRVJNSVNTSU9OX1RZUEVfQU5ZEAESGAoUUEVSTUlTU0lPTl9UWVBFX0RFTlkQAhIZChVQRVJNSVNTSU9OX1RZUEVfQUxMT1cQAyKTBAoPTGlzdEFDTHNSZXF1ZXN0EkEKBmZpbHRlchgBIAEoCzIxLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuTGlzdEFDTHNSZXF1ZXN0LkZpbHRlchq8AwoGRmlsdGVyEkwKDXJlc291cmNlX3R5cGUYASABKA4yKy5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5SZXNvdXJjZVR5cGVCCLpIBYIBAhABEhoKDXJlc291cmNlX25hbWUYAiABKAlIAIgBARJbChVyZXNvdXJjZV9wYXR0ZXJuX3R5cGUYAyABKA4yMi5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5SZXNvdXJjZVBhdHRlcm5UeXBlQgi6SAWCAQIQARIWCglwcmluY2lwYWwYBCABKAlIAYgBARIRCgRob3N0GAUgASgJSAKIAQESRQoJb3BlcmF0aW9uGAYgASgOMigucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5BQ0wuT3BlcmF0aW9uQgi6SAWCAQIQARJQCg9wZXJtaXNzaW9uX3R5cGUYByABKA4yLS5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5QZXJtaXNzaW9uVHlwZUIIukgFggECEAFCEAoOX3Jlc291cmNlX25hbWVCDAoKX3ByaW5jaXBhbEIHCgVfaG9zdCKJBAoQTGlzdEFDTHNSZXNwb25zZRJHCglyZXNvdXJjZXMYASADKAsyNC5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkxpc3RBQ0xzUmVzcG9uc2UuUmVzb3VyY2UargEKBlBvbGljeRIRCglwcmluY2lwYWwYASABKAkSDAoEaG9zdBgCIAEoCRI7CglvcGVyYXRpb24YAyABKA4yKC5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5PcGVyYXRpb24SRgoPcGVybWlzc2lvbl90eXBlGAQgASgOMi0ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5BQ0wuUGVybWlzc2lvblR5cGUa+gEKCFJlc291cmNlEkIKDXJlc291cmNlX3R5cGUYASABKA4yKy5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5SZXNvdXJjZVR5cGUSFQoNcmVzb3VyY2VfbmFtZRgCIAEoCRJRChVyZXNvdXJjZV9wYXR0ZXJuX3R5cGUYAyABKA4yMi5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5SZXNvdXJjZVBhdHRlcm5UeXBlEkAKBGFjbHMYBCADKAsyMi5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkxpc3RBQ0xzUmVzcG9uc2UuUG9saWN5IqwJChBDcmVhdGVBQ0xSZXF1ZXN0ElYKDXJlc291cmNlX3R5cGUYASABKA4yKy5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5SZXNvdXJjZVR5cGVCEuBBArpIDMgBAYIBBhABIAAgARIVCg1yZXNvdXJjZV9uYW1lGAIgASgJEmUKFXJlc291cmNlX3BhdHRlcm5fdHlwZRgDIAEoDjIyLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuQUNMLlJlc291cmNlUGF0dGVyblR5cGVCEuBBArpIDMgBAYIBBhABGAMYBBK6AQoJcHJpbmNpcGFsGAQgASgJQqYB4EECukifAboBmAEKGXByaW5jaXBhbF9wcmVmaXhfcmVxdWlyZWQae3RoaXMubWF0Y2hlcygnXlteOl0rOi4rJCcpID8gJyc6ICdwcmluY2lwYWwgbXVzdCBjb250YWluIGEgcHJpbmNpcGFsIHByZWZpeCBmb2xsb3dlZCBieSBhIHByaW5jaXBhbCBuYW1lIChlLmcuIFVzZXI6YWxpY2UpJ8gBARKUAQoEaG9zdBgFIAEoCUKFAeBBArpIf7oBeQoWd2lsZGNhcmRfb3JfaXBfYWRkcmVzcxI9RmllbGQgaG9zdCBtdXN0IGJlIGVpdGhlciB3aWxkY2FyZCAoKikgb3IgYSB2YWxpZCBJUCBhZGRyZXNzLhogdGhpcyA9PSAnKicgPyB0cnVlIDogdGhpcy5pc0lwKCnIAQESTwoJb3BlcmF0aW9uGAYgASgOMigucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5BQ0wuT3BlcmF0aW9uQhLgQQK6SAzIAQGCAQYQASAAIAESWgoPcGVybWlzc2lvbl90eXBlGAcgASgOMi0ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5BQ0wuUGVybWlzc2lvblR5cGVCEuBBArpIDMgBAYIBBhABGAIYAzrAA7pIvAMauQMKOnJlc291cmNlX25hbWVfbXVzdF9iZV9zZXRfZXhjZXB0X2Zvcl9jbHVzdGVyX3Jlc291cmNlX3R5cGUa+gIodGhpcy5yZXNvdXJjZV90eXBlID09IDQgfHwgdGhpcy5yZXNvdXJjZV90eXBlID09IDgpICYmIHNpemUodGhpcy5yZXNvdXJjZV9uYW1lKSA9PSAwID8gJyc6IHRoaXMucmVzb3VyY2VfdHlwZSA9PSA0ICYmIHRoaXMucmVzb3VyY2VfbmFtZSAhPSAna2Fma2EtY2x1c3RlcicgPyAnRmllbGQgcmVzb3VyY2VfbmFtZSBtdXN0IGJlIHNldCB0byAia2Fma2EtY2x1c3RlciIgb3IgZW1wdHkgd2hlbiB1c2luZyByZXNvdXJjZV90eXBlPUNMVVNURVInOiB0aGlzLnJlc291cmNlX3R5cGUgIT0gNCAmJiB0aGlzLnJlc291cmNlX3R5cGUgIT0gOCAmJiBzaXplKHRoaXMucmVzb3VyY2VfbmFtZSkgPT0gMCA/ICdGaWVsZCByZXNvdXJjZV9uYW1lIG11c3QgYmUgc2V0JzogJyciEwoRQ3JlYXRlQUNMUmVzcG9uc2UiwgQKEURlbGV0ZUFDTHNSZXF1ZXN0Ek4KBmZpbHRlchgBIAEoCzIzLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuRGVsZXRlQUNMc1JlcXVlc3QuRmlsdGVyQgngQQK6SAPIAQEa3AMKBkZpbHRlchJUCg1yZXNvdXJjZV90eXBlGAEgASgOMisucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5BQ0wuUmVzb3VyY2VUeXBlQhDgQQK6SArIAQGCAQQQASAAEhoKDXJlc291cmNlX25hbWUYAiABKAlIAIgBARJjChVyZXNvdXJjZV9wYXR0ZXJuX3R5cGUYAyABKA4yMi5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5SZXNvdXJjZVBhdHRlcm5UeXBlQhDgQQK6SArIAQGCAQQQASAAEhYKCXByaW5jaXBhbBgEIAEoCUgBiAEBEhEKBGhvc3QYBSABKAlIAogBARJNCglvcGVyYXRpb24YBiABKA4yKC5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkFDTC5PcGVyYXRpb25CEOBBArpICsgBAYIBBBABIAASWAoPcGVybWlzc2lvbl90eXBlGAcgASgOMi0ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5BQ0wuUGVybWlzc2lvblR5cGVCEOBBArpICsgBAYIBBBABIABCEAoOX3Jlc291cmNlX25hbWVCDAoKX3ByaW5jaXBhbEIHCgVfaG9zdCLtAwoSRGVsZXRlQUNMc1Jlc3BvbnNlElAKDW1hdGNoaW5nX2FjbHMYASADKAsyOS5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkRlbGV0ZUFDTHNSZXNwb25zZS5NYXRjaGluZ0FDTBqEAwoLTWF0Y2hpbmdBQ0wSQgoNcmVzb3VyY2VfdHlwZRgBIAEoDjIrLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuQUNMLlJlc291cmNlVHlwZRIVCg1yZXNvdXJjZV9uYW1lGAIgASgJElEKFXJlc291cmNlX3BhdHRlcm5fdHlwZRgDIAEoDjIyLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuQUNMLlJlc291cmNlUGF0dGVyblR5cGUSEQoJcHJpbmNpcGFsGAQgASgJEgwKBGhvc3QYBSABKAkSOwoJb3BlcmF0aW9uGAYgASgOMigucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5BQ0wuT3BlcmF0aW9uEkYKD3Blcm1pc3Npb25fdHlwZRgHIAEoDjItLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuQUNMLlBlcm1pc3Npb25UeXBlEiEKBWVycm9yGAggASgLMhIuZ29vZ2xlLnJwYy5TdGF0dXMy7wgKCkFDTFNlcnZpY2USuAIKCExpc3RBQ0xzEioucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5MaXN0QUNMc1JlcXVlc3QaKy5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkxpc3RBQ0xzUmVzcG9uc2Ui0gGSQbYBEglMaXN0IEFDTHMaa0xpc3QgYWxsIEFDTHMuIFRoZSBgZmlsdGVyLmAgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgZmluZCBtYXRjaGluZyBBQ0xzIHRoYXQgbWVldCBhbGwgc3BlY2lmaWVkIGNvbmRpdGlvbnMuSjwKAzIwMBI1CgJPSxIvCi0aKy5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkxpc3RBQ0xzUmVzcG9uc2WKph0ECAEQAYLT5JMCChIIL3YxL2FjbHMS6gEKCUNyZWF0ZUFDTBIrLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuQ3JlYXRlQUNMUmVxdWVzdBosLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuQ3JlYXRlQUNMUmVzcG9uc2UigQGSQWMSCkNyZWF0ZSBBQ0waEUNyZWF0ZSBhIG5ldyBBQ0wuSkIKAzIwMRI7CgdDcmVhdGVkEjAKLhosLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuQ3JlYXRlQUNMUmVzcG9uc2WKph0ECAMQAYLT5JMCDToBKiIIL3YxL2FjbHMS5AIKCkRlbGV0ZUFDTHMSLC5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkRlbGV0ZUFDTHNSZXF1ZXN0Gi0ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5EZWxldGVBQ0xzUmVzcG9uc2Ui+AGSQdwBEgtEZWxldGUgQUNMcxqMAURlbGV0ZSBhbGwgQUNMcyB0aGF0IG1hdGNoIHRoZSBmaWx0ZXIgY3JpdGVyaWEuIFRoZSBgZmlsdGVyLmAgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgZmluZCBtYXRjaGluZyBBQ0xzIHRoYXQgbWVldCBhbGwgc3BlY2lmaWVkIGNvbmRpdGlvbnMuSj4KAzIwMBI3CgJPSxIxCi8aLS5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkRlbGV0ZUFDTHNSZXNwb25zZYqmHQQIAxABgtPkkwIKKggvdjEvYWNscxrRAZJBzQEKDVJlZHBhbmRhIEFDTHMSuwFNYW5hZ2UgUmVkcGFuZGEgYWNjZXNzIGNvbnRyb2wgbGlzdHMgKEFDTHMpLiBTZWUgW1JlZHBhbmRhIENsb3VkIEF1dGhvcml6YXRpb25dKGh0dHBzOi8vZG9jcy5yZWRwYW5kYS5jb20vcmVkcGFuZGEtY2xvdWQvc2VjdXJpdHkvYXV0aG9yaXphdGlvbi9jbG91ZC1hdXRob3JpemF0aW9uLykgZm9yIG1vcmUgaW5mb3JtYXRpb24uYgZwcm90bzM", [file_buf_validate_validate, file_google_api_annotations, file_google_api_field_behavior, file_google_rpc_status, file_protoc_gen_openapiv2_options_annotations, file_redpanda_api_auth_v1_authorization]);
var ACL_ResourceTypeSchema = /* @__PURE__ */ enumDesc(file_redpanda_api_dataplane_v1_acl, 0, 0);
var ACL_ResourceType = /* @__PURE__ */ tsEnum(ACL_ResourceTypeSchema);
var ACL_ResourcePatternTypeSchema = /* @__PURE__ */ enumDesc(file_redpanda_api_dataplane_v1_acl, 0, 1);
var ACL_ResourcePatternType = /* @__PURE__ */ tsEnum(ACL_ResourcePatternTypeSchema);
var ACL_OperationSchema = /* @__PURE__ */ enumDesc(file_redpanda_api_dataplane_v1_acl, 0, 2);
var ACL_Operation = /* @__PURE__ */ tsEnum(ACL_OperationSchema);
var ACL_PermissionTypeSchema = /* @__PURE__ */ enumDesc(file_redpanda_api_dataplane_v1_acl, 0, 3);
var ACL_PermissionType = /* @__PURE__ */ tsEnum(ACL_PermissionTypeSchema);
var ACLService = /* @__PURE__ */ serviceDesc(file_redpanda_api_dataplane_v1_acl, 0);

// node_modules/@buf/googleapis_googleapis.bufbuild_es/google/rpc/error_details_pb.js
var file_google_rpc_error_details = /* @__PURE__ */ fileDesc("Ch5nb29nbGUvcnBjL2Vycm9yX2RldGFpbHMucHJvdG8SCmdvb2dsZS5ycGMikwEKCUVycm9ySW5mbxIOCgZyZWFzb24YASABKAkSDgoGZG9tYWluGAIgASgJEjUKCG1ldGFkYXRhGAMgAygLMiMuZ29vZ2xlLnJwYy5FcnJvckluZm8uTWV0YWRhdGFFbnRyeRovCg1NZXRhZGF0YUVudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEiOwoJUmV0cnlJbmZvEi4KC3JldHJ5X2RlbGF5GAEgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uIjIKCURlYnVnSW5mbxIVCg1zdGFja19lbnRyaWVzGAEgAygJEg4KBmRldGFpbBgCIAEoCSKPAwoMUXVvdGFGYWlsdXJlEjYKCnZpb2xhdGlvbnMYASADKAsyIi5nb29nbGUucnBjLlF1b3RhRmFpbHVyZS5WaW9sYXRpb24axgIKCVZpb2xhdGlvbhIPCgdzdWJqZWN0GAEgASgJEhMKC2Rlc2NyaXB0aW9uGAIgASgJEhMKC2FwaV9zZXJ2aWNlGAMgASgJEhQKDHF1b3RhX21ldHJpYxgEIAEoCRIQCghxdW90YV9pZBgFIAEoCRJRChBxdW90YV9kaW1lbnNpb25zGAYgAygLMjcuZ29vZ2xlLnJwYy5RdW90YUZhaWx1cmUuVmlvbGF0aW9uLlF1b3RhRGltZW5zaW9uc0VudHJ5EhMKC3F1b3RhX3ZhbHVlGAcgASgDEh8KEmZ1dHVyZV9xdW90YV92YWx1ZRgIIAEoA0gAiAEBGjYKFFF1b3RhRGltZW5zaW9uc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAFCFQoTX2Z1dHVyZV9xdW90YV92YWx1ZSKVAQoTUHJlY29uZGl0aW9uRmFpbHVyZRI9Cgp2aW9sYXRpb25zGAEgAygLMikuZ29vZ2xlLnJwYy5QcmVjb25kaXRpb25GYWlsdXJlLlZpb2xhdGlvbho/CglWaW9sYXRpb24SDAoEdHlwZRgBIAEoCRIPCgdzdWJqZWN0GAIgASgJEhMKC2Rlc2NyaXB0aW9uGAMgASgJIswBCgpCYWRSZXF1ZXN0Ej8KEGZpZWxkX3Zpb2xhdGlvbnMYASADKAsyJS5nb29nbGUucnBjLkJhZFJlcXVlc3QuRmllbGRWaW9sYXRpb24afQoORmllbGRWaW9sYXRpb24SDQoFZmllbGQYASABKAkSEwoLZGVzY3JpcHRpb24YAiABKAkSDgoGcmVhc29uGAMgASgJEjcKEWxvY2FsaXplZF9tZXNzYWdlGAQgASgLMhwuZ29vZ2xlLnJwYy5Mb2NhbGl6ZWRNZXNzYWdlIjcKC1JlcXVlc3RJbmZvEhIKCnJlcXVlc3RfaWQYASABKAkSFAoMc2VydmluZ19kYXRhGAIgASgJImAKDFJlc291cmNlSW5mbxIVCg1yZXNvdXJjZV90eXBlGAEgASgJEhUKDXJlc291cmNlX25hbWUYAiABKAkSDQoFb3duZXIYAyABKAkSEwoLZGVzY3JpcHRpb24YBCABKAkiVgoESGVscBIkCgVsaW5rcxgBIAMoCzIVLmdvb2dsZS5ycGMuSGVscC5MaW5rGigKBExpbmsSEwoLZGVzY3JpcHRpb24YASABKAkSCwoDdXJsGAIgASgJIjMKEExvY2FsaXplZE1lc3NhZ2USDgoGbG9jYWxlGAEgASgJEg8KB21lc3NhZ2UYAiABKAlCbAoOY29tLmdvb2dsZS5ycGNCEUVycm9yRGV0YWlsc1Byb3RvUAFaP2dvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvcnBjL2VycmRldGFpbHM7ZXJyZGV0YWlsc6ICA1JQQ2IGcHJvdG8z", [file_google_protobuf_duration]);
var BadRequestSchema = /* @__PURE__ */ messageDesc(file_google_rpc_error_details, 5);

// node_modules/@buf/bufbuild_protovalidate.bufbuild_es/buf/validate/validate_pb.js
var file_buf_validate_validate2 = /* @__PURE__ */ fileDesc("ChtidWYvdmFsaWRhdGUvdmFsaWRhdGUucHJvdG8SDGJ1Zi52YWxpZGF0ZSI3CgRSdWxlEgoKAmlkGAEgASgJEg8KB21lc3NhZ2UYAiABKAkSEgoKZXhwcmVzc2lvbhgDIAEoCSJuCgxNZXNzYWdlUnVsZXMSHwoDY2VsGAMgAygLMhIuYnVmLnZhbGlkYXRlLlJ1bGUSLQoFb25lb2YYBCADKAsyHi5idWYudmFsaWRhdGUuTWVzc2FnZU9uZW9mUnVsZUoECAEQAlIIZGlzYWJsZWQiNAoQTWVzc2FnZU9uZW9mUnVsZRIOCgZmaWVsZHMYASADKAkSEAoIcmVxdWlyZWQYAiABKAgiHgoKT25lb2ZSdWxlcxIQCghyZXF1aXJlZBgBIAEoCCK/CAoKRmllbGRSdWxlcxIfCgNjZWwYFyADKAsyEi5idWYudmFsaWRhdGUuUnVsZRIQCghyZXF1aXJlZBgZIAEoCBIkCgZpZ25vcmUYGyABKA4yFC5idWYudmFsaWRhdGUuSWdub3JlEikKBWZsb2F0GAEgASgLMhguYnVmLnZhbGlkYXRlLkZsb2F0UnVsZXNIABIrCgZkb3VibGUYAiABKAsyGS5idWYudmFsaWRhdGUuRG91YmxlUnVsZXNIABIpCgVpbnQzMhgDIAEoCzIYLmJ1Zi52YWxpZGF0ZS5JbnQzMlJ1bGVzSAASKQoFaW50NjQYBCABKAsyGC5idWYudmFsaWRhdGUuSW50NjRSdWxlc0gAEisKBnVpbnQzMhgFIAEoCzIZLmJ1Zi52YWxpZGF0ZS5VSW50MzJSdWxlc0gAEisKBnVpbnQ2NBgGIAEoCzIZLmJ1Zi52YWxpZGF0ZS5VSW50NjRSdWxlc0gAEisKBnNpbnQzMhgHIAEoCzIZLmJ1Zi52YWxpZGF0ZS5TSW50MzJSdWxlc0gAEisKBnNpbnQ2NBgIIAEoCzIZLmJ1Zi52YWxpZGF0ZS5TSW50NjRSdWxlc0gAEi0KB2ZpeGVkMzIYCSABKAsyGi5idWYudmFsaWRhdGUuRml4ZWQzMlJ1bGVzSAASLQoHZml4ZWQ2NBgKIAEoCzIaLmJ1Zi52YWxpZGF0ZS5GaXhlZDY0UnVsZXNIABIvCghzZml4ZWQzMhgLIAEoCzIbLmJ1Zi52YWxpZGF0ZS5TRml4ZWQzMlJ1bGVzSAASLwoIc2ZpeGVkNjQYDCABKAsyGy5idWYudmFsaWRhdGUuU0ZpeGVkNjRSdWxlc0gAEicKBGJvb2wYDSABKAsyFy5idWYudmFsaWRhdGUuQm9vbFJ1bGVzSAASKwoGc3RyaW5nGA4gASgLMhkuYnVmLnZhbGlkYXRlLlN0cmluZ1J1bGVzSAASKQoFYnl0ZXMYDyABKAsyGC5idWYudmFsaWRhdGUuQnl0ZXNSdWxlc0gAEicKBGVudW0YECABKAsyFy5idWYudmFsaWRhdGUuRW51bVJ1bGVzSAASLwoIcmVwZWF0ZWQYEiABKAsyGy5idWYudmFsaWRhdGUuUmVwZWF0ZWRSdWxlc0gAEiUKA21hcBgTIAEoCzIWLmJ1Zi52YWxpZGF0ZS5NYXBSdWxlc0gAEiUKA2FueRgUIAEoCzIWLmJ1Zi52YWxpZGF0ZS5BbnlSdWxlc0gAEi8KCGR1cmF0aW9uGBUgASgLMhsuYnVmLnZhbGlkYXRlLkR1cmF0aW9uUnVsZXNIABIxCgl0aW1lc3RhbXAYFiABKAsyHC5idWYudmFsaWRhdGUuVGltZXN0YW1wUnVsZXNIAEIGCgR0eXBlSgQIGBAZSgQIGhAbUgdza2lwcGVkUgxpZ25vcmVfZW1wdHkiVQoPUHJlZGVmaW5lZFJ1bGVzEh8KA2NlbBgBIAMoCzISLmJ1Zi52YWxpZGF0ZS5SdWxlSgQIGBAZSgQIGhAbUgdza2lwcGVkUgxpZ25vcmVfZW1wdHki2hcKCkZsb2F0UnVsZXMSgwEKBWNvbnN0GAEgASgCQnTCSHEKbwoLZmxvYXQuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKfAQoCbHQYAiABKAJCkAHCSIwBCokBCghmbG9hdC5sdBp9IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA+PSBydWxlcy5sdCk/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKvAQoDbHRlGAMgASgCQp8BwkibAQqYAQoJZmxvYXQubHRlGooBIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA+IHJ1bGVzLmx0ZSk/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAAS7wcKAmd0GAQgASgCQuAHwkjcBwqNAQoIZmxvYXQuZ3QagAEhaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwrDAQoLZmxvYXQuZ3RfbHQaswFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrNAQoVZmxvYXQuZ3RfbHRfZXhjbHVzaXZlGrMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycK0wEKDGZsb2F0Lmd0X2x0ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCt0BChZmbG9hdC5ndF9sdGVfZXhjbHVzaXZlGsIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARK6CAoDZ3RlGAUgASgCQqoIwkimCAqbAQoJZmxvYXQuZ3RlGo0BIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCtIBCgxmbG9hdC5ndGVfbHQawQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtwBChZmbG9hdC5ndGVfbHRfZXhjbHVzaXZlGsEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwriAQoNZmxvYXQuZ3RlX2x0ZRrQAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK7AEKF2Zsb2F0Lmd0ZV9sdGVfZXhjbHVzaXZlGtABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEn8KAmluGAYgAygCQnPCSHAKbgoIZmxvYXQuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEnYKBm5vdF9pbhgHIAMoAkJmwkhjCmEKDGZsb2F0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEnUKBmZpbml0ZRgIIAEoCEJlwkhiCmAKDGZsb2F0LmZpbml0ZRpQcnVsZXMuZmluaXRlID8gKHRoaXMuaXNOYW4oKSB8fCB0aGlzLmlzSW5mKCkgPyAndmFsdWUgbXVzdCBiZSBmaW5pdGUnIDogJycpIDogJycSKwoHZXhhbXBsZRgJIAMoAkIawkgXChUKDWZsb2F0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIu0XCgtEb3VibGVSdWxlcxKEAQoFY29uc3QYASABKAFCdcJIcgpwCgxkb3VibGUuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKgAQoCbHQYAiABKAFCkQHCSI0BCooBCglkb3VibGUubHQafSFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASsAEKA2x0ZRgDIAEoAUKgAcJInAEKmQEKCmRvdWJsZS5sdGUaigEhaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlKT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABL0BwoCZ3QYBCABKAFC5QfCSOEHCo4BCglkb3VibGUuZ3QagAEhaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwrEAQoMZG91YmxlLmd0X2x0GrMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKzgEKFmRvdWJsZS5ndF9sdF9leGNsdXNpdmUaswFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrUAQoNZG91YmxlLmd0X2x0ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCt4BChdkb3VibGUuZ3RfbHRlX2V4Y2x1c2l2ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESvwgKA2d0ZRgFIAEoAUKvCMJIqwgKnAEKCmRvdWJsZS5ndGUajQEhaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycK0wEKDWRvdWJsZS5ndGVfbHQawQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCt0BChdkb3VibGUuZ3RlX2x0X2V4Y2x1c2l2ZRrBAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK4wEKDmRvdWJsZS5ndGVfbHRlGtABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrtAQoYZG91YmxlLmd0ZV9sdGVfZXhjbHVzaXZlGtABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEoABCgJpbhgGIAMoAUJ0wkhxCm8KCWRvdWJsZS5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSdwoGbm90X2luGAcgAygBQmfCSGQKYgoNZG91YmxlLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEnYKBmZpbml0ZRgIIAEoCEJmwkhjCmEKDWRvdWJsZS5maW5pdGUaUHJ1bGVzLmZpbml0ZSA/ICh0aGlzLmlzTmFuKCkgfHwgdGhpcy5pc0luZigpID8gJ3ZhbHVlIG11c3QgYmUgZmluaXRlJyA6ICcnKSA6ICcnEiwKB2V4YW1wbGUYCSADKAFCG8JIGAoWCg5kb3VibGUuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4ijBUKCkludDMyUnVsZXMSgwEKBWNvbnN0GAEgASgFQnTCSHEKbwoLaW50MzIuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKKAQoCbHQYAiABKAVCfMJIeQp3CghpbnQzMi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKcAQoDbHRlGAMgASgFQowBwkiIAQqFAQoJaW50MzIubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKXBwoCZ3QYBCABKAVCiAfCSIQHCnoKCGludDMyLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwqzAQoLaW50MzIuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrsBChVpbnQzMi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrDAQoMaW50MzIuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrLAQoWaW50MzIuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES4wcKA2d0ZRgFIAEoBULTB8JIzwcKiAEKCWludDMyLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsIBCgxpbnQzMi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKygEKFmludDMyLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtIBCg1pbnQzMi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtoBChdpbnQzMi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ/CgJpbhgGIAMoBUJzwkhwCm4KCGludDMyLmluGmIhKHRoaXMgaW4gZ2V0RmllbGQocnVsZXMsICdpbicpKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdpbicpXSkgOiAnJxJ2CgZub3RfaW4YByADKAVCZsJIYwphCgxpbnQzMi5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIrCgdleGFtcGxlGAggAygFQhrCSBcKFQoNaW50MzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4ijBUKCkludDY0UnVsZXMSgwEKBWNvbnN0GAEgASgDQnTCSHEKbwoLaW50NjQuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKKAQoCbHQYAiABKANCfMJIeQp3CghpbnQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKcAQoDbHRlGAMgASgDQowBwkiIAQqFAQoJaW50NjQubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKXBwoCZ3QYBCABKANCiAfCSIQHCnoKCGludDY0Lmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwqzAQoLaW50NjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrsBChVpbnQ2NC5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrDAQoMaW50NjQuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrLAQoWaW50NjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES4wcKA2d0ZRgFIAEoA0LTB8JIzwcKiAEKCWludDY0Lmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsIBCgxpbnQ2NC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKygEKFmludDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtIBCg1pbnQ2NC5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtoBChdpbnQ2NC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ/CgJpbhgGIAMoA0JzwkhwCm4KCGludDY0LmluGmIhKHRoaXMgaW4gZ2V0RmllbGQocnVsZXMsICdpbicpKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdpbicpXSkgOiAnJxJ2CgZub3RfaW4YByADKANCZsJIYwphCgxpbnQ2NC5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIrCgdleGFtcGxlGAkgAygDQhrCSBcKFQoNaW50NjQuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4inhUKC1VJbnQzMlJ1bGVzEoQBCgVjb25zdBgBIAEoDUJ1wkhyCnAKDHVpbnQzMi5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEosBCgJsdBgCIAEoDUJ9wkh6CngKCXVpbnQzMi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKdAQoDbHRlGAMgASgNQo0BwkiJAQqGAQoKdWludDMyLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASnAcKAmd0GAQgASgNQo0HwkiJBwp7Cgl1aW50MzIuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrQBCgx1aW50MzIuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrwBChZ1aW50MzIuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxAEKDXVpbnQzMi5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCswBChd1aW50MzIuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES6AcKA2d0ZRgFIAEoDULYB8JI1AcKiQEKCnVpbnQzMi5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrDAQoNdWludDMyLmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrLAQoXdWludDMyLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtMBCg51aW50MzIuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrbAQoYdWludDMyLmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEoABCgJpbhgGIAMoDUJ0wkhxCm8KCXVpbnQzMi5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSdwoGbm90X2luGAcgAygNQmfCSGQKYgoNdWludDMyLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEiwKB2V4YW1wbGUYCCADKA1CG8JIGAoWCg51aW50MzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4inhUKC1VJbnQ2NFJ1bGVzEoQBCgVjb25zdBgBIAEoBEJ1wkhyCnAKDHVpbnQ2NC5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEosBCgJsdBgCIAEoBEJ9wkh6CngKCXVpbnQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKdAQoDbHRlGAMgASgEQo0BwkiJAQqGAQoKdWludDY0Lmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASnAcKAmd0GAQgASgEQo0HwkiJBwp7Cgl1aW50NjQuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrQBCgx1aW50NjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrwBChZ1aW50NjQuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxAEKDXVpbnQ2NC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCswBChd1aW50NjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES6AcKA2d0ZRgFIAEoBELYB8JI1AcKiQEKCnVpbnQ2NC5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrDAQoNdWludDY0Lmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrLAQoXdWludDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtMBCg51aW50NjQuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrbAQoYdWludDY0Lmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEoABCgJpbhgGIAMoBEJ0wkhxCm8KCXVpbnQ2NC5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSdwoGbm90X2luGAcgAygEQmfCSGQKYgoNdWludDY0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEiwKB2V4YW1wbGUYCCADKARCG8JIGAoWCg51aW50NjQuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4inhUKC1NJbnQzMlJ1bGVzEoQBCgVjb25zdBgBIAEoEUJ1wkhyCnAKDHNpbnQzMi5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEosBCgJsdBgCIAEoEUJ9wkh6CngKCXNpbnQzMi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKdAQoDbHRlGAMgASgRQo0BwkiJAQqGAQoKc2ludDMyLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASnAcKAmd0GAQgASgRQo0HwkiJBwp7CglzaW50MzIuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrQBCgxzaW50MzIuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrwBChZzaW50MzIuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxAEKDXNpbnQzMi5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCswBChdzaW50MzIuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES6AcKA2d0ZRgFIAEoEULYB8JI1AcKiQEKCnNpbnQzMi5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrDAQoNc2ludDMyLmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrLAQoXc2ludDMyLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtMBCg5zaW50MzIuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrbAQoYc2ludDMyLmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEoABCgJpbhgGIAMoEUJ0wkhxCm8KCXNpbnQzMi5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSdwoGbm90X2luGAcgAygRQmfCSGQKYgoNc2ludDMyLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEiwKB2V4YW1wbGUYCCADKBFCG8JIGAoWCg5zaW50MzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4inhUKC1NJbnQ2NFJ1bGVzEoQBCgVjb25zdBgBIAEoEkJ1wkhyCnAKDHNpbnQ2NC5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEosBCgJsdBgCIAEoEkJ9wkh6CngKCXNpbnQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKdAQoDbHRlGAMgASgSQo0BwkiJAQqGAQoKc2ludDY0Lmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASnAcKAmd0GAQgASgSQo0HwkiJBwp7CglzaW50NjQuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrQBCgxzaW50NjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrwBChZzaW50NjQuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxAEKDXNpbnQ2NC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCswBChdzaW50NjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES6AcKA2d0ZRgFIAEoEkLYB8JI1AcKiQEKCnNpbnQ2NC5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrDAQoNc2ludDY0Lmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrLAQoXc2ludDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtMBCg5zaW50NjQuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrbAQoYc2ludDY0Lmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEoABCgJpbhgGIAMoEkJ0wkhxCm8KCXNpbnQ2NC5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSdwoGbm90X2luGAcgAygSQmfCSGQKYgoNc2ludDY0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEiwKB2V4YW1wbGUYCCADKBJCG8JIGAoWCg5zaW50NjQuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4irxUKDEZpeGVkMzJSdWxlcxKFAQoFY29uc3QYASABKAdCdsJIcwpxCg1maXhlZDMyLmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSjAEKAmx0GAIgASgHQn7CSHsKeQoKZml4ZWQzMi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKeAQoDbHRlGAMgASgHQo4BwkiKAQqHAQoLZml4ZWQzMi5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqEHCgJndBgEIAEoB0KSB8JIjgcKfAoKZml4ZWQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtQEKDWZpeGVkMzIuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr0BChdmaXhlZDMyLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsUBCg5maXhlZDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzQEKGGZpeGVkMzIuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES7QcKA2d0ZRgFIAEoB0LdB8JI2QcKigEKC2ZpeGVkMzIuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxAEKDmZpeGVkMzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCswBChhmaXhlZDMyLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtQBCg9maXhlZDMyLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3AEKGWZpeGVkMzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESgQEKAmluGAYgAygHQnXCSHIKcAoKZml4ZWQzMi5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSeAoGbm90X2luGAcgAygHQmjCSGUKYwoOZml4ZWQzMi5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxItCgdleGFtcGxlGAggAygHQhzCSBkKFwoPZml4ZWQzMi5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiKvFQoMRml4ZWQ2NFJ1bGVzEoUBCgVjb25zdBgBIAEoBkJ2wkhzCnEKDWZpeGVkNjQuY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKMAQoCbHQYAiABKAZCfsJIewp5CgpmaXhlZDY0Lmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp4BCgNsdGUYAyABKAZCjgHCSIoBCocBCgtmaXhlZDY0Lmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASoQcKAmd0GAQgASgGQpIHwkiOBwp8CgpmaXhlZDY0Lmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq1AQoNZml4ZWQ2NC5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvQEKF2ZpeGVkNjQuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxQEKDmZpeGVkNjQuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrNAQoYZml4ZWQ2NC5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLtBwoDZ3RlGAUgASgGQt0HwkjZBwqKAQoLZml4ZWQ2NC5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrEAQoOZml4ZWQ2NC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzAEKGGZpeGVkNjQuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK1AEKD2ZpeGVkNjQuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrcAQoZZml4ZWQ2NC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKBAQoCaW4YBiADKAZCdcJIcgpwCgpmaXhlZDY0LmluGmIhKHRoaXMgaW4gZ2V0RmllbGQocnVsZXMsICdpbicpKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdpbicpXSkgOiAnJxJ4CgZub3RfaW4YByADKAZCaMJIZQpjCg5maXhlZDY0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEi0KB2V4YW1wbGUYCCADKAZCHMJIGQoXCg9maXhlZDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIsAVCg1TRml4ZWQzMlJ1bGVzEoYBCgVjb25zdBgBIAEoD0J3wkh0CnIKDnNmaXhlZDMyLmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSjQEKAmx0GAIgASgPQn/CSHwKegoLc2ZpeGVkMzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnwEKA2x0ZRgDIAEoD0KPAcJIiwEKiAEKDHNmaXhlZDMyLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASpgcKAmd0GAQgASgPQpcHwkiTBwp9CgtzZml4ZWQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtgEKDnNmaXhlZDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq+AQoYc2ZpeGVkMzIuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxgEKD3NmaXhlZDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzgEKGXNmaXhlZDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEvIHCgNndGUYBSABKA9C4gfCSN4HCosBCgxzZml4ZWQzMi5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrFAQoPc2ZpeGVkMzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCs0BChlzZml4ZWQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrVAQoQc2ZpeGVkMzIuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrdAQoac2ZpeGVkMzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESggEKAmluGAYgAygPQnbCSHMKcQoLc2ZpeGVkMzIuaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEnkKBm5vdF9pbhgHIAMoD0JpwkhmCmQKD3NmaXhlZDMyLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEi4KB2V4YW1wbGUYCCADKA9CHcJIGgoYChBzZml4ZWQzMi5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiLAFQoNU0ZpeGVkNjRSdWxlcxKGAQoFY29uc3QYASABKBBCd8JIdApyCg5zZml4ZWQ2NC5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEo0BCgJsdBgCIAEoEEJ/wkh8CnoKC3NmaXhlZDY0Lmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp8BCgNsdGUYAyABKBBCjwHCSIsBCogBCgxzZml4ZWQ2NC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqYHCgJndBgEIAEoEEKXB8JIkwcKfQoLc2ZpeGVkNjQuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrYBCg5zZml4ZWQ2NC5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvgEKGHNmaXhlZDY0Lmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsYBCg9zZml4ZWQ2NC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCs4BChlzZml4ZWQ2NC5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLyBwoDZ3RlGAUgASgQQuIHwkjeBwqLAQoMc2ZpeGVkNjQuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxQEKD3NmaXhlZDY0Lmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrNAQoZc2ZpeGVkNjQuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK1QEKEHNmaXhlZDY0Lmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3QEKGnNmaXhlZDY0Lmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEoIBCgJpbhgGIAMoEEJ2wkhzCnEKC3NmaXhlZDY0LmluGmIhKHRoaXMgaW4gZ2V0RmllbGQocnVsZXMsICdpbicpKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdpbicpXSkgOiAnJxJ5CgZub3RfaW4YByADKBBCacJIZgpkCg9zZml4ZWQ2NC5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIuCgdleGFtcGxlGAggAygQQh3CSBoKGAoQc2ZpeGVkNjQuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4ixwEKCUJvb2xSdWxlcxKCAQoFY29uc3QYASABKAhCc8JIcApuCgpib29sLmNvbnN0GmB0aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSKgoHZXhhbXBsZRgCIAMoCEIZwkgWChQKDGJvb2wuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACIpA3CgtTdHJpbmdSdWxlcxKGAQoFY29uc3QYASABKAlCd8JIdApyCgxzdHJpbmcuY29uc3QaYnRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgYCVzYCcuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEn4KA2xlbhgTIAEoBEJxwkhuCmwKCnN0cmluZy5sZW4aXnVpbnQodGhpcy5zaXplKCkpICE9IHJ1bGVzLmxlbiA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSAlcyBjaGFyYWN0ZXJzJy5mb3JtYXQoW3J1bGVzLmxlbl0pIDogJycSmQEKB21pbl9sZW4YAiABKARChwHCSIMBCoABCg5zdHJpbmcubWluX2xlbhpudWludCh0aGlzLnNpemUoKSkgPCBydWxlcy5taW5fbGVuID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlIGF0IGxlYXN0ICVzIGNoYXJhY3RlcnMnLmZvcm1hdChbcnVsZXMubWluX2xlbl0pIDogJycSlwEKB21heF9sZW4YAyABKARChQHCSIEBCn8KDnN0cmluZy5tYXhfbGVuGm11aW50KHRoaXMuc2l6ZSgpKSA+IHJ1bGVzLm1heF9sZW4gPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgYXQgbW9zdCAlcyBjaGFyYWN0ZXJzJy5mb3JtYXQoW3J1bGVzLm1heF9sZW5dKSA6ICcnEpsBCglsZW5fYnl0ZXMYFCABKARChwHCSIMBCoABChBzdHJpbmcubGVuX2J5dGVzGmx1aW50KGJ5dGVzKHRoaXMpLnNpemUoKSkgIT0gcnVsZXMubGVuX2J5dGVzID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlICVzIGJ5dGVzJy5mb3JtYXQoW3J1bGVzLmxlbl9ieXRlc10pIDogJycSowEKCW1pbl9ieXRlcxgEIAEoBEKPAcJIiwEKiAEKEHN0cmluZy5taW5fYnl0ZXMadHVpbnQoYnl0ZXModGhpcykuc2l6ZSgpKSA8IHJ1bGVzLm1pbl9ieXRlcyA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSBhdCBsZWFzdCAlcyBieXRlcycuZm9ybWF0KFtydWxlcy5taW5fYnl0ZXNdKSA6ICcnEqIBCgltYXhfYnl0ZXMYBSABKARCjgHCSIoBCocBChBzdHJpbmcubWF4X2J5dGVzGnN1aW50KGJ5dGVzKHRoaXMpLnNpemUoKSkgPiBydWxlcy5tYXhfYnl0ZXMgPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgYXQgbW9zdCAlcyBieXRlcycuZm9ybWF0KFtydWxlcy5tYXhfYnl0ZXNdKSA6ICcnEo0BCgdwYXR0ZXJuGAYgASgJQnzCSHkKdwoOc3RyaW5nLnBhdHRlcm4aZSF0aGlzLm1hdGNoZXMocnVsZXMucGF0dGVybikgPyAndmFsdWUgZG9lcyBub3QgbWF0Y2ggcmVnZXggcGF0dGVybiBgJXNgJy5mb3JtYXQoW3J1bGVzLnBhdHRlcm5dKSA6ICcnEoQBCgZwcmVmaXgYByABKAlCdMJIcQpvCg1zdHJpbmcucHJlZml4Gl4hdGhpcy5zdGFydHNXaXRoKHJ1bGVzLnByZWZpeCkgPyAndmFsdWUgZG9lcyBub3QgaGF2ZSBwcmVmaXggYCVzYCcuZm9ybWF0KFtydWxlcy5wcmVmaXhdKSA6ICcnEoIBCgZzdWZmaXgYCCABKAlCcsJIbwptCg1zdHJpbmcuc3VmZml4GlwhdGhpcy5lbmRzV2l0aChydWxlcy5zdWZmaXgpID8gJ3ZhbHVlIGRvZXMgbm90IGhhdmUgc3VmZml4IGAlc2AnLmZvcm1hdChbcnVsZXMuc3VmZml4XSkgOiAnJxKQAQoIY29udGFpbnMYCSABKAlCfsJIewp5Cg9zdHJpbmcuY29udGFpbnMaZiF0aGlzLmNvbnRhaW5zKHJ1bGVzLmNvbnRhaW5zKSA/ICd2YWx1ZSBkb2VzIG5vdCBjb250YWluIHN1YnN0cmluZyBgJXNgJy5mb3JtYXQoW3J1bGVzLmNvbnRhaW5zXSkgOiAnJxKYAQoMbm90X2NvbnRhaW5zGBcgASgJQoEBwkh+CnwKE3N0cmluZy5ub3RfY29udGFpbnMaZXRoaXMuY29udGFpbnMocnVsZXMubm90X2NvbnRhaW5zKSA/ICd2YWx1ZSBjb250YWlucyBzdWJzdHJpbmcgYCVzYCcuZm9ybWF0KFtydWxlcy5ub3RfY29udGFpbnNdKSA6ICcnEoABCgJpbhgKIAMoCUJ0wkhxCm8KCXN0cmluZy5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSdwoGbm90X2luGAsgAygJQmfCSGQKYgoNc3RyaW5nLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEt8BCgVlbWFpbBgMIAEoCELNAcJIyQEKYQoMc3RyaW5nLmVtYWlsEiN2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgZW1haWwgYWRkcmVzcxosIXJ1bGVzLmVtYWlsIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0VtYWlsKCkKZAoSc3RyaW5nLmVtYWlsX2VtcHR5EjJ2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcxoaIXJ1bGVzLmVtYWlsIHx8IHRoaXMgIT0gJydIABLnAQoIaG9zdG5hbWUYDSABKAhC0gHCSM4BCmUKD3N0cmluZy5ob3N0bmFtZRIedmFsdWUgbXVzdCBiZSBhIHZhbGlkIGhvc3RuYW1lGjIhcnVsZXMuaG9zdG5hbWUgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSG9zdG5hbWUoKQplChVzdHJpbmcuaG9zdG5hbWVfZW1wdHkSLXZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBob3N0bmFtZRodIXJ1bGVzLmhvc3RuYW1lIHx8IHRoaXMgIT0gJydIABLHAQoCaXAYDiABKAhCuAHCSLQBClUKCXN0cmluZy5pcBIgdmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQIGFkZHJlc3MaJiFydWxlcy5pcCB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcCgpClsKD3N0cmluZy5pcF9lbXB0eRIvdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQIGFkZHJlc3MaFyFydWxlcy5pcCB8fCB0aGlzICE9ICcnSAAS1gEKBGlwdjQYDyABKAhCxQHCSMEBClwKC3N0cmluZy5pcHY0EiJ2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVB2NCBhZGRyZXNzGikhcnVsZXMuaXB2NCB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcCg0KQphChFzdHJpbmcuaXB2NF9lbXB0eRIxdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjQgYWRkcmVzcxoZIXJ1bGVzLmlwdjQgfHwgdGhpcyAhPSAnJ0gAEtYBCgRpcHY2GBAgASgIQsUBwkjBAQpcCgtzdHJpbmcuaXB2NhIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgYWRkcmVzcxopIXJ1bGVzLmlwdjYgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXAoNikKYQoRc3RyaW5nLmlwdjZfZW1wdHkSMXZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY2IGFkZHJlc3MaGSFydWxlcy5pcHY2IHx8IHRoaXMgIT0gJydIABK/AQoDdXJpGBEgASgIQq8BwkirAQpRCgpzdHJpbmcudXJpEhl2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgVVJJGighcnVsZXMudXJpIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc1VyaSgpClYKEHN0cmluZy51cmlfZW1wdHkSKHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBVUkkaGCFydWxlcy51cmkgfHwgdGhpcyAhPSAnJ0gAEnAKB3VyaV9yZWYYEiABKAhCXcJIWgpYCg5zdHJpbmcudXJpX3JlZhIjdmFsdWUgbXVzdCBiZSBhIHZhbGlkIFVSSSBSZWZlcmVuY2UaISFydWxlcy51cmlfcmVmIHx8IHRoaXMuaXNVcmlSZWYoKUgAEpACCgdhZGRyZXNzGBUgASgIQvwBwkj4AQqBAQoOc3RyaW5nLmFkZHJlc3MSLXZhbHVlIG11c3QgYmUgYSB2YWxpZCBob3N0bmFtZSwgb3IgaXAgYWRkcmVzcxpAIXJ1bGVzLmFkZHJlc3MgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSG9zdG5hbWUoKSB8fCB0aGlzLmlzSXAoKQpyChRzdHJpbmcuYWRkcmVzc19lbXB0eRI8dmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIGhvc3RuYW1lLCBvciBpcCBhZGRyZXNzGhwhcnVsZXMuYWRkcmVzcyB8fCB0aGlzICE9ICcnSAASmAIKBHV1aWQYFiABKAhChwLCSIMCCqUBCgtzdHJpbmcudXVpZBIadmFsdWUgbXVzdCBiZSBhIHZhbGlkIFVVSUQaeiFydWxlcy51dWlkIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5tYXRjaGVzKCdeWzAtOWEtZkEtRl17OH0tWzAtOWEtZkEtRl17NH0tWzAtOWEtZkEtRl17NH0tWzAtOWEtZkEtRl17NH0tWzAtOWEtZkEtRl17MTJ9JCcpClkKEXN0cmluZy51dWlkX2VtcHR5Eil2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgVVVJRBoZIXJ1bGVzLnV1aWQgfHwgdGhpcyAhPSAnJ0gAEvABCgV0dXVpZBghIAEoCELeAcJI2gEKcwoMc3RyaW5nLnR1dWlkEiJ2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgdHJpbW1lZCBVVUlEGj8hcnVsZXMudHV1aWQgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLm1hdGNoZXMoJ15bMC05YS1mQS1GXXszMn0kJykKYwoSc3RyaW5nLnR1dWlkX2VtcHR5EjF2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgdHJpbW1lZCBVVUlEGhohcnVsZXMudHV1aWQgfHwgdGhpcyAhPSAnJ0gAEpYCChFpcF93aXRoX3ByZWZpeGxlbhgaIAEoCEL4AcJI9AEKeAoYc3RyaW5nLmlwX3dpdGhfcHJlZml4bGVuEh92YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVAgcHJlZml4GjshcnVsZXMuaXBfd2l0aF9wcmVmaXhsZW4gfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXBQcmVmaXgoKQp4Ch5zdHJpbmcuaXBfd2l0aF9wcmVmaXhsZW5fZW1wdHkSLnZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUCBwcmVmaXgaJiFydWxlcy5pcF93aXRoX3ByZWZpeGxlbiB8fCB0aGlzICE9ICcnSAASzwIKE2lwdjRfd2l0aF9wcmVmaXhsZW4YGyABKAhCrwLCSKsCCpMBChpzdHJpbmcuaXB2NF93aXRoX3ByZWZpeGxlbhI1dmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjQgYWRkcmVzcyB3aXRoIHByZWZpeCBsZW5ndGgaPiFydWxlcy5pcHY0X3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KDQpCpIBCiBzdHJpbmcuaXB2NF93aXRoX3ByZWZpeGxlbl9lbXB0eRJEdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjQgYWRkcmVzcyB3aXRoIHByZWZpeCBsZW5ndGgaKCFydWxlcy5pcHY0X3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgIT0gJydIABLPAgoTaXB2Nl93aXRoX3ByZWZpeGxlbhgcIAEoCEKvAsJIqwIKkwEKGnN0cmluZy5pcHY2X3dpdGhfcHJlZml4bGVuEjV2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVB2NiBhZGRyZXNzIHdpdGggcHJlZml4IGxlbmd0aBo+IXJ1bGVzLmlwdjZfd2l0aF9wcmVmaXhsZW4gfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXBQcmVmaXgoNikKkgEKIHN0cmluZy5pcHY2X3dpdGhfcHJlZml4bGVuX2VtcHR5EkR2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NiBhZGRyZXNzIHdpdGggcHJlZml4IGxlbmd0aBooIXJ1bGVzLmlwdjZfd2l0aF9wcmVmaXhsZW4gfHwgdGhpcyAhPSAnJ0gAEvIBCglpcF9wcmVmaXgYHSABKAhC3AHCSNgBCmwKEHN0cmluZy5pcF9wcmVmaXgSH3ZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUCBwcmVmaXgaNyFydWxlcy5pcF9wcmVmaXggfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXBQcmVmaXgodHJ1ZSkKaAoWc3RyaW5nLmlwX3ByZWZpeF9lbXB0eRIudmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQIHByZWZpeBoeIXJ1bGVzLmlwX3ByZWZpeCB8fCB0aGlzICE9ICcnSAASgwIKC2lwdjRfcHJlZml4GB4gASgIQusBwkjnAQp1ChJzdHJpbmcuaXB2NF9wcmVmaXgSIXZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY0IHByZWZpeBo8IXJ1bGVzLmlwdjRfcHJlZml4IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KDQsIHRydWUpCm4KGHN0cmluZy5pcHY0X3ByZWZpeF9lbXB0eRIwdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjQgcHJlZml4GiAhcnVsZXMuaXB2NF9wcmVmaXggfHwgdGhpcyAhPSAnJ0gAEoMCCgtpcHY2X3ByZWZpeBgfIAEoCELrAcJI5wEKdQoSc3RyaW5nLmlwdjZfcHJlZml4EiF2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVB2NiBwcmVmaXgaPCFydWxlcy5pcHY2X3ByZWZpeCB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcFByZWZpeCg2LCB0cnVlKQpuChhzdHJpbmcuaXB2Nl9wcmVmaXhfZW1wdHkSMHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY2IHByZWZpeBogIXJ1bGVzLmlwdjZfcHJlZml4IHx8IHRoaXMgIT0gJydIABK1AgoNaG9zdF9hbmRfcG9ydBggIAEoCEKbAsJIlwIKmQEKFHN0cmluZy5ob3N0X2FuZF9wb3J0EkF2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaG9zdCAoaG9zdG5hbWUgb3IgSVAgYWRkcmVzcykgYW5kIHBvcnQgcGFpcho+IXJ1bGVzLmhvc3RfYW5kX3BvcnQgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSG9zdEFuZFBvcnQodHJ1ZSkKeQoac3RyaW5nLmhvc3RfYW5kX3BvcnRfZW1wdHkSN3ZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBob3N0IGFuZCBwb3J0IHBhaXIaIiFydWxlcy5ob3N0X2FuZF9wb3J0IHx8IHRoaXMgIT0gJydIABKoBQoQd2VsbF9rbm93bl9yZWdleBgYIAEoDjIYLmJ1Zi52YWxpZGF0ZS5Lbm93blJlZ2V4QvEEwkjtBArwAQojc3RyaW5nLndlbGxfa25vd25fcmVnZXguaGVhZGVyX25hbWUSJnZhbHVlIG11c3QgYmUgYSB2YWxpZCBIVFRQIGhlYWRlciBuYW1lGqABcnVsZXMud2VsbF9rbm93bl9yZWdleCAhPSAxIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5tYXRjaGVzKCFoYXMocnVsZXMuc3RyaWN0KSB8fCBydWxlcy5zdHJpY3QgPydeOj9bMC05YS16QS1aISMkJSZcJyorLS5eX3x+XHg2MF0rJCcgOideW15cdTAwMDBcdTAwMEFcdTAwMERdKyQnKQqNAQopc3RyaW5nLndlbGxfa25vd25fcmVnZXguaGVhZGVyX25hbWVfZW1wdHkSNXZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBIVFRQIGhlYWRlciBuYW1lGilydWxlcy53ZWxsX2tub3duX3JlZ2V4ICE9IDEgfHwgdGhpcyAhPSAnJwrnAQokc3RyaW5nLndlbGxfa25vd25fcmVnZXguaGVhZGVyX3ZhbHVlEid2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSFRUUCBoZWFkZXIgdmFsdWUalQFydWxlcy53ZWxsX2tub3duX3JlZ2V4ICE9IDIgfHwgdGhpcy5tYXRjaGVzKCFoYXMocnVsZXMuc3RyaWN0KSB8fCBydWxlcy5zdHJpY3QgPydeW15cdTAwMDAtXHUwMDA4XHUwMDBBLVx1MDAxRlx1MDA3Rl0qJCcgOideW15cdTAwMDBcdTAwMEFcdTAwMERdKiQnKUgAEg4KBnN0cmljdBgZIAEoCBIsCgdleGFtcGxlGCIgAygJQhvCSBgKFgoOc3RyaW5nLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkIMCgp3ZWxsX2tub3duIuoQCgpCeXRlc1J1bGVzEoABCgVjb25zdBgBIAEoDEJxwkhuCmwKC2J5dGVzLmNvbnN0Gl10aGlzICE9IGdldEZpZWxkKHJ1bGVzLCAnY29uc3QnKSA/ICd2YWx1ZSBtdXN0IGJlICV4Jy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnY29uc3QnKV0pIDogJycSeAoDbGVuGA0gASgEQmvCSGgKZgoJYnl0ZXMubGVuGll1aW50KHRoaXMuc2l6ZSgpKSAhPSBydWxlcy5sZW4gPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubGVuXSkgOiAnJxKQAQoHbWluX2xlbhgCIAEoBEJ/wkh8CnoKDWJ5dGVzLm1pbl9sZW4aaXVpbnQodGhpcy5zaXplKCkpIDwgcnVsZXMubWluX2xlbiA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSBhdCBsZWFzdCAlcyBieXRlcycuZm9ybWF0KFtydWxlcy5taW5fbGVuXSkgOiAnJxKIAQoHbWF4X2xlbhgDIAEoBEJ3wkh0CnIKDWJ5dGVzLm1heF9sZW4aYXVpbnQodGhpcy5zaXplKCkpID4gcnVsZXMubWF4X2xlbiA/ICd2YWx1ZSBtdXN0IGJlIGF0IG1vc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWF4X2xlbl0pIDogJycSkAEKB3BhdHRlcm4YBCABKAlCf8JIfAp6Cg1ieXRlcy5wYXR0ZXJuGmkhc3RyaW5nKHRoaXMpLm1hdGNoZXMocnVsZXMucGF0dGVybikgPyAndmFsdWUgbXVzdCBtYXRjaCByZWdleCBwYXR0ZXJuIGAlc2AnLmZvcm1hdChbcnVsZXMucGF0dGVybl0pIDogJycSgQEKBnByZWZpeBgFIAEoDEJxwkhuCmwKDGJ5dGVzLnByZWZpeBpcIXRoaXMuc3RhcnRzV2l0aChydWxlcy5wcmVmaXgpID8gJ3ZhbHVlIGRvZXMgbm90IGhhdmUgcHJlZml4ICV4Jy5mb3JtYXQoW3J1bGVzLnByZWZpeF0pIDogJycSfwoGc3VmZml4GAYgASgMQm/CSGwKagoMYnl0ZXMuc3VmZml4GlohdGhpcy5lbmRzV2l0aChydWxlcy5zdWZmaXgpID8gJ3ZhbHVlIGRvZXMgbm90IGhhdmUgc3VmZml4ICV4Jy5mb3JtYXQoW3J1bGVzLnN1ZmZpeF0pIDogJycSgwEKCGNvbnRhaW5zGAcgASgMQnHCSG4KbAoOYnl0ZXMuY29udGFpbnMaWiF0aGlzLmNvbnRhaW5zKHJ1bGVzLmNvbnRhaW5zKSA/ICd2YWx1ZSBkb2VzIG5vdCBjb250YWluICV4Jy5mb3JtYXQoW3J1bGVzLmNvbnRhaW5zXSkgOiAnJxKnAQoCaW4YCCADKAxCmgHCSJYBCpMBCghieXRlcy5pbhqGAWdldEZpZWxkKHJ1bGVzLCAnaW4nKS5zaXplKCkgPiAwICYmICEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEnYKBm5vdF9pbhgJIAMoDEJmwkhjCmEKDGJ5dGVzLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEusBCgJpcBgKIAEoCELcAcJI2AEKdAoIYnl0ZXMuaXASIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUCBhZGRyZXNzGkYhcnVsZXMuaXAgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSA0IHx8IHRoaXMuc2l6ZSgpID09IDE2CmAKDmJ5dGVzLmlwX2VtcHR5Ei92YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVAgYWRkcmVzcxodIXJ1bGVzLmlwIHx8IHRoaXMuc2l6ZSgpICE9IDBIABLkAQoEaXB2NBgLIAEoCELTAcJIzwEKZQoKYnl0ZXMuaXB2NBIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjQgYWRkcmVzcxozIXJ1bGVzLmlwdjQgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSA0CmYKEGJ5dGVzLmlwdjRfZW1wdHkSMXZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IGFkZHJlc3MaHyFydWxlcy5pcHY0IHx8IHRoaXMuc2l6ZSgpICE9IDBIABLlAQoEaXB2NhgMIAEoCELUAcJI0AEKZgoKYnl0ZXMuaXB2NhIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgYWRkcmVzcxo0IXJ1bGVzLmlwdjYgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSAxNgpmChBieXRlcy5pcHY2X2VtcHR5EjF2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NiBhZGRyZXNzGh8hcnVsZXMuaXB2NiB8fCB0aGlzLnNpemUoKSAhPSAwSAASKwoHZXhhbXBsZRgOIAMoDEIawkgXChUKDWJ5dGVzLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkIMCgp3ZWxsX2tub3duItQDCglFbnVtUnVsZXMSggEKBWNvbnN0GAEgASgFQnPCSHAKbgoKZW51bS5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEhQKDGRlZmluZWRfb25seRgCIAEoCBJ+CgJpbhgDIAMoBUJywkhvCm0KB2VudW0uaW4aYiEodGhpcyBpbiBnZXRGaWVsZChydWxlcywgJ2luJykpID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2luJyldKSA6ICcnEnUKBm5vdF9pbhgEIAMoBUJlwkhiCmAKC2VudW0ubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSKgoHZXhhbXBsZRgFIAMoBUIZwkgWChQKDGVudW0uZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACIvsDCg1SZXBlYXRlZFJ1bGVzEp4BCgltaW5faXRlbXMYASABKARCigHCSIYBCoMBChJyZXBlYXRlZC5taW5faXRlbXMabXVpbnQodGhpcy5zaXplKCkpIDwgcnVsZXMubWluX2l0ZW1zID8gJ3ZhbHVlIG11c3QgY29udGFpbiBhdCBsZWFzdCAlZCBpdGVtKHMpJy5mb3JtYXQoW3J1bGVzLm1pbl9pdGVtc10pIDogJycSogEKCW1heF9pdGVtcxgCIAEoBEKOAcJIigEKhwEKEnJlcGVhdGVkLm1heF9pdGVtcxpxdWludCh0aGlzLnNpemUoKSkgPiBydWxlcy5tYXhfaXRlbXMgPyAndmFsdWUgbXVzdCBjb250YWluIG5vIG1vcmUgdGhhbiAlcyBpdGVtKHMpJy5mb3JtYXQoW3J1bGVzLm1heF9pdGVtc10pIDogJycScAoGdW5pcXVlGAMgASgIQmDCSF0KWwoPcmVwZWF0ZWQudW5pcXVlEihyZXBlYXRlZCB2YWx1ZSBtdXN0IGNvbnRhaW4gdW5pcXVlIGl0ZW1zGh4hcnVsZXMudW5pcXVlIHx8IHRoaXMudW5pcXVlKCkSJwoFaXRlbXMYBCABKAsyGC5idWYudmFsaWRhdGUuRmllbGRSdWxlcyoJCOgHEICAgIACIooDCghNYXBSdWxlcxKPAQoJbWluX3BhaXJzGAEgASgEQnzCSHkKdwoNbWFwLm1pbl9wYWlycxpmdWludCh0aGlzLnNpemUoKSkgPCBydWxlcy5taW5fcGFpcnMgPyAnbWFwIG11c3QgYmUgYXQgbGVhc3QgJWQgZW50cmllcycuZm9ybWF0KFtydWxlcy5taW5fcGFpcnNdKSA6ICcnEo4BCgltYXhfcGFpcnMYAiABKARCe8JIeAp2Cg1tYXAubWF4X3BhaXJzGmV1aW50KHRoaXMuc2l6ZSgpKSA+IHJ1bGVzLm1heF9wYWlycyA/ICdtYXAgbXVzdCBiZSBhdCBtb3N0ICVkIGVudHJpZXMnLmZvcm1hdChbcnVsZXMubWF4X3BhaXJzXSkgOiAnJxImCgRrZXlzGAQgASgLMhguYnVmLnZhbGlkYXRlLkZpZWxkUnVsZXMSKAoGdmFsdWVzGAUgASgLMhguYnVmLnZhbGlkYXRlLkZpZWxkUnVsZXMqCQjoBxCAgICAAiImCghBbnlSdWxlcxIKCgJpbhgCIAMoCRIOCgZub3RfaW4YAyADKAkimRcKDUR1cmF0aW9uUnVsZXMSoQEKBWNvbnN0GAIgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQnfCSHQKcgoOZHVyYXRpb24uY29uc3QaYHRoaXMgIT0gZ2V0RmllbGQocnVsZXMsICdjb25zdCcpID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbZ2V0RmllbGQocnVsZXMsICdjb25zdCcpXSkgOiAnJxKoAQoCbHQYAyABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25Cf8JIfAp6CgtkdXJhdGlvbi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABK6AQoDbHRlGAQgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQo8BwkiLAQqIAQoMZHVyYXRpb24ubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABLBBwoCZ3QYBSABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25ClwfCSJMHCn0KC2R1cmF0aW9uLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq2AQoOZHVyYXRpb24uZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr4BChhkdXJhdGlvbi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrGAQoPZHVyYXRpb24uZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrOAQoZZHVyYXRpb24uZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESjQgKA2d0ZRgGIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkLiB8JI3gcKiwEKDGR1cmF0aW9uLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsUBCg9kdXJhdGlvbi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzQEKGWR1cmF0aW9uLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtUBChBkdXJhdGlvbi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCt0BChpkdXJhdGlvbi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKdAQoCaW4YByADKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CdsJIcwpxCgtkdXJhdGlvbi5pbhpiISh0aGlzIGluIGdldEZpZWxkKHJ1bGVzLCAnaW4nKSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2dldEZpZWxkKHJ1bGVzLCAnaW4nKV0pIDogJycSlAEKBm5vdF9pbhgIIAMoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkJpwkhmCmQKD2R1cmF0aW9uLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEkkKB2V4YW1wbGUYCSADKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CHcJIGgoYChBkdXJhdGlvbi5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiKSGAoOVGltZXN0YW1wUnVsZXMSowEKBWNvbnN0GAIgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcEJ4wkh1CnMKD3RpbWVzdGFtcC5jb25zdBpgdGhpcyAhPSBnZXRGaWVsZChydWxlcywgJ2NvbnN0JykgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtnZXRGaWVsZChydWxlcywgJ2NvbnN0JyldKSA6ICcnEqsBCgJsdBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBCgAHCSH0KewoMdGltZXN0YW1wLmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAErwBCgNsdGUYBCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQpABwkiMAQqJAQoNdGltZXN0YW1wLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASbAoGbHRfbm93GAcgASgIQlrCSFcKVQoQdGltZXN0YW1wLmx0X25vdxpBKHJ1bGVzLmx0X25vdyAmJiB0aGlzID4gbm93KSA/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBub3cnIDogJydIABLHBwoCZ3QYBSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQpwHwkiYBwp+Cgx0aW1lc3RhbXAuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrcBCg90aW1lc3RhbXAuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr8BChl0aW1lc3RhbXAuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxwEKEHRpbWVzdGFtcC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCs8BChp0aW1lc3RhbXAuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESkwgKA2d0ZRgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBC5wfCSOMHCowBCg10aW1lc3RhbXAuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxgEKEHRpbWVzdGFtcC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzgEKGnRpbWVzdGFtcC5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrWAQoRdGltZXN0YW1wLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3gEKG3RpbWVzdGFtcC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJvCgZndF9ub3cYCCABKAhCXcJIWgpYChB0aW1lc3RhbXAuZ3Rfbm93GkQocnVsZXMuZ3Rfbm93ICYmIHRoaXMgPCBub3cpID8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG5vdycgOiAnJ0gBErgBCgZ3aXRoaW4YCSABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CjAHCSIgBCoUBChB0aW1lc3RhbXAud2l0aGluGnF0aGlzIDwgbm93LXJ1bGVzLndpdGhpbiB8fCB0aGlzID4gbm93K3J1bGVzLndpdGhpbiA/ICd2YWx1ZSBtdXN0IGJlIHdpdGhpbiAlcyBvZiBub3cnLmZvcm1hdChbcnVsZXMud2l0aGluXSkgOiAnJxJLCgdleGFtcGxlGAogAygLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcEIewkgbChkKEXRpbWVzdGFtcC5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiI5CgpWaW9sYXRpb25zEisKCnZpb2xhdGlvbnMYASADKAsyFy5idWYudmFsaWRhdGUuVmlvbGF0aW9uIp8BCglWaW9sYXRpb24SJgoFZmllbGQYBSABKAsyFy5idWYudmFsaWRhdGUuRmllbGRQYXRoEiUKBHJ1bGUYBiABKAsyFy5idWYudmFsaWRhdGUuRmllbGRQYXRoEg8KB3J1bGVfaWQYAiABKAkSDwoHbWVzc2FnZRgDIAEoCRIPCgdmb3Jfa2V5GAQgASgISgQIARACUgpmaWVsZF9wYXRoIj0KCUZpZWxkUGF0aBIwCghlbGVtZW50cxgBIAMoCzIeLmJ1Zi52YWxpZGF0ZS5GaWVsZFBhdGhFbGVtZW50IukCChBGaWVsZFBhdGhFbGVtZW50EhQKDGZpZWxkX251bWJlchgBIAEoBRISCgpmaWVsZF9uYW1lGAIgASgJEj4KCmZpZWxkX3R5cGUYAyABKA4yKi5nb29nbGUucHJvdG9idWYuRmllbGREZXNjcmlwdG9yUHJvdG8uVHlwZRI8CghrZXlfdHlwZRgEIAEoDjIqLmdvb2dsZS5wcm90b2J1Zi5GaWVsZERlc2NyaXB0b3JQcm90by5UeXBlEj4KCnZhbHVlX3R5cGUYBSABKA4yKi5nb29nbGUucHJvdG9idWYuRmllbGREZXNjcmlwdG9yUHJvdG8uVHlwZRIPCgVpbmRleBgGIAEoBEgAEhIKCGJvb2xfa2V5GAcgASgISAASEQoHaW50X2tleRgIIAEoA0gAEhIKCHVpbnRfa2V5GAkgASgESAASFAoKc3RyaW5nX2tleRgKIAEoCUgAQgsKCXN1YnNjcmlwdCqhAQoGSWdub3JlEhYKEklHTk9SRV9VTlNQRUNJRklFRBAAEhgKFElHTk9SRV9JRl9aRVJPX1ZBTFVFEAESEQoNSUdOT1JFX0FMV0FZUxADIgQIAhACKgxJR05PUkVfRU1QVFkqDklHTk9SRV9ERUZBVUxUKhdJR05PUkVfSUZfREVGQVVMVF9WQUxVRSoVSUdOT1JFX0lGX1VOUE9QVUxBVEVEKm4KCktub3duUmVnZXgSGwoXS05PV05fUkVHRVhfVU5TUEVDSUZJRUQQABIgChxLTk9XTl9SRUdFWF9IVFRQX0hFQURFUl9OQU1FEAESIQodS05PV05fUkVHRVhfSFRUUF9IRUFERVJfVkFMVUUQAjpWCgdtZXNzYWdlEh8uZ29vZ2xlLnByb3RvYnVmLk1lc3NhZ2VPcHRpb25zGIcJIAEoCzIaLmJ1Zi52YWxpZGF0ZS5NZXNzYWdlUnVsZXNSB21lc3NhZ2U6TgoFb25lb2YSHS5nb29nbGUucHJvdG9idWYuT25lb2ZPcHRpb25zGIcJIAEoCzIYLmJ1Zi52YWxpZGF0ZS5PbmVvZlJ1bGVzUgVvbmVvZjpOCgVmaWVsZBIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMYhwkgASgLMhguYnVmLnZhbGlkYXRlLkZpZWxkUnVsZXNSBWZpZWxkOl0KCnByZWRlZmluZWQSHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGIgJIAEoCzIdLmJ1Zi52YWxpZGF0ZS5QcmVkZWZpbmVkUnVsZXNSCnByZWRlZmluZWRCbgoSYnVpbGQuYnVmLnZhbGlkYXRlQg1WYWxpZGF0ZVByb3RvUAFaR2J1Zi5idWlsZC9nZW4vZ28vYnVmYnVpbGQvcHJvdG92YWxpZGF0ZS9wcm90b2NvbGJ1ZmZlcnMvZ28vYnVmL3ZhbGlkYXRl", [file_google_protobuf_descriptor, file_google_protobuf_duration, file_google_protobuf_timestamp]);

// node_modules/@buf/googleapis_googleapis.bufbuild_es/google/api/resource_pb.js
var file_google_api_resource = /* @__PURE__ */ fileDesc("Chlnb29nbGUvYXBpL3Jlc291cmNlLnByb3RvEgpnb29nbGUuYXBpIu4CChJSZXNvdXJjZURlc2NyaXB0b3ISDAoEdHlwZRgBIAEoCRIPCgdwYXR0ZXJuGAIgAygJEhIKCm5hbWVfZmllbGQYAyABKAkSNwoHaGlzdG9yeRgEIAEoDjImLmdvb2dsZS5hcGkuUmVzb3VyY2VEZXNjcmlwdG9yLkhpc3RvcnkSDgoGcGx1cmFsGAUgASgJEhAKCHNpbmd1bGFyGAYgASgJEjMKBXN0eWxlGAogAygOMiQuZ29vZ2xlLmFwaS5SZXNvdXJjZURlc2NyaXB0b3IuU3R5bGUiWwoHSGlzdG9yeRIXChNISVNUT1JZX1VOU1BFQ0lGSUVEEAASHQoZT1JJR0lOQUxMWV9TSU5HTEVfUEFUVEVSThABEhgKFEZVVFVSRV9NVUxUSV9QQVRURVJOEAIiOAoFU3R5bGUSFQoRU1RZTEVfVU5TUEVDSUZJRUQQABIYChRERUNMQVJBVElWRV9GUklFTkRMWRABIjUKEVJlc291cmNlUmVmZXJlbmNlEgwKBHR5cGUYASABKAkSEgoKY2hpbGRfdHlwZRgCIAEoCTpsChJyZXNvdXJjZV9yZWZlcmVuY2USHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGJ8IIAEoCzIdLmdvb2dsZS5hcGkuUmVzb3VyY2VSZWZlcmVuY2VSEXJlc291cmNlUmVmZXJlbmNlOm4KE3Jlc291cmNlX2RlZmluaXRpb24SHC5nb29nbGUucHJvdG9idWYuRmlsZU9wdGlvbnMYnQggAygLMh4uZ29vZ2xlLmFwaS5SZXNvdXJjZURlc2NyaXB0b3JSEnJlc291cmNlRGVmaW5pdGlvbjpcCghyZXNvdXJjZRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxidCCABKAsyHi5nb29nbGUuYXBpLlJlc291cmNlRGVzY3JpcHRvclIIcmVzb3VyY2VCawoOY29tLmdvb2dsZS5hcGlCDVJlc291cmNlUHJvdG9QAVpBZ29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy9hcGkvYW5ub3RhdGlvbnM7YW5ub3RhdGlvbnOiAgRHQVBJYgZwcm90bzM", [file_google_protobuf_descriptor]);

// node_modules/@buf/googleapis_googleapis.bufbuild_es/google/type/dayofweek_pb.js
var file_google_type_dayofweek = /* @__PURE__ */ fileDesc("Chtnb29nbGUvdHlwZS9kYXlvZndlZWsucHJvdG8SC2dvb2dsZS50eXBlKoQBCglEYXlPZldlZWsSGwoXREFZX09GX1dFRUtfVU5TUEVDSUZJRUQQABIKCgZNT05EQVkQARILCgdUVUVTREFZEAISDQoJV0VETkVTREFZEAMSDAoIVEhVUlNEQVkQBBIKCgZGUklEQVkQBRIMCghTQVRVUkRBWRAGEgoKBlNVTkRBWRAHQmkKD2NvbS5nb29nbGUudHlwZUIORGF5T2ZXZWVrUHJvdG9QAVo+Z29vZ2xlLmdvbGFuZy5vcmcvZ2VucHJvdG8vZ29vZ2xlYXBpcy90eXBlL2RheW9md2VlaztkYXlvZndlZWuiAgNHVFBiBnByb3RvMw");

// node_modules/@buf/grpc-ecosystem_grpc-gateway.bufbuild_es/protoc-gen-openapiv2/options/openapiv2_pb.js
var file_protoc_gen_openapiv2_options_openapiv22 = /* @__PURE__ */ fileDesc("Cixwcm90b2MtZ2VuLW9wZW5hcGl2Mi9vcHRpb25zL29wZW5hcGl2Mi5wcm90bxIpZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMilQcKB1N3YWdnZXISDwoHc3dhZ2dlchgBIAEoCRI9CgRpbmZvGAIgASgLMi8uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSW5mbxIMCgRob3N0GAMgASgJEhEKCWJhc2VfcGF0aBgEIAEoCRJCCgdzY2hlbWVzGAUgAygOMjEuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2NoZW1lEhAKCGNvbnN1bWVzGAYgAygJEhAKCHByb2R1Y2VzGAcgAygJElQKCXJlc3BvbnNlcxgKIAMoCzJBLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlN3YWdnZXIuUmVzcG9uc2VzRW50cnkSXAoUc2VjdXJpdHlfZGVmaW5pdGlvbnMYCyABKAsyPi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5TZWN1cml0eURlZmluaXRpb25zElAKCHNlY3VyaXR5GAwgAygLMj4uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlSZXF1aXJlbWVudBI8CgR0YWdzGA0gAygLMi4uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuVGFnElcKDWV4dGVybmFsX2RvY3MYDiABKAsyQC5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5FeHRlcm5hbERvY3VtZW50YXRpb24SVgoKZXh0ZW5zaW9ucxgPIAMoCzJCLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlN3YWdnZXIuRXh0ZW5zaW9uc0VudHJ5GmUKDlJlc3BvbnNlc0VudHJ5EgsKA2tleRgBIAEoCRJCCgV2YWx1ZRgCIAEoCzIzLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlJlc3BvbnNlOgI4ARpJCg9FeHRlbnNpb25zRW50cnkSCwoDa2V5GAEgASgJEiUKBXZhbHVlGAIgASgLMhYuZ29vZ2xlLnByb3RvYnVmLlZhbHVlOgI4AUoECAgQCUoECAkQCiKxBgoJT3BlcmF0aW9uEgwKBHRhZ3MYASADKAkSDwoHc3VtbWFyeRgCIAEoCRITCgtkZXNjcmlwdGlvbhgDIAEoCRJXCg1leHRlcm5hbF9kb2NzGAQgASgLMkAuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuRXh0ZXJuYWxEb2N1bWVudGF0aW9uEhQKDG9wZXJhdGlvbl9pZBgFIAEoCRIQCghjb25zdW1lcxgGIAMoCRIQCghwcm9kdWNlcxgHIAMoCRJWCglyZXNwb25zZXMYCSADKAsyQy5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5PcGVyYXRpb24uUmVzcG9uc2VzRW50cnkSQgoHc2NoZW1lcxgKIAMoDjIxLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNjaGVtZRISCgpkZXByZWNhdGVkGAsgASgIElAKCHNlY3VyaXR5GAwgAygLMj4uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlSZXF1aXJlbWVudBJYCgpleHRlbnNpb25zGA0gAygLMkQuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuT3BlcmF0aW9uLkV4dGVuc2lvbnNFbnRyeRJJCgpwYXJhbWV0ZXJzGA4gASgLMjUuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuUGFyYW1ldGVycxplCg5SZXNwb25zZXNFbnRyeRILCgNrZXkYASABKAkSQgoFdmFsdWUYAiABKAsyMy5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5SZXNwb25zZToCOAEaSQoPRXh0ZW5zaW9uc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAFKBAgIEAkiWQoKUGFyYW1ldGVycxJLCgdoZWFkZXJzGAEgAygLMjouZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSGVhZGVyUGFyYW1ldGVyIvgBCg9IZWFkZXJQYXJhbWV0ZXISDAoEbmFtZRgBIAEoCRITCgtkZXNjcmlwdGlvbhgCIAEoCRJNCgR0eXBlGAMgASgOMj8uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSGVhZGVyUGFyYW1ldGVyLlR5cGUSDgoGZm9ybWF0GAQgASgJEhAKCHJlcXVpcmVkGAUgASgIIkUKBFR5cGUSCwoHVU5LTk9XThAAEgoKBlNUUklORxABEgoKBk5VTUJFUhACEgsKB0lOVEVHRVIQAxILCgdCT09MRUFOEARKBAgGEAdKBAgHEAgiqwEKBkhlYWRlchITCgtkZXNjcmlwdGlvbhgBIAEoCRIMCgR0eXBlGAIgASgJEg4KBmZvcm1hdBgDIAEoCRIPCgdkZWZhdWx0GAYgASgJEg8KB3BhdHRlcm4YDSABKAlKBAgEEAVKBAgFEAZKBAgHEAhKBAgIEAlKBAgJEApKBAgKEAtKBAgLEAxKBAgMEA1KBAgOEA9KBAgPEBBKBAgQEBFKBAgREBJKBAgSEBMiwgQKCFJlc3BvbnNlEhMKC2Rlc2NyaXB0aW9uGAEgASgJEkEKBnNjaGVtYRgCIAEoCzIxLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNjaGVtYRJRCgdoZWFkZXJzGAMgAygLMkAuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuUmVzcG9uc2UuSGVhZGVyc0VudHJ5ElMKCGV4YW1wbGVzGAQgAygLMkEuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuUmVzcG9uc2UuRXhhbXBsZXNFbnRyeRJXCgpleHRlbnNpb25zGAUgAygLMkMuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuUmVzcG9uc2UuRXh0ZW5zaW9uc0VudHJ5GmEKDEhlYWRlcnNFbnRyeRILCgNrZXkYASABKAkSQAoFdmFsdWUYAiABKAsyMS5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5IZWFkZXI6AjgBGi8KDUV4YW1wbGVzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARpJCg9FeHRlbnNpb25zRW50cnkSCwoDa2V5GAEgASgJEiUKBXZhbHVlGAIgASgLMhYuZ29vZ2xlLnByb3RvYnVmLlZhbHVlOgI4ASL/AgoESW5mbxINCgV0aXRsZRgBIAEoCRITCgtkZXNjcmlwdGlvbhgCIAEoCRIYChB0ZXJtc19vZl9zZXJ2aWNlGAMgASgJEkMKB2NvbnRhY3QYBCABKAsyMi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5Db250YWN0EkMKB2xpY2Vuc2UYBSABKAsyMi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5MaWNlbnNlEg8KB3ZlcnNpb24YBiABKAkSUwoKZXh0ZW5zaW9ucxgHIAMoCzI/LmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLkluZm8uRXh0ZW5zaW9uc0VudHJ5GkkKD0V4dGVuc2lvbnNFbnRyeRILCgNrZXkYASABKAkSJQoFdmFsdWUYAiABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWU6AjgBIjMKB0NvbnRhY3QSDAoEbmFtZRgBIAEoCRILCgN1cmwYAiABKAkSDQoFZW1haWwYAyABKAkiJAoHTGljZW5zZRIMCgRuYW1lGAEgASgJEgsKA3VybBgCIAEoCSI5ChVFeHRlcm5hbERvY3VtZW50YXRpb24SEwoLZGVzY3JpcHRpb24YASABKAkSCwoDdXJsGAIgASgJIu4BCgZTY2hlbWESSgoLanNvbl9zY2hlbWEYASABKAsyNS5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5KU09OU2NoZW1hEhUKDWRpc2NyaW1pbmF0b3IYAiABKAkSEQoJcmVhZF9vbmx5GAMgASgIElcKDWV4dGVybmFsX2RvY3MYBSABKAsyQC5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5FeHRlcm5hbERvY3VtZW50YXRpb24SDwoHZXhhbXBsZRgGIAEoCUoECAQQBSKiCAoKSlNPTlNjaGVtYRILCgNyZWYYAyABKAkSDQoFdGl0bGUYBSABKAkSEwoLZGVzY3JpcHRpb24YBiABKAkSDwoHZGVmYXVsdBgHIAEoCRIRCglyZWFkX29ubHkYCCABKAgSDwoHZXhhbXBsZRgJIAEoCRITCgttdWx0aXBsZV9vZhgKIAEoARIPCgdtYXhpbXVtGAsgASgBEhkKEWV4Y2x1c2l2ZV9tYXhpbXVtGAwgASgIEg8KB21pbmltdW0YDSABKAESGQoRZXhjbHVzaXZlX21pbmltdW0YDiABKAgSEgoKbWF4X2xlbmd0aBgPIAEoBBISCgptaW5fbGVuZ3RoGBAgASgEEg8KB3BhdHRlcm4YESABKAkSEQoJbWF4X2l0ZW1zGBQgASgEEhEKCW1pbl9pdGVtcxgVIAEoBBIUCgx1bmlxdWVfaXRlbXMYFiABKAgSFgoObWF4X3Byb3BlcnRpZXMYGCABKAQSFgoObWluX3Byb3BlcnRpZXMYGSABKAQSEAoIcmVxdWlyZWQYGiADKAkSDQoFYXJyYXkYIiADKAkSWQoEdHlwZRgjIAMoDjJLLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLkpTT05TY2hlbWEuSlNPTlNjaGVtYVNpbXBsZVR5cGVzEg4KBmZvcm1hdBgkIAEoCRIMCgRlbnVtGC4gAygJEmYKE2ZpZWxkX2NvbmZpZ3VyYXRpb24Y6QcgASgLMkguZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSlNPTlNjaGVtYS5GaWVsZENvbmZpZ3VyYXRpb24SWQoKZXh0ZW5zaW9ucxgwIAMoCzJFLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLkpTT05TY2hlbWEuRXh0ZW5zaW9uc0VudHJ5Gi0KEkZpZWxkQ29uZmlndXJhdGlvbhIXCg9wYXRoX3BhcmFtX25hbWUYLyABKAkaSQoPRXh0ZW5zaW9uc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEidwoVSlNPTlNjaGVtYVNpbXBsZVR5cGVzEgsKB1VOS05PV04QABIJCgVBUlJBWRABEgsKB0JPT0xFQU4QAhILCgdJTlRFR0VSEAMSCAoETlVMTBAEEgoKBk5VTUJFUhAFEgoKBk9CSkVDVBAGEgoKBlNUUklORxAHSgQIARACSgQIAhADSgQIBBAFSgQIEhATSgQIExAUSgQIFxAYSgQIGxAcSgQIHBAdSgQIHRAeSgQIHhAiSgQIJRAqSgQIKhArSgQIKxAuIqACCgNUYWcSDAoEbmFtZRgBIAEoCRITCgtkZXNjcmlwdGlvbhgCIAEoCRJXCg1leHRlcm5hbF9kb2NzGAMgASgLMkAuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuRXh0ZXJuYWxEb2N1bWVudGF0aW9uElIKCmV4dGVuc2lvbnMYBCADKAsyPi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5UYWcuRXh0ZW5zaW9uc0VudHJ5GkkKD0V4dGVuc2lvbnNFbnRyeRILCgNrZXkYASABKAkSJQoFdmFsdWUYAiABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWU6AjgBIuEBChNTZWN1cml0eURlZmluaXRpb25zEl4KCHNlY3VyaXR5GAEgAygLMkwuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlEZWZpbml0aW9ucy5TZWN1cml0eUVudHJ5GmoKDVNlY3VyaXR5RW50cnkSCwoDa2V5GAEgASgJEkgKBXZhbHVlGAIgASgLMjkuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlTY2hlbWU6AjgBIqAGCg5TZWN1cml0eVNjaGVtZRJMCgR0eXBlGAEgASgOMj4uZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlTY2hlbWUuVHlwZRITCgtkZXNjcmlwdGlvbhgCIAEoCRIMCgRuYW1lGAMgASgJEkgKAmluGAQgASgOMjwuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlTY2hlbWUuSW4STAoEZmxvdxgFIAEoDjI+LmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNlY3VyaXR5U2NoZW1lLkZsb3cSGQoRYXV0aG9yaXphdGlvbl91cmwYBiABKAkSEQoJdG9rZW5fdXJsGAcgASgJEkEKBnNjb3BlcxgIIAEoCzIxLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNjb3BlcxJdCgpleHRlbnNpb25zGAkgAygLMkkuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuU2VjdXJpdHlTY2hlbWUuRXh0ZW5zaW9uc0VudHJ5GkkKD0V4dGVuc2lvbnNFbnRyeRILCgNrZXkYASABKAkSJQoFdmFsdWUYAiABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWU6AjgBIksKBFR5cGUSEAoMVFlQRV9JTlZBTElEEAASDgoKVFlQRV9CQVNJQxABEhAKDFRZUEVfQVBJX0tFWRACEg8KC1RZUEVfT0FVVEgyEAMiMQoCSW4SDgoKSU5fSU5WQUxJRBAAEgwKCElOX1FVRVJZEAESDQoJSU5fSEVBREVSEAIiagoERmxvdxIQCgxGTE9XX0lOVkFMSUQQABIRCg1GTE9XX0lNUExJQ0lUEAESEQoNRkxPV19QQVNTV09SRBACEhQKEEZMT1dfQVBQTElDQVRJT04QAxIUChBGTE9XX0FDQ0VTU19DT0RFEAQizQIKE1NlY3VyaXR5UmVxdWlyZW1lbnQSdQoUc2VjdXJpdHlfcmVxdWlyZW1lbnQYASADKAsyVy5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5TZWN1cml0eVJlcXVpcmVtZW50LlNlY3VyaXR5UmVxdWlyZW1lbnRFbnRyeRopChhTZWN1cml0eVJlcXVpcmVtZW50VmFsdWUSDQoFc2NvcGUYASADKAkakwEKGFNlY3VyaXR5UmVxdWlyZW1lbnRFbnRyeRILCgNrZXkYASABKAkSZgoFdmFsdWUYAiABKAsyVy5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5TZWN1cml0eVJlcXVpcmVtZW50LlNlY3VyaXR5UmVxdWlyZW1lbnRWYWx1ZToCOAEigwEKBlNjb3BlcxJLCgVzY29wZRgBIAMoCzI8LmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlNjb3Blcy5TY29wZUVudHJ5GiwKClNjb3BlRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ASo7CgZTY2hlbWUSCwoHVU5LTk9XThAAEggKBEhUVFAQARIJCgVIVFRQUxACEgYKAldTEAMSBwoDV1NTEARCSFpGZ2l0aHViLmNvbS9ncnBjLWVjb3N5c3RlbS9ncnBjLWdhdGV3YXkvdjIvcHJvdG9jLWdlbi1vcGVuYXBpdjIvb3B0aW9uc2IGcHJvdG8z", [file_google_protobuf_struct]);

// node_modules/@buf/grpc-ecosystem_grpc-gateway.bufbuild_es/protoc-gen-openapiv2/options/annotations_pb.js
var file_protoc_gen_openapiv2_options_annotations2 = /* @__PURE__ */ fileDesc("Ci5wcm90b2MtZ2VuLW9wZW5hcGl2Mi9vcHRpb25zL2Fubm90YXRpb25zLnByb3RvEilncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9uczp+ChFvcGVuYXBpdjJfc3dhZ2dlchIcLmdvb2dsZS5wcm90b2J1Zi5GaWxlT3B0aW9ucxiSCCABKAsyMi5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5Td2FnZ2VyUhBvcGVuYXBpdjJTd2FnZ2VyOoYBChNvcGVuYXBpdjJfb3BlcmF0aW9uEh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMYkgggASgLMjQuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuT3BlcmF0aW9uUhJvcGVuYXBpdjJPcGVyYXRpb246fgoQb3BlbmFwaXYyX3NjaGVtYRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxiSCCABKAsyMS5ncnBjLmdhdGV3YXkucHJvdG9jX2dlbl9vcGVuYXBpdjIub3B0aW9ucy5TY2hlbWFSD29wZW5hcGl2MlNjaGVtYTp1Cg1vcGVuYXBpdjJfdGFnEh8uZ29vZ2xlLnByb3RvYnVmLlNlcnZpY2VPcHRpb25zGJIIIAEoCzIuLmdycGMuZ2F0ZXdheS5wcm90b2NfZ2VuX29wZW5hcGl2Mi5vcHRpb25zLlRhZ1IMb3BlbmFwaXYyVGFnOn4KD29wZW5hcGl2Ml9maWVsZBIdLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE9wdGlvbnMYkgggASgLMjUuZ3JwYy5nYXRld2F5LnByb3RvY19nZW5fb3BlbmFwaXYyLm9wdGlvbnMuSlNPTlNjaGVtYVIOb3BlbmFwaXYyRmllbGRCSFpGZ2l0aHViLmNvbS9ncnBjLWVjb3N5c3RlbS9ncnBjLWdhdGV3YXkvdjIvcHJvdG9jLWdlbi1vcGVuYXBpdjIvb3B0aW9uc2IGcHJvdG8z", [file_google_protobuf_descriptor, file_protoc_gen_openapiv2_options_openapiv22]);

// node_modules/@buf/redpandadata_common.bufbuild_es/redpanda/api/auditlog/v1/options_pb.js
var file_redpanda_api_auditlog_v1_options = /* @__PURE__ */ fileDesc("CiZyZWRwYW5kYS9hcGkvYXVkaXRsb2cvdjEvb3B0aW9ucy5wcm90bxIYcmVkcGFuZGEuYXBpLmF1ZGl0bG9nLnYxIiUKElNlcnZpY2VBdWRpdENvbmZpZxIPCgdlbmFibGVkGAEgASgIIjUKEU1ldGhvZEF1ZGl0Q29uZmlnEhQKB2VuYWJsZWQYASABKAhIAIgBAUIKCghfZW5hYmxlZCp5CgtBdWRpdFBvbGljeRIcChhBVURJVF9QT0xJQ1lfVU5TUEVDSUZJRUQQABIWChJBVURJVF9QT0xJQ1lfTkVWRVIQARIZChVBVURJVF9QT0xJQ1lfUkVEQUNURUQQAhIZChVBVURJVF9QT0xJQ1lfU1RBTkRBUkQQAzo8CglzZW5zaXRpdmUSHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGNt4IAEoCFIJc2Vuc2l0aXZlOmgKB3NlcnZpY2USHy5nb29nbGUucHJvdG9idWYuU2VydmljZU9wdGlvbnMY3HggASgLMiwucmVkcGFuZGEuYXBpLmF1ZGl0bG9nLnYxLlNlcnZpY2VBdWRpdENvbmZpZ1IHc2VydmljZTpoCgZtZXRob2QSHi5nb29nbGUucHJvdG9idWYuTWV0aG9kT3B0aW9ucxjUhgMgASgLMisucmVkcGFuZGEuYXBpLmF1ZGl0bG9nLnYxLk1ldGhvZEF1ZGl0Q29uZmlnUgZtZXRob2SIAQE6aQoMYXVkaXRfcG9saWN5Eh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxjVhgMgASgOMiUucmVkcGFuZGEuYXBpLmF1ZGl0bG9nLnYxLkF1ZGl0UG9saWN5UgthdWRpdFBvbGljeUJdWltidWYuYnVpbGQvZ2VuL2dvL3JlZHBhbmRhZGF0YS9jb21tb24vcHJvdG9jb2xidWZmZXJzL2dvL3JlZHBhbmRhL2FwaS9hdWRpdGxvZy92MTthdWRpdGxvZ3YxYgZwcm90bzM", [file_google_protobuf_descriptor]);

// node_modules/@buf/redpandadata_common.bufbuild_es/redpanda/api/common/v1alpha1/options_pb.js
var file_redpanda_api_common_v1alpha1_options = /* @__PURE__ */ fileDesc("CipyZWRwYW5kYS9hcGkvY29tbW9uL3YxYWxwaGExL29wdGlvbnMucHJvdG8SHHJlZHBhbmRhLmFwaS5jb21tb24udjFhbHBoYTE6UAoTcmVxdWlyZWRfcGVybWlzc2lvbhIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGPZ3IAMoCVIScmVxdWlyZWRQZXJtaXNzaW9uQmVaY2J1Zi5idWlsZC9nZW4vZ28vcmVkcGFuZGFkYXRhL2NvbW1vbi9wcm90b2NvbGJ1ZmZlcnMvZ28vcmVkcGFuZGEvYXBpL2NvbW1vbi92MWFscGhhMTtjb21tb252MWFscGhhMWIGcHJvdG8z", [file_google_protobuf_descriptor]);

// node_modules/@buf/redpandadata_cloud.bufbuild_es/redpanda/api/controlplane/v1/common_pb.js
var file_redpanda_api_controlplane_v1_common = /* @__PURE__ */ fileDesc("CilyZWRwYW5kYS9hcGkvY29udHJvbHBsYW5lL3YxL2NvbW1vbi5wcm90bxIccmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MSKmAQonQ3VzdG9tZXJNYW5hZ2VkR29vZ2xlQ2xvdWRTdG9yYWdlQnVja2V0EjkKBG5hbWUYASABKAlCK7pIKMgBAXIjEAMYPzIdXlthLXpdKFstX2EtejAtOV0qW2EtejAtOV0pPyQ6QJJBPQo7KhJHQ1AgU3RvcmFnZSBCdWNrZXQyHkdDUCBzdG9yYWdlIGJ1Y2tldCBwcm9wZXJ0aWVzLtIBBG5hbWUigwEKJEN1c3RvbWVyTWFuYWdlZEFXU0Nsb3VkU3RvcmFnZUJ1Y2tldBITCgNhcm4YASABKAlCBrpIA8gBATpGkkFDCkEqEkFXUyBTdG9yYWdlIEJ1Y2tldDIlQVdTIHN0b3JhZ2UgYnVja2V0IHByb3BlcnRpZXMgYnkgQVJOLtIBA2FybiJ3ChxDdXN0b21lck1hbmFnZWREeW5hbW9EQlRhYmxlEhMKA2FybhgBIAEoCUIGukgDyAEBOkKSQT8KPSoSQVdTIER5bmFtb0RCIFRhYmxlMiFBV1MgRHluYW1vREIgdGFibGUgc3BlY2lmaWNhdGlvbi7SAQNhcm4ijQEKFUN1c3RvbWVyTWFuYWdlZEFXU1ZQQxJHCgNhcm4YASABKAlCOrpIN8gBAXIyMjBeYXJuOlthLXpcLV17Myx9OmVjMjpbYS16MC05XC1dKzpbMC05XSs6dnBjXC8uKyQ6K5JBKAomKgdBV1MgVlBDMhVBV1MgVlBDIFNwZWNpZmljYXRpb27SAQNhcm4iqwEKGUN1c3RvbWVyTWFuYWdlZEFXU1N1Ym5ldHMSWAoEYXJucxgBIAMoCUJKukhHyAEBkgFBGAEiPXI7MjleYXJuOlthLXpcLV17Myx9OmVjMjpbYS16MC05XC1dKzpbMC05XSs6c3VibmV0XC8uezEsMjU2fSQ6NJJBMQovKgtBV1MgU3VibmV0czIZQVdTIFN1Ym5ldHMgU3BlY2lmaWNhdGlvbtIBBGFybnMinAEKJUN1c3RvbWVyTWFuYWdlZEF6dXJlUmVzb3VyY2VHcm91cFNwZWMSKwoEbmFtZRgBIAEoCUIdukgayAEBchUQARhaMg9eWy1cd1wuX1woXCldKyQ6RpJBQwpBKhRBenVyZSBSZXNvdXJjZSBHcm91cDIiQXp1cmUgUmVzb3VyY2UgR3JvdXAgU3BlY2lmaWNhdGlvbtIBBG5hbWUi5gIKHkN1c3RvbWVyTWFuYWdlZEF6dXJlQnVja2V0U3BlYxI3ChRzdG9yYWdlX2FjY291bnRfbmFtZRgBIAEoCUIZukgWyAEBchEQAxgYMgteW2EtejAtOV0rJBJNChZzdG9yYWdlX2NvbnRhaW5lcl9uYW1lGAIgASgJQi26SCrIAQFyJRADGD8yH15bYS16MC05XSsoWy1dezAsMX1bYS16MC05XSspKyQSWwoOcmVzb3VyY2VfZ3JvdXAYAyABKAsyQy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZEF6dXJlUmVzb3VyY2VHcm91cFNwZWM6X5JBXApaKgxBenVyZSBCdWNrZXQyGkF6dXJlIEJ1Y2tldCBTcGVjaWZpY2F0aW9u0gEUc3RvcmFnZV9hY2NvdW50X25hbWXSARZzdG9yYWdlX2NvbnRhaW5lcl9uYW1lKnkKDUNsb3VkUHJvdmlkZXISHgoaQ0xPVURfUFJPVklERVJfVU5TUEVDSUZJRUQQABIWChJDTE9VRF9QUk9WSURFUl9BV1MQARIWChJDTE9VRF9QUk9WSURFUl9HQ1AQAhIYChRDTE9VRF9QUk9WSURFUl9BWlVSRRADYgZwcm90bzM", [file_buf_validate_validate2, file_protoc_gen_openapiv2_options_annotations2]);

// node_modules/@buf/googleapis_googleapis.bufbuild_es/google/api/visibility_pb.js
var file_google_api_visibility = /* @__PURE__ */ fileDesc("Chtnb29nbGUvYXBpL3Zpc2liaWxpdHkucHJvdG8SCmdvb2dsZS5hcGkiNwoKVmlzaWJpbGl0eRIpCgVydWxlcxgBIAMoCzIaLmdvb2dsZS5hcGkuVmlzaWJpbGl0eVJ1bGUiNwoOVmlzaWJpbGl0eVJ1bGUSEAoIc2VsZWN0b3IYASABKAkSEwoLcmVzdHJpY3Rpb24YAiABKAk6ZAoPZW51bV92aXNpYmlsaXR5EhwuZ29vZ2xlLnByb3RvYnVmLkVudW1PcHRpb25zGK/KvCIgASgLMhouZ29vZ2xlLmFwaS5WaXNpYmlsaXR5UnVsZVIOZW51bVZpc2liaWxpdHk6awoQdmFsdWVfdmlzaWJpbGl0eRIhLmdvb2dsZS5wcm90b2J1Zi5FbnVtVmFsdWVPcHRpb25zGK/KvCIgASgLMhouZ29vZ2xlLmFwaS5WaXNpYmlsaXR5UnVsZVIPdmFsdWVWaXNpYmlsaXR5OmcKEGZpZWxkX3Zpc2liaWxpdHkSHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGK/KvCIgASgLMhouZ29vZ2xlLmFwaS5WaXNpYmlsaXR5UnVsZVIPZmllbGRWaXNpYmlsaXR5Om0KEm1lc3NhZ2VfdmlzaWJpbGl0eRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxivyrwiIAEoCzIaLmdvb2dsZS5hcGkuVmlzaWJpbGl0eVJ1bGVSEW1lc3NhZ2VWaXNpYmlsaXR5OmoKEW1ldGhvZF92aXNpYmlsaXR5Eh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMYr8q8IiABKAsyGi5nb29nbGUuYXBpLlZpc2liaWxpdHlSdWxlUhBtZXRob2RWaXNpYmlsaXR5OmUKDmFwaV92aXNpYmlsaXR5Eh8uZ29vZ2xlLnByb3RvYnVmLlNlcnZpY2VPcHRpb25zGK/KvCIgASgLMhouZ29vZ2xlLmFwaS5WaXNpYmlsaXR5UnVsZVINYXBpVmlzaWJpbGl0eUJrCg5jb20uZ29vZ2xlLmFwaUIPVmlzaWJpbGl0eVByb3RvUAFaP2dvb2dsZS5nb2xhbmcub3JnL2dlbnByb3RvL2dvb2dsZWFwaXMvYXBpL3Zpc2liaWxpdHk7dmlzaWJpbGl0eaICBEdBUEliBnByb3RvMw", [file_google_protobuf_descriptor]);

// node_modules/@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1alpha1/options_pb.js
var file_redpanda_api_iam_v1alpha1_options = /* @__PURE__ */ fileDesc("CidyZWRwYW5kYS9hcGkvaWFtL3YxYWxwaGExL29wdGlvbnMucHJvdG8SGXJlZHBhbmRhLmFwaS5pYW0udjFhbHBoYTEicwoSUmVxdWlyZWRQZXJtaXNzaW9uEhUKDXJlc291cmNlX3R5cGUYASABKAkSHgoNaWRfZ2V0dGVyX2NlbBgCIAEoCUIHukgEcgIQARISCgpwZXJtaXNzaW9uGAMgASgJOhL60uSTAgwSCkRFUFJFQ0FURUQilwEKFENvbGxlY3Rpb25QZXJtaXNzaW9uEiYKFWNvbGxlY3Rpb25fZ2V0dGVyX2NlbBgBIAEoCUIHukgEcgIQARJDCgRlYWNoGAIgASgLMi0ucmVkcGFuZGEuYXBpLmlhbS52MWFscGhhMS5SZXF1aXJlZFBlcm1pc3Npb25CBrpIA8gBAToS+tLkkwIMEgpERVBSRUNBVEVEIvIBChJTZXJ2aWNlUGVybWlzc2lvbnMSYAoSbWV0aG9kX3Blcm1pc3Npb25zGAEgAygLMkQucmVkcGFuZGEuYXBpLmlhbS52MWFscGhhMS5TZXJ2aWNlUGVybWlzc2lvbnMuTWV0aG9kUGVybWlzc2lvbnNFbnRyeRpmChZNZXRob2RQZXJtaXNzaW9uc0VudHJ5EgsKA2tleRgBIAEoCRI7CgV2YWx1ZRgCIAEoCzIsLnJlZHBhbmRhLmFwaS5pYW0udjFhbHBoYTEuTWV0aG9kUGVybWlzc2lvbnM6AjgBOhL60uSTAgwSCkRFUFJFQ0FURUQixQEKEU1ldGhvZFBlcm1pc3Npb25zEksKFHJlcXVpcmVkX3Blcm1pc3Npb25zGAEgASgLMi0ucmVkcGFuZGEuYXBpLmlhbS52MWFscGhhMS5SZXF1aXJlZFBlcm1pc3Npb24STwoWY29sbGVjdGlvbl9wZXJtaXNzaW9ucxgCIAEoCzIvLnJlZHBhbmRhLmFwaS5pYW0udjFhbHBoYTEuQ29sbGVjdGlvblBlcm1pc3Npb246EvrS5JMCDBIKREVQUkVDQVRFRDpuCgpwZXJtaXNzaW9uEh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMY+XcgASgLMi0ucmVkcGFuZGEuYXBpLmlhbS52MWFscGhhMS5SZXF1aXJlZFBlcm1pc3Npb25SCnBlcm1pc3Npb246dwoOcGVybWlzc2lvbl9mb3ISHi5nb29nbGUucHJvdG9idWYuTWV0aG9kT3B0aW9ucxj6dyABKAsyLy5yZWRwYW5kYS5hcGkuaWFtLnYxYWxwaGExLkNvbGxlY3Rpb25QZXJtaXNzaW9uUg1wZXJtaXNzaW9uRm9yYgZwcm90bzM", [file_buf_validate_validate2, file_google_api_visibility, file_google_protobuf_descriptor]);

// node_modules/@buf/redpandadata_cloud.bufbuild_es/redpanda/api/controlplane/v1/operation_pb.js
var file_redpanda_api_controlplane_v1_operation = /* @__PURE__ */ fileDesc("CixyZWRwYW5kYS9hcGkvY29udHJvbHBsYW5lL3YxL29wZXJhdGlvbi5wcm90bxIccmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MSK6CAoJT3BlcmF0aW9uEikKAmlkGAEgASgJQh3gQQXgQQO6SBRyEjINXlthLXYwLTldezIwfZgBFBImCghtZXRhZGF0YRgCIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5BbnkSPAoFc3RhdGUYAyABKA4yLS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk9wZXJhdGlvbi5TdGF0ZRIjCgVlcnJvchgEIAEoCzISLmdvb2dsZS5ycGMuU3RhdHVzSAASUQoIcmVzcG9uc2UYBSABKAsyFC5nb29nbGUucHJvdG9idWYuQW55QieSQSQqIlJlc3BvbnNlIG9mIHRoZSB1bmRlcmx5aW5nIHJlcXVlc3RIABIuCgpzdGFydGVkX2F0GAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIvCgtmaW5pc2hlZF9hdBgHIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASOgoEdHlwZRgIIAEoDjIsLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuT3BlcmF0aW9uLlR5cGUSGAoLcmVzb3VyY2VfaWQYCSABKAlIAYgBASJcCgVTdGF0ZRIVChFTVEFURV9VTlNQRUNJRklFRBAAEhUKEVNUQVRFX0lOX1BST0dSRVNTEAESEwoPU1RBVEVfQ09NUExFVEVEEAISEAoMU1RBVEVfRkFJTEVEEAMisgMKBFR5cGUSFAoQVFlQRV9VTlNQRUNJRklFRBAAEhcKE1RZUEVfQ1JFQVRFX0NMVVNURVIQARIXChNUWVBFX1VQREFURV9DTFVTVEVSEAISFwoTVFlQRV9ERUxFVEVfQ0xVU1RFUhADEhcKE1RZUEVfQ1JFQVRFX05FVFdPUksQBBIXChNUWVBFX0RFTEVURV9ORVRXT1JLEAUSIgoeVFlQRV9DUkVBVEVfU0VSVkVSTEVTU19DTFVTVEVSEAYSIgoeVFlQRV9ERUxFVEVfU0VSVkVSTEVTU19DTFVTVEVSEAcSKQolVFlQRV9DUkVBVEVfQ0xVU1RFUl9XSVRIX0RFUEVOREVOQ0lFUxAIEikKJVRZUEVfREVMRVRFX0NMVVNURVJfV0lUSF9ERVBFTkRFTkNJRVMQCRInCiNUWVBFX0NSRUFURV9TRVJWRVJMRVNTX1BSSVZBVEVfTElOSxAKEicKI1RZUEVfVVBEQVRFX1NFUlZFUkxFU1NfUFJJVkFURV9MSU5LEAsSJwojVFlQRV9ERUxFVEVfU0VSVkVSTEVTU19QUklWQVRFX0xJTksQDDpAkkE9CjsqCU9wZXJhdGlvbjIsT3BlcmF0aW9uIGRlc2NyaWJlcyBhIGxvbmcgcnVubmluZyBvcGVyYXRpb25AAUIICgZyZXN1bHRCDgoMX3Jlc291cmNlX2lkIiwKE0dldE9wZXJhdGlvblJlcXVlc3QSFQoCaWQYASABKAlCCeBBArpIA8gBASJSChRHZXRPcGVyYXRpb25SZXNwb25zZRI6CglvcGVyYXRpb24YASABKAsyJy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk9wZXJhdGlvbiL+AgoVTGlzdE9wZXJhdGlvbnNSZXF1ZXN0EkoKBmZpbHRlchgBIAEoCzI6LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuTGlzdE9wZXJhdGlvbnNSZXF1ZXN0LkZpbHRlchIcCglwYWdlX3NpemUYAiABKAVCCbpIBhoEGGQoABISCgpwYWdlX3Rva2VuGAMgASgJEi0KCXJlYWRfbWFzaxgEIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2satwEKBkZpbHRlchJQCgd0eXBlX2luGAEgAygOMiwucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5PcGVyYXRpb24uVHlwZUIRukgOkgELGAEiB4IBBBABIAASRgoFc3RhdGUYAiABKA4yLS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk9wZXJhdGlvbi5TdGF0ZUIIukgFggECEAESEwoLcmVzb3VyY2VfaWQYAyABKAkilwEKFkxpc3RPcGVyYXRpb25zUmVzcG9uc2USZAoKb3BlcmF0aW9ucxgBIAMoCzInLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuT3BlcmF0aW9uQieSQSQyH09wZXJhdGlvbnMgbWF0Y2hpbmcgdGhlIHJlcXVlc3SgAWQSFwoPbmV4dF9wYWdlX3Rva2VuGAIgASgJMvgJChBPcGVyYXRpb25TZXJ2aWNlEqAFCgxHZXRPcGVyYXRpb24SMS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdldE9wZXJhdGlvblJlcXVlc3QaMi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdldE9wZXJhdGlvblJlc3BvbnNlIqgEkkHBAxINR2V0IG9wZXJhdGlvbhp9R2V0IGluZm9ybWF0aW9uIGFib3V0IGEgbG9uZy1ydW5uaW5nIG9wZXJhdGlvbi4gVGhpcyBpcyBhIGdlbmVyaWMgZW5kcG9pbnQgYW5kIGNhbiBiZSB1c2VkIHRvIHJldHJpZXZlIGFueSB0eXBlIG9mIG9wZXJhdGlvbi5KQwoDMjAwEjwKAk9LEjYKNBoyLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuR2V0T3BlcmF0aW9uUmVzcG9uc2VKlQEKAzQwNBKNAQoJTm90IEZvdW5kEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzImgKJk9wZXJhdGlvbiB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0Ej57ImNvZGUiOjYsIm1lc3NhZ2UiOiJPcGVyYXRpb24gd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdC4ifUpUCgM1MDASTQozSW50ZXJuYWwgU2VydmVyIEVycm9yLiBQbGVhc2UgcmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzsr8HFnJlYWQ6b3JnYW5pemF0aW9uLWluZm/KvwcqChZjb250cm9scGxhbmVfb3BlcmF0aW9uEgpyZXF1ZXN0LmlkGgRyZWFkgtPkkwIVEhMvdjEvb3BlcmF0aW9ucy97aWR9EvwDCg5MaXN0T3BlcmF0aW9ucxIzLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuTGlzdE9wZXJhdGlvbnNSZXF1ZXN0GjQucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5MaXN0T3BlcmF0aW9uc1Jlc3BvbnNlIv4CkkGKAhIPTGlzdCBvcGVyYXRpb25zGlpMaXN0IG9wZXJhdGlvbnMuIFRoaXMgaXMgYSBnZW5lcmljIGVuZHBvaW50IGFuZCBjYW4gYmUgdXNlZCB0byBsaXN0IGFueSB0eXBlIG9mIG9wZXJhdGlvbi5KRQoDMjAwEj4KAk9LEjgKNho0LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuTGlzdE9wZXJhdGlvbnNSZXNwb25zZUpUCgM1MDASTQozSW50ZXJuYWwgU2VydmVyIEVycm9yLiBQbGVhc2UgcmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzsr8HFnJlYWQ6b3JnYW5pemF0aW9uLWluZm/Svwc8ChFvdXRwdXQub3BlcmF0aW9ucxInChZjb250cm9scGxhbmVfb3BlcmF0aW9uEgdlYWNoLmlkGgRyZWFkgtPkkwIQEg4vdjEvb3BlcmF0aW9ucxpCkkE5CgpPcGVyYXRpb25zEitDaGVjayB0aGUgc3RhdGUgb2YgbG9uZy1ydW5uaW5nIG9wZXJhdGlvbnMu4sUHAggBYgZwcm90bzM", [file_buf_validate_validate2, file_google_api_annotations, file_google_api_field_behavior, file_google_protobuf_any, file_google_protobuf_field_mask, file_google_protobuf_timestamp, file_google_rpc_status, file_protoc_gen_openapiv2_options_annotations2, file_redpanda_api_auditlog_v1_options, file_redpanda_api_common_v1alpha1_options, file_redpanda_api_iam_v1alpha1_options]);

// node_modules/@buf/redpandadata_cloud.bufbuild_es/redpanda/api/controlplane/v1/cluster_pb.js
var file_redpanda_api_controlplane_v1_cluster = /* @__PURE__ */ fileDesc("CipyZWRwYW5kYS9hcGkvY29udHJvbHBsYW5lL3YxL2NsdXN0ZXIucHJvdG8SHHJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEihgEKFUNyZWF0ZUNsdXN0ZXJNZXRhZGF0YRISCgpjbHVzdGVyX2lkGAEgASgJOlmSQVYKVCoVQ3JlYXRlQ2x1c3Rlck1ldGFkYXRhMjtSZXNvdXJjZSBkZXNjcmliaW5nIGFuIGluLXByb2dyZXNzIENyZWF0ZUNsdXN0ZXIgT3BlcmF0aW9uLiKLAQoVRGVsZXRlQ2x1c3Rlck1ldGFkYXRhEhcKD3JlcXVpcmVkX2FjdGlvbhgBIAEoCTpZkkFWClQqFURlbGV0ZUNsdXN0ZXJNZXRhZGF0YTI7UmVzb3VyY2UgZGVzY3JpYmluZyBhbiBpbi1wcm9ncmVzcyBEZWxldGVDbHVzdGVyIE9wZXJhdGlvbi4isQIKFVVwZGF0ZUNsdXN0ZXJNZXRhZGF0YRJaCgt1cGRhdGVfdHlwZRgBIAMoDjJFLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuVXBkYXRlQ2x1c3Rlck1ldGFkYXRhLlVwZGF0ZUNsdXN0ZXJUeXBlImEKEVVwZGF0ZUNsdXN0ZXJUeXBlEiMKH1VQREFURV9DTFVTVEVSX1RZUEVfVU5TUEVDSUZJRUQQABInCiNVUERBVEVfQ0xVU1RFUl9UWVBFX0NVU1RPTUVSX0NPTkZJRxABOlmSQVYKVCoVVXBkYXRlQ2x1c3Rlck1ldGFkYXRhMjtSZXNvdXJjZSBkZXNjcmliaW5nIGFuIGluLXByb2dyZXNzIFVwZGF0ZUNsdXN0ZXIgT3BlcmF0aW9uLiLmAwoITVRMU1NwZWMSLgoHZW5hYmxlZBgBIAEoCEIdkkEaMhhXaGV0aGVyIG1UTFMgaXMgZW5hYmxlZC4SiAEKE2NhX2NlcnRpZmljYXRlc19wZW0YAiADKAlCa5JBaDIdQ0EgY2VydGlmaWNhdGUgaW4gUEVNIGZvcm1hdC5KR1siLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG5NSUkuLi4uLi4uLlxuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLSJdEp4CChdwcmluY2lwYWxfbWFwcGluZ19ydWxlcxgDIAMoCUL8AZJB+AEy2AFQcmluY2lwYWwgbWFwcGluZyBydWxlcyBmb3IgbVRMUyBhdXRoZW50aWNhdGlvbi4gT25seSB2YWxpZCBmb3IgS2Fma2EgQVBJLiBTZWUgdGhlIFJlZHBhbmRhIGRvY3VtZW50YXRpb24gb24gW2NvbmZpZ3VyaW5nIGF1dGhlbnRpY2F0aW9uXShodHRwczovL2RvY3MucmVkcGFuZGEuY29tL3JlZHBhbmRhLWNsb3VkL3NlY3VyaXR5L2Nsb3VkLWF1dGhlbnRpY2F0aW9uLyNtdGxzKS5KG1siUlVMRTouKkNOPShbXixdKykuKi8kMS8iXSJnChFHQ1BTZXJ2aWNlQWNjb3VudBIcCgVlbWFpbBgBIAEoCUIN4EEFukgHyAEBcgJgATo0kkExCi8qD1NlcnZpY2UgQWNjb3VudDIUR0NQIHNlcnZpY2UgYWNjb3VudC7SAQVlbWFpbCJiChJBV1NJbnN0YW5jZVByb2ZpbGUSFgoDYXJuGAEgASgJQgngQQW6SAPIAQE6NJJBMQovKhBJbnN0YW5jZSBQcm9maWxlMhVBV1MgaW5zdGFuY2UgcHJvZmlsZS7SAQNhcm4idgoQQVdTU2VjdXJpdHlHcm91cBIWCgNhcm4YASABKAlCCeBBBbpIA8gBATpKkkFHCkUqDlNlY3VyaXR5IEdyb3VwMi1TZWN1cml0eSBHcm91cCBpZGVudGlmaWVzIEFXUyBzZWN1cml0eSBncm91cC7SAQNhcm4iOgoIU0FTTFNwZWMSLgoHZW5hYmxlZBgBIAEoCEIdkkEaMhhXaGV0aGVyIFNBU0wgaXMgZW5hYmxlZC4iyE0KGEN1c3RvbWVyTWFuYWdlZFJlc291cmNlcxJJCgNnY3AYASABKAsyOi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5HQ1BIABJJCgNhd3MYAiABKAsyOi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5BV1NIABJNCgVhenVyZRgDIAEoCzI8LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkUmVzb3VyY2VzLkF6dXJlSAAa6RMKA0dDUBJZCgZzdWJuZXQYASABKAsyQS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5HQ1AuU3VibmV0Qga6SAPIAQESbQoVYWdlbnRfc2VydmljZV9hY2NvdW50GAIgASgLMi8ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HQ1BTZXJ2aWNlQWNjb3VudEIGukgDyAEBUhVhZ2VudF9zZXJ2aWNlX2FjY291bnQScQoXY29uc29sZV9zZXJ2aWNlX2FjY291bnQYAyABKAsyLy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdDUFNlcnZpY2VBY2NvdW50Qga6SAPIAQFSF2NvbnNvbGVfc2VydmljZV9hY2NvdW50EnUKGWNvbm5lY3Rvcl9zZXJ2aWNlX2FjY291bnQYBCABKAsyLy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdDUFNlcnZpY2VBY2NvdW50Qga6SAPIAQFSGWNvbm5lY3Rvcl9zZXJ2aWNlX2FjY291bnQSgwEKIHJlZHBhbmRhX2NsdXN0ZXJfc2VydmljZV9hY2NvdW50GAUgASgLMi8ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HQ1BTZXJ2aWNlQWNjb3VudEIGukgDyAEBUiByZWRwYW5kYV9jbHVzdGVyX3NlcnZpY2VfYWNjb3VudBJpChNna2Vfc2VydmljZV9hY2NvdW50GAYgASgLMi8ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HQ1BTZXJ2aWNlQWNjb3VudEIGukgDyAEBUhNna2Vfc2VydmljZV9hY2NvdW50EoMBChV0aWVyZWRfc3RvcmFnZV9idWNrZXQYByABKAsyRS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZEdvb2dsZUNsb3VkU3RvcmFnZUJ1Y2tldEIGukgDyAEBUhV0aWVyZWRfc3RvcmFnZV9idWNrZXQSGwoTcHNjX25hdF9zdWJuZXRfbmFtZRgIIAEoCRKDAQokcmVkcGFuZGFfY29ubmVjdF9hcGlfc2VydmljZV9hY2NvdW50GAkgASgLMi8ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HQ1BTZXJ2aWNlQWNjb3VudFIkcmVkcGFuZGFfY29ubmVjdF9hcGlfc2VydmljZV9hY2NvdW50EnsKIHJlZHBhbmRhX2Nvbm5lY3Rfc2VydmljZV9hY2NvdW50GAogASgLMi8ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HQ1BTZXJ2aWNlQWNjb3VudFIgcmVkcGFuZGFfY29ubmVjdF9zZXJ2aWNlX2FjY291bnQSfQohcmVkcGFuZGFfb3BlcmF0b3Jfc2VydmljZV9hY2NvdW50GAsgASgLMi8ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HQ1BTZXJ2aWNlQWNjb3VudFIhcmVkcGFuZGFfb3BlcmF0b3Jfc2VydmljZV9hY2NvdW50Eh4KFnBzY192Ml9uYXRfc3VibmV0X25hbWUYDCABKAkaggYKBlN1Ym5ldBI5CgRuYW1lGAEgASgJQivgQQW6SCXIAQFyIBg+MhxeW2Etel0oWy1hLXowLTldKlthLXowLTldKT8kEpoBChlzZWNvbmRhcnlfaXB2NF9yYW5nZV9wb2RzGAMgASgLMlQucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMuR0NQLlN1Ym5ldC5TZWNvbmRhcnlJUHY0UmFuZ2VCBrpIA8gBAVIZc2Vjb25kYXJ5X2lwdjRfcmFuZ2VfcG9kcxKiAQodc2Vjb25kYXJ5X2lwdjRfcmFuZ2Vfc2VydmljZXMYBCABKAsyVC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5HQ1AuU3VibmV0LlNlY29uZGFyeUlQdjRSYW5nZUIGukgDyAEBUh1zZWNvbmRhcnlfaXB2NF9yYW5nZV9zZXJ2aWNlcxI5ChVrOHNfbWFzdGVyX2lwdjRfcmFuZ2UYBSABKAlCA+BBBVIVazhzX21hc3Rlcl9pcHY0X3JhbmdlGk8KElNlY29uZGFyeUlQdjRSYW5nZRI5CgRuYW1lGAEgASgJQivgQQW6SCXIAQFyIBg+MhxeW2Etel0oWy1hLXowLTldKlthLXowLTldKT8kOu4BkkHqAQrnASoGU3VibmV0MoEBR0NQIHN1Ym5ldCBwcm9wZXJ0aWVzLiBTZWUgdGhlIG9mZmljaWFsIFtHQ1AgQVBJIHJlZmVyZW5jZV0oaHR0cHM6Ly9jbG91ZC5nb29nbGUuY29tL2NvbXB1dGUvZG9jcy9yZWZlcmVuY2UvcmVzdC92MS9zdWJuZXR3b3Jrcyku0gEEbmFtZdIBGXNlY29uZGFyeV9pcHY0X3JhbmdlX3BvZHPSAR1zZWNvbmRhcnlfaXB2NF9yYW5nZV9zZXJ2aWNlc9IBFWs4c19tYXN0ZXJfaXB2NF9yYW5nZTryA5JB7gMK6wMqHUdDUCBDdXN0b21lci1NYW5hZ2VkIFJlc291cmVzMtcBR0NQIHJlc291cmNlcyBjcmVhdGVkIGFuZCBtYW5hZ2VkIGJ5IHVzZXIsIGFuZCByZXF1aXJlZCB0byBkZXBsb3kgdGhlIFJlZHBhbmRhIGNsdXN0ZXIuIFNlZSBbQ3JlYXRlIGEgQllPVlBDIENsdXN0ZXIgb24gR0NQXShodHRwczovL2RvY3MucmVkcGFuZGEuY29tL3JlZHBhbmRhLWNsb3VkL2dldC1zdGFydGVkL2NsdXN0ZXItdHlwZXMvYnlvYy9nY3AvdnBjLWJ5by1nY3AvKS7SAQZzdWJuZXTSARVhZ2VudF9zZXJ2aWNlX2FjY291bnTSARdjb25zb2xlX3NlcnZpY2VfYWNjb3VudNIBGWNvbm5lY3Rvcl9zZXJ2aWNlX2FjY291bnTSASByZWRwYW5kYV9jbHVzdGVyX3NlcnZpY2VfYWNjb3VudNIBE2drZV9zZXJ2aWNlX2FjY291bnTSARV0aWVyZWRfc3RvcmFnZV9idWNrZXTSASRyZWRwYW5kYV9jb25uZWN0X2FwaV9zZXJ2aWNlX2FjY291bnTSASByZWRwYW5kYV9jb25uZWN0X3NlcnZpY2VfYWNjb3VudBroGAoDQVdTEnAKFmFnZW50X2luc3RhbmNlX3Byb2ZpbGUYASABKAsyMC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkFXU0luc3RhbmNlUHJvZmlsZUIGukgDyAEBUhZhZ2VudF9pbnN0YW5jZV9wcm9maWxlEpABCiZjb25uZWN0b3JzX25vZGVfZ3JvdXBfaW5zdGFuY2VfcHJvZmlsZRgCIAEoCzIwLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQVdTSW5zdGFuY2VQcm9maWxlQga6SAPIAQFSJmNvbm5lY3RvcnNfbm9kZV9ncm91cF9pbnN0YW5jZV9wcm9maWxlEooBCiN1dGlsaXR5X25vZGVfZ3JvdXBfaW5zdGFuY2VfcHJvZmlsZRgDIAEoCzIwLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQVdTSW5zdGFuY2VQcm9maWxlQga6SAPIAQFSI3V0aWxpdHlfbm9kZV9ncm91cF9pbnN0YW5jZV9wcm9maWxlEowBCiRyZWRwYW5kYV9ub2RlX2dyb3VwX2luc3RhbmNlX3Byb2ZpbGUYBCABKAsyMC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkFXU0luc3RhbmNlUHJvZmlsZUIGukgDyAEBUiRyZWRwYW5kYV9ub2RlX2dyb3VwX2luc3RhbmNlX3Byb2ZpbGUScwoQazhzX2NsdXN0ZXJfcm9sZRgFIAEoCzI/LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkUmVzb3VyY2VzLkFXUy5Sb2xlQga6SAPIAQFSEGs4c19jbHVzdGVyX3JvbGUStwEKHXJlZHBhbmRhX2FnZW50X3NlY3VyaXR5X2dyb3VwGAYgASgLMi4ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5BV1NTZWN1cml0eUdyb3VwQkGSQTgyNkRlZmluZXMgdGhlIGluZ3Jlc3MgYW5kIGVncmVzcyBydWxlcyBmb3IgdGhlIEFnZW50IFZNLrpIA8gBAVIdcmVkcGFuZGFfYWdlbnRfc2VjdXJpdHlfZ3JvdXASvAEKGWNvbm5lY3RvcnNfc2VjdXJpdHlfZ3JvdXAYByABKAsyLi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkFXU1NlY3VyaXR5R3JvdXBCTpJBRTJDRGVmaW5lcyB0aGUgaW5ncmVzcyBhbmQgZWdyZXNzIHJ1bGVzIGZvciB0aGUgY29ubmVjdG9ycyBub2RlIGdyb3VwLrpIA8gBAVIZY29ubmVjdG9yc19zZWN1cml0eV9ncm91cBLMAQoicmVkcGFuZGFfbm9kZV9ncm91cF9zZWN1cml0eV9ncm91cBgIIAEoCzIuLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQVdTU2VjdXJpdHlHcm91cEJMkkFDMkFEZWZpbmVzIHRoZSBpbmdyZXNzIGFuZCBlZ3Jlc3MgcnVsZXMgZm9yIHRoZSByZWRwYW5kYSBub2RlIGdyb3VwLrpIA8gBAVIicmVkcGFuZGFfbm9kZV9ncm91cF9zZWN1cml0eV9ncm91cBKzAQoWdXRpbGl0eV9zZWN1cml0eV9ncm91cBgJIAEoCzIuLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQVdTU2VjdXJpdHlHcm91cEJLkkFCMkBEZWZpbmVzIHRoZSBpbmdyZXNzIGFuZCBlZ3Jlc3MgcnVsZXMgZm9yIHRoZSB1dGlsaXR5IG5vZGUgZ3JvdXAuukgDyAEBUhZ1dGlsaXR5X3NlY3VyaXR5X2dyb3VwEqwBChZjbHVzdGVyX3NlY3VyaXR5X2dyb3VwGAogASgLMi4ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5BV1NTZWN1cml0eUdyb3VwQkSSQTsyOURlZmluZXMgdGhlIGluZ3Jlc3MgYW5kIGVncmVzcyBydWxlcyBmb3IgdGhlIEVLUyBjbHVzdGVyLrpIA8gBAVIWY2x1c3Rlcl9zZWN1cml0eV9ncm91cBKkAQoTbm9kZV9zZWN1cml0eV9ncm91cBgLIAEoCzIuLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQVdTU2VjdXJpdHlHcm91cEJCkkE5MjdEZWZpbmVzIHRoZSBpbmdyZXNzIGFuZCBlZ3Jlc3MgcnVsZXMgZm9yIHRoZSBhbGwgbm9kZXMuukgDyAEBUhNub2RlX3NlY3VyaXR5X2dyb3VwEn4KFGNsb3VkX3N0b3JhZ2VfYnVja2V0GAwgASgLMkIucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRBV1NDbG91ZFN0b3JhZ2VCdWNrZXRCBrpIA8gBAVIUY2xvdWRfc3RvcmFnZV9idWNrZXQS6gEKG3Blcm1pc3Npb25zX2JvdW5kYXJ5X3BvbGljeRgNIAEoCzJBLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkUmVzb3VyY2VzLkFXUy5Qb2xpY3lCZZJBXDJaRGVmaW5lcyB0aGUgcGVybWlzc2lvbnMgYm91bmRhcnkgd2hpY2ggbXVzdCBiZSBpbmNsdWRlZCBvbiBhbGwgcm9sZXMgY3JlYXRlZCBieSB0aGUgYWdlbnQuukgDyAEBUhtwZXJtaXNzaW9uc19ib3VuZGFyeV9wb2xpY3kSlAEKLHJlZHBhbmRhX2Nvbm5lY3Rfbm9kZV9ncm91cF9pbnN0YW5jZV9wcm9maWxlGA4gASgLMjAucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5BV1NJbnN0YW5jZVByb2ZpbGVSLHJlZHBhbmRhX2Nvbm5lY3Rfbm9kZV9ncm91cF9pbnN0YW5jZV9wcm9maWxlEsgBCh9yZWRwYW5kYV9jb25uZWN0X3NlY3VyaXR5X2dyb3VwGA8gASgLMi4ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5BV1NTZWN1cml0eUdyb3VwQk6SQUsySURlZmluZXMgdGhlIGluZ3Jlc3MgYW5kIGVncmVzcyBydWxlcyBmb3IgdGhlIHJlZHBhbmRhIGNvbm5lY3Qgbm9kZSBncm91cC5SH3JlZHBhbmRhX2Nvbm5lY3Rfc2VjdXJpdHlfZ3JvdXAaTAoEUm9sZRIWCgNhcm4YASABKAlCCeBBBbpIA8gBAToskkEpCicqBFJvbGUyGVJvbGUgaWRlbnRpZmllcyBBV1Mgcm9sZS7SAQNhcm4aVwoGUG9saWN5EhYKA2FybhgBIAEoCUIJ4EEFukgDyAEBOjWSQTIKMCoGUG9saWN5MiBQb2xpY3kgaWRlbnRpZmllcyBhbiBBV1MgcG9saWN5LtIBA2FybjqABJJB/AMK+QMqHkFXUyBDdXN0b21lci1NYW5hZ2VkIFJlc291cmNlczJXQVdTIHJlc291cmNlcyBjcmVhdGVkIGFuZCBtYW5hZ2VkIGJ5IHVzZXIsIGFuZCByZXF1aXJlZCB0byBkZXBsb3kgdGhlIFJlZHBhbmRhIGNsdXN0ZXIu0gEWYWdlbnRfaW5zdGFuY2VfcHJvZmlsZdIBJmNvbm5lY3RvcnNfbm9kZV9ncm91cF9pbnN0YW5jZV9wcm9maWxl0gEjdXRpbGl0eV9ub2RlX2dyb3VwX2luc3RhbmNlX3Byb2ZpbGXSASRyZWRwYW5kYV9ub2RlX2dyb3VwX2luc3RhbmNlX3Byb2ZpbGXSARBrOHNfY2x1c3Rlcl9yb2xl0gEdcmVkcGFuZGFfYWdlbnRfc2VjdXJpdHlfZ3JvdXDSARljb25uZWN0b3JzX3NlY3VyaXR5X2dyb3Vw0gEicmVkcGFuZGFfbm9kZV9ncm91cF9zZWN1cml0eV9ncm91cNIBFnV0aWxpdHlfc2VjdXJpdHlfZ3JvdXDSARZjbHVzdGVyX3NlY3VyaXR5X2dyb3Vw0gETbm9kZV9zZWN1cml0eV9ncm91cNIBFGNsb3VkX3N0b3JhZ2VfYnVja2V00gEbcGVybWlzc2lvbnNfYm91bmRhcnlfcG9saWN5GtYeCgVBenVyZRJyCg9yZXNvdXJjZV9ncm91cHMYASABKAsySy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5BenVyZS5SZXNvdXJjZUdyb3Vwc0IM4EEC4EEFukgDyAEBEoMBChh1c2VyX2Fzc2lnbmVkX2lkZW50aXRpZXMYAiABKAsyUy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5BenVyZS5Vc2VyQXNzaWduZWRJZGVudGl0aWVzQgzgQQLgQQW6SAPIAQESaAoUdGllcmVkX2Nsb3VkX3N0b3JhZ2UYAyABKAsyPC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZEF6dXJlQnVja2V0U3BlY0IM4EEC4EEFukgDyAEBEmgKCmtleV92YXVsdHMYBCABKAsyRi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5BenVyZS5LZXlWYXVsdHNCDOBBAuBBBbpIA8gBARJyCg9zZWN1cml0eV9ncm91cHMYBSABKAsySy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5BenVyZS5TZWN1cml0eUdyb3Vwc0IM4EEC4EEFukgDyAEBEl4KBWNpZHJzGAYgASgLMkEucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMuQXp1cmUuQ0lEUkIM4EEC4EEFukgDyAEBGsIDCg5SZXNvdXJjZUdyb3VwcxJyChdyZWRwYW5kYV9yZXNvdXJjZV9ncm91cBgBIAEoCzJDLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkQXp1cmVSZXNvdXJjZUdyb3VwU3BlY0IM4EEC4EEFukgDyAEBEnEKFnN0b3JhZ2VfcmVzb3VyY2VfZ3JvdXAYAiABKAsyQy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZEF6dXJlUmVzb3VyY2VHcm91cFNwZWNCDOBBAuBBBbpIA8gBARJtChJpYW1fcmVzb3VyY2VfZ3JvdXAYAyABKAsyQy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZEF6dXJlUmVzb3VyY2VHcm91cFNwZWNCDOBBAuBBBbpIA8gBATpakkFXClUqFEF6dXJlIFJlc291cmUgR3JvdXBzMj1BenVyZSByZXNvdXJjZSBncm91cHMgaG9sZGluZyB0aGUgUmVkcGFuZGEgY2x1c3RlciByZXNvdXJjZXMuGr8NChZVc2VyQXNzaWduZWRJZGVudGl0aWVzEo8BChxhZ2VudF91c2VyX2Fzc2lnbmVkX2lkZW50aXR5GAEgASgLMlsucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMuQXp1cmUuVXNlckFzc2lnbmVkSWRlbnRpdGllcy5VQUlTcGVjQgzgQQLgQQW6SAPIAQESjQEKGmFrc191c2VyX2Fzc2lnbmVkX2lkZW50aXR5GAIgASgLMlsucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMuQXp1cmUuVXNlckFzc2lnbmVkSWRlbnRpdGllcy5VQUlTcGVjQgzgQQLgQQW6SAPIAQESlQEKInJlZHBhbmRhX2NsdXN0ZXJfYXNzaWduZWRfaWRlbnRpdHkYAyABKAsyWy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5BenVyZS5Vc2VyQXNzaWduZWRJZGVudGl0aWVzLlVBSVNwZWNCDOBBAuBBBbpIA8gBARKRAQoeY2VydF9tYW5hZ2VyX2Fzc2lnbmVkX2lkZW50aXR5GAQgASgLMlsucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMuQXp1cmUuVXNlckFzc2lnbmVkSWRlbnRpdGllcy5VQUlTcGVjQgzgQQLgQQW6SAPIAQESkQEKHmV4dGVybmFsX2Ruc19hc3NpZ25lZF9pZGVudGl0eRgFIAEoCzJbLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkUmVzb3VyY2VzLkF6dXJlLlVzZXJBc3NpZ25lZElkZW50aXRpZXMuVUFJU3BlY0IM4EEC4EEFukgDyAEBEpUBCiJyZWRwYW5kYV9jb25zb2xlX2Fzc2lnbmVkX2lkZW50aXR5GAYgASgLMlsucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMuQXp1cmUuVXNlckFzc2lnbmVkSWRlbnRpdGllcy5VQUlTcGVjQgzgQQLgQQW6SAPIAQESkgEKH2thZmthX2Nvbm5lY3RfYXNzaWduZWRfaWRlbnRpdHkYByABKAsyWy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlcy5BenVyZS5Vc2VyQXNzaWduZWRJZGVudGl0aWVzLlVBSVNwZWNCDOBBAuBBBbpIA8gBARKVAQoicmVkcGFuZGFfY29ubmVjdF9hc3NpZ25lZF9pZGVudGl0eRgIIAEoCzJbLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkUmVzb3VyY2VzLkF6dXJlLlVzZXJBc3NpZ25lZElkZW50aXRpZXMuVUFJU3BlY0IM4EEC4EEFukgDyAEBEpkBCiZyZWRwYW5kYV9jb25uZWN0X2FwaV9hc3NpZ25lZF9pZGVudGl0eRgJIAEoCzJbLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkUmVzb3VyY2VzLkF6dXJlLlVzZXJBc3NpZ25lZElkZW50aXRpZXMuVUFJU3BlY0IM4EEC4EEFukgDyAEBEpYBCiNyZWRwYW5kYV9vcGVyYXRvcl9hc3NpZ25lZF9pZGVudGl0eRgKIAEoCzJbLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkUmVzb3VyY2VzLkF6dXJlLlVzZXJBc3NpZ25lZElkZW50aXRpZXMuVUFJU3BlY0IM4EEC4EEFukgDyAEBGjwKB1VBSVNwZWMSMQoEbmFtZRgBIAEoCUIj4EEC4EEFukgayAEBchUQAxiAATIOXihcdykrWy1fXHddKiQ6igGSQYYBCoMBKhhVc2VyIEFzc2lnbmVkIElkZW50aXRpZXMyZ0F6dXJlIHVzZXIgYXNzaWduZWQgaWRlbnRpdGllcyB1c2VkIGJ5IFJlZHBhbmRhIGNsdXN0ZXIuIEFsbCBpZGVudGl0aWVzIHNoYWxsIGJlIGluIGlhbV9yZXNvdXJjZV9ncm91cC4avgMKCUtleVZhdWx0cxJ3ChBtYW5hZ2VtZW50X3ZhdWx0GAEgASgLMk8ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMuQXp1cmUuS2V5VmF1bHRzLktleVZhdWx0QgzgQQLgQQW6SAPIAQESdAoNY29uc29sZV92YXVsdBgCIAEoCzJPLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ3VzdG9tZXJNYW5hZ2VkUmVzb3VyY2VzLkF6dXJlLktleVZhdWx0cy5LZXlWYXVsdEIM4EEC4EEFukgDyAEBGkkKCEtleVZhdWx0Ej0KBG5hbWUYASABKAlCL+BBAuBBBbpIJsgBAXIhEAMYGDIbXlthLXpBLVpdKyhbLV17MCwxfShcdykrKSskOneSQXQKcioQQXp1cmUgS2V5IFZhdWx0czJeQXp1cmUga2V5IHZhdWx0cyB1c2VkIGJ5IFJlZHBhbmRhIENsdXN0ZXIuIEFsbCBrZXkgdmF1bHRzIHNoYWxsIGJlIGluIHJlZHBhbmRhX3Jlc291cmNlX2dyb3VwLhrwAgoOU2VjdXJpdHlHcm91cHMSiAEKF3JlZHBhbmRhX3NlY3VyaXR5X2dyb3VwGAEgASgLMlkucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMuQXp1cmUuU2VjdXJpdHlHcm91cHMuU2VjdXJpdHlHcm91cEIM4EEC4EEFukgDyAEBGkkKDVNlY3VyaXR5R3JvdXASOAoEbmFtZRgBIAEoCUIq4EEC4EEFukghyAEBchwQARhQMhZeKFx3KStbLVwuX1x3XSpbXHdfXSskOocBkkGDAQqAASoVQXp1cmUgU2VjdXJpdHkgR3JvdXBzMmdBenVyZSBzZWN1cml0eSBncm91cHMgZm9yIFJlZHBhbmRhIENsdXN0ZXIuIEFsbCBzZWN1cml0eSBncm91cHMgc2hhbGwgYmUgaW4gdGhlIG5ldHdvcmsgcmVzb3VyY2UgZ3JvdXAuGmwKBENJRFISJgoQYWtzX3NlcnZpY2VfY2lkchgBIAEoCUIM4EEC4EEFukgDyAEBOjySQTkKNyoEQ0lEUjIvQWRkaXRpb25hbCBDSURScyBhbGxvY2F0ZWQgdG8gUmVkcGFuZGEgY2x1c3Rlci46gQGSQX4KfCofQXp1cmUgQ3VzdG9tZXItTWFuYWdlZCBSZXNvdXJlczJZQXp1cmUgcmVzb3VyY2VzIGNyZWF0ZWQgYW5kIG1hbmFnZWQgYnkgdXNlciwgYW5kIHJlcXVpcmVkIHRvIGRlcGxveSB0aGUgUmVkcGFuZGEgY2x1c3Rlci5CFwoOY2xvdWRfcHJvdmlkZXISBbpIAggBIpgJCh5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXNVcGRhdGUSTwoDZ2NwGAEgASgLMkAucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXNVcGRhdGUuR0NQSAASTwoDYXdzGAIgASgLMkAucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXNVcGRhdGUuQVdTSAAaigQKA0dDUBIbChNwc2NfbmF0X3N1Ym5ldF9uYW1lGAEgASgJEoMBCiRyZWRwYW5kYV9jb25uZWN0X2FwaV9zZXJ2aWNlX2FjY291bnQYAiABKAsyLy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdDUFNlcnZpY2VBY2NvdW50UiRyZWRwYW5kYV9jb25uZWN0X2FwaV9zZXJ2aWNlX2FjY291bnQSewogcmVkcGFuZGFfY29ubmVjdF9zZXJ2aWNlX2FjY291bnQYAyABKAsyLy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdDUFNlcnZpY2VBY2NvdW50UiByZWRwYW5kYV9jb25uZWN0X3NlcnZpY2VfYWNjb3VudBJ9CiFyZWRwYW5kYV9vcGVyYXRvcl9zZXJ2aWNlX2FjY291bnQYBCABKAsyLy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdDUFNlcnZpY2VBY2NvdW50UiFyZWRwYW5kYV9vcGVyYXRvcl9zZXJ2aWNlX2FjY291bnQSHgoWcHNjX3YyX25hdF9zdWJuZXRfbmFtZRgFIAEoCTpEkkFBCj8qHUdDUCBDdXN0b21lci1NYW5hZ2VkIFJlc291cmVzMh5HQ1AgcmVzb3VyY2VzIG1hbmFnZWQgYnkgdXNlci4arQMKA0FXUxKUAQoscmVkcGFuZGFfY29ubmVjdF9ub2RlX2dyb3VwX2luc3RhbmNlX3Byb2ZpbGUYASABKAsyMC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkFXU0luc3RhbmNlUHJvZmlsZVIscmVkcGFuZGFfY29ubmVjdF9ub2RlX2dyb3VwX2luc3RhbmNlX3Byb2ZpbGUSyAEKH3JlZHBhbmRhX2Nvbm5lY3Rfc2VjdXJpdHlfZ3JvdXAYAiABKAsyLi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkFXU1NlY3VyaXR5R3JvdXBCTpJBSzJJRGVmaW5lcyB0aGUgaW5ncmVzcyBhbmQgZWdyZXNzIHJ1bGVzIGZvciB0aGUgcmVkcGFuZGEgY29ubmVjdCBub2RlIGdyb3VwLlIfcmVkcGFuZGFfY29ubmVjdF9zZWN1cml0eV9ncm91cDpEkkFBCj8qHUFXUyBDdXN0b21lci1NYW5hZ2VkIFJlc291cmVzMh5BV1MgcmVzb3VyY2VzIG1hbmFnZWQgYnkgdXNlci5CFwoOY2xvdWRfcHJvdmlkZXISBbpIAggBIpAHChJBV1NQcml2YXRlTGlua1NwZWMSDwoHZW5hYmxlZBgBIAEoCBKoAgoSYWxsb3dlZF9wcmluY2lwYWxzGAIgAygJQosCkkGHAjKRAVRoZSBBUk4gb2YgdGhlIHByaW5jaXBhbHMgdGhhdCBjYW4gYWNjZXNzIFJlZHBhbmRhIEFXUyBQcml2YXRlTGluayBFbmRwb2ludCBTZXJ2aWNlLiBUbyBncmFudCBwZXJtaXNzaW9ucyB0byBhbGwgcHJpbmNpcGFscywgdXNlIGFuIGFzdGVyaXNrICgqKS5KcVsiYXJuOmF3czppYW06OmFjY291bnQtbnVtYmVyLXdpdGhvdXQtaHlwaGVuczp1c2VyL3VzZXJuYW1lIG9yIGFybjphd3M6aWFtOjphY2NvdW50LW51bWJlci13aXRob3V0LWh5cGhlbnM6cm9vdCJdEhcKD2Nvbm5lY3RfY29uc29sZRgDIAEoCBKwAQoTa2Fma2FfYXBpX2F1dGhfbW9kZRgEIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJgkkFdMltJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIEthZmthIEFQSSBhdCBSZWRwYW5kYSBQcml2YXRlIExpbmsuErIBChRodHRwX3Byb3h5X2F1dGhfbW9kZRgFIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJhkkFeMlxJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIEhUVFAgcHJveHkgYXQgUmVkcGFuZGEgUHJpdmF0ZSBMaW5rLhK8AQoZc2NoZW1hX3JlZ2lzdHJ5X2F1dGhfbW9kZRgGIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJmkkFjMmFJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIFNjaGVtYSBSZWdpc3RyeSBhdCBSZWRwYW5kYSBQcml2YXRlIExpbmsuIn8KIEdDUFByaXZhdGVTZXJ2aWNlQ29ubmVjdENvbnN1bWVyElsKBnNvdXJjZRgBIAEoCUJLkkFIMjVFaXRoZXIgdGhlIEdDUCBwcm9qZWN0IG51bWJlciBvciBpdHMgYWxwaGFudW1lcmljIElELkoPImdjcC1wcm9qZWN0LTEiIokHChxHQ1BQcml2YXRlU2VydmljZUNvbm5lY3RTcGVjEg8KB2VuYWJsZWQYASABKAgSHQoVZ2xvYmFsX2FjY2Vzc19lbmFibGVkGAIgASgIEtIBChRjb25zdW1lcl9hY2NlcHRfbGlzdBgDIAMoCzI+LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuR0NQUHJpdmF0ZVNlcnZpY2VDb25uZWN0Q29uc3VtZXJCdJJBcTJvTGlzdCBvZiBjb25zdW1lcnMgdGhhdCBhcmUgYWxsb3dlZCB0byBjb25uZWN0IHRvIFJlZHBhbmRhIEdDUCBQU0MgKFByaXZhdGUgU2VydmljZSBDb25uZWN0KSBzZXJ2aWNlIGF0dGFjaG1lbnQuEsUBChNrYWZrYV9hcGlfYXV0aF9tb2RlGAQgASgOMjEucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5Qcml2YXRlTGlua0F1dGhNb2RlQnWSQXIycEluZGljYXRpb24gb24gdGhlIGF1dGhlbnRpY2F0aW9uIG1ldGhvZHMgY29uZmlndXJlZCBmb3IgS2Fma2EgQVBJIGF0IFJlZHBhbmRhIEdDUCBQU0MgKFByaXZhdGUgU2VydmljZSBDb25uZWN0KS4SxwEKFGh0dHBfcHJveHlfYXV0aF9tb2RlGAUgASgOMjEucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5Qcml2YXRlTGlua0F1dGhNb2RlQnaSQXMycUluZGljYXRpb24gb24gdGhlIGF1dGhlbnRpY2F0aW9uIG1ldGhvZHMgY29uZmlndXJlZCBmb3IgSFRUUCBwcm94eSBhdCBSZWRwYW5kYSBHQ1AgUFNDIChQcml2YXRlIFNlcnZpY2UgQ29ubmVjdCkuEtEBChlzY2hlbWFfcmVnaXN0cnlfYXV0aF9tb2RlGAYgASgOMjEucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5Qcml2YXRlTGlua0F1dGhNb2RlQnuSQXgydkluZGljYXRpb24gb24gdGhlIGF1dGhlbnRpY2F0aW9uIG1ldGhvZHMgY29uZmlndXJlZCBmb3IgU2NoZW1hIFJlZ2lzdHJ5IGF0IFJlZHBhbmRhIEdDUCBQU0MgKFByaXZhdGUgU2VydmljZSBDb25uZWN0KS4iiwYKFEF6dXJlUHJpdmF0ZUxpbmtTcGVjEg8KB2VuYWJsZWQYASABKAgSoQEKFWFsbG93ZWRfc3Vic2NyaXB0aW9ucxgCIAMoCUKBAZJBfjJSVGhlIHN1YnNjcmlwdGlvbnMgdGhhdCBjYW4gYWNjZXNzIHRoZSBSZWRwYW5kYSBBenVyZSBQcml2YXRlTGluayBFbmRwb2ludCBTZXJ2aWNlLkooWyI0YTczYjAyZS05MGMxLTRkNzYtYWYzNi01YzkzNWRkNDFlN2MiXRIXCg9jb25uZWN0X2NvbnNvbGUYAyABKAgSsAEKE2thZmthX2FwaV9hdXRoX21vZGUYBCABKA4yMS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlByaXZhdGVMaW5rQXV0aE1vZGVCYJJBXTJbSW5kaWNhdGlvbiBvbiB0aGUgYXV0aGVudGljYXRpb24gbWV0aG9kcyBjb25maWd1cmVkIGZvciBLYWZrYSBBUEkgYXQgUmVkcGFuZGEgUHJpdmF0ZSBMaW5rLhKyAQoUaHR0cF9wcm94eV9hdXRoX21vZGUYBSABKA4yMS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlByaXZhdGVMaW5rQXV0aE1vZGVCYZJBXjJcSW5kaWNhdGlvbiBvbiB0aGUgYXV0aGVudGljYXRpb24gbWV0aG9kcyBjb25maWd1cmVkIGZvciBIVFRQIHByb3h5IGF0IFJlZHBhbmRhIFByaXZhdGUgTGluay4SvAEKGXNjaGVtYV9yZWdpc3RyeV9hdXRoX21vZGUYBiABKA4yMS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlByaXZhdGVMaW5rQXV0aE1vZGVCZpJBYzJhSW5kaWNhdGlvbiBvbiB0aGUgYXV0aGVudGljYXRpb24gbWV0aG9kcyBjb25maWd1cmVkIGZvciBTY2hlbWEgUmVnaXN0cnkgYXQgUmVkcGFuZGEgUHJpdmF0ZSBMaW5rLiKiAQoMS2Fma2FBUElTcGVjEjQKBG10bHMYASABKAsyJi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk1UTFNTcGVjEjQKBHNhc2wYAiABKAsyJi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlNBU0xTcGVjOiaSQSMKITIfQ2x1c3RlcidzIEthZmthIEFQSSBwcm9wZXJ0aWVzLiL4AgoNSFRUUFByb3h5U3BlYxI0CgRtdGxzGAEgASgLMiYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5NVExTU3BlYxI0CgRzYXNsGAIgASgLMiYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5TQVNMU3BlYzr6AZJB9gEK8wEy8AFDbHVzdGVyJ3MgSFRUUCBQcm94eSBwcm9wZXJ0aWVzLiBTZWUgW1VzZSBSZWRwYW5kYSB3aXRoIHRoZSBIVFRQIFByb3h5IEFQSV0oaHR0cHM6Ly9kb2NzLnJlZHBhbmRhLmNvbS9yZWRwYW5kYS1jbG91ZC9kZXZlbG9wL2h0dHAtcHJveHkvKSBhbmQgdGhlIFtIVFRQIFByb3h5IEFQSSByZWZlcmVuY2VdKGh0dHBzOi8vZG9jcy5yZWRwYW5kYS5jb20vYXBpL2RvYy9odHRwLXByb3h5KSBmb3IgbW9yZSBpbmZvcm1hdGlvbi4ilwMKElNjaGVtYVJlZ2lzdHJ5U3BlYxI0CgRtdGxzGAEgASgLMiYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5NVExTU3BlYxI0CgRzYXNsGAIgASgLMiYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5TQVNMU3BlYzqUApJBkAIKjQIyigJDbHVzdGVyJ3MgU2NoZW1hIFJlZ2lzdHJ5IHByb3BlcnRpZXMuIFNlZSB0aGUgW1NjaGVtYSBSZWdpc3RyeSBvdmVydmlld10oaHR0cHM6Ly9kb2NzLnJlZHBhbmRhLmNvbS9yZWRwYW5kYS1jbG91ZC9tYW5hZ2Uvc2NoZW1hLXJlZy9zY2hlbWEtcmVnLW92ZXJ2aWV3LykgYW5kIHRoZSBbU2NoZW1hIFJlZ2lzdHJ5IEFQSSByZWZlcmVuY2VdKGh0dHBzOi8vZG9jcy5yZWRwYW5kYS5jb20vYXBpL2RvYy9zY2hlbWEtcmVnaXN0cnkpIGZvciBtb3JlIGluZm9ybWF0aW9uLiKGBAoXTWFpbnRlbmFuY2VXaW5kb3dDb25maWcSUQoIZGF5X2hvdXIYASABKAsyPS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk1haW50ZW5hbmNlV2luZG93Q29uZmlnLkRheUhvdXJIABJQCgdhbnl0aW1lGAIgASgLMj0ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5NYWludGVuYW5jZVdpbmRvd0NvbmZpZy5Bbnl0aW1lSAASWAoLdW5zcGVjaWZpZWQYAyABKAsyQS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk1haW50ZW5hbmNlV2luZG93Q29uZmlnLlVuc3BlY2lmaWVkSAAaDQoLVW5zcGVjaWZpZWQaYAoHRGF5SG91chIeCgtob3VyX29mX2RheRgBIAEoBUIJukgGGgQYFygAEjUKC2RheV9vZl93ZWVrGAIgASgOMhYuZ29vZ2xlLnR5cGUuRGF5T2ZXZWVrQgi6SAWCAQIQARoJCgdBbnl0aW1lOmaSQWMKYSoXTWFpbnRlbmFuY2VXaW5kb3dDb25maWcyRlJlc291cmNlIGRlc2NyaWJpbmcgdGhlIG1haW50ZW5hbmNlIHdpbmRvdyBjb25maWd1cmF0aW9uIG9mIGEgY2x1c3Rlci5CCAoGd2luZG93IigKDEthZmthQ29ubmVjdBIYCgdlbmFibGVkGAEgASgIQge6SARqAggAIqEcCg1DbHVzdGVyQ3JlYXRlEmgKBG5hbWUYASABKAlCWpJBNDIbVW5pcXVlIG5hbWUgb2YgdGhlIGNsdXN0ZXIuShUiZGV2ZWxvcG1lbnQtY2x1c3RlciLgQQK6SB3IAQFyGBADGIABMhFeW0EtWmEtejAtOS06X10rJBJ2ChFyZXNvdXJjZV9ncm91cF9pZBgCIAEoCUJbkkFKMiBSZXNvdXJjZSBncm91cCBJRCBvZiB0aGUgY2x1c3RlckomImEwYjQwYWY5LTAyNTAtNDhjYS05NDE3LTc4M2VkMTI3Y2U0MiLgQQK6SAjIAQFyA7ABARJlChByZWRwYW5kYV92ZXJzaW9uGAMgASgJQka6SEPYAQFyPjI8Xig/UDxtYWpvcj4wfFsxLTldXGQqKVwuKD9QPG1pbm9yPjB8WzEtOV1cZCopKFwuWzAtOV17MTR9KT8kSACIAQESIgoPdGhyb3VnaHB1dF90aWVyGAQgASgJQgngQQK6SAPIAQESbQoEdHlwZRgFIAEoDjIqLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5UeXBlQjOSQSAqDENsdXN0ZXIgdHlwZUoQIlRZUEVfREVESUNBVEVEIuBBArpICsgBAYIBBBABIAAS3gEKD2Nvbm5lY3Rpb25fdHlwZRgGIAEoDjI0LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5Db25uZWN0aW9uVHlwZUKOAZJBigEybkNvbmZpZ3VyZSBpZiB0aGUgY2x1c3RlciBpcyBleHBvc2VkIHRvIHRoZSBpbnRlcm5ldCAoQ09OTkVDVElPTl9UWVBFX1BVQkxJQykgb3Igbm90IChDT05ORUNUSU9OX1RZUEVfUFJJVkFURSkuShgiQ09OTkVDVElPTl9UWVBFX1BVQkxJQyISgQEKCm5ldHdvcmtfaWQYByABKAlCbZJBTTIzSWQgb2YgdGhlIG5ldHdvcmsgd2hlcmUgdGhlIGNsdXN0ZXIgd2lsbCBiZSBwbGFjZWQuShYiY2pjdXE3OWM0dnM5NGZjdWZjMmci4EECukgXyAEBchIyDV5bYS12MC05XXsyMH2YARQSqQEKDmNsb3VkX3Byb3ZpZGVyGAggASgOMisucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbG91ZFByb3ZpZGVyQmSSQVgqDkNsb3VkIFByb3ZpZGVyMjBDbG91ZCBwcm92aWRlciB3aGVyZSB0aGUgY2x1c3RlciB3aWxsIGJlIGhvc3RlZC5KFCJDTE9VRF9QUk9WSURFUl9HQ1Ai4EECukgDyAEBEhkKBnJlZ2lvbhgJIAEoCUIJ4EECukgDyAEBEh0KBXpvbmVzGAogAygJQg7gQQK6SAjIAQGSAQIYARI9CglrYWZrYV9hcGkYCyABKAsyKi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkthZmthQVBJU3BlYxI/CgpodHRwX3Byb3h5GAwgASgLMisucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5IVFRQUHJveHlTcGVjEkkKD3NjaGVtYV9yZWdpc3RyeRgNIAEoCzIwLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuU2NoZW1hUmVnaXN0cnlTcGVjEloKGmN1c3RvbWVyX21hbmFnZWRfcmVzb3VyY2VzGA4gASgLMjYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMSTwoQYXdzX3ByaXZhdGVfbGluaxgPIAEoCzIwLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQVdTUHJpdmF0ZUxpbmtTcGVjSAGIAQESZAobZ2NwX3ByaXZhdGVfc2VydmljZV9jb25uZWN0GBAgASgLMjoucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HQ1BQcml2YXRlU2VydmljZUNvbm5lY3RTcGVjSAKIAQESUwoSYXp1cmVfcHJpdmF0ZV9saW5rGBMgASgLMjIucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5BenVyZVByaXZhdGVMaW5rU3BlY0gDiAEBEmkKE2Nsb3VkX3Byb3ZpZGVyX3RhZ3MYESADKAsyQi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXJDcmVhdGUuQ2xvdWRQcm92aWRlclRhZ3NFbnRyeUIIukgFmgECEBASigEKGHJlYWRfcmVwbGljYV9jbHVzdGVyX2lkcxgSIAMoCUJokkFFMkNJRHMgb2YgY2x1c3RlcnMgdGhhdCBjYW4gY3JlYXRlIHJlYWQtb25seSB0b3BpY3MgZnJvbSB0aGlzIGNsdXN0ZXIuukgdkgEaEGQYASIUchIyDV5bYS12MC05XXsyMH2YARQSWAoZbWFpbnRlbmFuY2Vfd2luZG93X2NvbmZpZxgUIAEoCzI1LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuTWFpbnRlbmFuY2VXaW5kb3dDb25maWcSIAoYZ2NwX2VuYWJsZV9nbG9iYWxfYWNjZXNzGBUgASgIEkUKDWthZmthX2Nvbm5lY3QYFiABKAsyKi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkthZmthQ29ubmVjdEICGAESXwoVY2x1c3Rlcl9jb25maWd1cmF0aW9uGBcgASgLMkAucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyQ3JlYXRlLkNsdXN0ZXJDb25maWd1cmF0aW9uEk8KDWNsb3VkX3N0b3JhZ2UYGCABKAsyOC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXJDcmVhdGUuQ2xvdWRTdG9yYWdlGjgKFkNsb3VkUHJvdmlkZXJUYWdzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARpKChRDbHVzdGVyQ29uZmlndXJhdGlvbhIyChFjdXN0b21fcHJvcGVydGllcxgBIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3Qa/QIKDENsb3VkU3RvcmFnZRJLCgNhd3MYASABKAsyPC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXJDcmVhdGUuQ2xvdWRTdG9yYWdlLkFXU0gAEksKA2djcBgCIAEoCzI8LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3RlckNyZWF0ZS5DbG91ZFN0b3JhZ2UuR0NQSAASTwoFYXp1cmUYAyABKAsyPi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXJDcmVhdGUuQ2xvdWRTdG9yYWdlLkF6dXJlSAASFAoMc2tpcF9kZXN0cm95GAQgASgIGgUKA0FXUxoFCgNHQ1AaTAoFQXp1cmUSHQoLYWxsb3dlZF9pcHMYBSADKAlCCLpIBZIBAhgBEiQKEmFsbG93ZWRfc3VibmV0X2lkcxgGIAMoCUIIukgFkgECGAFCEAoOY2xvdWRfcHJvdmlkZXI64QWSQTgKNioNQ2x1c3RlckNyZWF0ZTIlUmVzb3VyY2UgZGVzY3JpYmluZyBhIENyZWF0ZSBDbHVzdGVyLrpIogUakQEKLGF3c19wcml2YXRlX2xpbmtfX19hd3NfcHJpdmF0ZV9saW5rLmF3c19vbmx5Eihhd3NfcHJpdmF0ZV9saW5rIGlzIG9ubHkgYXZhaWxhYmUgaW4gQVdTGjchaGFzKHRoaXMuYXdzX3ByaXZhdGVfbGluaykgfHwgdGhpcy5jbG91ZF9wcm92aWRlciA9PSAxGrwBCkJnY3BfcHJpdmF0ZV9zZXJ2aWNlX2Nvbm5lY3RfX19nY3BfcHJpdmF0ZV9zZXJ2aWNlX2Nvbm5lY3QuZ2NwX29ubHkSMmdjcF9wcml2YXRlX3NlcnZpY2VfY29ubmVjdCBpcyBvbnkgYXZhaWxhYmUgaW4gR0NQGkIhaGFzKHRoaXMuZ2NwX3ByaXZhdGVfc2VydmljZV9jb25uZWN0KSB8fCB0aGlzLmNsb3VkX3Byb3ZpZGVyID09IDIangEKMmF6dXJlX3ByaXZhdGVfbGlua19fX2F6dXJlX3ByaXZhdGVfbGluay5henVyZV9vbmx5Ei1henVyZV9wcml2YXRlX2xpbmsgaXMgYXZhaWxhYmxlIG9ubHkgaW4gQXp1cmUaOSFoYXModGhpcy5henVyZV9wcml2YXRlX2xpbmspIHx8IHRoaXMuY2xvdWRfcHJvdmlkZXIgPT0gMxqrAQo5Z2NwX2VuYWJsZV9nbG9iYWxfYWNjZXNzX19fZ2xvYmFsX2FjY2Vzc19lbmFibGVkLmdjcF9vbmx5EjFnY3BfZW5hYmxlX2dsb2JhbF9hY2Nlc3MgaXMgYXZhaWxhYmxlIG9ubHkgaW4gR0NQGjshdGhpcy5nY3BfZW5hYmxlX2dsb2JhbF9hY2Nlc3MgfHwgdGhpcy5jbG91ZF9wcm92aWRlciA9PSAgMkITChFfcmVkcGFuZGFfdmVyc2lvbkITChFfYXdzX3ByaXZhdGVfbGlua0IeChxfZ2NwX3ByaXZhdGVfc2VydmljZV9jb25uZWN0QhUKE19henVyZV9wcml2YXRlX2xpbmsizA8KDUNsdXN0ZXJVcGRhdGUSKQoCaWQYASABKAlCHeBBArpIF8gBAXISMg1eW2EtdjAtOV17MjB9mAEUEkUKBG5hbWUYAiABKAlCN5JBNDIbVW5pcXVlIG5hbWUgb2YgdGhlIGNsdXN0ZXIuShUiZGV2ZWxvcG1lbnQtY2x1c3RlciISPQoJa2Fma2FfYXBpGAMgASgLMioucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5LYWZrYUFQSVNwZWMSPwoKaHR0cF9wcm94eRgEIAEoCzIrLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuSFRUUFByb3h5U3BlYxJJCg9zY2hlbWFfcmVnaXN0cnkYBSABKAsyMC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlNjaGVtYVJlZ2lzdHJ5U3BlYxJPChBhd3NfcHJpdmF0ZV9saW5rGAYgASgLMjAucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5BV1NQcml2YXRlTGlua1NwZWNIAIgBARJkChtnY3BfcHJpdmF0ZV9zZXJ2aWNlX2Nvbm5lY3QYByABKAsyOi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdDUFByaXZhdGVTZXJ2aWNlQ29ubmVjdFNwZWNIAYgBARJTChJhenVyZV9wcml2YXRlX2xpbmsYCiABKAsyMi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkF6dXJlUHJpdmF0ZUxpbmtTcGVjSAKIAQESYAoaY3VzdG9tZXJfbWFuYWdlZF9yZXNvdXJjZXMYCCABKAsyPC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkN1c3RvbWVyTWFuYWdlZFJlc291cmNlc1VwZGF0ZRKLAQoYcmVhZF9yZXBsaWNhX2NsdXN0ZXJfaWRzGAkgAygJQmmSQUYyRElEcyBvZiBjbHVzdGVycyB3aGljaCBtYXkgY3JlYXRlIHJlYWQtb25seSB0b3BpY3MgZnJvbSB0aGlzIGNsdXN0ZXIuukgdkgEaEGQYASIUchIyDV5bYS12MC05XXsyMH2YARQSaQoTY2xvdWRfcHJvdmlkZXJfdGFncxgLIAMoCzJCLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3RlclVwZGF0ZS5DbG91ZFByb3ZpZGVyVGFnc0VudHJ5Qgi6SAWaAQIQEBJYChltYWludGVuYW5jZV93aW5kb3dfY29uZmlnGAwgASgLMjUucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5NYWludGVuYW5jZVdpbmRvd0NvbmZpZxJFCg1rYWZrYV9jb25uZWN0GA0gASgLMioucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5LYWZrYUNvbm5lY3RCAhgBEl8KFWNsdXN0ZXJfY29uZmlndXJhdGlvbhgOIAEoCzJALnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3RlclVwZGF0ZS5DbHVzdGVyQ29uZmlndXJhdGlvbhIXCg90aHJvdWdocHV0X3RpZXIYDyABKAkSGwoTcmVkcGFuZGFfbm9kZV9jb3VudBgQIAEoBRJPCg1jbG91ZF9zdG9yYWdlGBEgASgLMjgucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyVXBkYXRlLkNsb3VkU3RvcmFnZRo4ChZDbG91ZFByb3ZpZGVyVGFnc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEaSgoUQ2x1c3RlckNvbmZpZ3VyYXRpb24SMgoRY3VzdG9tX3Byb3BlcnRpZXMYASABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0Gv0CCgxDbG91ZFN0b3JhZ2USSwoDYXdzGAEgASgLMjwucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyVXBkYXRlLkNsb3VkU3RvcmFnZS5BV1NIABJLCgNnY3AYAiABKAsyPC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXJVcGRhdGUuQ2xvdWRTdG9yYWdlLkdDUEgAEk8KBWF6dXJlGAMgASgLMj4ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyVXBkYXRlLkNsb3VkU3RvcmFnZS5BenVyZUgAEhQKDHNraXBfZGVzdHJveRgEIAEoCBoFCgNBV1MaBQoDR0NQGkwKBUF6dXJlEh0KC2FsbG93ZWRfaXBzGAUgAygJQgi6SAWSAQIYARIkChJhbGxvd2VkX3N1Ym5ldF9pZHMYBiADKAlCCLpIBZIBAhgBQhAKDmNsb3VkX3Byb3ZpZGVyOjySQTkKNyoNQ2x1c3RlclVwZGF0ZTImUmVzb3VyY2UgZGVzY3JpYmluZyBhbiBVcGRhdGUgQ2x1c3Rlci5CEwoRX2F3c19wcml2YXRlX2xpbmtCHgocX2djcF9wcml2YXRlX3NlcnZpY2VfY29ubmVjdEIVChNfYXp1cmVfcHJpdmF0ZV9saW5rIosBCgtTZWVkQnJva2VycxIMCgRzYXNsGAEgASgJEgwKBG10bHMYAiABKAkSGQoRcHJpdmF0ZV9saW5rX3Nhc2wYAyABKAkSGQoRcHJpdmF0ZV9saW5rX210bHMYBCABKAk6KpJBJwolMiNTZWVkIGJyb2tlcnMgb2YgUmVkcGFuZGEgS2Fma2EgQVBJLiKeAQoJRW5kcG9pbnRzEgwKBHNhc2wYASABKAkSDAoEbXRscxgCIAEoCRIZChFwcml2YXRlX2xpbmtfc2FzbBgDIAEoCRIZChFwcml2YXRlX2xpbmtfbXRscxgEIAEoCTo/kkE8CjoyOFRoZSBlbmRwb2ludHMgb2YgUmVkcGFuZGEgSFRUUCBQcm94eSBvciBTY2hlbWEgUmVnaXN0cnkuIvlbCgdDbHVzdGVyEgoKAmlkGAEgASgJEkUKBG5hbWUYAiABKAlCN5JBNDIbVW5pcXVlIG5hbWUgb2YgdGhlIGNsdXN0ZXIuShUiZGV2ZWxvcG1lbnQtY2x1c3RlciISaQoRcmVzb3VyY2VfZ3JvdXBfaWQYAyABKAlCTpJBSzIhUmVzb3VyY2UgZ3JvdXAgSUQgb2YgdGhlIGNsdXN0ZXIuSiYiYTBiNDBhZjktMDI1MC00OGNhLTk0MTctNzgzZWQxMjdjZTQyIhIuCgpjcmVhdGVkX2F0GAQgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgp1cGRhdGVkX2F0GAUgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBI/CgVzdGF0ZRgGIAEoDjIrLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5TdGF0ZUID4EEDEi0KEXN0YXRlX2Rlc2NyaXB0aW9uGAcgASgLMhIuZ29vZ2xlLnJwYy5TdGF0dXMSIAoYY3VycmVudF9yZWRwYW5kYV92ZXJzaW9uGAggASgJEhcKD3Rocm91Z2hwdXRfdGllchgJIAEoCRI4CgR0eXBlGAogASgOMioucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLlR5cGUS3gEKD2Nvbm5lY3Rpb25fdHlwZRgLIAEoDjI0LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5Db25uZWN0aW9uVHlwZUKOAZJBigEybkNvbmZpZ3VyZSBpZiB0aGUgY2x1c3RlciBpcyBleHBvc2VkIHRvIHRoZSBpbnRlcm5ldCAoQ09OTkVDVElPTl9UWVBFX1BVQkxJQykgb3Igbm90IChDT05ORUNUSU9OX1RZUEVfUFJJVkFURSkuShgiQ09OTkVDVElPTl9UWVBFX1BVQkxJQyISVAoKbmV0d29ya19pZBgMIAEoCUJAkkE9MiNOZXR3b3JrIElEIHdoZXJlIGNsdXN0ZXIgaXMgcGxhY2VkLkoWImNqY3VxNzljNHZzOTRmY3VmYzJnIhKcAQoOY2xvdWRfcHJvdmlkZXIYDSABKA4yKy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsb3VkUHJvdmlkZXJCV5JBVCoOY2xvdWQgcHJvdmlkZXIyLENsb3VkIHByb3ZpZGVyIHdoZXJlIGNsdXN0ZXIgaXMgcHJvdmlzaW9uZWQuShQiQ0xPVURfUFJPVklERVJfR0NQIhI6CgZyZWdpb24YDiABKAlCKpJBJyoWQ2xvdWQgcHJvdmlkZXIgcmVnaW9uLkoNInVzLWNlbnRyYWwxIhINCgV6b25lcxgPIAMoCRJBCglrYWZrYV9hcGkYECABKAsyLi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXIuS2Fma2FBUEkSUQoKaHR0cF9wcm94eRgRIAEoCzI1LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5IVFRQUHJveHlTdGF0dXNCBuBBBeBBAxJPChByZWRwYW5kYV9jb25zb2xlGBIgASgLMjUucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLlJlZHBhbmRhQ29uc29sZRJTCg9zY2hlbWFfcmVnaXN0cnkYEyABKAsyOi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXIuU2NoZW1hUmVnaXN0cnlTdGF0dXMSRAoKcHJvbWV0aGV1cxgUIAEoCzIwLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5Qcm9tZXRoZXVzEloKGmN1c3RvbWVyX21hbmFnZWRfcmVzb3VyY2VzGBUgASgLMjYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DdXN0b21lck1hbmFnZWRSZXNvdXJjZXMSUwoQYXdzX3ByaXZhdGVfbGluaxgWIAEoCzI0LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5BV1NQcml2YXRlTGlua0gAiAEBEmgKG2djcF9wcml2YXRlX3NlcnZpY2VfY29ubmVjdBgXIAEoCzI+LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5HQ1BQcml2YXRlU2VydmljZUNvbm5lY3RIAYgBARJXChJhenVyZV9wcml2YXRlX2xpbmsYGyABKAsyNi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXIuQXp1cmVQcml2YXRlTGlua0gCiAEBEk4KDWRhdGFwbGFuZV9hcGkYGCABKAsyMi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXIuRGF0YXBsYW5lQVBJQgPgQQMSYwoTY2xvdWRfcHJvdmlkZXJfdGFncxgZIAMoCzI8LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5DbG91ZFByb3ZpZGVyVGFnc0VudHJ5Qgi6SAWaAQIQBRJrChhyZWFkX3JlcGxpY2FfY2x1c3Rlcl9pZHMYGiADKAlCSZJBRjJESURzIG9mIGNsdXN0ZXJzIHdoaWNoIG1heSBjcmVhdGUgcmVhZC1vbmx5IHRvcGljcyBmcm9tIHRoaXMgY2x1c3Rlci4SWAoZbWFpbnRlbmFuY2Vfd2luZG93X2NvbmZpZxgcIAEoCzI1LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuTWFpbnRlbmFuY2VXaW5kb3dDb25maWcSJgoZZ2NwX2dsb2JhbF9hY2Nlc3NfZW5hYmxlZBgdIAEoCEgDiAEBEkEKDWthZmthX2Nvbm5lY3QYHiABKAsyKi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkthZmthQ29ubmVjdBIgChhkZXNpcmVkX3JlZHBhbmRhX3ZlcnNpb24YHyABKAkSWQoVY2x1c3Rlcl9jb25maWd1cmF0aW9uGCAgASgLMjoucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLkNsdXN0ZXJDb25maWd1cmF0aW9uEkkKDWNsb3VkX3N0b3JhZ2UYISABKAsyMi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXIuQ2xvdWRTdG9yYWdlEhsKE3JlZHBhbmRhX25vZGVfY291bnQYIiABKAUSGQoMbmF0X2dhdGV3YXlzGCQgAygJQgPgQQMa/gEKCEthZmthQVBJEhQKDHNlZWRfYnJva2VycxgBIAMoCRI0CgRtdGxzGAIgASgLMiYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5NVExTU3BlYxI0CgRzYXNsGAMgASgLMiYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5TQVNMU3BlYxJIChBhbGxfc2VlZF9icm9rZXJzGAQgASgLMikucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5TZWVkQnJva2Vyc0ID4EEDOiaSQSMKITIfQ2x1c3RlcidzIEthZmthIEFQSSBwcm9wZXJ0aWVzLhr9AgoPSFRUUFByb3h5U3RhdHVzEjQKBG10bHMYASABKAsyJi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk1UTFNTcGVjEoYBCgN1cmwYAiABKAlCeZJBcDIaSFRUUCBQcm94eSBVUkwgb2YgY2x1c3Rlci5KUiJodHRwczovL3BhbmRhcHJveHktYWEwMDAwbDAuY2piNjloMWM0dnM0MnBjYTg5czAuZm1jLnByZC5jbG91ZC5yZWRwYW5kYS5jb206OTA5MiLgQQXgQQMSNAoEc2FzbBgDIAEoCzImLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuU0FTTFNwZWMSPgoIYWxsX3VybHMYBSABKAsyJy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkVuZHBvaW50c0ID4EEDOh2SQRoKGDIWSFRUUCBQcm94eSBwcm9wZXJ0aWVzLkoECAQQBVIQYWxsX3NlZWRfYnJva2VycxrBAQoPUmVkcGFuZGFDb25zb2xlEn0KA3VybBgCIAEoCUJwkkFtMhlSZWRwYW5kYSBDb25zb2xlIEFQSSBVUkwuQAFKTiJodHRwczovL2NvbnNvbGUtYWEwMDAwbDAuY2piNjloMWM0dnM0MnBjYTg5czAuZm1jLnByZC5jbG91ZC5yZWRwYW5kYS5jb20vYXBpIjovkkEsCioyJkNsdXN0ZXIncyBSZWRwYW5kYSBDb25zb2xlIHByb3BlcnRpZXMuQAEalQIKFFNjaGVtYVJlZ2lzdHJ5U3RhdHVzEjQKBG10bHMYASABKAsyJi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk1UTFNTcGVjEgsKA3VybBgCIAEoCRI0CgRzYXNsGAMgASgLMiYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5TQVNMU3BlYxI+CghhbGxfdXJscxgFIAEoCzInLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuRW5kcG9pbnRzQgPgQQM6LJJBKQonMiVDbHVzdGVyJ3MgU2NoZW1hIFJlZ2lzdHJ5IHByb3BlcnRpZXMuSgQIBBAFUhBhbGxfc2VlZF9icm9rZXJzGuABCgpQcm9tZXRoZXVzEp8BCgN1cmwYAiABKAlCkQGSQYcBMhNQcm9tZXRoZXVzIEFQSSBVUkwuQAFKbiJodHRwczovL2NvbnNvbGUtYWEwMDAwbDAuY2piNjloMWM0dnM0MnBjYTg5czAuZm1jLnByZC5jbG91ZC5yZWRwYW5kYS5jb20vYXBpL2Nsb3VkL3Byb21ldGhldXMvcHVibGljX21ldHJpY3Mi4EEF4EEDOjCSQS0KKzInUHJvbWV0aGV1cyBtZXRyaWNzIGVuZHBvaW50IHByb3BlcnRpZXMuQAEarRQKDkFXU1ByaXZhdGVMaW5rEg8KB2VuYWJsZWQYASABKAgSrAIKEmFsbG93ZWRfcHJpbmNpcGFscxgCIAMoCUKPApJBiwIylQFUaGUgQVJOIG9mIHRoZSBwcmluY2lwYWxzIHRoYXQgY2FuIGFjY2VzcyB0aGUgUmVkcGFuZGEgQVdTIFByaXZhdGVMaW5rIEVuZHBvaW50IFNlcnZpY2UuIFRvIGdyYW50IHBlcm1pc3Npb25zIHRvIGFsbCBwcmluY2lwYWxzLCB1c2UgYW4gYXN0ZXJpc2sgKCopLkpxWyJhcm46YXdzOmlhbTo6YWNjb3VudC1udW1iZXItd2l0aG91dC1oeXBoZW5zOnVzZXIvdXNlcm5hbWUgb3IgYXJuOmF3czppYW06OmFjY291bnQtbnVtYmVyLXdpdGhvdXQtaHlwaGVuczpyb290Il0SUAoGc3RhdHVzGAQgASgLMjsucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLkFXU1ByaXZhdGVMaW5rLlN0YXR1c0ID4EEDEhcKD2Nvbm5lY3RfY29uc29sZRgFIAEoCBKwAQoTa2Fma2FfYXBpX2F1dGhfbW9kZRgGIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJgkkFdMltJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIEthZmthIEFQSSBhdCBSZWRwYW5kYSBQcml2YXRlIExpbmsuErIBChRodHRwX3Byb3h5X2F1dGhfbW9kZRgHIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJhkkFeMlxJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIEhUVFAgUHJveHkgYXQgUmVkcGFuZGEgUHJpdmF0ZSBMaW5rLhK8AQoZc2NoZW1hX3JlZ2lzdHJ5X2F1dGhfbW9kZRgIIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJmkkFjMmFJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIFNjaGVtYSBSZWdpc3RyeSBhdCBSZWRwYW5kYSBQcml2YXRlIExpbmsuGsgMCgZTdGF0dXMSZwoKc2VydmljZV9pZBgBIAEoCUJTkkFQMjBJRCBvZiBSZWRwYW5kYSBBV1MgUHJpdmF0ZUxpbmsgRW5kcG9pbnQgU2VydmljZS5KHCJ2cGNlLXN2Yy0wNWZmZjIxMTdkNjQ4ZGEzNSISiAEKDHNlcnZpY2VfbmFtZRgCIAEoCUJykkFvMjJOYW1lIG9mIFJlZHBhbmRhIEFXUyBQcml2YXRlTGluayBFbmRwb2ludCBTZXJ2aWNlLko5ImNvbS5hbWF6b25hd3MudnBjZS51cy13ZXN0LTIudnBjZS1zdmMtMDVmZmYyMTE3ZDY0OGRhMzUiEoQBCg1zZXJ2aWNlX3N0YXRlGAMgASgJQm2SQWoyM1N0YXRlIG9mIFJlZHBhbmRhIEFXUyBQcml2YXRlTGluayBFbmRwb2ludCBTZXJ2aWNlLkozIlBlbmRpbmcgfCBBdmFpbGFibGUgfCBEZWxldGluZyB8IERlbGV0ZWQgfCBGYWlsZWQiEi4KCmNyZWF0ZWRfYXQYBCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCmRlbGV0ZWRfYXQYBSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEnMKGHZwY19lbmRwb2ludF9jb25uZWN0aW9ucxgGIAMoCzJRLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5BV1NQcml2YXRlTGluay5TdGF0dXMuVlBDRW5kcG9pbnRDb25uZWN0aW9uEhsKE2thZmthX2FwaV9zZWVkX3BvcnQYByABKAUSIQoZc2NoZW1hX3JlZ2lzdHJ5X3NlZWRfcG9ydBgIIAEoBRIgChhyZWRwYW5kYV9wcm94eV9zZWVkX3BvcnQYCSABKAUSIAoYa2Fma2FfYXBpX25vZGVfYmFzZV9wb3J0GAogASgFEiUKHXJlZHBhbmRhX3Byb3h5X25vZGVfYmFzZV9wb3J0GAsgASgFEhQKDGNvbnNvbGVfcG9ydBgMIAEoBRqsBgoVVlBDRW5kcG9pbnRDb25uZWN0aW9uEgoKAmlkGAEgASgJEg0KBW93bmVyGAIgASgJErsBCgVzdGF0ZRgDIAEoCUKrAZJBpwEyUVRoZSBzdGF0ZSBvZiBWUEMgZW5kcG9pbnQgY29ubmVjdGVkIHRvIFJlZHBhbmRhIEFXUyBQcml2YXRlTGluayBFbmRwb2ludCBTZXJ2aWNlLkpSInBlbmRpbmdBY2NlcHRhbmNlIHwgcGVuZGluZyB8IGF2YWlsYWJsZSB8IGRlbGV0aW5nIHwgZGVsZXRlZCB8IHJlamVjdGVkIHwgZmFpbGVkIhIuCgpjcmVhdGVkX2F0GAQgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBKPAQoNY29ubmVjdGlvbl9pZBgFIAEoCUJ4kkF1MlVDb25uZWN0aW9uIElEIG9mIFZQQyBlbmRwb2ludCBjb25uZWN0ZWQgdG8gUmVkcGFuZGEgQVdTIFByaXZhdGVMaW5rIEVuZHBvaW50IFNlcnZpY2UuShwidnBjZS1jb24tMDBiOWNiYTMzNjBmZTRhZWMiEhoKEmxvYWRfYmFsYW5jZXJfYXJucxgGIAMoCRJvCgtkbnNfZW50cmllcxgHIAMoCzJaLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5BV1NQcml2YXRlTGluay5TdGF0dXMuVlBDRW5kcG9pbnRDb25uZWN0aW9uLkROU0VudHJ5GuoBCghETlNFbnRyeRLFAQoIZG5zX25hbWUYASABKAlCsgGSQa4BMlFETlMgZW50cnkgb2YgVlBDIGVuZHBvaW50IGNvbm5lY3RlZCB0byBSZWRwYW5kYSBBV1MgUHJpdmF0ZUxpbmsgRW5kcG9pbnQgU2VydmljZS5KWSJ2cGNlLTA3NTFiN2FkOGE1MTc3N2YyLTFocGlldmY1LnZwY2Utc3ZjLTBkNDg5ZmE4OWYyNGUzODAyLnVzLWVhc3QtMi52cGNlLmFtYXpvbmF3cy5jb20iEhYKDmhvc3RlZF96b25lX2lkGAIgASgJGpoMChhHQ1BQcml2YXRlU2VydmljZUNvbm5lY3QSDwoHZW5hYmxlZBgBIAEoCBIdChVnbG9iYWxfYWNjZXNzX2VuYWJsZWQYAiABKAgS0gEKFGNvbnN1bWVyX2FjY2VwdF9saXN0GAMgAygLMj4ucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HQ1BQcml2YXRlU2VydmljZUNvbm5lY3RDb25zdW1lckJ0kkFxMm9MaXN0IG9mIGNvbnN1bWVycyB0aGF0IGFyZSBhbGxvd2VkIHRvIGNvbm5lY3QgdG8gUmVkcGFuZGEgR0NQIFBTQyAoUHJpdmF0ZSBTZXJ2aWNlIENvbm5lY3QpIHNlcnZpY2UgYXR0YWNobWVudC4SVQoGc3RhdHVzGAQgASgLMkUucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLkdDUFByaXZhdGVTZXJ2aWNlQ29ubmVjdC5TdGF0dXMSxQEKE2thZmthX2FwaV9hdXRoX21vZGUYBSABKA4yMS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlByaXZhdGVMaW5rQXV0aE1vZGVCdZJBcjJwSW5kaWNhdGlvbiBvbiB0aGUgYXV0aGVudGljYXRpb24gbWV0aG9kcyBjb25maWd1cmVkIGZvciBLYWZrYSBBUEkgYXQgUmVkcGFuZGEgR0NQIFBTQyAoUHJpdmF0ZSBTZXJ2aWNlIENvbm5lY3QpLhLHAQoUaHR0cF9wcm94eV9hdXRoX21vZGUYBiABKA4yMS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlByaXZhdGVMaW5rQXV0aE1vZGVCdpJBczJxSW5kaWNhdGlvbiBvbiB0aGUgYXV0aGVudGljYXRpb24gbWV0aG9kcyBjb25maWd1cmVkIGZvciBIVFRQIHByb3h5IGF0IFJlZHBhbmRhIEdDUCBQU0MgKFByaXZhdGUgU2VydmljZSBDb25uZWN0KS4S0QEKGXNjaGVtYV9yZWdpc3RyeV9hdXRoX21vZGUYByABKA4yMS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlByaXZhdGVMaW5rQXV0aE1vZGVCe5JBeDJ2SW5kaWNhdGlvbiBvbiB0aGUgYXV0aGVudGljYXRpb24gbWV0aG9kcyBjb25maWd1cmVkIGZvciBTY2hlbWEgUmVnaXN0cnkgYXQgUmVkcGFuZGEgR0NQIFBTQyAoUHJpdmF0ZSBTZXJ2aWNlIENvbm5lY3QpLhq7BAoGU3RhdHVzEhoKEnNlcnZpY2VfYXR0YWNobWVudBgBIAEoCRIuCgpjcmVhdGVkX2F0GAIgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgpkZWxldGVkX2F0GAMgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIbChNrYWZrYV9hcGlfc2VlZF9wb3J0GAQgASgFEiEKGXNjaGVtYV9yZWdpc3RyeV9zZWVkX3BvcnQYBSABKAUSIAoYcmVkcGFuZGFfcHJveHlfc2VlZF9wb3J0GAYgASgFEiAKGGthZmthX2FwaV9ub2RlX2Jhc2VfcG9ydBgHIAEoBRIlCh1yZWRwYW5kYV9wcm94eV9ub2RlX2Jhc2VfcG9ydBgIIAEoBRJ0ChNjb25uZWN0ZWRfZW5kcG9pbnRzGAkgAygLMlcucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLkdDUFByaXZhdGVTZXJ2aWNlQ29ubmVjdC5TdGF0dXMuQ29ubmVjdGVkRW5kcG9pbnQSFQoNZG5zX2FfcmVjb3JkcxgKIAMoCRIVCg1zZWVkX2hvc3RuYW1lGAsgASgJGmYKEUNvbm5lY3RlZEVuZHBvaW50EhUKDWNvbm5lY3Rpb25faWQYASABKAkSGAoQY29uc3VtZXJfbmV0d29yaxgCIAEoCRIQCghlbmRwb2ludBgDIAEoCRIOCgZzdGF0dXMYBCABKAkakREKEEF6dXJlUHJpdmF0ZUxpbmsSDwoHZW5hYmxlZBgBIAEoCBLgAQoVYWxsb3dlZF9zdWJzY3JpcHRpb25zGAIgAygJQsABkkG8ATKPAVRoZSBzdWJzY3JpcHRpb25zIHRoYXQgY2FuIGFjY2VzcyB0aGUgUmVkcGFuZGEgQXp1cmUgUHJpdmF0ZUxpbmsgRW5kcG9pbnQgU2VydmljZS4gVG8gZ3JhbnQgcGVybWlzc2lvbnMgdG8gYWxsIHByaW5jaXBhbHMsIHVzZSBhbiBhc3RlcmlzayAoKikuSihbIjRhNzNiMDJlLTkwYzEtNGQ3Ni1hZjM2LTVjOTM1ZGQ0MWU3YyJdElIKBnN0YXR1cxgDIAEoCzI9LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3Rlci5BenVyZVByaXZhdGVMaW5rLlN0YXR1c0ID4EEDEhcKD2Nvbm5lY3RfY29uc29sZRgEIAEoCBKwAQoTa2Fma2FfYXBpX2F1dGhfbW9kZRgFIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJgkkFdMltJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIEthZmthIEFQSSBhdCBSZWRwYW5kYSBQcml2YXRlIExpbmsuErIBChRodHRwX3Byb3h5X2F1dGhfbW9kZRgGIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJhkkFeMlxJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIEhUVFAgcHJveHkgYXQgUmVkcGFuZGEgUHJpdmF0ZSBMaW5rLhK8AQoZc2NoZW1hX3JlZ2lzdHJ5X2F1dGhfbW9kZRgHIAEoDjIxLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuUHJpdmF0ZUxpbmtBdXRoTW9kZUJmkkFjMmFJbmRpY2F0aW9uIG9uIHRoZSBhdXRoZW50aWNhdGlvbiBtZXRob2RzIGNvbmZpZ3VyZWQgZm9yIFNjaGVtYSBSZWdpc3RyeSBhdCBSZWRwYW5kYSBQcml2YXRlIExpbmsuGvQJCgZTdGF0dXMStgEKCnNlcnZpY2VfaWQYASABKAlCoQGSQZ0BMjJJRCBvZiBSZWRwYW5kYSBBenVyZSBQcml2YXRlTGluayBFbmRwb2ludCBTZXJ2aWNlLkpnIi9zdWJzY3JpcHRpb25zLzxzdWItaWQ+L3Jlc291cmNlR3JvdXBzLzxyZy1pZD4vcHJvdmlkZXJzL01pY3Jvc29mdC5OZXR3b3JrL3ByaXZhdGVMaW5rU2VydmljZXMvPG5hbWU+IhJbCgxzZXJ2aWNlX25hbWUYAiABKAlCRZJBQjI0TmFtZSBvZiBSZWRwYW5kYSBBenVyZSBQcml2YXRlTGluayBFbmRwb2ludCBTZXJ2aWNlLkoKInBscy1uYW1lIhIuCgpjcmVhdGVkX2F0GAMgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIuCgpkZWxldGVkX2F0GAQgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBJ9Chxwcml2YXRlX2VuZHBvaW50X2Nvbm5lY3Rpb25zGAUgAygLMlcucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLkF6dXJlUHJpdmF0ZUxpbmsuU3RhdHVzLlByaXZhdGVFbmRwb2ludENvbm5lY3Rpb24SFAoMZG5zX2FfcmVjb3JkGAYgASgJEh4KFmFwcHJvdmVkX3N1YnNjcmlwdGlvbnMYByADKAkSGwoTa2Fma2FfYXBpX3NlZWRfcG9ydBgIIAEoBRIhChlzY2hlbWFfcmVnaXN0cnlfc2VlZF9wb3J0GAkgASgFEiAKGHJlZHBhbmRhX3Byb3h5X3NlZWRfcG9ydBgKIAEoBRIgChhrYWZrYV9hcGlfbm9kZV9iYXNlX3BvcnQYCyABKAUSJQodcmVkcGFuZGFfcHJveHlfbm9kZV9iYXNlX3BvcnQYDCABKAUSFAoMY29uc29sZV9wb3J0GA0gASgFGv0DChlQcml2YXRlRW5kcG9pbnRDb25uZWN0aW9uEh0KFXByaXZhdGVfZW5kcG9pbnRfbmFtZRgBIAEoCRLZAQoTcHJpdmF0ZV9lbmRwb2ludF9pZBgCIAEoCUK7AZJBtwEyT1Jlc291cmNlIElEIG9mIFByaXZhdGUgRW5kcG9pbnQgdG8gUmVkcGFuZGEgQXp1cmUgUHJpdmF0ZUxpbmsgRW5kcG9pbnQgU2VydmljZS5KZCIvc3Vic2NyaXB0aW9ucy88c3ViLWlkPi9yZXNvdXJjZUdyb3Vwcy88cmctaWQ+L3Byb3ZpZGVycy9NaWNyb3NvZnQuTmV0d29yay9wcml2YXRlRW5kcG9pbnRzLzxuYW1lPiISFwoPY29ubmVjdGlvbl9uYW1lGAMgASgJEhUKDWNvbm5lY3Rpb25faWQYBCABKAkShAEKBnN0YXR1cxgFIAEoCUJ0kkFxMlhUaGUgc3RhdHVzIG9mIHByaXZhdGUgZW5kcG9pbnQgY29ubmVjdGVkIHRvIFJlZHBhbmRhIEF6dXJlIFByaXZhdGVMaW5rIEVuZHBvaW50IFNlcnZpY2UuShUiQXBwcm92ZWQgfCBSZWplY3RlZCISLgoKY3JlYXRlZF9hdBgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAasgEKDERhdGFwbGFuZUFQSRJ1CgN1cmwYAiABKAlCaJJBXzITRGF0YSBQbGFuZSBBUEkgVVJMLkABSkYiaHR0cHM6Ly9hcGktYWIxMjM0bDAuY2piNjloMWM0dnM0MnBjYTg5czAuZm1jLnByZC5jbG91ZC5yZWRwYW5kYS5jb20i4EEF4EEDOiuSQSgKJjIkQ2x1c3RlcidzIERhdGEgUGxhbmUgQVBJIHByb3BlcnRpZXMuGjgKFkNsb3VkUHJvdmlkZXJUYWdzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ARqAAQoUQ2x1c3RlckNvbmZpZ3VyYXRpb24SMgoRY3VzdG9tX3Byb3BlcnRpZXMYASABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0EjQKE2NvbXB1dGVkX3Byb3BlcnRpZXMYAiABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0GvMDCgxDbG91ZFN0b3JhZ2USRQoDYXdzGAEgASgLMjYucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLkNsb3VkU3RvcmFnZS5BV1NIABJFCgNnY3AYAiABKAsyNi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXIuQ2xvdWRTdG9yYWdlLkdDUEgAEkkKBWF6dXJlGAMgASgLMjgucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbHVzdGVyLkNsb3VkU3RvcmFnZS5BenVyZUgAEhQKDHNraXBfZGVzdHJveRgEIAEoCBoSCgNBV1MSCwoDYXJuGAEgASgJGhMKA0dDUBIMCgRuYW1lGAEgASgJGrgBCgVBenVyZRIcChRzdG9yYWdlX2FjY291bnRfbmFtZRgBIAEoCRIWCg5jb250YWluZXJfbmFtZRgCIAEoCRIbChNyZXNvdXJjZV9ncm91cF9uYW1lGAMgASgJEhcKD3N1YnNjcmlwdGlvbl9pZBgEIAEoCRIdCgthbGxvd2VkX2lwcxgFIAMoCUIIukgFkgECGAESJAoSYWxsb3dlZF9zdWJuZXRfaWRzGAYgAygJQgi6SAWSAQIYAUIQCg5jbG91ZF9wcm92aWRlciLHAQoFU3RhdGUSFQoRU1RBVEVfVU5TUEVDSUZJRUQQABIYChRTVEFURV9DUkVBVElOR19BR0VOVBABEhIKDlNUQVRFX0NSRUFUSU5HEAISDwoLU1RBVEVfUkVBRFkQAxISCg5TVEFURV9ERUxFVElORxAEEhgKFFNUQVRFX0RFTEVUSU5HX0FHRU5UEAUSEwoPU1RBVEVfVVBHUkFESU5HEAYSEAoMU1RBVEVfRkFJTEVEEAcSEwoPU1RBVEVfU1VTUEVOREVEEAgiPwoEVHlwZRIUChBUWVBFX1VOU1BFQ0lGSUVEEAASEgoOVFlQRV9ERURJQ0FURUQQARINCglUWVBFX0JZT0MQAiJqCg5Db25uZWN0aW9uVHlwZRIfChtDT05ORUNUSU9OX1RZUEVfVU5TUEVDSUZJRUQQABIaChZDT05ORUNUSU9OX1RZUEVfUFVCTElDEAESGwoXQ09OTkVDVElPTl9UWVBFX1BSSVZBVEUQAjpqkkErCikqB0NsdXN0ZXIyHlJlc291cmNlIGRlc2NyaWJpbmcgYSBDbHVzdGVyLupBOQokcmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS9DbHVzdGVyKghjbHVzdGVyczIHY2x1c3RlckITChFfYXdzX3ByaXZhdGVfbGlua0IeChxfZ2NwX3ByaXZhdGVfc2VydmljZV9jb25uZWN0QhUKE19henVyZV9wcml2YXRlX2xpbmtCHAoaX2djcF9nbG9iYWxfYWNjZXNzX2VuYWJsZWRKBAgjECRSEWludGVybmV0X2dhdGV3YXlzIlwKFENyZWF0ZUNsdXN0ZXJSZXF1ZXN0EkQKB2NsdXN0ZXIYASABKAsyKy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXJDcmVhdGVCBrpIA8gBASJPChVDcmVhdGVDbHVzdGVyUmVzcG9uc2USNgoHY2x1c3RlchgBIAEoCzIlLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3RlciI+ChFHZXRDbHVzdGVyUmVxdWVzdBIpCgJpZBgBIAEoCUId4EECukgXyAEBchIyDV5bYS12MC05XXsyMH2YARQiTAoSR2V0Q2x1c3RlclJlc3BvbnNlEjYKB2NsdXN0ZXIYASABKAsyJS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXIimwEKFFVwZGF0ZUNsdXN0ZXJSZXF1ZXN0EkcKB2NsdXN0ZXIYASABKAsyKy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXJVcGRhdGVCCeBBArpIA8gBARI6Cgt1cGRhdGVfbWFzaxgCIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2tCCeBBArpIA8gBASJPChVVcGRhdGVDbHVzdGVyUmVzcG9uc2USNgoHY2x1c3RlchgBIAEoCzIlLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3RlciKqAwoTTGlzdENsdXN0ZXJzUmVxdWVzdBJICgZmaWx0ZXIYASABKAsyOC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkxpc3RDbHVzdGVyc1JlcXVlc3QuRmlsdGVyElwKCXBhZ2Vfc2l6ZRgCIAEoBUJJkkFGMjJMaW1pdCB0aGUgcGFnaW5hdGVkIHJlc3BvbnNlIHRvIGEgbnVtYmVyIG9mIGl0ZW1zLlkAAAAAAABZQGkAAAAAAADwPxISCgpwYWdlX3Rva2VuGAMgASgJGtYBCgZGaWx0ZXISJgoRcmVzb3VyY2VfZ3JvdXBfaWQYASABKAlCC7pICNgBAXIDsAEBEhUKDW5hbWVfY29udGFpbnMYAiABKAkSDgoGcmVnaW9uGAMgASgJEk0KDmNsb3VkX3Byb3ZpZGVyGAQgASgOMisucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DbG91ZFByb3ZpZGVyQgi6SAWCAQIQARIuCgpuZXR3b3JrX2lkGAUgASgJQhq6SBfYAQFyEjINXlthLXYwLTldezIwfZgBFCKIAgoUTGlzdENsdXN0ZXJzUmVzcG9uc2USXwoIY2x1c3RlcnMYASADKAsyJS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNsdXN0ZXJCJpJBIzIeQ2x1c3RlcnMgbWF0Y2hpbmcgdGhlIHJlcXVlc3QuoAFkEo4BCg9uZXh0X3BhZ2VfdG9rZW4YAiABKAlCdZJBcjJwUGFnZSB0b2tlbiB0byBmZXRjaCB0aGUgbmV4dCBwYWdlLiBUaGUgdmFsdWUgY2FuIGJlIHVzZWQgYXMgYG5leHRfcGFnZV90b2tlbmAgaW4gdGhlIG5leHQgY2FsbCB0byB0aGlzIGVuZHBvaW50LiIiChREZWxldGVDbHVzdGVyUmVxdWVzdBIKCgJpZBgBIAEoCSIXChVEZWxldGVDbHVzdGVyUmVzcG9uc2UiVAoWRGVsZXRlQ2x1c3Rlck9wZXJhdGlvbhI6CglvcGVyYXRpb24YASABKAsyJy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLk9wZXJhdGlvbiJUChZVcGRhdGVDbHVzdGVyT3BlcmF0aW9uEjoKCW9wZXJhdGlvbhgBIAEoCzInLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuT3BlcmF0aW9uIlQKFkNyZWF0ZUNsdXN0ZXJPcGVyYXRpb24SOgoJb3BlcmF0aW9uGAEgASgLMicucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5PcGVyYXRpb24q7AEKE1ByaXZhdGVMaW5rQXV0aE1vZGUSJgoiUFJJVkFURV9MSU5LX0FVVEhfTU9ERV9VTlNQRUNJRklFRBAAEiAKHFBSSVZBVEVfTElOS19BVVRIX01PREVfTUFUQ0gQARIfChtQUklWQVRFX0xJTktfQVVUSF9NT0RFX1NBU0wQAhIfChtQUklWQVRFX0xJTktfQVVUSF9NT0RFX01UTFMQAxIoCiRQUklWQVRFX0xJTktfQVVUSF9NT0RFX01UTFNfQU5EX1NBU0wQBBIfChtQUklWQVRFX0xJTktfQVVUSF9NT0RFX05PTkUQBTL3HgoOQ2x1c3RlclNlcnZpY2USmwkKDUNyZWF0ZUNsdXN0ZXISMi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNyZWF0ZUNsdXN0ZXJSZXF1ZXN0GjQucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5DcmVhdGVDbHVzdGVyT3BlcmF0aW9uIp8IkkGJBxIOQ3JlYXRlIGNsdXN0ZXIa+gRDcmVhdGUgYSBSZWRwYW5kYSBjbHVzdGVyLiBSZXR1cm5zIGEgbG9uZy1ydW5uaW5nIG9wZXJhdGlvbi4gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSBbVXNlIHRoZSBDb250cm9sIFBsYW5lIEFQSV0oaHR0cHM6Ly9kb2NzLnJlZHBhbmRhLmNvbS9yZWRwYW5kYS1jbG91ZC9tYW5hZ2UvYXBpL2NvbnRyb2xwbGFuZS8pLiBUbyBjaGVjayBvcGVyYXRpb24gc3RhdGUsIGNhbGwgYEdFVCAvdjEvb3BlcmF0aW9ucy97aWR9YC4gUmVmZXIgdG8gW1JlZ2lvbnNdKGh0dHBzOi8vZG9jcy5yZWRwYW5kYS5jb20vYXBpL2RvYy9jbG91ZC1jb250cm9scGxhbmUvdG9waWMvdG9waWMtcmVnaW9ucy1hbmQtdXNhZ2UtdGllcnMpIGZvciB0aGUgbGlzdCBvZiBhdmFpbGFibGUgcmVnaW9ucywgem9uZXMsIGFuZCB0aWVycyBjb21iaW5hdGlvbnMgZm9yIGVhY2ggY2xvdWQgcHJvdmlkZXIuIEZvciBCWU9DIGNsdXN0ZXJzLCBmb2xsb3cgYWRkaXRpb25hbCBzdGVwcyB0byBbY3JlYXRlIGEgQllPQyBjbHVzdGVyXShodHRwczovL2RvY3MucmVkcGFuZGEuY29tL3JlZHBhbmRhLWNsb3VkL21hbmFnZS9hcGkvY2xvdWQtYnlvYy1jb250cm9scGxhbmUtYXBpLyNhZGRpdGlvbmFsLXN0ZXBzLXRvLWNyZWF0ZS1hLWJ5b2MtY2x1c3RlcikuSksKAzIwMhJECghBY2NlcHRlZBI4CjYaNC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkNyZWF0ZUNsdXN0ZXJPcGVyYXRpb25KLAoDNDAwEiUKC0JhZCBSZXF1ZXN0EhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzSikKAzQwORIiCghDb25mbGljdBIWChQaEi5nb29nbGUucnBjLlN0YXR1c0pUCgM1MDASTQozSW50ZXJuYWwgU2VydmVyIEVycm9yLiBQbGVhc2UgcmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzsr8HF3dyaXRlOm9yZ2FuaXphdGlvbi1pbmZvyr8HXAoaY29udHJvbHBsYW5lX3Jlc291cmNlZ3JvdXASIXJlcXVlc3QuY2x1c3Rlci5yZXNvdXJjZV9ncm91cF9pZBobY29udHJvbHBsYW5lX2NsdXN0ZXJfY3JlYXRlgtPkkwIROgEqIgwvdjEvY2x1c3RlcnMSqgQKCkdldENsdXN0ZXISLy5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkdldENsdXN0ZXJSZXF1ZXN0GjAucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5HZXRDbHVzdGVyUmVzcG9uc2UiuAOSQc8CEgtHZXQgY2x1c3RlchopR2V0IGluZm9ybWF0aW9uIGFib3V0IGEgUmVkcGFuZGEgY2x1c3Rlci5KQQoDMjAwEjoKAk9LEjQKMhowLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuR2V0Q2x1c3RlclJlc3BvbnNlSnwKAzQwNBJ1CglOb3QgRm91bmQSFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMiUAoQYXBwbGljYXRpb24vanNvbhI8eyJjb2RlIjo2LCJtZXNzYWdlIjoiQ2x1c3RlciB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0LiJ9SlQKAzUwMBJNCjNJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IuIFBsZWFzZSByZWFjaCBvdXQgdG8gc3VwcG9ydC4SFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXOyvwcWcmVhZDpvcmdhbml6YXRpb24taW5mb8q/BygKFGNvbnRyb2xwbGFuZV9jbHVzdGVyEgpyZXF1ZXN0LmlkGgRyZWFkorUYAggBgtPkkwITEhEvdjEvY2x1c3RlcnMve2lkfRK/BAoNVXBkYXRlQ2x1c3RlchIyLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuVXBkYXRlQ2x1c3RlclJlcXVlc3QaNC5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLlVwZGF0ZUNsdXN0ZXJPcGVyYXRpb24iwwOSQcQCEg5VcGRhdGUgY2x1c3RlchoaVXBkYXRlIGEgUmVkcGFuZGEgY2x1c3Rlci5KQgoDMjAyEjsKCEFjY2VwdGVkEi8KLRorLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuQ2x1c3RlclVwZGF0ZUp8CgM0MDQSdQoJTm90IEZvdW5kEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzIlAKEGFwcGxpY2F0aW9uL2pzb24SPHsiY29kZSI6NiwibWVzc2FnZSI6IkNsdXN0ZXIgd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdC4ifUpUCgM1MDASTQozSW50ZXJuYWwgU2VydmVyIEVycm9yLiBQbGVhc2UgcmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzsr8HF3dyaXRlOm9yZ2FuaXphdGlvbi1pbmZvyr8HMgoUY29udHJvbHBsYW5lX2NsdXN0ZXISEnJlcXVlc3QuY2x1c3Rlci5pZBoGdXBkYXRlgtPkkwIkOgdjbHVzdGVyMhkvdjEvY2x1c3RlcnMve2NsdXN0ZXIuaWR9Eo0FCgxMaXN0Q2x1c3RlcnMSMS5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkxpc3RDbHVzdGVyc1JlcXVlc3QaMi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkxpc3RDbHVzdGVyc1Jlc3BvbnNlIpUEkkGnAxINTGlzdCBjbHVzdGVycxr6AUxpc3QgUmVkcGFuZGEgY2x1c3RlcnMuIFRoZSBgZmlsdGVyLmAgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgZmluZCBtYXRjaGluZyBjbHVzdGVycyB0aGF0IG1lZXQgYWxsIHNwZWNpZmllZCBjb25kaXRpb25zLiBOb3RlOiBUaGlzIGVuZHBvaW50IGRvZXMgbm90IHJldHVybiBgZGF0YXBsYW5lX2FwaS51cmxgLiBVc2UgdGhlIEdldCBDbHVzdGVyIGVuZHBvaW50IHRvIHJldHJpZXZlIGEgY2x1c3RlcidzIERhdGEgUGxhbmUgQVBJIFVSTC5KQwoDMjAwEjwKAk9LEjYKNBoyLnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuTGlzdENsdXN0ZXJzUmVzcG9uc2VKVAoDNTAwEk0KM0ludGVybmFsIFNlcnZlciBFcnJvci4gUGxlYXNlIHJlYWNoIG91dCB0byBzdXBwb3J0LhIWChQaEi5nb29nbGUucnBjLlN0YXR1c7K/BxZyZWFkOm9yZ2FuaXphdGlvbi1pbmZv0r8HOAoPb3V0cHV0LmNsdXN0ZXJzEiUKFGNvbnRyb2xwbGFuZV9jbHVzdGVyEgdlYWNoLmlkGgRyZWFkgtPkkwIOEgwvdjEvY2x1c3RlcnMShgYKDURlbGV0ZUNsdXN0ZXISMi5yZWRwYW5kYS5hcGkuY29udHJvbHBsYW5lLnYxLkRlbGV0ZUNsdXN0ZXJSZXF1ZXN0GjQucmVkcGFuZGEuYXBpLmNvbnRyb2xwbGFuZS52MS5EZWxldGVDbHVzdGVyT3BlcmF0aW9uIooFkkGkBBIORGVsZXRlIGNsdXN0ZXIa8AFEZWxldGUgYSBSZWRwYW5kYSBDbHVzdGVyLiBSZXR1cm5zIGEgbG9uZy1ydW5uaW5nIG9wZXJhdGlvbi4gRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSBbVXNlIHRoZSBDb250cm9sIFBsYW5lIEFQSV0oaHR0cHM6Ly9kb2NzLnJlZHBhbmRhLmNvbS9yZWRwYW5kYS1jbG91ZC9tYW5hZ2UvYXBpL2NvbnRyb2xwbGFuZS8pLiBUbyBjaGVjayBvcGVyYXRpb24gc3RhdGUsIGNhbGwgYEdFVCAvdjEvb3BlcmF0aW9ucy97aWR9YC5KSwoDMjAyEkQKCEFjY2VwdGVkEjgKNho0LnJlZHBhbmRhLmFwaS5jb250cm9scGxhbmUudjEuRGVsZXRlQ2x1c3Rlck9wZXJhdGlvbkp8CgM0MDQSdQoJTm90IEZvdW5kEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzIlAKEGFwcGxpY2F0aW9uL2pzb24SPHsiY29kZSI6NiwibWVzc2FnZSI6IkNsdXN0ZXIgd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdC4ifUpUCgM1MDASTQozSW50ZXJuYWwgU2VydmVyIEVycm9yLiBQbGVhc2UgcmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzsr8HF3dyaXRlOm9yZ2FuaXphdGlvbi1pbmZvyr8HKgoUY29udHJvbHBsYW5lX2NsdXN0ZXISCnJlcXVlc3QuaWQaBmRlbGV0ZYLT5JMCEyoRL3YxL2NsdXN0ZXJzL3tpZH0avgGSQbQBCghDbHVzdGVycxKnAU1hbmFnZSBSZWRwYW5kYSBDbG91ZCBjbHVzdGVycy4gRm9yIGRldGFpbGVkIHN0ZXBzIGFuZCBpbmZvcm1hdGlvbiwgc2VlIFtVc2UgdGhlIENvbnRyb2wgUGxhbmUgQVBJXShodHRwczovL2RvY3MucmVkcGFuZGEuY29tL3JlZHBhbmRhLWNsb3VkL21hbmFnZS9hcGkvY29udHJvbHBsYW5lLyku4sUHAggBYgZwcm90bzM", [file_buf_validate_validate2, file_google_api_annotations, file_google_api_field_behavior, file_google_api_resource, file_google_protobuf_descriptor, file_google_protobuf_field_mask, file_google_protobuf_struct, file_google_protobuf_timestamp, file_google_rpc_status, file_google_type_dayofweek, file_protoc_gen_openapiv2_options_annotations2, file_redpanda_api_auditlog_v1_options, file_redpanda_api_common_v1alpha1_options, file_redpanda_api_controlplane_v1_common, file_redpanda_api_controlplane_v1_operation, file_redpanda_api_iam_v1alpha1_options]);
var Cluster_StateSchema = /* @__PURE__ */ enumDesc(file_redpanda_api_controlplane_v1_cluster, 23, 0);
var Cluster_State = /* @__PURE__ */ tsEnum(Cluster_StateSchema);
var ClusterService = /* @__PURE__ */ serviceDesc(file_redpanda_api_controlplane_v1_cluster, 0);

// node_modules/@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1/organization_pb.js
var file_redpanda_api_iam_v1_organization = /* @__PURE__ */ fileDesc("CiZyZWRwYW5kYS9hcGkvaWFtL3YxL29yZ2FuaXphdGlvbi5wcm90bxITcmVkcGFuZGEuYXBpLmlhbS52MSLOAQoMT3JnYW5pemF0aW9uEgoKAmlkGAEgASgJEgwKBG5hbWUYAiABKAkSEAoIYXV0aDBfaWQYAyABKAkSJgoZZGVmYXVsdF9yZXNvdXJjZV9ncm91cF9pZBgEIAEoCUgAiAEBEh8KEndlbGNvbWVfY2x1c3Rlcl9pZBgFIAEoCUgBiAEBEhQKDG1mYV9lbmZvcmNlZBgGIAEoCEIcChpfZGVmYXVsdF9yZXNvdXJjZV9ncm91cF9pZEIVChNfd2VsY29tZV9jbHVzdGVyX2lkIioKEk9yZ2FuaXphdGlvblVwZGF0ZRIUCgxtZmFfZW5mb3JjZWQYBiABKAgiHwodR2V0Q3VycmVudE9yZ2FuaXphdGlvblJlcXVlc3QiWQoeR2V0Q3VycmVudE9yZ2FuaXphdGlvblJlc3BvbnNlEjcKDG9yZ2FuaXphdGlvbhgBIAEoCzIhLnJlZHBhbmRhLmFwaS5pYW0udjEuT3JnYW5pemF0aW9uIkoKIUxpc3RBdmFpbGFibGVPcmdhbml6YXRpb25zUmVxdWVzdBIRCglwYWdlX3NpemUYASABKAUSEgoKcGFnZV90b2tlbhgCIAEoCSJ3CiJMaXN0QXZhaWxhYmxlT3JnYW5pemF0aW9uc1Jlc3BvbnNlEjgKDW9yZ2FuaXphdGlvbnMYASADKAsyIS5yZWRwYW5kYS5hcGkuaWFtLnYxLk9yZ2FuaXphdGlvbhIXCg9uZXh0X3BhZ2VfdG9rZW4YAiABKAkiiwEKGVVwZGF0ZU9yZ2FuaXphdGlvblJlcXVlc3QSLwoLdXBkYXRlX21hc2sYAiABKAsyGi5nb29nbGUucHJvdG9idWYuRmllbGRNYXNrEj0KDG9yZ2FuaXphdGlvbhgDIAEoCzInLnJlZHBhbmRhLmFwaS5pYW0udjEuT3JnYW5pemF0aW9uVXBkYXRlIlUKGlVwZGF0ZU9yZ2FuaXphdGlvblJlc3BvbnNlEjcKDG9yZ2FuaXphdGlvbhgBIAEoCzIhLnJlZHBhbmRhLmFwaS5pYW0udjEuT3JnYW5pemF0aW9uMuQLChNPcmdhbml6YXRpb25TZXJ2aWNlEsIDChZHZXRDdXJyZW50T3JnYW5pemF0aW9uEjIucmVkcGFuZGEuYXBpLmlhbS52MS5HZXRDdXJyZW50T3JnYW5pemF0aW9uUmVxdWVzdBozLnJlZHBhbmRhLmFwaS5pYW0udjEuR2V0Q3VycmVudE9yZ2FuaXphdGlvblJlc3BvbnNlIr4CkkHnARIYR2V0IGN1cnJlbnQgb3JnYW5pemF0aW9uGi9HZXQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnQgb3JnYW5pemF0aW9uLkpECgMyMDASPQoCT0sSNwo1GjMucmVkcGFuZGEuYXBpLmlhbS52MS5HZXRDdXJyZW50T3JnYW5pemF0aW9uUmVzcG9uc2VKVAoDNTAwEk0KM0ludGVybmFsIFNlcnZlciBFcnJvci4gUGxlYXNlIHJlYWNoIG91dCB0byBzdXBwb3J0LhIWChQaEi5nb29nbGUucnBjLlN0YXR1c8q/By4KDG9yZ2FuaXphdGlvbhIYaWRlbnRpdHkub3JnYW5pemF0aW9uX2lkGgRyZWFkgtPkkwIbEhkvdjEvb3JnYW5pemF0aW9ucy9jdXJyZW50EvADChpMaXN0QXZhaWxhYmxlT3JnYW5pemF0aW9ucxI2LnJlZHBhbmRhLmFwaS5pYW0udjEuTGlzdEF2YWlsYWJsZU9yZ2FuaXphdGlvbnNSZXF1ZXN0GjcucmVkcGFuZGEuYXBpLmlhbS52MS5MaXN0QXZhaWxhYmxlT3JnYW5pemF0aW9uc1Jlc3BvbnNlIuACkkGAAhIpTGlzdCBhdmFpbGFibGUgb3JnYW5pemF0aW9ucyBmb3IgdGhlIHVzZXIaM0dldCBhIGxpc3Qgb2YgYXZhaWxhYmxlIG9yZ2FuaXphdGlvbnMgZm9yIHRoZSB1c2VyLkpICgMyMDASQQoCT0sSOwo5GjcucmVkcGFuZGEuYXBpLmlhbS52MS5MaXN0QXZhaWxhYmxlT3JnYW5pemF0aW9uc1Jlc3BvbnNlSlQKAzUwMBJNCjNJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IuIFBsZWFzZSByZWFjaCBvdXQgdG8gc3VwcG9ydC4SFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXPSvwc1ChRvdXRwdXQub3JnYW5pemF0aW9ucxIdCgxvcmdhbml6YXRpb24SB2VhY2guaWQaBHJlYWSC0+STAh0SGy92MS9vcmdhbml6YXRpb25zL2F2YWlsYWJsZRK8AwoSVXBkYXRlT3JnYW5pemF0aW9uEi4ucmVkcGFuZGEuYXBpLmlhbS52MS5VcGRhdGVPcmdhbml6YXRpb25SZXF1ZXN0Gi8ucmVkcGFuZGEuYXBpLmlhbS52MS5VcGRhdGVPcmdhbml6YXRpb25SZXNwb25zZSLEApJB3QESE1VwZGF0ZSBvcmdhbml6YXRpb24aLlVwZGF0ZSBwcm9wZXJ0aWVzIG9mIHRoZSBjdXJyZW50IG9yZ2FuaXphdGlvbi5KQAoDMjAwEjkKAk9LEjMKMRovLnJlZHBhbmRhLmFwaS5pYW0udjEuVXBkYXRlT3JnYW5pemF0aW9uUmVzcG9uc2VKVAoDNTAwEk0KM0ludGVybmFsIFNlcnZlciBFcnJvci4gUGxlYXNlIHJlYWNoIG91dCB0byBzdXBwb3J0LhIWChQaEi5nb29nbGUucnBjLlN0YXR1c8q/BzAKDG9yZ2FuaXphdGlvbhIYaWRlbnRpdHkub3JnYW5pemF0aW9uX2lkGgZ1cGRhdGWC0+STAik6DG9yZ2FuaXphdGlvbjIZL3YxL29yZ2FuaXphdGlvbnMvY3VycmVudBpWkkFTCgxPcmdhbml6YXRpb24SQ1NlZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgb3JnYW5pemF0aW9uIHRoZSBjdXJyZW50IHVzZXIgYmVsb25ncyB0by5iBnByb3RvMw", [file_google_api_annotations, file_google_protobuf_field_mask, file_protoc_gen_openapiv2_options_annotations2, file_redpanda_api_iam_v1alpha1_options]);
var OrganizationService = /* @__PURE__ */ serviceDesc(file_redpanda_api_iam_v1_organization, 0);

// node_modules/@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1/role_binding_pb.js
var file_redpanda_api_iam_v1_role_binding = /* @__PURE__ */ fileDesc("CiZyZWRwYW5kYS9hcGkvaWFtL3YxL3JvbGVfYmluZGluZy5wcm90bxITcmVkcGFuZGEuYXBpLmlhbS52MSLWBQoLUm9sZUJpbmRpbmcSFwoCaWQYASABKAlCC7pICMgBAXIDmAEUEjUKBXNjb3BlGAIgASgLMiYucmVkcGFuZGEuYXBpLmlhbS52MS5Sb2xlQmluZGluZy5TY29wZRIpCglyb2xlX25hbWUYAyABKAlCC7pICMgBAXIDmAFkUglyb2xlX25hbWUSKwoKYWNjb3VudF9pZBgEIAEoCUILukgIyAEBcgOYARRSCmFjY291bnRfaWQSOgoKY3JlYXRlZF9hdBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBSCmNyZWF0ZWRfYXQSOgoKdXBkYXRlZF9hdBgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBSCnVwZGF0ZWRfYXQahgEKBVNjb3BlEmAKDXJlc291cmNlX3R5cGUYASABKA4yMi5yZWRwYW5kYS5hcGkuaWFtLnYxLlJvbGVCaW5kaW5nLlNjb3BlUmVzb3VyY2VUeXBlQga6SAPIAQFSDXJlc291cmNlX3R5cGUSGwoLcmVzb3VyY2VfaWQYAiABKAlCBrpIA8gBASKdAgoRU2NvcGVSZXNvdXJjZVR5cGUSIwofU0NPUEVfUkVTT1VSQ0VfVFlQRV9VTlNQRUNJRklFRBAAEiYKIlNDT1BFX1JFU09VUkNFX1RZUEVfUkVTT1VSQ0VfR1JPVVAQARIfChtTQ09QRV9SRVNPVVJDRV9UWVBFX05FVFdPUksQAhIfChtTQ09QRV9SRVNPVVJDRV9UWVBFX0NMVVNURVIQAxIqCiZTQ09QRV9SRVNPVVJDRV9UWVBFX1NFUlZFUkxFU1NfQ0xVU1RFUhAEEicKI1NDT1BFX1JFU09VUkNFX1RZUEVfTkVUV09SS19QRUVSSU5HEAUSJAogU0NPUEVfUkVTT1VSQ0VfVFlQRV9PUkdBTklaQVRJT04QBiKkAQoRUm9sZUJpbmRpbmdDcmVhdGUSNQoFc2NvcGUYASABKAsyJi5yZWRwYW5kYS5hcGkuaWFtLnYxLlJvbGVCaW5kaW5nLlNjb3BlEisKCXJvbGVfbmFtZRgCIAEoCUINukgKyAEBcgUQAxiAAVIJcm9sZV9uYW1lEisKCmFjY291bnRfaWQYAyABKAlCC7pICMgBAXIDmAEUUgphY2NvdW50X2lkImAKGENyZWF0ZVJvbGVCaW5kaW5nUmVxdWVzdBJECgxyb2xlX2JpbmRpbmcYASABKAsyJi5yZWRwYW5kYS5hcGkuaWFtLnYxLlJvbGVCaW5kaW5nQ3JlYXRlQga6SAPIAQEiYQoZQ3JlYXRlUm9sZUJpbmRpbmdSZXNwb25zZRJECgxyb2xlX2JpbmRpbmcYASABKAsyIC5yZWRwYW5kYS5hcGkuaWFtLnYxLlJvbGVCaW5kaW5nUgxyb2xlX2JpbmRpbmciMAoVR2V0Um9sZUJpbmRpbmdSZXF1ZXN0EhcKAmlkGAEgASgJQgu6SAjIAQFyA5gBFCJeChZHZXRSb2xlQmluZGluZ1Jlc3BvbnNlEkQKDHJvbGVfYmluZGluZxgBIAEoCzIgLnJlZHBhbmRhLmFwaS5pYW0udjEuUm9sZUJpbmRpbmdSDHJvbGVfYmluZGluZyIzChhEZWxldGVSb2xlQmluZGluZ1JlcXVlc3QSFwoCaWQYASABKAlCC7pICMgBAXIDmAEUIhsKGURlbGV0ZVJvbGVCaW5kaW5nUmVzcG9uc2UixgIKF0xpc3RSb2xlQmluZGluZ3NSZXF1ZXN0EkMKBmZpbHRlchgBIAEoCzIzLnJlZHBhbmRhLmFwaS5pYW0udjEuTGlzdFJvbGVCaW5kaW5nc1JlcXVlc3QuRmlsdGVyEhwKCXBhZ2Vfc2l6ZRgCIAEoBVIJcGFnZV9zaXplEh4KCnBhZ2VfdG9rZW4YAyABKAlSCnBhZ2VfdG9rZW4apwEKBkZpbHRlchIhCglyb2xlX25hbWUYASABKAlIAFIJcm9sZV9uYW1liAEBEhQKB2FjY291bnQYAiABKAlIAYgBARI1CgVzY29wZRgDIAEoCzImLnJlZHBhbmRhLmFwaS5pYW0udjEuUm9sZUJpbmRpbmcuU2NvcGUSEwoLYWNjb3VudF9pZHMYBCADKAlCDAoKX3JvbGVfbmFtZUIKCghfYWNjb3VudCK3AQoYTGlzdFJvbGVCaW5kaW5nc1Jlc3BvbnNlEnEKDXJvbGVfYmluZGluZ3MYASADKAsyIC5yZWRwYW5kYS5hcGkuaWFtLnYxLlJvbGVCaW5kaW5nQimSQSYyIVJvbGVCaW5kaW5ncyBtYXRjaGluZyB0aGUgcmVxdWVzdKABZFINcm9sZV9iaW5kaW5ncxIoCg9uZXh0X3BhZ2VfdG9rZW4YAiABKAlSD25leHRfcGFnZV90b2tlbjL4EAoSUm9sZUJpbmRpbmdTZXJ2aWNlEvUDChFDcmVhdGVSb2xlQmluZGluZxItLnJlZHBhbmRhLmFwaS5pYW0udjEuQ3JlYXRlUm9sZUJpbmRpbmdSZXF1ZXN0Gi4ucmVkcGFuZGEuYXBpLmlhbS52MS5DcmVhdGVSb2xlQmluZGluZ1Jlc3BvbnNlIoADkkGZAhITQ3JlYXRlIHJvbGUgYmluZGluZxolQ3JlYXRlIGEgUmVkcGFuZGEgQ2xvdWQgcm9sZSBiaW5kaW5nLkpQCgMyMDESSQoTUm9sZUJpbmRpbmcgQ3JlYXRlZBIyCjAaLi5yZWRwYW5kYS5hcGkuaWFtLnYxLkNyZWF0ZVJvbGVCaW5kaW5nUmVzcG9uc2VKiAEKAzUwMBKAAQosSW50ZXJuYWwgU2VydmVyIEVycm9yLiBSZWFjaCBvdXQgdG8gc3VwcG9ydC4SFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMiOAoHZGVmYXVsdBIteyJjb2RlIjoxMywibWVzc2FnZSI6IkludGVybmFsIFNlcnZlciBFcnJvciJ9yr8HQAoMb3JnYW5pemF0aW9uEhhpZGVudGl0eS5vcmdhbml6YXRpb25faWQaFmlhbV9yb2xlYmluZGluZ19jcmVhdGWC0+STAhk6ASpiASoiES92MS9yb2xlLWJpbmRpbmdzEsgECg5HZXRSb2xlQmluZGluZxIqLnJlZHBhbmRhLmFwaS5pYW0udjEuR2V0Um9sZUJpbmRpbmdSZXF1ZXN0GisucmVkcGFuZGEuYXBpLmlhbS52MS5HZXRSb2xlQmluZGluZ1Jlc3BvbnNlItwDkkGTAxIQR2V0IHJvbGUgYmluZGluZxoaR2V0IFJlZHBhbmRhIHJvbGUgYmluZGluZy5KPAoDMjAwEjUKAk9rEi8KLRorLnJlZHBhbmRhLmFwaS5pYW0udjEuR2V0Um9sZUJpbmRpbmdSZXNwb25zZUqZAQoDNDA0EpEBCglOb3QgRm91bmQSFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMibAooUm9sZUJpbmRpbmcgd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdBJAeyJjb2RlIjo2LCJtZXNzYWdlIjoiUm9sZUJpbmRpbmcgd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdC4ifUqIAQoDNTAwEoABCixJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IuIFJlYWNoIG91dCB0byBzdXBwb3J0LhIWChQaEi5nb29nbGUucnBjLlN0YXR1cyI4CgdkZWZhdWx0Ei17ImNvZGUiOjEzLCJtZXNzYWdlIjoiSW50ZXJuYWwgU2VydmVyIEVycm9yIn3KvwcjCg9pYW1fcm9sZWJpbmRpbmcSCnJlcXVlc3QuaWQaBHJlYWSC0+STAhgSFi92MS9yb2xlLWJpbmRpbmdzL3tpZH0S3gMKEExpc3RSb2xlQmluZGluZ3MSLC5yZWRwYW5kYS5hcGkuaWFtLnYxLkxpc3RSb2xlQmluZGluZ3NSZXF1ZXN0Gi0ucmVkcGFuZGEuYXBpLmlhbS52MS5MaXN0Um9sZUJpbmRpbmdzUmVzcG9uc2Ui7AKSQY0CEhJMaXN0IHJvbGUgYmluZGluZ3MaLExpc3Qgcm9sZSBhc3NpZ25tZW50cyB0byBvcmdhbml6YXRpb24gdXNlcnMuSj4KAzIwMBI3CgJPSxIxCi8aLS5yZWRwYW5kYS5hcGkuaWFtLnYxLkxpc3RSb2xlQmluZGluZ3NSZXNwb25zZUqIAQoDNTAwEoABCixJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IuIFJlYWNoIG91dCB0byBzdXBwb3J0LhIWChQaEi5nb29nbGUucnBjLlN0YXR1cyI4CgdkZWZhdWx0Ei17ImNvZGUiOjEzLCJtZXNzYWdlIjoiSW50ZXJuYWwgU2VydmVyIEVycm9yIn3Kvwc+Cgxvcmdhbml6YXRpb24SGGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pZBoUaWFtX3JvbGViaW5kaW5nX3JlYWSC0+STAhMSES92MS9yb2xlLWJpbmRpbmdzEuIDChFEZWxldGVSb2xlQmluZGluZxItLnJlZHBhbmRhLmFwaS5pYW0udjEuRGVsZXRlUm9sZUJpbmRpbmdSZXF1ZXN0Gi4ucmVkcGFuZGEuYXBpLmlhbS52MS5EZWxldGVSb2xlQmluZGluZ1Jlc3BvbnNlIu0CkkGHAhITRGVsZXRlIHJvbGUgYmluZGluZxojRGVsZXRlIFJlZHBhbmRhIENsb3VkIHJvbGUgYmluZGluZy5KLwoDMjA0EigKJFJvbGVCaW5kaW5nIHdhcyBkZWxldGVkIHN1Y2Nlc3NmdWxseRIASpkBCgM0MDQSkQEKCU5vdCBGb3VuZBIWChQaEi5nb29nbGUucnBjLlN0YXR1cyJsCihSb2xlQmluZGluZyB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0EkB7ImNvZGUiOjYsIm1lc3NhZ2UiOiJSb2xlQmluZGluZyB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0LiJ9yr8HQAoMb3JnYW5pemF0aW9uEhhpZGVudGl0eS5vcmdhbml6YXRpb25faWQaFmlhbV9yb2xlYmluZGluZ19kZWxldGWC0+STAhgqFi92MS9yb2xlLWJpbmRpbmdzL3tpZH0aWZJBVgobQ29udHJvbCBQbGFuZSBSb2xlIEJpbmRpbmdzEjdNYW5hZ2Ugcm9sZSBiaW5kaW5ncyBmb3IgeW91ciBjbG91ZCBvcmdhbml6YXRpb24gdXNlcnMuYgZwcm90bzM", [file_buf_validate_validate2, file_google_api_annotations, file_google_protobuf_timestamp, file_protoc_gen_openapiv2_options_annotations2, file_redpanda_api_iam_v1alpha1_options]);
var RoleBinding_ScopeResourceTypeSchema = /* @__PURE__ */ enumDesc(file_redpanda_api_iam_v1_role_binding, 0, 0);
var RoleBinding_ScopeResourceType = /* @__PURE__ */ tsEnum(RoleBinding_ScopeResourceTypeSchema);
var RoleBindingService = /* @__PURE__ */ serviceDesc(file_redpanda_api_iam_v1_role_binding, 0);

// node_modules/@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1/service_account_pb.js
var file_redpanda_api_iam_v1_service_account = /* @__PURE__ */ fileDesc("CilyZWRwYW5kYS9hcGkvaWFtL3YxL3NlcnZpY2VfYWNjb3VudC5wcm90bxITcmVkcGFuZGEuYXBpLmlhbS52MSLRAwoOU2VydmljZUFjY291bnQSFwoCaWQYASABKAlCC7pICMgBAXIDmAEUElsKBG5hbWUYAiABKAlCTZJBMzInVGhlIHVuaXF1ZSBuYW1lIG9mIHRoZSBzZXJ2aWNlIGFjY291bnQuSggiY2lfYm90IrpIFMgBAXIPEAMYgAEyCF5bXjw+XSskEnUKC2Rlc2NyaXB0aW9uGAMgASgJQmCSQVUyJ1RoZSBkZXNjcmlwdGlvbiBvZiB0aGUgc2VydmljZV9hY2NvdW50LkoqIkNJIGJvdCBhY2NvdW50IGlzIHVzZWQgZm9yIENJIHdvcmtsb2Fkcy4iukgFcgMYjAESLgoKY3JlYXRlZF9hdBgEIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASVQoYYXV0aDBfY2xpZW50X2NyZWRlbnRpYWxzGAYgASgLMi4ucmVkcGFuZGEuYXBpLmlhbS52MS5TZXJ2aWNlQWNjb3VudENyZWRlbnRpYWxzSACIAQFCGwoZX2F1dGgwX2NsaWVudF9jcmVkZW50aWFscyLVAQoZU2VydmljZUFjY291bnRDcmVkZW50aWFscxJNCgljbGllbnRfaWQYASABKAlCOpJBMTIgVGhlIGNsaWVudCBJRCBvZiB0aGUgY3JlZGVudGlhbHNKDSJDREZYNDU2NzI5OCK6SAPIAQESVwoNY2xpZW50X3NlY3JldBgCIAEoCUI7gAEBkkE1MhFUaGUgY2xpZW50IHNlY3JldEogImRZel9GWnFOTTZFM19PMWxLVXdPTktOUTRUS2Y3aSJIAIgBAUIQCg5fY2xpZW50X3NlY3JldCKyAwoUU2VydmljZUFjY291bnRDcmVhdGUSYgoEbmFtZRgBIAEoCUJUkkE6MidUaGUgdW5pcXVlIG5hbWUgb2YgdGhlIHNlcnZpY2VfYWNjb3VudC5KDyJiaWxsaW5nX2FkbWluIrpIFMgBAXIPEAMYgAEyCF5bXjw+XSskEnUKC2Rlc2NyaXB0aW9uGAIgASgJQmCSQVUyJ1RoZSBkZXNjcmlwdGlvbiBvZiB0aGUgc2VydmljZV9hY2NvdW50LkoqIkNJIGJvdCBhY2NvdW50IGlzIHVzZWQgZm9yIENJIHdvcmtsb2Fkcy4iukgFcgMYjAESTAoNcm9sZV9iaW5kaW5ncxgDIAMoCzI1LnJlZHBhbmRhLmFwaS5pYW0udjEuU2VydmljZUFjY291bnRDcmVhdGUuUm9sZUJpbmRpbmcacQoLUm9sZUJpbmRpbmcSNQoFc2NvcGUYASABKAsyJi5yZWRwYW5kYS5hcGkuaWFtLnYxLlJvbGVCaW5kaW5nLlNjb3BlEisKCXJvbGVfbmFtZRgCIAEoCUINukgKyAEBcgUQAxiAAVIJcm9sZV9uYW1lImkKG0NyZWF0ZVNlcnZpY2VBY2NvdW50UmVxdWVzdBJKCg9zZXJ2aWNlX2FjY291bnQYASABKAsyKS5yZWRwYW5kYS5hcGkuaWFtLnYxLlNlcnZpY2VBY2NvdW50Q3JlYXRlQga6SAPIAQEiXAocQ3JlYXRlU2VydmljZUFjY291bnRSZXNwb25zZRI8Cg9zZXJ2aWNlX2FjY291bnQYASABKAsyIy5yZWRwYW5kYS5hcGkuaWFtLnYxLlNlcnZpY2VBY2NvdW50IjMKGEdldFNlcnZpY2VBY2NvdW50UmVxdWVzdBIXCgJpZBgBIAEoCUILukgIyAEBcgOYARQiWQoZR2V0U2VydmljZUFjY291bnRSZXNwb25zZRI8Cg9zZXJ2aWNlX2FjY291bnQYASABKAsyIy5yZWRwYW5kYS5hcGkuaWFtLnYxLlNlcnZpY2VBY2NvdW50Ij4KI0dldFNlcnZpY2VBY2NvdW50Q3JlZGVudGlhbHNSZXF1ZXN0EhcKAmlkGAEgASgJQgu6SAjIAQFyA5gBFCJrCiRHZXRTZXJ2aWNlQWNjb3VudENyZWRlbnRpYWxzUmVzcG9uc2USQwoLY3JlZGVudGlhbHMYASABKAsyLi5yZWRwYW5kYS5hcGkuaWFtLnYxLlNlcnZpY2VBY2NvdW50Q3JlZGVudGlhbHMiowEKGkxpc3RTZXJ2aWNlQWNjb3VudHNSZXF1ZXN0EkYKBmZpbHRlchgBIAEoCzI2LnJlZHBhbmRhLmFwaS5pYW0udjEuTGlzdFNlcnZpY2VBY2NvdW50c1JlcXVlc3QuRmlsdGVyEhEKCXBhZ2Vfc2l6ZRgCIAEoBRISCgpwYWdlX3Rva2VuGAMgASgJGhYKBkZpbHRlchIMCgRuYW1lGAEgASgJIqMBChtMaXN0U2VydmljZUFjY291bnRzUmVzcG9uc2USawoQc2VydmljZV9hY2NvdW50cxgBIAMoCzIjLnJlZHBhbmRhLmFwaS5pYW0udjEuU2VydmljZUFjY291bnRCLJJBKTIkU2VydmljZUFjY291bnRzIG1hdGNoaW5nIHRoZSByZXF1ZXN0oAFkEhcKD25leHRfcGFnZV90b2tlbhgCIAEoCSLnAQoUU2VydmljZUFjY291bnRVcGRhdGUSWAoEbmFtZRgBIAEoCUJKkkEzMidUaGUgdW5pcXVlIG5hbWUgb2YgdGhlIHNlcnZpY2UgYWNjb3VudC5KCCJjaV9ib3QiukgRcg8QAxiAATIIXltePD5dKyQSdQoLZGVzY3JpcHRpb24YAiABKAlCYJJBVTInVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBzZXJ2aWNlIGFjY291bnQuSioiQ0kgYm90IGFjY291bnQgaXMgdXNlZCBmb3IgQ0kgd29ya2xvYWRzLiK6SAVyAxiMASKzAQobVXBkYXRlU2VydmljZUFjY291bnRSZXF1ZXN0EhcKAmlkGAEgASgJQgu6SAjIAQFyA5gBFBJKCg9zZXJ2aWNlX2FjY291bnQYAiABKAsyKS5yZWRwYW5kYS5hcGkuaWFtLnYxLlNlcnZpY2VBY2NvdW50VXBkYXRlQga6SAPIAQESLwoLdXBkYXRlX21hc2sYAyABKAsyGi5nb29nbGUucHJvdG9idWYuRmllbGRNYXNrIlwKHFVwZGF0ZVNlcnZpY2VBY2NvdW50UmVzcG9uc2USPAoPc2VydmljZV9hY2NvdW50GAEgASgLMiMucmVkcGFuZGEuYXBpLmlhbS52MS5TZXJ2aWNlQWNjb3VudCI2ChtEZWxldGVTZXJ2aWNlQWNjb3VudFJlcXVlc3QSFwoCaWQYASABKAlCC7pICMgBAXIDmAEUIh4KHERlbGV0ZVNlcnZpY2VBY2NvdW50UmVzcG9uc2UiPAohUm90YXRlU2VydmljZUFjY291bnRTZWNyZXRSZXF1ZXN0EhcKAmlkGAEgASgJQgu6SAjIAQFyA5gBFCJiCiJSb3RhdGVTZXJ2aWNlQWNjb3VudFNlY3JldFJlc3BvbnNlEjwKD3NlcnZpY2VfYWNjb3VudBgBIAEoCzIjLnJlZHBhbmRhLmFwaS5pYW0udjEuU2VydmljZUFjY291bnQy5yIKFVNlcnZpY2VBY2NvdW50U2VydmljZRKPBAoUQ3JlYXRlU2VydmljZUFjY291bnQSMC5yZWRwYW5kYS5hcGkuaWFtLnYxLkNyZWF0ZVNlcnZpY2VBY2NvdW50UmVxdWVzdBoxLnJlZHBhbmRhLmFwaS5pYW0udjEuQ3JlYXRlU2VydmljZUFjY291bnRSZXNwb25zZSKRA5JBpAISFkNyZWF0ZSBzZXJ2aWNlIGFjY291bnQaJ0NyZWF0ZSBhIFJlZHBhbmRhIENsb3VkIFNlcnZpY2VBY2NvdW50LkpWCgMyMDESTwoWU2VydmljZUFjY291bnQgQ3JlYXRlZBI1CjMaMS5yZWRwYW5kYS5hcGkuaWFtLnYxLkNyZWF0ZVNlcnZpY2VBY2NvdW50UmVzcG9uc2VKiAEKAzUwMBKAAQosSW50ZXJuYWwgU2VydmVyIEVycm9yLiBSZWFjaCBvdXQgdG8gc3VwcG9ydC4SFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMiOAoHZGVmYXVsdBIteyJjb2RlIjoxMywibWVzc2FnZSI6IkludGVybmFsIFNlcnZlciBFcnJvciJ9yr8HQwoMb3JnYW5pemF0aW9uEhhpZGVudGl0eS5vcmdhbml6YXRpb25faWQaGWlhbV9zZXJ2aWNlYWNjb3VudF9jcmVhdGWC0+STAhw6ASpiASoiFC92MS9zZXJ2aWNlLWFjY291bnRzEqMFChRVcGRhdGVTZXJ2aWNlQWNjb3VudBIwLnJlZHBhbmRhLmFwaS5pYW0udjEuVXBkYXRlU2VydmljZUFjY291bnRSZXF1ZXN0GjEucmVkcGFuZGEuYXBpLmlhbS52MS5VcGRhdGVTZXJ2aWNlQWNjb3VudFJlc3BvbnNlIqUEkkGzAxIWVXBkYXRlIHNlcnZpY2UgYWNjb3VudBooVXBkYXRlIGEgUmVkcGFuZGEgQ2xvdWQgc2VydmljZSBhY2NvdW50LkpCCgMyMDASOwoCT2sSNQozGjEucmVkcGFuZGEuYXBpLmlhbS52MS5VcGRhdGVTZXJ2aWNlQWNjb3VudFJlc3BvbnNlSp8BCgM0MDQSlwEKCU5vdCBGb3VuZBIWChQaEi5nb29nbGUucnBjLlN0YXR1cyJyCitTZXJ2aWNlQWNjb3VudCB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0EkN7ImNvZGUiOjYsIm1lc3NhZ2UiOiJTZXJ2aWNlQWNjb3VudCB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0LiJ9SogBCgM1MDASgAEKLEludGVybmFsIFNlcnZlciBFcnJvci4gUmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzIjgKB2RlZmF1bHQSLXsiY29kZSI6MTMsIm1lc3NhZ2UiOiJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3Iifcq/B0MKDG9yZ2FuaXphdGlvbhIYaWRlbnRpdHkub3JnYW5pemF0aW9uX2lkGhlpYW1fc2VydmljZWFjY291bnRfdXBkYXRlgtPkkwIhOgEqYgEqMhkvdjEvc2VydmljZS1hY2NvdW50cy97aWR9EoAFChFHZXRTZXJ2aWNlQWNjb3VudBItLnJlZHBhbmRhLmFwaS5pYW0udjEuR2V0U2VydmljZUFjY291bnRSZXF1ZXN0Gi4ucmVkcGFuZGEuYXBpLmlhbS52MS5HZXRTZXJ2aWNlQWNjb3VudFJlc3BvbnNlIosEkkGhAxITR2V0IHNlcnZpY2UgYWNjb3VudBocR2V0IHNlcnZpY2UgYWNjb3VudCBkZXRhaWxzLko/CgMyMDASOAoCT2sSMgowGi4ucmVkcGFuZGEuYXBpLmlhbS52MS5HZXRTZXJ2aWNlQWNjb3VudFJlc3BvbnNlSp8BCgM0MDQSlwEKCU5vdCBGb3VuZBIWChQaEi5nb29nbGUucnBjLlN0YXR1cyJyCitTZXJ2aWNlQWNjb3VudCB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0EkN7ImNvZGUiOjYsIm1lc3NhZ2UiOiJTZXJ2aWNlQWNjb3VudCB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0LiJ9SogBCgM1MDASgAEKLEludGVybmFsIFNlcnZlciBFcnJvci4gUmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzIjgKB2RlZmF1bHQSLXsiY29kZSI6MTMsIm1lc3NhZ2UiOiJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3Iifcq/B0EKDG9yZ2FuaXphdGlvbhIYaWRlbnRpdHkub3JnYW5pemF0aW9uX2lkGhdpYW1fc2VydmljZWFjY291bnRfcmVhZILT5JMCGxIZL3YxL3NlcnZpY2UtYWNjb3VudHMve2lkfRLRBQocR2V0U2VydmljZUFjY291bnRDcmVkZW50aWFscxI4LnJlZHBhbmRhLmFwaS5pYW0udjEuR2V0U2VydmljZUFjY291bnRDcmVkZW50aWFsc1JlcXVlc3QaOS5yZWRwYW5kYS5hcGkuaWFtLnYxLkdldFNlcnZpY2VBY2NvdW50Q3JlZGVudGlhbHNSZXNwb25zZSK7BJJBxQMSH0dldCBzZXJ2aWNlIGFjY291bnQgY3JlZGVudGlhbHMaKUdldCBSZWRwYW5kYSBzZXJ2aWNlIGFjY291bnQgY3JlZGVudGlhbHMuSkoKAzIwMBJDCgJPaxI9CjsaOS5yZWRwYW5kYS5hcGkuaWFtLnYxLkdldFNlcnZpY2VBY2NvdW50Q3JlZGVudGlhbHNSZXNwb25zZUqfAQoDNDA0EpcBCglOb3QgRm91bmQSFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMicgorU2VydmljZUFjY291bnQgd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdBJDeyJjb2RlIjo2LCJtZXNzYWdlIjoiU2VydmljZUFjY291bnQgd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdC4ifUqIAQoDNTAwEoABCixJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IuIFJlYWNoIG91dCB0byBzdXBwb3J0LhIWChQaEi5nb29nbGUucnBjLlN0YXR1cyI4CgdkZWZhdWx0Ei17ImNvZGUiOjEzLCJtZXNzYWdlIjoiSW50ZXJuYWwgU2VydmVyIEVycm9yIn3KvwdBCgxvcmdhbml6YXRpb24SGGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pZBoXaWFtX3NlcnZpY2VhY2NvdW50X3JlYWSC0+STAicSJS92MS9zZXJ2aWNlLWFjY291bnRzL3tpZH0vY3JlZGVudGlhbHMS8gMKE0xpc3RTZXJ2aWNlQWNjb3VudHMSLy5yZWRwYW5kYS5hcGkuaWFtLnYxLkxpc3RTZXJ2aWNlQWNjb3VudHNSZXF1ZXN0GjAucmVkcGFuZGEuYXBpLmlhbS52MS5MaXN0U2VydmljZUFjY291bnRzUmVzcG9uc2Ui9wKSQZICEhVMaXN0IHNlcnZpY2UgYWNjb3VudHMaK0xpc3Qgc2VydmljZSBhY2NvdW50cyBpbiB5b3VyIG9yZ2FuaXphdGlvbi5KQQoDMjAwEjoKAk9LEjQKMhowLnJlZHBhbmRhLmFwaS5pYW0udjEuTGlzdFNlcnZpY2VBY2NvdW50c1Jlc3BvbnNlSogBCgM1MDASgAEKLEludGVybmFsIFNlcnZlciBFcnJvci4gUmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzIjgKB2RlZmF1bHQSLXsiY29kZSI6MTMsIm1lc3NhZ2UiOiJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3Iifcq/B0EKDG9yZ2FuaXphdGlvbhIYaWRlbnRpdHkub3JnYW5pemF0aW9uX2lkGhdpYW1fc2VydmljZWFjY291bnRfcmVhZILT5JMCFhIUL3YxL3NlcnZpY2UtYWNjb3VudHMS8wMKFERlbGV0ZVNlcnZpY2VBY2NvdW50EjAucmVkcGFuZGEuYXBpLmlhbS52MS5EZWxldGVTZXJ2aWNlQWNjb3VudFJlcXVlc3QaMS5yZWRwYW5kYS5hcGkuaWFtLnYxLkRlbGV0ZVNlcnZpY2VBY2NvdW50UmVzcG9uc2Ui9QKSQYkCEhZEZWxldGUgc2VydmljZSBhY2NvdW50GhlEZWxldGUgYSBzZXJ2aWNlIGFjY291bnQuSjIKAzIwNBIrCidTZXJ2aWNlQWNjb3VudCB3YXMgZGVsZXRlZCBzdWNjZXNzZnVsbHkSAEqfAQoDNDA0EpcBCglOb3QgRm91bmQSFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMicgorU2VydmljZUFjY291bnQgd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdBJDeyJjb2RlIjo2LCJtZXNzYWdlIjoiU2VydmljZUFjY291bnQgd2l0aCBnaXZlbiBJRCBkb2VzIG5vdCBleGlzdC4ifcq/B0MKDG9yZ2FuaXphdGlvbhIYaWRlbnRpdHkub3JnYW5pemF0aW9uX2lkGhlpYW1fc2VydmljZWFjY291bnRfZGVsZXRlgtPkkwIbKhkvdjEvc2VydmljZS1hY2NvdW50cy97aWR9EoUGChpSb3RhdGVTZXJ2aWNlQWNjb3VudFNlY3JldBI2LnJlZHBhbmRhLmFwaS5pYW0udjEuUm90YXRlU2VydmljZUFjY291bnRTZWNyZXRSZXF1ZXN0GjcucmVkcGFuZGEuYXBpLmlhbS52MS5Sb3RhdGVTZXJ2aWNlQWNjb3VudFNlY3JldFJlc3BvbnNlIvUEkkH7AxIdUm90YXRlIHNlcnZpY2UgYWNjb3VudCBzZWNyZXQaY1JvdGF0ZXMgdGhlIHNlcnZpY2UgYWNjb3VudCdzIHNlY3JldCBhbmQgcmV0dXJucyB0aGUgdXBkYXRlZCBzZXJ2aWNlIGFjY291bnQgYWxvbmcgd2l0aCB0aGUgc2VjcmV0LkpICgMyMDASQQoCT2sSOwo5GjcucmVkcGFuZGEuYXBpLmlhbS52MS5Sb3RhdGVTZXJ2aWNlQWNjb3VudFNlY3JldFJlc3BvbnNlSp8BCgM0MDQSlwEKCU5vdCBGb3VuZBIWChQaEi5nb29nbGUucnBjLlN0YXR1cyJyCitTZXJ2aWNlQWNjb3VudCB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0EkN7ImNvZGUiOjYsIm1lc3NhZ2UiOiJTZXJ2aWNlQWNjb3VudCB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0LiJ9SogBCgM1MDASgAEKLEludGVybmFsIFNlcnZlciBFcnJvci4gUmVhY2ggb3V0IHRvIHN1cHBvcnQuEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVzIjgKB2RlZmF1bHQSLXsiY29kZSI6MTMsIm1lc3NhZ2UiOiJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3Iifcq/B0MKDG9yZ2FuaXphdGlvbhIYaWRlbnRpdHkub3JnYW5pemF0aW9uX2lkGhlpYW1fc2VydmljZWFjY291bnRfdXBkYXRlgtPkkwIpEicvdjEvc2VydmljZS1hY2NvdW50cy97aWR9L3JvdGF0ZS1zZWNyZXQaTJJBSQoeQ29udHJvbCBQbGFuZSBTZXJ2aWNlIEFjY291bnRzEidNYW5hZ2UgUmVkcGFuZGEgQ2xvdWQgc2VydmljZSBhY2NvdW50cy5iBnByb3RvMw", [file_buf_validate_validate2, file_google_api_annotations, file_google_protobuf_field_mask, file_google_protobuf_timestamp, file_protoc_gen_openapiv2_options_annotations2, file_redpanda_api_iam_v1_role_binding, file_redpanda_api_iam_v1alpha1_options]);
var ServiceAccountService = /* @__PURE__ */ serviceDesc(file_redpanda_api_iam_v1_service_account, 0);

// node_modules/@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1/user_pb.js
var file_redpanda_api_iam_v1_user = /* @__PURE__ */ fileDesc("Ch5yZWRwYW5kYS9hcGkvaWFtL3YxL3VzZXIucHJvdG8SE3JlZHBhbmRhLmFwaS5pYW0udjEiogEKBFVzZXISFwoCaWQYASABKAlCC7pICMgBAXIDmAEUEhkKBWVtYWlsGAIgASgJQgq6SAfIAQFyAmABEhQKBG5hbWUYAyABKAlCBrpIA8gBARIgCgtwaWN0dXJlX3VybBgEIAEoCUILukgIyAEBcgOIAQESLgoKY3JlYXRlZF9hdBgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAiWAoOR2V0VXNlclJlcXVlc3QSFwoCaWQYASABKAlCC7pICMgBAXIDmAEUEi0KCXJlYWRfbWFzaxgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2siOgoPR2V0VXNlclJlc3BvbnNlEicKBHVzZXIYASABKAsyGS5yZWRwYW5kYS5hcGkuaWFtLnYxLlVzZXIisAEKEExpc3RVc2Vyc1JlcXVlc3QSPAoGZmlsdGVyGAEgASgLMiwucmVkcGFuZGEuYXBpLmlhbS52MS5MaXN0VXNlcnNSZXF1ZXN0LkZpbHRlchIRCglwYWdlX3NpemUYAiABKAUSEgoKcGFnZV90b2tlbhgDIAEoCRItCglyZWFkX21hc2sYBSABKAsyGi5nb29nbGUucHJvdG9idWYuRmllbGRNYXNrGggKBkZpbHRlciJ6ChFMaXN0VXNlcnNSZXNwb25zZRJMCgV1c2VycxgBIAMoCzIZLnJlZHBhbmRhLmFwaS5pYW0udjEuVXNlckIikkEfMhpVc2VycyBtYXRjaGluZyB0aGUgcmVxdWVzdKABZBIXCg9uZXh0X3BhZ2VfdG9rZW4YAiABKAkiLAoRRGVsZXRlVXNlclJlcXVlc3QSFwoCaWQYASABKAlCC7pICMgBAXIDmAEUIhQKEkRlbGV0ZVVzZXJSZXNwb25zZTKADAoLVXNlclNlcnZpY2USoAQKB0dldFVzZXISIy5yZWRwYW5kYS5hcGkuaWFtLnYxLkdldFVzZXJSZXF1ZXN0GiQucmVkcGFuZGEuYXBpLmlhbS52MS5HZXRVc2VyUmVzcG9uc2UiyQOSQfQCEghHZXQgdXNlchoYR2V0IFJlZHBhbmRhIENsb3VkIHVzZXIuSjUKAzIwMBIuCgJPaxIoCiYaJC5yZWRwYW5kYS5hcGkuaWFtLnYxLkdldFVzZXJSZXNwb25zZUqLAQoDNDA0EoMBCglOb3QgRm91bmQSFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMiXgohVXNlciB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0Ejl7ImNvZGUiOjYsIm1lc3NhZ2UiOiJVc2VyIHdpdGggZ2l2ZW4gSUQgZG9lcyBub3QgZXhpc3QuIn1KiAEKAzUwMBKAAQosSW50ZXJuYWwgU2VydmVyIEVycm9yLiBSZWFjaCBvdXQgdG8gc3VwcG9ydC4SFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMiOAoHZGVmYXVsdBIteyJjb2RlIjoxMywibWVzc2FnZSI6IkludGVybmFsIFNlcnZlciBFcnJvciJ9yr8HNwoMb3JnYW5pemF0aW9uEhhpZGVudGl0eS5vcmdhbml6YXRpb25faWQaDWlhbV91c2VyX3JlYWSC0+STAhASDi92MS91c2Vycy97aWR9EpkDCglMaXN0VXNlcnMSJS5yZWRwYW5kYS5hcGkuaWFtLnYxLkxpc3RVc2Vyc1JlcXVlc3QaJi5yZWRwYW5kYS5hcGkuaWFtLnYxLkxpc3RVc2Vyc1Jlc3BvbnNlIrwCkkHsARIKTGlzdCB1c2VycxoaTGlzdCBSZWRwYW5kYSBDbG91ZCBVc2Vycy5KNwoDMjAwEjAKAk9LEioKKBomLnJlZHBhbmRhLmFwaS5pYW0udjEuTGlzdFVzZXJzUmVzcG9uc2VKiAEKAzUwMBKAAQosSW50ZXJuYWwgU2VydmVyIEVycm9yLiBSZWFjaCBvdXQgdG8gc3VwcG9ydC4SFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMiOAoHZGVmYXVsdBIteyJjb2RlIjoxMywibWVzc2FnZSI6IkludGVybmFsIFNlcnZlciBFcnJvciJ9yr8HNwoMb3JnYW5pemF0aW9uEhhpZGVudGl0eS5vcmdhbml6YXRpb25faWQaDWlhbV91c2VyX3JlYWSC0+STAgsSCS92MS91c2VycxLsAwoKRGVsZXRlVXNlchImLnJlZHBhbmRhLmFwaS5pYW0udjEuRGVsZXRlVXNlclJlcXVlc3QaJy5yZWRwYW5kYS5hcGkuaWFtLnYxLkRlbGV0ZVVzZXJSZXNwb25zZSKMA5JBtQISC0RlbGV0ZSB1c2VyGjFEZWxldGUgUmVkcGFuZGEgQ2xvdWQgdXNlciBmcm9tIHRoZSBvcmdhbml6YXRpb24uSj4KAzIwNBI3CjNVc2VyIHdhcyBkZWxldGVkIGZyb20gdGhlIG9yZ2FuaXphdGlvbiBzdWNjZXNzZnVsbHkSAEqyAQoDNDA0EqoBCglOb3QgRm91bmQSFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXMihAEKNFVzZXIgd2l0aCBnaXZlbiBJRCBpcyBub3QgbWVtYmVyIG9mIHRoZSBvcmdhbml6YXRpb24STHsiY29kZSI6NiwibWVzc2FnZSI6IlVzZXIgd2l0aCBnaXZlbiBJRCBpcyBub3QgbWVtYmVyIG9mIHRoZSBvcmdhbml6YXRpb24uIn3Kvwc5Cgxvcmdhbml6YXRpb24SGGlkZW50aXR5Lm9yZ2FuaXphdGlvbl9pZBoPaWFtX3VzZXJfZGVsZXRlgtPkkwIQKg4vdjEvdXNlcnMve2lkfRpDkkFAChNDb250cm9sIFBsYW5lIFVzZXJzEilNYW5hZ2UgUmVkcGFuZGEgQ2xvdWQgb3JnYW5pemF0aW9uIHVzZXJzLmIGcHJvdG8z", [file_buf_validate_validate2, file_google_api_annotations, file_google_protobuf_field_mask, file_google_protobuf_timestamp, file_protoc_gen_openapiv2_options_annotations2, file_redpanda_api_iam_v1alpha1_options]);
var UserService = /* @__PURE__ */ serviceDesc(file_redpanda_api_iam_v1_user, 0);

// node_modules/@connectrpc/connect/dist/esm/code.js
var Code;
(function(Code2) {
  Code2[Code2["Canceled"] = 1] = "Canceled";
  Code2[Code2["Unknown"] = 2] = "Unknown";
  Code2[Code2["InvalidArgument"] = 3] = "InvalidArgument";
  Code2[Code2["DeadlineExceeded"] = 4] = "DeadlineExceeded";
  Code2[Code2["NotFound"] = 5] = "NotFound";
  Code2[Code2["AlreadyExists"] = 6] = "AlreadyExists";
  Code2[Code2["PermissionDenied"] = 7] = "PermissionDenied";
  Code2[Code2["ResourceExhausted"] = 8] = "ResourceExhausted";
  Code2[Code2["FailedPrecondition"] = 9] = "FailedPrecondition";
  Code2[Code2["Aborted"] = 10] = "Aborted";
  Code2[Code2["OutOfRange"] = 11] = "OutOfRange";
  Code2[Code2["Unimplemented"] = 12] = "Unimplemented";
  Code2[Code2["Internal"] = 13] = "Internal";
  Code2[Code2["Unavailable"] = 14] = "Unavailable";
  Code2[Code2["DataLoss"] = 15] = "DataLoss";
  Code2[Code2["Unauthenticated"] = 16] = "Unauthenticated";
})(Code || (Code = {}));
// node_modules/@bufbuild/protobuf/dist/esm/extensions.js
function getExtension(message, extension) {
  assertExtendee(extension, message);
  const ufs = filterUnknownFields(message.$unknown, extension);
  const [container, field, get] = createExtensionContainer(extension);
  for (const uf of ufs) {
    readField(container, new BinaryReader(uf.data), field, uf.wireType, {
      readUnknownFields: true
    });
  }
  return get();
}
function setExtension(message, extension, value) {
  var _a;
  assertExtendee(extension, message);
  const ufs = ((_a = message.$unknown) !== null && _a !== undefined ? _a : []).filter((uf) => uf.no !== extension.number);
  const [container, field] = createExtensionContainer(extension, value);
  const writer = new BinaryWriter;
  writeField(writer, { writeUnknownFields: true }, container, field);
  const reader = new BinaryReader(writer.finish());
  while (reader.pos < reader.len) {
    const [no, wireType] = reader.tag();
    const data = reader.skip(wireType, no);
    ufs.push({ no, wireType, data });
  }
  message.$unknown = ufs;
}
function filterUnknownFields(unknownFields, extension) {
  if (unknownFields === undefined)
    return [];
  if (extension.fieldKind === "enum" || extension.fieldKind === "scalar") {
    for (let i = unknownFields.length - 1;i >= 0; --i) {
      if (unknownFields[i].no == extension.number) {
        return [unknownFields[i]];
      }
    }
    return [];
  }
  return unknownFields.filter((uf) => uf.no === extension.number);
}
function createExtensionContainer(extension, value) {
  const localName = extension.typeName;
  const field = Object.assign(Object.assign({}, extension), { kind: "field", parent: extension.extendee, localName });
  const desc = Object.assign(Object.assign({}, extension.extendee), { fields: [field], members: [field], oneofs: [] });
  const container = create(desc, value !== undefined ? { [localName]: value } : undefined);
  return [
    reflect(desc, container),
    field,
    () => {
      const value2 = container[localName];
      if (value2 === undefined) {
        const desc2 = extension.message;
        if (isWrapperDesc(desc2)) {
          return scalarZeroValue(desc2.fields[0].scalar, desc2.fields[0].longAsString);
        }
        return create(desc2);
      }
      return value2;
    }
  ];
}
function assertExtendee(extension, message) {
  if (extension.extendee.typeName != message.$typeName) {
    throw new Error(`extension ${extension.typeName} can only be applied to message ${extension.extendee.typeName}`);
  }
}
// node_modules/@bufbuild/protobuf/dist/esm/to-json.js
var LEGACY_REQUIRED3 = 3;
var IMPLICIT4 = 2;
var jsonWriteDefaults = {
  alwaysEmitImplicit: false,
  enumAsInteger: false,
  useProtoFieldName: false
};
function makeWriteOptions2(options) {
  return options ? Object.assign(Object.assign({}, jsonWriteDefaults), options) : jsonWriteDefaults;
}
function toJson(schema, message, options) {
  return reflectToJson(reflect(schema, message), makeWriteOptions2(options));
}
function toJsonString(schema, message, options) {
  var _a;
  const jsonValue = toJson(schema, message, options);
  return JSON.stringify(jsonValue, null, (_a = options === null || options === undefined ? undefined : options.prettySpaces) !== null && _a !== undefined ? _a : 0);
}
function reflectToJson(msg, opts) {
  var _a;
  const wktJson = tryWktToJson(msg, opts);
  if (wktJson !== undefined)
    return wktJson;
  const json = {};
  for (const f of msg.sortedFields) {
    if (!msg.isSet(f)) {
      if (f.presence == LEGACY_REQUIRED3) {
        throw new Error(`cannot encode ${f} to JSON: required field not set`);
      }
      if (!opts.alwaysEmitImplicit || f.presence !== IMPLICIT4) {
        continue;
      }
    }
    const jsonValue = fieldToJson(f, msg.get(f), opts);
    if (jsonValue !== undefined) {
      json[jsonName(f, opts)] = jsonValue;
    }
  }
  if (opts.registry) {
    const tagSeen = new Set;
    for (const { no } of (_a = msg.getUnknown()) !== null && _a !== undefined ? _a : []) {
      if (!tagSeen.has(no)) {
        tagSeen.add(no);
        const extension = opts.registry.getExtensionFor(msg.desc, no);
        if (!extension) {
          continue;
        }
        const value = getExtension(msg.message, extension);
        const [container, field] = createExtensionContainer(extension, value);
        const jsonValue = fieldToJson(field, container.get(field), opts);
        if (jsonValue !== undefined) {
          json[extension.jsonName] = jsonValue;
        }
      }
    }
  }
  return json;
}
function fieldToJson(f, val, opts) {
  switch (f.fieldKind) {
    case "scalar":
      return scalarToJson(f, val);
    case "message":
      return reflectToJson(val, opts);
    case "enum":
      return enumToJsonInternal(f.enum, val, opts.enumAsInteger);
    case "list":
      return listToJson(val, opts);
    case "map":
      return mapToJson(val, opts);
  }
}
function mapToJson(map, opts) {
  const f = map.field();
  const jsonObj = {};
  switch (f.mapKind) {
    case "scalar":
      for (const [entryKey, entryValue] of map) {
        jsonObj[entryKey] = scalarToJson(f, entryValue);
      }
      break;
    case "message":
      for (const [entryKey, entryValue] of map) {
        jsonObj[entryKey] = reflectToJson(entryValue, opts);
      }
      break;
    case "enum":
      for (const [entryKey, entryValue] of map) {
        jsonObj[entryKey] = enumToJsonInternal(f.enum, entryValue, opts.enumAsInteger);
      }
      break;
  }
  return opts.alwaysEmitImplicit || map.size > 0 ? jsonObj : undefined;
}
function listToJson(list, opts) {
  const f = list.field();
  const jsonArr = [];
  switch (f.listKind) {
    case "scalar":
      for (const item of list) {
        jsonArr.push(scalarToJson(f, item));
      }
      break;
    case "enum":
      for (const item of list) {
        jsonArr.push(enumToJsonInternal(f.enum, item, opts.enumAsInteger));
      }
      break;
    case "message":
      for (const item of list) {
        jsonArr.push(reflectToJson(item, opts));
      }
      break;
  }
  return opts.alwaysEmitImplicit || jsonArr.length > 0 ? jsonArr : undefined;
}
function enumToJsonInternal(desc, value, enumAsInteger) {
  var _a;
  if (typeof value != "number") {
    throw new Error(`cannot encode ${desc} to JSON: expected number, got ${formatVal(value)}`);
  }
  if (desc.typeName == "google.protobuf.NullValue") {
    return null;
  }
  if (enumAsInteger) {
    return value;
  }
  const val = desc.value[value];
  return (_a = val === null || val === undefined ? undefined : val.name) !== null && _a !== undefined ? _a : value;
}
function scalarToJson(field, value) {
  var _a, _b, _c, _d, _e, _f;
  switch (field.scalar) {
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      if (typeof value != "number") {
        throw new Error(`cannot encode ${field} to JSON: ${(_a = checkField(field, value)) === null || _a === undefined ? undefined : _a.message}`);
      }
      return value;
    case ScalarType.FLOAT:
    case ScalarType.DOUBLE:
      if (typeof value != "number") {
        throw new Error(`cannot encode ${field} to JSON: ${(_b = checkField(field, value)) === null || _b === undefined ? undefined : _b.message}`);
      }
      if (Number.isNaN(value))
        return "NaN";
      if (value === Number.POSITIVE_INFINITY)
        return "Infinity";
      if (value === Number.NEGATIVE_INFINITY)
        return "-Infinity";
      return value;
    case ScalarType.STRING:
      if (typeof value != "string") {
        throw new Error(`cannot encode ${field} to JSON: ${(_c = checkField(field, value)) === null || _c === undefined ? undefined : _c.message}`);
      }
      return value;
    case ScalarType.BOOL:
      if (typeof value != "boolean") {
        throw new Error(`cannot encode ${field} to JSON: ${(_d = checkField(field, value)) === null || _d === undefined ? undefined : _d.message}`);
      }
      return value;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (typeof value != "bigint" && typeof value != "string") {
        throw new Error(`cannot encode ${field} to JSON: ${(_e = checkField(field, value)) === null || _e === undefined ? undefined : _e.message}`);
      }
      return value.toString();
    case ScalarType.BYTES:
      if (value instanceof Uint8Array) {
        return base64Encode(value);
      }
      throw new Error(`cannot encode ${field} to JSON: ${(_f = checkField(field, value)) === null || _f === undefined ? undefined : _f.message}`);
  }
}
function jsonName(f, opts) {
  return opts.useProtoFieldName ? f.name : f.jsonName;
}
function tryWktToJson(msg, opts) {
  if (!msg.desc.typeName.startsWith("google.protobuf.")) {
    return;
  }
  switch (msg.desc.typeName) {
    case "google.protobuf.Any":
      return anyToJson(msg.message, opts);
    case "google.protobuf.Timestamp":
      return timestampToJson(msg.message);
    case "google.protobuf.Duration":
      return durationToJson(msg.message);
    case "google.protobuf.FieldMask":
      return fieldMaskToJson(msg.message);
    case "google.protobuf.Struct":
      return structToJson(msg.message);
    case "google.protobuf.Value":
      return valueToJson(msg.message);
    case "google.protobuf.ListValue":
      return listValueToJson(msg.message);
    default:
      if (isWrapperDesc(msg.desc)) {
        const valueField = msg.desc.fields[0];
        return scalarToJson(valueField, msg.get(valueField));
      }
      return;
  }
}
function anyToJson(val, opts) {
  if (val.typeUrl === "") {
    return {};
  }
  const { registry } = opts;
  let message;
  let desc;
  if (registry) {
    message = anyUnpack(val, registry);
    if (message) {
      desc = registry.getMessage(message.$typeName);
    }
  }
  if (!desc || !message) {
    throw new Error(`cannot encode message ${val.$typeName} to JSON: "${val.typeUrl}" is not in the type registry`);
  }
  let json = reflectToJson(reflect(desc, message), opts);
  if (desc.typeName.startsWith("google.protobuf.") || json === null || Array.isArray(json) || typeof json !== "object") {
    json = { value: json };
  }
  json["@type"] = val.typeUrl;
  return json;
}
function durationToJson(val) {
  if (Number(val.seconds) > 315576000000 || Number(val.seconds) < -315576000000) {
    throw new Error(`cannot encode message ${val.$typeName} to JSON: value out of range`);
  }
  let text = val.seconds.toString();
  if (val.nanos !== 0) {
    let nanosStr = Math.abs(val.nanos).toString();
    nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
    if (nanosStr.substring(3) === "000000") {
      nanosStr = nanosStr.substring(0, 3);
    } else if (nanosStr.substring(6) === "000") {
      nanosStr = nanosStr.substring(0, 6);
    }
    text += "." + nanosStr;
    if (val.nanos < 0 && Number(val.seconds) == 0) {
      text = "-" + text;
    }
  }
  return text + "s";
}
function fieldMaskToJson(val) {
  return val.paths.map((p) => {
    if (p.match(/_[0-9]?_/g) || p.match(/[A-Z]/g)) {
      throw new Error(`cannot encode message ${val.$typeName} to JSON: lowerCamelCase of path name "` + p + '" is irreversible');
    }
    return protoCamelCase(p);
  }).join(",");
}
function structToJson(val) {
  const json = {};
  for (const [k, v] of Object.entries(val.fields)) {
    json[k] = valueToJson(v);
  }
  return json;
}
function valueToJson(val) {
  switch (val.kind.case) {
    case "nullValue":
      return null;
    case "numberValue":
      if (!Number.isFinite(val.kind.value)) {
        throw new Error(`${val.$typeName} cannot be NaN or Infinity`);
      }
      return val.kind.value;
    case "boolValue":
      return val.kind.value;
    case "stringValue":
      return val.kind.value;
    case "structValue":
      return structToJson(val.kind.value);
    case "listValue":
      return listValueToJson(val.kind.value);
    default:
      throw new Error(`${val.$typeName} must have a value`);
  }
}
function listValueToJson(val) {
  return val.values.map(valueToJson);
}
function timestampToJson(val) {
  const ms = Number(val.seconds) * 1000;
  if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
    throw new Error(`cannot encode message ${val.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  }
  if (val.nanos < 0) {
    throw new Error(`cannot encode message ${val.$typeName} to JSON: nanos must not be negative`);
  }
  let z = "Z";
  if (val.nanos > 0) {
    const nanosStr = (val.nanos + 1e9).toString().substring(1);
    if (nanosStr.substring(3) === "000000") {
      z = "." + nanosStr.substring(0, 3) + "Z";
    } else if (nanosStr.substring(6) === "000") {
      z = "." + nanosStr.substring(0, 6) + "Z";
    } else {
      z = "." + nanosStr + "Z";
    }
  }
  return new Date(ms).toISOString().replace(".000Z", z);
}
// node_modules/@bufbuild/protobuf/dist/esm/from-json.js
var jsonReadDefaults = {
  ignoreUnknownFields: false
};
function makeReadOptions2(options) {
  return options ? Object.assign(Object.assign({}, jsonReadDefaults), options) : jsonReadDefaults;
}
function fromJsonString(schema, json, options) {
  return fromJson(schema, parseJsonString(json, schema.typeName), options);
}
function fromJson(schema, json, options) {
  const msg = reflect(schema);
  try {
    readMessage2(msg, json, makeReadOptions2(options));
  } catch (e) {
    if (isFieldError(e)) {
      throw new Error(`cannot decode ${e.field()} from JSON: ${e.message}`, {
        cause: e
      });
    }
    throw e;
  }
  return msg.message;
}
function readMessage2(msg, json, opts) {
  var _a;
  if (tryWktFromJson(msg, json, opts)) {
    return;
  }
  if (json == null || Array.isArray(json) || typeof json != "object") {
    throw new Error(`cannot decode ${msg.desc} from JSON: ${formatVal(json)}`);
  }
  const oneofSeen = new Map;
  const jsonNames = new Map;
  for (const field of msg.desc.fields) {
    jsonNames.set(field.name, field).set(field.jsonName, field);
  }
  for (const [jsonKey, jsonValue] of Object.entries(json)) {
    const field = jsonNames.get(jsonKey);
    if (field) {
      if (field.oneof) {
        if (jsonValue === null && field.fieldKind == "scalar") {
          continue;
        }
        const seen = oneofSeen.get(field.oneof);
        if (seen !== undefined) {
          throw new FieldError(field.oneof, `oneof set multiple times by ${seen.name} and ${field.name}`);
        }
        oneofSeen.set(field.oneof, field);
      }
      readField2(msg, field, jsonValue, opts);
    } else {
      let extension = undefined;
      if (jsonKey.startsWith("[") && jsonKey.endsWith("]") && (extension = (_a = opts.registry) === null || _a === undefined ? undefined : _a.getExtension(jsonKey.substring(1, jsonKey.length - 1))) && extension.extendee.typeName === msg.desc.typeName) {
        const [container, field2, get] = createExtensionContainer(extension);
        readField2(container, field2, jsonValue, opts);
        setExtension(msg.message, extension, get());
      }
      if (!extension && !opts.ignoreUnknownFields) {
        throw new Error(`cannot decode ${msg.desc} from JSON: key "${jsonKey}" is unknown`);
      }
    }
  }
}
function readField2(msg, field, json, opts) {
  switch (field.fieldKind) {
    case "scalar":
      readScalarField(msg, field, json);
      break;
    case "enum":
      readEnumField(msg, field, json, opts);
      break;
    case "message":
      readMessageField2(msg, field, json, opts);
      break;
    case "list":
      readListField2(msg.get(field), json, opts);
      break;
    case "map":
      readMapField(msg.get(field), json, opts);
      break;
  }
}
function readMapField(map, json, opts) {
  if (json === null) {
    return;
  }
  const field = map.field();
  if (typeof json != "object" || Array.isArray(json)) {
    throw new FieldError(field, "expected object, got " + formatVal(json));
  }
  for (const [jsonMapKey, jsonMapValue] of Object.entries(json)) {
    if (jsonMapValue === null) {
      throw new FieldError(field, "map value must not be null");
    }
    let value;
    switch (field.mapKind) {
      case "message":
        const msgValue = reflect(field.message);
        readMessage2(msgValue, jsonMapValue, opts);
        value = msgValue;
        break;
      case "enum":
        value = readEnum(field.enum, jsonMapValue, opts.ignoreUnknownFields, true);
        if (value === tokenIgnoredUnknownEnum) {
          return;
        }
        break;
      case "scalar":
        value = scalarFromJson(field, jsonMapValue, true);
        break;
    }
    const key2 = mapKeyFromJson(field.mapKey, jsonMapKey);
    map.set(key2, value);
  }
}
function readListField2(list, json, opts) {
  if (json === null) {
    return;
  }
  const field = list.field();
  if (!Array.isArray(json)) {
    throw new FieldError(field, "expected Array, got " + formatVal(json));
  }
  for (const jsonItem of json) {
    if (jsonItem === null) {
      throw new FieldError(field, "list item must not be null");
    }
    switch (field.listKind) {
      case "message":
        const msgValue = reflect(field.message);
        readMessage2(msgValue, jsonItem, opts);
        list.add(msgValue);
        break;
      case "enum":
        const enumValue = readEnum(field.enum, jsonItem, opts.ignoreUnknownFields, true);
        if (enumValue !== tokenIgnoredUnknownEnum) {
          list.add(enumValue);
        }
        break;
      case "scalar":
        list.add(scalarFromJson(field, jsonItem, true));
        break;
    }
  }
}
function readMessageField2(msg, field, json, opts) {
  if (json === null && field.message.typeName != "google.protobuf.Value") {
    msg.clear(field);
    return;
  }
  const msgValue = msg.isSet(field) ? msg.get(field) : reflect(field.message);
  readMessage2(msgValue, json, opts);
  msg.set(field, msgValue);
}
function readEnumField(msg, field, json, opts) {
  const enumValue = readEnum(field.enum, json, opts.ignoreUnknownFields, false);
  if (enumValue === tokenNull) {
    msg.clear(field);
  } else if (enumValue !== tokenIgnoredUnknownEnum) {
    msg.set(field, enumValue);
  }
}
function readScalarField(msg, field, json) {
  const scalarValue = scalarFromJson(field, json, false);
  if (scalarValue === tokenNull) {
    msg.clear(field);
  } else {
    msg.set(field, scalarValue);
  }
}
var tokenIgnoredUnknownEnum = Symbol();
function readEnum(desc, json, ignoreUnknownFields, nullAsZeroValue) {
  if (json === null) {
    if (desc.typeName == "google.protobuf.NullValue") {
      return 0;
    }
    return nullAsZeroValue ? desc.values[0].number : tokenNull;
  }
  switch (typeof json) {
    case "number":
      if (Number.isInteger(json)) {
        return json;
      }
      break;
    case "string":
      const value = desc.values.find((ev) => ev.name === json);
      if (value !== undefined) {
        return value.number;
      }
      if (ignoreUnknownFields) {
        return tokenIgnoredUnknownEnum;
      }
      break;
  }
  throw new Error(`cannot decode ${desc} from JSON: ${formatVal(json)}`);
}
var tokenNull = Symbol();
function scalarFromJson(field, json, nullAsZeroValue) {
  if (json === null) {
    if (nullAsZeroValue) {
      return scalarZeroValue(field.scalar, false);
    }
    return tokenNull;
  }
  switch (field.scalar) {
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === "NaN")
        return NaN;
      if (json === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (json === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof json == "number") {
        if (Number.isNaN(json)) {
          throw new FieldError(field, "unexpected NaN number");
        }
        if (!Number.isFinite(json)) {
          throw new FieldError(field, "unexpected infinite number");
        }
        break;
      }
      if (typeof json == "string") {
        if (json === "") {
          break;
        }
        if (json.trim().length !== json.length) {
          break;
        }
        const float = Number(json);
        if (!Number.isFinite(float)) {
          break;
        }
        return float;
      }
      break;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      return int32FromJson(json);
    case ScalarType.BYTES:
      if (typeof json == "string") {
        if (json === "") {
          return new Uint8Array(0);
        }
        try {
          return base64Decode(json);
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          throw new FieldError(field, message);
        }
      }
      break;
  }
  return json;
}
function mapKeyFromJson(type, json) {
  switch (type) {
    case ScalarType.BOOL:
      switch (json) {
        case "true":
          return true;
        case "false":
          return false;
      }
      return json;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      return int32FromJson(json);
    default:
      return json;
  }
}
function int32FromJson(json) {
  if (typeof json == "string") {
    if (json === "") {
      return json;
    }
    if (json.trim().length !== json.length) {
      return json;
    }
    const num = Number(json);
    if (Number.isNaN(num)) {
      return json;
    }
    return num;
  }
  return json;
}
function parseJsonString(jsonString, typeName) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`cannot decode message ${typeName} from JSON: ${message}`, { cause: e });
  }
}
function tryWktFromJson(msg, jsonValue, opts) {
  if (!msg.desc.typeName.startsWith("google.protobuf.")) {
    return false;
  }
  switch (msg.desc.typeName) {
    case "google.protobuf.Any":
      anyFromJson(msg.message, jsonValue, opts);
      return true;
    case "google.protobuf.Timestamp":
      timestampFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.Duration":
      durationFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.FieldMask":
      fieldMaskFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.Struct":
      structFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.Value":
      valueFromJson(msg.message, jsonValue);
      return true;
    case "google.protobuf.ListValue":
      listValueFromJson(msg.message, jsonValue);
      return true;
    default:
      if (isWrapperDesc(msg.desc)) {
        const valueField = msg.desc.fields[0];
        if (jsonValue === null) {
          msg.clear(valueField);
        } else {
          msg.set(valueField, scalarFromJson(valueField, jsonValue, true));
        }
        return true;
      }
      return false;
  }
}
function anyFromJson(any, json, opts) {
  var _a;
  if (json === null || Array.isArray(json) || typeof json != "object") {
    throw new Error(`cannot decode message ${any.$typeName} from JSON: expected object but got ${formatVal(json)}`);
  }
  if (Object.keys(json).length == 0) {
    return;
  }
  const typeUrl = json["@type"];
  if (typeof typeUrl != "string" || typeUrl == "") {
    throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is empty`);
  }
  const typeName = typeUrl.includes("/") ? typeUrl.substring(typeUrl.lastIndexOf("/") + 1) : typeUrl;
  if (!typeName.length) {
    throw new Error(`cannot decode message ${any.$typeName} from JSON: "@type" is invalid`);
  }
  const desc = (_a = opts.registry) === null || _a === undefined ? undefined : _a.getMessage(typeName);
  if (!desc) {
    throw new Error(`cannot decode message ${any.$typeName} from JSON: ${typeUrl} is not in the type registry`);
  }
  const msg = reflect(desc);
  if (typeName.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(json, "value")) {
    const value = json.value;
    readMessage2(msg, value, opts);
  } else {
    const copy = Object.assign({}, json);
    delete copy["@type"];
    readMessage2(msg, copy, opts);
  }
  anyPack(msg.desc, msg.message, any);
}
function timestampFromJson(timestamp, json) {
  if (typeof json !== "string") {
    throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: ${formatVal(json)}`);
  }
  const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!matches) {
    throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
  }
  const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
  if (Number.isNaN(ms)) {
    throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: invalid RFC 3339 string`);
  }
  if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
    throw new Error(`cannot decode message ${timestamp.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  }
  timestamp.seconds = protoInt64.parse(ms / 1000);
  timestamp.nanos = 0;
  if (matches[7]) {
    timestamp.nanos = parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1e9;
  }
}
function durationFromJson(duration, json) {
  if (typeof json !== "string") {
    throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
  }
  const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (match === null) {
    throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
  }
  const longSeconds = Number(match[1]);
  if (longSeconds > 315576000000 || longSeconds < -315576000000) {
    throw new Error(`cannot decode message ${duration.$typeName} from JSON: ${formatVal(json)}`);
  }
  duration.seconds = protoInt64.parse(longSeconds);
  if (typeof match[2] !== "string") {
    return;
  }
  const nanosStr = match[2] + "0".repeat(9 - match[2].length);
  duration.nanos = parseInt(nanosStr);
  if (longSeconds < 0 || Object.is(longSeconds, -0)) {
    duration.nanos = -duration.nanos;
  }
}
function fieldMaskFromJson(fieldMask, json) {
  if (typeof json !== "string") {
    throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: ${formatVal(json)}`);
  }
  if (json === "") {
    return;
  }
  function camelToSnake(str) {
    if (str.includes("_")) {
      throw new Error(`cannot decode message ${fieldMask.$typeName} from JSON: path names must be lowerCamelCase`);
    }
    const sc = str.replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase());
    return sc[0] === "_" ? sc.substring(1) : sc;
  }
  fieldMask.paths = json.split(",").map(camelToSnake);
}
function structFromJson(struct, json) {
  if (typeof json != "object" || json == null || Array.isArray(json)) {
    throw new Error(`cannot decode message ${struct.$typeName} from JSON ${formatVal(json)}`);
  }
  for (const [k, v] of Object.entries(json)) {
    const parsedV = create(ValueSchema);
    valueFromJson(parsedV, v);
    struct.fields[k] = parsedV;
  }
}
function valueFromJson(value, json) {
  switch (typeof json) {
    case "number":
      value.kind = { case: "numberValue", value: json };
      break;
    case "string":
      value.kind = { case: "stringValue", value: json };
      break;
    case "boolean":
      value.kind = { case: "boolValue", value: json };
      break;
    case "object":
      if (json === null) {
        value.kind = { case: "nullValue", value: NullValue.NULL_VALUE };
      } else if (Array.isArray(json)) {
        const listValue = create(ListValueSchema);
        listValueFromJson(listValue, json);
        value.kind = { case: "listValue", value: listValue };
      } else {
        const struct = create(StructSchema);
        structFromJson(struct, json);
        value.kind = { case: "structValue", value: struct };
      }
      break;
    default:
      throw new Error(`cannot decode message ${value.$typeName} from JSON ${formatVal(json)}`);
  }
  return value;
}
function listValueFromJson(listValue, json) {
  if (!Array.isArray(json)) {
    throw new Error(`cannot decode message ${listValue.$typeName} from JSON ${formatVal(json)}`);
  }
  for (const e of json) {
    const value = create(ValueSchema);
    valueFromJson(value, e);
    listValue.values.push(value);
  }
}
// node_modules/@connectrpc/connect/dist/esm/protocol-connect/code-string.js
function codeToString(value) {
  const name = Code[value];
  if (typeof name != "string") {
    return value.toString();
  }
  return name[0].toLowerCase() + name.substring(1).replace(/[A-Z]/g, (c) => "_" + c.toLowerCase());
}
var stringToCode;
function codeFromString(value) {
  if (!stringToCode) {
    stringToCode = {};
    for (const value2 of Object.values(Code)) {
      if (typeof value2 == "string") {
        continue;
      }
      stringToCode[codeToString(value2)] = value2;
    }
  }
  return stringToCode[value];
}

// node_modules/@connectrpc/connect/dist/esm/connect-error.js
class ConnectError extends Error {
  constructor(message, code = Code.Unknown, metadata, outgoingDetails, cause) {
    super(createMessage(message, code));
    this.name = "ConnectError";
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.metadata = new Headers(metadata !== null && metadata !== undefined ? metadata : {});
    this.details = outgoingDetails !== null && outgoingDetails !== undefined ? outgoingDetails : [];
    this.cause = cause;
  }
  static from(reason, code = Code.Unknown) {
    if (reason instanceof ConnectError) {
      return reason;
    }
    if (reason instanceof Error) {
      if (reason.name == "AbortError" || reason.name == "TimeoutError") {
        return new ConnectError(reason.message, Code.Canceled);
      }
      return new ConnectError(reason.message, code, undefined, undefined, reason);
    }
    return new ConnectError(String(reason), code, undefined, undefined, reason);
  }
  static [Symbol.hasInstance](v) {
    if (!(v instanceof Error)) {
      return false;
    }
    if (Object.getPrototypeOf(v) === ConnectError.prototype) {
      return true;
    }
    return v.name === "ConnectError" && "code" in v && typeof v.code === "number" && "metadata" in v && "details" in v && Array.isArray(v.details) && "rawMessage" in v && typeof v.rawMessage == "string" && "cause" in v;
  }
  findDetails(typeOrRegistry) {
    const registry2 = typeOrRegistry.kind === "message" ? {
      getMessage: (typeName) => typeName === typeOrRegistry.typeName ? typeOrRegistry : undefined
    } : typeOrRegistry;
    const details = [];
    for (const data of this.details) {
      if ("desc" in data) {
        if (registry2.getMessage(data.desc.typeName)) {
          details.push(create(data.desc, data.value));
        }
        continue;
      }
      const desc = registry2.getMessage(data.type);
      if (desc) {
        try {
          details.push(fromBinary(desc, data.value));
        } catch (_) {}
      }
    }
    return details;
  }
}
function createMessage(message, code) {
  return message.length ? `[${codeToString(code)}] ${message}` : `[${codeToString(code)}]`;
}
// node_modules/@connectrpc/connect/dist/esm/http-headers.js
function appendHeaders(...headers) {
  const h = new Headers;
  for (const e of headers) {
    e.forEach((value, key2) => {
      h.append(key2, value);
    });
  }
  return h;
}

// node_modules/@connectrpc/connect/dist/esm/any-client.js
function makeAnyClient(service, createMethod) {
  const client = {};
  for (const desc of service.methods) {
    const method = createMethod(desc);
    if (method != null) {
      client[desc.localName] = method;
    }
  }
  return client;
}

// node_modules/@connectrpc/connect/dist/esm/protocol/compression.js
var compressedFlag = 1;

// node_modules/@connectrpc/connect/dist/esm/protocol/limit-io.js
var maxReadMaxBytes = 4294967295;
var maxWriteMaxBytes = maxReadMaxBytes;
var defaultCompressMinBytes = 1024;
function validateReadWriteMaxBytes(readMaxBytes, writeMaxBytes, compressMinBytes) {
  writeMaxBytes !== null && writeMaxBytes !== undefined || (writeMaxBytes = maxWriteMaxBytes);
  readMaxBytes !== null && readMaxBytes !== undefined || (readMaxBytes = maxReadMaxBytes);
  compressMinBytes !== null && compressMinBytes !== undefined || (compressMinBytes = defaultCompressMinBytes);
  if (writeMaxBytes < 1 || writeMaxBytes > maxWriteMaxBytes) {
    throw new ConnectError(`writeMaxBytes ${writeMaxBytes} must be >= 1 and <= ${maxWriteMaxBytes}`, Code.Internal);
  }
  if (readMaxBytes < 1 || readMaxBytes > maxReadMaxBytes) {
    throw new ConnectError(`readMaxBytes ${readMaxBytes} must be >= 1 and <= ${maxReadMaxBytes}`, Code.Internal);
  }
  return {
    readMaxBytes,
    writeMaxBytes,
    compressMinBytes
  };
}
function assertWriteMaxBytes(writeMaxBytes, bytesWritten) {
  if (bytesWritten > writeMaxBytes) {
    throw new ConnectError(`message size ${bytesWritten} is larger than configured writeMaxBytes ${writeMaxBytes}`, Code.ResourceExhausted);
  }
}
function assertReadMaxBytes(readMaxBytes, bytesRead, totalSizeKnown = false) {
  if (bytesRead > readMaxBytes) {
    let message = `message size is larger than configured readMaxBytes ${readMaxBytes}`;
    if (totalSizeKnown) {
      message = `message size ${bytesRead} is larger than configured readMaxBytes ${readMaxBytes}`;
    }
    throw new ConnectError(message, Code.ResourceExhausted);
  }
}

// node_modules/@connectrpc/connect/dist/esm/protocol/envelope.js
function createEnvelopeDecoder(readMaxBytes) {
  return new EnvelopeDecoderImpl(readMaxBytes);
}

class EnvelopeDecoderImpl {
  constructor(readMaxBytes) {
    this.readMaxBytes = readMaxBytes;
    this.header = new Uint8Array(5);
    this.headerView = new DataView(this.header.buffer);
    this.buf = [];
  }
  get byteLength() {
    return this.buf.reduce((a, b) => a + b.byteLength, 0);
  }
  decode(chunk) {
    this.buf.push(chunk);
    const envs = [];
    for (;; ) {
      let env = this.pop();
      if (!env) {
        break;
      }
      envs.push(env);
    }
    return envs;
  }
  pop() {
    if (!this.env) {
      this.env = this.head();
      if (!this.env) {
        return;
      }
    }
    if (this.cons(this.env.data)) {
      const env = this.env;
      this.env = undefined;
      return env;
    }
    return;
  }
  head() {
    if (!this.cons(this.header)) {
      return;
    }
    const flags = this.headerView.getUint8(0);
    const length = this.headerView.getUint32(1);
    assertReadMaxBytes(this.readMaxBytes, length, true);
    return {
      flags,
      data: new Uint8Array(length)
    };
  }
  cons(target) {
    const wantLength = target.byteLength;
    if (this.byteLength < wantLength) {
      return false;
    }
    let offset = 0;
    while (offset < wantLength) {
      const chunk = this.buf.shift();
      if (chunk.byteLength > wantLength - offset) {
        target.set(chunk.subarray(0, wantLength - offset), offset);
        this.buf.unshift(chunk.subarray(wantLength - offset));
        offset += wantLength - offset;
      } else {
        target.set(chunk, offset);
        offset += chunk.byteLength;
      }
    }
    return true;
  }
}
async function envelopeCompress(envelope, compression, compressMinBytes) {
  let { flags, data } = envelope;
  if ((flags & compressedFlag) === compressedFlag) {
    throw new ConnectError("invalid envelope, already compressed", Code.Internal);
  }
  if (compression && data.byteLength >= compressMinBytes) {
    data = await compression.compress(data);
    flags = flags | compressedFlag;
  }
  return { data, flags };
}
async function envelopeDecompress(envelope, compression, readMaxBytes) {
  let { flags, data } = envelope;
  if ((flags & compressedFlag) === compressedFlag) {
    if (!compression) {
      throw new ConnectError("received compressed envelope, but do not know how to decompress", Code.Internal);
    }
    data = await compression.decompress(data, readMaxBytes);
    flags = flags ^ compressedFlag;
  }
  return { data, flags };
}
function encodeEnvelope(flags, data) {
  const bytes = new Uint8Array(data.length + 5);
  bytes.set(data, 5);
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  v.setUint8(0, flags);
  v.setUint32(1, data.length);
  return bytes;
}

// node_modules/@connectrpc/connect/dist/esm/protocol/async-iterable.js
var __asyncValues = function(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var __await = function(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
};
var __asyncGenerator = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
var __asyncDelegator = function(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
};
function pipeTo(source, ...rest) {
  const [transforms, sink, opt] = pickTransformsAndSink(rest);
  let iterable = source;
  let abortable;
  if ((opt === null || opt === undefined ? undefined : opt.propagateDownStreamError) === true) {
    iterable = abortable = makeIterableAbortable(iterable);
  }
  iterable = pipe(iterable, ...transforms, { propagateDownStreamError: false });
  return sink(iterable).catch((reason) => {
    if (abortable) {
      return abortable.abort(reason).then(() => Promise.reject(reason));
    }
    return Promise.reject(reason);
  });
}
function pickTransformsAndSink(rest) {
  let opt;
  if (typeof rest[rest.length - 1] != "function") {
    opt = rest.pop();
  }
  const sink = rest.pop();
  return [rest, sink, opt];
}
function sinkAllBytes(readMaxBytes, lengthHint) {
  return async (iterable) => await readAllBytes(iterable, readMaxBytes, lengthHint);
}
function pipe(source, ...rest) {
  return __asyncGenerator(this, arguments, function* pipe_1() {
    var _a;
    const [transforms, opt] = pickTransforms(rest);
    let abortable;
    const sourceIt = source[Symbol.asyncIterator]();
    const cachedSource = {
      [Symbol.asyncIterator]() {
        return sourceIt;
      }
    };
    let iterable = cachedSource;
    if ((opt === null || opt === undefined ? undefined : opt.propagateDownStreamError) === true) {
      iterable = abortable = makeIterableAbortable(iterable);
    }
    for (const t of transforms) {
      iterable = t(iterable);
    }
    const it = iterable[Symbol.asyncIterator]();
    try {
      for (;; ) {
        const r = yield __await(it.next());
        if (r.done === true) {
          break;
        }
        if (!abortable) {
          yield yield __await(r.value);
          continue;
        }
        try {
          yield yield __await(r.value);
        } catch (e) {
          yield __await(abortable.abort(e));
          throw e;
        }
      }
    } finally {
      if ((opt === null || opt === undefined ? undefined : opt.propagateDownStreamError) === true) {
        (_a = sourceIt.return) === null || _a === undefined || _a.call(sourceIt).catch(() => {});
      }
    }
  });
}
function pickTransforms(rest) {
  let opt;
  if (typeof rest[rest.length - 1] != "function") {
    opt = rest.pop();
  }
  return [rest, opt];
}
function transformSerializeEnvelope(serialization, endStreamFlag, endSerialization) {
  if (endStreamFlag === undefined || endSerialization === undefined) {
    return function(iterable) {
      return __asyncGenerator(this, arguments, function* () {
        var _a, e_4, _b, _c;
        try {
          for (var _d = true, iterable_4 = __asyncValues(iterable), iterable_4_1;iterable_4_1 = yield __await(iterable_4.next()), _a = iterable_4_1.done, !_a; _d = true) {
            _c = iterable_4_1.value;
            _d = false;
            const chunk = _c;
            const data = serialization.serialize(chunk);
            yield yield __await({ flags: 0, data });
          }
        } catch (e_4_1) {
          e_4 = { error: e_4_1 };
        } finally {
          try {
            if (!_d && !_a && (_b = iterable_4.return))
              yield __await(_b.call(iterable_4));
          } finally {
            if (e_4)
              throw e_4.error;
          }
        }
      });
    };
  }
  return function(iterable) {
    return __asyncGenerator(this, arguments, function* () {
      var _a, e_5, _b, _c;
      try {
        for (var _d = true, iterable_5 = __asyncValues(iterable), iterable_5_1;iterable_5_1 = yield __await(iterable_5.next()), _a = iterable_5_1.done, !_a; _d = true) {
          _c = iterable_5_1.value;
          _d = false;
          const chunk = _c;
          let data;
          let flags = 0;
          if (chunk.end) {
            flags = flags | endStreamFlag;
            data = endSerialization.serialize(chunk.value);
          } else {
            data = serialization.serialize(chunk.value);
          }
          yield yield __await({ flags, data });
        }
      } catch (e_5_1) {
        e_5 = { error: e_5_1 };
      } finally {
        try {
          if (!_d && !_a && (_b = iterable_5.return))
            yield __await(_b.call(iterable_5));
        } finally {
          if (e_5)
            throw e_5.error;
        }
      }
    });
  };
}
function transformParseEnvelope(serialization, endStreamFlag, endSerialization) {
  if (endSerialization && endStreamFlag !== undefined) {
    return function(iterable) {
      return __asyncGenerator(this, arguments, function* () {
        var _a, e_6, _b, _c;
        try {
          for (var _d = true, iterable_6 = __asyncValues(iterable), iterable_6_1;iterable_6_1 = yield __await(iterable_6.next()), _a = iterable_6_1.done, !_a; _d = true) {
            _c = iterable_6_1.value;
            _d = false;
            const { flags, data } = _c;
            if ((flags & endStreamFlag) === endStreamFlag) {
              yield yield __await({ value: endSerialization.parse(data), end: true });
            } else {
              yield yield __await({ value: serialization.parse(data), end: false });
            }
          }
        } catch (e_6_1) {
          e_6 = { error: e_6_1 };
        } finally {
          try {
            if (!_d && !_a && (_b = iterable_6.return))
              yield __await(_b.call(iterable_6));
          } finally {
            if (e_6)
              throw e_6.error;
          }
        }
      });
    };
  }
  return function(iterable) {
    return __asyncGenerator(this, arguments, function* () {
      var _a, e_7, _b, _c;
      try {
        for (var _d = true, iterable_7 = __asyncValues(iterable), iterable_7_1;iterable_7_1 = yield __await(iterable_7.next()), _a = iterable_7_1.done, !_a; _d = true) {
          _c = iterable_7_1.value;
          _d = false;
          const { flags, data } = _c;
          if (endStreamFlag !== undefined && (flags & endStreamFlag) === endStreamFlag) {
            if (endSerialization === null) {
              throw new ConnectError("unexpected end flag", Code.InvalidArgument);
            }
            continue;
          }
          yield yield __await(serialization.parse(data));
        }
      } catch (e_7_1) {
        e_7 = { error: e_7_1 };
      } finally {
        try {
          if (!_d && !_a && (_b = iterable_7.return))
            yield __await(_b.call(iterable_7));
        } finally {
          if (e_7)
            throw e_7.error;
        }
      }
    });
  };
}
function transformCompressEnvelope(compression, compressMinBytes) {
  return function(iterable) {
    return __asyncGenerator(this, arguments, function* () {
      var _a, e_8, _b, _c;
      try {
        for (var _d = true, iterable_8 = __asyncValues(iterable), iterable_8_1;iterable_8_1 = yield __await(iterable_8.next()), _a = iterable_8_1.done, !_a; _d = true) {
          _c = iterable_8_1.value;
          _d = false;
          const env = _c;
          yield yield __await(yield __await(envelopeCompress(env, compression, compressMinBytes)));
        }
      } catch (e_8_1) {
        e_8 = { error: e_8_1 };
      } finally {
        try {
          if (!_d && !_a && (_b = iterable_8.return))
            yield __await(_b.call(iterable_8));
        } finally {
          if (e_8)
            throw e_8.error;
        }
      }
    });
  };
}
function transformDecompressEnvelope(compression, readMaxBytes) {
  return function(iterable) {
    return __asyncGenerator(this, arguments, function* () {
      var _a, e_9, _b, _c;
      try {
        for (var _d = true, iterable_9 = __asyncValues(iterable), iterable_9_1;iterable_9_1 = yield __await(iterable_9.next()), _a = iterable_9_1.done, !_a; _d = true) {
          _c = iterable_9_1.value;
          _d = false;
          const env = _c;
          yield yield __await(yield __await(envelopeDecompress(env, compression, readMaxBytes)));
        }
      } catch (e_9_1) {
        e_9 = { error: e_9_1 };
      } finally {
        try {
          if (!_d && !_a && (_b = iterable_9.return))
            yield __await(_b.call(iterable_9));
        } finally {
          if (e_9)
            throw e_9.error;
        }
      }
    });
  };
}
function transformJoinEnvelopes() {
  return function(iterable) {
    return __asyncGenerator(this, arguments, function* () {
      var _a, e_10, _b, _c;
      try {
        for (var _d = true, iterable_10 = __asyncValues(iterable), iterable_10_1;iterable_10_1 = yield __await(iterable_10.next()), _a = iterable_10_1.done, !_a; _d = true) {
          _c = iterable_10_1.value;
          _d = false;
          const { flags, data } = _c;
          yield yield __await(encodeEnvelope(flags, data));
        }
      } catch (e_10_1) {
        e_10 = { error: e_10_1 };
      } finally {
        try {
          if (!_d && !_a && (_b = iterable_10.return))
            yield __await(_b.call(iterable_10));
        } finally {
          if (e_10)
            throw e_10.error;
        }
      }
    });
  };
}
function transformSplitEnvelope(readMaxBytes) {
  return function(iterable) {
    return __asyncGenerator(this, arguments, function* () {
      var _a, e_11, _b, _c;
      const buffer = createEnvelopeDecoder(readMaxBytes);
      try {
        for (var _d = true, iterable_11 = __asyncValues(iterable), iterable_11_1;iterable_11_1 = yield __await(iterable_11.next()), _a = iterable_11_1.done, !_a; _d = true) {
          _c = iterable_11_1.value;
          _d = false;
          const chunk = _c;
          for (const env of buffer.decode(chunk)) {
            yield yield __await(env);
          }
        }
      } catch (e_11_1) {
        e_11 = { error: e_11_1 };
      } finally {
        try {
          if (!_d && !_a && (_b = iterable_11.return))
            yield __await(_b.call(iterable_11));
        } finally {
          if (e_11)
            throw e_11.error;
        }
      }
      if (buffer.byteLength > 0) {
        throw new ConnectError("protocol error: incomplete envelope", Code.InvalidArgument);
      }
    });
  };
}
async function readAllBytes(iterable, readMaxBytes, lengthHint) {
  var _a, e_12, _b, _c, _d, e_13, _e, _f;
  const [ok, hint] = parseLengthHint(lengthHint);
  if (ok) {
    if (hint > readMaxBytes) {
      assertReadMaxBytes(readMaxBytes, hint, true);
    }
    const buffer = new Uint8Array(hint);
    let offset2 = 0;
    try {
      for (var _g = true, iterable_12 = __asyncValues(iterable), iterable_12_1;iterable_12_1 = await iterable_12.next(), _a = iterable_12_1.done, !_a; _g = true) {
        _c = iterable_12_1.value;
        _g = false;
        const chunk = _c;
        if (offset2 + chunk.byteLength > hint) {
          throw new ConnectError(`protocol error: promised ${hint} bytes, received ${offset2 + chunk.byteLength}`, Code.InvalidArgument);
        }
        buffer.set(chunk, offset2);
        offset2 += chunk.byteLength;
      }
    } catch (e_12_1) {
      e_12 = { error: e_12_1 };
    } finally {
      try {
        if (!_g && !_a && (_b = iterable_12.return))
          await _b.call(iterable_12);
      } finally {
        if (e_12)
          throw e_12.error;
      }
    }
    if (offset2 < hint) {
      throw new ConnectError(`protocol error: promised ${hint} bytes, received ${offset2}`, Code.InvalidArgument);
    }
    return buffer;
  }
  const chunks = [];
  let count = 0;
  try {
    for (var _h = true, iterable_13 = __asyncValues(iterable), iterable_13_1;iterable_13_1 = await iterable_13.next(), _d = iterable_13_1.done, !_d; _h = true) {
      _f = iterable_13_1.value;
      _h = false;
      const chunk = _f;
      count += chunk.byteLength;
      assertReadMaxBytes(readMaxBytes, count);
      chunks.push(chunk);
    }
  } catch (e_13_1) {
    e_13 = { error: e_13_1 };
  } finally {
    try {
      if (!_h && !_d && (_e = iterable_13.return))
        await _e.call(iterable_13);
    } finally {
      if (e_13)
        throw e_13.error;
    }
  }
  const all = new Uint8Array(count);
  let offset = 0;
  for (let chunk = chunks.shift();chunk; chunk = chunks.shift()) {
    all.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return all;
}
function parseLengthHint(lengthHint) {
  if (lengthHint === undefined || lengthHint === null) {
    return [false, 0];
  }
  const n = typeof lengthHint == "string" ? parseInt(lengthHint, 10) : lengthHint;
  if (!Number.isSafeInteger(n) || n < 0) {
    return [false, n];
  }
  return [true, n];
}
function makeIterableAbortable(iterable) {
  const innerCandidate = iterable[Symbol.asyncIterator]();
  if (innerCandidate.throw === undefined) {
    throw new Error("AsyncIterable does not implement throw");
  }
  const inner = innerCandidate;
  let aborted;
  let resultPromise;
  let it = {
    next() {
      resultPromise = inner.next().finally(() => {
        resultPromise = undefined;
      });
      return resultPromise;
    },
    throw(e) {
      return inner.throw(e);
    }
  };
  if (innerCandidate.return !== undefined) {
    it = Object.assign(Object.assign({}, it), { return(value) {
      return inner.return(value);
    } });
  }
  let used = false;
  return {
    abort(reason) {
      if (aborted) {
        return aborted.state;
      }
      const f = () => {
        return inner.throw(reason).then((r) => r.done === true ? "completed" : "caught", () => "rethrown");
      };
      if (resultPromise) {
        aborted = { reason, state: resultPromise.then(f, f) };
        return aborted.state;
      }
      aborted = { reason, state: f() };
      return aborted.state;
    },
    [Symbol.asyncIterator]() {
      if (used) {
        throw new Error("AsyncIterable cannot be re-used");
      }
      used = true;
      return it;
    }
  };
}
function createAsyncIterable(items) {
  return __asyncGenerator(this, arguments, function* createAsyncIterable_1() {
    yield __await(yield* __asyncDelegator(__asyncValues(items)));
  });
}

// node_modules/@connectrpc/connect/dist/esm/promise-client.js
var __asyncValues2 = function(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var __await2 = function(v) {
  return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
};
var __asyncDelegator2 = function(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await2(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
};
var __asyncGenerator2 = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
function createClient(service, transport) {
  return makeAnyClient(service, (method) => {
    switch (method.methodKind) {
      case "unary":
        return createUnaryFn(transport, method);
      case "server_streaming":
        return createServerStreamingFn(transport, method);
      case "client_streaming":
        return createClientStreamingFn(transport, method);
      case "bidi_streaming":
        return createBiDiStreamingFn(transport, method);
      default:
        return null;
    }
  });
}
function createUnaryFn(transport, method) {
  return async (input, options) => {
    var _a, _b;
    const response = await transport.unary(method, options === null || options === undefined ? undefined : options.signal, options === null || options === undefined ? undefined : options.timeoutMs, options === null || options === undefined ? undefined : options.headers, input, options === null || options === undefined ? undefined : options.contextValues);
    (_a = options === null || options === undefined ? undefined : options.onHeader) === null || _a === undefined || _a.call(options, response.header);
    (_b = options === null || options === undefined ? undefined : options.onTrailer) === null || _b === undefined || _b.call(options, response.trailer);
    return response.message;
  };
}
function createServerStreamingFn(transport, method) {
  return (input, options) => handleStreamResponse(transport.stream(method, options === null || options === undefined ? undefined : options.signal, options === null || options === undefined ? undefined : options.timeoutMs, options === null || options === undefined ? undefined : options.headers, createAsyncIterable([input]), options === null || options === undefined ? undefined : options.contextValues), options);
}
function createClientStreamingFn(transport, method) {
  return async (request, options) => {
    var _a, e_1, _b, _c;
    var _d, _e;
    const response = await transport.stream(method, options === null || options === undefined ? undefined : options.signal, options === null || options === undefined ? undefined : options.timeoutMs, options === null || options === undefined ? undefined : options.headers, request, options === null || options === undefined ? undefined : options.contextValues);
    (_d = options === null || options === undefined ? undefined : options.onHeader) === null || _d === undefined || _d.call(options, response.header);
    let singleMessage;
    let count = 0;
    try {
      for (var _f = true, _g = __asyncValues2(response.message), _h;_h = await _g.next(), _a = _h.done, !_a; _f = true) {
        _c = _h.value;
        _f = false;
        const message = _c;
        singleMessage = message;
        count++;
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (!_f && !_a && (_b = _g.return))
          await _b.call(_g);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    if (!singleMessage) {
      throw new ConnectError("protocol error: missing response message", Code.Unimplemented);
    }
    if (count > 1) {
      throw new ConnectError("protocol error: received extra messages for client streaming method", Code.Unimplemented);
    }
    (_e = options === null || options === undefined ? undefined : options.onTrailer) === null || _e === undefined || _e.call(options, response.trailer);
    return singleMessage;
  };
}
function createBiDiStreamingFn(transport, method) {
  return (request, options) => handleStreamResponse(transport.stream(method, options === null || options === undefined ? undefined : options.signal, options === null || options === undefined ? undefined : options.timeoutMs, options === null || options === undefined ? undefined : options.headers, request, options === null || options === undefined ? undefined : options.contextValues), options);
}
function handleStreamResponse(stream, options) {
  const it = function() {
    return __asyncGenerator2(this, arguments, function* () {
      var _a, _b;
      const response = yield __await2(stream);
      (_a = options === null || options === undefined ? undefined : options.onHeader) === null || _a === undefined || _a.call(options, response.header);
      yield __await2(yield* __asyncDelegator2(__asyncValues2(response.message)));
      (_b = options === null || options === undefined ? undefined : options.onTrailer) === null || _b === undefined || _b.call(options, response.trailer);
    });
  }()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => it.next()
    })
  };
}
// node_modules/@connectrpc/connect/dist/esm/protocol/signals.js
function createLinkedAbortController(...signals2) {
  const controller = new AbortController;
  const sa = signals2.filter((s) => s !== undefined).concat(controller.signal);
  for (const signal of sa) {
    if (signal.aborted) {
      onAbort.apply(signal);
      break;
    }
    signal.addEventListener("abort", onAbort);
  }
  function onAbort() {
    if (!controller.signal.aborted) {
      controller.abort(getAbortSignalReason(this));
    }
    for (const signal of sa) {
      signal.removeEventListener("abort", onAbort);
    }
  }
  return controller;
}
function createDeadlineSignal(timeoutMs) {
  const controller = new AbortController;
  const listener = () => {
    controller.abort(new ConnectError("the operation timed out", Code.DeadlineExceeded));
  };
  let timeoutId;
  if (timeoutMs !== undefined) {
    if (timeoutMs <= 0)
      listener();
    else
      timeoutId = setTimeout(listener, timeoutMs);
  }
  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timeoutId)
  };
}
function getAbortSignalReason(signal) {
  if (!signal.aborted) {
    return;
  }
  if (signal.reason !== undefined) {
    return signal.reason;
  }
  const e = new Error("This operation was aborted");
  e.name = "AbortError";
  return e;
}

// node_modules/@connectrpc/connect/dist/esm/context-values.js
function createContextValues() {
  return {
    get(key2) {
      return key2.id in this ? this[key2.id] : key2.defaultValue;
    },
    set(key2, value) {
      this[key2.id] = value;
      return this;
    },
    delete(key2) {
      delete this[key2.id];
      return this;
    }
  };
}

// node_modules/@connectrpc/connect/dist/esm/protocol/create-method-url.js
function createMethodUrl(baseUrl, method) {
  return baseUrl.toString().replace(/\/?$/, `/${method.parent.typeName}/${method.name}`);
}

// node_modules/@connectrpc/connect/dist/esm/protocol/normalize.js
function normalize(desc, message) {
  return create(desc, message);
}
function normalizeIterable(desc, input) {
  function transform(result) {
    if (result.done === true) {
      return result;
    }
    return {
      done: result.done,
      value: normalize(desc, result.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const it = input[Symbol.asyncIterator]();
      const res = {
        next: () => it.next().then(transform)
      };
      if (it.throw !== undefined) {
        res.throw = (e) => it.throw(e).then(transform);
      }
      if (it.return !== undefined) {
        res.return = (v) => it.return(v).then(transform);
      }
      return res;
    }
  };
}

// node_modules/@connectrpc/connect/dist/esm/interceptor.js
function applyInterceptors(next, interceptors) {
  if (!interceptors) {
    return next;
  }
  for (const i of interceptors.concat().reverse()) {
    next = i(next);
  }
  return next;
}

// node_modules/@connectrpc/connect/dist/esm/protocol/serialization.js
function getJsonOptions(options) {
  var _a;
  const o = Object.assign({}, options);
  (_a = o.ignoreUnknownFields) !== null && _a !== undefined || (o.ignoreUnknownFields = true);
  return o;
}
function createMethodSerializationLookup(method, binaryOptions, jsonOptions, limitOptions) {
  const inputBinary = limitSerialization(createBinarySerialization(method.input, binaryOptions), limitOptions);
  const inputJson = limitSerialization(createJsonSerialization(method.input, jsonOptions), limitOptions);
  const outputBinary = limitSerialization(createBinarySerialization(method.output, binaryOptions), limitOptions);
  const outputJson = limitSerialization(createJsonSerialization(method.output, jsonOptions), limitOptions);
  return {
    getI(useBinaryFormat) {
      return useBinaryFormat ? inputBinary : inputJson;
    },
    getO(useBinaryFormat) {
      return useBinaryFormat ? outputBinary : outputJson;
    }
  };
}
function limitSerialization(serialization, limitOptions) {
  return {
    serialize(data) {
      const bytes = serialization.serialize(data);
      assertWriteMaxBytes(limitOptions.writeMaxBytes, bytes.byteLength);
      return bytes;
    },
    parse(data) {
      assertReadMaxBytes(limitOptions.readMaxBytes, data.byteLength, true);
      return serialization.parse(data);
    }
  };
}
function createBinarySerialization(desc, options) {
  return {
    parse(data) {
      try {
        return fromBinary(desc, data, options);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`parse binary: ${m}`, Code.Internal);
      }
    },
    serialize(data) {
      try {
        return toBinary(desc, data, options);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`serialize binary: ${m}`, Code.Internal);
      }
    }
  };
}
function createJsonSerialization(desc, options) {
  var _a, _b;
  const textEncoder = (_a = options === null || options === undefined ? undefined : options.textEncoder) !== null && _a !== undefined ? _a : new TextEncoder;
  const textDecoder = (_b = options === null || options === undefined ? undefined : options.textDecoder) !== null && _b !== undefined ? _b : new TextDecoder;
  const o = getJsonOptions(options);
  return {
    parse(data) {
      try {
        const json = textDecoder.decode(data);
        return fromJsonString(desc, json, o);
      } catch (e) {
        throw ConnectError.from(e, Code.InvalidArgument);
      }
    },
    serialize(data) {
      try {
        const json = toJsonString(desc, data, o);
        return textEncoder.encode(json);
      } catch (e) {
        throw ConnectError.from(e, Code.Internal);
      }
    }
  };
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/content-type.js
var contentTypeRegExp = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i;
var contentTypeUnaryProto = "application/proto";
var contentTypeUnaryJson = "application/json";
var contentTypeStreamProto = "application/connect+proto";
var contentTypeStreamJson = "application/connect+json";
function parseContentType(contentType) {
  const match = contentType === null || contentType === undefined ? undefined : contentType.match(contentTypeRegExp);
  if (!match) {
    return;
  }
  const stream = !!match[1];
  const binary = !!match[3];
  return { stream, binary };
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/error-json.js
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s);i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function errorFromJson(jsonValue, metadata, fallback) {
  var _a;
  if (metadata) {
    new Headers(metadata).forEach((value, key2) => fallback.metadata.append(key2, value));
  }
  if (typeof jsonValue !== "object" || jsonValue == null || Array.isArray(jsonValue)) {
    throw fallback;
  }
  let code = fallback.code;
  if ("code" in jsonValue && typeof jsonValue.code === "string") {
    code = (_a = codeFromString(jsonValue.code)) !== null && _a !== undefined ? _a : code;
  }
  const message = jsonValue.message;
  if (message != null && typeof message !== "string") {
    throw fallback;
  }
  const error = new ConnectError(message !== null && message !== undefined ? message : "", code, metadata);
  if ("details" in jsonValue && Array.isArray(jsonValue.details)) {
    for (const detail of jsonValue.details) {
      if (detail === null || typeof detail != "object" || Array.isArray(detail) || typeof detail.type != "string" || typeof detail.value != "string") {
        throw fallback;
      }
      try {
        error.details.push({
          type: detail.type,
          value: base64Decode(detail.value),
          debug: detail.debug
        });
      } catch (e) {
        throw fallback;
      }
    }
  }
  return error;
}
function errorFromJsonBytes(bytes, metadata, fallback) {
  let jsonValue;
  try {
    jsonValue = JSON.parse(new TextDecoder().decode(bytes));
  } catch (e) {
    throw fallback;
  }
  return errorFromJson(jsonValue, metadata, fallback);
}
function errorToJson(error, jsonWriteOptions) {
  const o = {
    code: codeToString(error.code)
  };
  if (error.rawMessage.length > 0) {
    o.message = error.rawMessage;
  }
  if (error.details.length > 0) {
    o.details = error.details.map((detail) => {
      if ("desc" in detail) {
        const msg = create(detail.desc, detail.value);
        const i = {
          type: detail.desc.typeName,
          value: toBinary(detail.desc, msg)
        };
        try {
          i.debug = toJson(detail.desc, msg, jsonWriteOptions);
        } catch (e) {}
        return i;
      }
      return detail;
    }).map((_a) => {
      var { value } = _a, rest = __rest(_a, ["value"]);
      return Object.assign(Object.assign({}, rest), { value: base64Encode(value, "std_raw") });
    });
  }
  return o;
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/end-stream.js
var endStreamFlag = 2;
function endStreamFromJson(data) {
  const parseErr = new ConnectError("invalid end stream", Code.Unknown);
  let jsonValue;
  try {
    jsonValue = JSON.parse(typeof data == "string" ? data : new TextDecoder().decode(data));
  } catch (e) {
    throw parseErr;
  }
  if (typeof jsonValue != "object" || jsonValue == null || Array.isArray(jsonValue)) {
    throw parseErr;
  }
  const metadata = new Headers;
  if ("metadata" in jsonValue) {
    if (typeof jsonValue.metadata != "object" || jsonValue.metadata == null || Array.isArray(jsonValue.metadata)) {
      throw parseErr;
    }
    for (const [key2, values] of Object.entries(jsonValue.metadata)) {
      if (!Array.isArray(values) || values.some((value) => typeof value != "string")) {
        throw parseErr;
      }
      for (const value of values) {
        metadata.append(key2, value);
      }
    }
  }
  const error = "error" in jsonValue && jsonValue.error != null ? errorFromJson(jsonValue.error, metadata, parseErr) : undefined;
  return { metadata, error };
}
function endStreamToJson(metadata, error, jsonWriteOptions) {
  const es = {};
  if (error !== undefined) {
    es.error = errorToJson(error, jsonWriteOptions);
    metadata = appendHeaders(metadata, error.metadata);
  }
  let hasMetadata = false;
  const md = {};
  metadata.forEach((value, key2) => {
    hasMetadata = true;
    md[key2] = [value];
  });
  if (hasMetadata) {
    es.metadata = md;
  }
  return es;
}
function createEndStreamSerialization(options) {
  const textEncoder = new TextEncoder;
  return {
    serialize(data) {
      try {
        const jsonObject = endStreamToJson(data.metadata, data.error, options);
        const jsonString = JSON.stringify(jsonObject);
        return textEncoder.encode(jsonString);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`failed to serialize EndStreamResponse: ${m}`, Code.Internal);
      }
    },
    parse(data) {
      try {
        return endStreamFromJson(data);
      } catch (e) {
        const m = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`failed to parse EndStreamResponse: ${m}`, Code.InvalidArgument);
      }
    }
  };
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/headers.js
var headerContentType = "Content-Type";
var headerUnaryContentLength = "Content-Length";
var headerUnaryEncoding = "Content-Encoding";
var headerStreamEncoding = "Connect-Content-Encoding";
var headerUnaryAcceptEncoding = "Accept-Encoding";
var headerStreamAcceptEncoding = "Connect-Accept-Encoding";
var headerTimeout = "Connect-Timeout-Ms";
var headerProtocolVersion = "Connect-Protocol-Version";
var headerUserAgent = "User-Agent";

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/http-status.js
function codeFromHttpStatus(httpStatus) {
  switch (httpStatus) {
    case 400:
      return Code.Internal;
    case 401:
      return Code.Unauthenticated;
    case 403:
      return Code.PermissionDenied;
    case 404:
      return Code.Unimplemented;
    case 429:
      return Code.Unavailable;
    case 502:
      return Code.Unavailable;
    case 503:
      return Code.Unavailable;
    case 504:
      return Code.Unavailable;
    default:
      return Code.Unknown;
  }
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/trailer-mux.js
function trailerDemux(header) {
  const h = new Headers, t = new Headers;
  header.forEach((value, key2) => {
    if (key2.toLowerCase().startsWith("trailer-")) {
      t.append(key2.substring(8), value);
    } else {
      h.append(key2, value);
    }
  });
  return [h, t];
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/version.js
var protocolVersion = "1";

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/request-header.js
function requestHeader(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders, setUserAgent) {
  const result = new Headers(userProvidedHeaders !== null && userProvidedHeaders !== undefined ? userProvidedHeaders : {});
  if (timeoutMs !== undefined) {
    result.set(headerTimeout, `${timeoutMs}`);
  }
  result.set(headerContentType, methodKind == "unary" ? useBinaryFormat ? contentTypeUnaryProto : contentTypeUnaryJson : useBinaryFormat ? contentTypeStreamProto : contentTypeStreamJson);
  result.set(headerProtocolVersion, protocolVersion);
  if (!result.has(headerUserAgent) && setUserAgent) {
    result.set(headerUserAgent, "connect-es/2.1.0");
  }
  return result;
}
function requestHeaderWithCompression(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders, acceptCompression, sendCompression, setUserAgent) {
  const result = requestHeader(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders, setUserAgent);
  if (sendCompression != null) {
    const name = methodKind == "unary" ? headerUnaryEncoding : headerStreamEncoding;
    result.set(name, sendCompression.name);
  }
  if (acceptCompression.length > 0) {
    const name = methodKind == "unary" ? headerUnaryAcceptEncoding : headerStreamAcceptEncoding;
    result.set(name, acceptCompression.map((c) => c.name).join(","));
  }
  return result;
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/validate-response.js
function validateResponse(methodKind, useBinaryFormat, status, headers) {
  const mimeType = headers.get(headerContentType);
  const parsedType = parseContentType(mimeType);
  if (status !== 200) {
    const errorFromStatus = new ConnectError(`HTTP ${status}`, codeFromHttpStatus(status), headers);
    if (methodKind == "unary" && parsedType && !parsedType.binary) {
      return { isUnaryError: true, unaryError: errorFromStatus };
    }
    throw errorFromStatus;
  }
  const allowedContentType = {
    binary: useBinaryFormat,
    stream: methodKind !== "unary"
  };
  if ((parsedType === null || parsedType === undefined ? undefined : parsedType.binary) !== allowedContentType.binary || parsedType.stream !== allowedContentType.stream) {
    throw new ConnectError(`unsupported content type ${mimeType}`, parsedType === undefined ? Code.Unknown : Code.Internal, headers);
  }
  return { isUnaryError: false };
}
function validateResponseWithCompression(methodKind, acceptCompression, useBinaryFormat, status, headers) {
  let compression;
  const encoding = headers.get(methodKind == "unary" ? headerUnaryEncoding : headerStreamEncoding);
  if (encoding != null && encoding.toLowerCase() !== "identity") {
    compression = acceptCompression.find((c) => c.name === encoding);
    if (!compression) {
      throw new ConnectError(`unsupported response encoding "${encoding}"`, Code.Internal, headers);
    }
  }
  return Object.assign({ compression }, validateResponse(methodKind, useBinaryFormat, status, headers));
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/get-request.js
var contentTypePrefix = "application/";
function encodeMessageForUrl(message, useBase64) {
  if (useBase64) {
    return base64Encode(message, "url");
  }
  return encodeURIComponent(new TextDecoder().decode(message));
}
function transformConnectPostToGetRequest(request, message, useBase64) {
  let query = `?connect=v${protocolVersion}`;
  const contentType = request.header.get(headerContentType);
  if ((contentType === null || contentType === undefined ? undefined : contentType.indexOf(contentTypePrefix)) === 0) {
    query += "&encoding=" + encodeURIComponent(contentType.slice(contentTypePrefix.length));
  }
  const compression = request.header.get(headerUnaryEncoding);
  if (compression !== null && compression !== "identity") {
    query += "&compression=" + encodeURIComponent(compression);
    useBase64 = true;
  }
  if (useBase64) {
    query += "&base64=1";
  }
  query += "&message=" + encodeMessageForUrl(message, useBase64);
  const url = request.url + query;
  const header = new Headers(request.header);
  for (const h of [
    headerProtocolVersion,
    headerContentType,
    headerUnaryContentLength,
    headerUnaryEncoding,
    headerUnaryAcceptEncoding
  ]) {
    header.delete(h);
  }
  return Object.assign(Object.assign({}, request), {
    requestMethod: "GET",
    url,
    header
  });
}

// node_modules/@connectrpc/connect/dist/esm/protocol/run-call.js
function runUnaryCall(opt) {
  const next = applyInterceptors(opt.next, opt.interceptors);
  const [signal, abort, done] = setupSignal(opt);
  const req = Object.assign(Object.assign({}, opt.req), { message: normalize(opt.req.method.input, opt.req.message), signal });
  return next(req).then((res) => {
    done();
    return res;
  }, abort);
}
function runStreamingCall(opt) {
  const next = applyInterceptors(opt.next, opt.interceptors);
  const [signal, abort, done] = setupSignal(opt);
  const req = Object.assign(Object.assign({}, opt.req), { message: normalizeIterable(opt.req.method.input, opt.req.message), signal });
  let doneCalled = false;
  signal.addEventListener("abort", function() {
    var _a, _b;
    const it = opt.req.message[Symbol.asyncIterator]();
    if (!doneCalled) {
      (_a = it.throw) === null || _a === undefined || _a.call(it, this.reason).catch(() => {});
    }
    (_b = it.return) === null || _b === undefined || _b.call(it).catch(() => {});
  });
  return next(req).then((res) => {
    return Object.assign(Object.assign({}, res), { message: {
      [Symbol.asyncIterator]() {
        const it = res.message[Symbol.asyncIterator]();
        return {
          next() {
            return it.next().then((r) => {
              if (r.done == true) {
                doneCalled = true;
                done();
              }
              return r;
            }, abort);
          }
        };
      }
    } });
  }, abort);
}
function setupSignal(opt) {
  const { signal, cleanup } = createDeadlineSignal(opt.timeoutMs);
  const controller = createLinkedAbortController(opt.signal, signal);
  return [
    controller.signal,
    function abort(reason) {
      const e = ConnectError.from(signal.aborted ? getAbortSignalReason(signal) : reason);
      controller.abort(e);
      cleanup();
      return Promise.reject(e);
    },
    function done() {
      cleanup();
      controller.abort();
    }
  ];
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/transport.js
var __asyncValues3 = function(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
};
var __await3 = function(v) {
  return this instanceof __await3 ? (this.v = v, this) : new __await3(v);
};
var __asyncGenerator3 = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f)
        i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await3 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
};
function createTransport(opt) {
  return {
    async unary(method, signal, timeoutMs, header, message, contextValues) {
      const serialization = createMethodSerializationLookup(method, opt.binaryOptions, opt.jsonOptions, opt);
      timeoutMs = timeoutMs === undefined ? opt.defaultTimeoutMs : timeoutMs <= 0 ? undefined : timeoutMs;
      return await runUnaryCall({
        interceptors: opt.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: false,
          service: method.parent,
          method,
          requestMethod: "POST",
          url: createMethodUrl(opt.baseUrl, method),
          header: requestHeaderWithCompression(method.methodKind, opt.useBinaryFormat, timeoutMs, header, opt.acceptCompression, opt.sendCompression, true),
          contextValues: contextValues !== null && contextValues !== undefined ? contextValues : createContextValues(),
          message
        },
        next: async (req) => {
          let requestBody = serialization.getI(opt.useBinaryFormat).serialize(req.message);
          if (opt.sendCompression && requestBody.byteLength > opt.compressMinBytes) {
            requestBody = await opt.sendCompression.compress(requestBody);
            req.header.set(headerUnaryEncoding, opt.sendCompression.name);
          } else {
            req.header.delete(headerUnaryEncoding);
          }
          const useGet = opt.useHttpGet === true && method.idempotency === MethodOptions_IdempotencyLevel.NO_SIDE_EFFECTS;
          let body;
          if (useGet) {
            req = transformConnectPostToGetRequest(req, requestBody, opt.useBinaryFormat);
          } else {
            body = createAsyncIterable([requestBody]);
          }
          const universalResponse = await opt.httpClient({
            url: req.url,
            method: req.requestMethod,
            header: req.header,
            signal: req.signal,
            body
          });
          const { compression, isUnaryError, unaryError } = validateResponseWithCompression(method.methodKind, opt.acceptCompression, opt.useBinaryFormat, universalResponse.status, universalResponse.header);
          const [header2, trailer] = trailerDemux(universalResponse.header);
          let responseBody = await pipeTo(universalResponse.body, sinkAllBytes(opt.readMaxBytes, universalResponse.header.get(headerUnaryContentLength)), { propagateDownStreamError: false });
          if (compression) {
            responseBody = await compression.decompress(responseBody, opt.readMaxBytes);
          }
          if (isUnaryError) {
            throw errorFromJsonBytes(responseBody, appendHeaders(header2, trailer), unaryError);
          }
          return {
            stream: false,
            service: method.parent,
            method,
            header: header2,
            message: serialization.getO(opt.useBinaryFormat).parse(responseBody),
            trailer
          };
        }
      });
    },
    async stream(method, signal, timeoutMs, header, input, contextValues) {
      const serialization = createMethodSerializationLookup(method, opt.binaryOptions, opt.jsonOptions, opt);
      const endStreamSerialization = createEndStreamSerialization(opt.jsonOptions);
      timeoutMs = timeoutMs === undefined ? opt.defaultTimeoutMs : timeoutMs <= 0 ? undefined : timeoutMs;
      return runStreamingCall({
        interceptors: opt.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: true,
          service: method.parent,
          method,
          requestMethod: "POST",
          url: createMethodUrl(opt.baseUrl, method),
          header: requestHeaderWithCompression(method.methodKind, opt.useBinaryFormat, timeoutMs, header, opt.acceptCompression, opt.sendCompression, true),
          contextValues: contextValues !== null && contextValues !== undefined ? contextValues : createContextValues(),
          message: input
        },
        next: async (req) => {
          const uRes = await opt.httpClient({
            url: req.url,
            method: "POST",
            header: req.header,
            signal: req.signal,
            body: pipe(req.message, transformSerializeEnvelope(serialization.getI(opt.useBinaryFormat)), transformCompressEnvelope(opt.sendCompression, opt.compressMinBytes), transformJoinEnvelopes(), { propagateDownStreamError: true })
          });
          const { compression } = validateResponseWithCompression(method.methodKind, opt.acceptCompression, opt.useBinaryFormat, uRes.status, uRes.header);
          const res = Object.assign(Object.assign({}, req), { header: uRes.header, trailer: new Headers, message: pipe(uRes.body, transformSplitEnvelope(opt.readMaxBytes), transformDecompressEnvelope(compression !== null && compression !== undefined ? compression : null, opt.readMaxBytes), transformParseEnvelope(serialization.getO(opt.useBinaryFormat), endStreamFlag, endStreamSerialization), function(iterable) {
            return __asyncGenerator3(this, arguments, function* () {
              var _a, e_1, _b, _c;
              let endStreamReceived = false;
              try {
                for (var _d = true, iterable_1 = __asyncValues3(iterable), iterable_1_1;iterable_1_1 = yield __await3(iterable_1.next()), _a = iterable_1_1.done, !_a; _d = true) {
                  _c = iterable_1_1.value;
                  _d = false;
                  const chunk = _c;
                  if (chunk.end) {
                    if (endStreamReceived) {
                      throw new ConnectError("protocol error: received extra EndStreamResponse", Code.InvalidArgument);
                    }
                    endStreamReceived = true;
                    if (chunk.value.error) {
                      const error = chunk.value.error;
                      uRes.header.forEach((value, key2) => {
                        error.metadata.append(key2, value);
                      });
                      throw error;
                    }
                    chunk.value.metadata.forEach((value, key2) => res.trailer.set(key2, value));
                    continue;
                  }
                  if (endStreamReceived) {
                    throw new ConnectError("protocol error: received extra message after EndStreamResponse", Code.InvalidArgument);
                  }
                  yield yield __await3(chunk.value);
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (!_d && !_a && (_b = iterable_1.return))
                    yield __await3(_b.call(iterable_1));
                } finally {
                  if (e_1)
                    throw e_1.error;
                }
              }
              if (!endStreamReceived) {
                throw new ConnectError("protocol error: missing EndStreamResponse", Code.InvalidArgument);
              }
            });
          }, { propagateDownStreamError: true }) });
          return res;
        }
      });
    }
  };
}
// node_modules/@connectrpc/connect-node/dist/esm/compression.js
import * as zlib from "node:zlib";
import { promisify } from "node:util";

// node_modules/@connectrpc/connect-node/dist/esm/node-error.js
function connectErrorFromNodeReason(reason) {
  let code = Code.Internal;
  const chain = unwrapNodeErrorChain(reason).map(getNodeErrorProps);
  if (chain.some((p) => p.code == "ERR_STREAM_WRITE_AFTER_END")) {
    code = Code.Aborted;
  } else if (chain.some((p) => p.code == "ERR_STREAM_DESTROYED" || p.code == "ERR_HTTP2_INVALID_STREAM" || p.code == "ECONNRESET")) {
    code = Code.Aborted;
  } else if (chain.some((p) => p.code == "ETIMEDOUT" || p.code == "ENOTFOUND" || p.code == "EAI_AGAIN" || p.code == "ECONNREFUSED")) {
    code = Code.Unavailable;
  }
  const ce = ConnectError.from(reason, code);
  if (ce !== reason) {
    ce.cause = reason;
  }
  return ce;
}
function unwrapNodeErrorChain(reason) {
  const chain = [];
  for (;; ) {
    if (!(reason instanceof Error)) {
      break;
    }
    if (chain.includes(reason)) {
      break;
    }
    chain.push(reason);
    if (!("cause" in reason)) {
      break;
    }
    reason = reason.cause;
  }
  return chain;
}
function getNodeErrorProps(reason) {
  const props = {};
  if (reason instanceof Error) {
    if ("code" in reason && typeof reason.code == "string") {
      props.code = reason.code;
    }
    if ("syscall" in reason && typeof reason.syscall == "string") {
      props.syscall = reason.syscall;
    }
  }
  return props;
}
function connectErrorFromH2ResetCode(rstCode) {
  switch (rstCode) {
    case H2Code.PROTOCOL_ERROR:
    case H2Code.INTERNAL_ERROR:
    case H2Code.FLOW_CONTROL_ERROR:
    case H2Code.SETTINGS_TIMEOUT:
    case H2Code.FRAME_SIZE_ERROR:
    case H2Code.COMPRESSION_ERROR:
    case H2Code.CONNECT_ERROR:
      return new ConnectError(`http/2 stream closed with error code ${H2Code[rstCode]} (0x${rstCode.toString(16)})`, Code.Internal);
    case H2Code.REFUSED_STREAM:
      return new ConnectError(`http/2 stream closed with error code ${H2Code[rstCode]} (0x${rstCode.toString(16)})`, Code.Unavailable);
    case H2Code.CANCEL:
      return new ConnectError(`http/2 stream closed with error code ${H2Code[rstCode]} (0x${rstCode.toString(16)})`, Code.Canceled);
    case H2Code.ENHANCE_YOUR_CALM:
      return new ConnectError(`http/2 stream closed with error code ${H2Code[rstCode]} (0x${rstCode.toString(16)})`, Code.ResourceExhausted);
    case H2Code.INADEQUATE_SECURITY:
      return new ConnectError(`http/2 stream closed with error code ${H2Code[rstCode]} (0x${rstCode.toString(16)})`, Code.PermissionDenied);
    case H2Code.HTTP_1_1_REQUIRED:
      return new ConnectError(`http/2 stream closed with error code ${H2Code[rstCode]} (0x${rstCode.toString(16)})`, Code.PermissionDenied);
    default:
      break;
  }
  return;
}
var H2Code;
(function(H2Code2) {
  H2Code2[H2Code2["PROTOCOL_ERROR"] = 1] = "PROTOCOL_ERROR";
  H2Code2[H2Code2["INTERNAL_ERROR"] = 2] = "INTERNAL_ERROR";
  H2Code2[H2Code2["FLOW_CONTROL_ERROR"] = 3] = "FLOW_CONTROL_ERROR";
  H2Code2[H2Code2["SETTINGS_TIMEOUT"] = 4] = "SETTINGS_TIMEOUT";
  H2Code2[H2Code2["STREAM_CLOSED"] = 5] = "STREAM_CLOSED";
  H2Code2[H2Code2["FRAME_SIZE_ERROR"] = 6] = "FRAME_SIZE_ERROR";
  H2Code2[H2Code2["REFUSED_STREAM"] = 7] = "REFUSED_STREAM";
  H2Code2[H2Code2["CANCEL"] = 8] = "CANCEL";
  H2Code2[H2Code2["COMPRESSION_ERROR"] = 9] = "COMPRESSION_ERROR";
  H2Code2[H2Code2["CONNECT_ERROR"] = 10] = "CONNECT_ERROR";
  H2Code2[H2Code2["ENHANCE_YOUR_CALM"] = 11] = "ENHANCE_YOUR_CALM";
  H2Code2[H2Code2["INADEQUATE_SECURITY"] = 12] = "INADEQUATE_SECURITY";
  H2Code2[H2Code2["HTTP_1_1_REQUIRED"] = 13] = "HTTP_1_1_REQUIRED";
})(H2Code || (H2Code = {}));

// node_modules/@connectrpc/connect-node/dist/esm/compression.js
var gzip2 = promisify(zlib.gzip);
var gunzip2 = promisify(zlib.gunzip);
var brotliCompress2 = promisify(zlib.brotliCompress);
var brotliDecompress2 = promisify(zlib.brotliDecompress);
var compressionGzip = {
  name: "gzip",
  compress(bytes) {
    return asUint8ArrayArrayBuffer(gzip2(bytes, {}));
  },
  decompress(bytes, readMaxBytes) {
    if (bytes.length == 0) {
      return Promise.resolve(new Uint8Array(0));
    }
    return asUint8ArrayArrayBuffer(wrapZLibErrors(gunzip2(bytes, {
      maxOutputLength: readMaxBytes
    }), readMaxBytes));
  }
};
var compressionBrotli = {
  name: "br",
  compress(bytes) {
    return asUint8ArrayArrayBuffer(brotliCompress2(bytes, {}));
  },
  decompress(bytes, readMaxBytes) {
    if (bytes.length == 0) {
      return Promise.resolve(new Uint8Array(0));
    }
    return asUint8ArrayArrayBuffer(wrapZLibErrors(brotliDecompress2(bytes, {
      maxOutputLength: readMaxBytes
    }), readMaxBytes));
  }
};
function asUint8ArrayArrayBuffer(bytes) {
  return bytes.then((b) => {
    if (b.buffer instanceof ArrayBuffer) {
      return b;
    }
    return new Uint8Array(b);
  });
}
function wrapZLibErrors(promise, readMaxBytes) {
  return promise.catch((e) => {
    var _a;
    const props = getNodeErrorProps(e);
    let code = Code.Internal;
    let message = "decompression failed";
    switch (props.code) {
      case "ERR_BUFFER_TOO_LARGE":
        code = Code.ResourceExhausted;
        message = `message is larger than configured readMaxBytes ${readMaxBytes} after decompression`;
        break;
      case "Z_DATA_ERROR":
      case "ERR_PADDING_2":
        code = Code.InvalidArgument;
        break;
      default:
        if ((_a = props.code) === null || _a === undefined ? undefined : _a.startsWith("ERR__ERROR_FORMAT_")) {
          code = Code.InvalidArgument;
        }
        break;
    }
    return Promise.reject(new ConnectError(message, code, undefined, undefined, e));
  });
}

// node_modules/@connectrpc/connect-node/dist/esm/node-universal-client.js
import * as http from "node:http";
import * as https from "node:https";

// node_modules/@connectrpc/connect-node/dist/esm/node-universal-header.js
function nodeHeaderToWebHeader(nodeHeaders) {
  const header = new Headers;
  for (const [k, v] of Object.entries(nodeHeaders)) {
    if (k.startsWith(":")) {
      continue;
    }
    if (v === undefined) {
      continue;
    }
    if (typeof v == "string") {
      header.append(k, v);
    } else if (typeof v == "number") {
      header.append(k, String(v));
    } else {
      for (const e of v) {
        header.append(k, e);
      }
    }
  }
  return header;
}
function webHeaderToNodeHeaders(headersInit, defaultNodeHeaders) {
  if (headersInit === undefined && defaultNodeHeaders === undefined) {
    return;
  }
  const o = Object.create(null);
  if (defaultNodeHeaders !== undefined) {
    if (Array.isArray(defaultNodeHeaders)) {
      for (let i = 0;i + 1 < defaultNodeHeaders.length; i += 2) {
        const key2 = defaultNodeHeaders[i];
        const value = defaultNodeHeaders[i + 1];
        if (Array.isArray(o[key2])) {
          o[key2].push(value);
        } else if (typeof o[key2] == "string") {
          o[key2] = [o[key2], value];
        } else {
          o[key2] = value;
        }
      }
    } else {
      for (const [key2, value] of Object.entries(defaultNodeHeaders)) {
        if (Array.isArray(value)) {
          o[key2] = value.concat();
        } else if (value !== undefined) {
          o[key2] = value;
        }
      }
    }
  }
  if (headersInit !== undefined) {
    if (Array.isArray(headersInit)) {
      for (const [key2, value] of headersInit) {
        appendWebHeader(o, key2, value);
      }
    } else if ("forEach" in headersInit) {
      if (typeof headersInit.forEach == "function") {
        headersInit.forEach((value, key2) => {
          appendWebHeader(o, key2, value);
        });
      }
    } else {
      for (const [key2, value] of Object.entries(headersInit)) {
        appendWebHeader(o, key2, value);
      }
    }
  }
  return o;
}
function appendWebHeader(o, key2, value) {
  key2 = key2.toLowerCase();
  const existing = o[key2];
  if (Array.isArray(existing)) {
    existing.push(value);
  } else if (existing === undefined) {
    o[key2] = value;
  } else {
    o[key2] = [existing.toString(), value];
  }
}

// node_modules/@connectrpc/connect-node/dist/esm/http2-session-manager.js
import * as http2 from "node:http2";
class Http2SessionManager {
  state() {
    if (this.s.t == "ready") {
      if (this.verifying !== undefined) {
        return "verifying";
      }
      return this.s.streamCount() > 0 ? "open" : "idle";
    }
    return this.s.t;
  }
  error() {
    if (this.s.t == "error") {
      return this.s.reason;
    }
    return;
  }
  constructor(url, pingOptions, http2SessionOptions) {
    var _a, _b, _c, _d;
    this.s = closed();
    this.shuttingDown = [];
    this.authority = new URL(url).origin;
    this.http2SessionOptions = http2SessionOptions;
    this.options = {
      pingIntervalMs: (_a = pingOptions === null || pingOptions === undefined ? undefined : pingOptions.pingIntervalMs) !== null && _a !== undefined ? _a : Number.POSITIVE_INFINITY,
      pingTimeoutMs: (_b = pingOptions === null || pingOptions === undefined ? undefined : pingOptions.pingTimeoutMs) !== null && _b !== undefined ? _b : 1000 * 15,
      pingIdleConnection: (_c = pingOptions === null || pingOptions === undefined ? undefined : pingOptions.pingIdleConnection) !== null && _c !== undefined ? _c : false,
      idleConnectionTimeoutMs: (_d = pingOptions === null || pingOptions === undefined ? undefined : pingOptions.idleConnectionTimeoutMs) !== null && _d !== undefined ? _d : 1000 * 60 * 15
    };
  }
  async connect() {
    try {
      const ready = await this.gotoReady();
      return ready.streamCount() > 0 ? "open" : "idle";
    } catch (e) {
      return "error";
    }
  }
  async request(method, path, headers, options) {
    for (;; ) {
      const ready = await this.gotoReady();
      try {
        const stream = ready.conn.request(Object.assign(Object.assign({}, headers), { ":method": method, ":path": path }), options);
        ready.registerRequest(stream);
        return stream;
      } catch (e) {
        if (ready.conn.closed || ready.conn.destroyed) {
          continue;
        }
        throw e;
      }
    }
  }
  notifyResponseByteRead(stream) {
    if (this.s.t == "ready") {
      this.s.responseByteRead(stream);
    }
    for (const s of this.shuttingDown) {
      s.responseByteRead(stream);
    }
  }
  abort(reason) {
    var _a, _b, _c;
    const err = reason !== null && reason !== undefined ? reason : new ConnectError("connection aborted", Code.Canceled);
    (_b = (_a = this.s).abort) === null || _b === undefined || _b.call(_a, err);
    for (const s of this.shuttingDown) {
      (_c = s.abort) === null || _c === undefined || _c.call(s, err);
    }
    this.setState(closedOrError(err));
  }
  async gotoReady() {
    if (this.s.t == "ready") {
      if (this.s.isShuttingDown() || this.s.conn.closed || this.s.conn.destroyed) {
        this.setState(connect2(this.authority, this.http2SessionOptions));
      } else if (this.s.requiresVerify()) {
        await this.verify(this.s);
      }
    } else if (this.s.t == "closed" || this.s.t == "error") {
      this.setState(connect2(this.authority, this.http2SessionOptions));
    }
    while (this.s.t !== "ready") {
      if (this.s.t === "error") {
        throw this.s.reason;
      }
      if (this.s.t === "connecting") {
        await this.s.conn;
      }
    }
    return this.s;
  }
  setState(state) {
    var _a, _b;
    (_b = (_a = this.s).onExitState) === null || _b === undefined || _b.call(_a);
    if (this.s.t == "ready" && this.s.isShuttingDown()) {
      const sd = this.s;
      this.shuttingDown.push(sd);
      sd.onClose = sd.onError = () => {
        const i = this.shuttingDown.indexOf(sd);
        if (i !== -1) {
          this.shuttingDown.splice(i, 1);
        }
      };
    }
    switch (state.t) {
      case "connecting":
        state.conn.then((value) => {
          this.setState(ready(value, this.options));
        }, (reason) => {
          this.setState(closedOrError(reason));
        });
        break;
      case "ready":
        state.onClose = () => this.setState(closed());
        state.onError = (err) => this.setState(closedOrError(err));
        break;
      case "closed":
        break;
      case "error":
        break;
    }
    this.s = state;
  }
  verify(stateReady) {
    if (this.verifying !== undefined) {
      return this.verifying;
    }
    this.verifying = stateReady.verify().then((success) => {
      if (success) {
        return;
      }
      this.setState(connect2(this.authority, this.http2SessionOptions));
    }, (reason) => {
      this.setState(closedOrError(reason));
    }).finally(() => {
      this.verifying = undefined;
    });
    return this.verifying;
  }
}
function closed() {
  return {
    t: "closed"
  };
}
function error(reason) {
  return {
    t: "error",
    reason
  };
}
function closedOrError(reason) {
  const isCancel = reason instanceof ConnectError && ConnectError.from(reason).code == Code.Canceled;
  return isCancel ? closed() : error(reason);
}
function connect2(authority, http2SessionOptions) {
  let resolve;
  let reject;
  const conn = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const newConn = http2.connect(authority, http2SessionOptions);
  newConn.on("connect", onConnect);
  newConn.on("error", onError);
  function onConnect() {
    resolve === null || resolve === undefined || resolve(newConn);
    cleanup();
  }
  function onError(err) {
    reject === null || reject === undefined || reject(connectErrorFromNodeReason(err));
    cleanup();
  }
  function cleanup() {
    newConn.off("connect", onConnect);
    newConn.off("error", onError);
  }
  return {
    t: "connecting",
    conn,
    abort(reason) {
      if (!newConn.destroyed) {
        newConn.destroy(undefined, http2.constants.NGHTTP2_CANCEL);
      }
      reject === null || reject === undefined || reject(reason);
    },
    onExitState() {
      cleanup();
    }
  };
}
function ready(conn, options) {
  assertSessionOpen(conn);
  conn.unref();
  let lastAliveAt = Date.now();
  let streamCount = 0;
  let pingIntervalId;
  let pingTimeoutId;
  let receivedGoAway = false;
  let receivedGoAwayEnhanceYourCalmTooManyPings = false;
  let idleTimeoutId;
  resetIdleTimeout();
  const state = {
    t: "ready",
    conn,
    streamCount() {
      return streamCount;
    },
    requiresVerify() {
      const elapsedMs = Date.now() - lastAliveAt;
      return elapsedMs > options.pingIntervalMs;
    },
    isShuttingDown() {
      return receivedGoAway;
    },
    onClose: undefined,
    onError: undefined,
    registerRequest(stream) {
      streamCount++;
      if (streamCount == 1) {
        conn.ref();
        resetPingInterval();
        stopIdleTimeout();
      }
      stream.once("response", () => {
        lastAliveAt = Date.now();
        resetPingInterval();
      });
      stream.once("close", () => {
        streamCount--;
        if (streamCount == 0) {
          conn.unref();
          resetPingInterval();
          resetIdleTimeout();
        }
      });
    },
    responseByteRead(stream) {
      if (stream.session !== conn) {
        return;
      }
      if (conn.closed || conn.destroyed) {
        return;
      }
      if (streamCount <= 0) {
        return;
      }
      lastAliveAt = Date.now();
      resetPingInterval();
    },
    verify() {
      conn.ref();
      return new Promise((resolve) => {
        commonPing(() => {
          if (streamCount == 0)
            conn.unref();
          resolve(true);
        });
        conn.once("error", () => resolve(false));
      });
    },
    abort(reason) {
      if (!conn.destroyed) {
        conn.once("error", () => {});
        conn.destroy(reason, http2.constants.NGHTTP2_CANCEL);
      }
    },
    onExitState() {
      if (state.isShuttingDown()) {
        return;
      }
      cleanup();
      this.onError = undefined;
      this.onClose = undefined;
    }
  };
  function resetPingInterval() {
    stopPingInterval();
    if (streamCount > 0 || options.pingIdleConnection) {
      pingIntervalId = safeSetTimeout(onPingInterval, options.pingIntervalMs);
    }
  }
  function stopPingInterval() {
    clearTimeout(pingIntervalId);
    clearTimeout(pingTimeoutId);
  }
  function onPingInterval() {
    commonPing(resetPingInterval);
  }
  function commonPing(onSuccess) {
    clearTimeout(pingTimeoutId);
    pingTimeoutId = safeSetTimeout(() => {
      conn.destroy(new ConnectError("PING timed out", Code.Unavailable), http2.constants.NGHTTP2_CANCEL);
    }, options.pingTimeoutMs);
    conn.ping((err, duration) => {
      clearTimeout(pingTimeoutId);
      if (err !== null) {
        return;
      }
      if (duration > options.pingTimeoutMs) {
        conn.destroy(new ConnectError("PING timed out", Code.Unavailable), http2.constants.NGHTTP2_CANCEL);
        return;
      }
      lastAliveAt = Date.now();
      onSuccess();
    });
  }
  function stopIdleTimeout() {
    clearTimeout(idleTimeoutId);
  }
  function resetIdleTimeout() {
    idleTimeoutId = safeSetTimeout(onIdleTimeout, options.idleConnectionTimeoutMs);
  }
  function onIdleTimeout() {
    conn.close();
    onClose();
  }
  function onGoaway(errorCode, lastStreamID, opaqueData) {
    receivedGoAway = true;
    const tooManyPingsAscii = Buffer.from("too_many_pings", "ascii");
    if (errorCode === http2.constants.NGHTTP2_ENHANCE_YOUR_CALM && opaqueData != null && opaqueData.equals(tooManyPingsAscii)) {
      options.pingIntervalMs = options.pingIntervalMs * 2;
      receivedGoAwayEnhanceYourCalmTooManyPings = true;
    }
    if (errorCode === http2.constants.NGHTTP2_NO_ERROR && streamCount == 0) {
      conn.destroy(new ConnectError("received GOAWAY without any open streams", Code.Canceled), http2.constants.NGHTTP2_NO_ERROR);
    }
  }
  function onClose() {
    var _a;
    cleanup();
    (_a = state.onClose) === null || _a === undefined || _a.call(state);
  }
  function onError(err) {
    var _a, _b;
    cleanup();
    if (receivedGoAwayEnhanceYourCalmTooManyPings) {
      const ce = new ConnectError(`http/2 connection closed with error code ENHANCE_YOUR_CALM (0x${http2.constants.NGHTTP2_ENHANCE_YOUR_CALM.toString(16)}), too_many_pings, doubled the interval`, Code.ResourceExhausted);
      (_a = state.onError) === null || _a === undefined || _a.call(state, ce);
    } else {
      (_b = state.onError) === null || _b === undefined || _b.call(state, connectErrorFromNodeReason(err));
    }
  }
  function cleanup() {
    stopPingInterval();
    stopIdleTimeout();
    conn.off("error", onError);
    conn.off("close", onClose);
    conn.off("goaway", onGoaway);
  }
  conn.on("error", onError);
  conn.on("close", onClose);
  conn.on("goaway", onGoaway);
  return state;
}
function safeSetTimeout(callback, ms) {
  if (ms > 2147483647) {
    return;
  }
  return setTimeout(callback, ms).unref();
}
function assertSessionOpen(conn) {
  if (conn.connecting) {
    throw new ConnectError("expected open session, but it is connecting", Code.Internal);
  }
  if (conn.destroyed) {
    throw new ConnectError("expected open session, but it is destroyed", Code.Internal);
  }
  if (conn.closed) {
    throw new ConnectError("expected open session, but it is closed", Code.Internal);
  }
}

// node_modules/@connectrpc/connect-node/dist/esm/node-universal-client.js
function createNodeHttpClient(options) {
  var _a;
  if (options.httpVersion == "1.1") {
    return createNodeHttp1Client(options.nodeOptions);
  }
  const sessionProvider = (_a = options.sessionProvider) !== null && _a !== undefined ? _a : (url) => new Http2SessionManager(url);
  return createNodeHttp2Client(sessionProvider);
}
function createNodeHttp1Client(httpOptions) {
  return async function request(req) {
    const sentinel = createSentinel(req.signal);
    return new Promise((resolve, reject) => {
      sentinel.onError((e) => {
        reject(e);
      });
      h1Request(sentinel, req.url, Object.assign(Object.assign({}, httpOptions), { headers: webHeaderToNodeHeaders(req.header, httpOptions === null || httpOptions === undefined ? undefined : httpOptions.headers), method: req.method }), (request3) => {
        sinkRequest(req, request3, sentinel);
        request3.on("response", (response) => {
          var _a;
          response.on("error", sentinel.error);
          sentinel.onError((reason) => response.destroy(reason));
          const trailer = new Headers;
          resolve({
            status: (_a = response.statusCode) !== null && _a !== undefined ? _a : 0,
            header: nodeHeaderToWebHeader(response.headers),
            body: h1ResponseIterable(sentinel, response, trailer),
            trailer
          });
        });
      });
    });
  };
}
function createNodeHttp2Client(sessionProvider) {
  return function request(req) {
    const sentinel = createSentinel(req.signal);
    const sessionManager = sessionProvider(req.url);
    return new Promise((resolve, reject) => {
      sentinel.onError((e) => {
        reject(e);
      });
      h2Request(sentinel, sessionManager, req.url, req.method, webHeaderToNodeHeaders(req.header), {}, (stream) => {
        sinkRequest(req, stream, sentinel);
        stream.on("response", (headers) => {
          var _a;
          const response = {
            status: (_a = headers[":status"]) !== null && _a !== undefined ? _a : 0,
            header: nodeHeaderToWebHeader(headers),
            body: h2ResponseIterable(sentinel, stream, sessionManager),
            trailer: h2ResponseTrailer(stream)
          };
          resolve(response);
        });
      });
    });
  };
}
function h1Request(sentinel, url, options, onRequest) {
  let request3;
  if (new URL(url).protocol.startsWith("https")) {
    request3 = https.request(url, options);
  } else {
    request3 = http.request(url, options);
  }
  sentinel.onError((reason) => request3.destroy(reason));
  request3.flushHeaders();
  request3.on("error", sentinel.error);
  request3.on("socket", function onRequestSocket(socket) {
    function onSocketConnect() {
      socket.off("connect", onSocketConnect);
      onRequest(request3);
    }
    if (socket.readyState === "open") {
      onRequest(request3);
    } else {
      socket.on("connect", onSocketConnect);
    }
  });
}
function h1ResponseIterable(sentinel, response, trailer) {
  const inner = response[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          const r = await sentinel.race(inner.next());
          if (r.done === true) {
            nodeHeaderToWebHeader(response.trailers).forEach((value, key2) => {
              trailer.set(key2, value);
            });
            sentinel.close();
          }
          return r;
        },
        throw(e) {
          sentinel.error(e);
          throw e;
        }
      };
    }
  };
}
function h2Request(sentinel, sm, url, method, headers, options, onStream) {
  const requestUrl = new URL(url);
  if (requestUrl.origin !== sm.authority) {
    const message = `cannot make a request to ${requestUrl.origin}: the http2 session is connected to ${sm.authority}`;
    sentinel.error(new ConnectError(message, Code.Internal));
    return;
  }
  sm.request(method, requestUrl.pathname + requestUrl.search, headers, {}).then((stream) => {
    sentinel.onError((reason) => {
      if (stream.closed) {
        return;
      }
      const rstCode = reason.code == Code.Canceled ? H2Code.CANCEL : H2Code.INTERNAL_ERROR;
      return new Promise((resolve) => stream.close(rstCode, resolve));
    });
    stream.on("error", function h2StreamError(e) {
      if (stream.writableEnded && unwrapNodeErrorChain(e).map(getNodeErrorProps).some((p) => p.code == "ERR_STREAM_WRITE_AFTER_END")) {
        return;
      }
      sentinel.error(e);
    });
    stream.on("close", function h2StreamClose() {
      const err = connectErrorFromH2ResetCode(stream.rstCode);
      if (err) {
        sentinel.error(err);
      }
    });
    onStream(stream);
  }, (reason) => {
    sentinel.error(reason);
  });
}
function h2ResponseTrailer(response) {
  const trailer = new Headers;
  response.on("trailers", (args) => {
    nodeHeaderToWebHeader(args).forEach((value, key2) => {
      trailer.set(key2, value);
    });
  });
  return trailer;
}
function h2ResponseIterable(sentinel, response, sm) {
  const inner = response[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          const r = await sentinel.race(inner.next());
          if (r.done === true) {
            sentinel.close();
          }
          sm === null || sm === undefined || sm.notifyResponseByteRead(response);
          return r;
        },
        throw(e) {
          sentinel.error(e);
          throw e;
        }
      };
    }
  };
}
async function sinkRequest(request3, nodeRequest, sentinel) {
  if (request3.body === undefined) {
    await new Promise((resolve) => nodeRequest.end(resolve));
    return;
  }
  const it = request3.body[Symbol.asyncIterator]();
  return new Promise((resolve) => {
    writeNext();
    function writeNext() {
      if (sentinel.isClosed()) {
        return;
      }
      it.next().then((r) => {
        if (r.done === true) {
          nodeRequest.end(resolve);
          return;
        }
        nodeRequest.write(r.value, "binary", (e) => {
          if (e === null || e === undefined) {
            writeNext();
            return;
          }
          if (it.throw !== undefined) {
            it.throw(connectErrorFromNodeReason(e)).catch(() => {});
          }
          if (nodeRequest.writableEnded && unwrapNodeErrorChain(e).map(getNodeErrorProps).some((p) => p.code == "ERR_STREAM_WRITE_AFTER_END")) {
            return;
          }
          sentinel.error(e);
        });
      }, (e) => {
        sentinel.error(e);
      });
    }
  });
}
function createSentinel(signal) {
  let rejectRace;
  let closed2 = false;
  let closedError = undefined;
  let onErrorListeners = [];
  const sentinel = {
    error(error2) {
      if (closed2) {
        return;
      }
      closed2 = true;
      closedError = error2 instanceof ConnectError ? error2 : connectErrorFromNodeReason(error2);
      rejectRace === null || rejectRace === undefined || rejectRace(closedError);
      for (const onRejected of onErrorListeners) {
        onRejected(closedError);
      }
      cleanup();
    },
    close() {
      if (closed2) {
        return;
      }
      closed2 = true;
      if (rejectRace) {
        rejectRace(new ConnectError("sentinel completed early", Code.Internal));
      }
      cleanup();
    },
    isClosed() {
      return closed2;
    },
    onError(onError) {
      if (closed2) {
        if (closedError !== undefined) {
          onError(closedError);
        }
      } else {
        onErrorListeners.push(onError);
      }
    },
    race(promise) {
      let resolveRace;
      const race = new Promise((resolve, reject) => {
        resolveRace = resolve;
        rejectRace = reject;
      });
      promise.then((value) => {
        resolveRace === null || resolveRace === undefined || resolveRace(value);
      }, (reason) => {
        rejectRace === null || rejectRace === undefined || rejectRace(reason);
      });
      if (closed2) {
        rejectRace === null || rejectRace === undefined || rejectRace(closedError !== null && closedError !== undefined ? closedError : new ConnectError("sentinel completed early", Code.Internal));
      }
      return race;
    }
  };
  function cleanup() {
    if (signal) {
      signal.removeEventListener("abort", onSignalAbort);
    }
    onErrorListeners = [];
    rejectRace = undefined;
  }
  function onSignalAbort() {
    sentinel.error(getAbortSignalReason(this));
  }
  if (signal) {
    signal.addEventListener("abort", onSignalAbort);
    if (signal.aborted) {
      sentinel.error(getAbortSignalReason(signal));
    }
  }
  return sentinel;
}

// node_modules/@connectrpc/connect-node/dist/esm/node-transport-options.js
function validateNodeTransportOptions(options) {
  var _a, _b, _c, _d;
  let httpClient;
  if (options.httpVersion == "2") {
    let sessionManager;
    if (options.sessionManager) {
      sessionManager = options.sessionManager;
    } else {
      sessionManager = new Http2SessionManager(options.baseUrl, {
        pingIntervalMs: options.pingIntervalMs,
        pingIdleConnection: options.pingIdleConnection,
        pingTimeoutMs: options.pingTimeoutMs,
        idleConnectionTimeoutMs: options.idleConnectionTimeoutMs
      }, options.nodeOptions);
    }
    httpClient = createNodeHttpClient({
      httpVersion: "2",
      sessionProvider: () => sessionManager
    });
  } else {
    httpClient = createNodeHttpClient({
      httpVersion: "1.1",
      nodeOptions: options.nodeOptions
    });
  }
  return Object.assign(Object.assign(Object.assign({}, options), { httpClient, useBinaryFormat: (_a = options.useBinaryFormat) !== null && _a !== undefined ? _a : true, interceptors: (_b = options.interceptors) !== null && _b !== undefined ? _b : [], sendCompression: (_c = options.sendCompression) !== null && _c !== undefined ? _c : null, acceptCompression: (_d = options.acceptCompression) !== null && _d !== undefined ? _d : [
    compressionGzip,
    compressionBrotli
  ] }), validateReadWriteMaxBytes(options.readMaxBytes, options.writeMaxBytes, options.compressMinBytes));
}
// node_modules/@connectrpc/connect-node/dist/esm/connect-transport.js
function createConnectTransport(options) {
  return createTransport(validateNodeTransportOptions(options));
}
// src/interceptors.ts
function createBearerTokenInterceptor(token) {
  return (next) => async (req) => {
    req.header.set("Authorization", `Bearer ${token}`);
    return await next(req);
  };
}
function createRetryInterceptor(options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 1e4,
    retryableStatusCodes = [
      Code.Unavailable,
      Code.DeadlineExceeded,
      Code.ResourceExhausted,
      Code.Internal
    ]
  } = options;
  return (next) => async (req) => {
    let lastError = new Error("Unexpected retry error");
    for (let attempt = 0;attempt <= maxRetries; attempt++) {
      try {
        return await next(req);
      } catch (error2) {
        lastError = error2 instanceof Error ? error2 : new Error(String(error2));
        if (attempt === maxRetries || !isRetryableError(error2, retryableStatusCodes)) {
          throw error2;
        }
        const delay = Math.min(baseDelay * 2 ** attempt + Math.random() * 1000, maxDelay);
        console.log(`⚠️ Request failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${Math.round(delay)}ms...`);
        await sleep(delay);
      }
    }
    throw lastError;
  };
}
function isRetryableError(error2, retryableStatusCodes) {
  if (error2 instanceof ConnectError) {
    return retryableStatusCodes.includes(error2.code);
  }
  if (error2 instanceof Error && error2.message) {
    const message = error2.message.toLowerCase();
    return message.includes("network") || message.includes("timeout") || message.includes("connection") || message.includes("econnreset") || message.includes("enotfound");
  }
  return false;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// src/utils/pagination.ts
async function paginateAll(baseRequest, apiFunction, resultExtractor, initialAccumulator, resultAccumulator, options = {}) {
  const {
    pageSize = 100,
    maxPages = 1e4,
    logRequests = true,
    logResults = true,
    requestName = "API"
  } = options;
  const fetchPage = async (accumulated, pageToken, pageCount, totalResults) => {
    if (pageCount > maxPages) {
      throw new Error(`Maximum pages limit (${maxPages}) exceeded for ${requestName}`);
    }
    const request3 = {
      ...baseRequest,
      pageSize,
      pageToken
    };
    if (logRequests) {
      console.log(`\uD83D\uDCE4 ${requestName} request (page ${pageCount}):`, JSON.stringify(request3, null, 2));
    }
    const response = await apiFunction(request3);
    const pageResults = resultExtractor(response);
    const newAccumulated = resultAccumulator(accumulated, pageResults);
    const newTotalResults = totalResults + pageResults.length;
    if (logRequests && pageResults.length > 0) {
      console.log(`   \uD83D\uDCC4 Page ${pageCount}: ${pageResults.length} results`);
    }
    const nextPageToken = response.nextPageToken || "";
    if (!nextPageToken) {
      if (logResults) {
        console.log(`\uD83D\uDCCA Total ${requestName.toLowerCase()} fetched: ${newTotalResults} (${pageCount} pages)`);
      }
      return newAccumulated;
    }
    return fetchPage(newAccumulated, nextPageToken, pageCount + 1, newTotalResults);
  };
  return fetchPage(initialAccumulator, "", 1, 0);
}
async function paginateToArray(baseRequest, apiFunction, resultExtractor, options) {
  return paginateAll(baseRequest, apiFunction, resultExtractor, [], (accumulated, results) => [...accumulated, ...results], options);
}
async function paginateToMap(baseRequest, apiFunction, resultExtractor, keyValueExtractor, options) {
  return paginateAll(baseRequest, apiFunction, resultExtractor, new Map, (accumulated, results) => {
    for (const result of results) {
      const [key2, value] = keyValueExtractor(result);
      accumulated.set(key2, value);
    }
    return accumulated;
  }, options);
}

// src/clients/cloud-client.ts
function formatConnectError(error2) {
  if (error2 instanceof ConnectError) {
    const formattedError = {
      code: error2.code,
      message: error2.message || error2.rawMessage
    };
    try {
      const badRequestDetails = error2.findDetails(BadRequestSchema);
      if (badRequestDetails.length > 0) {
        const validationErrors = [];
        for (const badRequest of badRequestDetails) {
          if (badRequest.fieldViolations) {
            validationErrors.push(...badRequest.fieldViolations.map((violation) => `${violation.field}: ${violation.description}`));
          }
        }
        if (validationErrors.length > 0) {
          formattedError.validationErrors = validationErrors;
        }
      }
    } catch (_detailError) {}
    return JSON.stringify(formattedError, null, 2);
  }
  return JSON.stringify({
    type: "UnknownError",
    message: error2 instanceof Error ? error2.message : String(error2)
  }, null, 2);
}

class RedpandaCloudClient {
  config;
  clusterClient;
  userClient;
  serviceAccountClient;
  roleBindingClient;
  organizationClient;
  constructor(config) {
    this.config = config;
    const transport = createConnectTransport({
      httpVersion: "2",
      baseUrl: config.cloudApiBaseUrl ?? "https://api.redpanda.com",
      interceptors: [createBearerTokenInterceptor(config.cloudApiToken), createRetryInterceptor()]
    });
    this.clusterClient = createClient(ClusterService, transport);
    this.userClient = createClient(UserService, transport);
    this.serviceAccountClient = createClient(ServiceAccountService, transport);
    this.roleBindingClient = createClient(RoleBindingService, transport);
    this.organizationClient = createClient(OrganizationService, transport);
  }
  async listClusters() {
    return paginateToArray({}, (request3) => this.clusterClient.listClusters(request3), (response) => response.clusters.filter(this.isClusterReady).map((cluster) => ({
      id: cluster.id,
      name: cluster.name,
      dataplaneApiUrl: cluster.dataplaneApi?.url ?? "",
      resourceGroupId: cluster.resourceGroupId
    })), { requestName: "Clusters" });
  }
  async getCluster(clusterId) {
    const request3 = {
      id: clusterId
    };
    console.log("\uD83D\uDCE4 Get cluster request:", JSON.stringify(request3, null, 2));
    const response = await this.clusterClient.getCluster(request3);
    if (!response.cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found or response is empty`);
    }
    return {
      id: response.cluster.id,
      name: response.cluster.name,
      dataplaneApiUrl: response.cluster.dataplaneApi?.url ?? "",
      resourceGroupId: response.cluster.resourceGroupId
    };
  }
  async getCurrentOrganizationId() {
    try {
      console.log("\uD83D\uDCE4 Getting current organization...");
      const response = await this.organizationClient.getCurrentOrganization({});
      if (!response.organization?.id) {
        throw new Error("Current organization not found or has no ID");
      }
      console.log(`\uD83D\uDCCA Current organization ID: ${response.organization.id}`);
      return response.organization.id;
    } catch (error2) {
      console.error("Failed to get current organization:");
      console.error(formatConnectError(error2));
      throw error2;
    }
  }
  async getUsers() {
    try {
      return paginateToMap({ readMask: { paths: ["id", "email"] } }, (request3) => this.userClient.listUsers(request3), (response) => response.users, (user) => [user.id, user.email], { requestName: "Users" });
    } catch (error2) {
      console.error("Failed to fetch users:");
      console.error(formatConnectError(error2));
      throw error2;
    }
  }
  async getServiceAccounts() {
    try {
      return paginateToMap({}, (request3) => this.serviceAccountClient.listServiceAccounts(request3), (response) => response.serviceAccounts, (sa) => [sa.id, `${sa.id}@iam.serviceaccount.redpanda.com`], { requestName: "Service accounts" });
    } catch (error2) {
      console.error("Failed to fetch service accounts:");
      console.error(formatConnectError(error2));
      throw error2;
    }
  }
  async getRoleWithPrincipals(targetRole, cluster) {
    try {
      console.log(`Fetching role bindings for ${targetRole} across all scopes...`);
      const roleBindings = await this.getRoleBindingsForRoleAllScopes(targetRole, cluster);
      if (roleBindings.length === 0) {
        return null;
      }
      console.log("Fetching users...");
      const users = await this.getUsers();
      console.log("Fetching service accounts...");
      const serviceAccounts = await this.getServiceAccounts();
      const accountMap = new Map([...users, ...serviceAccounts]);
      const principals = new Set;
      for (const binding of roleBindings) {
        if (binding.roleName !== targetRole) {
          continue;
        }
        const email = accountMap.get(binding.accountId);
        if (email) {
          principals.add(email);
        }
      }
      return {
        roleName: targetRole,
        principals: Array.from(principals)
      };
    } catch (error2) {
      console.error(`Failed to fetch role ${targetRole} with principals:`);
      console.error(formatConnectError(error2));
      throw error2;
    }
  }
  async getRoleBindingsForRoleAllScopes(roleName, cluster) {
    const allBindings = [];
    try {
      const organizationId = await this.getCurrentOrganizationId();
      console.log(`\uD83C\uDFE2 Fetching role bindings for ${roleName} at ORGANIZATION scope (${organizationId})...`);
      const orgBindings = await this.getRoleBindingsWithScope(roleName, {
        resourceType: RoleBinding_ScopeResourceType.ORGANIZATION,
        resourceId: organizationId
      });
      allBindings.push(...orgBindings);
      console.log(`   Found ${orgBindings.length} bindings at organization scope`);
      if (cluster) {
        console.log(`\uD83D\uDCCB Fetching role bindings for ${roleName} at RESOURCE_GROUP scope (${cluster.resourceGroupId})...`);
        const rgBindings = await this.getRoleBindingsWithScope(roleName, {
          resourceType: RoleBinding_ScopeResourceType.RESOURCE_GROUP,
          resourceId: cluster.resourceGroupId
        });
        allBindings.push(...rgBindings);
        console.log(`   Found ${rgBindings.length} bindings at resource group scope`);
        console.log(`\uD83D\uDDA5️ Fetching role bindings for ${roleName} at CLUSTER scope (${cluster.id})...`);
        const clusterBindings = await this.getRoleBindingsWithScope(roleName, {
          resourceType: RoleBinding_ScopeResourceType.CLUSTER,
          resourceId: cluster.id
        });
        allBindings.push(...clusterBindings);
        console.log(`   Found ${clusterBindings.length} bindings at cluster scope`);
      } else {
        console.log("⚠️ No cluster provided - skipping resource group and cluster scope bindings");
      }
      console.log(`\uD83D\uDCCA Total role bindings fetched for ${roleName}: ${allBindings.length}`);
      return allBindings;
    } catch (error2) {
      console.error(`Failed to fetch role bindings for ${roleName} across all scopes:`);
      console.error(formatConnectError(error2));
      throw error2;
    }
  }
  async getRoleBindingsWithScope(roleName, scope) {
    try {
      const scopeFilter = scope.resourceId ? { resourceType: scope.resourceType, resourceId: scope.resourceId } : { resourceType: scope.resourceType };
      return paginateToArray({ filter: { roleName, scope: scopeFilter } }, (request3) => this.roleBindingClient.listRoleBindings(request3), (response) => response.roleBindings, {
        requestName: `Role bindings for ${roleName} with scope ${scope.resourceType}`,
        logRequests: true,
        logResults: false
      });
    } catch (error2) {
      console.error(`Failed to fetch role bindings for ${roleName} with scope ${scope.resourceType}:`);
      console.error(formatConnectError(error2));
      throw error2;
    }
  }
  isClusterReady(cluster) {
    return cluster.state === Cluster_State.READY;
  }
}

// node_modules/@buf/redpandadata_dataplane.bufbuild_es/redpanda/api/dataplane/v1/security_pb.js
var file_redpanda_api_dataplane_v1_security = /* @__PURE__ */ fileDesc("CihyZWRwYW5kYS9hcGkvZGF0YXBsYW5lL3YxL3NlY3VyaXR5LnByb3RvEhlyZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxIi0KBFJvbGUSJQoEbmFtZRgBIAEoCUIXukgUyAEBcg8QARiAATIIXlteLD1dKyQioQIKEExpc3RSb2xlc1JlcXVlc3QSRwoGZmlsdGVyGAEgASgLMjIucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5MaXN0Um9sZXNSZXF1ZXN0LkZpbHRlckgAiAEBEiYKCXBhZ2Vfc2l6ZRgCIAEoBUITukgQGg4Y6Aco////////////ARISCgpwYWdlX3Rva2VuGAMgASgJGn0KBkZpbHRlchIpCgtuYW1lX3ByZWZpeBgBIAEoCUIUukgRcg8YgAEyCl4oW14sPV0qKSQSKwoNbmFtZV9jb250YWlucxgCIAEoCUIUukgRcg8YgAEyCl4oW14sPV0qKSQSGwoJcHJpbmNpcGFsGAMgASgJQgi6SAVyAxiAAUIJCgdfZmlsdGVyIlwKEUxpc3RSb2xlc1Jlc3BvbnNlEi4KBXJvbGVzGAEgAygLMh8ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5Sb2xlEhcKD25leHRfcGFnZV90b2tlbhgCIAEoCSJCChFDcmVhdGVSb2xlUmVxdWVzdBItCgRyb2xlGAEgASgLMh8ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5Sb2xlIkMKEkNyZWF0ZVJvbGVSZXNwb25zZRItCgRyb2xlGAEgASgLMh8ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5Sb2xlIjwKDkdldFJvbGVSZXF1ZXN0EioKCXJvbGVfbmFtZRgBIAEoCUIXukgUyAEBcg8QARiAATIIXlteLD1dKyQifAoPR2V0Um9sZVJlc3BvbnNlEi0KBHJvbGUYASABKAsyHy5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLlJvbGUSOgoHbWVtYmVycxgCIAMoCzIpLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuUm9sZU1lbWJlcnNoaXAiVAoRRGVsZXRlUm9sZVJlcXVlc3QSKgoJcm9sZV9uYW1lGAEgASgJQhe6SBTIAQFyDxABGIABMgheW14sPV0rJBITCgtkZWxldGVfYWNscxgCIAEoCCIUChJEZWxldGVSb2xlUmVzcG9uc2UihQIKFkxpc3RSb2xlTWVtYmVyc1JlcXVlc3QSKgoJcm9sZV9uYW1lGAEgASgJQhe6SBTIAQFyDxABGIABMgheW14sPV0rJBJNCgZmaWx0ZXIYAiABKAsyOC5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkxpc3RSb2xlTWVtYmVyc1JlcXVlc3QuRmlsdGVySACIAQESJgoJcGFnZV9zaXplGAMgASgFQhO6SBAaDhjoByj///////////8BEhIKCnBhZ2VfdG9rZW4YBCABKAkaKQoGRmlsdGVyEh8KDW5hbWVfY29udGFpbnMYASABKAlCCLpIBXIDGIABQgkKB19maWx0ZXIigQEKF0xpc3RSb2xlTWVtYmVyc1Jlc3BvbnNlEhEKCXJvbGVfbmFtZRgBIAEoCRI6CgdtZW1iZXJzGAIgAygLMikucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5Sb2xlTWVtYmVyc2hpcBIXCg9uZXh0X3BhZ2VfdG9rZW4YAyABKAkiIwoOUm9sZU1lbWJlcnNoaXASEQoJcHJpbmNpcGFsGAEgASgJIswBChtVcGRhdGVSb2xlTWVtYmVyc2hpcFJlcXVlc3QSKgoJcm9sZV9uYW1lGAEgASgJQhe6SBTIAQFyDxABGIABMgheW14sPV0rJBIOCgZjcmVhdGUYAiABKAgSNgoDYWRkGAMgAygLMikucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5Sb2xlTWVtYmVyc2hpcBI5CgZyZW1vdmUYBCADKAsyKS5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLlJvbGVNZW1iZXJzaGlwIsABChxVcGRhdGVSb2xlTWVtYmVyc2hpcFJlc3BvbnNlEioKCXJvbGVfbmFtZRgBIAEoCUIXukgUyAEBcg8QARiAATIIXlteLD1dKyQSOAoFYWRkZWQYAiADKAsyKS5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLlJvbGVNZW1iZXJzaGlwEjoKB3JlbW92ZWQYAyADKAsyKS5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLlJvbGVNZW1iZXJzaGlwMs0NCg9TZWN1cml0eVNlcnZpY2USkQIKCUxpc3RSb2xlcxIrLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuTGlzdFJvbGVzUmVxdWVzdBosLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuTGlzdFJvbGVzUmVzcG9uc2UiqAGSQYsBEgpMaXN0IHJvbGVzGj5MaXN0IHJvbGVzLiBPcHRpb25hbDogZmlsdGVyIGJhc2VkIG9uIHJvbGUgbmFtZSBhbmQgcHJpbmNpcGFsLko9CgMyMDASNgoCT0sSMAouGiwucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5MaXN0Um9sZXNSZXNwb25zZYqmHQQIAxADgtPkkwILEgkvdjEvcm9sZXMS9QEKCkNyZWF0ZVJvbGUSLC5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkNyZWF0ZVJvbGVSZXF1ZXN0Gi0ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5DcmVhdGVSb2xlUmVzcG9uc2UiiQGSQWcSC0NyZWF0ZSByb2xlGg5DcmVhdGUgYSByb2xlLkpICgMyMDESQQoMUm9sZSBjcmVhdGVkEjEKLxotLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuQ3JlYXRlUm9sZVJlc3BvbnNliqYdBAgDEAOC0+STAhE6BHJvbGUiCS92MS9yb2xlcxKMAgoHR2V0Um9sZRIpLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuR2V0Um9sZVJlcXVlc3QaKi5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkdldFJvbGVSZXNwb25zZSKpAZJBgAESCEdldCByb2xlGgtHZXQgYSByb2xlLko7CgMyMDASNAoCT0sSLgosGioucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5HZXRSb2xlUmVzcG9uc2VKKgoDNDA0EiMKCU5vdCBGb3VuZBIWChQaEi5nb29nbGUucnBjLlN0YXR1c4qmHQQIAxADgtPkkwIXEhUvdjEvcm9sZXMve3JvbGVfbmFtZX0SgwIKCkRlbGV0ZVJvbGUSLC5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkRlbGV0ZVJvbGVSZXF1ZXN0Gi0ucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5EZWxldGVSb2xlUmVzcG9uc2UilwGSQW8SC0RlbGV0ZSByb2xlGg5EZWxldGUgYSByb2xlLkokCgMyMDQSHQoZUm9sZSBkZWxldGVkIHN1Y2Nlc3NmdWxseRIASioKAzQwNBIjCglOb3QgRm91bmQSFgoUGhIuZ29vZ2xlLnJwYy5TdGF0dXOKph0ECAMQA4LT5JMCFyoVL3YxL3JvbGVzL3tyb2xlX25hbWV9EqUCCg9MaXN0Um9sZU1lbWJlcnMSMS5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkxpc3RSb2xlTWVtYmVyc1JlcXVlc3QaMi5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLkxpc3RSb2xlTWVtYmVyc1Jlc3BvbnNlIqoBkkF6EhFMaXN0IHJvbGUgbWVtYmVycxogTGlzdCBtZW1iZXJzIGFzc2lnbmVkIHRvIGEgcm9sZS5KQwoDMjAwEjwKAk9LEjYKNBoyLnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuTGlzdFJvbGVNZW1iZXJzUmVzcG9uc2WKph0ECAMQA4LT5JMCHxIdL3YxL3JvbGVzL3tyb2xlX25hbWV9L21lbWJlcnMSyQIKFFVwZGF0ZVJvbGVNZW1iZXJzaGlwEjYucmVkcGFuZGEuYXBpLmRhdGFwbGFuZS52MS5VcGRhdGVSb2xlTWVtYmVyc2hpcFJlcXVlc3QaNy5yZWRwYW5kYS5hcGkuZGF0YXBsYW5lLnYxLlVwZGF0ZVJvbGVNZW1iZXJzaGlwUmVzcG9uc2UivwGSQZMBEgtVcGRhdGUgcm9sZRoOVXBkYXRlIGEgcm9sZS5KSAoDMjAwEkEKAk9LEjsKORo3LnJlZHBhbmRhLmFwaS5kYXRhcGxhbmUudjEuVXBkYXRlUm9sZU1lbWJlcnNoaXBSZXNwb25zZUoqCgM0MDQSIwoJTm90IEZvdW5kEhYKFBoSLmdvb2dsZS5ycGMuU3RhdHVziqYdBAgDEAOC0+STAho6ASoaFS92MS9yb2xlcy97cm9sZV9uYW1lfRolkkEiCghTZWN1cml0eRIWTWFuYWdlIFJlZHBhbmRhIHJvbGVzLmIGcHJvdG8z", [file_buf_validate_validate, file_google_api_annotations, file_protoc_gen_openapiv2_options_annotations, file_redpanda_api_auth_v1_authorization]);
var RoleMembershipSchema = /* @__PURE__ */ messageDesc(file_redpanda_api_dataplane_v1_security, 11);
var SecurityService = /* @__PURE__ */ serviceDesc(file_redpanda_api_dataplane_v1_security, 0);

// src/clients/dataplane-client.ts
function formatConnectError2(error2) {
  if (error2 instanceof ConnectError) {
    const formattedError = {
      code: error2.code,
      message: error2.message || error2.rawMessage
    };
    try {
      const badRequestDetails = error2.findDetails(BadRequestSchema);
      if (badRequestDetails.length > 0) {
        const validationErrors = [];
        for (const badRequest of badRequestDetails) {
          if (badRequest.fieldViolations) {
            validationErrors.push(...badRequest.fieldViolations.map((violation) => `${violation.field}: ${violation.description}`));
          }
        }
        if (validationErrors.length > 0) {
          formattedError.validationErrors = validationErrors;
        }
      }
    } catch (_detailError) {}
    return JSON.stringify(formattedError, null, 2);
  }
  return JSON.stringify({
    type: "UnknownError",
    message: error2 instanceof Error ? error2.message : String(error2)
  }, null, 2);
}

class RedpandaDataplaneClient {
  dataplaneUrl;
  config;
  securityClient;
  aclClient;
  constructor(dataplaneUrl, config) {
    this.dataplaneUrl = dataplaneUrl;
    this.config = config;
    const token = config.dataplaneApiToken ?? config.cloudApiToken;
    const transport = createConnectTransport({
      httpVersion: "2",
      baseUrl: dataplaneUrl,
      interceptors: [createBearerTokenInterceptor(token), createRetryInterceptor()]
    });
    this.securityClient = createClient(SecurityService, transport);
    this.aclClient = createClient(ACLService, transport);
  }
  async createRole(roleName) {
    try {
      console.log("\uD83D\uDCE4 Creating role request:");
      const createRoleRequest = {
        role: { name: roleName }
      };
      console.log("   Request:", JSON.stringify(createRoleRequest, null, 2));
      await this.securityClient.createRole(createRoleRequest);
      return { success: true, alreadyExists: false };
    } catch (error2) {
      if (error2 instanceof ConnectError && (error2.code === Code.AlreadyExists || error2.message?.includes("already exists"))) {
        console.log(`✅ Role ${roleName} already exists`);
        return { success: true, alreadyExists: true };
      }
      console.error(`❌ Failed to create role ${roleName}:`);
      console.error(formatConnectError2(error2));
      return { success: false, alreadyExists: false };
    }
  }
  async createACL(aclRequest) {
    await this.aclClient.createACL(aclRequest);
  }
  async syncRoleMembership(roleName, principals) {
    try {
      console.log(`\uD83D\uDCE4 Syncing membership for role: ${roleName}`);
      console.log("   Target principals:", principals);
      const currentMembers = await this.getRoleMembers(roleName);
      console.log("   Current members:", Array.from(currentMembers));
      const normalizedCurrentMembers = new Set(Array.from(currentMembers).map((member) => member.startsWith("User:") ? member.substring(5) : member));
      const normalizedTargetMembers = new Set(principals);
      console.log("   Target principals:", principals);
      const toAdd = Array.from(normalizedTargetMembers).filter((p) => !normalizedCurrentMembers.has(p));
      const toRemove = Array.from(normalizedCurrentMembers).filter((p) => !normalizedTargetMembers.has(p));
      const conflictingMembers = toAdd.filter((member) => toRemove.includes(member));
      if (conflictingMembers.length > 0) {
        console.warn("⚠️  Found conflicting members in both add and remove lists:", conflictingMembers);
        console.warn("⚠️  This should not happen - skipping conflicting members");
      }
      const finalToAdd = toAdd.filter((member) => !conflictingMembers.includes(member));
      const finalToRemove = toRemove.filter((member) => !conflictingMembers.includes(member));
      console.log("   To add:", finalToAdd);
      console.log("   To remove:", finalToRemove);
      if (finalToAdd.length === 0 && finalToRemove.length === 0) {
        console.log("   No membership changes needed");
        return true;
      }
      const addMembers = finalToAdd.map((principal) => create(RoleMembershipSchema, { principal }));
      const removeMembers = finalToRemove.map((principal) => create(RoleMembershipSchema, { principal }));
      const membershipRequest = {
        roleName,
        create: false,
        add: addMembers,
        remove: removeMembers
      };
      console.log("   Membership request:", JSON.stringify(membershipRequest, null, 2));
      await this.securityClient.updateRoleMembership(membershipRequest);
      return true;
    } catch (error2) {
      console.error(`❌ Failed to sync membership for role ${roleName}:`);
      console.error(formatConnectError2(error2));
      return false;
    }
  }
  async getRoleMembers(roleName) {
    try {
      const response = await this.securityClient.getRole({ roleName });
      const members = new Set;
      if (response.members) {
        for (const member of response.members) {
          members.add(member.principal);
        }
      }
      return members;
    } catch (error2) {
      console.warn(`Could not get members for role ${roleName}:`);
      console.warn(formatConnectError2(error2));
      return new Set;
    }
  }
}

// src/sync-role.ts
var typedAclConfig = acls_default;
async function createRoleAcls(dataplaneClient, roleName, roleType) {
  const roleConfig = typedAclConfig.roles[roleType];
  if (!roleConfig || !roleConfig.acls) {
    console.warn(`⚠️ No ACL configuration found for role type: ${roleType}`);
    return true;
  }
  const principal = `RedpandaRole:${roleName}`;
  console.log(`\uD83D\uDD10 Creating ${roleConfig.acls.length} ACLs for role: ${roleName}`);
  let allSuccess = true;
  for (const [index, acl] of roleConfig.acls.entries()) {
    try {
      const aclRequest = {
        resourceType: ACL_ResourceType[acl.resource_type],
        resourceName: acl.resource_name,
        resourcePatternType: ACL_ResourcePatternType[acl.resource_pattern_type],
        principal,
        host: acl.host,
        operation: ACL_Operation[acl.operation],
        permissionType: ACL_PermissionType[acl.permission_type]
      };
      console.log(`   ACL ${index + 1}/${roleConfig.acls.length} - ${acl.resource_type}:`, JSON.stringify(aclRequest, null, 2));
      await dataplaneClient.createACL(aclRequest);
      console.log(`   ✅ Created ACL ${index + 1}/${roleConfig.acls.length} for ${acl.resource_type}`);
    } catch (error2) {
      console.warn(`⚠️ Failed to create ACL ${index + 1} for ${acl.resource_type}:`);
      console.warn(error2);
      allSuccess = false;
    }
  }
  return allSuccess;
}

class IdentityMigrator {
  config;
  cloudClient;
  constructor(config) {
    this.config = config;
    this.cloudClient = new RedpandaCloudClient(config);
  }
  async selectCluster(clusterId) {
    let selectedClusterId;
    if (clusterId) {
      console.log(`✅ Using cluster ID from parameter: ${clusterId}`);
      selectedClusterId = clusterId;
    } else {
      const clusters = await this.cloudClient.listClusters();
      if (clusters.length === 0) {
        console.log("❌ No ready clusters found");
        return null;
      }
      selectedClusterId = await esm_default3({
        message: "Select a cluster for migration:",
        choices: clusters.map((cluster) => ({
          name: `${cluster.name} (${cluster.id})`,
          value: cluster.id
        })),
        pageSize: 10,
        loop: false
      });
    }
    const selectedCluster = await this.cloudClient.getCluster(selectedClusterId);
    console.log(`✅ Using cluster: ${selectedCluster.name} (${selectedCluster.dataplaneApiUrl})`);
    return selectedCluster;
  }
  async syncRole(roleName, clusterId, forceUpsertAcls = false) {
    const result = {
      success: false,
      totalRoles: 0,
      migratedRoles: 0,
      totalPrincipals: 0,
      errors: []
    };
    try {
      console.log("\uD83D\uDD0D Selecting cluster...");
      const cluster = await this.selectCluster(clusterId);
      if (!cluster) {
        result.errors.push("No cluster available for sync");
        return result;
      }
      console.log(`\uD83D\uDCE5 Fetching role bindings for ${roleName} from Redpanda Cloud...`);
      const roleWithPrincipals = await this.cloudClient.getRoleWithPrincipals(roleName, cluster);
      if (!roleWithPrincipals) {
        console.log(`ℹ️ No role binding found for ${roleName}`);
        result.success = true;
        return result;
      }
      result.totalRoles = 1;
      result.totalPrincipals = roleWithPrincipals.principals.length;
      console.log(`Found role ${roleName} with ${result.totalPrincipals} principals`);
      const dataplaneClient = new RedpandaDataplaneClient(cluster.dataplaneApiUrl, this.config);
      console.log("\uD83D\uDD04 Starting sync...");
      const coreRoleName = `__redpanda_cloud_role_${roleName.toLowerCase()}`;
      console.log(`Processing role: ${coreRoleName} (${roleWithPrincipals.principals.length} principals)`);
      try {
        const roleResult = await dataplaneClient.createRole(coreRoleName);
        if (!roleResult.success) {
          result.errors.push(`Failed to create role: ${coreRoleName}`);
          return result;
        }
        let shouldCreateAcls = !roleResult.alreadyExists;
        if (roleResult.alreadyExists) {
          if (forceUpsertAcls) {
            console.log(`✅ Force upsert mode: will reconcile ACLs for existing role ${coreRoleName}`);
            shouldCreateAcls = true;
          } else {
            shouldCreateAcls = await esm_default2({
              message: `Role ${coreRoleName} already exists. Do you want to reconcile/update its ACL permissions?`,
              default: true
            });
          }
        }
        if (shouldCreateAcls) {
          console.log(`\uD83D\uDCE4 Creating ACLs for role: ${coreRoleName}`);
          const aclCreated = await createRoleAcls(dataplaneClient, coreRoleName, roleName.toLowerCase());
          if (!aclCreated) {
            result.errors.push(`Failed to create/reconcile ACLs for role: ${coreRoleName}`);
          }
        } else {
          console.log(`⏭️  Skipping ACL reconciliation for role: ${coreRoleName}`);
        }
        const membershipSynced = await dataplaneClient.syncRoleMembership(coreRoleName, [
          ...roleWithPrincipals.principals
        ]);
        if (!membershipSynced) {
          result.errors.push(`Failed to sync membership for role: ${coreRoleName}`);
          return result;
        }
        result.migratedRoles++;
        console.log(`✅ Synced: ${coreRoleName}`);
      } catch (error2) {
        const errorMsg = `Error processing role ${coreRoleName}: ${error2}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
      result.success = result.migratedRoles === result.totalRoles && result.errors.length === 0;
      console.log(`
\uD83D\uDCCA Sync Summary:`);
      console.log(`✓ Role synced: ${result.migratedRoles}/${result.totalRoles}`);
      console.log(`✓ Total principals: ${result.totalPrincipals}`);
      if (result.errors.length > 0) {
        console.log(`❌ Errors: ${result.errors.length}`);
        for (const error2 of result.errors) {
          console.log(`  - ${error2}`);
        }
      }
      if (result.success) {
        console.log("\uD83C\uDF89 Sync completed successfully!");
      } else {
        console.log("⚠️ Sync completed with errors");
      }
      return result;
    } catch (error2) {
      const errorMsg = `Sync failed: ${error2}`;
      result.errors.push(errorMsg);
      console.error(errorMsg);
      return result;
    }
  }
}

// src/cli.ts
var typedAclConfig2 = acls_default;
var __dirname2 = fileURLToPath(new URL(".", import.meta.url));
var packageJsonPath = join(__dirname2, "..", "package.json");
var packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
var version = packageJson.version;
var program2 = new Command;
function generateAclConfirmationMessage(roleName) {
  const roleType = roleName.toLowerCase();
  const roleConfig = typedAclConfig2.roles[roleType];
  if (!roleConfig || !roleConfig.acls) {
    return `⚠️  No ACL configuration found for role: ${roleName}`;
  }
  const messages = [
    `\uD83D\uDD10 ACL Permissions that will be created for ${roleName} role:`,
    `\uD83D\uDCCB Description: ${roleConfig.description}`,
    ""
  ];
  const aclsByResource = roleConfig.acls?.reduce((acc, acl) => {
    if (!acc[acl.resource_type]) {
      acc[acl.resource_type] = [];
    }
    acc[acl.resource_type]?.push(acl);
    return acc;
  }, {}) || {};
  Object.entries(aclsByResource).forEach(([resourceType, acls]) => {
    messages.push(`  \uD83D\uDCCB Resource Type: ${resourceType}`);
    acls?.forEach((acl) => {
      messages.push(`     • Resource Name: ${acl.resource_name}`);
      messages.push(`     • Pattern Type: ${acl.resource_pattern_type}`);
      messages.push(`     • Operation: ${acl.operation}`);
      messages.push(`     • Permission: ${acl.permission_type}`);
      messages.push(`     • Host: ${acl.host}`);
      if (acls.length > 1)
        messages.push("");
    });
    messages.push("");
  });
  messages.push(`  \uD83D\uDC64 Principal: RedpandaRole:__redpanda_cloud_role_${roleType}`);
  messages.push(`  \uD83D\uDCCA Total ACL entries: ${roleConfig.acls.length}`);
  return messages.join(`
`);
}
program2.name("redpanda-migration").description("Migrate roles and principals from Redpanda Cloud to Core").version(version);
program2.command("sync").description("Sync roles from Cloud to Core cluster").option("--cloud-token <token>", "Redpanda Cloud API token").option("--dataplane-token <token>", "Redpanda Dataplane API token (optional)").option("--cloud-url <url>", "Redpanda Cloud API URL", "https://api.redpanda.com").option("--cluster-id <id>", "Target cluster ID (skips interactive selection)").option("--role-name <name>", "Role name to sync (skips interactive selection)").option("--upsert-acls", "Always upsert/reconcile ACLs even if role exists", false).action(async (options) => {
  console.log(`\uD83D\uDE80 Redpanda Identity Sync Tool
`);
  const cloudApiToken = options.cloudToken ?? process.env.REDPANDA_CLOUD_API_TOKEN;
  const dataplaneApiToken = options.dataplaneToken ?? process.env.REDPANDA_DATAPLANE_TOKEN;
  const clusterId = options.clusterId ?? process.env.REDPANDA_CLUSTER_ID;
  const roleName = options.roleName ?? process.env.REDPANDA_ROLE_NAME;
  const upsertAcls = options.upsertAcls ?? process.env.REDPANDA_UPSERT_ACLS === "true";
  if (!cloudApiToken) {
    console.error("❌ Cloud API token is required");
    console.log("Set REDPANDA_CLOUD_API_TOKEN environment variable or use --cloud-token");
    process.exit(1);
  }
  console.log("\uD83D\uDD27 Configuration:");
  if (clusterId)
    console.log(`  • Cluster ID: ${clusterId}`);
  if (roleName)
    console.log(`  • Role Name: ${roleName}`);
  if (upsertAcls)
    console.log("  • ACL Upsert: Enabled");
  console.log("");
  const migrationConfig = {
    cloudApiToken,
    dataplaneApiToken,
    cloudApiBaseUrl: options.cloudUrl
  };
  try {
    const migrator = new IdentityMigrator(migrationConfig);
    let selectedRole;
    if (roleName) {
      console.log(`✅ Using role from parameter/environment: ${roleName}`);
      selectedRole = roleName;
    } else {
      console.log("\uD83D\uDCCB Available roles for sync:");
      selectedRole = await esm_default3({
        message: "Select a role to sync:",
        choices: [
          {
            name: "Admin - Full administrative access to cluster",
            value: "Admin"
          }
        ]
      });
      console.log(`✅ Selected role: ${selectedRole}
`);
    }
    console.log(generateAclConfirmationMessage(selectedRole));
    const result = await migrator.syncRole(selectedRole, clusterId, upsertAcls);
    process.exit(result.success ? 0 : 1);
  } catch (error2) {
    console.error(`❌ Sync failed: ${error2}`);
    process.exit(1);
  }
});
program2.command("version").description("Show version information").action(() => {
  console.log(`Redpanda Identity Migration Tool v${version}`);
  console.log("Built with TypeScript and ConnectRPC");
});
program2.command("env-help").description("Show environment variables documentation").action(() => {
  console.log(`\uD83C\uDF0D Environment Variables:
`);
  console.log("Required:");
  console.log("  REDPANDA_CLOUD_API_TOKEN     - Cloud API authentication token");
  console.log(`
Optional:`);
  console.log("  REDPANDA_DATAPLANE_TOKEN     - Dataplane API token (falls back to cloud token)");
  console.log("  REDPANDA_CLUSTER_ID          - Target cluster ID (skips interactive selection)");
  console.log("  REDPANDA_ROLE_NAME           - Role name to sync (Admin, Writer, Reader)");
  console.log("  REDPANDA_UPSERT_ACLS=true    - Always reconcile ACLs without confirmation");
  console.log(`
Example usage:`);
  console.log('  export REDPANDA_CLOUD_API_TOKEN="your-token"');
  console.log('  export REDPANDA_CLUSTER_ID="cluster-123"');
  console.log('  export REDPANDA_ROLE_NAME="Admin"');
  console.log('  export REDPANDA_UPSERT_ACLS="true"');
  console.log("  redpanda-migration sync");
});
var args = process.argv.slice(2);
if (args.length === 0) {
  program2.help();
} else {
  program2.parse();
}
