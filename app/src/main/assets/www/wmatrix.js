
/**
 * @namespace       $h
 * @author          Inswave Systems
 * @description     W-Matrix Plugin Javascript wrapping 객체로 app,misc,camera 등 플러그인객체에 property와 API를 제공한다.
 */
if (typeof $h !== "object") {
    $h = {};
}

/**
 * @function        $h.exec
 * @description     plugin을 실행을 실행시킨다.
 * @param           {Callback} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 코드
 * * msg - {String} 메시지
 * * data - {Any} 데이터
 * @param           {String} class - 실행할 네이티브 클래스명
 * @param           {String} method - 실행할 네이티브 메서드 이름
 * @param           {Array} params - 파라미터
 * @example
 * var callback = function(msg){console.log(msg);};
 * $h.exec(callback,"CustomPlugin","echo",["echo test"]);
 */
$h.exec = function(callback, service, method, params){
    if(typeof wmatrix === "object"){
        wmatrix.exec(callback,service,method,params);
    } else {
        console.log("not found wmatrix");
    }
}

/**
 * @function       $h.dismissScreen
 * @description    native progrees view를 제거한다.
 * @example
 * $h.dismissScreen();
 */
$h.dismissScreen = function () {
    if (typeof window.webkit == "undefined") {
        wmatrixBridge.dismissLoadingLayout();
    } else {
        webkit.messageHandlers.wmatrix.postMessage(["WMatrixSdk","dismissScrean"]);
    }
}

/**
 * @namespace      $h.app
 * @memberof       $h
 * @version        1.1.5
 * @author         Inswave Systems
 * @description    App에 일반적인 기능을 모아놓은 플러그인으로 이벤트 및 API를 제공한다. 제공되는 API로는 preference 추가/삭제, applog관리, 앱 이벤트 감지, TTS, screenshot 같은 기능들이 있다.
 */
if (typeof $h.app !== "object") {
    $h.app = {};
}

/**
 * @function      $h.app.reset
 * @description   wmatrix app에 엔진,리소스,db,cache 및 모든 설정을 reset한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} null
 * @param         {Object} options - object
 * * popup : [Bool] 리셋 Popup 생성 여부 (Default : true)
 * * message : [String] 리셋 Popup 메세지 (Default : "앱을 초기화하고 종료합니다.")
 * * clearData : [Bool] 데이터 초기화 여부  (Default : true)
 * * clearCache : [Bool] 캐시 초기화 여부 (Default : true)
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {"popup": true, "message": "앱을 초기화 하시겠습니까?", "clearData": true, "clearCache": true}
 * $h.app.reset(callback,params);
 */
$h.app.reset = function (callback, options) {
    try {
        wmatrix.plugin.app.reset(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.finish
 * @description   사용자에게 팝업메시지를 띄워 종료메시지를 알리고 종료한다. 또는 startWebView로 띄운 webview화면을 제거한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} null
 * @param         {Object} options - object
 * * popup        [Bool] 종료 Popup 생성 여부 (Default : false)
 * * message      [String] 종료 popup에 보여줄 Message (Default : "앱을 종료합니다.")
 * * cancelButton [Bool] 종료 popup에 취소 버튼 보여줄지 여부 (Default : true)
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {"message": "앱을 종료하시겠습니까?", "popup":true, "cancelButton":true}
 * $h.app.finish(callback,params);
 */
$h.app.finish = function (callback, options) {
    try {
        wmatrix.plugin.app.finish(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.version
 * @description   wmatrix app에 version 정보를 callback에 param으로 반환한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} version : 1.0.0 , versionCode : 1
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.app.version(callback);
 */
$h.app.version = function (callback) {
    try {
        wmatrix.plugin.app.version(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.checkDeviceType
 * @description   장비가 패드인지 폰인지 구분하여 callback에 param으로 반환한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} type : tablet or phone
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.app.checkDeviceType(callback);
 */
$h.app.checkDeviceType = function (callback) {
    try {
        wmatrix.plugin.app.checkDeviceType(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.foregroundListener
 * @description   app이 background에서 foreground로 올라올때 이벤트리스너를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.app.ForegroundListener(listener);
 */
$h.app.foregroundListener = function (listener) {
    try {
        document.addEventListener('resume', listener, false);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.backgroundListener
 * @description   app이 foreground에서 background로 올라올때 이벤트리스너를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.app.backgroundListener(listener);
 */
$h.app.backgroundListener = function (listener) {
    try {
        document.addEventListener('pause', listener, false);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.backKeyPressedListener
 * @description   뒤로가기 키를 눌렀을때 Web에 전달되는 이벤트리스너를 등록한다.(Android Only)
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.app.backKeyPressedListener(listener);
 */
$h.app.backKeyPressedListener = function (listener) {
    try {
        document.addEventListener('onBackKeyPressed', listener, false);
        $h.app.backKeyPressedListenerRegistered = true;
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.removeForegroundListener
 * @description   app이 background에서 foreground로 올라올때 이벤트리스너를 삭제한다. addEventListener에 인자로 받은 callback함수를 인자로 받는다.
 * @example
 * $h.app.removeForegroundListener(callback);
 */
$h.app.removeForegroundListener = function(listener){
    if(typeof listener === "function"){
        document.removeEventListener("resume", listener, false);
    } else {
        console.log("listener type is function");
    }
}

/**
 * @function      $h.app.removeBaackgroundListener
 * @description   app이 foreground에서 background로 올라올때 이벤트리스너를 삭제한다. addEventListener에 인자로 받은 callback함수를 인자로 받는다.
 * @example
 * $h.app.removeBackgroundListener(callback);
 */
$h.app.removeBackgroundListener = function(listener){
    if(typeof listener === "function"){
        document.removeEventListener("pause", listener, false);
    } else {
        console.log("listener type is function");
    }
}

/**
 * @property {Boolean} $h.app.backKeyPressedListenerRegistered - 뒤로가기 키 리스너가 등록됐는지 여부 Flag (Android only)
 */
$h.app.backKeyPressedListenerRegistered = false;


// event      $h.app.onBackKeyPressed
// description   뒤로가기 키를 눌렀을때 이벤트를 발생한다. (App에서 호출)
$h.app.onBackKeyPressed = function (data) {
    if ($h.app.backKeyPressedListenerRegistered) {
        var event = new Event('onBackKeyPressed');
        event.data = data
        document.dispatchEvent(event);
    } else {
        var callback = function (result) { console.log(result); };
        var options;

        if (typeof (data) == 'undefined') {
            options = { "popup": true };
        } else {
            options = { "popup": data.popup };
        }
        $h.app.finish(callback, options);
    }
}

/**
 * @function      $h.app.webviewTouchListener
 * @description   Webview에서 Touch Event (ACTION_UP)이 발생했을때 Web에 전달되는 Listener를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.app.webviewTouchListener(listener);
 */
$h.app.webviewTouchListener = function (listener) {
    try {
        document.addEventListener('onWebviewTouched', listener, false);
        wmatrix.plugin.app.setWebviewTouchListener(function (e) { console.log('WebView TouchListener set finished.'); }, function (e) { console.log(e); }, {});
        $h.app.webviewTouchListenerRegistered = true;
    } catch (e) {
        console.log(e);
    }
}

/**
 * @property {Boolean} $h.app.webviewTouchListenerRegistered - Webview Touch 리스너가 등록됐는지 여부 Flag
 */
$h.app.webviewTouchListenerRegistered = false;


// event         $h.app.onWebviewTouched
// description   Webview에 Touch Event가 발생했을때 이벤트를 발생한다. (App에서 호출)
$h.app.onWebviewTouched = function (data) {
    if ($h.app.webviewTouchListenerRegistered) {
        var event = new Event('onWebviewTouched');
        event.data = data
        document.dispatchEvent(event);
    }
}

/**
 * @function      $h.app.startWebview
 * @description   새로운 Webview에서 지정된 페이지를 로드한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * url : [String] 실행할 Page 경로 또는 url
 * * header : [Object] key - 헤더 키, value - 헤더 값. {"key":"value"}
 * * closeCallbackfunction : [String] webview를 close했을 때 받을 function명
 * * * startWebView로 호춣한 subWebview를 close하는 방법 - subWebview에서 아래의 함수 호출, 호출 시 main webview에 전달할 data를 인자로 넣어준다.
 * * * if(typeof(subWebview) == 'undefined'){
           //iOS
           window.webkit.messageHandlers.subWebview.postMessage("test data");
       }else{
           //Android
           subWebview.finish("test data");
       }
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"header":{"key1":"value1", "key2":"value2"}, "url" : "${화면 경로 또는 Web URL}"};
 * $h.app.startWebview(callback, options);
 */
$h.app.startWebview = function (callback, options) {
    try {
        wmatrix.plugin.app.startWebView(callback, options);
    } catch(e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.checkAppInstalled
 * @description   Android: 전달한 package의 앱이 설치되어 있는지 확인한다.<br/>
 *                iOS: url scheme를 이용하여 앱이 설치되어 있는지 확인한다. urlscheme를 지원하는 앱만 확인이 가능하다.
 * @param         {Function} callback - 콜백함수<br/> 콜백 파라미터
 * * statusCode - {String} 2010
 * * msg - {String} App is not installed (User will install the app.), App is not installed (User cancels go to store.), App is not installed (gotoStore option is false.)
 * * data - null
 * @param         {Object} options - object
 * * pakageName : [String] 앱 패키지명 (Android)
 * * appName : [String] 앱 이름 (Android)
 * * storeURL : [String] 앱 스토어 주소 (Android)
 * * appScheme : [String] urlScheme명 (iOS)
 * * storeScheme : [String] store scheme (iOS)
 * * gotoStore : [Bool] 스토어이동여부
 *
 * @example
 * var callback = function(result){ console.log(result); };
 * //Android
 * var opt = {};
 * opt.packageName = 'com.android.chrome';
 * opt.gotoStore = true;
 * opt.storeURL = 'market://details?id=com.android.chrome';
 * opt.appName = 'Chrome';
 * $h.app.checkAppInstalled(callback,options);
 *
 * //iOS
 * var opt = {};
 * opt.appScheme = "twitter://";
 * opt.storeScheme = "itms-apps://itunes.apple.com/app/id333903271";
 * opt.gotoStore = true;
 * $h.app.checkAppInstalled(callback,options);
 */
$h.app.checkAppInstalled = function (callback, options) {
    try {
        wmatrix.plugin.app.checkAppInstalled(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.screenCapture
 * @description   현재 보이는 화면을 Capture 하여 해당 base64를 Web 으로 전달한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} imgBase64 : "data:image/jpg;base64,~~"
 * @param         {Object} options - object
 * * allView     Native 를 포함한 모든 View 를 캡쳐할지 여부 (default : false)
 * * saveAlbum   ScreenCapture 한 이미지를 Album 에 저장할지 여부 (default : false)
 * * quality     Capture 할 Image quality (default : 70)
 *
 * @example
 * var callback = function(result){ console.log(result); };
 *
 * var opt = {};
 * opt.allView = false;
 * opt.quality = 50;
 * $h.app.screenCapture(callback,opt);
 */
$h.app.screenCapture = function (callback, options) {
    try {
        wmatrix.plugin.app.screenCapture(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.setPreference
 * @description   native preference에 값을 저장한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * key          저장할 Preference Key
 * * value        저장할 Preference Value
 *
 * @example
 * var callback = function(result){ console.log(result); };
 *
 * var opt = {};
 * opt.key = "test1";
 * opt.value = "test1 value";
 * $h.app.setPreference(callback,opt);
 */
$h.app.setPreference = function (callback, options) {
    try {
        wmatrix.plugin.app.setPreference(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.getPreference
 * @description   native preference에서 값을 가져온다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} getPreference : "value"
 * @param         {Object} options - object
 * * key          가져올 Preference Key
 *
 * @example
 * var callback = function(result){ console.log(result); };
 *
 * var opt = {};
 * opt.key = "test1";
 * $h.app.getPreference(callback,opt);
 */
$h.app.getPreference = function (callback, options) {
    try {
        wmatrix.plugin.app.getPreference(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.removePreference
 * @description   native preference에 값을 삭제한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * key          삭제할 Preference Key
 *
 * @example
 * var callback = function(result){ console.log(result); };
 *
 * var opt = {};
 * opt.key = "test1";
 * $h.app.removePreference(callback,opt);
 */
$h.app.removePreference = function (callback, options) {
    try {
        wmatrix.plugin.app.removePreference(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.shareData
 * @description   주어진 data의 url을 이용하여 다른앱과 공유한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * type        share할 data type : 0 : url, 1 : image
 * * data        share할 data url
 * * title       share chooser에 표시될 title
 * @example
 * var callback = function(result){ console.log(result); };
 *
 * var opt = {};
 * opt.type = 1;
 * opt.data = "https://www.naver.com";
 * opt.title = "Select App"
 * $h.app.shareData(callback,opt);
 */
$h.app.shareData = function (callback, options) {
    try {
        wmatrix.plugin.app.shareData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.screenOrientation
 * @description   주어진 Orientation 속성을 Native View에 설정한다. (Android Only)
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * orientation  설정할 orientation 속성 (0 : Sensor, 1 : Portrait, 2 : Landscape, 3 : Landscape Sensor)
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {};
 * opt.orientation = 1;
 * $h.app.screenOrientation(callback,opt);
 */
$h.app.screenOrientation = function (callback, options) {
    try {
        wmatrix.plugin.app.screenOrientation(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.getLog
 * @description   앱 로그를 가져온다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} log : "log"
 * @param         {Object} options - object
 * * type       [Int]   0: 전체 로그, 1: 웹 console.log 만 기록, 2: Websquare 로그만 기록. (default: 0)
 * @example
 * var callback = function(result){ console.log(result); };
 * var opt = {"type" : 0};
 *
 * $h.app.getAppLog(callback,opt);
 */
$h.app.getLog = function (callback, options) {
    try {
        wmatrix.plugin.app.getLog(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.app.getLogUpload
* @description   앱 로그를 가져온 후 특정 URL 로 로그 파일을 업로드 한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
* @param         {Object} options - object
* * type            [Int]          0: 전체 로그, 1: 웹 console.log 만 기록, 2: Websquare 로그만 기록. (default: 0)
* * fileName        [String]       로그 파일 명 (필수 체크)
* * uploadUrl       [String]       업로드 할 서버 URL. (필수. 일단 POST 방식만 지원, Content-Type : multipart/form-data)
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"type" : 0, "fileName" : "logFile.log", "uploadUrl" : "http://test.server.com/fileUpload"};
* $h.app.getLogUpload(callback,opt);
*/
$h.app.getLogUpload = function (callback, options) {
    try {
        wmatrix.plugin.app.getLogUpload(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.app.getLogMail
* @description   앱 로그를 가져온 후 메일로 로그를 전달한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
* @param         {Object} options - object
* * type            [Int]       0: 전체 로그, 1: 웹 console.log 만 기록, 2: Websquare 로그만 기록. (default: 0)
* * fileName        [String]    로그 파일 명 (isAttachFile 이 true 인 경우 필수)
* * isAttachFile    [Boolean]   메일 전송 시 파일 첨부 여부. true: 파일 첨부, false: 메일 내용에 로그 내용 작성 (default: false)
* * subject         [String]    메일 전송 시 제목 (default: "")
* * to              [String[]]  메일 받는 사람
* * cc              [String[]]  참조
* * bcc             [String[]]  숨은 참조
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"type" : 0, "isAttachFile" : false, "fileName" : "logFile.log", "subject" : "appReport", "to" : ["to@test.com"], "cc" : ["cc@test.com"], "bcc" : ["bcc@test.com", "bcc2@test.com", "bcc3@test.com"]}
* $h.app.getLogMail(callback,opt);
*/
$h.app.getLogMail = function (callback, options) {
    try {
        wmatrix.plugin.app.getLogMail(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.app.clearLog
* @description   기록 되어 있는 앱 로그를 초기화 한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
* @example
* var callback = function(result){ console.log(result); };
* $h.app.clearLog(callback);
*/
$h.app.clearLog = function (callback) {
    try {
        wmatrix.plugin.app.clearLog(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.app.logPath
* @description   앱 로그 파일생성 후 경로를 알려준다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} logPath : "/logpath"
* @param         {Object} options - object
* * type            [Int]          0: 전체 로그, 1: 웹 console.log 만 기록, 2: Websquare 로그만 기록. (default: 0)
* * fileName        [String]       로그 파일 명 (필수 체크)
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"type" : 0,  "fileName" : "test.log"}
* $h.app.logPath(callback,opt);
*/
$h.app.logPath = function (callback, options) {
    try {
        wmatrix.plugin.app.logPath(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.app.speakTTS
* @description   message 를 음성으로 읽어준다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
* @param         {Object} options - object
* * language       [String]       언어 코드 (ko: 한국어, en: 영어, ja: 일본어, zh_cn: 중국어 간체, zh_tw: 중국어 번체)
* * message        [String]       음성으로 말할 메세지 내용.
* * speechSpeed    [Float]        음성으로 말하는 속도 (default: 1.0)
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"language": "ko", "message" : "hello, world", "speechSpeed" : 0.9 };
* $h.app.speakTTS(callback,opt);
*/
$h.app.speakTTS = function (callback, options) {
    try {
        wmatrix.plugin.app.speakTTS(callback, options);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @function      $h.app.startSpeechToText
 * @description   음성 인식 후 인식된 텍스트를 리턴한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} 인식된 텍스트.
 *
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.app.startSpeechToText(callback);
 */
$h.app.startSpeechToText = function (callback) {
    try {
        wmatrix.plugin.app.startSpeechToText(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.stopSpeechToText
 * @description   음성 인식 엔진의 중지 한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} 인식된 텍스트
 *
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.app.stopSpeechToText(callback);
 */
$h.app.stopSpeechToText = function (callback) {
    try {
        wmatrix.plugin.app.stopSpeechToText(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.app.speechToTextEventListener
 * @description   음성 인식 엔진 상태 리스너를 등록한다.
 * @param         {Function} listener - 리스너<br/>
 *
 * @example
 * var listener = function(result){ console.log(result); };
 * $h.app.speechToTextEventListener(listener);
 */
$h.app.speechToTextEventListener = function (listener) {
    try {
        document.addEventListener('onSpeechToTextEventChanged', listener, false);
    } catch (e) {
        console.log(e);
    }
}

$h.app.onSpeechToTextEventChanged = function (data) {
    var event = new Event('onSpeechToTextEventChanged');
    event.data = data
    document.dispatchEvent(event);
}

/**
 * @function      $h.app.setupBrightness
 * @description   화면 밝기를 조절한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * statusCode - {String} 1000
 * msg - {String} Success
 * brightness - {Int} 밝기값 (0 ~ 100)
 *
 * @example
 * var callback = function(result){ console.log(JSON.stringify(result)); };
 * const params = {};
 * params.brightness = 1;    // 0 ~ 100
 * $h.app.setupBrightness(callback, params);
 */
$h.app.setupBrightness = function (callback, params) {
    try {
        wmatrix.plugin.app.setupBrightness(callback, params)
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.audioRecorder
 * @memberof       $h
 * @version        1.0.2
 * @author         Inswave Systems
 * @description    음성녹음에 관련된 녹음,저장,일시중지,재개,취소 등에 API를 제공한다.
 */
if (typeof $h.audioRecorder !== "object") {
    $h.audioRecorder = {};
}

/**
 * @function      $h.audiorecorder.recordAudio
 * @description   option의 설정에 따라 녹음을 시작한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * quality 녹음 품질 Default: 32768
 * * fileName 파일 이름 Default: audio
 * * isInternal 녹음 파일을 내부/외부 저장소중 저장할 곳을 설정 (true or false) Default: true / 내부 저장소
 * * codec 코덱 설정 0: AAC, 1: AAC_LED, 2: HE_AAC Default: 0
 * * outputFormat 녹음 파일 형식 0: MPEG_4, 1: AAC_ADTS, 2: MPEG_2_TS Default: 0
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'quality':'32768', 'fileName':'audio', 'isInternal':'false', 'codec':'0', 'outputFormat':'0'};
 * $h.audioRecorder.recordAudio(callback,options);
 */
$h.audioRecorder.recordAudio = function (callback, options) {
    try {
        wmatrix.plugin.audioRecorder.recordAudio(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordFinish
 * @description   녹음을 종료한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} audio : "base64Str", recordTime : "", filePath : "/filepath"
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordFinish(callback)
 */
$h.audioRecorder.recordFinish = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordFinish(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordCancel
 * @description   녹음을 취소한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordCancel(callback)
 */
$h.audioRecorder.recordCancel = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordCancel(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordPause
 * @description   녹음을 일시정한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordPause(callback)
 */
$h.audioRecorder.recordPause = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordPause(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordResume
 * @description   일시정지 된 녹음을 다시 시작한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordResume(callback)
 */
$h.audioRecorder.recordResume = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordResume(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.recordStatus
 * @description   녹음상태를 조회한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} recordStatus : 0 - 녹음중 , 1 - 녹음정지, 2 - 일시중지
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.recordStatus(callback)
 */
$h.audioRecorder.recordStatus = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.recordStatus(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.audioRecorder.deleteAudioFile
 * @description   녹음된 파일을 삭제한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'deleteFilePath':['$filePath','$filePath','$filePath']}
 * $h.audioRecorder.deleteAudioFile(callback, options)
 */
$h.audioRecorder.deleteAudioFile = function (callback, data) {
    try {
        wmatrix.plugin.audioRecorder.deleteAudioFile(callback, data);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @function      $h.audioRecorder.deleteAllFile
 * @description   녹음된 파일 및 폴더를 전부 삭제한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.audioRecorder.deleteAllFile(callback)
 */
$h.audioRecorder.deleteAllFile = function (callback) {
    try {
        wmatrix.plugin.audioRecorder.deleteAllFile(callback);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @namespace      $h.barcode
 * @memberof       $h
 * @version        3.0.0
 * @author         Inswave Systems
 * @description    다양한 종류에 barcode들을 스캔하여 데이터를 반환하는 API를 제공한다. 지원되는 바코드 종류 AZTEC, CATBODY, CODE_128, CODE_39, CODE_39MOD43, CODE_93, UPC_E, QR_CODE, PDF_417, DATA_MATRIX, DOG_BODY, EAN_13, EAN_8, FACE, HUMAN_BODY, INTERLEAVED2OF5, ITF14 이다.
 */
if (typeof $h.barcode !== "object") {
    $h.barcode = {}
}

/**
 * @function       $h.barcode.scan
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {String} scanData
 * @param          {Object} option - option
 * * disableSuccessBeep : [Bool] Barcode Scanner 성공 시 성공음 출력 여부 Flag
 * * preferFrontCamera : [Bool] Barcode Scanner 실행 시 전면 카메라로 실행할건지에 대한 Flag
 * * showTorchButton : [Bool] Barcode Scanner 화면에 Flash 버튼 표시할 건지에 대한 Flag
 * * showFlipCameraButton : [Bool] Barcode Scanner 화면에 전면, 후면 카메라 전환 버튼 표시할 건지에 대한 Flag
 * * torchOn : [Bool] Barcode Scanner 실행 시 Flash를 사용할건지에 대한 Flag
 * * formats : [String] 어떤 barcode를 scan 할건지에 대한 설정값. 값이 없으면 자동으로 인식하여 scan 한다.( , 를 이용하여 다중 지정 가능)
 * * saveHistory : [Bool] Barcode Scanner History를 저장할건지에 대한 Flag (Android Only)
 * * resultDisplayDuration : [Bool] Barcode Scanner 완료 후 그 화면에서 결과를 몇초동안 표시할건지에 대한 설정값 (ms) (Android Only)
 * * prompt : [String] Barcode Scanner 화면에 표시할 문구 (Android Only)
 * * orientation : [String] Barcode Scanner화면의 가로, 세로 설정값 (가로 : landscape, 세로 : portrait) (Android Only)
 * @description    barcode scanner를 실행한다.
 * @example
 * var options = {};
 * options.disableSuccessBeep = false;
 * options.preferFrontCamera = false;
 * options.showTorchButton = false;
 * options.showFlipCameraButton = false;
 * options.torchOn = false;
 * options.formats = "";
 * var callback = function(r){ console.log(r); };
 * $h.barcode.scan(callback,options);
 */
$h.barcode.scan = function (callback, options) {
    try {
        barcodescanner.scan(callback, options);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @namespace      $h.biometric
 * @memberof       $h
 * @version        1.0.3
 * @author         Inswave Systems
 * @description    바이오인증을 이용한 데이터 저장, 출력, 삭제 등에 API을 제공한다.
 */
if (typeof $h.biometric !== "object") {
    $h.biometric = {};
}

/**
 * @function      $h.biometric.deleteData
 * @description   저장된 biometric data를 삭제한다. (keystore 포함)
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 *
 * @param         {Object} options - object
 * * key : 삭제할 data의 key 값 (String)
 *
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'key':'test'};
 * $h.biometric.deleteData(callback,options);
 */
$h.biometric.deleteData = function (callback, options) {
    try {
        wmatrix.plugin.biometric.deleteData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.biometric.checkData
 * @description   주어진 key값으로 저장된 biometric data가 있는지 확인한다. (keystore 포함)
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * key : 확인할 data의 key (String)
 *
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'key':'test'};
 * $h.biometric.checkData(callback,options);
 */
$h.biometric.checkData = function (callback, options) {
    try {
        wmatrix.plugin.biometric.checkData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.biometric.encryptData
 * @description   주어진 key값과 data로 Bio 정보를 이용하여 암호화하고, keystore에 저장한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * key : 암호화 data의 key (String)
 * * data : 암호화할 Data (String)
 * * title : Bio 인증 창에 표시해줄 title (String)
 * * subTitle : Bio 인증 창에 표시해줄 subTitle (String)
 * * description : Bio 인증 창에 표시해줄 description (String)
 * * negativeText : Bio 인증 창에 표시될 취소버튼 텍스트 (String)
 *
 * @example
 * var callback = function(result){ console.log(result); };

 * var options = {'key' : 'test', 'data' : '1!2@3#4$5%', 'title' : 'testDialog', 'subTitle' : '바이오인증', 'description' : '생체인증을 해주세요.', 'negativeText' : '취소'};
 * $h.biometric.encryptData(callback,options);
 */
$h.biometric.encryptData = function (callback, options) {
    try {
        wmatrix.plugin.biometric.encryptData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.biometric.decryptData
 * @description   주어진 key값으로 저장된 data를 복호화 하여 전달한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {String} decrypted data
 * @param         {Object} options - object
 * * key : 복호화할 data의 key (String)
 * * title : Bio 인증 창에 표시해줄 title (String)
 * * subTitle : Bio 인증 창에 표시해줄 subTitle (String)
 * * description : Bio 인증 창에 표시해줄 description (String)
 * * negativeText : Bio 인증 창에 표시될 취소버튼 텍스트 (String)
 *
 * @example
 * var callback = function(result){ console.log(result); };

 * var options = {'key' : 'test','title' : 'testDialog', 'subTitle' : '바이오인증', 'description' : '생체인증을 해주세요.', 'negativeText' : '취소'};
 * $h.biometric.decryptData(callback,options);
 */
$h.biometric.decryptData = function (callback, options) {
    try {
        wmatrix.plugin.biometric.decryptData(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace       $h.camera
 * @memberof        $h
 * @version         1.0.0
 * @author          Inswave Systems
 * @description     사진촬영 및 갤러리(포토라이브러리) API를 제공한다.
 * @property        {Object} DestinationType - 사진촬영후 반환타입 {DATA_URL:0,ENCRYPT_DATA_URL:3,FILE_URI:1,NATIVE_URI:2}
 * @property        {Object} Direction - 카메라방향 {BACK:0,FRONT:1}
 * @property        {Object} EncodingType - 파일타입 {JPEG:0, PNG:1}
 * @property        {Object} MediaType - 촬영타입 {PICTURE:0,VIDEO:1,ALLMEDIA:2}
 * @property        {Object} PictureSourceType - 사진소스타입 {CAMERA:1,PHOTOLIBRARY:0,SAVEDPHOTOALBUM:2}
 * @property        {Object} PopoverArrowDirection - iOS popover 카메라 모드 사용시 카메라 위치 {ARROW_UP:1,ARROW_DOWN:2,ARROW_LEFT:4,ARROW_RIGHT:8,ARROW_ANY:15}
 */
if (typeof $h.camera !== "object") {
    $h.camera = {};
}

/**
 * @function        $h.camera.capturePhoto
 * @description     사진을 촬영하여 저장하고 사진경로나 base64string을 콜백함수에 인자로 리턴한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} callbackURI : "base64str" or "filePath"
 * @param           {Object} options - camera option
 * * quality(1-100) : 저장될이미지에 퀄리티값을 지정 default값은 50 이며 최대는 100이며 100을 사용하면 해상도손실이 없음.
 * * destinationType : result callback 함수에 리턴되는 타입 ($h.camera.DestinationType.DATA_URL,$h.camera.DestinationType.FILE_URI)
 * * sourceType : 사진소스 선택 ($h.camera.PictureSourceType.PHOTOLIBRARY,$h.camera.PictureSourceType.CAMERA)
 * * allowEdit : 사진촬영후 보정유무 (true,false)
 * * encodingType : 리턴되는 이미지타입 ($h.camera.EncodingType.JPG,$h.camera.EncodingType.PNG)
 * * targetWidth : 이미지에 가로크기 설정 (pixel), targetHeight와 같이사용
 * * targetHeight : 이미지에 세로크기 설정 (pixel), targetWidth와 같이사용
 * * mediaType : 촬영타입 ($h.camera.MediaType.PICTURE, $h.camera.MediaType.VIDEO, $h.camera.MediaType.ALLMEDIA)
 * * correctOrientation : 장비방향에 맞게 이미지회전유무 (true,false)
 * * saveToPhotoAlbum : 앨범에 저장유무 (true,false)
 * * cameraDirection : 카마레 방향 ($h.camera.Direction.BACK,$h.camera.Direction.FRONT)
 * * popoverOptions(iOS only) : 카메라가 Popover형태로 동작하게 설정 (TRUE,FALSE)
 *
 * @example
 * var callback = function(path){ console.log(path); };
 * var options = {"quality":100,"sourceType":$h.camera.PictureSourceType.CAMERA,"allowEdit":false,"encodingType":$h.camera.EncodingType.JPEG};
 * $h.camera.capturePhoto(callback,options);
 */
$h.camera.capturePhoto = function (callback, options) {
    try {
        if (typeof navigator.camera === "object") {
            navigator.camera.getPicture(callback, options);
        } else {
            console.log("Not found Camera Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}

$h.camera.capturePhotoByEncrypt = function (callback) {
    try {
        var options = {
            quality: 30,
            destinationType: Camera.DestinationType.ENCRYPT_DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true
        };
        if (typeof navigator.camera === "object") {
            navigator.camera.getPicture(callback, options);
        } else {
            console.log("Not found Camera Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function        $h.camera.cleanup
 * @description     tmp 폴더에 저장된 사진파일을 삭제한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @example
 * var callback = function(){};
 * $h.camera.cleanup(callback);
 */
$h.camera.cleanup = function (callback) {
    try {
        if (typeof navigator.camera === "object") {
            navigator.camera.cleanup(callback);
        } else {
            console.log("Not found Camera Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}

document.addEventListener("wmatrixready", function () {
    // $h.camera
    $h.camera.DestinationType = Camera.DestinationType;
    $h.camera.Direction = Camera.Direction;
    $h.camera.EncodingType = Camera.EncodingType;
    $h.camera.MediaType = Camera.MediaType;
    $h.camera.PictureSourceType = Camera.PictureSourceType;
    $h.camera.PopoverArrowDirection = Camera.PopoverArrowDirection;
}, false);

/**
 * @namespace      $h.contents
 * @memberof       $h
 * @version        1.1.2
 * @author         Inswave Systems
 * @description    Content관련 API를 제공하는 플러그인으로 image picker, file picker, fileDownload 기능을 제공한다.
 */
if (typeof $h.contents !== "object") {
    $h.contents = {};
}

/**
 * @function      $h.contents.filePicker
 * @description   파일선택창을 띄운다.
 *
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} fileUri : "filePath" or {Array} ["filepath1","filpath2",...]
 *
 * @param         {Object} options - object
 * * multiselect: [Bool] 여러 파일 선택 가능 여부 (true 여러개 파일 선택)
 * * extension: [String] 허용된 확장자
 * * start: [String] sdcard 내 시작 경로
 * * maxcount: [Int] 선택 가능한 파일 수
 *
 * @example
 * var callback = function(result){ //filepath array param console.log(result); };
 * var opt = {};
 * opt.multiselect = true;
 * opt.extension = "pdf,docx,jpg,png,pptx,xlsx,zip"; // 허용된 확장자
 * opt.start = "" //default : document
 * opt.maxcount = 2;
 * $h.contents.filePicker(callback,options);
 */
$h.contents.filePicker = function (callback, options) {
    try {
        wmatrix.plugin.contents.filePicker(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.contents.imagePicker
 * @description   이미지선택창을 띄운다.
 *
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} image : "imgPath" or {Array} ["imgPath1","imgPath2",...]
 *
 * @param         {Object} options - object
 * * multiselect: [Bool] 여러 파일 선택 가능 여부 (true 여러개 파일 선택)
 * * maxcount: [Int] 선택 가능한 파일 수
 * * camera: [Bool] 카메라 사용 여부 (카메라 플러그인 이용)
 * * cameraoption: [Object] 카메라 플러그인 옵션 참고
 * * type: [Int] 반환타입 (0: base64 String (default), 1 : file URL String)
 * * galleryFolder: 갤러리폴더 (0: DCIM, 1: PICTURES, 2: DOWNLOADS) (Andorid Only)
 *
 * @example
 * var callback = function(result){ //filepath array param console.log(result); };
 * var opt = {};
 * opt.multiselect = true;
 * opt.maxcount = 2;
 * opt.camera = false;
 * opt.cameraoption = {};
 * opt.type = 0
 * opt.galleryFolder = 0 (0: DCIM, 1: PICTURES, 2: DOWNLOADS)
 * $h.contents.imagePicker(callback,options);
 */
$h.contents.imagePicker = function (callback, options) {
    try {
        wmatrix.plugin.contents.imagePicker(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.contents.fileDownload
 * @description   url에 파일을 다운로드한다.
 *
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 *
 * @param         {Object} options - object
 * * url           Download url
 * * progress      다운로드 진행상황을 상단 Notification bar에 표시 (true or false)
 * * open          다운로드가 완료되면 해당 파일을 open할지 여부 (true or false)
 * * notify        다운로드가 완료되면 toast로 다운로드 완료 여부를 알려줄지 여부 (true or false)
 * * location      다운로드가 될 위치 지정 (default : Download)
 * * requestType   다운로드 request Type (get or post)
 * * fileName      다운로드 후 저장될 파일 이름 (post의 경우 필수)
 *
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"url":"http://localhost:8080/download/test.xlsx","progress":"true","open":"true","notify":"true", "location":"Download", "requestType" : "get", "fileName" : "test.xlsx"}
 * $h.contents.fileDownload(callback,options);
 */
$h.contents.fileDownload = function (callback, options) {
    try {
        wmatrix.plugin.contents.fileDownload(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.device
 * @memberof       $h
 * @version        2.1.0
 * @author         Inswave Systems
 * @description    디바이스에 모델, 플랫폼, OS버전 등에 데이터를 반환하는 API제공한다.
 */
if (typeof $h.device !== "object") {
    $h.device = {};
}

/**
 * @function       $h.device.getDeviceInfo
 * @description    device plugin을 통해서 device 데이터를 리턴한다.
 * @return         {Object} device - device 정보객체
 * @example
 * var deviceInfo = $h.device.getDeviceInfo();
 * console.log("model : "+deviceInfo.model);
 * console.log("platform : "+deviceInfo.platform);
 * console.log("uuid : "+deviceInfo.uuid);
 * console.log("version : "+deviceInfo.version);
 * console.log("manufacturer : "+deviceInfo.manufacturer);
 * console.log("isVirtual : "+deviceInfo.isVirtual);
 * console.log("serial : "+deviceInfo.serial);
 */
$h.device.getDeviceInfo = function () {
    if (typeof window.device === "object") {
        return window.device;
    }
}


/**
 * @namespace      $h.geolocation
 * @memberof       $h
 * @version        1.0.0
 * @author         Inswave Systems
 * @description    위도,경도 등에 현재 위치정보를 반환하거나 일정간격으로 위치정보를 반환하는 API를 제공한다.
 */
if (typeof $h.geolocation !== "object") {
    $h.geolocation = {};
}

/**
 * @function       $h.geolocation.getCurrentPosition
 * @description    geolocation 플러그인을 통해서 현재 위치에 위도,경도 등을 가져온다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * position - {Object} timestamp:0,velocity:0,altitudeAccuracy:0,accuracy:0,heading:0,altitude:0,latitude:0,longitude:0
 * @example
 * var callback = function(position){console.log("lat : "+position.coords.latitude+", long : "+position.coords.longitude);};
 * $h.geolocation.getCurrentPosition(callback);
 */
$h.geolocation.getCurrentPosition = function (callback, options) {
    try {
        if (typeof navigator.geolocation === "object") {
            if (typeof options === "object") {
                navigator.geolocation.getCurrentPosition(callback, options);
            } else {
                navigator.geolocation.getCurrentPosition(callback);
            }
        } else {
            console.log("Not Found Geolocation Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function       $h.geolocation.watchPosition
 * @description    geolocation 플러그인을 통해서 위치가변경될때 마다 callback함수를 통해서 위치에 위도,경도 전달
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * position - {Object} timestamp:0,velocity:0,altitudeAccuracy:0,accuracy:0,heading:0,altitude:0,latitude:0,longitude:0
 * @param          {Obejct} options - options (optional)
 * @return         {String} watchID - watchID
 * @example
 * var callback = function(position){};
 * var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
 * $h.geolocation.watchPosition(callback,options);
 */
$h.geolocation.watchPosition = function (callback, options) {
    try {
        var watchID = null;
        if (typeof navigator.geolocation === "object") {
            if (typeof options === "object") {
                watchID = navigator.geolocation.watchPosition(callback, options);
            } else {
                watchID = navigator.geolocation.watchPosition(callback);
            }
            return watchID;
        } else {
            console.log("Not Found Geolocation Plugin");
        }
        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

/**
 * @function       $h.geolocation.clearWatch
 * @description    geolocation 플러그인을 통해서 붙인 watchPosition 이벤트를 제거할때 사용
 * @param          {String} watchID - watchID
 * @example
 * var callback = function(pos){console.log("lat : "+pos.coord.latitude + "long : "+pos.coord.longitude)};
 * var watchID = $h.geolocation.watchPosition(callback);
 * $h.geolocation.clearWatch(watchID);
 */
$h.geolocation.clearWatch = function (watchID) {
    try {
        if (typeof navigator.geolocation === "object") {
            if (typeof watchID === "string") {
                navigator.geolocation.clearWatch(watchID);
            } else {
                console.log("watchID is string");
            }
        } else {
            console.log("Not Found Geolocation Plugin");
        }
    } catch (e) {
        console.log(e);
    }
}


/**
 * @namespace      $h.inappbrowser
 * @memberof       $h
 * @version        1.0.1
 * @author         Inswave Systems
 * @description    webpage를 별도에 webview로 호출하는 API를 제공한다.
 */
if (typeof $h.inappbrowser !== "object") {
    $h.inappbrowser = {};
}

/**
 * @function       $h.inappbrowser.open
 * @description    inappbrowser 플러그인을 통해서 별도 웹뷰를 붙여서 화면을 띄우거나 모바일브라우저를 호출한다.
 * @param          {String} URL - 화면URL
 * @param          {String} type - "_blank": 웹뷰 , "_system": 모바일브라우저
 * @param          {String} option - 옵션 예) "locoation=yes"
 * @example
 * $h.inappbrowser.open("https://www.inswave.com","_system");
 */
$h.inappbrowser.open = function (url,type,option) {
    var iab = null;
    try {
        if (typeof wmatrix.plugin.InAppBrowser === "object") {
            iab = wmatrix.plugin.InAppBrowser.open(url, type, option);
        }
        return iab;
    } catch (e) {
        console.log(e);
        return iab;
    }
}


/**
 * @namespace      $h.license
 * @memberof       $h
 * @version        1.1.0
 * @author         Inswave Systems
 * @description    open source license를 출력하는 API를 제공한다.
 */
if (typeof $h.license !== "object") {
    $h.license = {};
}

/**
 * @function      $h.license.showView
 * @description   wmatrix에서 사용된 open source license를 출력한다. license파일에 내용을 추가하여 출력이 가능하다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.license.showView(callback);
 */
$h.license.showView = function (callback) {
    try {
        wmatrix.plugin.license.showView(callback);
    } catch (e) {
        console.log(e);
    }
}



/**
 * @namespace      $h.misc
 * @memberof       $h
 * @version        1.2.0
 * @author         Inswave Systems
 * @description    여러가지 잡다한 기능들을 모아놓은 플러그인으로 브라우저열기, 전화, 주소록, SMS 같은 기능들을 제공한다.
 */
if (typeof $h.misc !== "object") {
    $h.misc = {};
}

/**
 * @function      $h.misc.sendCall
 * @description   전화를 건다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * number: [String] 전화번호
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"number":"01011112222"};
 * $h.misc.sendCall(callback,options);
 */
$h.misc.sendCall = function (callback, options) {
    try {
        wmatrix.plugin.misc.sendCall(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.sendSMS
 * @description   문자를 보낸다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * number:  [String] 전화번호
 * * message: [String] 메세지
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"number":"01011112222", "message":"sample message"};
 * $h.misc.sendSMS(callback,options);
 */
$h.misc.sendSMS = function (callback, options) {
    try {
        wmatrix.plugin.misc.sendSMS(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.getContacts
 * @description   주소록에 접근하여 선택된 전화번호를 반환한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} name: "name" ,phoneNumber: "010-0000-0000"
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.misc.getContacts(callback);
 */
$h.misc.getContacts = function (callback) {
    try {
        wmatrix.plugin.misc.getContacts(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.openBrowser
 * @description   외부 브라우저를 호출한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"url":"http://www.inswave.com"};
 * $h.misc.openBrowser(callback,options);
 */
$h.misc.openBrowser = function (callback, options) {
    try {
        wmatrix.plugin.misc.openBrowser(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.settingStatus
 * @description   현재 setting값을 얻어 온다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {String} type별 메시지
 * @param         {Object} options - object
 * * type : [String] 설정값 종류 ("wifi", "data", "gps")
 * * message : [String] 출력 메세지
 * * open : [Bool] 권한 요청 여부
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {"type": "gps", "message" : "GPS가 켜져 있지 않습니다. Setting으로 이동하시겠습니까?", "open" : true};
 * $h.misc.settingStatus(callback,options);
 */
$h.misc.settingStatus = function (callback, options) {
    try {
        wmatrix.plugin.misc.settingStatus(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.startTimer
 * @description   Timer를 start한다. (Android Only)
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} Timer id : "" , Timer Mode : ""
 * @param         {Object} options - object
 * * id : Timer Unique ID (String)
 * * period : Timer 주기 1000 = 1초 (Int)
 * * mode : Timer Mode - once : period만큼 후에 expireFuncation 호출, repeat : period마다 한번씩 expireFunction 호출
 * * expireFunction : timer 시간이 되었을때 호출되는 javascript 함수
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'id':'testTimer', 'period' : 2000, 'mode' : 'once', 'expireFunction' : 'console.log("expire!")'};
 * $h.misc.startTimer(callback,options);
 */
$h.misc.startTimer = function (callback, options) {
    try {
        wmatrix.plugin.misc.startTimer(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.stopTimer
 * @description   주어진 ID 값의 Timer를 stop한다. (Android Only)
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} Timer id : ""
 * @param         {Object} options - object
 * * id : Timer Unique ID (String)
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'id':'testTimer'};
 * $h.misc.stopTimer(callback,options);
 */
$h.misc.stopTimer = function (callback, options) {
    try {
        wmatrix.plugin.misc.stopTimer(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.stopTimerAll
 * @description   현재 실행되고 있는 모든 Timer를 stop 한다. (Android Only)
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.misc.stopTimerAll(callback);
 */
$h.misc.stopTimerAll = function (callback) {
    try {
        wmatrix.plugin.misc.stopTimerAll(callback);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.misc.networkChangeListener
 * @description   Network 상태가 변경 되었을때 Event를 Web에 전달 한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.misc.networkChangeListener(listener);
 */
$h.misc.networkChangeListener = function (listener) {
    try {
        document.addEventListener('onNetworkChanged', listener, false);
    } catch (e) {
        console.log(e);
    }
}

/**
 * function      $h.misc.onNetworkChanged
 * description   Network 상태가 변경 되었을때 이벤트를 발생한다. (App에서 호출)
 */
$h.misc.onNetworkChanged = function (data) {
    var event = new Event('onNetworkChanged');
    event.data = data
    document.dispatchEvent(event);
}


/**
 * @namespace      $h.network
 * @memberof       $h
 * @version        1.0.0
 * @author         Inswave Systems
 * @description    network 변화를 감지하거나 현재 네트워크 접속상태를 확인하는 API를 제공한다.
 */
if (typeof $h.network !== "object") {
    $h.network = {};
}

/**
 * @function       $h.network.checkNetwork
 * @description    network를 체크하여 true,false를 반환
 * @example
 * $h.network.checkNetwork();
 */
$h.network.checkNetwork = function () {
    try {
        if (navigator.connection.type == "none") {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function       $h.network.addEventListener
 * @description    네트워크타입 변경시 event를 감지하는 listener를 추가한다.
 * @param          {String} type - online, offline 두가지타입
 * @param          {Function} callback - event발생시 실행시킬 함수
 * @example
 * $h.network.addEventListener(type,callback);
 */
$h.network.addEventListener = function (type, callback) {
    try {
        document.addEventListener(type, callback, false);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @namespace      $h.paint
 * @memberof       $h
 * @version        1.0.0
 * @author         Inswave Systems
 * @description    웹뷰 위에 레이어를 띄워 펜기능을 제공한다.
 */
if(typeof $h.paint !== "object"){
    $h.paint = {};
}

/**
 * @function      $h.paint.openPaint
 * @description   메모가 가능한 그림판을 출력한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 ** color : [Array] 펜 색상값 배열
 * @example
 * var callback = function(result){ console.log((result)); };
 * var options = {'color' : ['#000000','#FF0000','#00FF00','#0000FF']};
 * $h.paint.openPaint(callback, options);
 */
$h.paint.openPaint = function(callback, opt) {
    try{
        wmatrix.plugin.paint.openPaint(callback, opt);
    } catch(e){
        console.log(e);
    }
}


/**
 * @namespace      $h.screenRecorder
 * @memberof       $h
 * @version        1.0.0
 * @author         Inswave Systems
 * @description    디바이스(폰,테블릿)에 화면 녹화/녹음에 필요한 녹화, 저장, 취소, 일시정지 등에 API를 제공한다.
 */
if (typeof $h.screenRecorder !== "object") {
    $h.screenRecorder = {};
}


/**
 * @function      $h.screenRecorder.recordScreen
 * @description   option의 설정에 따라 화면 녹화를 시작한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - null
 * @param         {Object} options - object
 * * fileName : [String] 파일 이름
 * * audio : [String] 오디오 녹음 여부(true or false) Default: false
 * * isInternal : [String] 녹음 파일을 내부/외부 저장소중 저장할 곳을 설정 (true or false) Default: true / 내부 저장소 (Android only)
 * * saveToGallery : [String] 녹음 파일 앨범에 저장유무 (true,false)
 *
 * @example
 * var callback = function(result){ console.log(result); };
 * var options = {'fileName':'screenRecorderExample', 'isInternal':'true', 'audio':'false', 'saveToGallery':'true'};
 * $h.screenRecorder.recordScreen(callback,options);
 */
$h.screenRecorder.recordScreen = function (callback, options) {
    try {
        wmatrix.plugin.screenRecorder.recordScreen(callback, options);
    } catch (e) {
        console.log(e);
    }
}


/**
 * @function      $h.screenRecorder.recordFinish
 * @description   화면 녹화를 종료 및 저장한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * * statusCode - {String} 1000
 * * msg - {String} Success
 * * data - {Object} filePath:"/file", recordingTime:""
 * @example
 * var callback = function(result){ console.log(result); };
 * $h.screenRecorder.recordFinish(callback);
 */
$h.screenRecorder.recordFinish = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordFinish(callback);
    } catch (e) {
        console.log(e);
    }
}


/**
* @function      $h.screenRecorder.recordCancel
* @description   화면 녹화를 취소하고 파일은 생성하지 않는다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode - {String} 1000
* * msg - {String} Success
* * data - null
*
* @example
* var callback = function(result){ console.log(result); };
* $h.screenRecorder.recordCancel(callback);
*/
$h.screenRecorder.recordCancel = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordCancel(callback)
    } catch (e) {
        console.log(e)
    }
}


/**
* @function      $h.screenRecorder.recordPause
* @description   화면 녹화를 일시정지한다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode - {String} 1000
* * msg - {String} Success
* * data - null
*
* @example
* var callback = function(result){ console.log(result); };
* $h.screenRecorder.recordPause(callback);
*/
$h.screenRecorder.recordPause = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordPause(callback)
    } catch (e) {
        console.log(e)
    }
}

/**
* @function      $h.screenRecorder.recordResume
* @description   일시정지된 녹화를 다시 시작한다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode - {String} 1000
* * msg - {String} Success
* * data - null
*
* @example
* var callback = function(result){ console.log(result); };
* $h.screenRecorder.recordResume(callback);
*/
$h.screenRecorder.recordResume = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordResume(callback)
    } catch (e) {
        console.log(e)
    }
}

/**
* @function      $h.screenRecorder.recordStatus
* @description   녹화가 진행 중인지 아닌지 상태를 나타낸다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode: {String} 1000
* * msg: {String} Success
* * data: {Int} status 0:record, 1:stop, 2:pause
*
* @example
* var callback = function(status){ console.log(status); };
* $h.screenRecorder.recordStatus(callback);
*/
$h.screenRecorder.recordStatus = function (callback) {
    try {
        wmatrix.plugin.screenRecorder.recordStatus(callback)
    } catch (e) {
        console.log(e)
    }
}

/**
* @function      $h.screenRecorder.deleteFile
* @description   녹화 파일을 삭제한다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode - {String} 1000
* * msg - {String} Success
* * data - null
*
* @param         {Object} options - object
* * deletefilePath: [Array] 파일경로
* @example
* var callback = function(result){ console.log(result); };
* var options = {'deleteFilePath':['$filePath','$filePath','$filePath']}
* $h.screenRecorder.deleteFile(callback,options);
*/
$h.screenRecorder.deleteFile = function (callback, options) {
    try {
        wmatrix.plugin.screenRecorder.deleteFile(callback, options)
    } catch (e) {
        console.log(e)
    }
}

/**
* @function      $h.screenRecorder.deleteAllFile
* @description   녹화된 파일 및 폴더를 전부 삭제한다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode - {String} 1000
* * msg - {String} Success
* * data - null
*
* @param         {Object} options - object
* * isInternal 삭제할 파일 저장소 중 내부/외부 저장소 (Default: true) (Android only)
*
* @example
* var callback = function(result){ console.log(result); };
* var options = {'isInternal':'true'};
* $h.screenRecorder.deleteAllFile(callback,options);
*/
$h.screenRecorder.deleteAllFile = function (callback, options) {
    try {
        wmatrix.plugin.screenRecorder.deleteAllFile(callback, options)
    } catch (e) {
        console.log(e)
    }
}


/**
 * @namespace      $h.view
 * @memberof       $h
 * @version        1.1.0
 * @author         Inswave Systems
 * @description    toast, snacker, notification 같은 네이티브 뷰를 호출하는 API를 제공한다.
 */
if (typeof $h.view !== "object") {
    $h.view = {};
}

/**
* @function      $h.view.toast
* @description   message 를 팝업(toast)으로 보여준다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode - {String} 1000
* * msg - {String} Success
* * data - null
* @param         {Object} options - object
* * message      [String]       팝업 (toast)로 보여줄 메세지.
* * time         [Int]          0: Short Time, 1: Long Time. (default: 0)
*
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"message": "Showing toast message.", "time" : 0};
* $h.view.toast(callback, opt);
*/
$h.view.toast = function (callback, options) {
    try {
        wmatrix.plugin.view.toast(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.view.snackBar
* @description   message 를 팝업(SnackBar)으로 보여준다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode - {String} 1000
* * msg - {String} Success
* * data - null
* @param         {Object} options - object
* * message        [String]       팝업 (SnackBar)로 보여줄 메세지.
* * time           [Int]          0: Short Time, 1: Long Time. (default: 0 - action 이 있는 경우 해당 옵션은 무시한다.)
* * action         {Object} action - object
* * buttonText     [String]       SnackBar 상호작용 버튼에 보여질 텍스트.
* * onClickEvent   [String]       상호작용 버튼 클릭 시 실행 될 javascript.
*
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"message": "Showing snack message.", "time" : 0, action : { "buttonText" : "앱 종료", "onClickEvent" : "alert('종료');" } };
* $h.view.snackBar(callback, opt);
*/
$h.view.snackBar = function (callback, options) {
    try {
        wmatrix.plugin.view.snackBar(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
* @function      $h.view.notification
* @description   message 를 notification 으로 보여준다.
*
* @param         {Function} callback - 콜백함수<br/>콜백 파라미터
* * statusCode - {String} 1000
* * msg - {String} Success
* * data - null
* @param         {Object} options - object
* * title        [String]       Notification 에 보여줄 Title 문구.
* * message      [String]       Notification 에 보여줄 Message 문구.
* * icon         [String]       Notification 에 보여줄 Icon Image. (Base64 형태의 String 값.) (Android Only)
* * ldpi: 48x48 px *0.75
* * mdpi: 64x64 px *1.00
* * hdpi: 96x96 px *1.50
* * xhdpi: 128x128 px *2.00
* * xxhdpi: 192x192 px *3.00
* * action       [String]       실행 할 javascript.
*
* @example
* var callback = function(result){ console.log(result); };
* var opt = {"title": "Notification Title", "message": "Showing notification message.", "icon" : "adsfdasfadsf==", action : "alert('종료');" };
* $h.view.notification(callback, opt);
*/
$h.view.notification = function (callback, options) {
    try {
        wmatrix.plugin.view.notification(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * namespace      $h.websquare
 * memberof       $h
 * version        1.1.0
 * author         Inswave Systems
 * description    WebSquare 플러그인을 추가하면 웹스퀘어에서 exceldownload함수 호출시 앱에 엑셀 저장기능을 제공한다.
 */
if (typeof $h.websquare !== "object") {
    $h.websquare = {};
}

$h.websquare.excelDownload = function (success, fail, option) {
    try {
        wmatrix.plugin.websquare.excelDownload(success, fail, option);
    } catch (e) {
        console.log(e);
    }
}

/**
 * namespace      $h.wmatrixprovider
 * memberof       $h
 * version        1.0.0
 * author         Inswave Systems
 * description    wmatrixprovider기능을 플러그인함수로 제공한다.
 */
if (typeof $h.wmatrixprovider !== "object") {
    $h.wmatrixprovider = {};
}

/**
 * function       $h.wmatrixprovider.isOffline
 * description    offline mode로 실행중인지 아닌지 알려준다.
 * example
 * var callback = function(r){ console.log(r); };
 * $h.wmatrixprovider.isOffline(callback);
 */
$h.wmatrixprovider.checkOffline = function (callback) {
    wmatrix.exec(callback, "WMatrixProviderPlugin", "isOffline", []);
}

/**
 * function       $h.wmatrixprovider.checkRefreshUpdate
 * description    Refresh Update대상 파일 확인 후 결과값을 전달 받는다. (RefreshUpdate Policy가 켜져있을때만 동작)
 *
 * param   {Object} options - API parameter.
 * * restart : Refresh Update 확인 시 Resource 변경이 있으면 App을 종료하는 Dialog를 보여줄 지 Flag (Default : false)
 * * restartMessage : restart Dialog에서 보여줄 문구 (비어있으면 Default Message 출력)
 * * progress : Refresh Update 확인 시 Native Progress를 보여줄 지 Flag (Default : false)
 * * progressMessage : progress Dialog에서 보여줄 문구 (비어있으면 Default Message 출력)
 *
 * returns     {String} e - callback status code.
 * *   -1 - Refresh Update 오류
 * *    0 - Refresh Update 확인 결과 Resource가 Local과 Server가 같은 상태
 * *    1 - Refresh Update 확인 결과 Resource가 Local과 Server가 다르며, Update를 완료한 상태
 *
 * example
 * var callback = function(e){console.log(e);};
 * var options = {"progress" : true, "restart":true};
 * $h.wmatrixprovider.checkRefreshUpdate(callback, options);
 */
$h.wmatrixprovider.checkRefreshUpdate = function (callback, options) {
    wmatrix.exec(callback, "WMatrixProviderPlugin", "checkRefreshUpdate", options);
}

/**
 * function       $h.wmatrixprovider.showServerSelect
 * description    Server Select 화면을 보여준다.
 *                 서버를 선택하면 WmatrixSdk.init() 부터 다시 시작할 수 있도록 Native 에서 처리가 필요하다.
 * example
 * var callback = function(e){console.log(e);};
 * $h.wmatrixprovider.showServerSelect(callback, options);
 */
$h.wmatrixprovider.showServerSelect = function (callback) {
    wmatrix.exec(callback, "WMatrixProviderPlugin", "showServerSelect", {});
}

/**
 * @namespace      $h.screenprotector
 * @memberof       $h
 * @version        1.0.0
 * @author         Inswave Systems
 * @description    웹뷰에 스크린샷,화면녹화를 막는다.
 */
if (typeof $h.screenprotector !== "object") {
    $h.screenprotector = {};
}

/**
* @function      $h.screenprotector.start
* @description   screenprotector를 실행한다. Android에 스크린샷,화면녹화기능을 막는다. iOS는 스크린샷,화면녹화시 화면을 덮어 컨텐츠 노출을 막는다.
*
* @param         {Function} callback
* @example
* var callback = function(result){ console.log(result); };
* $h.screenprotector.start(callback);
*/
$h.screenprotector.start = function(callback) {
    try {
        wmatrix.plugin.screenprotector.start(callback);
    } catch(e) {
        console.log(e);
    }
}

/**
* @function      $h.screenprotector.stop
* @description   screenprotector를 중지한다.
*
* @param         {Function} callback - 콜백함수
* @example
* var callback = function(result){ console.log(result); };
* $h.screenprotector.stop(callback);
*/
$h.screenprotector.stop = function(callback) {
    try {
        wmatrix.plugin.screenprotector.stop(callback);
    } catch(e) {
        console.log(e);
    }
}

/**
 * @namespace      $h.edgeagent
 * @memberof       $h
 * @version        1.0.0
 * @author         Inswave Systems
 * @description    EdgeManager와 연계되는 기능을 제공한다.
 */
if (typeof $h.edgeagent !== "object") {
    $h.edgeagent = {};
}

/**
 * @function      $h.edgeagent.userLogIn
 * @description   EdgeManager에 로그인한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * statusCode - {String} 1000
 * msg - {String} Success
 * data - {Object} null
 * @param         {Object} options - object
 *  * userId : 사용자 ID
 *  * userName : 사용자 이름
 *  * departCode : 소속 코드
 *  * duty : 직위
 *  * position : 직급
 *  * email : 사용자 E-Mail
 *  * phoneNo : 전화번호
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {"userId" : "10002", "userName" : "USER", "departCode" : "010101", "duty" : "팀장", "position" : "부장", "email" : "example@inswave.com", "phoneNo" : "010-000-0000"};
 * $h.edgeagent.userLogIn(callback,params);
 */
$h.edgeagent.userLogIn = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.userLogIn(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.userLogOut
 * @description   EdgeManager에 로그아웃한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * statusCode - {String} 1000
 * msg - {String} Success
 * data - {Object} null
 * @param         {Object} options - object
 *  * userId : 사용자 ID
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {"userId" : "10002"};
 * $h.edgeagent.userLogOut(callback,params);
 */
$h.edgeagent.userLogOut = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.userLogOut(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.getNewNotification
 * @description   읽지 않은 공지를 조회한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * statusCode - {String} 1000
 * msg - {String} Success
 * data - {Object} null
 * @param         {Object} options - object
 *  JsonObj - 공지 조회에 필요한 옵션 Json (사이트마다 정의)
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {};
 * $h.edgeagent.getNewNotification(callback,params);
 */
$h.edgeagent.getNewNotification = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.getNewNotification(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.getAllNotification
 * @description   모든 공지를 조회한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * statusCode - {String} 1000
 * msg - {String} Success
 * data - {Object} null
 * @param         {Object} options - object
 *  JsonObj - 공지 조회에 필요한 옵션 Json (사이트마다 정의)
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = {};
 * $h.edgeagent.getAllNotification(callback,params);
 */
$h.edgeagent.getAllNotification = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.getAllNotification(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.setNotificationRead
 * @description   전달된 공지 ID들을 읽음 처리한다.
 * @param         {Function} callback - 콜백함수<br/>콜백 파라미터
 * statusCode - {String} 1000
 * msg - {String} Success
 * data - {Object} null
 * @param         {Object} options - object
 *  JsonArray : 읽음 공지 처리할 공지 ID Array
 * @example
 * var callback = function(result){ console.log(result); };
 * var params = [ { "notiId": 11111 }, { "notiId": 11112}] ;
 * $h.edgeagent.setNotificationRead(callback,params);
 */
$h.edgeagent.setNotificationRead = function (callback, options) {
    try {
        wmatrix.plugin.edgeagent.setNotificationRead(callback, options);
    } catch (e) {
        console.log(e);
    }
}

/**
 * @function      $h.edgeagent.onMessageListener
 * @description   공지가 수신되었을때 호출될 함수를 등록한다.
 * @param         {Function} listener - 이벤트발생시 실행할 함수
 * @example
 * var listener = function(e){ console.log(e); };
 * $h.edgeagent.onMessageListener(listener);
 */
$h.edgeagent.onMessageListener = function (listener) {
    try {
        document.addEventListener('onEdgeManagerMessage', listener, false);
    } catch (e) {
        console.log(e);
    }
}

// event      $h.edgeagent.onMessageReceived
// description   EdgeManager Message를 받았을때 Event를 발생시킨다. (App에서 호출)
$h.edgeagent.onMessageReceived = function (data) {
    var event = new Event('onEdgeManagerMessage');
            event.data = data
            document.dispatchEvent(event);
}