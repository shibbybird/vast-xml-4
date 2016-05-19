'use strict';

const xml2js = require('xml2js');
const _ = require('lodash');

const builder = new xml2js.Builder({
  charkey: '_value',
  attrkey: '_attr',
  cdata: true,
});

function tagProcessor(n) {
  let name = n;
  if (name.indexOf('html') > -1) {
    name = name.replace('html', 'HTML');
  } else if (name.indexOf('vast') > -1) {
    name = name.replace('vast', 'VAST');
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function attrProcessor(n) {
  let name = n;
  if (name.indexOf('adID') > -1) {
    name = name.replace('adID', 'AdID');
  }
  return name;
}

function objectTransform(obj, isAttr) {
  const result = Array.isArray(obj) ? [] : {};
  _.each(obj, (value, key) => {
    let newKey = key;
    if (typeof newKey === 'string') {
      newKey = isAttr ? attrProcessor(newKey) : tagProcessor(newKey);
    }
    result[newKey] = (_.isPlainObject(value) || Array.isArray(value)) ?
    objectTransform(value, (newKey === '_attr')) : value;
  });
  return result;
}

function buildVast(obj) {
  return builder.buildObject(objectTransform(obj));
}

module.exports = buildVast;
