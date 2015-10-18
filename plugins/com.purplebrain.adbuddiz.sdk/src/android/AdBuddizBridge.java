package com.purplebrain.adbuddiz.sdk;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

public class AdBuddizBridge extends CordovaPlugin {

    private final static boolean SHOULD_LOG = false;
    private static final String TAG = AdBuddizBridge.class.getSimpleName();

    private static final String SET_LOG_LEVEL_ACTION = "setLogLevel";
    private static final String SET_PUBLISHER_KEY_ACTION = "setPublisherKey";
    private static final String SET_TEST_MODE_ACTIVE_ACTION = "setTestModeActive";
    private static final String CACHE_ADS_ACTION = "cacheAds";
    private static final String IS_READY_TO_SHOW_AD_ACTION = "isReadyToShowAd";
    private static final String SHOW_AD_ACTION = "showAd";

	@Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(SET_LOG_LEVEL_ACTION.equals(action)) {
            setLogLevel(args.getString(0));
        } else if (SET_PUBLISHER_KEY_ACTION.equals(action)) {
            AdBuddiz.setPublisherKey(args.getString(0));
        } else if(SET_TEST_MODE_ACTIVE_ACTION.equals(action)) {
            AdBuddiz.setTestModeActive();
        } else if(CACHE_ADS_ACTION.equals(action)) {
            AdBuddiz.cacheAds(this.cordova.getActivity());
        } else if(IS_READY_TO_SHOW_AD_ACTION.equals(action)) {
            isReadyToShowAd(args, callbackContext);
        } else if(SHOW_AD_ACTION.equals(action)) {
            showAd(args);
        } else {
            return false;
        }
        success(callbackContext);
        storeCallbackContext(callbackContext);
        return true;
    }

    private void setLogLevel(String sLogLevel) {
        for(AdBuddizLogLevel logLevel : AdBuddizLogLevel.values()) {
            if(logLevel.name().equals(sLogLevel)) {
                AdBuddiz.setLogLevel(logLevel);
            }
        }
    }

    private void isReadyToShowAd(JSONArray args, CallbackContext callbackContext) throws JSONException {
        boolean isReadyToShowAd = false;
        if(args.length() > 0) {
            isReadyToShowAd = AdBuddiz.isReadyToShowAd(this.cordova.getActivity(), args.getString(0));
        } else {
            isReadyToShowAd = AdBuddiz.isReadyToShowAd(this.cordova.getActivity());
        }
        PluginResult result = new PluginResult(PluginResult.Status.OK, Boolean.toString(isReadyToShowAd));
        result.setKeepCallback(true);
        callbackContext.sendPluginResult(result);
    }

    private void showAd(JSONArray args) throws JSONException {
        if(args.length() > 0) {
            AdBuddiz.showAd(this.cordova.getActivity(), args.getString(0));
        } else {
            AdBuddiz.showAd(this.cordova.getActivity());
        }
    }

    private void success(CallbackContext callbackContext) {
        PluginResult result = new PluginResult(PluginResult.Status.OK);
        result.setKeepCallback(true);
        callbackContext.sendPluginResult(result);
    }

    private void storeCallbackContext(CallbackContext callbackContext) {
        AdBuddiz.setDelegate(new ContextAwareAdBuddizDelegate(callbackContext));
    }

    private static class ContextAwareAdBuddizDelegate
        implements AdBuddizDelegate {

        private static final String EVENT_PREFIX = "AB-";

        private CallbackContext callbackContext;

        private ContextAwareAdBuddizDelegate(CallbackContext callbackContext) {
            this.callbackContext = callbackContext;
        }

        private void dispatchJavascriptEvent(String eventName) {
            dispatchJavascriptEvent(eventName, null);
        }

        private void dispatchJavascriptEvent(String eventName, String content) {
            String eventToDispatch = eventName + ((content != null) ? (":" + content) : "");
            PluginResult result = new PluginResult(PluginResult.Status.OK, eventToDispatch);
            result.setKeepCallback(true);
            callbackContext.sendPluginResult(result);
        }

        @Override
        public void didCacheAd() {
            dispatchJavascriptEvent(EVENT_PREFIX + "didCacheAd");
        }

        @Override
        public void didShowAd() {
            dispatchJavascriptEvent(EVENT_PREFIX + "didShowAd");
        }

        @Override
        public void didFailToShowAd(AdBuddizError error) {
            dispatchJavascriptEvent(EVENT_PREFIX + "didFailToShowAd", error.name());
        }

        @Override
        public void didClick() {
            dispatchJavascriptEvent(EVENT_PREFIX + "didClick");
        }

        @Override
        public void didHideAd() {
            dispatchJavascriptEvent(EVENT_PREFIX + "didHideAd");
        }

    }

}