
/* Facebook object */
Socialmedia.Facebook = function(settings) {
  this.appid = settings.appid || '';
  this.status = settings.status || false;
  this.xfbml = settings.xfbml || true;
  this.cookie = settings.cookie || true;
  this.requests = settings.requests || false;
  this.version = settings.version || '';
  this.debug = settings.debug || false;
  this.callback = settings.callback || function() {};
  this.init();
};

Socialmedia.Facebook.prototype.init = function() {
  var _this;
  _this = this;
  window.fbAsyncInit = function() {
    FB.init({
      appId: _this.appid,
      status: _this.status,
      cookie: _this.cookie,
      xfbml: _this.xfbml,
      version: _this.version,
      frictionlessRequests: _this.requests
    });

    /* Setup FB SDK script source */
    _this.fbsdk = document.getElementById('#facebook-jssdk');

    /* Append app_id to fbsdk source */
    if (_this.fbsdk != null) {
      _this.fbsdk.src += '#xfbml=1&appId=' + _this.appid;
    }

    /* Async callback function */
    if (_this.callback != null) {
      FB.getLoginStatus(_this.callback);
    }
  };

  /* Move the auto-generated fb-root DOM element to appropriate position */
  if (typeof addEventListener !== "undefined" && addEventListener !== null) {
    window.addEventListener('load', function() {
      document.body.appendChild(document.getElementById('fb-root'));
    });
  } else if (typeof attachEvent !== "undefined" && attachEvent !== null) {
    window.attachEvent('onload', function() {
      document.body.appendChild(document.getElementById('fb-root'));
    });
  }

  /* Load the Facebook JavaScript SDK */
  return (function(doc, dev, tag, id, ver) {
    var fbdiv, ref, sdk;
    if (doc.getElementById(id)) {
      return;
    }
    sdk = doc.createElement(tag);
    sdk.id = id;
    sdk.async = true;
    if (dev) {
      if ((ver != null) && ver === 'v2.0') {
        sdk.src = Socialmedia.SDK.facebook_debugv2;
      } else {
        sdk.src = Socialmedia.SDK.facebook_debug;
      }
    } else {
      if ((ver != null) && ver === 'v2.0') {
        sdk.src = Socialmedia.SDK.facebookv2;
      } else {
        sdk.src = Socialmedia.SDK.facebook;
      }
    }
    fbdiv = doc.createElement('div');
    fbdiv.id = 'fb-root';
    ref = doc.getElementsByTagName(tag)[0];
    ref.parentNode.insertBefore(fbdiv, ref);
    ref.parentNode.insertBefore(sdk, ref);
  })(document, _this.debug, 'script', 'facebook-jssdk', _this.version);
};


/* Facebook canvas setsize function */

Socialmedia.Facebook.prototype.setSize = function(settings) {
  if ((settings != null) && settings.width || settings.height) {
    return FB.Canvas.setSize({
      width: parseInt(settings.width) || 810,
      height: parseInt(settings.height) || 800
    });
  } else {
    return FB.Canvas.setSize();
  }
};


/* Facebook canvas autogrow function */

Socialmedia.Facebook.prototype.autogrow = function(settings) {
  if (settings == null) {
    settings = true;
  }
  return FB.Canvas.setAutoGrow(settings);
};


/* Facebook canvas scroll function */

Socialmedia.Facebook.prototype.scroll = function(settings) {
  var x, y;
  if (settings == null) {
    settings = {};
  }
  x = settings.x || 0;
  y = settings.y || 0;
  if (x && y) {
    return FB.Canvas.scrollTo(x, y);
  } else {
    return false;
  }
};


/* Facebook share function */

Socialmedia.Facebook.prototype.Share = function(options) {
  if (options == null) {
    options = {};
  }
  return FB.ui({
    method: 'feed',
    name: options.title || '',
    link: options.link || '',
    picture: options.image || '',
    caption: options.caption || '',
    description: options.description || ''
  }, function(response) {
    var _ref, _ref1;
    if (response != null) {
      if (options.onSuccess != null) {
        return (_ref = options.onSuccess) != null ? _ref.call(this, response) : void 0;
      } else if (options.onFail != null) {
        return (_ref1 = options.onFail) != null ? _ref1.call(this, response) : void 0;
      }
    } else {
      return false;
    }
  });
};


/* Facebook invite function */

Socialmedia.Facebook.prototype.Invite = function(options) {
  if (options == null) {
    options = {};
  }
  return FB.ui({
    method: 'apprequests',
    title: options.title || '',
    message: options.message || '',
    to: options.to || [],
    exclude_ids: options.exclude_ids || [],
    max_recipients: options.max_to || 100,
    data: options.data || {}
  }, function(response) {
    var _ref;
    if (response != null) {
      return (_ref = options.callback) != null ? _ref.call(this, response) : void 0;
    } else {
      return false;
    }
  });
};


/* Facebook add to page tab function */

Socialmedia.Facebook.prototype.AddToPage = function() {
  return FB.ui({
    method: 'pagetab'
  }, function() {});
};


/* Facebook add friend function */

Socialmedia.Facebook.prototype.AddFriend = function(options) {
  if (options == null) {
    options = {};
  }
  return FB.ui({
    method: 'friends',
    id: options.id || 'jabranr'
  }, function(response) {
    var _ref;
    if (response != null) {
      return (_ref = options.callback) != null ? _ref.call(this, response.action) : void 0;
    } else {
      return false;
    }
  });
};


/* Facebook send function */

Socialmedia.Facebook.prototype.Send = function(options) {
  if (options == null) {
    options = {};
  }
  return FB.ui({
    method: 'send',
    link: options.link || window.location.href
  });
};


/* Facebook pay function */

Socialmedia.Facebook.prototype.Pay = function(options) {
  if (options == null) {
    options = {};
  }
  return FB.ui({
    method: 'pay',
    action: 'purchaseitem',
    product: options.link || window.location.href
  }, function(data) {
    var _ref;
    if (data != null) {
      return (options != null) && ((_ref = options.callback) != null ? _ref.call(this, data) : void 0);
    } else {
      return false;
    }
  });
};
