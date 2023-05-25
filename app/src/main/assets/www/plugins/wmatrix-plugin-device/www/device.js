wmatrix.define("wmatrix-plugin-device.device", function(require, exports, module) {
var argscheck = require('wmatrix/argscheck');
var channel = require('wmatrix/channel');
var utils = require('wmatrix/utils');
var exec = require('wmatrix/exec');
var wmatrix = require('wmatrix');

channel.createSticky('onWMatrixInfoReady');
// Tell wmatrix channel to wait on the wmatrixInfoReady event
channel.waitForInitialization('onWMatrixInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Device () {
    this.available = false;
    this.appID = null;
    this.platform = null;
    this.version = null;
    this.uuid = null;
    this.wmatrix = null;
    this.model = null;
    this.manufacturer = null;
    this.isVirtual = null;
    this.serial = null;
    this.imei = null;

    var me = this;

    channel.onJSReady.subscribe(function () {
        me.getInfo(function (info) {
            // ignoring info.wmatrix returning from native, we should use value from wmatrix.version defined in wmatrix.js
            // TODO: CB-5105 native implementations should not return info.wmatrix
            var buildLabel = info.data.wmatrixVersion;
            me.available = true;
            me.appID = info.data.appID;
            me.platform = info.data.platform;
            me.version = info.data.version;
            me.uuid = info.data.uuid;
            me.wmatrix = buildLabel;
            me.model = info.data.model;
            me.isVirtual = info.data.isVirtual;
            me.manufacturer = info.data.manufacturer || 'unknown';
            me.serial = info.data.serial || 'unknown';
            me.imei = info.data.imei || 'unknown';
            channel.onWMatrixInfoReady.fire();
        }, function (e) {
            me.available = false;
            utils.alert('[ERROR] Error initializing wmatrix: ' + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
Device.prototype.getInfo = function (Callback) {
    argscheck.checkArgs('fF', 'Device.getInfo', arguments);
    exec(Callback, 'Device', 'getDeviceInfo', []);
};

module.exports = new Device();
});