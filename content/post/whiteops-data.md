+++
date = "2020-07-08T04:00:00+00:00"
description = "A long list of data collected by WhiteOps"
tags = ["internet", "whiteops", "reddit"]
title = "Data WhiteOps collects"

+++

*Edit: White Ops has recently rebranded to HUMAN.*

Today I noticed [New Reddit](https://reddit.com/) was asking to use DRM. So I went on a source code analysis journey! See the [main post](/post/reddit-whiteops) for more details.

It appears Reddit uses [White Ops](https://whiteops.com) for fingerprinting and ad fraud prevention (but only sometimes, I think it's an A/B test). See this beautified code:
```js
const t = e.user.account ? Jt()(e.user.account.id).toString() : void 0,
    s = document.createElement("script");
s.src = Object(es.a)("https://s.udkcrj.com/ag/386183/clear.js", {
    dt: "3861831591810830724000",
    pd: "acc",
    mo: 0,
    et: 0,
    ti: $t()(),
    ui: t,
    si: "d2x"
}), document.head.appendChild(s)
```

This code is only run if the `show_white_ops` feature flag is enabled (don't know how to force this to be true), which is why I assume the tracking is done by [WhiteOps](https://www.whiteops.com/).
Further research into the `https://s.udkcrj.com/ag/386183/clear.js` file reveals that it ends up loading another script, `https://s.udkcrj.com/2/4.71.0/main.js`.

Note: here is a function I used to deobfuscate many strings in the code:
```js
const deob = x => x.replace(/[A-Za-z]/g, function(e) {
    return String.fromCharCode(e.charCodeAt(0) + (e.toUpperCase() <= "M" ? 13 : -13))
})
```
Note 2: Ozoki appears to be some sort of internal codename used by WhiteOps.

This very obfuscated script does many things, including (this is an incomplete list, I have missed many things):
- Communicates with `vprza.com` and `minkatu.com`
- Does device/OS detection
- Attempts to detect if DevTools is open (looks at `__IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE`)
- Something weird with the `text-underline-offset` CSS property
- Has the names of a bunch of ad servers, presumably as to not serve ads to bots
- Attempts to create an `ActiveXObject` (only exists in old IE versions), and checks if the created ActiveX object `isSandboxed`
- Checks for `maxConnectionsPerServer` and `onhelp` properties on `window` (for browser engine detection I think)
- Attempts to exploit an IE11 vuln!
  - it checks the value of `document.documentMode`, which in IE11 is `11`. If it is, then it runs the obfuscated code:
```js
// o == document.documentMode == 11
"}o|B65niitbmd,ahg)Z[i$_g".replace(/./g, function(e) {
    return String.fromCharCode(e.charCodeAt(0) - o--)
})
```
  - this evaluates to `res://ieframe.dll/acr.js`, but only on IE. This string has only one purpose, exploiting the fact that you can put arbitrary HTML in the hash part of the URL and have it get evaluated, I believe in a privileged context of some sort. This file actually resolves in IE to a internal Windows system file, which is only accessible in JS due to a bug.
- tries to run VBScript:
```js
execScript("e71012934811a=false::On Error Resume Next::" + e + "::if Err.Number=-2147024891 or Err.Number=5002 then e71012934811a=true::Err.Clear", "VBScript"), t = "e71012934811a" in window ? window.e71012934811a ? o.EXISTS : o.MISSING : o.UNKNOWN
```
- checks for these strings on window (de-obfuscated, I also have the original obfuscated ones in case you are also looking through the source):
  - `boltsWebViewAppLinkResolverResult`, `GoogleJsInterface`, `googleAdsJsInterface`, `accessibilityTraversal`, `accessibility`, `FbPlayableAd`, `__REACT_WEB_VIEW_BRIDGE`
  - obfuscated in code as `obygfJroIvrjNccYvaxErfbyireErfhyg`, `TbbtyrWfVagresnpr`, `tbbtyrNqfWfVagresnpr`, `npprffvovyvglGenirefny`, `npprffvovyvgl`, `SoCynlnoyrNq`, `__ERNPG_JRO_IVRJ_OEVQTR`
- checks the screen's `availHeight`, `availWidth`, `width`, and `height`
- checks the screen's `colorDepth`, `pixelDepth`, and `devicePixelRatio`
- checks for these automation-related properties on `window`: `domAutomation`, `domAutomationController`, `_WEBDRIVER_ELEM_CACHE`, `_phantom`, `callPhantom`, `window.chrome._commandLineAPI`, `window.Debug.debuggerEnabled`, `__BROWSERTOOLS_CONSOLE`, `window._FirebugCommandLine`, and also if `document.documentElement.hasAttribute("webdriver")` is true
- checks if `"function () { return Function.apply.call(x.log, x, arguments); }" == window.console.log.toString()` (also to check for browser automation I guess
- tries to check if the browser is headless with `isExternalUrlSafeForNavigation`, `window.opera._browserjsran`, `window.opera.browserjsran`
- checks if `navigator.onLine` is true
- check the `window.chrome` object if in Chrome
- extracts data from `window.FirefoxInterfaces("wdICoordinate", "wdIMouse", "wdIStatus")`
- checks if `window.XPCOMUtils` exists
- checks if `window.netscape.security.privilegemanager` exists
- appears to check browser console timing
- checks referer against `"https://www.google.com", "https://apps.skype.com", "http://apps.skype.com", "https://www.youtube.com", "http://en.wikipedia.org/", "https://en.wikipedia.org/", "https://www.netflix.com", "http://www.netflix.com", "http://www3.oovoo.com"`
- checks for these properties in `window.external`: `["AddChannel", "AddDesktopComponent", "AddFavorite", "AddSearchProvider", "AddService", "AddToFavoritesBar", "AutoCompleteSaveForm", "AutoScan", "bubbleEvent", "ContentDiscoveryReset", "ImportExportFavorites", "InPrivateFilteringEnabled", "IsSearchProviderInstalled", "IsServiceInstalled", "IsSubscribed", "msActiveXFilteringEnabled", "msAddSiteMode", "msAddTrackingProtectionList", "msClearTile", "msEnableTileNotificationQueue", "msEnableTileNotificationQueueForSquare150x150", "msEnableTileNotificationQueueForSquare310x310", "msEnableTileNotificationQueueForWide310x150", "msIsSiteMode", "msIsSiteModeFirstRun", "msPinnedSiteState", "msProvisionNetworks", "msRemoveScheduledTileNotification", "msReportSafeUrl", "msScheduledTileNotification", "msSiteModeActivate", "msSiteModeAddButtonStyle", "msSiteModeAddJumpListItem", "msSiteModeAddThumbBarButton", "msSiteModeClearBadge", "msSiteModeClearIconOverlay", "msSiteModeClearJumpList", "msSiteModeCreateJumpList", "msSiteModeRefreshBadge", "msSiteModeSetIconOverlay", "msSiteModeShowButtonStyle", "msSiteModeShowJumpList", "msSiteModeShowThumbBar", "msSiteModeUpdateThumbBarButton", "msStartPeriodicBadgeUpdate", "msStartPeriodicTileUpdate", "msStartPeriodicTileUpdateBatch", "msStopPeriodicBadgeUpdate", "msStopPeriodicTileUpdate", "msTrackingProtectionEnabled", "NavigateAndFind", "raiseEvent", "setContextMenu", "ShowBrowserUI", "menuArguments", "onvisibilitychange", "scrollbar", "selectableContent", "version", "visibility", "mssitepinned", "AddUrlAuthentication", "CloseRegPopup", "FeatureEnabled", "GetJsonWebData", "GetRegValue", "Log", "LogShellErrorsOnly", "OpenPopup", "ReadFile", "RunGutsScript", "SaveRegInfo", "SetAppMaximizeTimeToRestart", "SetAppMinimizeTimeToRestart", "SetAutoStart", "SetAutoStartMinimized", "SetMaxMemory", "ShareEventFromBrowser", "ShowPopup", "ShowRadar", "WriteFile", "WriteRegValue", "summonWalrus"` and also `"AddSearchProvider", "IsSearchProviderInstalled", "QueryInterface", "addPanel", "addPersistentPanel", "addSearchEngine"`
- checks `maxConnectionsPerServer` (on Window I think)
- attempts to detect Brave Browser with `window.brave`
- checks for a bunch more properties on `window`:
```js
                m("document_referrer", h), m("performance_timing", h, function(e) {
                    return x.qKjvb(e)
                }), m("maxConnectionsPerServer", h), m("status", h), m("defaultStatus", h), m("performance_memory", h, _.flatten), m("screen", h, function(e) {
                    return e || {}
                }), m("devicePixelRatio", h), m("mozPaintCount", h), m("styleMedia_type", h), m("history_length", h), m("opener", h, "top_opener", function(e) {
                    return null !== e ? typeof e : "null"
                }), m("navigator_userAgent", h), m("fileCreatedDate", h), m("fileModifiedDate", h), m("fileUpdatedDate", h), m("lastModified", h), m("location_href", h), m("RemotePlayback", h), m("Permissions", h), m("Notification", h), m("MediaSession", h), m("name", h, function(e) {
                    return e.substr(0, 128)
                }), m("defaultView", h, "document_defaultView", function(e) {
                    return void 0 === e ? "undefined" : e === window
                }), m("console", h, _.flatten), m("localStorage", h, v), m("webkitNotifications", h, v), m("webkitAudioContext", h, v), m("chrome", h, k.Keys), m("opera", h, k.Keys), m("navigator_standalone", h), m("navtype", h, "performance_navigation_type"), m("navredirs", h, "performance_navigation_redirectCount"), m("loadTimes", h, "chrome_loadTimes"), m("vendor", h, "navigator_vendor"), m("codename", h, "navigator_appCodeName"), m("navWebdriver", h, "navigator_webdriver"), m("navLanguages", h, "navigator_languages"), m("ServiceWorker", h), m("ApplePaySetup", h), m("ApplePaySession", h), m("Cache", h), m("PaymentAddress", h), m("MerchantValidationEvent", h), m("mediaDevices", h, "navigator_mediaDevices"), m("share", h, "navigator_share"), m("onorientationchange", h), m("document_defaultView_safari", h), m("navigator_brave", h), m("navigator_brave_isBrave", h), le.hco && m("navHardwareConc", h, "navigator_hardwareConcurrency"), le.ndm && m("navDevMem", h, "navigator_deviceMemory"), le.nvl && (m("navLocks", h, "navigator_locks", function(e) {
                    var t = typeof e;
                    return "undefined" === t ? "undefined" : "object" === t ? "obj" : e
                }), m("navLocksR", h, "navigator_locks_request", function(e) {
                    return "undefined" === typeof e ? "undefined" : e
                })), le.wor && m("origin", h, "origin"), "object" == typeof location && m("protocol", location), "object" == typeof document && (m("hidden", document), m("documentMode", document), m("compatMode", document), m("visibilityState", document), m("d_origin", document, "origin"), m("ddl_origin", document, "defaultView_location_origin"));
```
- checks `mozIsLocallyAvailable` (which is only available on FF <= 35, and could be for checking if someone is trying to debug this script offline)
- checks how rounding of large and small numbers works, with `Math.round(.49999999999999994)` and `Math.round(Math.pow(2, 52))`
- checks the installed plugins (with `navigator.plugins`)
- checks the browser viewport
- attempts to get the "frame depth" (not sure what exactly that is)
- checks for various status bars on `window` (`"locationbar", "menubar", "personalbar", "scrollbars", "statusbar", "toolbar"`)
- checks for `window.showModalDialog`
- checks the `-webkit-text-size-adjust` property
- checks if using `xx-small` as a font size works
- Checks if image loading is enabled, by trying to load a 1x1 GIF
- Tries to load an image with a URL of `https:/`, and checking if it loaded or errored
- Checks the stringification o
- checks for these properties on `window`: `StorageItem AnimationTimeline MSFrameUILocalization HTMLDialogElement mozCancelRequestAnimationFrame SVGRenderingIntent SQLException WebKitMediaKeyError SVGGeometryElement SVGMpathElement Permissions devicePixelRatio GetSVGDocument HTMLHtmlElement CSSCharsetRule ondragexit MediaSource external DOMMatrix InternalError ArchiveRequest ByteLengthQueuingStrategy ScreenOrientation onwebkitwillrevealbottom onorientationchange WebKitGamepad GeckoActiveXObject mozInnerScreenX WeakSet PaymentRequest Generator BhxWebRequest oncancel fluid media onmousemove HTMLCollection OpenWindowEventDetail FileError SmartCardEvent guest CSSConditionRule showModelessDialog SecurityPolicyViolationEvent EventSource ServiceWorker EventTarget origin VRDisplay onpointermove HTMLBodyElement vc2hxtaq9c TouchEvent DeviceStorage DeviceLightEvent External webkitPostMessage HTMLAppletElement ErrorEvent URLSearchParams BluetoothRemoteGATTDescriptor RTCStatsReport EventException PERSISTENT MediaKeyStatusMap HTMLOptionsCollection dolphinInfo MSGesture SVGPathSegLinetoRel webkitConvertPointFromNodeToPage doNotTrack CryptoDialogs HTMLPictureElement MediaController`
- checks for these CSS properties: `scroll-snap-coordinate flex-basis webkitMatchNearestMailBlockquoteColor MozOpacity textOverflow position columns msTextSizeAdjust animationDuration msImeAlign webkitBackgroundComposite MozTextAlignLast MozOsxFontSmoothing borderRightStyle webkitGridRow cssText parentRule webkitShapeOutside justifySelf isolation -moz-column-fill offsetRotation overflowWrap OAnimationFillMode borderRight border-inline-start-color webkitLineSnap MozPerspective touchAction enableBackground borderImageSource MozColumnFill webkitAnimationFillMode MozOSXFontSmoothing XvPhonemes length webkitFilter webkitGridAutoColumns`
- checks the stringification of native functions, and verifies some functions are implemented in native code (including `performance.mark`, and `Function.prototype.toString` itself)
- attempts to get the width of the string `mmmmmmmmmmlli` in all of these fonts: `"Ubuntu", "Utopia", "URW Gothic L", "Bitstream Charter", "FreeMono", "DejaVu Sans", "Droid Serif", "Liberation Sans", "Vrinda", "Kartika", "Sylfaen", "CordiaUPC", "Angsana New Bold Italic", "DFKai-SB", "Ebrima", "Lao UI", "Segoe UI Symbol", "Vijaya", "Roboto", "Apple Color Emoji", "Baskerville", "Marker Felt", "Apple Symbols", "Chalkboard", "Herculanum", "Skia", "Bahnschrift", "Andalus", "Yu Gothic", "Aldhabi", "Calibri Light"`
- checks various user agent properties in `navigator`
- Listens to the `voiceschanged` event, and keeps track of what text-to-speech voices are available
- Attempts to load `chrome://browser/skin/feeds/feedIcon.png` (I think this used to be an RSS icon in old Firefox versions)
- checks for scripts injected into the page
- checks availble video codecs and formats: `'video/mp4;codecs="avc1.42E01E, mp4a.40.2"', 'video/mp4;codecs="avc1.58A01E, mp4a.40.2"', 'video/mp4;codecs="avc1.4D401E, mp4a.40.2"', 'video/mp4;codecs="avc1.64001E, mp4a.40.2"', 'video/mp4;codecs="mp4v.20.8, mp4a.40.2"', 'video/mp4;codecs="mp4v.20.240, mp4a.40.2"', 'video/3gpp;codecs="mp4v.20.8, samr"', 'video/ogg;codecs="theora, vorbis"', 'video/ogg;codecs="theora, speex"', "audio/ogg;codecs=vorbis", "audio/ogg;codecs=speex", "audio/ogg;codecs=flac", 'video/ogg;codecs="dirac, vorbis"', 'video/x-matroska;codecs="theora, vorbis"', 'video/mp4; codecs="avc1.42E01E"', 'audio/mp4; codecs="mp4a.40.2"', 'audio/mpeg;codecs="mp3"', 'video/webm; codecs="vorbis,vp8"'`
- checks for `window.$cdc_asdjflasutopfhvcZLmcfl_` (property used by Chrome Webdriver) (obfuscated as `"$" + x.qKjBI("pqp") + "_" + x.qKjBI("nfqwsynfhgbcsuipMYzpsy") + "_"`)
- gets WEBGL_debug_renderer_info, which contains GPU-specific info
- tries to detect if `IntersectionObserver` returns correct data
- checks what DRM solutions are available (although doesn't actaully use them, this is what causes the DRM popup in Firefox): looks for Widevine, PlayReady, Clearkey, and Primetime
- Attempts to load files stored in Chrome extension's data (presumably to detect if they are installed):
```
chrome-extension://ianldemdppnbbojbafdkpdofceajhica/img/info.svg
chrome-extension://elfchnpigjboibngodkiamfemllklmge/img/info.svg
chrome-extension://npfnhmfcalmmkbpgkhjpdaiajfdhpndm/img/info.svg
chrome-extension://pfobdhfgohkddopcdbifhccbbpjlakaa/img/info.svg
chrome-extension://gfpioeglfjecbkeeomdidlndcagpbmj/img/info.svg
chrome-extension://mnbkfnehljejnebgbgfhdkmjicgmangi/img/info.svg
chrome-extension://adcggpckpldlkcobapimobdijchkigmb/img/info.svg
chrome-extension://poifgggpiofkbhafbjljpbbajafcjafi/img/info.svg
chrome-extension://plkjhgplpjlokmchnngcaeneiigkipeb/img/info.svg
chrome-extension://hhhpajpnecmhngfgkclokcghcpfgbape/img/info.svg
chrome-extension://cnncicmafnkgbonafdjnikijbhjkeink/img/info.svg
chrome-extension://aoeceebmempjbabimmnfkeeioccbjkea/img/info.svg
chrome-extension://pbclflhfplnkbgfokopkmjpejkokcaec/img/info.svg
chrome-extension://pogfikdkppcfejpknaclddnpcjjbalbn/img/info.svg
chrome-extension://mdjpmjaonahjbjncdlkjgeggjfdnnmme/img/info.svg
chrome-extension://cefomhonapiagddecgpooacpnoomabne/img/info.svg
chrome-extension://iokdapkmdldpeomcloobkajedcdleoib/img/info.svg
chrome-extension://cndipecijohebobplligphncocjamhei/content/images/icons/16.png
chrome-extension://lmpknllkkhpbfahgbkgjgopandmdbopi/blocked-notification-bar.html
chrome-extension://blddopfbnibgpgfeheedhjaheikanamn/img/128x128g.png
chrome-extension://nfjcghppefdfgmnblhgelkjhmljpndhh/img/icon16.png
```
- checks if the source code of `window.close` (which is normally `[native code]`) contains `ELECTRON`
- there is the string "haha jit go brrrrr", as part of what appears to be some sort of either test for a JS engine bug or exploit
- collects performance data
- checks if Safari is creating a "Web clip" screenshot of the page
