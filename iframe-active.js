/**
 * iframe-active.js
 *
 * https://github.com/vmllab-js/iframe-active | Released under MIT license
 *
 * @author https://github.com/Rhineliu
 * @since 2017-06-08
 */
(function (global, factory) {

	"use strict";

	if (!global.document) {
		throw new Error("IFrameActive requires a window with a document"); // reference from jQuery.js
	}

	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory(global, true);
	} else if (typeof define === "function" && define.amd) {
		define("IFrameActive", [], function () {
			return factory(global);
		});
	} else {
		global.IFrameActive = factory(global);
	}

})(this, function (global, noGlobal) {

	"use strict";

	var IFrameActive = function (resolution) {
		this.resolution = resolution || 200;
		this.iframes = [];
		this.interval = null;
	};
	IFrameActive.prototype = {
		Iframe: function (element, callback) {
			this.element = element;
			this.callback = callback;
			this.hasTracked = false;
			this.activeCount = 0;
		},
		track: function (element, callback) {
			this.iframes.push(new this.Iframe(element, callback));
			if (!this.interval) {
				var _this = this;
				this.interval = setInterval(function () {
					_this.__checkActive();
				}, this.resolution);
			}
		},
		destroy: function () {
			this.iframes = [];
			if (this.interval !== null) {
				clearInterval(this.interval);
				this.interval = null;
			}
		},
		__checkActive: function () {
			if (document.activeElement) {
				var activeElement = document.activeElement;
				this.iframes.forEach(function (iframe) {
					if (activeElement === iframe.element) {
						if (iframe.hasTracked === false) {
							iframe.hasTracked = true;
							++iframe.activeCount;
							iframe.callback.call(window, true, iframe.activeCount);
						}
					} else {
						if (iframe.hasTracked === true) {
							iframe.hasTracked = false;
							iframe.callback.call(window, false, iframe.activeCount);
						}
					}
				});
			}
		}
	};

	return IFrameActive;

});