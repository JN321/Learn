(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('core-js/modules/esnext.async-iterator.for-each.js'), require('core-js/modules/esnext.iterator.constructor.js'), require('core-js/modules/esnext.iterator.for-each.js'), require('koa'), require('koa-router'), require('koa-bodyparser'), require('core-js/modules/esnext.async-iterator.reduce.js'), require('core-js/modules/esnext.iterator.reduce.js'), require('core-js/modules/esnext.async-iterator.map.js'), require('core-js/modules/esnext.iterator.map.js'), require('sequelize')) :
    typeof define === 'function' && define.amd ? define(['core-js/modules/esnext.async-iterator.for-each.js', 'core-js/modules/esnext.iterator.constructor.js', 'core-js/modules/esnext.iterator.for-each.js', 'koa', 'koa-router', 'koa-bodyparser', 'core-js/modules/esnext.async-iterator.reduce.js', 'core-js/modules/esnext.iterator.reduce.js', 'core-js/modules/esnext.async-iterator.map.js', 'core-js/modules/esnext.iterator.map.js', 'sequelize'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(null, null, null, global.Koa, global.Router, global.bodyPaser, null, null, null, null, global._sequelize));
})(this, (function (esnext_asyncIterator_forEach_js, esnext_iterator_constructor_js, esnext_iterator_forEach_js, Koa, Router, bodyPaser, esnext_asyncIterator_reduce_js, esnext_iterator_reduce_js, esnext_asyncIterator_map_js, esnext_iterator_map_js, _sequelize) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Koa__default = /*#__PURE__*/_interopDefaultLegacy(Koa);
    var Router__default = /*#__PURE__*/_interopDefaultLegacy(Router);
    var bodyPaser__default = /*#__PURE__*/_interopDefaultLegacy(bodyPaser);
    var _sequelize__default = /*#__PURE__*/_interopDefaultLegacy(_sequelize);

    const RequestMethod = {
      "GET": "get",
      "POST": "post",
      "PUT": "pust",
      "DELETE": "delete",
      "OPTION": "option",
      "PATCH": "patch"
    };
    const controllers = []; // 
    // 装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
    // 这意味着，装饰器能在编译阶段运行代码。
    // 也就是说，装饰器本质就是编译时执行的函数。

    function Controller(prefix = "") {
      return function (target) {
        // 给controller类添加路由前缀
        // console.log('给controller类添加路由前缀', target)
        target.prefix = prefix;
      };
    }
    /**
     * 给controller类的方法添加装饰
     * url 可选
     * method 请求方法
     * middleware 中间件
     */

    function RequestMapping(method = "", url = "", middleware = []) {
      // console.log("函数装饰器执行",)
      return function (target, name, descriptor) {
        // console.log("给函数添加装饰器", target, name)
        let path = ""; // 判断有没有定义url

        if (!url) {
          // 取方法名作为路径
          path = `/${name}`;
        } else {
          // 自己定义的url
          path = url;
        } // 创建router需要的数据 url，method，middleware（可以没有）,最终执行的方法，装饰器队对象的构造函数


        const item = {
          url: path,
          // constructor.prefix + '/all' 
          method: method,
          // RequestMethod.GET - get
          middleware: middleware,
          handler: target[name],
          // 
          constructor: target.constructor
        };
        controllers.push(item);
      };
    }

    var data = {
      "id": 216,
      "url": "http://www.tvmaze.com/shows/216/rick-and-morty",
      "name": "Rick and Morty",
      "type": "Animation",
      "language": "English",
      "genres": ["Comedy", "Adventure", "Science-Fiction"],
      "status": "Running",
      "runtime": 30,
      "premiered": "2013-12-02",
      "officialSite": "http://www.adultswim.com/videos/rick-and-morty",
      "schedule": {
        "time": "23:30",
        "days": ["Sunday"]
      },
      "rating": {
        "average": 9.2
      },
      "weight": 95,
      "network": {
        "id": 10,
        "name": "Adult Swim",
        "country": {
          "name": "United States",
          "code": "US",
          "timezone": "America/New_York"
        }
      },
      "webChannel": null,
      "externals": {
        "tvrage": 33381,
        "thetvdb": 275274,
        "imdb": "tt2861424"
      },
      "image": {
        "medium": "http://static.tvmaze.com/uploads/images/medium_portrait/1/3603.jpg",
        "original": "http://static.tvmaze.com/uploads/images/original_untouched/1/3603.jpg"
      },
      "summary": "<p>Rick is a mentally gifted, but sociopathic and alcoholic scientist and a grandfather to Morty; an awkward, impressionable, and somewhat spineless teenage boy. Rick moves into the family home of Morty, where he immediately becomes a bad influence.</p>",
      "updated": 1562321983,
      "_links": {
        "self": {
          "href": "http://api.tvmaze.com/shows/216"
        },
        "previousepisode": {
          "href": "http://api.tvmaze.com/episodes/1285113"
        },
        "nextepisode": {
          "href": "http://api.tvmaze.com/episodes/1656417"
        }
      },
      "_embedded": {
        "episodes": [{
          "id": 14308,
          "url": "http://www.tvmaze.com/episodes/14308/rick-and-morty-1x01-pilot",
          "name": "Pilot",
          "season": 1,
          "number": 1,
          "airdate": "2013-12-02",
          "airtime": "22:30",
          "airstamp": "2013-12-03T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37912.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37912.jpg"
          },
          "summary": "<p>Rick takes Morty to another dimension to get some seeds for him but Morty's parents are considering to put Rick in a retirement home for keeping Morty away from school to help him in his lab.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14308"
            }
          }
        }, {
          "id": 14309,
          "url": "http://www.tvmaze.com/episodes/14309/rick-and-morty-1x02-lawnmower-dog",
          "name": "Lawnmower Dog",
          "season": 1,
          "number": 2,
          "airdate": "2013-12-09",
          "airtime": "22:30",
          "airstamp": "2013-12-10T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37913.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37913.jpg"
          },
          "summary": "<p>Morty's small, white dog Snuffles gets on the nerves of the family, so Rick quickly builds a knowledge enhancing helmet for the dog. In the meantime, Rick and Morty decide to incept the dreams of Morty's math teacher, Mr. Goldenfold in order to convince him to give Morty A's in math. While the duo are sent on an epic dream world journey, Snuffles slowly gains sentience, which leads to a slew of even more problems.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14309"
            }
          }
        }, {
          "id": 14310,
          "url": "http://www.tvmaze.com/episodes/14310/rick-and-morty-1x03-anatomy-park",
          "name": "Anatomy Park",
          "season": 1,
          "number": 3,
          "airdate": "2013-12-16",
          "airtime": "22:30",
          "airstamp": "2013-12-17T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37914.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37914.jpg"
          },
          "summary": "<p>It's around Christmas time and Jerry's parents are coming to visit so he wants everybody to have a normal holiday without technology and without Rick. Fortunately for him, Rick has other plans, involving building a molecular theme park inside of a friend of his named Ruben, and he shrinks down Morty and sends him in there to test it out.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14310"
            }
          }
        }, {
          "id": 14311,
          "url": "http://www.tvmaze.com/episodes/14311/rick-and-morty-1x04-m-night-shaym-aliens",
          "name": "M. Night Shaym-Aliens!",
          "season": 1,
          "number": 4,
          "airdate": "2014-01-13",
          "airtime": "22:30",
          "airstamp": "2014-01-14T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37915.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37915.jpg"
          },
          "summary": "<p>Rick and Morty try to get to the bottom of a mystery in this M. Night Shyamalan style twistaroony of an episode.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14311"
            }
          }
        }, {
          "id": 14312,
          "url": "http://www.tvmaze.com/episodes/14312/rick-and-morty-1x05-meeseeks-and-destroy",
          "name": "Meeseeks and Destroy",
          "season": 1,
          "number": 5,
          "airdate": "2014-01-20",
          "airtime": "22:30",
          "airstamp": "2014-01-21T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37916.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37916.jpg"
          },
          "summary": "<p>Rick provides the family with a solution to their problems, freeing him up to go on an adventure led by Morty. Sounds good, better record this one, broh!</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14312"
            }
          }
        }, {
          "id": 14313,
          "url": "http://www.tvmaze.com/episodes/14313/rick-and-morty-1x06-rick-potion-9",
          "name": "Rick Potion #9",
          "season": 1,
          "number": 6,
          "airdate": "2014-01-27",
          "airtime": "22:30",
          "airstamp": "2014-01-28T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37917.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37917.jpg"
          },
          "summary": "<p>Rick provides Morty with a love potion to get Jessica. The serum backfires &amp; Rick's attempt to fix things creates Cronenberg inspired monsters. Rick is okay with it but Morty feels partly responsible for creating a living nightmare.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14313"
            }
          }
        }, {
          "id": 14314,
          "url": "http://www.tvmaze.com/episodes/14314/rick-and-morty-1x07-raising-gazorpazorp",
          "name": "Raising Gazorpazorp",
          "season": 1,
          "number": 7,
          "airdate": "2014-03-10",
          "airtime": "22:30",
          "airstamp": "2014-03-11T02:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37918.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37918.jpg"
          },
          "summary": "<p>Morty convinces Rick to buy him a sexy robot. Guess what tho? Trouble happens, dog.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14314"
            }
          }
        }, {
          "id": 14315,
          "url": "http://www.tvmaze.com/episodes/14315/rick-and-morty-1x08-rixty-minutes",
          "name": "Rixty Minutes",
          "season": 1,
          "number": 8,
          "airdate": "2014-03-17",
          "airtime": "22:30",
          "airstamp": "2014-03-18T02:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37919.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37919.jpg"
          },
          "summary": "<p>When Rick hooks up the family's tv receiver with reality-tv shows from alternate dimensions, and allows them to see themselves in different versions of their lives, they begin to wonder what they have, and more importantly - what could have been.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14315"
            }
          }
        }, {
          "id": 14316,
          "url": "http://www.tvmaze.com/episodes/14316/rick-and-morty-1x09-something-ricked-this-way-comes",
          "name": "Something Ricked This Way Comes",
          "season": 1,
          "number": 9,
          "airdate": "2014-03-24",
          "airtime": "22:30",
          "airstamp": "2014-03-25T02:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37920.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37920.jpg"
          },
          "summary": "<p>Rick goes to battle with the devil, and Summer gets upset about it, broh. Plus Jerry and Morty hang out, broh!</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14316"
            }
          }
        }, {
          "id": 14317,
          "url": "http://www.tvmaze.com/episodes/14317/rick-and-morty-1x10-close-rick-counters-of-the-rick-kind",
          "name": "Close Rick-Counters of the Rick Kind",
          "season": 1,
          "number": 10,
          "airdate": "2014-04-07",
          "airtime": "22:30",
          "airstamp": "2014-04-08T02:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37921.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37921.jpg"
          },
          "summary": "<p>Rick has a run in with some old associates, resulting in a fallout with Morty. You got any chips, broh?</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14317"
            }
          }
        }, {
          "id": 14318,
          "url": "http://www.tvmaze.com/episodes/14318/rick-and-morty-1x11-ricksy-business",
          "name": "Ricksy Business",
          "season": 1,
          "number": 11,
          "airdate": "2014-04-14",
          "airtime": "22:30",
          "airstamp": "2014-04-15T02:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37922.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37922.jpg"
          },
          "summary": "<p>Beth and Jerry head for an iceberg of a date leaving Rick in charge. Morty doesn't get to go on any more adventures if the house isn't in the same condition when they get back.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/14318"
            }
          }
        }, {
          "id": 157166,
          "url": "http://www.tvmaze.com/episodes/157166/rick-and-morty-2x01-a-rickle-in-time",
          "name": "A Rickle in Time",
          "season": 2,
          "number": 1,
          "airdate": "2015-07-26",
          "airtime": "23:30",
          "airstamp": "2015-07-27T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37923.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37923.jpg"
          },
          "summary": "<p>Rick don goofed this time and mussed up the whole time frame broh! Beth and Jerry get romantic!</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/157166"
            }
          }
        }, {
          "id": 183053,
          "url": "http://www.tvmaze.com/episodes/183053/rick-and-morty-2x02-mortynight-run",
          "name": "Mortynight Run",
          "season": 2,
          "number": 2,
          "airdate": "2015-08-02",
          "airtime": "23:30",
          "airstamp": "2015-08-03T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37924.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37924.jpg"
          },
          "summary": "<p>Morty tries to save a life.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/183053"
            }
          }
        }, {
          "id": 201178,
          "url": "http://www.tvmaze.com/episodes/201178/rick-and-morty-2x03-auto-erotic-assimilation",
          "name": "Auto Erotic Assimilation",
          "season": 2,
          "number": 3,
          "airdate": "2015-08-09",
          "airtime": "23:30",
          "airstamp": "2015-08-10T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/37925.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/37925.jpg"
          },
          "summary": "<p>Rick becomes emotional; Beth and Jerry are hard on each other.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/201178"
            }
          }
        }, {
          "id": 201179,
          "url": "http://www.tvmaze.com/episodes/201179/rick-and-morty-2x04-total-rickall",
          "name": "Total Rickall",
          "season": 2,
          "number": 4,
          "airdate": "2015-08-16",
          "airtime": "23:30",
          "airstamp": "2015-08-17T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/38412.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/38412.jpg"
          },
          "summary": "<p>Meeting new friends; Morty goes ballistic.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/201179"
            }
          }
        }, {
          "id": 201180,
          "url": "http://www.tvmaze.com/episodes/201180/rick-and-morty-2x05-get-schwifty",
          "name": "Get Schwifty",
          "season": 2,
          "number": 5,
          "airdate": "2015-08-23",
          "airtime": "23:30",
          "airstamp": "2015-08-24T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/15/39536.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/15/39536.jpg"
          },
          "summary": "<p>Rick and Morty must step up and save things; a new religion starts up.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/201180"
            }
          }
        }, {
          "id": 201181,
          "url": "http://www.tvmaze.com/episodes/201181/rick-and-morty-2x06-the-ricks-must-be-crazy",
          "name": "The Ricks Must Be Crazy",
          "season": 2,
          "number": 6,
          "airdate": "2015-08-30",
          "airtime": "23:30",
          "airstamp": "2015-08-31T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/68/171025.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/68/171025.jpg"
          },
          "summary": "<p>Rick forgets to check his oil, and must repair his car.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/201181"
            }
          }
        }, {
          "id": 211831,
          "url": "http://www.tvmaze.com/episodes/211831/rick-and-morty-2x07-big-trouble-in-little-sanchez",
          "name": "Big Trouble in Little Sanchez",
          "season": 2,
          "number": 7,
          "airdate": "2015-09-13",
          "airtime": "23:30",
          "airstamp": "2015-09-14T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/18/46223.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/18/46223.jpg"
          },
          "summary": "<p>Rick joins in on hijinks, Beth and Jerry sort out relationship issues.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/211831"
            }
          }
        }, {
          "id": 211832,
          "url": "http://www.tvmaze.com/episodes/211832/rick-and-morty-2x08-interdimensional-cable-2-tempting-fate",
          "name": "Interdimensional Cable 2: Tempting Fate",
          "season": 2,
          "number": 8,
          "airdate": "2015-09-20",
          "airtime": "23:30",
          "airstamp": "2015-09-21T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/68/171026.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/68/171026.jpg"
          },
          "summary": "<p>Jerry gets sick and Rick sparks up the TV.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/211832"
            }
          }
        }, {
          "id": 211833,
          "url": "http://www.tvmaze.com/episodes/211833/rick-and-morty-2x09-look-whos-purging-now",
          "name": "Look Who's Purging Now",
          "season": 2,
          "number": 9,
          "airdate": "2015-09-27",
          "airtime": "23:30",
          "airstamp": "2015-09-28T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/68/171027.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/68/171027.jpg"
          },
          "summary": "<p>Morty makes a mistake and Jerry and Summer work on their father daughter relationship.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/211833"
            }
          }
        }, {
          "id": 211834,
          "url": "http://www.tvmaze.com/episodes/211834/rick-and-morty-2x10-the-wedding-squanchers",
          "name": "The Wedding Squanchers",
          "season": 2,
          "number": 10,
          "airdate": "2015-10-04",
          "airtime": "23:30",
          "airstamp": "2015-10-05T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/22/57034.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/22/57034.jpg"
          },
          "summary": "<p>Birdperson is getting married and invites the Smith family to the wedding.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/211834"
            }
          }
        }, {
          "id": 1119144,
          "url": "http://www.tvmaze.com/episodes/1119144/rick-and-morty-3x01-the-rickshank-rickdemption",
          "name": "The Rickshank Rickdemption",
          "season": 3,
          "number": 1,
          "airdate": "2017-04-01",
          "airtime": "23:30",
          "airstamp": "2017-04-02T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/105/262759.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/105/262759.jpg"
          },
          "summary": "<p>Rick, still in galactic prison, puts an intricate escape plan into action. Back on Earth, which is now under federation control, Morty and Summer have an argument about their grandpa.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1119144"
            }
          }
        }, {
          "id": 1144079,
          "url": "http://www.tvmaze.com/episodes/1144079/rick-and-morty-3x02-rickmancing-the-stone",
          "name": "Rickmancing the Stone",
          "season": 3,
          "number": 2,
          "airdate": "2017-07-30",
          "airtime": "23:30",
          "airstamp": "2017-07-31T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/122/306764.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/122/306764.jpg"
          },
          "summary": "<p>With the kids dealing with their parents' divorce, Rick takes them to a Mad Max-style universe where he tries to steal a green crystal from a group of scavengers.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1144079"
            }
          }
        }, {
          "id": 1247370,
          "url": "http://www.tvmaze.com/episodes/1247370/rick-and-morty-3x03-pickle-rick",
          "name": "Pickle Rick",
          "season": 3,
          "number": 3,
          "airdate": "2017-08-06",
          "airtime": "23:30",
          "airstamp": "2017-08-07T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/123/308859.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/123/308859.jpg"
          },
          "summary": "<p>Rick turns himself into a pickle in one of his crazy experiments. The Smith family attends therapy.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1247370"
            }
          }
        }, {
          "id": 1247371,
          "url": "http://www.tvmaze.com/episodes/1247371/rick-and-morty-3x04-vindicators-3-the-return-of-worldender",
          "name": "Vindicators 3: The Return of Worldender",
          "season": 3,
          "number": 4,
          "airdate": "2017-08-13",
          "airtime": "23:30",
          "airstamp": "2017-08-14T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/123/309507.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/123/309507.jpg"
          },
          "summary": "<p>Rick and Morty are summoned by the Vindicators to stop Worldender but end up in a deathtrap conceived by Drunk Rick. </p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1247371"
            }
          }
        }, {
          "id": 1264543,
          "url": "http://www.tvmaze.com/episodes/1264543/rick-and-morty-3x05-the-whirly-dirly-conspiracy",
          "name": "The Whirly Dirly Conspiracy",
          "season": 3,
          "number": 5,
          "airdate": "2017-08-20",
          "airtime": "23:30",
          "airstamp": "2017-08-21T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/124/310725.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/124/310725.jpg"
          },
          "summary": "<p>Rick takes Jerry on a sympathy adventure to a resort where everyone is immortal when there, and Jerry meets some old acquaintances of Rick's who want payback.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1264543"
            }
          }
        }, {
          "id": 1264544,
          "url": "http://www.tvmaze.com/episodes/1264544/rick-and-morty-3x06-rest-and-ricklaxation",
          "name": "Rest and Ricklaxation",
          "season": 3,
          "number": 6,
          "airdate": "2017-08-27",
          "airtime": "23:30",
          "airstamp": "2017-08-28T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/125/314281.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/125/314281.jpg"
          },
          "summary": "<p>Following a stressful adventure, Rick and Morty go on a break to a spa where they remove their toxins, which in turn take a form of their own.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1264544"
            }
          }
        }, {
          "id": 1269493,
          "url": "http://www.tvmaze.com/episodes/1269493/rick-and-morty-3x07-the-ricklantis-mixup",
          "name": "The Ricklantis Mixup",
          "season": 3,
          "number": 7,
          "airdate": "2017-09-10",
          "airtime": "23:30",
          "airstamp": "2017-09-11T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/127/318431.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/127/318431.jpg"
          },
          "summary": "<p>Rick and Morty head to Atlantis. Meanwhile, the Citadel of Ricks undergoes major changes under new leadership</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1269493"
            }
          }
        }, {
          "id": 1269494,
          "url": "http://www.tvmaze.com/episodes/1269494/rick-and-morty-3x08-mortys-mind-blowers",
          "name": "Morty's Mind Blowers",
          "season": 3,
          "number": 8,
          "airdate": "2017-09-17",
          "airtime": "23:30",
          "airstamp": "2017-09-18T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/128/320259.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/128/320259.jpg"
          },
          "summary": "<p>Rick reveals to Morty his \"Morty's mind blowers,\" a collection of memories Morty asked Rick to erase from his mind.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1269494"
            }
          }
        }, {
          "id": 1285112,
          "url": "http://www.tvmaze.com/episodes/1285112/rick-and-morty-3x09-the-abcs-of-beth",
          "name": "The ABC's of Beth",
          "season": 3,
          "number": 9,
          "airdate": "2017-09-24",
          "airtime": "23:30",
          "airstamp": "2017-09-25T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/128/322458.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/128/322458.jpg"
          },
          "summary": "<p>Jerry is lucky with a lady and Beth recalls her childhood.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1285112"
            }
          }
        }, {
          "id": 1285113,
          "url": "http://www.tvmaze.com/episodes/1285113/rick-and-morty-3x10-the-rickchurian-mortydate",
          "name": "The Rickchurian Mortydate",
          "season": 3,
          "number": 10,
          "airdate": "2017-10-01",
          "airtime": "23:30",
          "airstamp": "2017-10-02T03:30:00+00:00",
          "runtime": 30,
          "image": {
            "medium": "http://static.tvmaze.com/uploads/images/medium_landscape/129/324378.jpg",
            "original": "http://static.tvmaze.com/uploads/images/original_untouched/129/324378.jpg"
          },
          "summary": "<p>Rick goes on a confrontation with the President.</p>",
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1285113"
            }
          }
        }, {
          "id": 1656417,
          "url": "http://www.tvmaze.com/episodes/1656417/rick-and-morty-4x01-episode-1",
          "name": "Episode 1",
          "season": 4,
          "number": 1,
          "airdate": "2019-11-17",
          "airtime": "23:30",
          "airstamp": "2019-11-18T04:30:00+00:00",
          "runtime": 30,
          "image": null,
          "summary": null,
          "_links": {
            "self": {
              "href": "http://api.tvmaze.com/episodes/1656417"
            }
          }
        }]
      }
    };

    var _dec$1, _dec2$1, _class$1, _class2$1;

    function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
    let BookController = (_dec$1 = Controller('/book'), _dec2$1 = RequestMapping(RequestMethod.GET, '/all'), _dec$1(_class$1 = (_class2$1 = class BookController {
      async getAllBooks(ctx) {
        console.log(ctx.querystring);
        const [key, page] = ctx.querystring.split('=');
        ctx.body = {
          data: data._embedded.episodes.slice((page - 1) * 10, page * 10 - 1),
          count: data._embedded.episodes.length
        };
      }

    }, (_applyDecoratedDescriptor$1(_class2$1.prototype, "getAllBooks", [_dec2$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "getAllBooks"), _class2$1.prototype)), _class2$1)) || _class$1);

    const {
      Model: Model$2,
      Sequelize: Sequelize$2
    } = _sequelize__default["default"];
    class SequelizeMeta extends Model$2 {
      static init(sequelize, DataTypes) {
        return super.init({
          name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
          }
        }, {
          sequelize,
          tableName: 'SequelizeMeta',
          timestamps: false,
          indexes: [{
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{
              name: "name"
            }]
          }, {
            name: "name",
            unique: true,
            using: "BTREE",
            fields: [{
              name: "name"
            }]
          }]
        });
      }

    }

    const {
      Model: Model$1,
      Sequelize: Sequelize$1
    } = _sequelize__default["default"];
    class roles extends Model$1 {
      static init(sequelize, DataTypes) {
        return super.init({
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
          userid: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          roleName: {
            type: DataTypes.STRING(30),
            allowNull: true
          }
        }, {
          sequelize,
          tableName: 'roles',
          timestamps: false,
          indexes: [{
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{
              name: "id"
            }]
          }]
        });
      }

    }

    const {
      Model,
      Sequelize
    } = _sequelize__default["default"];
    class users extends Model {
      static init(sequelize, DataTypes) {
        return super.init({
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING(30),
            allowNull: true
          },
          account: {
            type: DataTypes.STRING(30),
            allowNull: true
          },
          password: {
            type: DataTypes.STRING(30),
            allowNull: true
          },
          email: {
            type: DataTypes.STRING(100),
            allowNull: true
          },
          avatar_url: {
            type: DataTypes.STRING(200),
            allowNull: true
          },
          web_url: {
            type: DataTypes.STRING(200),
            allowNull: true
          },
          workspace: {
            type: DataTypes.STRING(200),
            allowNull: true
          },
          created_at: {
            type: DataTypes.DATE,
            allowNull: true
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: true
          }
        }, {
          sequelize,
          tableName: 'users',
          timestamps: false,
          indexes: [{
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{
              name: "id"
            }]
          }]
        });
      }

    }

    const DataTypes = _sequelize__default["default"].DataTypes;
    function initModels(sequelize) {
      const SequelizeMeta$1 = SequelizeMeta.init(sequelize, DataTypes);

      const roles$1 = roles.init(sequelize, DataTypes);

      const users$1 = users.init(sequelize, DataTypes);

      return {
        SequelizeMeta: SequelizeMeta$1,
        roles: roles$1,
        users: users$1
      };
    }

    var development = {
    	username: "root",
    	password: "cloudsai",
    	database: "db_rubest",
    	host: "127.0.0.1",
    	dialect: "mysql"
    };
    var test = {
    	username: "root",
    	password: "cloudsai",
    	database: "db_rubest",
    	host: "127.0.0.1",
    	dialect: "mysql"
    };
    var production = {
    	username: "root",
    	password: "cloudsai",
    	database: "db_rubest",
    	host: "127.0.0.1",
    	dialect: "mysql"
    };
    var config = {
    	development: development,
    	test: test,
    	production: production
    };

    const {
      host,
      username,
      password,
      database,
      dialect
    } = development;
    const sequelize = new _sequelize__default["default"](database, username, password, {
      host,
      dialect,
      define: {
        timestamps: false
      }
    });
    var db = initModels(sequelize);

    var _dec, _dec2, _dec3, _dec4, _class, _class2;

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
    let UserController = (_dec = Controller('/user'), _dec2 = RequestMapping(RequestMethod.GET, '/all'), _dec3 = RequestMapping(RequestMethod.GET, '/add'), _dec4 = RequestMapping(RequestMethod.GET, '/addten'), _dec(_class = (_class2 = class UserController {
      async getAllUser(ctx) {
        const userInfo = await db.users.findAll({
          where: {
            name: {
              [_sequelize.Op.not]: null
            }
          }
        });
        ctx.body = userInfo;
      }

      async addRandomUser(ctx) {
        db.users.create({
          id: parseInt(Math.random() * 100000)
        });
      }

      async addRandomTenUser(ctx) {
        const userList = new Array(10).fill(0).map((item, idx) => ({
          id: parseInt(Math.random() * 100000),
          name: 'person' + idx
        }));
        db.users.bulkCreate(userList);
      }

    }, (_applyDecoratedDescriptor(_class2.prototype, "getAllUser", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getAllUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addRandomUser", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "addRandomUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addRandomTenUser", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "addRandomTenUser"), _class2.prototype)), _class2)) || _class);

    var index = [BookController, UserController];

    const app = new Koa__default["default"]();
    const router = new Router__default["default"](); // cors

    app.use(async (ctx, next) => {
      ctx.set("Access-Control-Allow-Origin", "*");
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
      ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
      ctx.set("Content-Type", "application/json;charset=utf-8");

      if (ctx.request.method.toLowerCase() == 'options') {
        ctx.state = 200; //让options尝试请求快速结束
      } else {
        await next();
      }
    });
    app.use(bodyPaser__default["default"]());
    console.log('controllers', controllers);
    controllers.forEach(item => {
      // 每个路由的前缀
      let {
        url,
        constructor,
        method,
        handler
      } = item;
      const {
        prefix
      } = constructor;
      if (prefix) url = `${prefix}${url}`;
      console.log(url, method, handler);
      router[method](url, handler);
    });
    app.use(router.routes());
    app.listen(3008, () => {
      console.log("server is listening in 3008");
    });

}));
