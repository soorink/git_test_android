var appExport = {};

var argscheck = require('wmatrix/argscheck'),
    exec = require('wmatrix/exec');

appExport.reset = {};
appExport.finish = {};
appExport.version = {};
appExport.checkDevice = {};
appExport.getLog = {};
appExport.getLogUpload = {};
appExport.getLogMail = {};
appExport.clearLog = {};
appExport.logPath = {};
appExport.speakTTS = {};
appExport.startSpeechToText = {};
appExport.stopSpeechToText = {};
appExport.setupBrightness = {};

appExport.reset = function (callback, data){
    exec(callback,"AppPlugin","appReset",data);
}

appExport.finish = function (callback, data){
    exec(callback,"AppPlugin","appFinish",data);
}

appExport.version = function (callback){
    exec(callback,"AppPlugin","appVersion");
}

appExport.checkDeviceType = function (callback){
    exec(callback,"AppPlugin","checkDeviceType");
}

appExport.startWebView = function (callback, data){
    exec(callback,"AppPlugin","startWebView",data);
}

appExport.setWebviewTouchListener = function (callback, data){
    exec(callback,"AppPlugin","setWebviewTouchListener");
}

appExport.checkAppInstalled = function (callback, data){
    exec(callback,"AppPlugin","checkAppInstalled", data);
}

appExport.screenCapture = function (callback, data){
    exec(callback,"AppPlugin","screenCapture", data);
}

appExport.setPreference = function (callback, data){
    exec(callback,"AppPlugin","setPreference", data);
}

appExport.getPreference = function (callback, data){
    exec(callback,"AppPlugin","getPreference", data);
}

appExport.removePreference = function (callback, data){
    exec(callback,"AppPlugin","removePreference", data);
}

appExport.shareData = function (callback, data){
    exec(callback,"AppPlugin","shareData", data);
}

appExport.screenOrientation = function (callback, data){
    exec(callback,"AppPlugin","screenOrientation", data);
}

appExport.getLog = function (callback, data){
    exec(callback,"AppPlugin","getLog", data);
}

appExport.getLogUpload = function (callback, data){
    exec(callback,"AppPlugin","getLogUpload", data);
}

appExport.getLogMail = function (callback, data){
    exec(callback,"AppPlugin","getLogMail", data);
}

appExport.clearLog = function (callback){
    exec(callback,"AppPlugin","clearLog");
}

appExport.logPath = function (callback, data){
    exec(callback,"AppPlugin","logPath",data);
}

appExport.speakTTS = function (callback, data){
    exec(callback,"AppPlugin","speakTTS",data);
}

appExport.startSpeechToText = function (callback){
    exec(callback,"AppPlugin","startSpeechToText");
}

appExport.stopSpeechToText = function (callback){
    exec(callback,"AppPlugin","stopSpeechToText");
}

appExport.setupBrightness = function (callback, data){
    exec(callback,"AppPlugin","setupBrightness",data);
}

module.exports = appExport;