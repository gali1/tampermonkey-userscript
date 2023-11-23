// ==UserScript==
// @name         网页URL二维码生成
// @namespace    http://yeyu1024.xyz
// @version      1.3
// @description  生成当前网页的地址(url)的二维码，方便手机扫描
// @description:en Generate the QR code of the address of the current webpage (URL), which is convenient for mobile phone scanning
// @author       夜雨
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://www.the-qrcode-generator.com
// @require      https://cdn.bootcdn.net/ajax/libs/qrcodejs/1.0.0/qrcode.min.js
// @require      https://cdn.staticfile.org/jquery/3.4.0/jquery.min.js
// @grant        GM_registerMenuCommand
// @homepageURL  https://greasyfork.org/zh-CN/scripts/480612
// @supportURL   https://greasyfork.org/zh-CN/scripts/480612
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function urlQRCode(){
        $("body").append(`<div id="QRContainer" class="qrcodeDiv" style="z-index: 9999 !important;left: 50px;top: 50px;/*height: 350px;*/position: fixed;background-color: white;border-radius: 10px" >
      <div style="margin: 20px" id="qrcodeDiv"></div>
      <div style="margin-left: 20px">
          <button style="font-size: 14px;width: 70px; height: 30px;margin-top: 10px;margin-bottom:10px;border-radius: 6px;margin-left: 3px;" id="closeQRCodebtn">关闭</button>
          <button style="font-size: 14px;width: 120px; height: 30px;margin-top: 10px;margin-bottom:10px;border-radius: 6px;margin-left: 3px;" id="reQRCodebtn">重新生成</button>
      </div>
    </div>`);

        let qrcodeDiv = document.getElementById("qrcodeDiv")
        let QRContainer = document.getElementById("QRContainer")
        let qrcode = new QRCode(qrcodeDiv, {
            text: location.href,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        const closeQRCodebtn = document.getElementById("closeQRCodebtn");
        closeQRCodebtn.addEventListener("click",()=>{
            QRContainer.remove();
        })

        const reQRCodebtn = document.getElementById("reQRCodebtn");
        reQRCodebtn.addEventListener("click",()=>{
            qrcode.clear(); // clear the code.
            qrcode.makeCode(location.href);
        })
    }

    GM_registerMenuCommand("生成二维码", function (event) {
        let QRContainer = document.getElementById("QRContainer")
        if(QRContainer){
            QRContainer.remove()
        }
        urlQRCode()
    }, "qrcodeGenerate");


})();