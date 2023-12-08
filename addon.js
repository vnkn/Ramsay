// ==UserScript==
// @name        Ramsay
// @namespace   Adds button of Cook's hat to YouTube control pane to leads to Ramsay
// @include     https://www.youtube.com/watch?*
// @match       http://www.youtube.com/watch?*
// @match       https://www.youtube.com/watch?*
// @grant       none
// @version     1.0
// @author      mehvix
// @description 6/17/2023, 5:32:25 PM
// ==/UserScript==

window.addEventListener("load", function () {
    let baseID = "cookbook";
    let title = "open cookbook";
    const ramsay_domain = "https://ramsay.mehvix.com";

    const existingElement = document.getElementById(baseID + "Button");
    if (existingElement !== null) return existingElement;

    // get YT ID
    let yt_id = window.location.href.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(?:\S+)?$/)[1];

    // Button HTML
    const newButton = document.createElement("button");
    newButton.draggable = false;
    newButton.id = baseID + "Button";
    newButton.classList.add("playerButton");
    newButton.classList.add("ytp-button");
    newButton.addEventListener("click", () => {
        window.open(ramsay_domain + "/&id=" + yt_id, '_blank');
    });

    // ===========================================

    // Create the SVG namespace
    const svgNS = "http://www.w3.org/2000/svg";

    // Create the SVG element
    const svgElement = document.createElementNS(svgNS, "svg");
    svgElement.setAttribute("xmlns", svgNS);
    svgElement.setAttribute("style", "cursor: default;");
    svgElement.setAttribute("viewBox", "0 -15 80 80");
    svgElement.setAttribute("height", "100%");

    // Create the path element
    const pathElement = document.createElementNS(svgNS, "path");
    pathElement.setAttribute("d", "M 25 2 C 21.339844 2 18.15625 3.839844 16.15625 6.59375 C 15.144531 6.285156 14.117188 6 13 6 C 6.9375 6 2 10.9375 2 17 C 2 21.640625 4.921875 25.542969 9 27.15625 L 9 38.6875 C 8.941406 38.882813 8.941406 39.085938 9 39.28125 L 9 47 C 9 47.550781 9.449219 48 10 48 L 40 48 C 40.550781 48 41 47.550781 41 47 L 41 39.1875 C 41.027344 39.054688 41.027344 38.914063 41 38.78125 L 41 27.15625 C 45.078125 25.542969 48 21.640625 48 17 C 48 10.9375 43.0625 6 37 6 C 35.882813 6 34.855469 6.285156 33.84375 6.59375 C 31.84375 3.839844 28.660156 2 25 2 Z M 25 4 C 28.207031 4 30.996094 5.667969 32.59375 8.1875 C 32.847656 8.601563 33.363281 8.773438 33.8125 8.59375 C 34.8125 8.210938 35.875 8 37 8 C 41.984375 8 46 12.015625 46 17 C 46 21.039063 43.335938 24.445313 39.6875 25.59375 C 39.28125 25.726563 39.003906 26.105469 39 26.53125 L 39 38 L 11 38 L 11 26.53125 C 10.996094 26.105469 10.71875 25.726563 10.3125 25.59375 C 6.664063 24.445313 4 21.039063 4 17 C 4 12.015625 8.015625 8 13 8 C 14.125 8 15.1875 8.210938 16.1875 8.59375 C 16.636719 8.773438 17.152344 8.601563 17.40625 8.1875 C 19.003906 5.667969 21.792969 4 25 4 Z M 17.90625 26.96875 C 17.863281 26.976563 17.820313 26.988281 17.78125 27 C 17.316406 27.105469 16.988281 27.523438 17 28 L 17 31 C 16.996094 31.359375 17.183594 31.695313 17.496094 31.878906 C 17.808594 32.058594 18.191406 32.058594 18.503906 31.878906 C 18.816406 31.695313 19.003906 31.359375 19 31 L 19 28 C 19.011719 27.710938 18.894531 27.433594 18.6875 27.238281 C 18.476563 27.039063 18.191406 26.941406 17.90625 26.96875 Z M 24.90625 26.96875 C 24.863281 26.976563 24.820313 26.988281 24.78125 27 C 24.316406 27.105469 23.988281 27.523438 24 28 L 24 32 C 23.996094 32.359375 24.183594 32.695313 24.496094 32.878906 C 24.808594 33.058594 25.191406 33.058594 25.503906 32.878906 C 25.816406 32.695313 26.003906 32.359375 26 32 L 26 28 C 26.011719 27.710938 25.894531 27.433594 25.6875 27.238281 C 25.476563 27.039063 25.191406 26.941406 24.90625 26.96875 Z M 31.90625 26.96875 C 31.863281 26.976563 31.820313 26.988281 31.78125 27 C 31.316406 27.105469 30.988281 27.523438 31 28 L 31 31 C 30.996094 31.359375 31.183594 31.695313 31.496094 31.878906 C 31.808594 32.058594 32.191406 32.058594 32.503906 31.878906 C 32.816406 31.695313 33.003906 31.359375 33 31 L 33 28 C 33.011719 27.710938 32.894531 27.433594 32.6875 27.238281 C 32.476563 27.039063 32.191406 26.941406 31.90625 26.96875 Z M 11 40 L 39 40 L 39 46 L 11 46 Z");
    pathElement.setAttribute("fill", "white");

    // Append the path element to the SVG element
    svgElement.appendChild(pathElement);

    newButton.appendChild(svgElement);

    // ========================================

    // Add the button to player
    controls = document.getElementsByClassName('ytp-right-controls')[0];
    if (controls) controls.prepend(newButton);


}, false);
