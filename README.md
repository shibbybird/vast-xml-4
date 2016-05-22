# VAST 4.0 Parser and Builder 

[![Travis Build][travis-image]][travis-url]

This is a simple VAST parser and builder heavily using xml2js. This VAST parser is used to keep a consistent and compliant VAST structure between building and parsing. Validation is NOT implemented yet so use at your own risk.

## Example Usage

### Parsing VAST
```javascript
  const vastXML = require('../index');
  fsReadFile('./test-data/vast-inline.xml').bind(this)
      .then((str) => {
        this.xmlFileStr = str;
        return vastXML.parse(str);
      })
      .then((json) => {
        this.vastJson = json;
        
        console.log(json.vast.getAttr('version'));
        console.log(json.vast.ad[0].inLine.adSystem.getValue());
        
      });
```

### Building VAST
```javascript
  const vastXML = require('../index');
  const vastJson = {
        "vast": {
            "_attr": {
                "version": "4.0"
            },
            "ad": [
                {
                    "_attr": {
                        "id": "abc123",
                        "sequence": "0"
                    },
                    "inLine": {
                        "adSystem": {
                            "_value": "Shibby Service",
                            "_attr": {
                                "version": "1.0"
                            }
                        },
                        "adTitle": {
                            "_value": "VAST 4.0 Test"
                        },
                        "impression": [
                            {
                                "_value": "http://myTrackingURL/impression"
                            }
                        ],
                        "category": [
                            {
                                "_value": "Inline Video",
                                "_attr": {
                                    "authority": "IAB"
                                }
                            }
                        ],
                        "description": {
                            "_value": "VAST Inline"
                        },
                        "advertiser": {
                            "_value": "IAB"
                        },
                        "pricing": {
                            "_value": "4.00",
                            "_attr": {
                                "model": "CPM",
                                "currency": "USD"
                            }
                        },
                        "survey": [
                            {
                                "_value": "https://iab.com/survey.js",
                                "_attr": {
                                    "type": "text/javascript"
                                }
                            }
                        ],
                        "extensions": "",
                        "viewableImpression": {
                            "viewable": [
                                {
                                    "_value": "https://iab.com/viewable"
                                }
                            ],
                            "notViewable": [
                                {
                                    "_value": "https://iab.com/notViewable"
                                }
                            ],
                            "viewUndetermined": [
                                {
                                    "_value": "https://iab.com/notDetermined"
                                }
                            ]
                        },
                        "adVerification": "",
                        "creatives": {
                            "creative": [
                                {
                                    "_attr": {
                                        "adId": "abc123",
                                        "sequence": "0",
                                        "apiFramework": "iab-api"
                                    },
                                    "universalAdId": {
                                        "_value": "unknown",
                                        "_attr": {
                                            "idValue": "unknown"
                                        }
                                    },
                                    "creativeExtensions": {
                                        "creativeExtension": [
                                            {
                                                "custom": {
                                                    "_value": "this is custom stuff"
                                                }
                                            }
                                        ]
                                    },
                                    "linear": {
                                        "duration": {
                                            "_value": "00:00:30"
                                        },
                                        "trackingEvents": {
                                            "tracking": [
                                                {
                                                    "_value": "http://iab.com/creativeView",
                                                    "_attr": {
                                                        "event": "creativeView"
                                                    }
                                                },
                                                {
                                                    "_value": "http://iab.com/start",
                                                    "_attr": {
                                                        "event": "start"
                                                    }
                                                },
                                                {
                                                    "_value": "http://iab.com/midpoint",
                                                    "_attr": {
                                                        "event": "midpoint"
                                                    }
                                                },
                                                {
                                                    "_value": "http://iab.com/firstQuartile",
                                                    "_attr": {
                                                        "event": "firstQuartile"
                                                    }
                                                },
                                                {
                                                    "_value": "http://iab.com/thirdQuartile",
                                                    "_attr": {
                                                        "event": "thirdQuartile"
                                                    }
                                                },
                                                {
                                                    "_value": "http://iab.com/complete",
                                                    "_attr": {
                                                        "event": "complete"
                                                    }
                                                }
                                            ]
                                        },
                                        "videoClicks": {
                                            "clickThrough": {
                                                "_value": "http://iab.com"
                                            },
                                            "clickTracking": [
                                                {
                                                    "_value": "http://iab.com/click"
                                                }
                                            ]
                                        },
                                        "mediaFiles": {
                                            "mediaFile": [
                                                {
                                                    "_value": "http://iad.com/test.mp4",
                                                    "_attr": {
                                                        "delivery": "progressive",
                                                        "type": "video/mp4",
                                                        "bitrate": "600",
                                                        "width": "1920",
                                                        "height": "1080",
                                                        "scalable": "true",
                                                        "maintainAspectRatio": "true"
                                                    }
                                                }
                                            ]
                                        },
                                        "adParameters": {
                                            "_value": "qs=test&reddit=true"
                                        },
                                        "icons": {
                                            "icon": [
                                                {
                                                    "_value": "http://adchoices.com"
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    "_attr": {
                                        "adID": "123-Companion"
                                    },
                                    "companionAds": {
                                        "companion": [
                                            {
                                                "_attr": {
                                                    "width": "1920",
                                                    "height": "1080",
                                                    "assetWidth": "1920",
                                                    "assetHeight": "1080"
                                                },
                                                "htmlResource": [
                                                    {
                                                        "_value": "http://adserver.com/htmlresourcefile.htm"
                                                    }
                                                ],
                                                "trackingEvents": {
                                                    "tracking": [
                                                        {
                                                            "_value": "http://iad.com/firstCompanionCreativeView",
                                                            "_attr": {
                                                                "event": "creativeView"
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                "_attr": {
                                                    "width": "1920",
                                                    "height": "80"
                                                },
                                                "staticResource": [
                                                    {
                                                        "_value": "http://iad.com/companion.jpg?test1=true&test2=false",
                                                        "_attr": {
                                                            "creativeType": "image/jpeg"
                                                        }
                                                    }
                                                ],
                                                "companionClickThrough": {
                                                    "_value": "http://www.iab.com/clickThrough"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    };
  
  
  return vastXML.build(JSON.parse(JSON.stringify(vastJson)));
```

## TODO's
* Add Validation when building and parsing VAST 4.0
* Add Utility Functions setValue and setAttr for building VAST
* 
[travis-image]: https://travis-ci.org/shibbybird/vast-xml-4.svg?branch=master
[travis-url]: https://travis-ci.org/shibbybird/vast-xml-4
