// ==UserScript==
// @name         Ignore "Video Paused, continue watching?"
// @version      1.0
// @description  Userscript-ified version of u/hikyaaa's script
// @author       You
// @match        https://youtube.com/*
// @match        https://www.youtube.com/*
// @match        http://youtube.com/*
// @match        http://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    let click = new Event('click');
    setInterval(() => {
        let arr = Array.from(document.querySelectorAll('.ytd-popup-container'));
        let elem = arr[1]; // the popup
        if(elem) {
            let a = document.querySelector('#confirm-button'); // find the actual button
            a.dispatchEvent(click); // DIE
        }
    }, 500); // number of ms between checks
})();
