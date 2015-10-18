#import <Cordova/CDV.h>

@interface AdBuddizBridge : CDVPlugin

- (void)setLogLevel:(CDVInvokedUrlCommand*)command;

- (void)setPublisherKey:(CDVInvokedUrlCommand*)command;

- (void)setTestModeActive:(CDVInvokedUrlCommand*)command;

- (void)cacheAds:(CDVInvokedUrlCommand*)command;

- (void)isReadyToShowAd:(CDVInvokedUrlCommand*)command;

- (void)showAd:(CDVInvokedUrlCommand*)command;

@end