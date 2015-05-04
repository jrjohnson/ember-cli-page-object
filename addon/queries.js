/* global findWithAssert */

import { qualifySelector, trim } from './helpers';

export function attribute(attributeName, selector, options = {}) {
  return {
    build: function(key, page) {
      return function(...args) {
        let qualifiedSelector = qualifySelector(options.scope || page.scope, selector),
            element = findWithAssert(qualifiedSelector);

        return element.attr(attributeName);
      };
    }
  };
}

function query(fn) {
  return function(selector, options = {}) {
    return {
      build: function(key, page) {
        return function(...args) {
          let qualifiedSelector = qualifySelector(options.scope || page.scope, selector),
              element = findWithAssert(qualifiedSelector);

          return fn(element, ...args);
        };
      }
    };
  };
}

const count = query(elements => elements.length),
      text = query(element => trim(element.text())),
      value = query(element => element.val());

export {
  count,
  text,
  value
};
