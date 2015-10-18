#import "ContextAwareAdBuddizDelegate.h"

#import <AdBuddiz/AdBuddiz.h>

@implementation ContextAwareAdBuddizDelegate

- (id)initWithPlugin:(CDVPlugin*)plugin command:(CDVInvokedUrlCommand*)command
{
	cdvPlugin = plugin;
	callbackId = command.callbackId;
	return self;
}

- (void)dispatchJavascriptEvent:(NSString*) eventName
{
    [self dispatchJavascriptEvent:eventName content:nil];
}

- (void)dispatchJavascriptEvent:(NSString*) eventName content:(NSString*) content
{
    NSMutableString* eventToDispatch = [[NSMutableString alloc] init];
    [eventToDispatch setString: eventName];
    if(content != nil) {
		[eventToDispatch appendFormat:@":%@", content];
    }
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:eventToDispatch];
    [pluginResult setKeepCallbackAsBool: TRUE];
    [cdvPlugin.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)didCacheAd
{
	[self dispatchJavascriptEvent:@"AB-didCacheAd"];
}

- (void)didShowAd 
{
	[self dispatchJavascriptEvent:@"AB-didShowAd"];
}

- (void)didFailToShowAd:(AdBuddizError) error
{
	[self dispatchJavascriptEvent:@"AB-didFailToShowAd" content:[AdBuddiz nameForError:error]];
}

- (void)didClick
{
	[self dispatchJavascriptEvent:@"AB-didClick"];
}

- (void)didHideAd
{
	[self dispatchJavascriptEvent:@"AB-didHideAd"];
}

@end