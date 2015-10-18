#import <Cordova/CDV.h>
#import <AdBuddiz/AdBuddiz.h>

@interface ContextAwareAdBuddizDelegate : NSObject <AdBuddizDelegate> {
	CDVPlugin* cdvPlugin;
	NSString* callbackId;
}

- (id)initWithPlugin:(CDVPlugin*)plugin command:(CDVInvokedUrlCommand*)command;

@end