package com.pradeet.loaders;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class RNLoadersModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNLoadersModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNLoaders";
    }
}