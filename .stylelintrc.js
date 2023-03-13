"use strict";
/**
 * https://stylelint.io/
 * https://stylelint.docschina.org/user-guide/rules/
 */
module.exports = {
  ignoreFiles: [
    "./**",
    "!./client/views/multipleCloud",
    "!./client/views/**/*.vue",
    "!./client/views/**/*.scss",
    "!./client/styles/**/*.scss",
    "!./client/plugin/**/*.vue",
    "!./client/plugin/**/*.scss"
  ],
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    // "pseudo-class": [":deep"],
    "selector-pseudo-element-no-unknown": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["deep"]
      }
    ],
    "unit-whitelist": ["em", "rem", "s", "px", "%", "deg", "vh"],
    "at-rule-no-unknown": [true, {
      ignoreAtRules: [ "function", "if", "return", "include", "extend", "mixin", "else", "while", "for", "each"]
    }],
    "no-descending-specificity": null,
    "no-empty-source": null
  }
};