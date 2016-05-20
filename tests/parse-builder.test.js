'use strict';

const assert = require('assert');
const Bluebird = require('bluebird');
const fs = require('fs');
const fsReadFile = Bluebird.promisify(fs.readFile);
const vastXML = require('../index');

describe('Test JSON Parse Builder', () => {
  before(() => (
    fsReadFile('./tests/test-data/vast-inline.xml').bind(this)
      .then((str) => {
        this.xmlFileStr = str;
        return vastXML.parse(str);
      })
      .then((json) => {
        this.vastJson = json;
      })
  ));
  it('Inline Creative Parse and Build', () => (
    Bluebird.resolve(vastXML.build(JSON.parse(JSON.stringify(this.vastJson))))
      .then((xml) => {
        assert.equal(xml, this.xmlFileStr.toString());
      })
  ));
  it('getAttr call for getting XML attributes', () => {
    assert.equal(this.vastJson.vast.getAttr('version'), '4.0');
  });
  it('getValue call for getting string values from JS', () => {
    assert.equal(this.vastJson.vast.ad[0].inLine.adSystem.getValue(), 'Shibby Service');
  });
});
