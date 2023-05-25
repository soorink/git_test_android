/*
 * Copyright (C) Inswave Systems, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Inswave Systems <webmaster@inswave.com>, 2021
 */

package inswave.wmatrix.template

import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.WebView
import androidx.activity.OnBackPressedCallback
import androidx.annotation.MainThread
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import inswave.wmatrix.SdkOptions
import inswave.wmatrix.WMatrixSdk
import inswave.wmatrix.config.WMatrixConfig
import inswave.wmatrix.extension.loadStartPage
import inswave.wmatrix.provider.WMatrixProvider
import inswave.wmatrix.provider.WMatrixProviderImpl
import inswave.wmatrix.provider.model.ProviderError
import inswave.wmatrix.template.databinding.LoadingLayoutBinding
import inswave.wmatrix.template.databinding.TemplateMainBinding
import inswave.wmatrix.view.WMatrix
import inswave.wmatrix.view.WMatrixImpl
import okhttp3.JavaNetCookieJar
import okhttp3.OkHttpClient
import java.net.CookieManager

/**
 * W-Matrix TemplateActivity
 */
class TemplateActivity : AppCompatActivity(), WMatrixProvider.CallbackListener, WMatrix.WebViewEvent {
    private lateinit var binding: TemplateMainBinding
    var provider: WMatrixProvider? = null
    var wMatrix: WMatrix? = null

    private var webView: WebView? = null

    // 서버 선택 화면 표출 여부.
    private var useServerSelectScreen = false

    init {
        addBackPressedEventListener()
    }

    /**
     * W-Matrix 를 사용하기 위한 SDK 초기화.
     */
    private fun initialize() {

        // WLog 사용 여부. (default 는 false)
        WMatrixConfig.loggable = true

        // e.g.) WMatrixConfig.yaml 내 Profile 에 설정되어 있는 useServerSelectScreen 값을 가져와 설정한다.
        WMatrixConfig.Profile.getActiveProfileInfo(applicationContext)
            .also { activeProfile ->
                useServerSelectScreen = activeProfile.get("useServerSelectScreen").asBoolean
            }

        val httpClient = OkHttpClient.Builder()
            .cookieJar(JavaNetCookieJar(CookieManager()))   // Session 유지.

        val sdkOptions = SdkOptions.Builder()
            .setOfflineMode(false)
            .useServerSelectScreen(useServerSelectScreen)
            .addHttpClientBuilder(httpClient)
            .build()

        WMatrixSdk.sdkInit(this, sdkOptions)

        // 상황에 맞게 Loading 화면을 만들어서 사용하면 된다.
        LoadingLayoutBinding.inflate(layoutInflater)
            .also { loadingViewBinding ->
                binding.containerMainLoading.addView(loadingViewBinding.root)

                /*
                 * Loading 화면을 웹에서 제어하려는 경우에 추가한다.
                 * 웹에서 $h.dismissScreen(); 호출 시 화면을 보이지 않게 처리한다.
                 * 개발 환경에 맞게 해당 화면을 수정, 제거하여 사용하면 된다.
                 *
                 * 동작방식)
                 * WMatrixSdk.showLoadingLayout 호출 시 해당 View 를 View.VISIBLE 로 변경 해주고,
                 * 웹에서 $h.dismissScreen(); 호출 시 View.GONE 처리 한다.
                 */
                WMatrixSdk.showLoadingLayout(binding.containerMainLoading)
            }

        /**
         * AppPlugin 에 startWebView 기능을 사용하려는 경우 아래 코드로 추가.
         * WebView  를 add 할 FrameLayout 의 View ID 를 설정한다.
         */
//        AppPluginViewContainer.startWebViewContainerId = R.id.container_start_web_view
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = TemplateMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        initialize()

        /*
         * W-Matrix 를 사용하기 위한 Provider 객체 생성.
         */
        provider = WMatrixProviderImpl.Builder(this)
            .setCallbackListener(this)
            .build()

        if (provider != null) {
            when (useServerSelectScreen) {
                true -> provider!!.showServerSelect()   // 서버 선택 화면을 보여준다. (debug 인 경우에만 동작하도록 설정을 권장한다.)
                false -> provider!!.create()            // W-Matrix Provider 를 생성한다.
            }
        } else {
            Log.d("Template", "W-Matrix provider is Fail.")
        }


        /**
         * 현재 활성화 된 profile 확인.
         *
         * WMatrixSdk.sdkInit() 이전에 설정값을 사용하고 싶은 경우 아래 코드로 사용할 수 있다.
         * val active = WMatrixConfig.Profile.getActive(context)
         * val activeProfileInfo = WMatrixConfig.Profile.getActiveProfileInfo(context)
         */
        Log.d("Template", "profile = ${WMatrixConfig.Profile.active}")
        Log.d("Template", "applicationId = ${WMatrixConfig.Profile.activeProfileInfo.get("applicationId")}")

        // 서버 선택화면을 보고 싶지 않은 경우 아래 if~else 주석을 풀고 사용한다.
//        if (provider != null) {
//            provider!!.create()
//        } else {
//            Log.d("Template", "W-Matrix provider is Fail.")
//        }

        /*
         * W-Matrix 객체 생성.
         * 해당 객체로 WMatrixProvider 가 시작된 시점 이후부터 웹뷰를 생성하여 사용할 수 있다.
         */
        wMatrix = WMatrixImpl.Builder(this)
            .setWebViewEvent(this)
            .build()
    }

    /**
     * W-Matrix Provider 가 생성된 상태.
     */
    override fun onProviderCreate() {

        // WebView 를 생성한다.
        webView = wMatrix?.makeWebView()

        // W-Matrix Provider 를 구동시킨다.
        if (webView != null) {
            provider?.start()
        }
    }

    /**
     * W-Matrix Provider 가 구동된 상태.
     */
    override fun onProviderStart() {

        /*
         * 생성 된 WebView 를 container 에 추가하고, 해당 container 를 보여지게 처리한다.
         */
        binding.containerMainWeb
            .apply {
                visibility = View.VISIBLE
                addView(webView)
            }

        // 시작페이지를 load 한다.
        webView?.loadStartPage()
    }

    /**
     * W-Matrix Provider 생성, 구동 중 에러 발생 시 콜백.
     */
    override fun onProviderError(error: ProviderError) {
        Log.e("Template", "WMatrixProvider Error code = ${error.errorCode}, message = ${error.errorMessage}, reason = ${error.errorReason}, solution = ${error.errorSolution}")

        /*
         * WMatrixProvider 에서 발생한 에러.
         * Callback 받은 error 객체로 Custom 한 Dialog 로 처리할 수 있다.
         */
        runOnUiThread {
            DialogUtils.forceExit(
                dialog = MaterialAlertDialogBuilder(this),
                title = "Error",
                message = "${error.errorMessage ?: ""}\n(Reason=${error.errorReason ?: ""})",
                onPositiveButtonClicked = {
                    finishAffinity()
                }
            )
        }
    }

    /**
     * 기존 onBackPressed 가 deprecated 에 따른 처리.
     * Supported on Android 1.6+
     */
    @MainThread
    private fun addBackPressedEventListener() {
        val backPressedCallback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {

                /*
                 * Plugin 에서 View 를 추가하여 사용하는 케이스가 있어서
                 * 추가 된 View 가 있는지 확인 후 없는 경우에 종료 다이얼로그가 나오도록 처리가 필요하다.
                 */
                when (wMatrix?.isAttachedView() ?: false) {
                    true -> {
                        try {
                            wMatrix?.closeAttachedView(webView!!)
                        } catch (e: Exception){
                            exitDialog()
                        }
                    }

                    false -> exitDialog()
                }
            }
        }

        onBackPressedDispatcher.addCallback(this, backPressedCallback)
    }

    override fun onDestroy() {
        super.onDestroy()
        webView?.destroy()
    }

    /**
     * WebView 에서 $h.dismissScreen(); 요청이 오는 경우에 해당 method 로 callback 이 온다.
     */
    override fun onDismiss() {
        WMatrixSdk.dismissLoadingLayout()
    }

    private fun exitDialog() {
        if (!isFinishing) {
            DialogUtils.exit(
                dialog = MaterialAlertDialogBuilder(this),
                title = "",
                message = getString(R.string.exit_or_not),
                onPositiveButtonClicked = {
                    webView?.destroy()
                    this@TemplateActivity.finishAffinity()
                }
            )
        }
    }
}