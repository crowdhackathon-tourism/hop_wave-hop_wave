var bridge = cordova.require("com.purplebrain.adbuddiz.sdk.AdBuddizBridge");

var fallbackDelegate = null;

var adBuddizDelegateCallback = function(sEventToDispatch) {
	if(sEventToDispatch == null || sEventToDispatch == undefined) {
		return;
	} else if(sEventToDispatch == "OK") {
		return;
	} else {
		var eventToDispatch = sEventToDispatch.split(":");
		var detail = null;
		if(eventToDispatch.length > 1)
			detail = eventToDispatch[1];
		try {
			var customDelegateEvent = document.createEvent('CustomEvent');
			customDelegateEvent.initCustomEvent(eventToDispatch[0], true, true, detail);
			document.dispatchEvent(customDelegateEvent);
		} catch(ex) {
			if(fallbackDelegate != null) {
				switch(eventToDispatch[0]) {
					case "AB-didCacheAd":
						fallbackDelegate.didCacheAd();
						break;
					case "AB-didShowAd":
						fallbackDelegate.didShowAd();
						break;
					case "AB-didFailToShowAd":
						fallbackDelegate.didFailToShowAd(detail);
						break;
					case "AB-didClick":
						fallbackDelegate.didClick();
						break;
					case "AB-didHideAd":
						fallbackDelegate.didHideAd();
						break;
				}
			}
		}
        
	}
}

var AdBuddiz = {
	setLogLevel: function(logLevel) {
		bridge.setLogLevel(logLevel, adBuddizDelegateCallback, null);
	},
	setIOSPublisherKey: function(publisherKey) {
		if(window.device.platform == "iOS") {
			bridge.setPublisherKey(publisherKey, adBuddizDelegateCallback, null);
		}
	},
	setAndroidPublisherKey: function(publisherKey) {
		if(window.device.platform == "Android") {
			bridge.setPublisherKey(publisherKey, adBuddizDelegateCallback, null);
		}
	},
	setTestModeActive: function() {
		bridge.setTestModeActive(adBuddizDelegateCallback, null);
	},
	cacheAds: function() {
		bridge.cacheAds(adBuddizDelegateCallback, null);
	},
	isReadyToShowAd: function() {
		if(arguments.length == 0)
			return;
		var trueCallback = arguments[0];
		var falseCallback = (arguments.length > 0)?arguments[1]:null;
		var successCallback = function(messageOrEventToDispatch) {
			if(messageOrEventToDispatch == "true") {
				trueCallback();
			} else if(messageOrEventToDispatch == "false") {
				if(falseCallback != null)
					falseCallback();
			} else {
				adBuddizDelegateCallback(messageOrEventToDispatch);
			}
		};
		if(arguments.length > 0) {
			bridge.isReadyToShowAd(successCallback, null, arguments[0]);
		} else {
			bridge.isReadyToShowAd(successCallback, null);
		}
	},
	showAd: function() {
		if(arguments.length > 0) {
			bridge.showAd(adBuddizDelegateCallback, null, arguments[0])
		} else {
			bridge.showAd(adBuddizDelegateCallback, null);
		}
	},
	setDelegate: function(delegate) {
		fallbackDelegate = delegate;
	},
	LogLevel: {
		Info: "Info",
		Error: "Error",
		Silent: "Silent"
	}
};

module.exports = AdBuddiz;