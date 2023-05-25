

/**
 * wmatrix 기본 Event Listener 등록
 * @type {{initialize: app.initialize, onDeviceReady: app.onDeviceReady, onResume: app.onResume, onPause: app.onPause, receivedEvent: app.receivedEvent}}
 */
var app = {
    initialize : function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('resume', this.onResume.bind(this), false);
        document.addEventListener('pause', this.onPause.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    onResume: function() {
        this.receivedEvent('resume');
    },

    onPause: function(){
        this.receivedEvent('pause');
    },

    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        switch (id){
            case 'deviceready' :
                onDeviceReady();
                break;
            case 'resume' :
                onResume();
                break;
            case 'pause' :
                onPause();
                break;
            default:
                break;
        }
    }
}

app.initialize();



/**
 * OnDeviceReady
 * 코르도바가 준비되었을때 호출 된다
 */
function onDeviceReady() {

    var connectionType = navigator.connection.type;

    if(connectionType === Connection.NONE){
        console.log('offline');
        wmatrix.exec(null, "WMatrixProvider", "offlineCheck", []);
    }else{
        console.log('online');
        onDeviceReady_Plugin.prototype.open(onSuccess, onFail, '');

        function onSuccess(message) {
            console.log("WMatrixProvider Success!!");
        }

        function onFail(message) {
            console.log("WMatrixProvider Fail in DeviceReady... " + message);
        }
    }
}

function onError(json){
    // alert("Code : "+json['errorCode'] + "\n\n"+"Message : "+json['errorMessage'] + "\n\n" +"Reason : " + json['errorSymptom'])
    onError_Plugin(onSuccess, onFail, json);

    function onSuccess(message) {
        console.log("onError Process OK");
    }

    function onFail(message) {
        console.log("onError Fail... ");
    }

}

/**
 * onResume
 * Android Life cycle 기준으로 onResume과 동일
 */
function onResume() {

}

/**
 * onPause
 * Android Life cycle 기준으로 onPause와 동일
 */
function onPause() {

}

/**
 * setStatus
 * status text를 설정
 */
function setStatus(id, statustext){
    document.getElementById(id).textContent = statustext;
}

function setProgress(id, width){
    var elem = document.getElementById(id);
    elem.style.width = width + '%';
}

function onLaunch(url) {
    location.replace(url);
}

