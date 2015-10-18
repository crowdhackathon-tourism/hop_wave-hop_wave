#import "AdBuddizBridge.h"
#import "ContextAwareAdBuddizDelegate.h"

#import <AdBuddiz/AdBuddiz.h>

@implementation AdBuddizBridge

- (void)success:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [pluginResult setKeepCallbackAsBool: TRUE];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];    
}

- (void)storeCallbackContext:(CDVInvokedUrlCommand*)command 
{
    ContextAwareAdBuddizDelegate* delegate = [[ContextAwareAdBuddizDelegate alloc] initWithPlugin:self command:(CDVInvokedUrlCommand*)command];
    [AdBuddiz setDelegate:delegate];
}

- (void)setLogLevel:(CDVInvokedUrlCommand*)command
{
    NSString* logLevel = [command.arguments objectAtIndex:0];
    if([logLevel isEqualToString:@"Info"]) {
        [AdBuddiz setLogLevel:ABLogLevelInfo];
    } else if([logLevel isEqualToString:@"Error"]) {
        [AdBuddiz setLogLevel:ABLogLevelError];
    } else if([logLevel isEqualToString:@"Silent"]) {
        [AdBuddiz setLogLevel:ABLogLevelSilent];
    }
    [self storeCallbackContext: command];
    [self success:command];
}

- (void)setPublisherKey:(CDVInvokedUrlCommand*)command
{
    [AdBuddiz setPublisherKey:[command.arguments objectAtIndex:0]];
    [self storeCallbackContext: command];
    [self success:command];
}

- (void)setTestModeActive:(CDVInvokedUrlCommand*)command;
{
    [AdBuddiz setTestModeActive];
}

- (void)cacheAds:(CDVInvokedUrlCommand*)command
{
    [AdBuddiz cacheAds];
    [self storeCallbackContext: command];
    [self success:command];   
}

- (void)isReadyToShowAd:(CDVInvokedUrlCommand*)command {
    BOOL bIsReadyToShowAd = NO;
    if([command.arguments count] > 0 && [[command.arguments objectAtIndex:0] isKindOfClass:[NSString class]]) {
        bIsReadyToShowAd = [AdBuddiz isReadyToShowAd:[command.arguments objectAtIndex:0]];
    } else {
        bIsReadyToShowAd = [AdBuddiz isReadyToShowAd];
    }

    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:(bIsReadyToShowAd?@"true":@"false")];
    [pluginResult setKeepCallbackAsBool: TRUE];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

    [self storeCallbackContext: command];
    [self success:command];
}

- (void)showAd:(CDVInvokedUrlCommand*)command
{
    if([command.arguments count] > 0 && [[command.arguments objectAtIndex:0] isKindOfClass:[NSString class]]) {
        [AdBuddiz showAd:[command.arguments objectAtIndex:0]];
    } else {
        [AdBuddiz showAd];
    }
    [self storeCallbackContext: command];
    [self success:command];
}

@end