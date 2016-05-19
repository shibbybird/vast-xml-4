'use strict';

const Bluebird = require('bluebird');
const xml2js = require('xml2js');
const _ = require('lodash');

const ARRAY_TAGS = [
  'error',
  'ad',
  'impression',
  'category',
  'survey',
  'viewable',
  'notViewable',
  'viewUndetermined',
  'creative',
  'creativeExtension',
  'mediaFile',
  'InteractiveCreativeFile',
  'clickTracking',
  'customClick',
  'icon',
  'iconViewTracking',
  'iconClickTracking',
  'nonLinear',
  'nonLinearClickTracking',
  'companion',
  'companionClickTracking',
  'tracking',
  'staticResource',
  'iFrameResource',
  'htmlResource',
  'verification',
  'javaScriptResource',
  'flashResource',
  'extension',
];

const TAG_ARRAY_OBJ = ARRAY_TAGS.reduce((accum, tag) => {
  const result = accum;
  result[tag] = true;
  return result;
}, {});

function tagProcessor(n) {
  let name = n;
  if (name.indexOf('HTML') > -1) {
    name = name.replace('HTML', 'html');
  } else if (name.indexOf('VAST') > -1) {
    name = name.replace('VAST', 'vast');
  }
  return name;
}

const Parser = new xml2js.Parser({
  tagNameProcessors: [tagProcessor, xml2js.processors.firstCharLowerCase],
  attrNameProcessors: [xml2js.processors.firstCharLowerCase],
  explicitArray: false,
  explicitCharkey: true,
  explicitAttrkey: true,
  charkey: '_value',
  attrkey: '_attr',
});

function getValue() {
  return this._value;
}

function getAttr(attribute) {
  return this._attr[attribute];
}

function objectTransform(obj) {
  const result = Array.isArray(obj) ? [] : {};
  _.each(obj, (v, key) => {
    const value = v;
    const isPlainObject = _.isPlainObject(value);
    const isArray = Array.isArray(value);
    if (isPlainObject) {
      if (value._value) {
        value.getValue = getValue.bind(value);
      }
      value.getAttr = getAttr.bind(value);
    }
    if (isPlainObject || isArray) {
      result[key] = TAG_ARRAY_OBJ[key] && !isArray ?
        [objectTransform(value)] : objectTransform(value);
    } else {
      result[key] = value;
    }
  });
  return result;
}

const parseString = Bluebird.promisify(Parser.parseString);

function parseVAST(xml) {
  return parseString(xml).then((json) => (objectTransform(json)));
}

module.exports = parseVAST;
