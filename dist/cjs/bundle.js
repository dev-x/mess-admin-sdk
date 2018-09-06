'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sails_io = createCommonjsModule(function (module) {
  //////////////////////////////////////////////////////////////////////////////////////
  //                                                                                //
  //  ███████╗ █████╗ ██╗██╗     ███████╗   ██╗ ██████╗         ██╗███████╗         //
  //  ██╔════╝██╔══██╗██║██║     ██╔════╝   ██║██╔═══██╗        ██║██╔════╝         //
  //  ███████╗███████║██║██║     ███████╗   ██║██║   ██║        ██║███████╗         //
  //  ╚════██║██╔══██║██║██║     ╚════██║   ██║██║   ██║   ██   ██║╚════██║         //
  //  ███████║██║  ██║██║███████╗███████║██╗██║╚██████╔╝██╗╚█████╔╝███████║         //
  //  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚═╝╚═╝ ╚═════╝ ╚═╝ ╚════╝ ╚══════╝         //
  //                                                                                //
  //   ╦╔═╗╦  ╦╔═╗╔═╗╔═╗╦═╗╦╔═╗╔╦╗  ╔═╗╦  ╦╔═╗╔╗╔╔╦╗  ╔═╗╔╦╗╦╔═                     //
  //   ║╠═╣╚╗╔╝╠═╣╚═╗║  ╠╦╝║╠═╝ ║   ║  ║  ║║╣ ║║║ ║   ╚═╗ ║║╠╩╗                     //
  //  ╚╝╩ ╩ ╚╝ ╩ ╩╚═╝╚═╝╩╚═╩╩   ╩   ╚═╝╩═╝╩╚═╝╝╚╝ ╩   ╚═╝═╩╝╩ ╩                     //
  //  ┌─┐┌─┐┬─┐  ┌┐┌┌─┐┌┬┐┌─┐  ┬┌─┐  ┌─┐┌┐┌┌┬┐  ┌┬┐┬ ┬┌─┐  ┌┐ ┬─┐┌─┐┬ ┬┌─┐┌─┐┬─┐    //
  //  ├┤ │ │├┬┘  ││││ │ ││├┤   │└─┐  ├─┤│││ ││   │ ├─┤├┤   ├┴┐├┬┘│ ││││└─┐├┤ ├┬┘    //
  //  └  └─┘┴└─  ┘└┘└─┘─┴┘└─┘o└┘└─┘  ┴ ┴┘└┘─┴┘   ┴ ┴ ┴└─┘  └─┘┴└─└─┘└┴┘└─┘└─┘┴└─    //
  //                                                                                //
  //////////////////////////////////////////////////////////////////////////////////////

  /**
   * sails.io.js
   * ------------------------------------------------------------------------
   * JavaScript Client (SDK) for communicating with Sails.
   *
   * Note that this script is completely optional, but it is handy if you're
   * using WebSockets from the browser to talk to your Sails server.
   *
   * For tips and documentation, visit:
   * http://sailsjs.com/documentation/reference/web-sockets/socket-client
   * ------------------------------------------------------------------------
   *
   * This file allows you to send and receive socket.io messages to & from Sails
   * by simulating a REST client interface on top of socket.io. It models its API
   * after the $.ajax pattern from jQuery you might already be familiar with.
   *
   * So if you're switching from using AJAX to sockets, instead of:
   *    `$.post( url, [data], [cb] )`
   *
   * You would use:
   *    `socket.post( url, [data], [cb] )`
   */

  (function () {

    //   ██████╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ███╗   ██╗████████╗███████╗
    //  ██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗████╗  ██║╚══██╔══╝██╔════╝
    //  ██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ███████║██╔██╗ ██║   ██║   ███████╗
    //  ██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║██║╚██╗██║   ██║   ╚════██║
    //  ╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║██║ ╚████║   ██║   ███████║
    //   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
    //


    /**
     * Constant containing the names of all available options
     * for individual sockets.
     *
     * @type {Array}
     */
    var SOCKET_OPTIONS = ['useCORSRouteToGetCookie', 'url', 'multiplex', 'transports', 'query', 'path', 'headers', 'initialConnectionHeaders', 'reconnection', 'reconnectionAttempts', 'reconnectionDelay', 'reconnectionDelayMax', 'rejectUnauthorized', 'randomizationFactor', 'timeout'];

    /**
     * Constant containing the names of properties on `io.sails` which
     * may be configured using HTML attributes on the script tag which
     * loaded this file.
     *
     * @type {Array}
     *
     * (this is unused if loading from node.js)
     */
    var CONFIGURABLE_VIA_HTML_ATTR = ['autoConnect', 'reconnection', 'environment', 'headers', 'url', 'transports', 'path'];

    /**
     * Constant containing the names of querystring
     * parameters sent when connecting any SailsSocket.
     *
     * @type {Dictionary}
     */
    var CONNECTION_METADATA_PARAMS = {
      version: '__sails_io_sdk_version',
      platform: '__sails_io_sdk_platform',
      language: '__sails_io_sdk_language'
    };

    /**
     * Constant containing metadata about the platform, language, and
     * current version of this SDK.
     *
     * @type {Dictionary}
     */
    var SDK_INFO = {
      version: '1.2.1', // <-- pulled automatically from package.json, do not change!
      language: 'javascript',
      platform: function () {
        {
          return 'node';
        }
      }()
    };

    // Build `versionString` (a querystring snippet) by
    // combining SDK_INFO and CONNECTION_METADATA_PARAMS.
    SDK_INFO.versionString = CONNECTION_METADATA_PARAMS.version + '=' + SDK_INFO.version + '&' + CONNECTION_METADATA_PARAMS.platform + '=' + SDK_INFO.platform + '&' + CONNECTION_METADATA_PARAMS.language + '=' + SDK_INFO.language;

    //   █████╗ ██████╗ ███████╗ ██████╗ ██████╗ ██████╗     ██╗  ██╗████████╗███╗   ███╗██╗
    //  ██╔══██╗██╔══██╗██╔════╝██╔═══██╗██╔══██╗██╔══██╗    ██║  ██║╚══██╔══╝████╗ ████║██║
    //  ███████║██████╔╝███████╗██║   ██║██████╔╝██████╔╝    ███████║   ██║   ██╔████╔██║██║
    //  ██╔══██║██╔══██╗╚════██║██║   ██║██╔══██╗██╔══██╗    ██╔══██║   ██║   ██║╚██╔╝██║██║
    //  ██║  ██║██████╔╝███████║╚██████╔╝██║  ██║██████╔╝    ██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
    //  ╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝
    //
    //   █████╗ ████████╗████████╗██████╗ ██╗██████╗ ██╗   ██╗████████╗███████╗███████╗
    //  ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██║██╔══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
    //  ███████║   ██║      ██║   ██████╔╝██║██████╔╝██║   ██║   ██║   █████╗  ███████╗
    //  ██╔══██║   ██║      ██║   ██╔══██╗██║██╔══██╗██║   ██║   ██║   ██╔══╝  ╚════██║
    //  ██║  ██║   ██║      ██║   ██║  ██║██║██████╔╝╚██████╔╝   ██║   ███████╗███████║
    //  ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝
    //
    //  ███████╗██████╗  ██████╗ ███╗   ███╗      ██╗███████╗ ██████╗██████╗ ██╗██████╗ ████████╗██╗
    //  ██╔════╝██╔══██╗██╔═══██╗████╗ ████║     ██╔╝██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝╚██╗
    //  █████╗  ██████╔╝██║   ██║██╔████╔██║    ██╔╝ ███████╗██║     ██████╔╝██║██████╔╝   ██║    ╚██╗
    //  ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║    ╚██╗ ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║    ██╔╝
    //  ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║     ╚██╗███████║╚██████╗██║  ██║██║██║        ██║   ██╔╝
    //  ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝      ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚═╝
    //
    //
    // If available, grab the DOM element for the script tag which imported this file.
    // (skip this if this SDK is being used outside of the DOM, i.e. in a Node process)
    //
    // This is used below to parse client-side sails.io.js configuration encoded as
    // HTML attributes, as well as grabbing hold of the URL from whence the SDK was fetched.
    var thisScriptTag = function () {
      if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || _typeof(window.document) !== 'object' || typeof window.document.getElementsByTagName !== 'function') {
        return null;
      }

      // Return the URL of the last script loaded (i.e. this one)
      // (this must run before nextTick; see http://stackoverflow.com/a/2976714/486547)
      var allScriptsCurrentlyInDOM = window.document.getElementsByTagName('script');
      return allScriptsCurrentlyInDOM[allScriptsCurrentlyInDOM.length - 1];
    }();

    // Variables to contain src URL and other script tag config (for use below).
    var urlThisScriptWasFetchedFrom = '';
    var scriptTagConfig = {};

    if (thisScriptTag) {
      // Save the URL that this script was fetched from.
      urlThisScriptWasFetchedFrom = thisScriptTag.src;

      // Now parse the most common client-side configuration settings
      // from the script tag where they may be encoded as HTML attributes.
      //
      // Any configuration which may be provided as an HTML attribute may
      // also be provided prefixed with `data-`.  This is for folks who
      // need to support browsers that have issues with nonstandard
      // HTML attributes (or if the idea of using nonstandard HTML attributes
      // just creeps you out)
      //
      // If a `data-` prefixed attr is provided, it takes precedence.
      // (this is so that if you are already using one of these HTML
      //  attrs for some reason, you can keep it as-is and override
      //  it using `data-`. If you are using the `data-` prefixed version
      //  for some other purpose... well, in that case you'll just have to
      //  configure programmatically using `io.sails` instead.)
      CONFIGURABLE_VIA_HTML_ATTR.forEach(function (configKey) {

        scriptTagConfig[configKey] = function () {

          // Support 'data-' prefixed or normal attributes.
          // (prefixed versions take precedence if provided)
          var htmlAttrVal = thisScriptTag.getAttribute('data-' + configKey);
          if (!htmlAttrVal) {
            htmlAttrVal = thisScriptTag.getAttribute(configKey);
          }

          // The HTML attribute value should always be a string or `null`.
          // We'll try to parse it as JSON and use that, but worst case fall back
          // to the default situation of it being a string.
          if (typeof htmlAttrVal === 'string') {
            try {
              return JSON.parse(htmlAttrVal);
            } catch (e) {
              return htmlAttrVal;
            }
          }
          // If `null` was returned from getAttribute(), it means that the HTML attribute
          // was not specified, so we treat it as undefined (which will cause the property
          // to be removed below)
          else if (htmlAttrVal === null) {
              return undefined;
            }
            // Any other contingency shouldn't be possible:
            // - if no quotes are used in the HTML attribute, it still comes in as a string.
            // - if no RHS is provided for the attribute, it still comes in as "" (empty string)
            // (but we still handle this with an explicit error just in case--for debugging and support purposes)
            else throw new Error('sails.io.js :: Unexpected/invalid script tag configuration for `' + configKey + '`: `' + htmlAttrVal + '` (a `' + (typeof htmlAttrVal === 'undefined' ? 'undefined' : _typeof(htmlAttrVal)) + '`). Should be a string.');
        }();

        if (scriptTagConfig[configKey] === undefined) {
          delete scriptTagConfig[configKey];
        }
      });

      // Now that they've been parsed, do an extremely lean version of
      // logical type validation/coercion of provided values.
      //////////////////////////////////////////////////////////////////

      // `autoConnect`
      if (typeof scriptTagConfig.autoConnect !== 'undefined') {
        if (scriptTagConfig.autoConnect === '') {
          // Special case for empty string.  It means `true` (see above).
          scriptTagConfig.autoConnect = true;
        } else if (typeof scriptTagConfig.autoConnect !== 'boolean') {
          throw new Error('sails.io.js :: Unexpected/invalid configuration for `autoConnect` provided in script tag: `' + scriptTagConfig.autoConnect + '` (a `' + _typeof(scriptTagConfig.autoConnect) + '`). Should be a boolean.');
        }
      }

      // `environment`
      if (typeof scriptTagConfig.environment !== 'undefined') {
        if (typeof scriptTagConfig.environment !== 'string') {
          throw new Error('sails.io.js :: Unexpected/invalid configuration for `environment` provided in script tag: `' + scriptTagConfig.environment + '` (a `' + _typeof(scriptTagConfig.environment) + '`). Should be a string.');
        }
      }

      // `headers`
      if (typeof scriptTagConfig.headers !== 'undefined') {
        if (_typeof(scriptTagConfig.headers) !== 'object' || Array.isArray(scriptTagConfig.headers)) {
          throw new Error('sails.io.js :: Unexpected/invalid configuration for `headers` provided in script tag: `' + scriptTagConfig.headers + '` (a `' + _typeof(scriptTagConfig.headers) + '`). Should be a JSON-compatible dictionary (i.e. `{}`).  Don\'t forget those double quotes (""), even on key names!  Use single quotes (\'\') to wrap the HTML attribute value; e.g. `headers=\'{"X-Auth": "foo"}\'`');
        }
      }

      // `url`
      if (typeof scriptTagConfig.url !== 'undefined') {
        if (typeof scriptTagConfig.url !== 'string') {
          throw new Error('sails.io.js :: Unexpected/invalid configuration for `url` provided in script tag: `' + scriptTagConfig.url + '` (a `' + _typeof(scriptTagConfig.url) + '`). Should be a string.');
        }
      }

      // OTHER `io.sails` options are NOT CURRENTLY SUPPORTED VIA HTML ATTRIBUTES.
    }

    // Grab a reference to the global socket.io client (if one is available).
    // This is used via closure below to determine which `io` to use when the
    // socket.io client instance (`io`) is augmented to become the Sails client
    // SDK instance (still `io`).
    var _existingGlobalSocketIO = typeof io !== 'undefined' ? io : undefined;

    //////////////////////////////////////////////////////////////
    /////
    ///// NOW FOR BUNCHES OF:
    /////  - PRIVATE FUNCTION DEFINITIONS
    /////  - CONSTRUCTORS
    /////  - AND METHODS
    /////
    //////////////////////////////////////////////////////////////
    //


    //  ███████╗ █████╗ ██╗██╗     ███████╗      ██╗ ██████╗        ██████╗██╗     ██╗███████╗███╗   ██╗████████╗
    //  ██╔════╝██╔══██╗██║██║     ██╔════╝      ██║██╔═══██╗      ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝
    //  ███████╗███████║██║██║     ███████╗█████╗██║██║   ██║█████╗██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║
    //  ╚════██║██╔══██║██║██║     ╚════██║╚════╝██║██║   ██║╚════╝██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║
    //  ███████║██║  ██║██║███████╗███████║      ██║╚██████╔╝      ╚██████╗███████╗██║███████╗██║ ╚████║   ██║
    //  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝      ╚═╝ ╚═════╝        ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
    //

    /**
     * SailsIOClient()
     *
     * Augment the provided Socket.io client object (`io`) with methods for
     * talking and listening to one or more Sails backend(s).  If no `io` was
     * provided (i.e. in a browser setting), then attempt to use the global.
     *
     * This absorbs implicit `io.sails` configuration, sets a timer for
     * automatically connecting a socket (if `io.sails.autoConnect` is enabled)
     * and returns the augmented `io`.
     *
     * Note:
     * The automatically-connected socket is exposed as `io.socket`.  If this
     * socket attempts to bind event listeners or send requests before it is
     * connected, it will be queued up and replayed when the connection is
     * successfully opened.
     *
     * @param {SocketIO} io
     * @returns {SailsIOClient} [also called `io`]
     */

    function SailsIOClient(_providedSocketIO) {

      // First, determine which `io` we're augmenting.
      //
      // Prefer the passed-in `io` instance, but fall back to the
      // global one if we've got it.
      var io;
      if (_providedSocketIO) {
        io = _providedSocketIO;
      } else {
        io = _existingGlobalSocketIO;
      }
      // (note that for readability, we deliberately do not short circuit or use the tertiary operator above)


      // If a socket.io client (`io`) is not available, none of this will work.
      if (!io) {
        // If node:
        if (SDK_INFO.platform === 'node') {
          throw new Error('No socket.io client available.  When requiring `sails.io.js` from Node.js, a socket.io client (`io`) must be passed in; e.g.:\n```\nvar io = require(\'sails.io.js\')( require(\'socket.io-client\') )\n```\n(see https://github.com/balderdashy/sails.io.js/tree/master/test for more examples)');
        }
        // Otherwise, this is a web browser:
        else {
            throw new Error('The Sails socket SDK depends on the socket.io client, but the socket.io global (`io`) was not available when `sails.io.js` loaded.  Normally, the socket.io client code is bundled with sails.io.js, so something is a little off.  Please check to be sure this version of `sails.io.js` has the minified Socket.io client at the top of the file.');
          }
      }

      // If the chosen socket.io client (`io`) has ALREADY BEEN AUGMENTED by this SDK,
      // (i.e. if it already has a `.sails` property) then throw an error.
      if (io.sails) {
        // If node:
        if (SDK_INFO.platform === 'node') {
          throw new Error('The provided socket.io client (`io`) has already been augmented into a Sails socket SDK instance (it has `io.sails`).');
        }
        // Otherwise, this is a web browser:
        else {
            throw new Error('The socket.io client (`io`) has already been augmented into a Sails socket SDK instance.  Usually, this means you are bringing `sails.io.js` onto the page more than once.');
          }
      }

      /**
       * A little logger for this library to use internally.
       * Basically just a wrapper around `console.log` with
       * support for feature-detection.
       *
       * @api private
       * @factory
       */
      function LoggerFactory(options) {
        options = options || {
          prefix: true
        };

        // If `console.log` is not accessible, `log` is a noop.
        if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) !== 'object' || typeof console.log !== 'function' || typeof console.log.bind !== 'function') {
          return function noop() {};
        }

        return function log() {
          var args = Array.prototype.slice.call(arguments);

          // All logs are disabled when `io.sails.environment = 'production'`.
          if (io.sails.environment === 'production') return;

          // Add prefix to log messages (unless disabled)
          var PREFIX = '';
          if (options.prefix) {
            args.unshift(PREFIX);
          }

          // Call wrapped logger
          console.log.bind(console).apply(this, args);
        };
      } //</LoggerFactory>

      // Create a private logger instance
      var consolog = LoggerFactory();
      consolog.noPrefix = LoggerFactory({
        prefix: false
      });

      /**
       * What is the `requestQueue`?
       *
       * The request queue is used to simplify app-level connection logic--
       * i.e. so you don't have to wait for the socket to be connected
       * to start trying to  synchronize data.
       *
       * @api private
       * @param  {SailsSocket}  socket
       */

      function runRequestQueue(socket) {
        var queue = socket.requestQueue;

        if (!queue) return;
        for (var i in queue) {

          // Double-check that `queue[i]` will not
          // inadvertently discover extra properties attached to the Object
          // and/or Array prototype by other libraries/frameworks/tools.
          // (e.g. Ember does this. See https://github.com/balderdashy/sails.io.js/pull/5)
          var isSafeToDereference = {}.hasOwnProperty.call(queue, i);
          if (isSafeToDereference) {
            // Get the arguments that were originally made to the "request" method
            var requestArgs = queue[i];
            // Call the request method again in the context of the socket, with the original args
            socket.request.apply(socket, requestArgs);
          }
        }

        // Now empty the queue to remove it as a source of additional complexity.
        socket.requestQueue = null;
      }

      /**
       * Send a JSONP request.
       *
       * @param  {Object}   opts [optional]
       * @param  {Function} cb
       * @return {XMLHttpRequest}
       */

      function jsonp(opts, cb) {
        opts = opts || {};

        if (typeof window === 'undefined') {
          // FUTURE: refactor node usage to live in here
          return cb();
        }

        var scriptEl = document.createElement('script');
        window._sailsIoJSConnect = function (response) {
          // In rare circumstances our script may have been vaporised.
          // Remove it, but only if it still exists
          // https://github.com/balderdashy/sails.io.js/issues/92
          if (scriptEl && scriptEl.parentNode) {
            scriptEl.parentNode.removeChild(scriptEl);
          }

          cb(response);
        };
        scriptEl.src = opts.url;
        document.getElementsByTagName('head')[0].appendChild(scriptEl);
      }

      //       ██╗███████╗ ██████╗ ███╗   ██╗      ██╗    ██╗███████╗██████╗ ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
      //       ██║██╔════╝██╔═══██╗████╗  ██║      ██║    ██║██╔════╝██╔══██╗██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
      //       ██║███████╗██║   ██║██╔██╗ ██║█████╗██║ █╗ ██║█████╗  ██████╔╝███████╗██║   ██║██║     █████╔╝ █████╗     ██║
      //  ██   ██║╚════██║██║   ██║██║╚██╗██║╚════╝██║███╗██║██╔══╝  ██╔══██╗╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
      //  ╚█████╔╝███████║╚██████╔╝██║ ╚████║      ╚███╔███╔╝███████╗██████╔╝███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
      //   ╚════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝       ╚══╝╚══╝ ╚══════╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
      //
      //  ██████╗ ███████╗███████╗██████╗  ██████╗ ███╗   ██╗███████╗███████╗     ██╗     ██╗██╗    ██╗██████╗ ██╗
      //  ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔════╝██╔════╝    ██╔╝     ██║██║    ██║██╔══██╗╚██╗
      //  ██████╔╝█████╗  ███████╗██████╔╝██║   ██║██╔██╗ ██║███████╗█████╗      ██║      ██║██║ █╗ ██║██████╔╝ ██║
      //  ██╔══██╗██╔══╝  ╚════██║██╔═══╝ ██║   ██║██║╚██╗██║╚════██║██╔══╝      ██║ ██   ██║██║███╗██║██╔══██╗ ██║
      //  ██║  ██║███████╗███████║██║     ╚██████╔╝██║ ╚████║███████║███████╗    ╚██╗╚█████╔╝╚███╔███╔╝██║  ██║██╔╝
      //  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝     ╚═╝ ╚════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝
      //

      /**
       * The JWR (JSON WebSocket Response) received from a Sails server.
       *
       * @api public
       * @param  {Object}  responseCtx
       *         => :body
       *         => :statusCode
       *         => :headers
       *
       * @constructor
       */

      function JWR(responseCtx) {
        this.body = responseCtx.body;
        this.headers = responseCtx.headers || {};
        this.statusCode = typeof responseCtx.statusCode === 'undefined' ? 200 : responseCtx.statusCode;
        // FUTURE: Replace this typeof short-circuit with an assertion (statusCode should always be set)

        if (this.statusCode < 200 || this.statusCode >= 400) {
          // Determine the appropriate error message.
          var msg;
          if (this.statusCode === 0) {
            msg = 'The socket request failed.';
          } else {
            msg = 'Server responded with a ' + this.statusCode + ' status code';
            msg += ':\n```\n' + JSON.stringify(this.body, null, 2) + '\n```';
            // (^^Note that we should always be able to rely on socket.io to give us
            // non-circular data here, so we don't have to worry about wrapping the
            // above in a try...catch)
          }

          // Now build and attach Error instance.
          this.error = new Error(msg);
        }
      }
      JWR.prototype.toString = function () {
        return '[ResponseFromSails]' + '  -- ' + 'Status: ' + this.statusCode + '  -- ' + 'Headers: ' + this.headers + '  -- ' + 'Body: ' + this.body;
      };
      JWR.prototype.toPOJO = function () {
        return {
          body: this.body,
          headers: this.headers,
          statusCode: this.statusCode
        };
      };
      JWR.prototype.pipe = function () {
        // FUTURE: look at substack's stuff
        return new Error('Client-side streaming support not implemented yet.');
      };

      //          ███████╗███╗   ███╗██╗████████╗███████╗██████╗  ██████╗ ███╗   ███╗ ██╗██╗
      //          ██╔════╝████╗ ████║██║╚══██╔══╝██╔════╝██╔══██╗██╔═══██╗████╗ ████║██╔╝╚██╗
      //          █████╗  ██╔████╔██║██║   ██║   █████╗  ██████╔╝██║   ██║██╔████╔██║██║  ██║
      //          ██╔══╝  ██║╚██╔╝██║██║   ██║   ██╔══╝  ██╔══██╗██║   ██║██║╚██╔╝██║██║  ██║
      //  ███████╗███████╗██║ ╚═╝ ██║██║   ██║   ██║     ██║  ██║╚██████╔╝██║ ╚═╝ ██║╚██╗██╔╝
      //  ╚══════╝╚══════╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝ ╚═╝╚═╝
      //

      /**
       * @api private
       * @param  {SailsSocket} socket  [description]
       * @param  {Object} requestCtx [description]
       */

      function _emitFrom(socket, requestCtx) {

        if (!socket._raw) {
          throw new Error('Failed to emit from socket- raw SIO socket is missing.');
        }

        // Since callback is embedded in requestCtx,
        // retrieve it and delete the key before continuing.
        var cb = requestCtx.cb;
        delete requestCtx.cb;

        // Name of the appropriate socket.io listener on the server
        // ( === the request method or "verb", e.g. 'get', 'post', 'put', etc. )
        var sailsEndpoint = requestCtx.method;

        socket._raw.emit(sailsEndpoint, requestCtx, function serverResponded(responseCtx) {

          // Send back (emulatedHTTPBody, jsonWebSocketResponse)
          if (cb && !requestCtx.calledCb) {
            cb(responseCtx.body, new JWR(responseCtx));
            // Set flag indicating that callback was called, to avoid duplicate calls.
            requestCtx.calledCb = true;
            // Remove the callback from the list.
            socket._responseCbs.splice(socket._responseCbs.indexOf(cb), 1);
            // Remove the context from the list.
            socket._requestCtxs.splice(socket._requestCtxs.indexOf(requestCtx), 1);
          }
        });
      }

      //  ███████╗ █████╗ ██╗██╗     ███████╗███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
      //  ██╔════╝██╔══██╗██║██║     ██╔════╝██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
      //  ███████╗███████║██║██║     ███████╗███████╗██║   ██║██║     █████╔╝ █████╗     ██║
      //  ╚════██║██╔══██║██║██║     ╚════██║╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
      //  ███████║██║  ██║██║███████╗███████║███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
      //  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
      //

      /**
       * SailsSocket
       *
       * A wrapper for an underlying Socket instance that communicates directly
       * to the Socket.io server running inside of Sails.
       *
       * If no `socket` option is provied, SailsSocket will function as a mock. It will queue socket
       * requests and event handler bindings, replaying them when the raw underlying socket actually
       * connects. This is handy when we don't necessarily have the valid configuration to know
       * WHICH SERVER to talk to yet, etc.  It is also used by `io.socket` for your convenience.
       *
       * @constructor
       * @api private
       *
       * ----------------------------------------------------------------------
       * Note: This constructor should not be used directly. To obtain a `SailsSocket`
       * instance of your very own, run:
       * ```
       * var mySocket = io.sails.connect();
       * ```
       * ----------------------------------------------------------------------
       */
      function SailsSocket(opts) {
        var self = this;
        opts = opts || {};

        // Initialize private properties
        self._isConnecting = false;
        self._mightBeAboutToAutoConnect = false;

        // Set up connection options so that they can only be changed when socket is disconnected.
        var _opts = {};
        SOCKET_OPTIONS.forEach(function (option) {
          // Okay to change global headers while socket is connected
          if (option == 'headers') {
            return;
          }
          Object.defineProperty(self, option, {
            get: function get() {
              if (option == 'url') {
                return _opts[option] || self._raw && self._raw.io && self._raw.io.uri;
              }
              return _opts[option];
            },
            set: function set(value) {
              // Don't allow value to be changed while socket is connected
              if (self.isConnected() && io.sails.strict !== false && value != _opts[option]) {
                throw new Error('Cannot change value of `' + option + '` while socket is connected.');
              }
              // If socket is attempting to reconnect, stop it.
              if (self._raw && self._raw.io && self._raw.io.reconnecting && !self._raw.io.skipReconnect) {
                self._raw.io.skipReconnect = true;
                consolog('Stopping reconnect; use .reconnect() to connect socket after changing options.');
              }
              _opts[option] = value;
            }
          });
        });

        // Absorb opts into SailsSocket instance
        // See http://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/properties
        // for description of options
        SOCKET_OPTIONS.forEach(function (option) {
          self[option] = opts[option];
        });

        // Set up "eventQueue" to hold event handlers which have not been set on the actual raw socket yet.
        self.eventQueue = {};

        // Listen for special `parseError` event sent from sockets hook on the backend
        // if an error occurs but a valid callback was not received from the client
        // (i.e. so the server had no other way to send back the error information)
        self.on('sails:parseError', function (err) {
          consolog('Sails encountered an error parsing a socket message sent from this client, and did not have access to a callback function to respond with.');
          consolog('Error details:', err);
        });

        // FUTURE:
        // Listen for a special private message on any connected that allows the server
        // to set the environment (giving us 100% certainty that we guessed right)
        // However, note that the `console.log`s called before and after connection
        // are still forced to rely on our existing heuristics (to disable, tack #production
        // onto the URL used to fetch this file.)
      } //</SailsSocket>


      /**
       * `SailsSocket.prototype._connect()`
       *
       * Begin connecting this socket to the server.
       *
       * @api private
       */
      SailsSocket.prototype._connect = function () {
        var self = this;

        self._isConnecting = true;

        // Apply `io.sails` config as defaults
        // (now that at least one tick has elapsed)
        // See http://sailsjs.com/documentation/reference/web-sockets/socket-client/sails-socket/properties
        // for description of options and default values
        SOCKET_OPTIONS.forEach(function (option) {
          if ('undefined' == typeof self[option]) {
            self[option] = io.sails[option];
          }
        });

        // Headers that will be sent with the initial request to /socket.io (Node.js only)
        self.extraHeaders = self.initialConnectionHeaders || {};

        // For browser usage (currently works with "polling" transport only)
        self.transportOptions = self.transportOptions || {};
        self.transports.forEach(function (transport) {
          self.transportOptions[transport] = self.transportOptions[transport] || {};
          self.transportOptions[transport].extraHeaders = self.initialConnectionHeaders || {};
        });

        // Log a warning if non-Node.js platform attempts to use `initialConnectionHeaders` for anything other than `polling`.
        if (self.initialConnectionHeaders && SDK_INFO.platform !== 'node' && self.transports.indexOf('polling') === -1 || self.transports.length > 1) {
          if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object' && typeof console.warn === 'function') {
            console.warn('When running in browser, `initialConnectionHeaders` option is only available for the `polling` transport.');
          }
        }

        // Ensure URL has no trailing slash
        self.url = self.url ? self.url.replace(/(\/)$/, '') : undefined;

        // Mix the current SDK version into the query string in
        // the connection request to the server:
        if (typeof self.query === 'string') {
          // (If provided as a string, trim leading question mark,
          // just in case one was provided.)
          self.query = self.query.replace(/^\?/, '');
          self.query += '&' + SDK_INFO.versionString;
        } else if (self.query && _typeof(self.query) === 'object') {
          throw new Error('`query` setting does not currently support configuration as a dictionary (`{}`).  Instead, it must be specified as a string like `foo=89&bar=hi`');
        } else if (!self.query) {
          self.query = SDK_INFO.versionString;
        } else {
          throw new Error('Unexpected data type provided for `query` setting: ' + self.query);
        }

        // Determine whether this is a cross-origin socket by examining the
        // hostname and port on the `window.location` object.  If it's cross-origin,
        // we'll attempt to get a cookie for the domain so that a Sails session can
        // be established.
        var isXOrigin = function () {

          // If `window` doesn't exist (i.e. being used from Node.js), then
          // we won't bother attempting to get a cookie.  If you're using sockets
          // from Node.js and find you need to share a session between multiple
          // socket connections, you'll need to make an HTTP request to the /__getcookie
          // endpoint of the Sails server (or any endpoint that returns a set-cookie header)
          // and then use the cookie value in the `initialConnectionHeaders` option to
          // io.sails.connect()
          if (typeof window === 'undefined' || typeof window.location === 'undefined') {
            return false;
          }

          // If `self.url` (aka "target") is falsy, then we don't need to worry about it.
          if (typeof self.url !== 'string') {
            return false;
          }

          // Get information about the "target" (`self.url`)
          var targetProtocol = function () {
            try {
              targetProtocol = self.url.match(/^([a-z]+:\/\/)/i)[1].toLowerCase();
            } catch (e) {}
            targetProtocol = targetProtocol || 'http://';
            return targetProtocol;
          }();
          var isTargetSSL = !!self.url.match('^https');
          var targetPort = function () {
            try {
              return self.url.match(/^[a-z]+:\/\/[^:]*:([0-9]*)/i)[1];
            } catch (e) {}
            return isTargetSSL ? '443' : '80';
          }();
          var targetAfterProtocol = self.url.replace(/^([a-z]+:\/\/)/i, '');

          // If target protocol is different than the actual protocol,
          // then we'll consider this cross-origin.
          if (targetProtocol.replace(/[:\/]/g, '') !== window.location.protocol.replace(/[:\/]/g, '')) {
            return true;
          }

          // If target hostname is different than actual hostname, we'll consider this cross-origin.
          var hasSameHostname = targetAfterProtocol.search(window.location.hostname) === 0;
          if (!hasSameHostname) {
            return true;
          }

          // If no actual port is explicitly set on the `window.location` object,
          // we'll assume either 80 or 443.
          var isLocationSSL = window.location.protocol.match(/https/i);
          var locationPort = window.location.port + '' || (isLocationSSL ? '443' : '80');

          // Finally, if ports don't match, we'll consider this cross-origin.
          if (targetPort !== locationPort) {
            return true;
          }

          // Otherwise, it's the same origin.
          return false;
        }();

        // Prepare to start connecting the socket
        (function selfInvoking(cb) {

          // If this is an attempt at a cross-origin or cross-port
          // socket connection via a browswe, send a JSONP request
          // first to ensure that a valid cookie is available.
          // This can be disabled by setting `io.sails.useCORSRouteToGetCookie`
          // to false.
          //
          // Otherwise, skip the stuff below.
          //
          if (!(self.useCORSRouteToGetCookie && isXOrigin)) {
            return cb();
          }

          // Figure out the x-origin CORS route
          // (Sails provides a default)
          var xOriginCookieURL = self.url;
          if (typeof self.useCORSRouteToGetCookie === 'string') {
            xOriginCookieURL += self.useCORSRouteToGetCookie;
          } else {
            xOriginCookieURL += '/__getcookie';
          }

          // Make the AJAX request (CORS)
          jsonp({
            url: xOriginCookieURL,
            method: 'GET'
          }, cb);
        })(function goAheadAndActuallyConnect() {

          // Now that we're ready to connect, create a raw underlying Socket
          // using Socket.io and save it as `_raw` (this will start it connecting)
          self._raw = io(self.url, self);

          // If the low-level transport throws an error _while connecting_, then set the _isConnecting flag
          // to false (since we're no longer connecting with any chance of success anyway).
          // Also, in this case (and in dev mode only) log a helpful message.
          self._raw.io.engine.transport.on('error', function (err) {
            if (!self._isConnecting) {
              return;
            }

            self._isConnecting = false;

            // Track this timestamp for use in reconnection messages
            // (only relevant if reconnection is enabled.)
            self.connectionErrorTimestamp = new Date().getTime();

            // Development-only message:
            consolog('====================================');
            consolog('The socket was unable to connect.');
            consolog('The server may be offline, or the');
            consolog('socket may have failed authorization');
            consolog('based on its origin or other factors.');
            consolog('You may want to check the values of');
            consolog('`sails.config.sockets.onlyAllowOrigins`');
            consolog('or (more rarely) `sails.config.sockets.beforeConnect`');
            consolog('in your app.');
            consolog('More info: https://sailsjs.com/config/sockets');
            consolog('For help: https://sailsjs.com/support');
            consolog('');
            consolog('Technical details:');
            consolog(err);
            consolog('====================================');
          });

          // Replay event bindings from the eager socket
          self.replay();

          /**
           * 'connect' event is triggered when the socket establishes a connection
           *  successfully.
           */
          self.on('connect', function socketConnected() {
            self._isConnecting = false;
            consolog.noPrefix('\n' + '\n' +
            // '    |>    ' + '\n' +
            // '  \\___/  '+️
            // '\n'+
            '  |>    Now connected to ' + (self.url ? self.url : 'Sails') + '.' + '\n' + '\\___/   For help, see: http://bit.ly/2q0QDpf' + '\n' + '        (using sails.io.js ' + io.sails.sdk.platform + ' SDK @v' + io.sails.sdk.version + ')' + '\n' + '         Connected at: ' + new Date() + '\n' + '\n' + '\n' +
            // '\n'+
            ''
            // ' ⚓︎ (development mode)'
            // 'e.g. to send a GET request to Sails via WebSockets, run:'+ '\n' +
            // '`io.socket.get("/foo", function serverRespondedWith (body, jwr) { console.log(body); })`'+ '\n' +
            );
          });

          self.on('disconnect', function () {

            // Get a timestamp of when the disconnect was detected.
            self.connectionLostTimestamp = new Date().getTime();

            // Get a shallow clone of the internal array of response callbacks, in case any of the callbacks mutate it.
            var responseCbs = [].concat(self._responseCbs || []);
            // Wipe the internal array of response callbacks before executing them, in case a callback happens to add
            // a new request to the queue.
            self._responseCbs = [];

            // Do the same for the internal request context list.
            var requestCtxs = [].concat(self._requestCtxs || []);
            self._requestCtxs = [];

            // Loop through the callbacks for all in-progress requests, and call them each with an error indicating the disconnect.
            if (responseCbs.length) {
              responseCbs.forEach(function (responseCb) {
                responseCb(new Error('The socket disconnected before the request completed.'), {
                  body: null,
                  statusCode: 0,
                  headers: {}
                });
              });
            }

            // If there is a list of request contexts, indicate that their callbacks have been
            // called and then wipe the list.  This prevents errors in the edge case of a response
            // somehow coming back after the socket reconnects.
            if (requestCtxs.length) {
              requestCtxs.forEach(function (requestCtx) {
                requestCtx.calledCb = true;
              });
            }

            consolog('====================================');
            consolog('Socket was disconnected from Sails.');
            consolog('Usually, this is due to one of the following reasons:' + '\n' + ' -> the server ' + (self.url ? self.url + ' ' : '') + 'was taken down' + '\n' + ' -> your browser lost internet connectivity');
            consolog('====================================');
          });

          self.on('reconnecting', function (numAttempts) {
            consolog('\n' + '        Socket is trying to reconnect to ' + (self.url ? self.url : 'Sails') + '...\n' + '_-|>_-  (attempt #' + numAttempts + ')' + '\n' + '\n');
          });

          self.on('reconnect', function (transport, numAttempts) {
            if (!self._isConnecting) {
              self.on('connect', runRequestQueue.bind(self, self));
            }

            var msSinceLastOffline;
            var numSecsOffline;
            if (self.connectionLostTimestamp) {
              msSinceLastOffline = new Date().getTime() - self.connectionLostTimestamp;
              numSecsOffline = msSinceLastOffline / 1000;
            } else if (self.connectionErrorTimestamp) {
              msSinceLastOffline = new Date().getTime() - self.connectionErrorTimestamp;
              numSecsOffline = msSinceLastOffline / 1000;
            } else {
              msSinceLastOffline = '???';
              numSecsOffline = '???';
            }

            consolog('\n' + '  |>    Socket reconnected successfully after' + '\n' + '\\___/   being offline at least ' + numSecsOffline + ' seconds.' + '\n' + '\n');
          });

          // 'error' event is triggered if connection can not be established.
          // (usually because of a failed authorization, which is in turn
          // usually due to a missing or invalid cookie)
          self.on('error', function failedToConnect(err) {
            self._isConnecting = false;
            ////////////////////////////////////////////////////////////////////////////////////
            // Note:
            // In the future, we could provide a separate event for when a socket cannot connect
            // due to a failed `beforeConnect` (aka "authorization" if you're old school).
            // this could probably be implemented by emitting a special event from the server.
            ////////////////////////////////////////////////////////////////////////////////////

            consolog('Failed to connect socket (possibly due to failed `beforeConnect` on server)', 'Error:', err);
          });
        });
      };

      /**
       * Reconnect the underlying socket.
       *
       * @api public
       */
      SailsSocket.prototype.reconnect = function () {
        if (this._isConnecting) {
          throw new Error('Cannot connect- socket is already connecting');
        }
        if (this.isConnected()) {
          throw new Error('Cannot connect- socket is already connected');
        }
        return this._connect();
      };

      /**
       * Disconnect the underlying socket.
       *
       * @api public
       */
      SailsSocket.prototype.disconnect = function () {
        this._isConnecting = false;
        if (!this.isConnected()) {
          throw new Error('Cannot disconnect- socket is already disconnected');
        }
        return this._raw.disconnect();
      };

      /**
       * isConnected
       *
       * @return {Boolean} whether the socket is connected and able to
       *                   communicate w/ the server.
       */

      SailsSocket.prototype.isConnected = function () {
        if (!this._raw) {
          return false;
        }

        return !!this._raw.connected;
      };

      /**
       * isConnecting
       *
       * @return {Boolean} whether the socket is in the process of connecting
       *                   to the server.
       */

      SailsSocket.prototype.isConnecting = function () {
        return this._isConnecting;
      };

      /**
       * isConnecting
       *
       * @return {Boolean} flag that is `true` after a SailsSocket instance is
       *                   initialized but before one tick of the event loop
       *                   has passed (so that it hasn't attempted to connect
       *                   yet, if autoConnect ends up being configured `true`)
       */
      SailsSocket.prototype.mightBeAboutToAutoConnect = function () {
        return this._mightBeAboutToAutoConnect;
      };

      /**
       * [replay description]
       * @return {[type]} [description]
       */
      SailsSocket.prototype.replay = function () {
        var self = this;

        // Pass events and a reference to the request queue
        // off to the self._raw for consumption
        for (var evName in self.eventQueue) {
          for (var i in self.eventQueue[evName]) {
            self._raw.on(evName, self.eventQueue[evName][i]);
          }
        }

        // Bind a one-time function to run the request queue
        // when the self._raw connects.
        if (!self.isConnected()) {
          self._raw.once('connect', runRequestQueue.bind(self, self));
        }
        // Or run it immediately if self._raw is already connected
        else {
            runRequestQueue(self);
          }

        return self;
      };

      /**
       * Chainable method to bind an event to the socket.
       *
       * @param  {String}   evName [event name]
       * @param  {Function} fn     [event handler function]
       * @return {SailsSocket}
       */
      SailsSocket.prototype.on = function (evName, fn) {

        // Bind the event to the raw underlying socket if possible.
        if (this._raw) {
          this._raw.on(evName, fn);
          return this;
        }

        // Otherwise queue the event binding.
        if (!this.eventQueue[evName]) {
          this.eventQueue[evName] = [fn];
        } else {
          this.eventQueue[evName].push(fn);
        }

        return this;
      };

      /**
       * Chainable method to unbind an event from the socket.
       *
       * @param  {String}   evName [event name]
       * @param  {Function} fn     [event handler function]
       * @return {SailsSocket}
       */
      SailsSocket.prototype.off = function (evName, fn) {

        // Bind the event to the raw underlying socket if possible.
        if (this._raw) {
          this._raw.off(evName, fn);
          return this;
        }

        // Otherwise queue the event binding.
        if (this.eventQueue[evName] && this.eventQueue[evName].indexOf(fn) > -1) {
          this.eventQueue[evName].splice(this.eventQueue[evName].indexOf(fn), 1);
        }

        return this;
      };

      /**
       * Chainable method to unbind all events from the socket.
       *
       * @return {SailsSocket}
       */
      SailsSocket.prototype.removeAllListeners = function () {

        // Bind the event to the raw underlying socket if possible.
        if (this._raw) {
          this._raw.removeAllListeners();
          return this;
        }

        // Otherwise queue the event binding.
        this.eventQueue = {};

        return this;
      };

      /**
       * Simulate a GET request to sails
       * e.g.
       *    `socket.get('/user/3', Stats.populate)`
       *
       * @api public
       * @param {String} url    ::    destination URL
       * @param {Object} data   ::    parameters to send with the request [optional]
       * @param {Function} cb   ::    callback function to call when finished [optional]
       */

      SailsSocket.prototype.get = function (url, data, cb) {

        // `data` is optional
        if (typeof data === 'function') {
          cb = data;
          data = {};
        }

        return this.request({
          method: 'get',
          params: data,
          url: url
        }, cb);
      };

      /**
       * Simulate a POST request to sails
       * e.g.
       *    `socket.post('/event', newMeeting, $spinner.hide)`
       *
       * @api public
       * @param {String} url    ::    destination URL
       * @param {Object} data   ::    parameters to send with the request [optional]
       * @param {Function} cb   ::    callback function to call when finished [optional]
       */

      SailsSocket.prototype.post = function (url, data, cb) {

        // `data` is optional
        if (typeof data === 'function') {
          cb = data;
          data = {};
        }

        return this.request({
          method: 'post',
          data: data,
          url: url
        }, cb);
      };

      /**
       * Simulate a PUT request to sails
       * e.g.
       *    `socket.post('/event/3', changedFields, $spinner.hide)`
       *
       * @api public
       * @param {String} url    ::    destination URL
       * @param {Object} data   ::    parameters to send with the request [optional]
       * @param {Function} cb   ::    callback function to call when finished [optional]
       */

      SailsSocket.prototype.put = function (url, data, cb) {

        // `data` is optional
        if (typeof data === 'function') {
          cb = data;
          data = {};
        }

        return this.request({
          method: 'put',
          params: data,
          url: url
        }, cb);
      };

      /**
       * Simulate a PATCH request to sails
       * e.g.
       *    `socket.patch('/event/3', changedFields, $spinner.hide)`
       *
       * @api public
       * @param {String} url    ::    destination URL
       * @param {Object} data   ::    parameters to send with the request [optional]
       * @param {Function} cb   ::    callback function to call when finished [optional]
       */

      SailsSocket.prototype.patch = function (url, data, cb) {

        // `data` is optional
        if (typeof data === 'function') {
          cb = data;
          data = {};
        }

        return this.request({
          method: 'patch',
          params: data,
          url: url
        }, cb);
      };

      /**
       * Simulate a DELETE request to sails
       * e.g.
       *    `socket.delete('/event', $spinner.hide)`
       *
       * @api public
       * @param {String} url    ::    destination URL
       * @param {Object} data   ::    parameters to send with the request [optional]
       * @param {Function} cb   ::    callback function to call when finished [optional]
       */

      SailsSocket.prototype['delete'] = function (url, data, cb) {

        // `data` is optional
        if (typeof data === 'function') {
          cb = data;
          data = {};
        }

        return this.request({
          method: 'delete',
          params: data,
          url: url
        }, cb);
      };

      /**
       * Simulate an HTTP request to sails
       * e.g.
       * ```
       * socket.request({
       *   url:'/user',
       *   params: {},
       *   method: 'POST',
       *   headers: {}
       * }, function (responseBody, JWR) {
       *   // ...
       * });
       * ```
       *
       * @api public
       * @option {String} url    ::    destination URL
       * @option {Object} params ::    parameters to send with the request [optional]
       * @option {Object} headers::    headers to send with the request [optional]
       * @option {Function} cb   ::    callback function to call when finished [optional]
       * @option {String} method ::    HTTP request method [optional]
       */

      SailsSocket.prototype.request = function (options, cb) {

        var usage = 'Usage:\n' + 'socket.request( options, [fnToCallWhenComplete] )\n\n' + 'options.url :: e.g. "/foo/bar"' + '\n' + 'options.method :: e.g. "get", "post", "put", or "delete", etc.' + '\n' + 'options.params :: e.g. { emailAddress: "mike@example.com" }' + '\n' + 'options.headers :: e.g. { "x-my-custom-header": "some string" }';
        // Old usage:
        // var usage = 'Usage:\n socket.'+(options.method||'request')+'('+
        //   ' destinationURL, [dataToSend], [fnToCallWhenComplete] )';


        // Validate options and callback
        if (typeof cb !== 'undefined' && typeof cb !== 'function') {
          throw new Error('Invalid callback function!\n' + usage);
        }
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' || typeof options.url !== 'string') {
          throw new Error('Invalid or missing URL!\n' + usage);
        }
        if (options.method && typeof options.method !== 'string') {
          throw new Error('Invalid `method` provided (should be a string like "post" or "put")\n' + usage);
        }
        if (options.headers && _typeof(options.headers) !== 'object') {
          throw new Error('Invalid `headers` provided (should be a dictionary with string values)\n' + usage);
        }
        if (options.params && _typeof(options.params) !== 'object') {
          throw new Error('Invalid `params` provided (should be a dictionary with JSON-serializable values)\n' + usage);
        }
        if (options.data && _typeof(options.data) !== 'object') {
          throw new Error('Invalid `data` provided (should be a dictionary with JSON-serializable values)\n' + usage);
        }

        // Accept either `params` or `data` for backwards compatibility (but not both!)
        if (options.data && options.params) {
          throw new Error('Cannot specify both `params` and `data`!  They are aliases of each other.\n' + usage);
        } else if (options.data) {
          options.params = options.data;
          delete options.data;
        }

        // If this socket is not connected yet, queue up this request
        // instead of sending it.
        // (so it can be replayed when the socket comes online.)
        if (!this.isConnected()) {

          // If no queue array exists for this socket yet, create it.
          this.requestQueue = this.requestQueue || [];
          this.requestQueue.push([options, cb]);
          return;
        }

        // Otherwise, our socket is connected, so continue prepping
        // the request.

        // Default headers to an empty object
        options.headers = options.headers || {};

        // Build a simulated request object
        // (and sanitize/marshal options along the way)
        var requestCtx = {

          method: (options.method || 'get').toLowerCase(),

          headers: options.headers,

          data: options.params || options.data || {},

          // Remove trailing slashes and spaces to make packets smaller.
          url: options.url.replace(/^(.+)\/*\s*$/, '$1'),

          cb: cb
        };

        // Get a reference to the callback list, or create a new one.
        this._responseCbs = this._responseCbs || [];

        // Get a reference to the request context list, or create a new one.
        this._requestCtxs = this._requestCtxs || [];

        // Add this callback to the list.  If the socket disconnects, we'll call
        // each cb in the list with an error and reset the list.  Otherwise the
        // cb will be removed from the list when the server responds.
        // Also add the request context to the list.  It will be removed once
        // the response comes back, or if the socket disconnects.
        if (cb) {
          this._responseCbs.push(cb);
          this._requestCtxs.push(requestCtx);
        }

        // Merge global headers in, if there are any.
        if (this.headers && 'object' === _typeof(this.headers)) {
          for (var header in this.headers) {
            if (!options.headers.hasOwnProperty(header)) {
              options.headers[header] = this.headers[header];
            }
          }
        }

        // Send the request.
        _emitFrom(this, requestCtx);
      };

      /**
       * Socket.prototype._request
       *
       * Simulate HTTP over Socket.io.
       *
       * @api private
       * @param  {[type]}   options [description]
       * @param  {Function} cb      [description]
       */
      SailsSocket.prototype._request = function (options, cb) {
        throw new Error('`_request()` was a private API deprecated as of v0.11 of the sails.io.js client. Use `.request()` instead.');
      };

      //  ██╗ ██████╗    ███████╗ █████╗ ██╗██╗     ███████╗
      //  ██║██╔═══██╗   ██╔════╝██╔══██╗██║██║     ██╔════╝
      //  ██║██║   ██║   ███████╗███████║██║██║     ███████╗
      //  ██║██║   ██║   ╚════██║██╔══██║██║██║     ╚════██║
      //  ██║╚██████╔╝██╗███████║██║  ██║██║███████╗███████║
      //  ╚═╝ ╚═════╝ ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
      //
      // Set an `io.sails` object that may be used for configuration before the
      // first socket connects (i.e. to allow auto-connect behavior to be
      // prevented by setting `io.sails.autoConnect` in an inline script
      // directly after the script tag which loaded this file).


      //  ┌─┐┌─┐┌┬┐  ┬ ┬┌─┐  ╔╦╗╔═╗╔═╗╔═╗╦ ╦╦ ╔╦╗╔═╗  ┌─┐┌─┐┬─┐  ┬┌─┐ ┌─┐┌─┐┬┬  ┌─┐
      //  └─┐├┤  │   │ │├─┘   ║║║╣ ╠╣ ╠═╣║ ║║  ║ ╚═╗  ├┤ │ │├┬┘  ││ │ └─┐├─┤││  └─┐
      //  └─┘└─┘ ┴   └─┘┴    ═╩╝╚═╝╚  ╩ ╩╚═╝╩═╝╩ ╚═╝  └  └─┘┴└─  ┴└─┘o└─┘┴ ┴┴┴─┘└─┘
      io.sails = {

        // Whether to automatically connect a socket and save it as `io.socket`.
        autoConnect: true,

        // Whether to automatically try to reconnect after connection is lost
        reconnection: false,

        // The route (path) to hit to get a x-origin (CORS) cookie
        // (or true to use the default: '/__getcookie')
        useCORSRouteToGetCookie: true,

        // The environment we're running in.
        // (logs are not displayed when this is set to 'production')
        //
        // Defaults to "development" unless this script was fetched from a URL
        // that ends in `*.min.js` or '#production', or if the conventional
        // `SAILS_LOCALS` global is set with an `_environment` of "production"
        // or "staging".  (This setting may also be manually overridden.)
        environment: urlThisScriptWasFetchedFrom.match(/(\#production|\.min\.js)/g) || (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window && _typeof(window.SAILS_LOCALS) === 'object' && window.SAILS_LOCALS && (window.SAILS_LOCALS._environment === 'staging' || window.SAILS_LOCALS._environment === 'production') ? 'production' : 'development',

        // The version of this sails.io.js client SDK
        sdk: SDK_INFO,

        // Transports to use when communicating with the server, in the order they will be tried
        transports: ['websocket']
      };

      //  ┌─┐─┐ ┬┌┬┐┌─┐┌┐┌┌┬┐  ┬┌─┐ ┌─┐┌─┐┬┬  ┌─┐  ┌┬┐┌─┐┌─┐┌─┐┬ ┬┬ ┌┬┐┌─┐
      //  ├┤ ┌┴┬┘ │ ├┤ │││ ││  ││ │ └─┐├─┤││  └─┐   ││├┤ ├┤ ├─┤│ ││  │ └─┐
      //  └─┘┴ └─ ┴ └─┘┘└┘─┴┘  ┴└─┘o└─┘┴ ┴┴┴─┘└─┘  ─┴┘└─┘└  ┴ ┴└─┘┴─┘┴ └─┘
      //  ┬ ┬┬┌┬┐┬ ┬  ┌┬┐┬ ┬┌─┐  ╦ ╦╔╦╗╔╦╗╦    ╔═╗╔╦╗╔╦╗╦═╗╦╔╗ ╦ ╦╔╦╗╔═╗╔═╗
      //  ││││ │ ├─┤   │ ├─┤├┤   ╠═╣ ║ ║║║║    ╠═╣ ║  ║ ╠╦╝║╠╩╗║ ║ ║ ║╣ ╚═╗
      //  └┴┘┴ ┴ ┴ ┴   ┴ ┴ ┴└─┘  ╩ ╩ ╩ ╩ ╩╩═╝  ╩ ╩ ╩  ╩ ╩╚═╩╚═╝╚═╝ ╩ ╚═╝╚═╝
      //  ┌─┐┬─┐┌─┐┌┬┐  ┌┬┐┬ ┬┌─┐  ┌─┐┌─┐┬─┐┬┌─┐┌┬┐  ┌┬┐┌─┐┌─┐
      //  ├┤ ├┬┘│ ││││   │ ├─┤├┤   └─┐│  ├┬┘│├─┘ │    │ ├─┤│ ┬
      //  └  ┴└─└─┘┴ ┴   ┴ ┴ ┴└─┘  └─┘└─┘┴└─┴┴   ┴    ┴ ┴ ┴└─┘
      //
      // Now fold in config provided as HTML attributes on the script tag:
      // (note that if `io.sails.*` is changed after this script, those changes
      //  will still take precedence)
      CONFIGURABLE_VIA_HTML_ATTR.forEach(function (configKey) {
        if (typeof scriptTagConfig[configKey] !== 'undefined') {
          io.sails[configKey] = scriptTagConfig[configKey];
        }
      });
      //////////////////////////////////////////////////////////////////////////////
      // Note that the new HTML attribute configuration style may eventually
      // completely replace the original approach of setting `io.sails` properties,
      // since the new strategy is easier to reason about.  Also, it would allow us
      // to remove the timeout below someday.
      //////////////////////////////////////////////////////////////////////////////


      //  ┬┌─┐ ┌─┐┌─┐┬┬  ┌─┐ ╔═╗╔═╗╔╗╔╔╗╔╔═╗╔═╗╔╦╗  /  \
      //  ││ │ └─┐├─┤││  └─┐ ║  ║ ║║║║║║║║╣ ║   ║  /   /
      //  ┴└─┘o└─┘┴ ┴┴┴─┘└─┘o╚═╝╚═╝╝╚╝╝╚╝╚═╝╚═╝ ╩  \  /

      /**
       * Add `io.sails.connect` function as a wrapper for the built-in `io()` aka `io.connect()`
       * method, returning a SailsSocket. This special function respects the configured io.sails
       * connection URL, as well as sending other identifying information (most importantly, the
       * current version of this SDK).
       *
       * @param  {String} url  [optional]
       * @param  {Object} opts [optional]
       * @return {Socket}
       */
      io.sails.connect = function (url, opts) {

        // Make URL optional
        if ('object' === (typeof url === 'undefined' ? 'undefined' : _typeof(url))) {
          opts = url;
          url = null;
        }

        // Default opts to empty object
        opts = opts || {};

        // If explicit connection url is specified, save it to options
        opts.url = url || opts.url || undefined;

        // Instantiate and return a new SailsSocket- and try to connect immediately.
        var socket = new SailsSocket(opts);
        socket._connect();
        return socket;
      };

      //  ██╗ ██████╗    ███████╗ ██████╗  ██████╗██╗  ██╗███████╗████████╗
      //  ██║██╔═══██╗   ██╔════╝██╔═══██╗██╔════╝██║ ██╔╝██╔════╝╚══██╔══╝
      //  ██║██║   ██║   ███████╗██║   ██║██║     █████╔╝ █████╗     ██║
      //  ██║██║   ██║   ╚════██║██║   ██║██║     ██╔═██╗ ██╔══╝     ██║
      //  ██║╚██████╔╝██╗███████║╚██████╔╝╚██████╗██║  ██╗███████╗   ██║
      //  ╚═╝ ╚═════╝ ╚═╝╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝   ╚═╝
      //
      // io.socket
      //
      // The eager instance of Socket which will automatically try to connect
      // using the host that this js file was served from.
      //
      // This can be disabled or configured by setting properties on `io.sails.*` within the
      // first cycle of the event loop.
      //


      // Build `io.socket` so it exists
      // (note that this DOES NOT start the connection process)
      io.socket = new SailsSocket();
      //
      // This socket is not connected yet, and has not even _started_ connecting.
      //
      // But in the mean time, this eager socket will be queue events bound by the user
      // before the first cycle of the event loop (using `.on()`), which will later
      // be rebound on the raw underlying socket.


      //  ┌─┐┌─┐┌┬┐  ┌─┐┬ ┬┌┬┐┌─┐   ┌─┐┌─┐┌┐┌┌┐┌┌─┐┌─┐┌┬┐  ┌┬┐┬┌┬┐┌─┐┬─┐
      //  └─┐├┤  │   ├─┤│ │ │ │ │───│  │ │││││││├┤ │   │    │ ││││├┤ ├┬┘
      //  └─┘└─┘ ┴   ┴ ┴└─┘ ┴ └─┘   └─┘└─┘┘└┘┘└┘└─┘└─┘ ┴    ┴ ┴┴ ┴└─┘┴└─
      // If configured to do so, start auto-connecting after the first cycle of the event loop
      // has completed (to allow time for this behavior to be configured/disabled
      // by specifying properties on `io.sails`)

      // Indicate that the autoConnect timer has started.
      io.socket._mightBeAboutToAutoConnect = true;

      setTimeout(function () {

        // Indicate that the autoConect timer fired.
        io.socket._mightBeAboutToAutoConnect = false;

        // If autoConnect is disabled, delete the eager socket (io.socket) and bail out.
        if (io.sails.autoConnect === false || io.sails.autoconnect === false) {
          delete io.socket;
          return;
        }

        // consolog('Eagerly auto-connecting socket to Sails... (requests will be queued in the mean-time)');
        io.socket._connect();
      }, 0); // </setTimeout>


      // Return the `io` object.
      return io;
    } //</SailsIOClient>

    //
    /////////////////////////////////////////////////////////////////////////////////
    ///// </bunches of private function definitions, constructors, and methods>
    /////////////////////////////////////////////////////////////////////////////////


    //  ███████╗██╗  ██╗██████╗  ██████╗ ███████╗███████╗    ███████╗██████╗ ██╗  ██╗
    //  ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔════╝██╔════╝    ██╔════╝██╔══██╗██║ ██╔╝
    //  █████╗   ╚███╔╝ ██████╔╝██║   ██║███████╗█████╗      ███████╗██║  ██║█████╔╝
    //  ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║╚════██║██╔══╝      ╚════██║██║  ██║██╔═██╗
    //  ███████╗██╔╝ ██╗██║     ╚██████╔╝███████║███████╗    ███████║██████╔╝██║  ██╗
    //  ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═════╝ ╚═╝  ╚═╝
    //


    // Add CommonJS support to allow this client SDK to be used from Node.js.
    if (SDK_INFO.platform === 'node') {
      module.exports = SailsIOClient;
    }
    // Add AMD support, registering this client SDK as an anonymous module.
    else if (typeof undefined === 'function' && undefined.amd) {
        undefined([], function () {
          return SailsIOClient;
        });
      } else {
        // Otherwise, try to instantiate the client using the global `io`:
        SailsIOClient();

        // Note:
        // If you are modifying this file manually to wrap an existing socket.io client
        // (e.g. to prevent pollution of the global namespace), you can replace the global
        // `io` with your own `io` instance above.
      }
  })();
});

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

var parseuri = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd() {
    return '/';
}
function chdir(dir) {
    throw new Error('process.chdir is not supported');
}function umask() {
    return 0;
}

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
    return new Date().getTime();
};

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
        seconds = seconds - previousTimestamp[0];
        nanoseconds = nanoseconds - previousTimestamp[1];
        if (nanoseconds < 0) {
            seconds--;
            nanoseconds += 1e9;
        }
    }
    return [seconds, nanoseconds];
}

var startTime = new Date();
function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
}

var process = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
};

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function ms(val, options) {
  options = options || {};
  var type = typeof val === 'undefined' ? 'undefined' : _typeof$1(val);
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 10000) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

var debug_1 = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug.debug = debug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms;

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lowercased letter, i.e. "n".
   */

  exports.formatters = {};

  /**
   * Previously assigned color.
   */

  var prevColor = 0;

  /**
   * Previous log timestamp.
   */

  var prevTime;

  /**
   * Select a color.
   *
   * @return {Number}
   * @api private
   */

  function selectColor() {
    return exports.colors[prevColor++ % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function debug(namespace) {

    // define the `disabled` version
    function disabled() {}
    disabled.enabled = false;

    // define the `enabled` version
    function enabled() {

      var self = enabled;

      // set `diff` timestamp
      var curr = +new Date();
      var ms$$1 = curr - (prevTime || curr);
      self.diff = ms$$1;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // add the `color` if not set
      if (null == self.useColors) self.useColors = exports.useColors();
      if (null == self.color && self.useColors) self.color = selectColor();

      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %o
        args = ['%o'].concat(args);
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting
      args = exports.formatArgs.apply(self, args);

      var logFn = enabled.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }
    enabled.enabled = true;

    var fn = exports.enabled(namespace) ? enabled : disabled;

    fn.namespace = namespace;

    return fn;
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    var split = (namespaces || '').split(/[\s,]+/);
    var len = split.length;

    for (var i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
});
var debug_2 = debug_1.coerce;
var debug_3 = debug_1.disable;
var debug_4 = debug_1.enable;
var debug_5 = debug_1.enabled;
var debug_6 = debug_1.humanize;
var debug_7 = debug_1.names;
var debug_8 = debug_1.skips;
var debug_9 = debug_1.formatters;

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var browser$1 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug_1;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

  /**
   * Colors.
   */

  exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    window.console && (console.firebug || console.exception && console.table) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function (v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };

  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs() {
    var args = arguments;
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

    if (!useColors) return args;

    var c = 'color: ' + this.color;
    args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-z%]/g, function (match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
    return args;
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof$2(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    try {
      return exports.storage.debug;
    } catch (e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (typeof process !== 'undefined' && 'env' in process) {
      return process.env.DEBUG;
    }
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
});
var browser_1 = browser$1.log;
var browser_2 = browser$1.formatArgs;
var browser_3 = browser$1.save;
var browser_4 = browser$1.load;
var browser_5 = browser$1.useColors;
var browser_6 = browser$1.storage;
var browser_7 = browser$1.colors;

/**
 * Module dependencies.
 */

var debug = browser$1('socket.io-client:url');

/**
 * Module exports.
 */

var url_1 = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || commonjsGlobal.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : ':' + obj.port);

  return obj;
}

/**
 * Helpers.
 */

var s$1 = 1000;
var m$1 = s$1 * 60;
var h$1 = m$1 * 60;
var d$1 = h$1 * 24;
var y$1 = d$1 * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

var ms$1 = function ms(val, options) {
  options = options || {};
  if ('string' == typeof val) return parse$1(val);
  return options.long ? long(val) : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse$1(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y$1;
    case 'days':
    case 'day':
    case 'd':
      return n * d$1;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h$1;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m$1;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s$1;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d$1) return Math.round(ms / d$1) + 'd';
  if (ms >= h$1) return Math.round(ms / h$1) + 'h';
  if (ms >= m$1) return Math.round(ms / m$1) + 'm';
  if (ms >= s$1) return Math.round(ms / s$1) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural$1(ms, d$1, 'day') || plural$1(ms, h$1, 'hour') || plural$1(ms, m$1, 'minute') || plural$1(ms, s$1, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural$1(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

var debug_1$1 = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms$1;

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lowercased letter, i.e. "n".
   */

  exports.formatters = {};

  /**
   * Previously assigned color.
   */

  var prevColor = 0;

  /**
   * Previous log timestamp.
   */

  var prevTime;

  /**
   * Select a color.
   *
   * @return {Number}
   * @api private
   */

  function selectColor() {
    return exports.colors[prevColor++ % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function debug(namespace) {

    // define the `disabled` version
    function disabled() {}
    disabled.enabled = false;

    // define the `enabled` version
    function enabled() {

      var self = enabled;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // add the `color` if not set
      if (null == self.useColors) self.useColors = exports.useColors();
      if (null == self.color && self.useColors) self.color = selectColor();

      var args = Array.prototype.slice.call(arguments);

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %o
        args = ['%o'].concat(args);
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      if ('function' === typeof exports.formatArgs) {
        args = exports.formatArgs.apply(self, args);
      }
      var logFn = enabled.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }
    enabled.enabled = true;

    var fn = exports.enabled(namespace) ? enabled : disabled;

    fn.namespace = namespace;

    return fn;
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    var split = (namespaces || '').split(/[\s,]+/);
    var len = split.length;

    for (var i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
});
var debug_2$1 = debug_1$1.coerce;
var debug_3$1 = debug_1$1.disable;
var debug_4$1 = debug_1$1.enable;
var debug_5$1 = debug_1$1.enabled;
var debug_6$1 = debug_1$1.humanize;
var debug_7$1 = debug_1$1.names;
var debug_8$1 = debug_1$1.skips;
var debug_9$1 = debug_1$1.formatters;

var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var browser$2 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug_1$1;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

  /**
   * Colors.
   */

  exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // is webkit? http://stackoverflow.com/a/16459606/376773
    return 'WebkitAppearance' in document.documentElement.style ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    window.console && (console.firebug || console.exception && console.table) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function (v) {
    return JSON.stringify(v);
  };

  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs() {
    var args = arguments;
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

    if (!useColors) return args;

    var c = 'color: ' + this.color;
    args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-z%]/g, function (match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
    return args;
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof$3(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch (e) {}
    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
});
var browser_1$1 = browser$2.log;
var browser_2$1 = browser$2.formatArgs;
var browser_3$1 = browser$2.save;
var browser_4$1 = browser$2.load;
var browser_5$1 = browser$2.useColors;
var browser_6$1 = browser$2.storage;
var browser_7$1 = browser$2.colors;

var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var json3 = createCommonjsModule(function (module, exports) {
(function () {
    // Detect the `define` function exposed by asynchronous module loaders. The
    // strict `define` check is necessary for compatibility with `r.js`.
    var isLoader = typeof undefined === "function" && undefined.amd;

    // A set of types used to distinguish objects from primitives.
    var objectTypes = {
      "function": true,
      "object": true
    };

    // Detect the `exports` object exposed by CommonJS implementations.
    var freeExports = exports && !exports.nodeType && exports;

    // Use the `global` object exposed by Node (including Browserify via
    // `insert-module-globals`), Narwhal, and Ringo as the default context,
    // and the `window` object in browsers. Rhino exports a `global` function
    // instead.
    var root = objectTypes[typeof window === "undefined" ? "undefined" : _typeof$4(window)] && window || this,
        freeGlobal = freeExports && objectTypes['object'] && module && !module.nodeType && _typeof$4(commonjsGlobal) == "object" && commonjsGlobal;

    if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
      root = freeGlobal;
    }

    // Public: Initializes JSON 3 using the given `context` object, attaching the
    // `stringify` and `parse` functions to the specified `exports` object.
    function runInContext(context, exports) {
      context || (context = root["Object"]());
      exports || (exports = root["Object"]());

      // Native constructor aliases.
      var Number = context["Number"] || root["Number"],
          String = context["String"] || root["String"],
          Object = context["Object"] || root["Object"],
          Date = context["Date"] || root["Date"],
          SyntaxError = context["SyntaxError"] || root["SyntaxError"],
          TypeError = context["TypeError"] || root["TypeError"],
          Math = context["Math"] || root["Math"],
          nativeJSON = context["JSON"] || root["JSON"];

      // Delegate to the native `stringify` and `parse` implementations.
      if ((typeof nativeJSON === "undefined" ? "undefined" : _typeof$4(nativeJSON)) == "object" && nativeJSON) {
        exports.stringify = nativeJSON.stringify;
        exports.parse = nativeJSON.parse;
      }

      // Convenience aliases.
      var objectProto = Object.prototype,
          getClass = objectProto.toString,
          _isProperty,
          _forEach,
          undef;

      // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
      var isExtended = new Date(-3509827334573292);
      try {
        // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
        // results for certain dates in Opera >= 10.53.
        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
      } catch (exception) {}

      // Internal: Determines whether the native `JSON.stringify` and `parse`
      // implementations are spec-compliant. Based on work by Ken Snyder.
      function has(name) {
        if (has[name] !== undef) {
          // Return cached feature test result.
          return has[name];
        }
        var isSupported;
        if (name == "bug-string-char-index") {
          // IE <= 7 doesn't support accessing string characters using square
          // bracket notation. IE 8 only supports this for primitives.
          isSupported = "a"[0] != "a";
        } else if (name == "json") {
          // Indicates whether both `JSON.stringify` and `JSON.parse` are
          // supported.
          isSupported = has("json-stringify") && has("json-parse");
        } else {
          var value,
              serialized = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";
          // Test `JSON.stringify`.
          if (name == "json-stringify") {
            var stringify = exports.stringify,
                stringifySupported = typeof stringify == "function" && isExtended;
            if (stringifySupported) {
              // A test function object with a custom `toJSON` method.
              (value = function value() {
                return 1;
              }).toJSON = value;
              try {
                stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" && stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" && stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
              } catch (exception) {
                stringifySupported = false;
              }
            }
            isSupported = stringifySupported;
          }
          // Test `JSON.parse`.
          if (name == "json-parse") {
            var parse = exports.parse;
            if (typeof parse == "function") {
              try {
                // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                // Conforming implementations should also coerce the initial argument to
                // a string prior to parsing.
                if (parse("0") === 0 && !parse(false)) {
                  // Simple parsing test.
                  value = parse(serialized);
                  var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                  if (parseSupported) {
                    try {
                      // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                      parseSupported = !parse('"\t"');
                    } catch (exception) {}
                    if (parseSupported) {
                      try {
                        // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                        // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                        // certain octal literals.
                        parseSupported = parse("01") !== 1;
                      } catch (exception) {}
                    }
                    if (parseSupported) {
                      try {
                        // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                        // points. These environments, along with FF 3.1b1 and 2,
                        // also allow trailing commas in JSON objects and arrays.
                        parseSupported = parse("1.") !== 1;
                      } catch (exception) {}
                    }
                  }
                }
              } catch (exception) {
                parseSupported = false;
              }
            }
            isSupported = parseSupported;
          }
        }
        return has[name] = !!isSupported;
      }

      if (!has("json")) {
        // Common `[[Class]]` name aliases.
        var functionClass = "[object Function]",
            dateClass = "[object Date]",
            numberClass = "[object Number]",
            stringClass = "[object String]",
            arrayClass = "[object Array]",
            booleanClass = "[object Boolean]";

        // Detect incomplete support for accessing string characters by index.
        var charIndexBuggy = has("bug-string-char-index");

        // Define additional utility methods if the `Date` methods are buggy.
        if (!isExtended) {
          var floor = Math.floor;
          // A mapping between the months of the year and the number of days between
          // January 1st and the first of the respective month.
          var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
          // Internal: Calculates the number of days between the Unix epoch and the
          // first day of the given month.
          var getDay = function getDay(year, month) {
            return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
          };
        }

        // Internal: Determines if a property is a direct property of the given
        // object. Delegates to the native `Object#hasOwnProperty` method.
        if (!(_isProperty = objectProto.hasOwnProperty)) {
          _isProperty = function isProperty(property) {
            var members = {},
                constructor;
            if ((members.__proto__ = null, members.__proto__ = {
              // The *proto* property cannot be set multiple times in recent
              // versions of Firefox and SeaMonkey.
              "toString": 1
            }, members).toString != getClass) {
              // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
              // supports the mutable *proto* property.
              _isProperty = function isProperty(property) {
                // Capture and break the object's prototype chain (see section 8.6.2
                // of the ES 5.1 spec). The parenthesized expression prevents an
                // unsafe transformation by the Closure Compiler.
                var original = this.__proto__,
                    result = property in (this.__proto__ = null, this);
                // Restore the original prototype chain.
                this.__proto__ = original;
                return result;
              };
            } else {
              // Capture a reference to the top-level `Object` constructor.
              constructor = members.constructor;
              // Use the `constructor` property to simulate `Object#hasOwnProperty` in
              // other environments.
              _isProperty = function isProperty(property) {
                var parent = (this.constructor || constructor).prototype;
                return property in this && !(property in parent && this[property] === parent[property]);
              };
            }
            members = null;
            return _isProperty.call(this, property);
          };
        }

        // Internal: Normalizes the `for...in` iteration algorithm across
        // environments. Each enumerated key is yielded to a `callback` function.
        _forEach = function forEach(object, callback) {
          var size = 0,
              Properties,
              members,
              property;

          // Tests for bugs in the current environment's `for...in` algorithm. The
          // `valueOf` property inherits the non-enumerable flag from
          // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
          (Properties = function Properties() {
            this.valueOf = 0;
          }).prototype.valueOf = 0;

          // Iterate over a new instance of the `Properties` class.
          members = new Properties();
          for (property in members) {
            // Ignore all properties inherited from `Object.prototype`.
            if (_isProperty.call(members, property)) {
              size++;
            }
          }
          Properties = members = null;

          // Normalize the iteration algorithm.
          if (!size) {
            // A list of non-enumerable properties inherited from `Object.prototype`.
            members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
            // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
            // properties.
            _forEach = function forEach(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                  property,
                  length;
              var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[_typeof$4(object.hasOwnProperty)] && object.hasOwnProperty || _isProperty;
              for (property in object) {
                // Gecko <= 1.0 enumerates the `prototype` property of functions under
                // certain conditions; IE does not.
                if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                  callback(property);
                }
              }
              // Manually invoke the callback for each non-enumerable property.
              for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)) {}
            };
          } else if (size == 2) {
            // Safari <= 2.0.4 enumerates shadowed properties twice.
            _forEach = function forEach(object, callback) {
              // Create a set of iterated properties.
              var members = {},
                  isFunction = getClass.call(object) == functionClass,
                  property;
              for (property in object) {
                // Store each property name to prevent double enumeration. The
                // `prototype` property of functions is not enumerated due to cross-
                // environment inconsistencies.
                if (!(isFunction && property == "prototype") && !_isProperty.call(members, property) && (members[property] = 1) && _isProperty.call(object, property)) {
                  callback(property);
                }
              }
            };
          } else {
            // No bugs detected; use the standard `for...in` algorithm.
            _forEach = function forEach(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                  property,
                  isConstructor;
              for (property in object) {
                if (!(isFunction && property == "prototype") && _isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                  callback(property);
                }
              }
              // Manually invoke the callback for the `constructor` property due to
              // cross-environment inconsistencies.
              if (isConstructor || _isProperty.call(object, property = "constructor")) {
                callback(property);
              }
            };
          }
          return _forEach(object, callback);
        };

        // Public: Serializes a JavaScript `value` as a JSON string. The optional
        // `filter` argument may specify either a function that alters how object and
        // array members are serialized, or an array of strings and numbers that
        // indicates which properties should be serialized. The optional `width`
        // argument may be either a string or number that specifies the indentation
        // level of the output.
        if (!has("json-stringify")) {
          // Internal: A map of control characters and their escaped equivalents.
          var Escapes = {
            92: "\\\\",
            34: '\\"',
            8: "\\b",
            12: "\\f",
            10: "\\n",
            13: "\\r",
            9: "\\t"
          };

          // Internal: Converts `value` into a zero-padded string such that its
          // length is at least equal to `width`. The `width` must be <= 6.
          var leadingZeroes = "000000";
          var toPaddedString = function toPaddedString(width, value) {
            // The `|| 0` expression is necessary to work around a bug in
            // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
            return (leadingZeroes + (value || 0)).slice(-width);
          };

          // Internal: Double-quotes a string `value`, replacing all ASCII control
          // characters (characters with code unit values between 0 and 31) with
          // their escaped equivalents. This is an implementation of the
          // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
          var unicodePrefix = "\\u00";
          var quote = function quote(value) {
            var result = '"',
                index = 0,
                length = value.length,
                useCharIndex = !charIndexBuggy || length > 10;
            var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
            for (; index < length; index++) {
              var charCode = value.charCodeAt(index);
              // If the character is a control character, append its Unicode or
              // shorthand escape sequence; otherwise, append the character as-is.
              switch (charCode) {
                case 8:case 9:case 10:case 12:case 13:case 34:case 92:
                  result += Escapes[charCode];
                  break;
                default:
                  if (charCode < 32) {
                    result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                    break;
                  }
                  result += useCharIndex ? symbols[index] : value.charAt(index);
              }
            }
            return result + '"';
          };

          // Internal: Recursively serializes an object. Implements the
          // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
          var serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
            var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
            try {
              // Necessary for host object support.
              value = object[property];
            } catch (exception) {}
            if ((typeof value === "undefined" ? "undefined" : _typeof$4(value)) == "object" && value) {
              className = getClass.call(value);
              if (className == dateClass && !_isProperty.call(value, "toJSON")) {
                if (value > -1 / 0 && value < 1 / 0) {
                  // Dates are serialized according to the `Date#toJSON` method
                  // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                  // for the ISO 8601 date time string format.
                  if (getDay) {
                    // Manually compute the year, month, date, hours, minutes,
                    // seconds, and milliseconds if the `getUTC*` methods are
                    // buggy. Adapted from @Yaffle's `date-shim` project.
                    date = floor(value / 864e5);
                    for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++) {}
                    for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++) {}
                    date = 1 + date - getDay(year, month);
                    // The `time` value specifies the time within the day (see ES
                    // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                    // to compute `A modulo B`, as the `%` operator does not
                    // correspond to the `modulo` operation for negative numbers.
                    time = (value % 864e5 + 864e5) % 864e5;
                    // The hours, minutes, seconds, and milliseconds are obtained by
                    // decomposing the time within the day. See section 15.9.1.10.
                    hours = floor(time / 36e5) % 24;
                    minutes = floor(time / 6e4) % 60;
                    seconds = floor(time / 1e3) % 60;
                    milliseconds = time % 1e3;
                  } else {
                    year = value.getUTCFullYear();
                    month = value.getUTCMonth();
                    date = value.getUTCDate();
                    hours = value.getUTCHours();
                    minutes = value.getUTCMinutes();
                    seconds = value.getUTCSeconds();
                    milliseconds = value.getUTCMilliseconds();
                  }
                  // Serialize extended years correctly.
                  value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
                } else {
                  value = null;
                }
              } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || _isProperty.call(value, "toJSON"))) {
                // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
                // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
                // ignores all `toJSON` methods on these objects unless they are
                // defined directly on an instance.
                value = value.toJSON(property);
              }
            }
            if (callback) {
              // If a replacement function was provided, call it to obtain the value
              // for serialization.
              value = callback.call(object, property, value);
            }
            if (value === null) {
              return "null";
            }
            className = getClass.call(value);
            if (className == booleanClass) {
              // Booleans are represented literally.
              return "" + value;
            } else if (className == numberClass) {
              // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
              // `"null"`.
              return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
            } else if (className == stringClass) {
              // Strings are double-quoted and escaped.
              return quote("" + value);
            }
            // Recursively serialize objects and arrays.
            if ((typeof value === "undefined" ? "undefined" : _typeof$4(value)) == "object") {
              // Check for cyclic structures. This is a linear search; performance
              // is inversely proportional to the number of unique nested objects.
              for (length = stack.length; length--;) {
                if (stack[length] === value) {
                  // Cyclic structures cannot be serialized by `JSON.stringify`.
                  throw TypeError();
                }
              }
              // Add the object to the stack of traversed objects.
              stack.push(value);
              results = [];
              // Save the current indentation level and indent one additional level.
              prefix = indentation;
              indentation += whitespace;
              if (className == arrayClass) {
                // Recursively serialize array elements.
                for (index = 0, length = value.length; index < length; index++) {
                  element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undef ? "null" : element);
                }
                result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
              } else {
                // Recursively serialize object members. Members are selected from
                // either a user-specified list of property names, or the object
                // itself.
                _forEach(properties || value, function (property) {
                  var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                  if (element !== undef) {
                    // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                    // is not the empty string, let `member` {quote(property) + ":"}
                    // be the concatenation of `member` and the `space` character."
                    // The "`space` character" refers to the literal space
                    // character, not the `space` {width} argument provided to
                    // `JSON.stringify`.
                    results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                  }
                });
                result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
              }
              // Remove the object from the traversed object stack.
              stack.pop();
              return result;
            }
          };

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          exports.stringify = function (source, filter, width) {
            var whitespace, callback, properties, className;
            if (objectTypes[typeof filter === "undefined" ? "undefined" : _typeof$4(filter)] && filter) {
              if ((className = getClass.call(filter)) == functionClass) {
                callback = filter;
              } else if (className == arrayClass) {
                // Convert the property names array into a makeshift set.
                properties = {};
                for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1)) {}
              }
            }
            if (width) {
              if ((className = getClass.call(width)) == numberClass) {
                // Convert the `width` to an integer and create a string containing
                // `width` number of space characters.
                if ((width -= width % 1) > 0) {
                  for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ") {}
                }
              } else if (className == stringClass) {
                whitespace = width.length <= 10 ? width : width.slice(0, 10);
              }
            }
            // Opera <= 7.54u2 discards the values associated with empty string keys
            // (`""`) only if they are used directly within an object member list
            // (e.g., `!("" in { "": 1})`).
            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
          };
        }

        // Public: Parses a JSON source string.
        if (!has("json-parse")) {
          var fromCharCode = String.fromCharCode;

          // Internal: A map of escaped control characters and their unescaped
          // equivalents.
          var Unescapes = {
            92: "\\",
            34: '"',
            47: "/",
            98: "\b",
            116: "\t",
            110: "\n",
            102: "\f",
            114: "\r"
          };

          // Internal: Stores the parser state.
          var Index, Source;

          // Internal: Resets the parser state and throws a `SyntaxError`.
          var abort = function abort() {
            Index = Source = null;
            throw SyntaxError();
          };

          // Internal: Returns the next token, or `"$"` if the parser has reached
          // the end of the source string. A token may be a string, number, `null`
          // literal, or Boolean literal.
          var lex = function lex() {
            var source = Source,
                length = source.length,
                value,
                begin,
                position,
                isSigned,
                charCode;
            while (Index < length) {
              charCode = source.charCodeAt(Index);
              switch (charCode) {
                case 9:case 10:case 13:case 32:
                  // Skip whitespace tokens, including tabs, carriage returns, line
                  // feeds, and space characters.
                  Index++;
                  break;
                case 123:case 125:case 91:case 93:case 58:case 44:
                  // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                  // the current position.
                  value = charIndexBuggy ? source.charAt(Index) : source[Index];
                  Index++;
                  return value;
                case 34:
                  // `"` delimits a JSON string; advance to the next character and
                  // begin parsing the string. String tokens are prefixed with the
                  // sentinel `@` character to distinguish them from punctuators and
                  // end-of-string tokens.
                  for (value = "@", Index++; Index < length;) {
                    charCode = source.charCodeAt(Index);
                    if (charCode < 32) {
                      // Unescaped ASCII control characters (those with a code unit
                      // less than the space character) are not permitted.
                      abort();
                    } else if (charCode == 92) {
                      // A reverse solidus (`\`) marks the beginning of an escaped
                      // control character (including `"`, `\`, and `/`) or Unicode
                      // escape sequence.
                      charCode = source.charCodeAt(++Index);
                      switch (charCode) {
                        case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:
                          // Revive escaped control characters.
                          value += Unescapes[charCode];
                          Index++;
                          break;
                        case 117:
                          // `\u` marks the beginning of a Unicode escape sequence.
                          // Advance to the first character and validate the
                          // four-digit code point.
                          begin = ++Index;
                          for (position = Index + 4; Index < position; Index++) {
                            charCode = source.charCodeAt(Index);
                            // A valid sequence comprises four hexdigits (case-
                            // insensitive) that form a single hexadecimal value.
                            if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                              // Invalid Unicode escape sequence.
                              abort();
                            }
                          }
                          // Revive the escaped character.
                          value += fromCharCode("0x" + source.slice(begin, Index));
                          break;
                        default:
                          // Invalid escape sequence.
                          abort();
                      }
                    } else {
                      if (charCode == 34) {
                        // An unescaped double-quote character marks the end of the
                        // string.
                        break;
                      }
                      charCode = source.charCodeAt(Index);
                      begin = Index;
                      // Optimize for the common case where a string is valid.
                      while (charCode >= 32 && charCode != 92 && charCode != 34) {
                        charCode = source.charCodeAt(++Index);
                      }
                      // Append the string as-is.
                      value += source.slice(begin, Index);
                    }
                  }
                  if (source.charCodeAt(Index) == 34) {
                    // Advance to the next character and return the revived string.
                    Index++;
                    return value;
                  }
                  // Unterminated string.
                  abort();
                default:
                  // Parse numbers and literals.
                  begin = Index;
                  // Advance past the negative sign, if one is specified.
                  if (charCode == 45) {
                    isSigned = true;
                    charCode = source.charCodeAt(++Index);
                  }
                  // Parse an integer or floating-point value.
                  if (charCode >= 48 && charCode <= 57) {
                    // Leading zeroes are interpreted as octal literals.
                    if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                      // Illegal octal literal.
                      abort();
                    }
                    isSigned = false;
                    // Parse the integer component.
                    for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++) {}
                    // Floats cannot contain a leading decimal point; however, this
                    // case is already accounted for by the parser.
                    if (source.charCodeAt(Index) == 46) {
                      position = ++Index;
                      // Parse the decimal component.
                      for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}
                      if (position == Index) {
                        // Illegal trailing decimal.
                        abort();
                      }
                      Index = position;
                    }
                    // Parse exponents. The `e` denoting the exponent is
                    // case-insensitive.
                    charCode = source.charCodeAt(Index);
                    if (charCode == 101 || charCode == 69) {
                      charCode = source.charCodeAt(++Index);
                      // Skip past the sign following the exponent, if one is
                      // specified.
                      if (charCode == 43 || charCode == 45) {
                        Index++;
                      }
                      // Parse the exponential component.
                      for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++) {}
                      if (position == Index) {
                        // Illegal empty exponent.
                        abort();
                      }
                      Index = position;
                    }
                    // Coerce the parsed value to a JavaScript number.
                    return +source.slice(begin, Index);
                  }
                  // A negative sign may only precede numbers.
                  if (isSigned) {
                    abort();
                  }
                  // `true`, `false`, and `null` literals.
                  if (source.slice(Index, Index + 4) == "true") {
                    Index += 4;
                    return true;
                  } else if (source.slice(Index, Index + 5) == "false") {
                    Index += 5;
                    return false;
                  } else if (source.slice(Index, Index + 4) == "null") {
                    Index += 4;
                    return null;
                  }
                  // Unrecognized token.
                  abort();
              }
            }
            // Return the sentinel `$` character if the parser has reached the end
            // of the source string.
            return "$";
          };

          // Internal: Parses a JSON `value` token.
          var get = function get(value) {
            var results, hasMembers;
            if (value == "$") {
              // Unexpected end of input.
              abort();
            }
            if (typeof value == "string") {
              if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                // Remove the sentinel `@` character.
                return value.slice(1);
              }
              // Parse object and array literals.
              if (value == "[") {
                // Parses a JSON array, returning a new JavaScript array.
                results = [];
                for (;; hasMembers || (hasMembers = true)) {
                  value = lex();
                  // A closing square bracket marks the end of the array literal.
                  if (value == "]") {
                    break;
                  }
                  // If the array literal contains elements, the current token
                  // should be a comma separating the previous element from the
                  // next.
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "]") {
                        // Unexpected trailing `,` in array literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each array element.
                      abort();
                    }
                  }
                  // Elisions and leading commas are not permitted.
                  if (value == ",") {
                    abort();
                  }
                  results.push(get(value));
                }
                return results;
              } else if (value == "{") {
                // Parses a JSON object, returning a new JavaScript object.
                results = {};
                for (;; hasMembers || (hasMembers = true)) {
                  value = lex();
                  // A closing curly brace marks the end of the object literal.
                  if (value == "}") {
                    break;
                  }
                  // If the object literal contains members, the current token
                  // should be a comma separator.
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "}") {
                        // Unexpected trailing `,` in object literal.
                        abort();
                      }
                    } else {
                      // A `,` must separate each object member.
                      abort();
                    }
                  }
                  // Leading commas are not permitted, object property names must be
                  // double-quoted strings, and a `:` must separate each property
                  // name and value.
                  if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                    abort();
                  }
                  results[value.slice(1)] = get(lex());
                }
                return results;
              }
              // Unexpected token encountered.
              abort();
            }
            return value;
          };

          // Internal: Updates a traversed object member.
          var update = function update(source, property, callback) {
            var element = walk(source, property, callback);
            if (element === undef) {
              delete source[property];
            } else {
              source[property] = element;
            }
          };

          // Internal: Recursively traverses a parsed JSON object, invoking the
          // `callback` function for each value. This is an implementation of the
          // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
          var walk = function walk(source, property, callback) {
            var value = source[property],
                length;
            if ((typeof value === "undefined" ? "undefined" : _typeof$4(value)) == "object" && value) {
              // `forEach` can't be used to traverse an array in Opera <= 8.54
              // because its `Object#hasOwnProperty` implementation returns `false`
              // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
              if (getClass.call(value) == arrayClass) {
                for (length = value.length; length--;) {
                  update(value, length, callback);
                }
              } else {
                _forEach(value, function (property) {
                  update(value, property, callback);
                });
              }
            }
            return callback.call(source, property, value);
          };

          // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
          exports.parse = function (source, callback) {
            var result, value;
            Index = 0;
            Source = "" + source;
            result = get(lex());
            // If a JSON string contains multiple tokens, it is invalid.
            if (lex() != "$") {
              abort();
            }
            // Reset the parser state.
            Index = Source = null;
            return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
          };
        }
      }

      exports["runInContext"] = runInContext;
      return exports;
    }

    if (freeExports && !isLoader) {
      // Export for CommonJS environments.
      runInContext(root, freeExports);
    } else {
      // Export for web browsers and JavaScript engines.
      var nativeJSON = root.JSON,
          previousJSON = root["JSON3"],
          isRestored = false;

      var JSON3 = runInContext(root, root["JSON3"] = {
        // Public: Restores the original value of the global `JSON` object and
        // returns a reference to the `JSON3` object.
        "noConflict": function noConflict() {
          if (!isRestored) {
            isRestored = true;
            root.JSON = nativeJSON;
            root["JSON3"] = previousJSON;
            nativeJSON = previousJSON = null;
          }
          return JSON3;
        }
      });

      root.JSON = {
        "parse": JSON3.parse,
        "stringify": JSON3.stringify
      };
    }

    // Export for asynchronous module loaders.
    if (isLoader) {
      undefined(function () {
        return JSON3;
      });
    }
  }).call(commonjsGlobal);
});

/**
 * Expose `Emitter`.
 */

var componentEmitter = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isBuffer = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return commonjsGlobal.Buffer && commonjsGlobal.Buffer.isBuffer(obj) || commonjsGlobal.ArrayBuffer && obj instanceof ArrayBuffer;
}

var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*global Blob,File*/

/**
 * Module requirements
 */

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

var deconstructPacket = function deconstructPacket(packet) {
  var buffers = [];
  var packetData = packet.data;

  function _deconstructPacket(data) {
    if (!data) return data;

    if (isBuffer(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isarray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i]);
      }
      return newData;
    } else if ('object' == (typeof data === 'undefined' ? 'undefined' : _typeof$5(data)) && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key]);
      }
      return newData;
    }
    return data;
  }

  var pack = packet;
  pack.data = _deconstructPacket(packetData);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return { packet: pack, buffers: buffers };
};

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

var reconstructPacket = function reconstructPacket(packet, buffers) {

  function _reconstructPacket(data) {
    if (data && data._placeholder) {
      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
      return buf;
    } else if (isarray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i]);
      }
      return data;
    } else if (data && 'object' == (typeof data === 'undefined' ? 'undefined' : _typeof$5(data))) {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key]);
      }
      return data;
    }
    return data;
  }

  packet.data = _reconstructPacket(packet.data);
  packet.attachments = undefined; // no longer useful
  return packet;
};

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

var removeBlobs = function removeBlobs(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if (commonjsGlobal.Blob && obj instanceof Blob || commonjsGlobal.File && obj instanceof File) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function () {
        // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        } else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if (! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isarray(obj)) {
      // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (obj && 'object' == (typeof obj === 'undefined' ? 'undefined' : _typeof$5(obj)) && !isBuffer(obj)) {
      // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

var binary = {
  deconstructPacket: deconstructPacket,
  reconstructPacket: reconstructPacket,
  removeBlobs: removeBlobs
};

var socket_ioParser = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */

  var debug = browser$2('socket.io-parser');

  /**
   * Protocol version.
   *
   * @api public
   */

  exports.protocol = 4;

  /**
   * Packet types.
   *
   * @api public
   */

  exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];

  /**
   * Packet type `connect`.
   *
   * @api public
   */

  exports.CONNECT = 0;

  /**
   * Packet type `disconnect`.
   *
   * @api public
   */

  exports.DISCONNECT = 1;

  /**
   * Packet type `event`.
   *
   * @api public
   */

  exports.EVENT = 2;

  /**
   * Packet type `ack`.
   *
   * @api public
   */

  exports.ACK = 3;

  /**
   * Packet type `error`.
   *
   * @api public
   */

  exports.ERROR = 4;

  /**
   * Packet type 'binary event'
   *
   * @api public
   */

  exports.BINARY_EVENT = 5;

  /**
   * Packet type `binary ack`. For acks with binary arguments.
   *
   * @api public
   */

  exports.BINARY_ACK = 6;

  /**
   * Encoder constructor.
   *
   * @api public
   */

  exports.Encoder = Encoder;

  /**
   * Decoder constructor.
   *
   * @api public
   */

  exports.Decoder = Decoder;

  /**
   * A socket.io Encoder instance
   *
   * @api public
   */

  function Encoder() {}

  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   * @param {Function} callback - function to handle encodings (likely engine.write)
   * @return Calls callback with Array of encodings
   * @api public
   */

  Encoder.prototype.encode = function (obj, callback) {
    debug('encoding packet %j', obj);

    if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
      encodeAsBinary(obj, callback);
    } else {
      var encoding = encodeAsString(obj);
      callback([encoding]);
    }
  };

  /**
   * Encode packet as string.
   *
   * @param {Object} packet
   * @return {String} encoded
   * @api private
   */

  function encodeAsString(obj) {
    var str = '';
    var nsp = false;

    // first is type
    str += obj.type;

    // attachments if we have them
    if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
      str += obj.attachments;
      str += '-';
    }

    // if we have a namespace other than `/`
    // we append it followed by a comma `,`
    if (obj.nsp && '/' != obj.nsp) {
      nsp = true;
      str += obj.nsp;
    }

    // immediately followed by the id
    if (null != obj.id) {
      if (nsp) {
        str += ',';
        nsp = false;
      }
      str += obj.id;
    }

    // json data
    if (null != obj.data) {
      if (nsp) str += ',';
      str += json3.stringify(obj.data);
    }

    debug('encoded %j as %s', obj, str);
    return str;
  }

  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   *
   * @param {Object} packet
   * @return {Buffer} encoded
   * @api private
   */

  function encodeAsBinary(obj, callback) {

    function writeEncoding(bloblessData) {
      var deconstruction = binary.deconstructPacket(bloblessData);
      var pack = encodeAsString(deconstruction.packet);
      var buffers = deconstruction.buffers;

      buffers.unshift(pack); // add packet info to beginning of data list
      callback(buffers); // write all the buffers
    }

    binary.removeBlobs(obj, writeEncoding);
  }

  /**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   * @api public
   */

  function Decoder() {
    this.reconstructor = null;
  }

  /**
   * Mix in `Emitter` with Decoder.
   */

  componentEmitter(Decoder.prototype);

  /**
   * Decodes an ecoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   * @return {Object} packet
   * @api public
   */

  Decoder.prototype.add = function (obj) {
    var packet;
    if ('string' == typeof obj) {
      packet = decodeString(obj);
      if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) {
        // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet);

        // no attachments, labeled binary but no binary data to follow
        if (this.reconstructor.reconPack.attachments === 0) {
          this.emit('decoded', packet);
        }
      } else {
        // non-binary full packet
        this.emit('decoded', packet);
      }
    } else if (isBuffer(obj) || obj.base64) {
      // raw binary data
      if (!this.reconstructor) {
        throw new Error('got binary data when not reconstructing a packet');
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          // received final buffer
          this.reconstructor = null;
          this.emit('decoded', packet);
        }
      }
    } else {
      throw new Error('Unknown type: ' + obj);
    }
  };

  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   * @api private
   */

  function decodeString(str) {
    var p = {};
    var i = 0;

    // look up type
    p.type = Number(str.charAt(0));
    if (null == exports.types[p.type]) return error();

    // look up attachments if type binary
    if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
      var buf = '';
      while (str.charAt(++i) != '-') {
        buf += str.charAt(i);
        if (i == str.length) break;
      }
      if (buf != Number(buf) || str.charAt(i) != '-') {
        throw new Error('Illegal attachments');
      }
      p.attachments = Number(buf);
    }

    // look up namespace (if any)
    if ('/' == str.charAt(i + 1)) {
      p.nsp = '';
      while (++i) {
        var c = str.charAt(i);
        if (',' == c) break;
        p.nsp += c;
        if (i == str.length) break;
      }
    } else {
      p.nsp = '/';
    }

    // look up id
    var next = str.charAt(i + 1);
    if ('' !== next && Number(next) == next) {
      p.id = '';
      while (++i) {
        var c = str.charAt(i);
        if (null == c || Number(c) != c) {
          --i;
          break;
        }
        p.id += str.charAt(i);
        if (i == str.length) break;
      }
      p.id = Number(p.id);
    }

    // look up json data
    if (str.charAt(++i)) {
      p = tryParse(p, str.substr(i));
    }

    debug('decoded %s as %j', str, p);
    return p;
  }

  function tryParse(p, str) {
    try {
      p.data = json3.parse(str);
    } catch (e) {
      return error();
    }
    return p;
  }
  /**
   * Deallocates a parser's resources
   *
   * @api public
   */

  Decoder.prototype.destroy = function () {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  };

  /**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   * @api private
   */

  function BinaryReconstructor(packet) {
    this.reconPack = packet;
    this.buffers = [];
  }

  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   * @api private
   */

  BinaryReconstructor.prototype.takeBinaryData = function (binData) {
    this.buffers.push(binData);
    if (this.buffers.length == this.reconPack.attachments) {
      // done with buffer list
      var packet = binary.reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  };

  /**
   * Cleans up binary packet reconstruction variables.
   *
   * @api private
   */

  BinaryReconstructor.prototype.finishedReconstruction = function () {
    this.reconPack = null;
    this.buffers = [];
  };

  function error(data) {
    return {
      type: exports.ERROR,
      data: 'parser error'
    };
  }
});
var socket_ioParser_1 = socket_ioParser.protocol;
var socket_ioParser_2 = socket_ioParser.types;
var socket_ioParser_3 = socket_ioParser.CONNECT;
var socket_ioParser_4 = socket_ioParser.DISCONNECT;
var socket_ioParser_5 = socket_ioParser.EVENT;
var socket_ioParser_6 = socket_ioParser.ACK;
var socket_ioParser_7 = socket_ioParser.ERROR;
var socket_ioParser_8 = socket_ioParser.BINARY_EVENT;
var socket_ioParser_9 = socket_ioParser.BINARY_ACK;
var socket_ioParser_10 = socket_ioParser.Encoder;
var socket_ioParser_11 = socket_ioParser.Decoder;

var hasCors = createCommonjsModule(function (module) {
  /**
   * Module exports.
   *
   * Logic borrowed from Modernizr:
   *
   *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
   */

  try {
    module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
  } catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
    module.exports = false;
  }
});

// browser shim for xmlhttprequest module


var xmlhttprequest = function xmlhttprequest(opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCors)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new commonjsGlobal[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) {}
  }
};

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

var keys = Object.keys || function keys(obj) {
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

var _typeof$6 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * Module requirements.
 */

/**
 * Module exports.
 */

var hasBinary_1 = hasBinary;

/**
 * Checks for binary data.
 *
 * Right now only Buffer and ArrayBuffer are supported..
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(data) {

  function _hasBinary(obj) {
    if (!obj) return false;

    if (commonjsGlobal.Buffer && commonjsGlobal.Buffer.isBuffer && commonjsGlobal.Buffer.isBuffer(obj) || commonjsGlobal.ArrayBuffer && obj instanceof ArrayBuffer || commonjsGlobal.Blob && obj instanceof Blob || commonjsGlobal.File && obj instanceof File) {
      return true;
    }

    if (isarray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        if (_hasBinary(obj[i])) {
          return true;
        }
      }
    } else if (obj && 'object' == (typeof obj === 'undefined' ? 'undefined' : _typeof$6(obj))) {
      // see: https://github.com/Automattic/has-binary/pull/4
      if (obj.toJSON && 'function' == typeof obj.toJSON) {
        obj = obj.toJSON();
      }

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
          return true;
        }
      }
    }

    return false;
  }

  return _hasBinary(data);
}

/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

var arraybuffer_slice = function arraybuffer_slice(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) {
    return arraybuffer.slice(start, end);
  }

  if (start < 0) {
    start += bytes;
  }
  if (end < 0) {
    end += bytes;
  }
  if (end > bytes) {
    end = bytes;
  }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

var after_1 = after;

function after(count, callback, err_cb) {
    var bail = false;
    err_cb = err_cb || noop$1;
    proxy.count = count;

    return count === 0 ? callback() : proxy;

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times');
        }
        --proxy.count;

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true;
            callback(err);
            // future error callbacks will go to error handler
            callback = err_cb;
        } else if (proxy.count === 0 && !bail) {
            callback(null, result);
        }
    }
}

function noop$1() {}

var _typeof$7 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var wtf8 = createCommonjsModule(function (module, exports) {
(function (root) {

		// Detect free variables `exports`
		var freeExports = exports;

		// Detect free variable `module`
		var freeModule = module && module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = _typeof$7(commonjsGlobal) == 'object' && commonjsGlobal;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) {
						// low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}

		/*--------------------------------------------------------------------------*/

		function createByte(codePoint, shift) {
			return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
		}

		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) {
				// 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) {
				// 2-byte sequence
				symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
			} else if ((codePoint & 0xFFFF0000) == 0) {
				// 3-byte sequence
				symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
				symbol += createByte(codePoint, 6);
			} else if ((codePoint & 0xFFE00000) == 0) {
				// 4-byte sequence
				symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
			return symbol;
		}

		function wtf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}

		/*--------------------------------------------------------------------------*/

		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}

			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}

			// If we end up here, it’s not a continuation byte.
			throw Error('Invalid continuation byte');
		}

		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;

			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}

			if (byteIndex == byteCount) {
				return false;
			}

			// Read the first byte.
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}

			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = (byte1 & 0x1F) << 6 | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;
				if (codePoint >= 0x0800) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = (byte1 & 0x0F) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}

			throw Error('Invalid WTF-8 detected');
		}

		var byteArray;
		var byteCount;
		var byteIndex;
		function wtf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}

		/*--------------------------------------------------------------------------*/

		var wtf8 = {
			'version': '1.0.0',
			'encode': wtf8encode,
			'decode': wtf8decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (typeof undefined == 'function' && _typeof$7(undefined.amd) == 'object' && undefined.amd) {
			undefined(function () {
				return wtf8;
			});
		} else if (freeExports && !freeExports.nodeType) {
			if (freeModule) {
				// in Node.js or RingoJS v0.8.0+
				freeModule.exports = wtf8;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in wtf8) {
					hasOwnProperty.call(wtf8, key) && (freeExports[key] = wtf8[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.wtf8 = wtf8;
		}
	})(commonjsGlobal);
});

var base64Arraybuffer = createCommonjsModule(function (module, exports) {
  /*
   * base64-arraybuffer
   * https://github.com/niklasvh/base64-arraybuffer
   *
   * Copyright (c) 2012 Niklas von Hertzen
   * Licensed under the MIT license.
   */
  (function () {

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // Use a lookup table to find the index.
    var lookup = new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }

    exports.encode = function (arraybuffer) {
      var bytes = new Uint8Array(arraybuffer),
          i,
          len = bytes.length,
          base64 = "";

      for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
      }

      if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }

      return base64;
    };

    exports.decode = function (base64) {
      var bufferLength = base64.length * 0.75,
          len = base64.length,
          i,
          p = 0,
          encoded1,
          encoded2,
          encoded3,
          encoded4;

      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }

      var arraybuffer = new ArrayBuffer(bufferLength),
          bytes = new Uint8Array(arraybuffer);

      for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }

      return arraybuffer;
    };
  })();
});
var base64Arraybuffer_1 = base64Arraybuffer.encode;
var base64Arraybuffer_2 = base64Arraybuffer.decode;

/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = commonjsGlobal.BlobBuilder || commonjsGlobal.WebKitBlobBuilder || commonjsGlobal.MSBlobBuilder || commonjsGlobal.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = function () {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch (e) {
    return false;
  }
}();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && function () {
  try {
    var b = new Blob([new Uint8Array([1, 2])]);
    return b.size === 2;
  } catch (e) {
    return false;
  }
}();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return options.type ? bb.getBlob(options.type) : bb.getBlob();
}
function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
}
var blob = function () {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? commonjsGlobal.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
}();

var browser$3 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */

  var base64encoder;
  if (commonjsGlobal && commonjsGlobal.ArrayBuffer) {
    base64encoder = base64Arraybuffer;
  }

  /**
   * Check if we are running an android browser. That requires us to use
   * ArrayBuffer with polling transports...
   *
   * http://ghinda.net/jpeg-blob-ajax-android/
   */

  var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

  /**
   * Check if we are running in PhantomJS.
   * Uploading a Blob with PhantomJS does not work correctly, as reported here:
   * https://github.com/ariya/phantomjs/issues/11395
   * @type boolean
   */
  var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

  /**
   * When true, avoids using Blobs to encode payloads.
   * @type boolean
   */
  var dontSendBlobs = isAndroid || isPhantomJS;

  /**
   * Current protocol version.
   */

  exports.protocol = 3;

  /**
   * Packet types.
   */

  var packets = exports.packets = {
    open: 0 // non-ws
    , close: 1 // non-ws
    , ping: 2,
    pong: 3,
    message: 4,
    upgrade: 5,
    noop: 6
  };

  var packetslist = keys(packets);

  /**
   * Premade error packet.
   */

  var err = { type: 'error', data: 'parser error' };

  /**
   * Create a blob api even for blob builder when vendor prefixes exist
   */

  /**
   * Encodes a packet.
   *
   *     <packet type id> [ <data> ]
   *
   * Example:
   *
   *     5hello world
   *     3
   *     4
   *
   * Binary is encoded in an identical principle
   *
   * @api private
   */

  exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
    if ('function' == typeof supportsBinary) {
      callback = supportsBinary;
      supportsBinary = false;
    }

    if ('function' == typeof utf8encode) {
      callback = utf8encode;
      utf8encode = null;
    }

    var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

    if (commonjsGlobal.ArrayBuffer && data instanceof ArrayBuffer) {
      return encodeArrayBuffer(packet, supportsBinary, callback);
    } else if (blob && data instanceof commonjsGlobal.Blob) {
      return encodeBlob(packet, supportsBinary, callback);
    }

    // might be an object with { base64: true, data: dataAsBase64String }
    if (data && data.base64) {
      return encodeBase64Object(packet, callback);
    }

    // Sending data as a utf-8 string
    var encoded = packets[packet.type];

    // data fragment is optional
    if (undefined !== packet.data) {
      encoded += utf8encode ? wtf8.encode(String(packet.data)) : String(packet.data);
    }

    return callback('' + encoded);
  };

  function encodeBase64Object(packet, callback) {
    // packet data is an object { base64: true, data: dataAsBase64String }
    var message = 'b' + exports.packets[packet.type] + packet.data.data;
    return callback(message);
  }

  /**
   * Encode packet helpers for binary types
   */

  function encodeArrayBuffer(packet, supportsBinary, callback) {
    if (!supportsBinary) {
      return exports.encodeBase64Packet(packet, callback);
    }

    var data = packet.data;
    var contentArray = new Uint8Array(data);
    var resultBuffer = new Uint8Array(1 + data.byteLength);

    resultBuffer[0] = packets[packet.type];
    for (var i = 0; i < contentArray.length; i++) {
      resultBuffer[i + 1] = contentArray[i];
    }

    return callback(resultBuffer.buffer);
  }

  function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
    if (!supportsBinary) {
      return exports.encodeBase64Packet(packet, callback);
    }

    var fr = new FileReader();
    fr.onload = function () {
      packet.data = fr.result;
      exports.encodePacket(packet, supportsBinary, true, callback);
    };
    return fr.readAsArrayBuffer(packet.data);
  }

  function encodeBlob(packet, supportsBinary, callback) {
    if (!supportsBinary) {
      return exports.encodeBase64Packet(packet, callback);
    }

    if (dontSendBlobs) {
      return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
    }

    var length = new Uint8Array(1);
    length[0] = packets[packet.type];
    var blob$$1 = new blob([length.buffer, packet.data]);

    return callback(blob$$1);
  }

  /**
   * Encodes a packet with binary data in a base64 string
   *
   * @param {Object} packet, has `type` and `data`
   * @return {String} base64 encoded message
   */

  exports.encodeBase64Packet = function (packet, callback) {
    var message = 'b' + exports.packets[packet.type];
    if (blob && packet.data instanceof commonjsGlobal.Blob) {
      var fr = new FileReader();
      fr.onload = function () {
        var b64 = fr.result.split(',')[1];
        callback(message + b64);
      };
      return fr.readAsDataURL(packet.data);
    }

    var b64data;
    try {
      b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
    } catch (e) {
      // iPhone Safari doesn't let you apply with typed arrays
      var typed = new Uint8Array(packet.data);
      var basic = new Array(typed.length);
      for (var i = 0; i < typed.length; i++) {
        basic[i] = typed[i];
      }
      b64data = String.fromCharCode.apply(null, basic);
    }
    message += commonjsGlobal.btoa(b64data);
    return callback(message);
  };

  /**
   * Decodes a packet. Changes format to Blob if requested.
   *
   * @return {Object} with `type` and `data` (if any)
   * @api private
   */

  exports.decodePacket = function (data, binaryType, utf8decode) {
    if (data === undefined) {
      return err;
    }
    // String data
    if (typeof data == 'string') {
      if (data.charAt(0) == 'b') {
        return exports.decodeBase64Packet(data.substr(1), binaryType);
      }

      if (utf8decode) {
        data = tryDecode(data);
        if (data === false) {
          return err;
        }
      }
      var type = data.charAt(0);

      if (Number(type) != type || !packetslist[type]) {
        return err;
      }

      if (data.length > 1) {
        return { type: packetslist[type], data: data.substring(1) };
      } else {
        return { type: packetslist[type] };
      }
    }

    var asArray = new Uint8Array(data);
    var type = asArray[0];
    var rest = arraybuffer_slice(data, 1);
    if (blob && binaryType === 'blob') {
      rest = new blob([rest]);
    }
    return { type: packetslist[type], data: rest };
  };

  function tryDecode(data) {
    try {
      data = wtf8.decode(data);
    } catch (e) {
      return false;
    }
    return data;
  }

  /**
   * Decodes a packet encoded in a base64 string
   *
   * @param {String} base64 encoded message
   * @return {Object} with `type` and `data` (if any)
   */

  exports.decodeBase64Packet = function (msg, binaryType) {
    var type = packetslist[msg.charAt(0)];
    if (!base64encoder) {
      return { type: type, data: { base64: true, data: msg.substr(1) } };
    }

    var data = base64encoder.decode(msg.substr(1));

    if (binaryType === 'blob' && blob) {
      data = new blob([data]);
    }

    return { type: type, data: data };
  };

  /**
   * Encodes multiple messages (payload).
   *
   *     <length>:data
   *
   * Example:
   *
   *     11:hello world2:hi
   *
   * If any contents are binary, they will be encoded as base64 strings. Base64
   * encoded strings are marked with a b before the length specifier
   *
   * @param {Array} packets
   * @api private
   */

  exports.encodePayload = function (packets, supportsBinary, callback) {
    if (typeof supportsBinary == 'function') {
      callback = supportsBinary;
      supportsBinary = null;
    }

    var isBinary = hasBinary_1(packets);

    if (supportsBinary && isBinary) {
      if (blob && !dontSendBlobs) {
        return exports.encodePayloadAsBlob(packets, callback);
      }

      return exports.encodePayloadAsArrayBuffer(packets, callback);
    }

    if (!packets.length) {
      return callback('0:');
    }

    function setLengthHeader(message) {
      return message.length + ':' + message;
    }

    function encodeOne(packet, doneCallback) {
      exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function (message) {
        doneCallback(null, setLengthHeader(message));
      });
    }

    map(packets, encodeOne, function (err, results) {
      return callback(results.join(''));
    });
  };

  /**
   * Async array map using after
   */

  function map(ary, each, done) {
    var result = new Array(ary.length);
    var next = after_1(ary.length, done);

    var eachWithIndex = function eachWithIndex(i, el, cb) {
      each(el, function (error, msg) {
        result[i] = msg;
        cb(error, result);
      });
    };

    for (var i = 0; i < ary.length; i++) {
      eachWithIndex(i, ary[i], next);
    }
  }

  /*
   * Decodes data when a payload is maybe expected. Possible binary contents are
   * decoded from their base64 representation
   *
   * @param {String} data, callback method
   * @api public
   */

  exports.decodePayload = function (data, binaryType, callback) {
    if (typeof data != 'string') {
      return exports.decodePayloadAsBinary(data, binaryType, callback);
    }

    if (typeof binaryType === 'function') {
      callback = binaryType;
      binaryType = null;
    }

    var packet;
    if (data == '') {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    var length = '',
        n,
        msg;

    for (var i = 0, l = data.length; i < l; i++) {
      var chr = data.charAt(i);

      if (':' != chr) {
        length += chr;
      } else {
        if ('' == length || length != (n = Number(length))) {
          // parser error - ignoring payload
          return callback(err, 0, 1);
        }

        msg = data.substr(i + 1, n);

        if (length != msg.length) {
          // parser error - ignoring payload
          return callback(err, 0, 1);
        }

        if (msg.length) {
          packet = exports.decodePacket(msg, binaryType, true);

          if (err.type == packet.type && err.data == packet.data) {
            // parser error in individual packet - ignoring payload
            return callback(err, 0, 1);
          }

          var ret = callback(packet, i + n, l);
          if (false === ret) return;
        }

        // advance cursor
        i += n;
        length = '';
      }
    }

    if (length != '') {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }
  };

  /**
   * Encodes multiple messages (payload) as binary.
   *
   * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
   * 255><data>
   *
   * Example:
   * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
   *
   * @param {Array} packets
   * @return {ArrayBuffer} encoded payload
   * @api private
   */

  exports.encodePayloadAsArrayBuffer = function (packets, callback) {
    if (!packets.length) {
      return callback(new ArrayBuffer(0));
    }

    function encodeOne(packet, doneCallback) {
      exports.encodePacket(packet, true, true, function (data) {
        return doneCallback(null, data);
      });
    }

    map(packets, encodeOne, function (err, encodedPackets) {
      var totalLength = encodedPackets.reduce(function (acc, p) {
        var len;
        if (typeof p === 'string') {
          len = p.length;
        } else {
          len = p.byteLength;
        }
        return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
      }, 0);

      var resultArray = new Uint8Array(totalLength);

      var bufferIndex = 0;
      encodedPackets.forEach(function (p) {
        var isString = typeof p === 'string';
        var ab = p;
        if (isString) {
          var view = new Uint8Array(p.length);
          for (var i = 0; i < p.length; i++) {
            view[i] = p.charCodeAt(i);
          }
          ab = view.buffer;
        }

        if (isString) {
          // not true binary
          resultArray[bufferIndex++] = 0;
        } else {
          // true binary
          resultArray[bufferIndex++] = 1;
        }

        var lenStr = ab.byteLength.toString();
        for (var i = 0; i < lenStr.length; i++) {
          resultArray[bufferIndex++] = parseInt(lenStr[i]);
        }
        resultArray[bufferIndex++] = 255;

        var view = new Uint8Array(ab);
        for (var i = 0; i < view.length; i++) {
          resultArray[bufferIndex++] = view[i];
        }
      });

      return callback(resultArray.buffer);
    });
  };

  /**
   * Encode as Blob
   */

  exports.encodePayloadAsBlob = function (packets, callback) {
    function encodeOne(packet, doneCallback) {
      exports.encodePacket(packet, true, true, function (encoded) {
        var binaryIdentifier = new Uint8Array(1);
        binaryIdentifier[0] = 1;
        if (typeof encoded === 'string') {
          var view = new Uint8Array(encoded.length);
          for (var i = 0; i < encoded.length; i++) {
            view[i] = encoded.charCodeAt(i);
          }
          encoded = view.buffer;
          binaryIdentifier[0] = 0;
        }

        var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;

        var lenStr = len.toString();
        var lengthAry = new Uint8Array(lenStr.length + 1);
        for (var i = 0; i < lenStr.length; i++) {
          lengthAry[i] = parseInt(lenStr[i]);
        }
        lengthAry[lenStr.length] = 255;

        if (blob) {
          var blob$$1 = new blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
          doneCallback(null, blob$$1);
        }
      });
    }

    map(packets, encodeOne, function (err, results) {
      return callback(new blob(results));
    });
  };

  /*
   * Decodes data when a payload is maybe expected. Strings are decoded by
   * interpreting each byte as a key code for entries marked to start with 0. See
   * description of encodePayloadAsBinary
   *
   * @param {ArrayBuffer} data, callback method
   * @api public
   */

  exports.decodePayloadAsBinary = function (data, binaryType, callback) {
    if (typeof binaryType === 'function') {
      callback = binaryType;
      binaryType = null;
    }

    var bufferTail = data;
    var buffers = [];

    var numberTooLong = false;
    while (bufferTail.byteLength > 0) {
      var tailArray = new Uint8Array(bufferTail);
      var isString = tailArray[0] === 0;
      var msgLength = '';

      for (var i = 1;; i++) {
        if (tailArray[i] == 255) break;

        if (msgLength.length > 310) {
          numberTooLong = true;
          break;
        }

        msgLength += tailArray[i];
      }

      if (numberTooLong) return callback(err, 0, 1);

      bufferTail = arraybuffer_slice(bufferTail, 2 + msgLength.length);
      msgLength = parseInt(msgLength);

      var msg = arraybuffer_slice(bufferTail, 0, msgLength);
      if (isString) {
        try {
          msg = String.fromCharCode.apply(null, new Uint8Array(msg));
        } catch (e) {
          // iPhone Safari doesn't let you apply to typed arrays
          var typed = new Uint8Array(msg);
          msg = '';
          for (var i = 0; i < typed.length; i++) {
            msg += String.fromCharCode(typed[i]);
          }
        }
      }

      buffers.push(msg);
      bufferTail = arraybuffer_slice(bufferTail, msgLength);
    }

    var total = buffers.length;
    buffers.forEach(function (buffer, i) {
      callback(exports.decodePacket(buffer, binaryType, true), i, total);
    });
  };
});
var browser_1$2 = browser$3.protocol;
var browser_2$2 = browser$3.packets;
var browser_3$2 = browser$3.encodePacket;
var browser_4$2 = browser$3.encodeBase64Packet;
var browser_5$2 = browser$3.decodePacket;
var browser_6$2 = browser$3.decodeBase64Packet;
var browser_7$2 = browser$3.encodePayload;
var browser_8 = browser$3.decodePayload;
var browser_9 = browser$3.encodePayloadAsArrayBuffer;
var browser_10 = browser$3.encodePayloadAsBlob;
var browser_11 = browser$3.decodePayloadAsBinary;

var componentEmitter$1 = createCommonjsModule(function (module) {
  /**
   * Expose `Emitter`.
   */

  {
    module.exports = Emitter;
  }

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function (event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function (event) {
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1),
        callbacks = this._callbacks['$' + event];

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function (event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function (event) {
    return !!this.listeners(event).length;
  };
});

/**
 * Module dependencies.
 */

/**
 * Module exports.
 */

var transport = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport(opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

componentEmitter$1(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = browser$3.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

var encode = function encode(obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

var decode = function decode(qs) {
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

var parseqs = {
  encode: encode,
  decode: decode
};

var componentInherit = function componentInherit(a, b) {
  var fn = function fn() {};
  fn.prototype = b.prototype;
  a.prototype = new fn();
  a.prototype.constructor = a;
};

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
    length = 64,
    map = {},
    seed = 0,
    i = 0,
    prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode$1(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode$1(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode$1(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now + '.' + encode$1(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) {
  map[alphabet[i]] = i;
} //
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode$1;
yeast.decode = decode$1;
var yeast_1 = yeast;

var _typeof$8 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Helpers.
 */

var s$2 = 1000;
var m$2 = s$2 * 60;
var h$2 = m$2 * 60;
var d$2 = h$2 * 24;
var y$2 = d$2 * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms$2 = function ms(val, options) {
  options = options || {};
  var type = typeof val === 'undefined' ? 'undefined' : _typeof$8(val);
  if (type === 'string' && val.length > 0) {
    return parse$2(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong$1(val) : fmtShort$1(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse$2(str) {
  str = String(str);
  if (str.length > 10000) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y$2;
    case 'days':
    case 'day':
    case 'd':
      return n * d$2;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h$2;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m$2;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s$2;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort$1(ms) {
  if (ms >= d$2) {
    return Math.round(ms / d$2) + 'd';
  }
  if (ms >= h$2) {
    return Math.round(ms / h$2) + 'h';
  }
  if (ms >= m$2) {
    return Math.round(ms / m$2) + 'm';
  }
  if (ms >= s$2) {
    return Math.round(ms / s$2) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong$1(ms) {
  return plural$2(ms, d$2, 'day') || plural$2(ms, h$2, 'hour') || plural$2(ms, m$2, 'minute') || plural$2(ms, s$2, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural$2(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

var debug_1$2 = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug.debug = debug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms$2;

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lowercased letter, i.e. "n".
   */

  exports.formatters = {};

  /**
   * Previously assigned color.
   */

  var prevColor = 0;

  /**
   * Previous log timestamp.
   */

  var prevTime;

  /**
   * Select a color.
   *
   * @return {Number}
   * @api private
   */

  function selectColor() {
    return exports.colors[prevColor++ % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function debug(namespace) {

    // define the `disabled` version
    function disabled() {}
    disabled.enabled = false;

    // define the `enabled` version
    function enabled() {

      var self = enabled;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // add the `color` if not set
      if (null == self.useColors) self.useColors = exports.useColors();
      if (null == self.color && self.useColors) self.color = selectColor();

      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %o
        args = ['%o'].concat(args);
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting
      args = exports.formatArgs.apply(self, args);

      var logFn = enabled.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }
    enabled.enabled = true;

    var fn = exports.enabled(namespace) ? enabled : disabled;

    fn.namespace = namespace;

    return fn;
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    var split = (namespaces || '').split(/[\s,]+/);
    var len = split.length;

    for (var i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
});
var debug_2$2 = debug_1$2.coerce;
var debug_3$2 = debug_1$2.disable;
var debug_4$2 = debug_1$2.enable;
var debug_5$2 = debug_1$2.enabled;
var debug_6$2 = debug_1$2.humanize;
var debug_7$2 = debug_1$2.names;
var debug_8$2 = debug_1$2.skips;
var debug_9$2 = debug_1$2.formatters;

var _typeof$9 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var browser$4 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug_1$2;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

  /**
   * Colors.
   */

  exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    window.console && (console.firebug || console.exception && console.table) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function (v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };

  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs() {
    var args = arguments;
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

    if (!useColors) return args;

    var c = 'color: ' + this.color;
    args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-z%]/g, function (match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
    return args;
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof$9(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    try {
      return exports.storage.debug;
    } catch (e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (typeof process !== 'undefined' && 'env' in process) {
      return process.env.DEBUG;
    }
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
});
var browser_1$3 = browser$4.log;
var browser_2$3 = browser$4.formatArgs;
var browser_3$3 = browser$4.save;
var browser_4$3 = browser$4.load;
var browser_5$3 = browser$4.useColors;
var browser_6$3 = browser$4.storage;
var browser_7$3 = browser$4.colors;

/**
 * Module dependencies.
 */

var debug$1 = browser$4('engine.io-client:polling');

/**
 * Module exports.
 */

var polling = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = function () {
  var XMLHttpRequest = xmlhttprequest;
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
}();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

componentInherit(Polling, transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause() {
    debug$1('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug$1('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug$1('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug$1('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug$1('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug$1('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug$1('polling got data %s', data);
  var callback = function callback(packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  browser$3.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug$1('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close() {
    debug$1('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug$1('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug$1('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function callbackfn() {
    self.writable = true;
    self.emit('drain');
  };

  browser$3.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast_1();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && ('https' === schema && Number(this.port) !== 443 || 'http' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Module requirements.
 */

var debug$2 = browser$4('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

var pollingXhr = XHR;
var Request_1 = Request;

/**
 * Empty function
 */

function empty() {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts) {
  polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;

  if (commonjsGlobal.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== commonjsGlobal.location.hostname || port !== opts.port;
    this.xs = opts.secure !== isSSL;
  } else {
    this.extraHeaders = opts.extraHeaders;
  }
}

/**
 * Inherits from Polling.
 */

componentInherit(XHR, polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug$2('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

componentEmitter$1(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new xmlhttprequest(opts);
  var self = this;

  try {
    debug$2('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}
    if (this.supportsBinary) {
      // This has to be done after open because Firefox is stupid
      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
      xhr.responseType = 'arraybuffer';
    }

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug$2('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (commonjsGlobal.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (commonjsGlobal.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      if (!this.supportsBinary) {
        data = this.xhr.responseText;
      } else {
        try {
          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
        } catch (e) {
          var ui8Arr = new Uint8Array(this.xhr.response);
          var dataArray = [];
          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
            dataArray.push(ui8Arr[idx]);
          }

          data = String.fromCharCode.apply(null, dataArray);
        }
      }
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof commonjsGlobal.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (commonjsGlobal.document) {
  if (commonjsGlobal.attachEvent) {
    commonjsGlobal.attachEvent('onunload', unloadHandler);
  } else if (commonjsGlobal.addEventListener) {
    commonjsGlobal.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}
pollingXhr.Request = Request_1;

/**
 * Module requirements.
 */

/**
 * Module exports.
 */

var pollingJsonp = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty$1() {}

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling(opts) {
  polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!commonjsGlobal.___eio) commonjsGlobal.___eio = [];
    callbacks = commonjsGlobal.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (commonjsGlobal.document && commonjsGlobal.addEventListener) {
    commonjsGlobal.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty$1;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

componentInherit(JSONPPolling, polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete() {
    initIframe();
    fn();
  }

  function initIframe() {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

var empty$2 = {};

var empty$3 = /*#__PURE__*/Object.freeze({
	default: empty$2
});

var require$$1 = ( empty$3 && empty$2 ) || empty$3;

/**
 * Module dependencies.
 */

var debug$3 = browser$4('engine.io-client:websocket');
var BrowserWebSocket = commonjsGlobal.WebSocket || commonjsGlobal.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = require$$1;
  } catch (e) {}
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

var websocket = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

componentInherit(WS, transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = void 0;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      browser$3.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? commonjsGlobal.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug$3('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done() {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && ('wss' === schema && Number(this.port) !== 443 || 'ws' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast_1();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

/**
 * Module dependencies
 */

/**
 * Export transports.
 */

var polling_1 = polling$1;
var websocket_1 = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling$1(opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (commonjsGlobal.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new xmlhttprequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new pollingXhr(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new pollingJsonp(opts);
  }
}

var transports = {
  polling: polling_1,
  websocket: websocket_1
};

var indexOf = [].indexOf;

var indexof = function indexof(arr, obj) {
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/**
 * JSON parse.
 *
 * @see Based on jQuery#parseJSON (MIT) and JSON2
 * @api private
 */

var rvalidchars = /^[\],:{}\s]*$/;
var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
var rtrimLeft = /^\s+/;
var rtrimRight = /\s+$/;

var parsejson = function parsejson(data) {
  if ('string' != typeof data || !data) {
    return null;
  }

  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

  // Attempt to parse using the native JSON parser first
  if (commonjsGlobal.JSON && JSON.parse) {
    return JSON.parse(data);
  }

  if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
    return new Function('return ' + data)();
  }
};

var _typeof$a = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var debug$4 = browser$4('engine.io-client:socket');

/**
 * Module exports.
 */

var socket = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === (typeof uri === 'undefined' ? 'undefined' : _typeof$a(uri))) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure : commonjsGlobal.location && 'https:' === location.protocol;

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname || (commonjsGlobal.location ? location.hostname : 'localhost');
  this.port = opts.port || (commonjsGlobal.location && location.port ? location.port : this.secure ? 443 : 80);
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = _typeof$a(commonjsGlobal) === 'object' && commonjsGlobal;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

componentEmitter$1(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = browser$3.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = transport;
Socket.transports = transports;
Socket.parser = browser$3;

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug$4('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = browser$3.protocol;

  // transport name
  query.transport = name;

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport$$1 = new transports[name]({
    agent: this.agent,
    hostname: this.hostname,
    port: this.port,
    secure: this.secure,
    path: this.path,
    query: query,
    forceJSONP: this.forceJSONP,
    jsonp: this.jsonp,
    forceBase64: this.forceBase64,
    enablesXDR: this.enablesXDR,
    timestampRequests: this.timestampRequests,
    timestampParam: this.timestampParam,
    policyPort: this.policyPort,
    socket: this,
    pfx: this.pfx,
    key: this.key,
    passphrase: this.passphrase,
    cert: this.cert,
    ca: this.ca,
    ciphers: this.ciphers,
    rejectUnauthorized: this.rejectUnauthorized,
    perMessageDeflate: this.perMessageDeflate,
    extraHeaders: this.extraHeaders,
    forceNode: this.forceNode,
    localAddress: this.localAddress
  });

  return transport$$1;
};

function clone(obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport$$1;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport$$1 = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport$$1 = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport$$1 = this.createTransport(transport$$1);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport$$1.open();
  this.setTransport(transport$$1);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport$$1) {
  debug$4('setting transport %s', transport$$1.name);
  var self = this;

  if (this.transport) {
    debug$4('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport$$1;

  // set up transport listeners
  transport$$1.on('drain', function () {
    self.onDrain();
  }).on('packet', function (packet) {
    self.onPacket(packet);
  }).on('error', function (e) {
    self.onError(e);
  }).on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug$4('probing transport "%s"', name);
  var transport$$1 = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen() {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug$4('probe transport "%s" opened', name);
    transport$$1.send([{ type: 'ping', data: 'probe' }]);
    transport$$1.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug$4('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport$$1);
        if (!transport$$1) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport$$1.name;

        debug$4('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug$4('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport$$1);
          transport$$1.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport$$1);
          transport$$1 = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug$4('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport$$1.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport$$1.close();
    transport$$1 = null;
  }

  // Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport$$1.name;

    freezeTransport();

    debug$4('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose() {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose() {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade(to) {
    if (transport$$1 && to.name !== transport$$1.name) {
      debug$4('"%s" works - aborting "%s"', to.name, transport$$1.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup() {
    transport$$1.removeListener('open', onTransportOpen);
    transport$$1.removeListener('error', onerror);
    transport$$1.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport$$1.once('open', onTransportOpen);
  transport$$1.once('error', onerror);
  transport$$1.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport$$1.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug$4('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug$4('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug$4('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(parsejson(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug$4('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || self.pingInterval + self.pingTimeout);
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug$4('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
    debug$4('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug$4('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug$4('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug$4('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~indexof(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

var lib = socket;

/**
 * Exports parser
 *
 * @api public
 *
 */
var parser = browser$3;
lib.parser = parser;

var engine_ioClient = lib;

var toArray_1 = toArray;

function toArray(list, index) {
    var array = [];

    index = index || 0;

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i];
    }

    return array;
}

/**
 * Module exports.
 */

var on_1 = on$1;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on$1(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function destroy() {
      obj.removeListener(ev, fn);
    }
  };
}

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

var componentBind = function componentBind(obj, fn) {
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function () {
    return fn.apply(obj, args.concat(slice.call(arguments)));
  };
};

var socket$1 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */

  var debug = browser$1('socket.io-client:socket');

  /**
   * Module exports.
   */

  module.exports = exports = Socket;

  /**
   * Internal events (blacklisted).
   * These events can't be emitted by the user.
   *
   * @api private
   */

  var events = {
    connect: 1,
    connect_error: 1,
    connect_timeout: 1,
    connecting: 1,
    disconnect: 1,
    error: 1,
    reconnect: 1,
    reconnect_attempt: 1,
    reconnect_failed: 1,
    reconnect_error: 1,
    reconnecting: 1,
    ping: 1,
    pong: 1
  };

  /**
   * Shortcut to `Emitter#emit`.
   */

  var emit = componentEmitter$1.prototype.emit;

  /**
   * `Socket` constructor.
   *
   * @api public
   */

  function Socket(io, nsp, opts) {
    this.io = io;
    this.nsp = nsp;
    this.json = this; // compat
    this.ids = 0;
    this.acks = {};
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.connected = false;
    this.disconnected = true;
    if (opts && opts.query) {
      this.query = opts.query;
    }
    if (this.io.autoConnect) this.open();
  }

  /**
   * Mix in `Emitter`.
   */

  componentEmitter$1(Socket.prototype);

  /**
   * Subscribe to open, close and packet events
   *
   * @api private
   */

  Socket.prototype.subEvents = function () {
    if (this.subs) return;

    var io = this.io;
    this.subs = [on_1(io, 'open', componentBind(this, 'onopen')), on_1(io, 'packet', componentBind(this, 'onpacket')), on_1(io, 'close', componentBind(this, 'onclose'))];
  };

  /**
   * "Opens" the socket.
   *
   * @api public
   */

  Socket.prototype.open = Socket.prototype.connect = function () {
    if (this.connected) return this;

    this.subEvents();
    this.io.open(); // ensure open
    if ('open' === this.io.readyState) this.onopen();
    this.emit('connecting');
    return this;
  };

  /**
   * Sends a `message` event.
   *
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.send = function () {
    var args = toArray_1(arguments);
    args.unshift('message');
    this.emit.apply(this, args);
    return this;
  };

  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @param {String} event name
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.emit = function (ev) {
    if (events.hasOwnProperty(ev)) {
      emit.apply(this, arguments);
      return this;
    }

    var args = toArray_1(arguments);
    var parserType = socket_ioParser.EVENT; // default
    if (hasBinary_1(args)) {
      parserType = socket_ioParser.BINARY_EVENT;
    } // binary
    var packet = { type: parserType, data: args };

    packet.options = {};
    packet.options.compress = !this.flags || false !== this.flags.compress;

    // event ack callback
    if ('function' === typeof args[args.length - 1]) {
      debug('emitting packet with ack id %d', this.ids);
      this.acks[this.ids] = args.pop();
      packet.id = this.ids++;
    }

    if (this.connected) {
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }

    delete this.flags;

    return this;
  };

  /**
   * Sends a packet.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.packet = function (packet) {
    packet.nsp = this.nsp;
    this.io.packet(packet);
  };

  /**
   * Called upon engine `open`.
   *
   * @api private
   */

  Socket.prototype.onopen = function () {
    debug('transport is open - connecting');

    // write connect packet if necessary
    if ('/' !== this.nsp) {
      if (this.query) {
        this.packet({ type: socket_ioParser.CONNECT, query: this.query });
      } else {
        this.packet({ type: socket_ioParser.CONNECT });
      }
    }
  };

  /**
   * Called upon engine `close`.
   *
   * @param {String} reason
   * @api private
   */

  Socket.prototype.onclose = function (reason) {
    debug('close (%s)', reason);
    this.connected = false;
    this.disconnected = true;
    delete this.id;
    this.emit('disconnect', reason);
  };

  /**
   * Called with socket packet.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onpacket = function (packet) {
    if (packet.nsp !== this.nsp) return;

    switch (packet.type) {
      case socket_ioParser.CONNECT:
        this.onconnect();
        break;

      case socket_ioParser.EVENT:
        this.onevent(packet);
        break;

      case socket_ioParser.BINARY_EVENT:
        this.onevent(packet);
        break;

      case socket_ioParser.ACK:
        this.onack(packet);
        break;

      case socket_ioParser.BINARY_ACK:
        this.onack(packet);
        break;

      case socket_ioParser.DISCONNECT:
        this.ondisconnect();
        break;

      case socket_ioParser.ERROR:
        this.emit('error', packet.data);
        break;
    }
  };

  /**
   * Called upon a server event.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onevent = function (packet) {
    var args = packet.data || [];
    debug('emitting event %j', args);

    if (null != packet.id) {
      debug('attaching ack callback to event');
      args.push(this.ack(packet.id));
    }

    if (this.connected) {
      emit.apply(this, args);
    } else {
      this.receiveBuffer.push(args);
    }
  };

  /**
   * Produces an ack callback to emit with an event.
   *
   * @api private
   */

  Socket.prototype.ack = function (id) {
    var self = this;
    var sent = false;
    return function () {
      // prevent double callbacks
      if (sent) return;
      sent = true;
      var args = toArray_1(arguments);
      debug('sending ack %j', args);

      var type = hasBinary_1(args) ? socket_ioParser.BINARY_ACK : socket_ioParser.ACK;
      self.packet({
        type: type,
        id: id,
        data: args
      });
    };
  };

  /**
   * Called upon a server acknowlegement.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onack = function (packet) {
    var ack = this.acks[packet.id];
    if ('function' === typeof ack) {
      debug('calling ack %s with %j', packet.id, packet.data);
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {
      debug('bad ack %s', packet.id);
    }
  };

  /**
   * Called upon server connect.
   *
   * @api private
   */

  Socket.prototype.onconnect = function () {
    this.connected = true;
    this.disconnected = false;
    this.emit('connect');
    this.emitBuffered();
  };

  /**
   * Emit buffered events (received and emitted).
   *
   * @api private
   */

  Socket.prototype.emitBuffered = function () {
    var i;
    for (i = 0; i < this.receiveBuffer.length; i++) {
      emit.apply(this, this.receiveBuffer[i]);
    }
    this.receiveBuffer = [];

    for (i = 0; i < this.sendBuffer.length; i++) {
      this.packet(this.sendBuffer[i]);
    }
    this.sendBuffer = [];
  };

  /**
   * Called upon server disconnect.
   *
   * @api private
   */

  Socket.prototype.ondisconnect = function () {
    debug('server disconnect (%s)', this.nsp);
    this.destroy();
    this.onclose('io server disconnect');
  };

  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @api private.
   */

  Socket.prototype.destroy = function () {
    if (this.subs) {
      // clean subscriptions to avoid reconnections
      for (var i = 0; i < this.subs.length; i++) {
        this.subs[i].destroy();
      }
      this.subs = null;
    }

    this.io.destroy(this);
  };

  /**
   * Disconnects the socket manually.
   *
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.close = Socket.prototype.disconnect = function () {
    if (this.connected) {
      debug('performing disconnect (%s)', this.nsp);
      this.packet({ type: socket_ioParser.DISCONNECT });
    }

    // remove socket from pool
    this.destroy();

    if (this.connected) {
      // fire events
      this.onclose('io client disconnect');
    }
    return this;
  };

  /**
   * Sets the compress flag.
   *
   * @param {Boolean} if `true`, compresses the sending data
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.compress = function (compress) {
    this.flags = this.flags || {};
    this.flags.compress = compress;
    return this;
  };
});

/**
 * Expose `Backoff`.
 */

var backo2 = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function () {
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function (min) {
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function (max) {
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

var _typeof$b = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Module dependencies.
 */

var debug$5 = browser$1('socket.io-client:manager');

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

var manager = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && 'object' === (typeof uri === 'undefined' ? 'undefined' : _typeof$b(uri))) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new backo2({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  this.encoder = new socket_ioParser.Encoder();
  this.decoder = new socket_ioParser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.engine.id;
    }
  }
};

/**
 * Mix in `Emitter`.
 */

componentEmitter$1(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open = Manager.prototype.connect = function (fn, opts) {
  debug$5('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug$5('opening %s', this.uri);
  this.engine = engine_ioClient(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on_1(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on_1(socket, 'error', function (data) {
    debug$5('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug$5('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug$5('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function destroy() {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug$5('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on_1(socket, 'data', componentBind(this, 'ondata')));
  this.subs.push(on_1(socket, 'ping', componentBind(this, 'onping')));
  this.subs.push(on_1(socket, 'pong', componentBind(this, 'onpong')));
  this.subs.push(on_1(socket, 'error', componentBind(this, 'onerror')));
  this.subs.push(on_1(socket, 'close', componentBind(this, 'onclose')));
  this.subs.push(on_1(this.decoder, 'decoded', componentBind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug$5('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new socket$1(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.engine.id;
    });

    if (this.autoConnect) {
      // manually call here since connecting evnet is fired before listening
      onConnecting();
    }
  }

  function onConnecting() {
    if (!~indexof(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexof(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug$5('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else {
    // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug$5('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close = Manager.prototype.disconnect = function () {
  debug$5('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug$5('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug$5('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug$5('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug$5('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug$5('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug$5('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function destroy() {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

var _typeof$c = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var lib$1 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */

  var debug = browser$1('socket.io-client');

  /**
   * Module exports.
   */

  module.exports = exports = lookup;

  /**
   * Managers cache.
   */

  var cache = exports.managers = {};

  /**
   * Looks up an existing `Manager` for multiplexing.
   * If the user summons:
   *
   *   `io('http://localhost/a');`
   *   `io('http://localhost/b');`
   *
   * We reuse the existing instance based on same scheme/port/host,
   * and we initialize sockets for each namespace.
   *
   * @api public
   */

  function lookup(uri, opts) {
    if ((typeof uri === 'undefined' ? 'undefined' : _typeof$c(uri)) === 'object') {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};

    var parsed = url_1(uri);
    var source = parsed.source;
    var id = parsed.id;
    var path = parsed.path;
    var sameNamespace = cache[id] && path in cache[id].nsps;
    var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;

    var io;

    if (newConnection) {
      debug('ignoring socket cache for %s', source);
      io = manager(source, opts);
    } else {
      if (!cache[id]) {
        debug('new io instance for %s', source);
        cache[id] = manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.query;
    } else if (opts && 'object' === _typeof$c(opts.query)) {
      opts.query = encodeQueryString(opts.query);
    }
    return io.socket(parsed.path, opts);
  }
  /**
   *  Helper method to parse query objects to string.
   * @param {object} query
   * @returns {string}
   */
  function encodeQueryString(obj) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }
  /**
   * Protocol version.
   *
   * @api public
   */

  exports.protocol = socket_ioParser.protocol;

  /**
   * `connect`.
   *
   * @param {String} uri
   * @api public
   */

  exports.connect = lookup;

  /**
   * Expose constructors for standalone build.
   *
   * @api public
   */

  exports.Manager = manager;
  exports.Socket = socket$1;
});
var lib_1 = lib$1.managers;
var lib_2 = lib$1.protocol;
var lib_3 = lib$1.connect;
var lib_4 = lib$1.Manager;
var lib_5 = lib$1.Socket;

var _typeof$d = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof$d(value)) == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

var lodash_isplainobject = isPlainObject;

var _typeof$e = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var flexRestClient = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", { value: true });

    function isString(s) {
        return typeof s === 'string';
    }
    function objToQueryString(obj) {
        return Object.keys(obj).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        }).join('&');
    }
    // JSON API standart by default
    function genSortParam(obj) {
        var sortArr = [];
        Object.keys(obj).forEach(function (attr) {
            sortArr.push((obj[attr] != 1 ? '-' : '') + attr);
        });
        return {
            key: 'sort',
            value: sortArr.join(',')
        };
    }
    // JSON API standart by default
    function genIncludeParam(arr) {
        return {
            key: 'include',
            value: arr.join(',')
        };
    }
    function _objAPIToQueryString(obj) {
        var resObj = {};
        if (lodash_isplainobject(obj.filter)) {
            Object.keys(obj.filter).forEach(function (attr) {
                if (lodash_isplainobject(obj.filter[attr])) {
                    Object.keys(obj.filter[attr]).forEach(function (op) {
                        resObj['filter[' + attr + '][' + op + ']'] = obj.filter[attr][op];
                    });
                } else {
                    resObj['filter[' + attr + ']'] = obj.filter[attr];
                }
            });
        }
        if (Array.isArray(obj.include)) {
            var _genIncludeParam = this.genIncludeParam(obj.include),
                key = _genIncludeParam.key,
                value = _genIncludeParam.value;

            resObj[key] = value;
        }
        if (lodash_isplainobject(obj.sort)) {
            var _genSortParam = this.genSortParam(obj.sort),
                _key = _genSortParam.key,
                _value = _genSortParam.value;

            resObj[_key] = _value;
        }
        if (lodash_isplainobject(obj.page)) {
            if (typeof obj.page.number !== "undefined") {
                resObj['page[number]'] = obj.page.number;
            }
            if (typeof obj.page.size !== "undefined") {
                resObj['page[size]'] = obj.page.size;
            }
        }
        /*
        if (typeof obj.skip === 'numeric' && typeof obj.limit === 'numeric' && obj.limit > 0){
          resObj[ `page[size]` ] = obj.page.limit;
          resObj[ `page[number]` ] = Math.floor(obj.skip / obj.page.limit) + 1;
        }
        */
        Object.keys(obj).forEach(function (attr) {
            if (['filter', 'include', 'sort', 'page' /*, 'skip', 'limit'*/].indexOf(attr) < 0) {
                if (lodash_isplainobject(obj[attr])) {
                    Object.keys(obj[attr]).forEach(function (op) {
                        resObj[attr + '[' + op + ']'] = obj[attr][op];
                    });
                } else {
                    resObj[attr] = obj[attr].toString();
                }
            }
        });
        return objToQueryString(resObj);
    }

    var RestClient = function () {
        function RestClient() {
            _classCallCheck(this, RestClient);

            this.headers = {};
            this.baseUrl = '';
        }

        _createClass(RestClient, [{
            key: 'config',
            value: function config(_ref) {
                var headers = _ref.headers,
                    baseUrl = _ref.baseUrl,
                    _ref$addHeaders = _ref.addHeaders,
                    addHeaders = _ref$addHeaders === undefined ? null : _ref$addHeaders,
                    requestMethod = _ref.requestMethod,
                    _ref$genQueryStringFu = _ref.genQueryStringFunctions,
                    genQueryStringFunctions = _ref$genQueryStringFu === undefined ? undefined : _ref$genQueryStringFu;

                if (headers) {
                    this.headers = headers;
                }
                if (addHeaders) {
                    this.headers = Object.assign({}, this.headers, addHeaders);
                }
                if (baseUrl) {
                    this.baseUrl = baseUrl;
                }
                if (requestMethod) {
                    this.requestMethod = requestMethod;
                }
                this.genSortParam = genSortParam;
                this.genIncludeParam = genIncludeParam;
                if ((typeof genQueryStringFunctions === 'undefined' ? 'undefined' : _typeof$e(genQueryStringFunctions)) === 'object') {
                    if (typeof genQueryStringFunctions.genSortParam === 'function') {
                        this.genSortParam = genQueryStringFunctions.genSortParam;
                    }
                    if (typeof genQueryStringFunctions.genIncludeParam === 'function') {
                        this.genIncludeParam = genQueryStringFunctions.genIncludeParam;
                    }
                }
            }
        }, {
            key: 'objAPIToQueryString',
            value: function objAPIToQueryString(obj) {
                return _objAPIToQueryString.bind(this)(obj);
            }
        }, {
            key: 'request',
            value: function request(_ref2) {
                var _ref2$url = _ref2.url,
                    url = _ref2$url === undefined ? null : _ref2$url,
                    _ref2$baseUrl = _ref2.baseUrl,
                    baseUrl = _ref2$baseUrl === undefined ? null : _ref2$baseUrl,
                    path = _ref2.path,
                    _ref2$query = _ref2.query,
                    query = _ref2$query === undefined ? undefined : _ref2$query,
                    method = _ref2.method,
                    _ref2$headers = _ref2.headers,
                    headers = _ref2$headers === undefined ? {} : _ref2$headers,
                    _ref2$bodyJSObject = _ref2.bodyJSObject,
                    bodyJSObject = _ref2$bodyJSObject === undefined ? undefined : _ref2$bodyJSObject;

                var urlFetch = url ? url : (baseUrl ? baseUrl : this.baseUrl) + path;
                query = lodash_isplainobject(query) ? this.objAPIToQueryString(query) : isString(query) ? query : undefined;
                if (query) {
                    urlFetch += '?' + query;
                }
                return this.requestMethod({ url: urlFetch,
                    method: method,
                    headers: Object.assign({}, this.headers, headers),
                    bodyJSObject: bodyJSObject
                });
            }
        }, {
            key: 'get',
            value: function get(model, idOrPath, query) {
                var realPath = '';
                realPath = '/' + model + '/' + idOrPath;
                return this.request({
                    path: realPath,
                    query: lodash_isplainobject(query) ? this.objAPIToQueryString(query) : isString(query) ? query : undefined,
                    method: 'get'
                });
            }
        }, {
            key: 'post',
            value: function post(model, dataOrAction) {
                var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                var realPath = '';
                var realData = null;
                if (data) {
                    realPath = '/' + model + '/' + dataOrAction;
                    realData = data;
                } else {
                    realPath = '/' + model;
                    realData = dataOrAction;
                }
                return this.request({ path: realPath, method: 'post', bodyJSObject: realData });
            }
        }, {
            key: 'put',
            value: function put(model, idOrPath) {
                var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                var realPath = '';
                realPath = '/' + model + '/' + idOrPath;
                return this.request({ path: realPath, method: 'put', bodyJSObject: data });
            }
        }, {
            key: 'put_not_id',
            value: function put_not_id(model) {
                var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                var realPath = '';
                realPath = '/' + model;
                return this.request({ path: realPath, method: 'put', bodyJSObject: data });
            }
        }, {
            key: 'delete',
            value: function _delete(model, idOrPath) {
                var realPath = '';
                realPath = '/' + model + '/' + idOrPath;
                return this.request({
                    path: realPath,
                    method: 'delete'
                });
            }
        }, {
            key: 'find',
            value: function find(model) {
                var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

                var realPath = '';
                realPath = '/' + model;
                return this.request({
                    path: realPath,
                    query: lodash_isplainobject(query) ? this.objAPIToQueryString(query) : isString(query) ? query : undefined,
                    method: 'get'
                });
            }
        }, {
            key: 'findOne',
            value: function findOne(model, id, query) {
                var realPath = '';
                realPath = '/' + model + '/' + id;
                return this.request({
                    path: realPath,
                    query: lodash_isplainobject(query) ? this.objAPIToQueryString(query) : isString(query) ? query : undefined,
                    method: 'get'
                });
            }
        }, {
            key: 'create',
            value: function create(model, data) {
                return this.post(model, data);
            }
        }, {
            key: 'update',
            value: function update(model, id, data) {
                return this.put(model, id, data);
            }
        }, {
            key: 'remove',
            value: function remove(model, id) {
                return this.delete(model, id);
            }
        }]);

        return RestClient;
    }();

    exports.default = RestClient;
    
});

var RestClient = unwrapExports(flexRestClient);

function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function makeRequest(_ref) {
  var url = _ref.url,
      method = _ref.method,
      headers = _ref.headers,
      bodyJSObject = _ref.bodyJSObject;

  console.log({ url: url, method: method, headers: headers, bodyJSObject: bodyJSObject });
  return fetch(url, {
    method: method || "GET",
    headers: Object.assign({}, this.headers, headers),
    body: bodyJSObject ? JSON.stringify(bodyJSObject) : undefined
  }).then(checkHttpStatus).then(function (response) {
    return response.json();
  });
}

var restClient = new RestClient();
restClient.config({
  baseUrl: '',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  requestMethod: makeRequest,
  genQueryStringFunctions: {
    genSortParam: function genSortParam(obj) {
      var sortArr = [];
      Object.keys(obj).forEach(function (attr) {
        sortArr.push(attr + ' ' + (obj[attr] != 1 ? 'DESC' : 'ASC'));
      });
      return {
        key: 'sort',
        value: sortArr.join(',')
      };
    },
    genIncludeParam: function genIncludeParam(arr) {
      return {
        key: 'populate',
        value: arr.join(',')
      };
    }
  }

});

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
  function Auth(restClient, io) {
    _classCallCheck$1(this, Auth);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$1(Auth, [{
    key: "login",
    value: function login(data, cb) {
      var _this = this;

      this.restClient.post('login', data).then(function (responce) {
        var headers = {
          "x-token": responce.access_token,
          "x-user": data.email
        };
        _this.io.sails.initialConnectionHeaders = headers;
        _this.restClient.headers = Object.assign({}, _this.restClient.headers, headers);
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: "loginWithToken",
    value: function loginWithToken(_ref, cb) {
      var token = _ref.token,
          appId = _ref.appId,
          email = _ref.email;

      var headers = {
        "x-token": token
      };
      if (email) {
        headers["x-user"] = email;
      }
      if (appId) {
        headers["x-app"] = appId;
      }
      this.io.sails.initialConnectionHeaders = headers;
      this.io.socket.headers = headers;
      this.io.socket.extraHeaders = headers;
      this.restClient.headers = Object.assign({}, this.restClient.headers, headers);
      cb({ status: 'ok' }, null);
    }
  }]);

  return Auth;
}();

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Admin = function () {
  function Admin(restClient) {
    _classCallCheck$2(this, Admin);

    this.restClient = restClient;
  }

  _createClass$2(Admin, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/admin', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'event',
    value: function event(body, cb) {
      this.restClient.request({ path: '/admin/admin_event', method: 'post', bodyJSObject: body }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getAdmins',
    value: function getAdmins(query, cb) {
      this.restClient.request({ path: '/admin', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getProfile',
    value: function getProfile(cb) {
      this.restClient.request({ path: '/me', method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'updateProfile',
    value: function updateProfile(data, cb) {
      this.restClient.post('admin/admin', data).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'uploadAvatar',
    value: function uploadAvatar(data, cb) {
      fetch(this.restClient.baseUrl + '/admin/upload_avatar', {
        method: 'POST',
        headers: {
          "x-token": this.restClient.headers['x-token']
        },
        body: data
      }).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        cb(responseJson, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'destroyAvatar',
    value: function destroyAvatar(cb) {
      this.restClient.post('admin/destroy_avatar').then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'updateAppearanceSettings',
    value: function updateAppearanceSettings(data, cb) {
      this.restClient.post('app/appearance_settings', data).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Admin;
}();

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Attribute = function () {
  function Attribute(restClient) {
    _classCallCheck$3(this, Attribute);

    this.restClient = restClient;
  }

  _createClass$3(Attribute, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/attribute', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Attribute;
}();

var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(restClient, io) {
    _classCallCheck$4(this, User);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$4(User, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/user', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'get',
    value: function get(id, cb) {
      return this.restClient.request({ path: '/user/' + id, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'update',
    value: function update(id, data, cb) {
      this.restClient.request({
        path: '/user/' + id,
        method: 'put',
        bodyJSObject: data
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'searchByPredicates',
    value: function searchByPredicates(data, cb) {
      var url = '/user/search';
      var query = {};
      if (Array.isArray(data)) {
        data = { predicates: data };
      } else {
        if (data.hasOwnProperty('query')) {
          query = Object.assign({}, data.query);
          delete data.query;
        }
        if (data.hasOwnProperty('skip') || data.hasOwnProperty('limit') || data.hasOwnProperty('sort')) {
          if (data.hasOwnProperty('skip')) {
            query['skip'] = data.skip;
            delete data.skip;
          }
          if (data.hasOwnProperty('limit')) {
            query['limit'] = data.limit;
            delete data.limit;
          }
          if (data.hasOwnProperty('sort')) {
            query['sort'] = data.skip;
            delete data.sort;
          }
        }
      }

      this.restClient.request({
        path: url,
        method: 'post',
        query: query,
        bodyJSObject: data
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getUser',
    value: function getUser(id, cb) {
      return this.restClient.request({ path: '/user', method: 'get', query: { id: id } }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getUsers',
    value: function getUsers(query, cb) {
      this.restClient.request({ path: '/user', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'updateUser',
    value: function updateUser(id, data, cb) {
      this.restClient.request({
        path: '/user/' + id,
        method: 'put',
        bodyJSObject: data
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'setUserTag',
    value: function setUserTag(_ref, cb) {
      var id = _ref.id,
          tag_id = _ref.tag_id;

      this.restClient.request({
        path: '/user/' + id + '/add_tag',
        method: 'post',
        bodyJSObject: {
          "tag": tag_id
        }
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'createUserTag',
    value: function createUserTag(_ref2, cb) {
      var ids = _ref2.ids,
          tag = _ref2.tag;

      this.restClient.request({
        path: '/user/bulk_tag',
        method: 'post',
        bodyJSObject: {
          "tag_name": tag,
          "included_ids": ids
        }
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'updateUserTags',
    value: function updateUserTags(_ref3, cb) {
      var id = _ref3.id,
          tag_ids = _ref3.tag_ids;

      this.restClient.request({
        path: '/user/update_tags',
        method: 'post',
        bodyJSObject: {
          "id": id,
          "tag_ids": tag_ids
        }
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return User;
}();

var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tag = function () {
  function Tag(restClient, io) {
    _classCallCheck$5(this, Tag);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$5(Tag, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/tag', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getTags',
    value: function getTags(query, cb) {
      this.restClient.request({ path: '/tag', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Tag;
}();

var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Inbox = function () {
  function Inbox(restClient, io) {
    _classCallCheck$6(this, Inbox);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$6(Inbox, [{
    key: 'getUser',
    value: function getUser(id, cb) {
      return this.restClient.request({ path: '/user?id=' + id, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getUsers',
    value: function getUsers(query, cb) {
      this.restClient.request({ path: '/user', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getInboxes',
    value: function getInboxes(query, cb) {
      this.restClient.request({ path: '/app/inboxes', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getConversation',
    value: function getConversation(id, cb) {
      this.restClient.request({ path: '/conversation/' + id, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getConversations',
    value: function getConversations(query, cb) {
      this.restClient.request({
        path: '/conversation',
        method: 'get',
        query: query
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getConversationMessages',
    value: function getConversationMessages(id, cb) {
      this.restClient.request({
        path: '/conversation/' + id + '/messages',
        method: 'get'
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(message, cb) {
      this.io.socket.request({
        method: 'get',
        url: '/api/conversation/message',
        data: message
      }, function (body, response) {
        if (response.statusCode == 200) {
          cb(body, null);
        } else {
          cb(null, body);
        }
      });
    }
  }, {
    key: 'onMessage',
    value: function onMessage(cb) {
      this.io.socket.on('message', function (msg) {
        cb(msg);
      });
    }
  }, {
    key: 'onWidgetEvent',
    value: function onWidgetEvent(cb) {
      this.io.socket.on("widget_event", function (data) {
        cb(data);
      });
    }
  }, {
    key: 'upload_file',
    value: function upload_file(form, cb) {
      fetch(this.restClient.baseUrl + '/upload', {
        method: 'POST',
        headers: {
          "x-token": this.restClient.headers['x-token']
        },
        body: form
      }).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        cb(responseJson, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'read_by_admin',
    value: function read_by_admin(id, cb) {
      fetch(this.restClient.baseUrl + '/conversation/' + id + '/read_by_admin', {
        method: 'PUT',
        headers: {
          "x-token": this.restClient.headers['x-token']
        }
      }).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        cb(responseJson, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'onEvent',
    value: function onEvent(cb) {
      this.io.socket.on('admin_event', function (e) {
        cb(e);
      });
    }
  }]);

  return Inbox;
}();

var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Conversation = function () {
  function Conversation(restClient, io) {
    _classCallCheck$7(this, Conversation);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$7(Conversation, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/conversation', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'messages',
    value: function messages(id, query, cb) {
      query['conversation_id'] = id;
      this.restClient.request({ path: '/message', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Conversation;
}();

var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message(restClient, io) {
    _classCallCheck$8(this, Message);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$8(Message, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/message', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Message;
}();

var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App(restClient, io) {
    _classCallCheck$9(this, App);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$9(App, [{
    key: 'getInboxes',
    value: function getInboxes(query, cb) {
      this.restClient.request({ path: '/app/inboxes', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'getAppearanceSettings',
    value: function getAppearanceSettings(cb) {
      this.restClient.request({ path: '/app/appearance_settings', method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'setAppearanceSettings',
    value: function setAppearanceSettings(bodyJSObject, cb) {
      this.restClient.request({ path: '/app/appearance_settings', method: 'post', bodyJSObject: bodyJSObject }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return App;
}();

var _createClass$a = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Segments = function () {
  function Segments(restClient, io) {
    _classCallCheck$a(this, Segments);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$a(Segments, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/segment', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'get',
    value: function get(id, cb) {
      return this.restClient.request({ path: '/segment/' + id, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'set',
    value: function set(data, cb) {
      this.restClient.request({
        path: '/segment',
        method: 'post',
        bodyJSObject: data
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'update',
    value: function update(id, data, cb) {
      this.restClient.request({
        path: '/segment/' + id,
        method: 'put',
        bodyJSObject: data
      }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Segments;
}();

var _createClass$b = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Team = function () {
  function Team(restClient, io) {
    _classCallCheck$b(this, Team);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$b(Team, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/team', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'get',
    value: function get(id, cb) {
      this.restClient.request({ path: '/team/' + id, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Team;
}();

var _createClass$c = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
  function Event(restClient, io) {
    _classCallCheck$c(this, Event);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$c(Event, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/event', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Event;
}();

var _createClass$d = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Company = function () {
  function Company(restClient) {
    _classCallCheck$d(this, Company);

    this.restClient = restClient;
  }

  _createClass$d(Company, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/company', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'get',
    value: function get(id, cb) {
      this.restClient.request({ path: '/company/' + id, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'search',
    value: function search(data, cb) {
      var query = {};
      if (data.sort) {
        query['sort'] = data.sort;
        delete data.sort;
      }
      if (data.limit) {
        query['limit'] = data.limit;
        delete data.limit;
      }
      if (data.skip) {
        query['skip'] = data.skip;
        delete data.skip;
      }
      this.restClient.request({ path: '/company/search', method: 'post', query: query, bodyJSObject: data }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Company;
}();

var _createClass$e = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ManualMessage = function () {
  function ManualMessage(restClient) {
    _classCallCheck$e(this, ManualMessage);

    this.restClient = restClient;
  }

  _createClass$e(ManualMessage, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/newmessage', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'get',
    value: function get(id, cb) {
      this.restClient.request({ path: '/newmessage/' + id, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'create',
    value: function create(data, cb) {
      this.restClient.request({ path: '/newmessage', method: 'post', bodyJSObject: data }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'update',
    value: function update(id, data, cb) {
      this.restClient.request({ path: '/newmessage/' + id, method: 'put', bodyJSObject: data }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'send',
    value: function send(id, cb) {
      this.restClient.request({ path: '/newmessage/' + id + '/send', method: 'post' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'counts',
    value: function counts(cb) {
      this.restClient.request({ path: '/newmessage/counts', method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'users',
    value: function users(id, action, cb) {
      this.restClient.request({ path: '/newmessage/' + id + '/users?action=' + action, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'start',
    value: function start(id, variation, cb) {
      this.restClient.request({ path: '/newmessage/' + id + '/start', method: 'post', bodyJSObject: { variation: variation } }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'stop',
    value: function stop(id, variation, cb) {
      this.restClient.request({ path: '/newmessage/' + id + '/stop', method: 'post', bodyJSObject: { variation: variation } }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'startVariation',
    value: function startVariation(id, variation, cb) {
      this.restClient.request({ path: '/newmessage/' + id + '/variation/' + variation + 'start', method: 'post' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'stopVariation',
    value: function stopVariation(id, variation, cb) {
      this.restClient.request({ path: '/newmessage/' + id + '/variation/' + variation + 'stop', method: 'post' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'deleteVariation',
    value: function deleteVariation(id, variation, cb) {
      this.restClient.request({ path: '/newmessage/' + id + '/variation/' + variation, method: 'delete' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return ManualMessage;
}();

var _createClass$f = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Forms = function () {
  function Forms(restClient, io) {
    _classCallCheck$f(this, Forms);

    this.restClient = restClient;
    this.io = io;
  }

  _createClass$f(Forms, [{
    key: 'find',
    value: function find(query, cb) {
      this.restClient.request({ path: '/form', method: 'get', query: query }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'get',
    value: function get(id, cb) {
      this.restClient.request({ path: '/form/' + id, method: 'get' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'create',
    value: function create(bodyJSObject, cb) {
      this.restClient.request({ path: '/form', method: 'post', bodyJSObject: bodyJSObject }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'update',
    value: function update(bodyJSObject, cb) {
      this.restClient.request({ path: '/form/' + bodyJSObject.id, method: 'put', bodyJSObject: bodyJSObject }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(id, cb) {
      this.restClient.request({ path: '/form/' + id, method: 'delete' }).then(function (responce) {
        cb(responce, null);
      }).catch(function (error) {
        cb(null, error);
      });
    }
  }]);

  return Forms;
}();

var _createClass$g = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WidgetSDK = function () {
  function WidgetSDK(_ref) {
    var url = _ref.url;

    _classCallCheck$g(this, WidgetSDK);

    var io = sails_io(lib$1);
    io.sails.url = url;
    io.sails.useCORSRouteToGetCookie = false;
    io.sails.autoConnect = true;
    this.io = io;
    restClient.baseUrl = url + '/api';
    this.restClient = restClient;
    this.options = { urlApi: url };
    this.onMessage = function () {};
    this.inited = false;
    this.anonymous_session = null;

    this.auth = new Auth(this.restClient, this.io);
    this.admin = new Admin(this.restClient, this.io);
    this.inbox = new Inbox(this.restClient, this.io);
    this.conversation = new Conversation(this.restClient, this.io);
    this.company = new Company(this.restClient, this.io);
    this.attribute = new Attribute(this.restClient, this.io);
    this.user = new User(this.restClient, this.io);
    this.tag = new Tag(this.restClient, this.io);
    this.app = new App(this.restClient, this.io);
    this.segments = new Segments(this.restClient, this.io);
    this.team = new Team(this.restClient, this.io);
    this.event = new Event(this.restClient, this.io);
    this.message = new Message(this.restClient, this.io);
    this.manual_message = new ManualMessage(this.restClient, this.io);
    this.forms = new Forms(this.restClient, this.io);
  }

  _createClass$g(WidgetSDK, [{
    key: 'init',
    value: function init(_ref2, cb) {
      var _this = this;

      var token = _ref2.token,
          email = _ref2.email,
          headers = _ref2.headers;

      var own_headers = {};
      if (!headers) {
        if (!token) {
          return cb(null, {
            status: false,
            message: 'Token should be required'
          });
        }
        if (!this.options.urlApi) {
          return cb(null, {
            status: false,
            message: 'Url API should be required'
          });
        }
        var own_headers = {
          "x-token": token
        };
        if (email) {
          own_headers['x-user'] = email;
        }
      } else {
        own_headers = headers;
      }

      this.io.sails.initialConnectionHeaders = own_headers;
      this.io.socket.headers = own_headers;
      this.io.socket.request({
        method: 'get',
        url: '/api/admin/socket_init'
      }, function (body, response) {
        console.log('INIT : Server responded with status code ' + response.statusCode + ' and data: ', body);
        console.log(_this.io.socket);
        console.log(_this.io.sails);
        if (response.statusCode == 200) {
          cb(body);
        } else {
          cb(null, body);
        }
      });
    }
  }]);

  return WidgetSDK;
}();

module.exports = WidgetSDK;
