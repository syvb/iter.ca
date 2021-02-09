// ==UserScript==
// @name         become Team Desmos
// @namespace    https://smitop.com/
// @version      1.0
// @description  like being on Team Desmos but without the whole "getting a job" thing
// @author       me@smitop.com
// @match        https://teacher.desmos.com/*
// @match        https://student.desmos.com/*
// @grant        none
// ==/UserScript==

window.require.s.contexts._.defined["shared/models/user"].User.prototype.hasRole = () => true;
