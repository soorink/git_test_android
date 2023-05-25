wmatrix.define("wmatrix-plugin-screenrecorder.screenRecorder", function(require, exports, module) {

var screenrecorderExport = {};

var exec = require('wmatrix/exec');

screenrecorderExport.recordScreen = function (callback, data){
    exec(callback,"ScreenRecorderPlugin","recordScreen",data);
}
screenrecorderExport.recordFinish = function (callback){
    exec(callback,"ScreenRecorderPlugin","recordFinish");
}
screenrecorderExport.recordPause = function (callback){
    exec(callback, "ScreenRecorderPlugin", "recordPause")
}
screenrecorderExport.recordResume = function (callback){
    exec(callback, "ScreenRecorderPlugin", "recordResume")
}
screenrecorderExport.recordStatus = function (callback){
    exec(callback, "ScreenRecorderPlugin", "recordStatus")
}
screenrecorderExport.recordCancel = function (callback){
    exec(callback, "ScreenRecorderPlugin", "recordCancel")
}
screenrecorderExport.deleteFile = function (callback, data){
    exec(callback, "ScreenRecorderPlugin", "deleteFile", data)
}
screenrecorderExport.deleteAllFile = function (callback, data){
    exec(callback, "ScreenRecorderPlugin", "deleteAllFile", data)
}

module.exports = screenrecorderExport;


});