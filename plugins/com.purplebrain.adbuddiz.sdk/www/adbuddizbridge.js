var AdBuddizBridge = {
	setLogLevel: function(logLevel, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdBuddizBridge',
            'setLogLevel',
            [logLevel]
        ); 
    },
	setPublisherKey: function(publisherKey, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdBuddizBridge',
            'setPublisherKey',
            [publisherKey]
        ); 
    },
    setTestModeActive: function(logLevel, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdBuddizBridge',
            'setTestModeActive',
            []
        ); 
    },
    cacheAds: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'AdBuddizBridge',
            'cacheAds',
            []
        ); 
    },
    isReadyToShowAd: function() {
        var successCallback = arguments[0];
        var errorCallback = arguments[1];
        var args = Array.prototype.slice.call(arguments, 2);
        cordova.exec(
            successCallback,
            errorCallback,
            'AdBuddizBridge',
            'isReadyToShowAd',
            args
        );
    },
    showAd: function() {
        var successCallback = arguments[0];
        var errorCallback = arguments[1];
        var args = Array.prototype.slice.call(arguments, 2);
        cordova.exec(
            successCallback,
            errorCallback,
            'AdBuddizBridge',
            'showAd',
            args
        ); 
    },
}

module.exports = AdBuddizBridge;