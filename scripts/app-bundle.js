define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/zwitscher-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _zwitscherService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(zs, au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.zwitscherService = zs;
      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          _this.router.navigate('/', { replace: true, trigger: false });
          _this.router.reset();
          _this.router.deactivate();
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('globalTimeline');
          });
        } else {
          _this.router.navigate('/', { replace: true, trigger: false });
          _this.router.reset();
          _this.router.deactivate();
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          });
        }
      });
    }

    App.prototype.attached = function attached() {
      var _this2 = this;

      if (this.zwitscherService.isAuthenticated()) {
        this.au.setRoot('home').then(function () {
          _this2.router.navigateToRoute('globalTimeline');
        });
      }
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'login';
      });

      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(au) {
      _classCallCheck(this, Home);

      this.aurelia = au;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'globalTimeline'], name: 'globalTimeline', moduleId: 'viewmodels/globalTimeline/globalTimeline', nav: true, title: 'Global Timeline' }, { route: 'userTimeline/:id?', name: 'userTimeline', moduleId: 'viewmodels/userTimeline/userTimeline', nav: true, title: 'User Timeline', href: '#/userTimeline' }, { route: 'users', name: 'users', moduleId: 'viewmodels/users/users', nav: true, title: 'Users' }, { route: 'socialGraph', name: 'socialGraph', moduleId: 'viewmodels/socialGraph/socialGraph', nav: true, title: 'Social Graph' }, { route: 'dashboard', name: 'dashboard', moduleId: 'viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' }, { route: 'settings', name: 'settings', moduleId: 'viewmodels/settings/settings', nav: true, title: 'Settings' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }, { route: 'reload', name: 'reload', moduleId: 'viewmodels/reload/reload' }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'globalTimeline';
      });

      this.router = router;
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrl);
      });
      this.ea = ea;
    }

    AsyncHttpClient.prototype.get = function get(url) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.http.get(url).then(function (result) {
          resolve(result);
        }).catch(function (err) {
          if (err.statusCode === 401) {
            var status = {
              success: false,
              message: ''
            };
            _this.clearAuthentication();
            _this.ea.publish(new _messages.LoginStatus(status));
          }
          reject(err);
        });
      });
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.http.post(url, obj).then(function (result) {
          resolve(result);
        }).catch(function (err) {
          if (err.statusCode === 401) {
            var status = {
              success: false,
              message: ''
            };
            _this2.clearAuthentication();
            _this2.ea.publish(new _messages.LoginStatus(status));
          }
          reject(err);
        });
      });
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.http.delete(url).then(function (result) {
          resolve(result);
        }).catch(function (err) {
          if (err.statusCode === 401) {
            var status = {
              success: false,
              message: ''
            };
            _this3.clearAuthentication();
            _this3.ea.publish(new _messages.LoginStatus(status));
          }
          reject(err);
        });
      });
    };

    AsyncHttpClient.prototype.login = function login(url, user) {
      var _this4 = this;

      this.authenticate(url, user).then(function (successStatus) {
        _this4.ea.publish(new _messages.LoginStatus(successStatus));
      }).catch(function (errorStatus) {
        _this4.ea.publish(new _messages.LoginStatus(errorStatus));
      });
    };

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.http.post(url, user).then(function (response) {
          var status = response.content;
          if (status.success) {
            localStorage.zwitscher = JSON.stringify(response.content);
            _this5.http.configure(function (configuration) {
              configuration.withHeader('Authorization', 'bearer ' + response.content.token);
            });
          }
          resolve(status);
        }).catch(function (error) {
          var status = {
            success: false,
            message: 'service not available'
          };
          reject(status);
        });
      });
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.zwitscher = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    AsyncHttpClient.prototype.isAuthenticated = function isAuthenticated() {
      var _this6 = this;

      var authenticated = false;
      if (localStorage.zwitscher !== 'null' && localStorage.zwitscher !== undefined) {
        authenticated = true;
        this.http.configure(function (http) {
          var auth = JSON.parse(localStorage.zwitscher);
          if (auth) {
            http.withHeader('Authorization', 'bearer ' + auth.token);
            _this6.ea.publish(new _messages.LoginStatus(auth));
          }
        });
      }
      return authenticated;
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrl = 'https://zwitscher.herokuapp.com';
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };

  var TweetUpdate = exports.TweetUpdate = function TweetUpdate(status) {
    _classCallCheck(this, TweetUpdate);

    this.status = status;
  };

  var TriggerLoggedInUserUpdate = exports.TriggerLoggedInUserUpdate = function TriggerLoggedInUserUpdate(status) {
    _classCallCheck(this, TriggerLoggedInUserUpdate);

    this.status = status;
  };

  var CompletedLoggedInUserUpdate = exports.CompletedLoggedInUserUpdate = function CompletedLoggedInUserUpdate(status) {
    _classCallCheck(this, CompletedLoggedInUserUpdate);

    this.status = status;
  };

  var UsersChanged = exports.UsersChanged = function UsersChanged(status) {
    _classCallCheck(this, UsersChanged);

    this.status = status;
  };
});
define('services/zwitscher-service',['exports', 'aurelia-framework', './messages', 'aurelia-event-aggregator', './async-http-client'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _asyncHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ZwitscherService = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default), _dec(_class = function () {
    function ZwitscherService(ea, ac) {
      var _this = this;

      _classCallCheck(this, ZwitscherService);

      this.ea = ea;
      this.ac = ac;
      this.loggedInUser = null;

      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          _this.loggedInUser = msg.status.user;
        } else {
          _this.loggedInUser = null;
        }
      });

      ea.subscribe(_messages.TriggerLoggedInUserUpdate, function (msg) {
        _this.getUser(_this.loggedInUser._id).then(function (refreshedUser) {
          _this.loggedInUser = refreshedUser;
          ea.publish(new _messages.CompletedLoggedInUserUpdate({}));
        }).catch(function (err) {
          console.log('error refreshing user');
        });
      });
    }

    ZwitscherService.prototype.getLoggedInUser = function getLoggedInUser() {
      return JSON.parse(JSON.stringify(this.loggedInUser));
    };

    ZwitscherService.prototype.getUser = function getUser(userID) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.ac.get('/api/users/' + userID).then(function (result) {

          resolve(JSON.parse(result.response));
        }).catch(function (err) {
          reject(err);
        });
      });
    };

    ZwitscherService.prototype.getUsers = function getUsers() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.ac.get('/api/users').then(function (result) {

          var users = [];
          if (result.statusCode === 200) {
            users = JSON.parse(result.response);
          }
          resolve(users);
        }).catch(function (err) {
          reject(err);
        });
      });
    };

    ZwitscherService.prototype.register = function register(firstName, lastName, email, password, gender) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var newUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          gender: gender
        };
        _this4.ac.post('/api/users', newUser).then(function (res) {
          if (res.statusCode === 201) {
            resolve(JSON.parse(res.response));
          } else {
            reject('error creating user');
          }
        });
      }).catch(function (err) {
        reject(err);
      });
    };

    ZwitscherService.prototype.login = function login(email, password) {
      var user = {
        email: email,
        password: password
      };
      this.ac.login('/api/users/authenticate', user);
    };

    ZwitscherService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ac.clearAuthentication();
      this.ea.publish(new _messages.LoginStatus(status));
    };

    ZwitscherService.prototype.reAuhtenticate = function reAuhtenticate(email, password) {
      var user = {
        email: email,
        password: password
      };

      this.ac.authenticate('/api/users/authenticate', user);
    };

    ZwitscherService.prototype.isAuthenticated = function isAuthenticated() {
      return this.ac.isAuthenticated();
    };

    ZwitscherService.prototype.getTweetsForUser = function getTweetsForUser() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.ac.get('/api/tweets/users/' + _this5.loggedInUser._id).then(function (result) {

          var tweets = [];
          if (result.statusCode === 200) {
            tweets = JSON.parse(result.response);
          }

          resolve(tweets);
        });
      });
    };

    ZwitscherService.prototype.getTweetsByUser = function getTweetsByUser(userID) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.ac.get('/api/users/' + userID + '/tweets').then(function (result) {

          var tweets = [];
          if (result.statusCode === 200) {
            tweets = JSON.parse(result.response);
          }

          resolve(tweets);
        });
      });
    };

    ZwitscherService.prototype.deleteTweet = function deleteTweet(tweetToDeleteID) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.ac.delete('/api/tweets/' + tweetToDeleteID).then(function (result) {
          if (result.statusCode === 204) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    };

    ZwitscherService.prototype.deleteMultipleTweets = function deleteMultipleTweets(tweetsToDelete) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        _this8.ac.post('/api/deleteTweetsJob/' + JSON.stringify(tweetsToDelete)).then(function (result) {
          if (result.statusCode === 204) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      });
    };

    ZwitscherService.prototype.postTweet = function postTweet(tweet) {
      var _this9 = this;

      return new Promise(function (resolve, reject) {
        _this9.ac.post('/api/tweets', tweet).then(function (result) {
          if (result.statusCode === 201) {
            resolve(result.response);
          } else {
            reject(null);
          }
        });
      });
    };

    ZwitscherService.prototype.unfollowUser = function unfollowUser(userID) {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        _this10.ac.post('/api/users/' + userID + '/unfollow').then(function (result) {
          if (result.statusCode === 201) {
            resolve(result.response);
          } else {
            reject(null);
          }
        });
      });
    };

    ZwitscherService.prototype.followUser = function followUser(userID) {
      var _this11 = this;

      return new Promise(function (resolve, reject) {
        _this11.ac.post('/api/users/' + userID + '/follow').then(function (result) {
          if (result.statusCode === 201) {
            resolve(result.response);
          } else {
            reject(null);
          }
        });
      });
    };

    ZwitscherService.prototype.updateUser = function updateUser(updatedUser) {
      var _this12 = this;

      return new Promise(function (resolve, reject) {
        _this12.ac.post('/api/users/' + updatedUser._id + '/update', updatedUser).then(function (result) {
          if (result.statusCode === 201) {
            resolve(JSON.parse(result.response));
          } else {
            reject(null);
          }
        }).catch(function (err) {
          reject(err);
        });
      });
    };

    ZwitscherService.prototype.removeUser = function removeUser(userID) {
      var _this13 = this;

      return new Promise(function (resolve, reject) {
        _this13.ac.delete('/api/users/' + userID).then(function (result) {
          if (result.statusCode === 204) {
            resolve(result.response);
          } else {
            reject(null);
          }
        });
      });
    };

    ZwitscherService.prototype.getUser = function getUser(userID) {
      var _this14 = this;

      return new Promise(function (resolve, reject) {
        _this14.ac.get('/api/users/' + userID).then(function (result) {
          if (result) {
            resolve(JSON.parse(result.response));
          } else {
            reject(null);
          }
        });
      });
    };

    return ZwitscherService;
  }()) || _class);
  exports.default = ZwitscherService;
});
define('viewmodels/dashboard/dashboard',['exports', 'aurelia-framework', '../../services/zwitscher-service', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _zwitscherService, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dashboard = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Dashboard = exports.Dashboard = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function Dashboard(zs, ea) {
    _classCallCheck(this, Dashboard);

    this.timelineOptions = null;

    this.zwitscherService = zs;
    this.eventAgregator = ea;

    this.timelineOptions = {
      src: 'globalTimeline',
      viewedUserID: this.zwitscherService.getLoggedInUser()._id
    };
  }) || _class);
});
define('viewmodels/globalTimeline/globalTimeline',['exports', 'aurelia-framework', '../../services/zwitscher-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _zwitscherService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GlobalTimeline = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var GlobalTimeline = exports.GlobalTimeline = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function GlobalTimeline(zs, ea) {
    _classCallCheck(this, GlobalTimeline);

    this.timelineOptions = {};

    this.zwitscherService = zs;
    this.eventAgregator = ea;

    this.timelineOptions = {
      src: 'globalTimeline',
      viewedUserID: this.zwitscherService.getLoggedInUser()._id
    };
  }) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/zwitscher-service'], function (exports, _aureliaFramework, _zwitscherService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default), _dec(_class = function () {
    function Login(zs) {
      _classCallCheck(this, Login);

      this.zwitscherService = zs;
      this.prompt = '';
    }

    Login.prototype.attached = function attached() {
      initializeFormValidation(this.login.bind(this), null);

      $('#loginForm').on('submit', function () {
        $('#loginForm').addClass('loading disabled');
      });
    };

    Login.prototype.login = function login() {
      console.log('Trying to log in ' + this.email);

      this.zwitscherService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);


  function initializeFormValidation(onSuccessFunction, onFailureFunction) {
    $('#loginForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        event.preventDefault();
        onSuccessFunction();
      },
      onFailure: function onFailure() {
        onFailureFunction();
        return false;
      },
      fields: {
        email: {
          identifier: 'email',
          rules: [{
            type: 'email',
            prompt: 'Enter valid email address'
          }]
        },
        password: {
          identifier: 'password',
          rules: [{
            type: 'empty',
            prompt: 'Enter password'
          }]
        }
      }
    });
  }
});
define('viewmodels/logout/logout',['exports', '../../services/zwitscher-service', 'aurelia-framework'], function (exports, _zwitscherService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default), _dec(_class = function () {
    function Logout(zs) {
      _classCallCheck(this, Logout);

      this.zwitscherService = zs;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.zwitscherService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/postTweet/postTweet',['exports', 'aurelia-framework', '../../services/zwitscher-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _zwitscherService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PostTweet = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var PostTweet = exports.PostTweet = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function PostTweet(zs, ea) {
      _classCallCheck(this, PostTweet);

      this.loggedInUser = {};
      this.tweetMessage = '';
      this.tweetImage = null;
      this.errorMessage = {
        'show': false,
        'message': ''
      };
      this.eventSubscriptions = [];

      this.zwitscherService = zs;
      this.eventAgregator = ea;
      this.loggedInUser = this.zwitscherService.getLoggedInUser();
    }

    PostTweet.prototype.attached = function attached() {
      var _this = this;

      this.eventSubscriptions = [];
      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.CompletedLoggedInUserUpdate, function (msg) {
        _this.loggedInUser = _this.zwitscherService.getLoggedInUser();
      }));
      initilizeUploadForm();
      initializeFormValidation(this.postTweet.bind(this), this.reinitializeUploadForm.bind(this));
    };

    PostTweet.prototype.detached = function detached() {
      this.eventSubscriptions.forEach(function (event) {
        event.dispose();
      });
    };

    PostTweet.prototype.postTweet = function postTweet() {
      var _this2 = this;

      var tweet = {
        message: this.tweetMessage
      };

      if (this.tweetImage && this.tweetImage.length > 0) {
        if (this.tweetImage[0].size > 1000000) {
          this.errorMessage.show = true;
          this.errorMessage.message = 'File size must be less than 1MB';
          this.reinitializeUploadForm();
        } else {
          getBase64(this.tweetImage[0]).then(function (base64EncodedImage) {
            tweet.image = base64EncodedImage;
            _this2.zwitscherService.postTweet(tweet).then(function (postedTweet) {
              console.log('tweet posted');

              _this2.eventAgregator.publish(new _messages.TweetUpdate({}));
              _this2.reinitializeUploadForm();
            }).catch(function (err) {
              console.log('tweet could not be posted');
            });
          }).catch(function (err) {
            console.log('error encoding image');
          });
        }
      } else {
        this.zwitscherService.postTweet(tweet).then(function (postedTweet) {
          _this2.eventAgregator.publish(new _messages.TweetUpdate({}));
          _this2.reinitializeUploadForm();
        }).catch(function (err) {
          console.log('tweet could not be posted');
        });
      }
    };

    PostTweet.prototype.hideErrorMessage = function hideErrorMessage() {
      this.errorMessage.show = false;
      this.errorMessage.message = '';
    };

    PostTweet.prototype.reinitializeUploadForm = function reinitializeUploadForm() {
      $('#tweetForm').removeClass('loading disabled');
      $('#tweetForm #imagePreview').attr('src', null);
      $('#imageSegment').attr('style', 'display: none');
      this.tweetImage = null;
      this.tweetMessage = '';
    };

    return PostTweet;
  }()) || _class);


  function getBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (readerEvent) {
        var binaryString = readerEvent.target.result;
        var base64String = btoa(binaryString);
        resolve(base64String);
      };
      reader.onerror = function (error) {
        reject(null);
      };
      reader.readAsBinaryString(file);
    });
  }

  function initializeFormValidation(onSuccessFunction, onFailureFunction) {
    $('#tweetForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        event.preventDefault();
        onSuccessFunction();
      },
      onFailure: function onFailure() {
        onFailureFunction();
        return false;
      },
      fields: {
        tweetMessage: {
          identifier: 'tweetMessage',
          rules: [{
            type: 'empty',
            prompt: 'No message no tweet'
          }]
        }
      }
    });
  }

  function initilizeUploadForm() {
    $('#tweetForm #camerabutton').on('click', function (e) {
      $('#tweetForm #fileInput', $(e.target).parents()).click();
    });

    $('#tweetForm #fileInput').on('change', function (input) {
      var $preview = $('#tweetForm #imagePreview');
      if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#tweetForm #imagePreview').attr('src', e.target.result);
          $('#imageSegment').attr('style', 'display: block');
        };

        reader.readAsDataURL(this.files[0]);
      } else {
        $('#tweetForm #imagePreview').removeAttr('src');
        $('#imageSegment').attr('style', 'display: none');
      }
    });

    $('#tweetForm #imagePreview').on('click', function (e) {
      var $control = $('#tweetForm #fileInput');
      control.replaceWith($control.val('').clone(true));
      $('#tweetForm #imagePreview').removeAttr('src');
      $('#imageSegment').attr('style', 'display: none');
    });

    $('#tweetForm').on('submit', function () {
      $('#tweetForm').addClass('loading disabled');
    });
  }
});
define('viewmodels/reload/reload',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Reload = exports.Reload = function () {
    function Reload() {
      _classCallCheck(this, Reload);
    }

    Reload.prototype.activate = function activate() {
      window.history.back();
    };

    return Reload;
  }();
});
define('viewmodels/settings/settings',['exports', 'aurelia-event-aggregator', '../../services/zwitscher-service', 'aurelia-framework', '../../services/messages'], function (exports, _aureliaEventAggregator, _zwitscherService, _aureliaFramework, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Settings = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _zwitscherService2.default), _dec(_class = function () {
    function Settings(ea, zs) {
      _classCallCheck(this, Settings);

      this.loggedInUser = {};
      this.eventSubscriptions = [];

      this.eventAgregator = ea;
      this.zwitscherService = zs;
    }

    Settings.prototype.attached = function attached() {
      var _this = this;

      this.eventSubscriptions = [];
      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.CompletedLoggedInUserUpdate, function (msg) {
        _this.refreshUser();
      }));
      this.refreshUser();
      initializeFormValidation(this.update.bind(this), null);
    };

    Settings.prototype.detached = function detached() {
      this.eventSubscriptions.forEach(function (event) {
        event.dispose();
      });
    };

    Settings.prototype.update = function update() {
      var _this2 = this;

      if (this.loggedInUser.password === '') {
        this.loggedInUser.password = this.loggedInUser.oldPassword;
      }

      this.zwitscherService.updateUser(this.loggedInUser).then(function (updatedUser) {
        _this2.zwitscherService.reAuhtenticate(updatedUser.email, updatedUser.password);
        _this2.eventAgregator.publish(new _messages.TriggerLoggedInUserUpdate({}));
      }).catch(function (err) {
        console.log('error updating user');
        _this2.refreshUser();
      });
    };

    Settings.prototype.refreshUser = function refreshUser() {
      this.loggedInUser = this.zwitscherService.getLoggedInUser();
      this.loggedInUser.oldPassword = '';
      this.loggedInUser.password = '';
      this.loggedInUser.passwordConfirm = '';
    };

    return Settings;
  }()) || _class);


  function initializeFormValidation(onSuccessFunction, onFailureFunction) {
    $('#settingsForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        event.preventDefault();
        onSuccessFunction();
      },
      onFailure: function onFailure() {
        onFailureFunction();
        return false;
      },
      fields: {
        firstName: {
          identifier: 'firstName',
          rules: [{
            type: 'empty',
            prompt: 'Enter your first name'
          }]
        },
        lastName: {
          identifier: 'lastName',
          rules: [{
            type: 'empty',
            prompt: 'Enter your last name'
          }]
        },
        gender: {
          identifier: 'gender',
          rules: [{
            type: 'empty',
            prompt: 'Provide your gender'
          }]
        },
        email: {
          identifier: 'email',
          rules: [{
            type: 'email',
            prompt: 'Enter valid email address'
          }]
        },
        oldPassword: {
          identifier: 'oldPassword',
          rules: [{
            type: 'empty',
            prompt: 'Enter old password'
          }]
        },
        password: {
          identifier: 'password',
          optional: true,
          rules: [{
            type: 'empty',
            prompt: 'Enter password'
          }, {
            type: 'minLength[6]',
            prompt: 'Password must be 6 or more characters'
          }]
        },
        passwordConfirm: {
          identifier: 'passwordConfirm',
          optional: true,
          rules: [{
            type: 'match[password]',
            prompt: 'Passwords do not match'
          }]
        }
      }
    });
  }
});
define('viewmodels/signup/signup',['exports', 'aurelia-event-aggregator', '../../services/zwitscher-service', 'aurelia-framework', '../../services/messages'], function (exports, _aureliaEventAggregator, _zwitscherService, _aureliaFramework, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _zwitscherService2.default), _dec(_class = function () {
    function Signup(ea, zs) {
      _classCallCheck(this, Signup);

      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.gender = 'M';

      this.ea = ea;
      this.zwitscherService = zs;
    }

    Signup.prototype.attached = function attached() {
      initializeFormValidation(this.register.bind(this), null);

      $('#signupForm').on('submit', function () {
        $('#signupForm').addClass('loading disabled');
      });
    };

    Signup.prototype.register = function register() {
      var _this = this;

      this.zwitscherService.register(this.firstName, this.lastName, this.email, this.password, this.gender).then(function (newUser) {
        _this.zwitscherService.login(_this.email, _this.password);
      }).catch(function (err) {
        console.log(err);
      });
    };

    return Signup;
  }()) || _class);


  function initializeFormValidation(onSuccessFunction, onFailureFunction) {
    $('#signupForm').form({
      on: 'submit',
      inline: true,
      onSuccess: function onSuccess(event) {
        event.preventDefault();
        onSuccessFunction();
      },
      onFailure: function onFailure() {
        onFailureFunction();
        return false;
      },
      fields: {
        firstName: {
          identifier: 'firstName',
          rules: [{
            type: 'empty',
            prompt: 'Enter your first name'
          }]
        },
        lastName: {
          identifier: 'lastName',
          rules: [{
            type: 'empty',
            prompt: 'Enter your last name'
          }]
        },
        gender: {
          identifier: 'gender',
          rules: [{
            type: 'empty',
            prompt: 'Provide your gender'
          }]
        },
        email: {
          identifier: 'email',
          rules: [{
            type: 'email',
            prompt: 'Enter valid email address'
          }]
        },
        password: {
          identifier: 'password',
          rules: [{
            type: 'empty',
            prompt: 'Enter password'
          }, {
            type: 'minLength[6]',
            prompt: 'Password must be 6 or more characters'
          }]
        },
        passwordConfirm: {
          identifier: 'passwordConfirm',
          rules: [{
            type: 'match[password]',
            prompt: 'Passwords do not match'
          }]
        }
      }
    });
  }
});
define('viewmodels/socialGraph/socialGraph',['exports', 'aurelia-framework', '../../services/zwitscher-service', 'aurelia-event-aggregator', '../../services/messages', 'd3'], function (exports, _aureliaFramework, _zwitscherService, _aureliaEventAggregator, _messages, _d) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SocialGraph = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  var d3 = _interopRequireWildcard(_d);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SocialGraph = exports.SocialGraph = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaEventAggregator.EventAggregator, d3), _dec(_class = function () {
    function SocialGraph(zs, ea) {
      _classCallCheck(this, SocialGraph);

      this.eventSubscriptions = [];

      this.zwitscherService = zs;
      this.eventAgregator = ea;
      this.graph = {
        "nodes": [],
        "links": []
      };
    }

    SocialGraph.prototype.attached = function attached() {
      var _this = this;

      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.CompletedLoggedInUserUpdate, function (msg) {
        _this.refresh();
      }));
      this.refresh();
    };

    SocialGraph.prototype.detached = function detached() {
      this.eventSubscriptions.forEach(function (event) {
        event.dispose();
      });
    };

    SocialGraph.prototype.refresh = function refresh() {
      var _this2 = this;

      d3.select('svg').remove();

      this.graph = {
        "nodes": [],
        "links": []
      };

      this.zwitscherService.getUsers().then(function (users) {
        users.forEach(function (user) {
          _this2.graph.nodes.push({
            'id': user._id,
            'name': user.firstName,
            'group': user.gender,
            'profilePicture': user.profilePicture
          });

          user.follows.forEach(function (followedUser) {
            _this2.graph.links.push({
              'source': user._id,
              'target': followedUser._id,
              'value': 50
            });
          });
        });

        _this2.initializeGraph();
      }).catch(function (err) {
        console.log(err);
      });
    };

    SocialGraph.prototype.initializeGraph = function initializeGraph() {
      var width = 960,
          height = 500;

      var svg = d3.select('#graph').append('svg').attr('width', width).attr('height', height);

      var simulation = d3.forceSimulation().force("link", d3.forceLink().id(function (d) {
        return d.id;
      })).force("charge", d3.forceManyBody()).force("collide", d3.forceCollide(100)).force("center", d3.forceCenter(width / 2, height / 2));

      var link = svg.append("g").attr("class", "links").selectAll("line").data(this.graph.links).enter().append("line").attr("stroke-width", function (d) {
        return Math.sqrt(d.value);
      }).attr('marker-end', 'url(#end)').style("fill", "lightgray");

      var gnodes = svg.selectAll('g.gnode').data(this.graph.nodes).enter().append('g').classed('gnode', true);

      gnodes.append("image").attr("xlink:href", function (d) {
        return d.profilePicture;
      }).attr("x", -50).attr("y", -50).attr("width", 100).attr("height", 100).call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

      var labels = gnodes.append("text").text(function (d) {
        return d.name;
      }).attr("x", 50).attr("y", 25).style('fill', '1b1c1d').style('font-weight', 'bold').style('font-size', '25px');

      simulation.nodes(this.graph.nodes).on("tick", ticked);

      simulation.force("link").links(this.graph.links);

      function ticked() {
        link.attr("x1", function (d) {
          return d.source.x;
        }).attr("y1", function (d) {
          return d.source.y;
        }).attr("x2", function (d) {
          return d.target.x;
        }).attr("y2", function (d) {
          return d.target.y;
        });

        gnodes.attr("cx", function (d) {
          return d.x;
        }).attr("cy", function (d) {
          return d.y;
        }).attr("transform", function (d) {
          return 'translate(' + [d.x, d.y] + ')';
        });
      }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    };

    return SocialGraph;
  }()) || _class);
});
define('viewmodels/timeline/timeline',['exports', 'aurelia-framework', '../../services/zwitscher-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _zwitscherService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Timeline = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Timeline = exports.Timeline = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Timeline(zs, ea) {
      _classCallCheck(this, Timeline);

      this.tweets = [];
      this.src = '';
      this.loggedInUser = {};
      this.timelineUser = {};
      this.timelineUserID = '';
      this.bulkDeleteActive = false;
      this.eventSubscriptions = [];

      this.zwitscherService = zs;
      this.eventAgregator = ea;
      this.loggedInUser = this.zwitscherService.getLoggedInUser();
    }

    Timeline.prototype.activate = function activate(timelineOptions) {
      var _this = this;

      console.log(timelineOptions);
      this.timelineUserID = timelineOptions.viewedUserID;
      this.src = timelineOptions.src;
      this.zwitscherService.getUser(timelineOptions.viewedUserID).then(function (foundUser) {
        _this.timelineUser = foundUser;
      }).catch(function (err) {
        console.log(err);
      });
    };

    Timeline.prototype.attached = function attached() {
      var _this2 = this;

      this.eventSubscriptions = [];
      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.TweetUpdate, function (msg) {
        _this2.refreshTimeline();
      }));
      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.CompletedLoggedInUserUpdate, function (msg) {
        _this2.refreshTimeline();
        if (_this2.timelineUserID === _this2.loggedInUser._id) {
          _this2.loggedInUser = _this2.zwitscherService.getLoggedInUser();
          _this2.timelineUser = _this2.zwitscherService.getLoggedInUser();
        }
      }));

      this.refreshTimeline();
    };

    Timeline.prototype.detached = function detached() {
      this.eventSubscriptions.forEach(function (event) {
        event.dispose();
      });
    };

    Timeline.prototype.deleteTweet = function deleteTweet(tweetToDeleteID) {
      var _this3 = this;

      this.zwitscherService.deleteTweet(tweetToDeleteID).then(function (result) {
        var indexToRemove = _this3.tweets.findIndex(function (tweet) {
          return tweet._id === tweetToDeleteID;
        });

        if (indexToRemove > -1) {
          _this3.tweets.splice(indexToRemove, 1);
          _this3.eventAgregator.publish(new _messages.TweetUpdate({}));
          console.log('tweet deleted successfully');
        }
      }).catch(function (err) {
        console.log('tweet could not be deleted');
      });
    };

    Timeline.prototype.deleteMultipleTweets = function deleteMultipleTweets() {
      var _this4 = this;

      var tweetsToDelete = [];
      this.tweets.forEach(function (tweet) {
        if (tweet.checkedForDelete) {
          tweetsToDelete.push(tweet._id);
        }
      });

      if (tweetsToDelete.length > 0) {
        this.zwitscherService.deleteMultipleTweets(tweetsToDelete).then(function (result) {
          _this4.eventAgregator.publish(new _messages.TweetUpdate({}));
        }).catch(function (err) {
          console.log(err);
        });
      }

      this.showOrHideEditItems();
    };

    Timeline.prototype.deleteAllUserTweets = function deleteAllUserTweets(userID) {
      var _this5 = this;

      var tweetsToDelete = [];
      this.tweets.forEach(function (tweet) {
        if (tweet.user._id === userID) {
          tweetsToDelete.push(tweet._id);
        }
      });

      if (tweetsToDelete.length > 0) {
        this.zwitscherService.deleteMultipleTweets(tweetsToDelete).then(function (result) {
          _this5.eventAgregator.publish(new _messages.TweetUpdate({}));
        }).catch(function (err) {
          console.log(err);
        });
      }
    };

    Timeline.prototype.refreshTimeline = function refreshTimeline() {
      var _this6 = this;

      this.tweets = [];

      var getTweetFunctionName = '';
      if (this.src === 'globalTimeline') {
        getTweetFunctionName = 'getTweetsForUser';
      } else {
        getTweetFunctionName = 'getTweetsByUser';
      }

      this.zwitscherService[getTweetFunctionName](this.timelineUserID).then(function (tweets) {

        tweets.sort(function (tweet1, tweet2) {
          var posted1 = new Date(tweet1.posted);
          var posted2 = new Date(tweet2.posted);

          return posted2.getTime() - posted1.getTime();
        });

        tweets.forEach(function (tweet) {
          tweet.checkedForDelete = false;
          tweet.postedString = new Date(tweet.posted).toLocaleString('en-GB');
          tweet.canDelete = tweet.user !== null && _this6.loggedInUser._id === tweet.user._id || _this6.loggedInUser.scope === 'admin';
          _this6.tweets.push(tweet);
        });

        console.log(_this6.tweets);
      });
    };

    Timeline.prototype.showOrHideEditItems = function showOrHideEditItems() {
      this.tweets.forEach(function (tweet) {
        tweet.checkedForDelete = false;
      });

      this.bulkDeleteActive = !this.bulkDeleteActive;
    };

    return Timeline;
  }()) || _class);
});
define('viewmodels/user/user',['exports', 'aurelia-framework', '../../services/zwitscher-service', 'aurelia-event-aggregator', '../../services/messages', 'aurelia-router'], function (exports, _aureliaFramework, _zwitscherService, _aureliaEventAggregator, _messages, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.User = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var User = exports.User = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaEventAggregator.EventAggregator, _aureliaRouter.Router), _dec(_class = function () {
    function User(zs, ea, router) {
      _classCallCheck(this, User);

      this.loggedInUser = {};
      this.viewedUserID = '';
      this.viewedUser = {};
      this.eventSubscriptions = [];

      this.zwitscherService = zs;
      this.eventAgregator = ea;
      this.router = router;
      this.loggedInUser = this.zwitscherService.getLoggedInUser();
    }

    User.prototype.attached = function attached() {
      var _this = this;

      this.eventSubscriptions = [];
      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.TweetUpdate, function (msg) {
        _this.refreshUser();
      }));

      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.CompletedLoggedInUserUpdate, function (msg) {
        _this.refreshUser();
      }));

      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.UsersChanged, function (msg) {
        if (msg.status.removedID === _this.viewedUser._id) {
          _this.router.navigateToRoute('users');
        }
      }));
    };

    User.prototype.detached = function detached() {
      this.eventSubscriptions.forEach(function (event) {
        event.dispose();
      });
    };

    User.prototype.activate = function activate(userID) {
      console.log(userID);
      this.viewedUserID = userID;
      this.refreshUser();
    };

    User.prototype.followUser = function followUser(userID) {
      var _this2 = this;

      this.zwitscherService.followUser(userID).then(function (result) {
        var indexToRemove = _this2.loggedInUser.follows.indexOf(userID);
        if (indexToRemove === -1) {
          _this2.loggedInUser.follows.push(userID);
        }
        _this2.eventAgregator.publish(new _messages.TriggerLoggedInUserUpdate({}));
      }).catch(function (err) {
        console.log('error trying to follow user');
      });
    };

    User.prototype.unfollowUser = function unfollowUser(userID) {
      var _this3 = this;

      this.zwitscherService.unfollowUser(userID).then(function (result) {
        var indexToRemove = _this3.loggedInUser.follows.indexOf(userID);
        if (indexToRemove !== -1) {
          _this3.loggedInUser.follows.splice(indexToRemove, 1);
        }
        _this3.eventAgregator.publish(new _messages.TriggerLoggedInUserUpdate({}));
      }).catch(function (err) {
        console.log('error trying to unfollow user');
      });
    };

    User.prototype.removeUser = function removeUser(userID) {
      var _this4 = this;

      this.zwitscherService.removeUser(userID).then(function (result) {

        _this4.eventAgregator.publish(new _messages.UsersChanged({ removedID: userID }));
      }).catch(function (err) {
        console.log('error trying to remove user');
      });
    };

    User.prototype.refreshUser = function refreshUser() {
      var _this5 = this;

      this.zwitscherService.getUser(this.viewedUserID).then(function (foundUser) {
        _this5.viewedUser = foundUser;
        _this5.viewedUser.joinedString = new Date(_this5.viewedUser.joined).getFullYear();
        _this5.viewedUser.canFollow = _this5.loggedInUser._id !== _this5.viewedUserID;

        var indexOfFollowing = _this5.loggedInUser.follows.findIndex(function (followedUserID) {
          return _this5.viewedUser._id === followedUserID;
        });
        _this5.viewedUser.isFollowing = indexOfFollowing !== -1;

        var canDelete = false;
        if (_this5.loggedInUser._id !== _this5.viewedUserID && _this5.loggedInUser.scope === 'admin') {
          canDelete = true;
        }
        _this5.viewedUser.canDelete = canDelete;

        console.log(foundUser);
      }).catch(function (err) {
        console.log('viewedUser not found');
        console.log(err);
      });
    };

    User.prototype.goToTimeline = function goToTimeline(userID) {
      this.router.navigateToRoute('userTimeline', { id: userID });
    };

    return User;
  }()) || _class);
});
define('viewmodels/userTimeline/userTimeline',['exports', 'aurelia-framework', '../../services/zwitscher-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _zwitscherService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserTimeline = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var UserTimeline = exports.UserTimeline = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function UserTimeline(zs, ea) {
      _classCallCheck(this, UserTimeline);

      this.timelineOptions = {};

      this.zwitscherService = zs;
      this.eventAgregator = ea;

      this.timelineOptions.src = 'userTimeline';
    }

    UserTimeline.prototype.activate = function activate(payload) {
      if (payload && payload.id) {
        this.timelineOptions.viewedUserID = payload.id;
      } else {
        this.timelineOptions.viewedUserID = this.zwitscherService.loggedInUser._id;
      }
    };

    return UserTimeline;
  }()) || _class);
});
define('viewmodels/users/users',['exports', 'aurelia-framework', '../../services/zwitscher-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _zwitscherService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GlobalTimeline = undefined;

  var _zwitscherService2 = _interopRequireDefault(_zwitscherService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var GlobalTimeline = exports.GlobalTimeline = (_dec = (0, _aureliaFramework.inject)(_zwitscherService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function GlobalTimeline(zs, ea) {
      _classCallCheck(this, GlobalTimeline);

      this.users = [];
      this.loggedInUser = {};
      this.eventSubscriptions = [];

      this.zwitscherService = zs;
      this.eventAgregator = ea;
      this.loggedInUser = this.zwitscherService.loggedInUser;
    }

    GlobalTimeline.prototype.attached = function attached() {
      var _this = this;

      this.eventSubscriptions = [];
      this.eventSubscriptions.push(this.eventAgregator.subscribe(_messages.UsersChanged, function (msg) {
        _this.refreshUsers();
      }));
      this.refreshUsers();
    };

    GlobalTimeline.prototype.detached = function detached() {
      this.eventSubscriptions.forEach(function (event) {
        event.dispose();
      });
    };

    GlobalTimeline.prototype.refreshUsers = function refreshUsers() {
      var _this2 = this;

      this.zwitscherService.getUsers().then(function (foundUsers) {
        _this2.users = foundUsers;
      }).catch(function (err) {
        console.log('error while searching for users');
      });
    };

    return GlobalTimeline;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n  <div class=\"ui container page-host\">\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n  <div class=\"ui container page-host\">\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <nav class=\"ui secondary pointing brown menu\">\n    <header class=\"header item\">\n      <a href=\"https://christoph-rgb.github.io/zwitscher-client-hosted\">\n        <!--<img class=\"ui mini image\" src=\"/src/assets/images/zwitscherIcons/zwitscher_48_48.png\">-->\n        <img class=\"ui mini image\" src=\"https://firebasestorage.googleapis.com/v0/b/glowing-fire-9226.appspot.com/o/icons%2Fzwitscher_48_48.png?alt=media&token=db487f21-79ab-4dc6-b6d1-929acd478fdf\">\n      </a>\n    </header>\n    <div class=\"right menu\">\n      <div repeat.for=\"row of router.navigation\">\n        <a class=\"${row.isActive ? 'active' : ''} item\"  href.bind=\"row.href\">${row.title}</a>\n      </div>\n    </div>\n  </nav>\n  <div class=\"ui hidden divider\"></div>\n</template>\n"; });
define('text!viewmodels/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui stackable basic two column grid segment\">\n    <div class=\"ui grid column\">\n      <compose view-model=\"../timeline/timeline\" model.bind=\"timelineOptions\" containerless></compose>\n    </div>\n    <div class=\"ui centered grid column\">\n      <div class=\"ui grid row\">\n        <compose class=\"column\" view-model=\"../settings/settings\" containerless></compose>\n      </div>\n      <div class=\"ui grid row\">\n        <compose class=\"ui grid column\" view-model=\"../users/users\" containerless></compose>\n      </div>\n      <div class=\"ui grid row\">\n        <compose class=\"ui fluid grid column\" view-model=\"../socialGraph/socialGraph\" containerless></compose>\n      </div>\n    </div>\n  </section>\n</template>\n"; });
define('text!viewmodels/globalTimeline/globalTimeline.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui centered stackable grid\">\n    <div class=\"ui eleven wide stacked column\">\n      <compose view-model=\"../timeline/timeline\" model.bind=\"timelineOptions\" ></compose>\n    </div>\n\n    <div class=\"ui four wide column\">\n      <compose view-model=\"../user/user\" model.bind=\"timelineOptions.viewedUserID\" ></compose>\n    </div>\n  </section>\n</template>\n"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<!--<template>-->\n\n  <!--<form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\">-->\n    <!--<h3 class=\"ui header\">Are you sure you want to log out?</h3>-->\n    <!--<button class=\"ui brown submit button\">Logout</button>-->\n  <!--</form>-->\n\n<!--</template>-->\n\n<template>\n  <section class=\"ui basic segment\">\n    <div class=\"ui middle aligned center aligned grid\">\n      <aside class=\"ui six wide column\">\n        <!--<img src=\"/src/assets/images/zwitscherIcons/zwitscher_512_512.png\" class=\"ui medium image\">-->\n        <img src=\"https://firebasestorage.googleapis.com/v0/b/glowing-fire-9226.appspot.com/o/icons%2Fzwitscher_512_512.png?alt=media&token=95f22323-83e5-4ff1-8a2e-6edae8bb1d0b\" class=\"ui medium image\">\n      </aside>\n      <form submit.delegate=\"logout($event)\" class=\"ui six wide column fluid form\">\n        <div class=\"ui stacked segment\">\n          <h3 class=\"ui header\">Are you sure you want to log out?</h3>\n          <button class=\"ui brown submit button\">Logout</button>\n        </div>\n      </form>\n    </div>\n  </section>\n</template>\n\n"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui basic segment\">\n    <div class=\"ui middle aligned center aligned grid\">\n      <aside class=\"ui six wide column\">\n        <!--<img src=\"/src/assets/images/zwitscherIcons/zwitscher_512_512.png\" class=\"ui medium image\">-->\n        <img src=\"https://firebasestorage.googleapis.com/v0/b/glowing-fire-9226.appspot.com/o/icons%2Fzwitscher_512_512.png?alt=media&token=95f22323-83e5-4ff1-8a2e-6edae8bb1d0b\" class=\"ui medium image\">\n      </aside>\n      <form class=\"ui six wide column fluid form\" id=\"loginForm\">\n        <div class=\"ui stacked segment\">\n          <h3 class=\"ui header\">Log-in</h3>\n          <div class=\"field\">\n            <label>Email</label> <input placeholder=\"Email\" name=\"email\" value.bind=\"email\"/>\n          </div>\n          <div class=\"field\">\n            <label>Password</label> <input placeholder=\"Password\" name=\"password\" type=\"password\" value.bind=\"password\"/>\n          </div>\n          <button class=\"ui brown button\">Login</button>\n          <h3>${prompt}</h3>\n        </div>\n      </form>\n    </div>\n  </section>\n</template>\n"; });
define('text!viewmodels/settings/settings.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui basic segment\">\n      <form class=\"ui eight wide column fluid form\" id=\"settingsForm\">\n        <div class=\"ui middle aligned center aligned grid\">\n          <aside class=\"ui eight wide column\">\n            <img src=\"${loggedInUser.profilePicture}\" class=\"ui centered medium image\">\n          </aside>\n          <div class=\"ui center aligned middle aligned stacked segment\">\n            <h3 class=\"ui header\">Account Settings</h3>\n            <div class=\"two fields\">\n              <div class=\"field\">\n                <label>First Name</label>\n                <input placeholder=\"First Name\" name=\"firstName\" type=\"text\" value.bind=\"loggedInUser.firstName\">\n              </div>\n              <div class=\"field\">\n                <label>Last Name</label>\n                <input placeholder=\"Last Name\" name=\"lastName\" type=\"text\" value.bind=\"loggedInUser.lastName\">\n              </div>\n            </div>\n            <div class=\"field\">\n              <label>Gender</label>\n              <select class=\"ui dropdown\" name=\"gender\" value.bind=\"loggedInUser.gender\">\n                <option value=\"M\">male</option>\n                <option value=\"W\">female</option>\n              </select>\n            </div>\n            <div class=\"field\">\n              <label>Email</label>\n              <input placeholder=\"Email\" name=\"email\" type=\"text\" value.bind=\"loggedInUser.email\">\n            </div>\n            <div class=\"field\">\n              <label>Old Password</label>\n              <input placeholder=\"Password\" name=\"oldPassword\" type=\"password\" value.bind=\"loggedInUser.oldPassword\">\n            </div>\n\n            <h4 class=\"ui dividing header\">\n              optional\n            </h4>\n\n            <div class=\"field\">\n              <label>New Password</label>\n              <input placeholder=\"New Password\" name=\"password\" type=\"password\" value.bind=\"loggedInUser.password\">\n            </div>\n            <div class=\"field\">\n              <label>Confirm New Password</label>\n              <input placeholder=\"Confirm New Password\" name=\"passwordConfirm\" type=\"password\" value.bind=\"loggedInUser.passwordConfirm\">\n            </div>\n            <button class=\"ui brown button\">Update</button>\n          </div>\n        </div>\n\n\n      </form>\n    <!--</div>-->\n  </section>\n</template>\n"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui basic segment\">\n    <div class=\"ui middle aligned center aligned grid\">\n      <aside class=\"ui six wide column\">\n        <!--<img src=\"/src/assets/images/zwitscherIcons/zwitscher_512_512.png\" class=\"ui medium image\">-->\n        <img src=\"https://firebasestorage.googleapis.com/v0/b/glowing-fire-9226.appspot.com/o/icons%2Fzwitscher_512_512.png?alt=media&token=95f22323-83e5-4ff1-8a2e-6edae8bb1d0b\" class=\"ui medium image\">\n      </aside>\n      <form class=\"ui six wide column fluid form\" id=\"signupForm\">\n        <div class=\"ui stacked segment\">\n          <h3 class=\"ui header\">Register</h3>\n          <div class=\"two fields\">\n            <div class=\"field\">\n              <label>First Name</label>\n              <input placeholder=\"First Name\" name=\"firstName\" type=\"text\" value.bind=\"firstName\">\n            </div>\n            <div class=\"field\">\n              <label>Last Name</label>\n              <input placeholder=\"Last Name\" name=\"lastName\" type=\"text\" value.bind=\"lastName\">\n            </div>\n          </div>\n          <div class=\"field\">\n            <label>Gender</label>\n            <select class=\"ui dropdown\" name=\"gender\" value.bind=\"gender\">\n              <option value=\"M\">male</option>\n              <option value=\"W\">female</option>\n            </select>\n          </div>\n          <div class=\"field\">\n            <label>Email</label>\n            <input placeholder=\"Email\" name=\"email\" type=\"text\" value.bind=\"email\">\n          </div>\n          <div class=\"field\">\n            <label>Password</label>\n            <input placeholder=\"Password\" name=\"password\" type=\"password\" value.bind=\"password\">\n          </div>\n          <div class=\"field\">\n            <label>Confirm Password</label>\n            <input placeholder=\"Confirm Password\" name=\"passwordConfirm\" type=\"password\">\n          </div>\n          <button class=\"ui brown button\">Register</button>\n        </div>\n      </form>\n    </div>\n  </section>\n</template>\n"; });
define('text!viewmodels/postTweet/postTweet.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ui fluid raised card\">\n    <form class=\"ui form\" id=\"tweetForm\" enctype='multipart/form-data'>\n      <div class=\"ui fluid raised card\">\n        <div if.bind=\"errorMessage.show\" class=\"extra content\">\n          <div class=\"ui negative message transition\">\n            <i class=\"close icon\" click.delegate=\"hideErrorMessage()\"></i>\n            <div class=\"header\">\n              ${errorMessage.message}\n            </div>\n          </div>\n        </div>\n        <div class=\"extra content\">\n          <div class=\"left floated author\">\n            <img class=\"ui avatar image\" src=\"${loggedInUser.profilePicture}\"> ${loggedInUser.firstName} ${loggedInUser.lastName}\n          </div>\n          <div class=\"right floated\">\n            <div class=\"ui icon button\" id=\"camerabutton\">\n              <i class=\"camera icon\"></i></div>\n            <button class=\"ui brown button\">Post</button>\n          </div>\n        </div>\n        <div class=\"ui content\">\n          <div class=\"description\">\n            <div class=\"ui basic segment\" id=\"imageSegment\" style=\"display:none\">\n              <img class=\"ui fluid rounded image\" id=\"imagePreview\" src=\"\">\n            </div>\n            <div class=\"field\">\n              <input type=\"text\" name=\"tweetMessage\" placeholder=\"Share your thoughts\" value.bind=\"tweetMessage\">\n            </div>\n            <div class=\"field\">\n              <input type=\"file\" name=\"tweetImage\" id=\"fileInput\" accept=\"image/*\" files.bind=\"tweetImage\"  style=\"display:none\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </form>\n  </div>\n</template>\n"; });
define('text!viewmodels/socialGraph/socialGraph.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    .links line {\n      stroke: #999;\n      stroke-opacity: 0.6;\n    }\n    .nodes circle {\n      stroke: #fff;\n      stroke-width: 5px;\n    }\n  </style>\n\n  <div class=\"ui basic center aligned segment\" id=\"graphContainer\">\n    <h2 class=\"ui header\">Social Graph</h2>\n    <div id=\"graph\"></div>\n  </div>\n</template>\n"; });
define('text!viewmodels/userTimeline/userTimeline.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui centered stackable grid\">\n    <div class=\"ui eleven wide stacked column\">\n      <compose view-model=\"../timeline/timeline\" model.bind=\"timelineOptions\" ></compose>\n    </div>\n\n    <div class=\"ui four wide column\">\n      <compose view-model=\"../user/user\" model.bind=\"timelineOptions.viewedUserID\" ></compose>\n    </div>\n  </section>\n</template>\n"; });
define('text!viewmodels/reload/reload.html', ['module'], function(module) { module.exports = "<template></template>\n"; });
define('text!viewmodels/users/users.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"ui centered stackable grid\">\n    <!--<div class=\"ui eleven wide stacked column\">-->\n      <div class=\"ui three stackable cards\">\n        <compose repeat.for=\"user of users\" view-model=\"../user/user\" model.bind=\"user._id\" containerless></compose>\n      </div>\n    <!--</div>-->\n\n    <!--{{#if isAdmin}}-->\n    <!--<div class=\"ui four wide stacked column\">-->\n      <!--<div class=\"ui stackable cards\">-->\n        <!--{{> userButtonsCard }}-->\n        <!--{{> deleteCard }}-->\n      <!--</div>-->\n    <!--</div>-->\n    <!--{{/if}}-->\n  </section>\n</template>\n"; });
define('text!viewmodels/timeline/timeline.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ui fluid stackable cards\">\n    <compose if.bind=\"loggedInUser._id === timelineUser._id\" view-model=\"../postTweet/postTweet\" containerless></compose>\n\n    <div if.bind=\"loggedInUser._id === timelineUser._id || loggedInUser.scope === 'admin'\" class=\"ui fluid raised card\">\n      <div class=\"extra content\">\n        <div class=\"ui right floated\">\n          <button if.bind=\"!bulkDeleteActive\" class=\"ui basic brown item button\" click.delegate=\"deleteAllUserTweets(timelineUser._id)\">\n            <i class=\"trash icon\"></i>\n            Delete All Tweets\n          </button>\n          <button if.bind=\"!bulkDeleteActive\" class=\"ui basic brown item button\" click.delegate=\"showOrHideEditItems()\">\n            <i class=\"configure icon\"></i>\n            Edit Items\n          </button>\n          <div if.bind=\"bulkDeleteActive\" class=\"ui two buttons\">\n            <button id=\"deleteSelectedButton\" class=\"ui basic red button\" click.delegate=\"deleteMultipleTweets()\">Delete</button>\n            <button id=\"deleteSelectedCancelButton\" class=\"ui basic grey button\" click.delegate=\"showOrHideEditItems()\">Cancel</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div repeat.for=\"tweet of tweets\" class=\"ui fluid raised card\">\n      <div if.bind=\"tweet.canDelete && bulkDeleteActive\" class=\"extra content\">\n        <div class=\"right floated\">\n          <div class=\"field\">\n            <div class=\"ui toggle checkbox\">\n              <input class=\"deleteCheckbox\" type=\"checkbox\" checked.bind=\"tweet.checkedForDelete\">\n              <label>Delete</label>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"extra content\">\n        <div class=\"left floated author\">\n          <img class=\"ui avatar image\" src=\"${tweet.user.profilePicture}\"> ${tweet.user.firstName} ${tweet.user.lastName}\n        </div>\n        <div class=\"right floated\">\n          posted on ${tweet.postedString}\n        </div>\n      </div>\n      <div class=\"content\">\n        <div if.bind=\"tweet.imagePath\" class=\"ui basic segment\">\n          <img class=\"ui fluid rounded image\" src=\"${tweet.imagePath}\">\n        </div>\n        <div class=\"description\">\n          <p>${tweet.message}</p>\n        </div>\n      </div>\n      <div if.bind=\"tweet.canDelete\" class=\"extra content\">\n        <div class=\"right floated trash icon\">\n          <form submit.trigger=\"deleteTweet(tweet._id)\" class=\"ui form\">\n            <button class=\"ui basic brown compact icon submit button\">\n              <i class=\"trash icon\"></i>\n            </button>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!viewmodels/user/user.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"ui raised card\">\n    <!--<div if.bind=\"canDelete\" class=\"extra content deleteSelector\" style=\"display:none\">-->\n      <!--<div class=\"right floated\">-->\n        <!--<div class=\"field\">-->\n          <!--<div class=\"ui toggle checkbox\">-->\n            <!--<input id=\"{{_id}}\" class=\"deleteCheckbox\" type=\"checkbox\" name=\"test\">-->\n            <!--<label>Delete</label>-->\n          <!--</div>-->\n        <!--</div>-->\n      <!--</div>-->\n    <!--</div>-->\n    <a class=\"image\">\n      <img class=\"ui image\" src=\"${viewedUser.profilePicture}\" click.delegate=\"goToTimeline(viewedUser._id)\">\n    </a>\n    <div class=\"content\">\n      <div class=\"header\">${viewedUser.firstName} ${viewedUser.lastName}</div>\n      <div class=\"description\">\n        joined ${viewedUser.joinedString}\n      </div>\n    </div>\n    <div class=\"extra content\">\n      <div if.bind=\"viewedUser.canFollow\" class=\"left floated\">\n        <i if.bind=\"viewedUser.isFollowing\" click.delegate=\"unfollowUser(viewedUser._id)\" class=\"yellow star icon\"></i>\n        <i if.bind=\"!viewedUser.isFollowing\" click.delegate=\"followUser(viewedUser._id)\" class=\"empty star icon followIcon\"></i>\n      </div>\n      <div class=\"right floated\">\n        ${viewedUser.tweetCount}\n        <i class=\"comments icon\"></i>\n      </div>\n      <div class=\"right floated\">\n        ${viewedUser.follows.length}\n        <i class=\"spy icon\"></i>\n      </div>\n      <!--<div class=\"right floated\">-->\n        <!--${viewedUser.followerCount}-->\n        <!--<i class=\"users icon\"></i>-->\n      <!--</div>-->\n    </div>\n    <div if.bind=\"viewedUser.canDelete\" class=\"extra content\">\n      <div class=\"right floated trash icon\">\n        <!--<form class=\"ui form\" action=\"/users/removeUser\" method=\"post\">-->\n          <!--<input type=\"hidden\" name=\"viewedUserID\" value=\"{{_id}}\">-->\n          <button click.delegate=\"removeUser(viewedUser._id)\" class=\"ui basic brown compact icon button\">\n            <i class=\"trash icon\"></i>\n          </button>\n        <!--</form>-->\n      </div>\n    </div>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map