onDeviceReady_Plugin = function() {
}

onError_Plugin = function (callback, param) {
    console.log('Request URL = ' + param['requesturl'])
    console.log('Error Code = ' + param['errorCode'])
    console.log('Error Message = ' + param['errorMessage'])
    console.log('Error Symptom = ' + param['errorSymptom'])
    console.log('Error Log = ' + param['errorLog'])
    console.log('Error Reason = ' + param['errorReason'])
    console.log('Error Solution = ' + param['errorSolution'])

    return wmatrix.exec(callback, "OnErrorPlugin", "onErrorOccured", param);
}

wmatrix.addConstructor(function() {
    if (!window.plugins) {
        window.plugins = {};
    }

    if (!window.plugins.onDeviceReady) {
        window.plugins.onDeviceReady = new onDeviceReady_Plugin();
    }
});