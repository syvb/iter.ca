// ==UserScript==
// @name         Common Voice Playback Tweaks
// @namespace    https://smitop.com
// @version      1.0
// @description  Makes clips play back 1.5x faster, and autoclicks the play button
// @author       Smitop
// @match        https://voice.mozilla.org/*
// @grant        none
// ==/UserScript==

if(!window.added){window.added=true;var ct="";setInterval(function(){if(!document.querySelector("#root > div > div:nth-child(2) > div.contribution-wrapper > div > div.top > div.counter > span > b"))return;var tEle=document.querySelectorAll("#root > div > div:nth-child(2) > div.contribution-wrapper > div > div.cards-and-pills > div.cards-and-instruction > div.cards > div > div")[parseInt(document.querySelector("#root > div > div:nth-child(2) > div.contribution-wrapper > div > div.top > div.counter > span > b").innerText.split("/")[0],10)-1];if(tEle&&tEle.innerText!==ct){ct=tEle.innerText;document.querySelector(".primary-button.play button").click();}if(!document.getElementsByTagName("audio"))return;document.getElementsByTagName("audio")[0].playbackRate=1.5;}, 25);}else{alert("No need to click multiple times");}