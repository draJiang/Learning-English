(()=>{"use strict";var e,n,t,o={424:(e,n,t)=>{t.d(n,{Z:()=>g});var o=t(81),r=t.n(o),a=t(645),i=t.n(a),l=t(667),s=t.n(l),u=new URL(t(519),t.b),c=i()(r()),d=s()(u);c.push([e.id,"@font-face {\n    font-family: 'OPPOSans-R';\n    src: url("+d+") format('truetype');\n}\n\n#LearningEnglish2023 {\n    font-family: 'OPPOSans-R';\n    width: 380px;\n    height: 500px;\n    color: #333;\n    position: fixed;\n    display: flex;\n    flex-direction: column;\n    top: 10px;\n    right: 10px;\n    font-size: 14px;\n    background-color: #fff;\n    z-index: 9999;\n    overflow: hidden;\n    box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.1), -1px 10px 10px rgba(0, 0, 0, 0.06);\n    border-radius: 4px;\n}\n\n#myBox #LearningEnglish2023 {\n    position: fixed;\n    display: flex;\n    flex-direction: column;\n    top: 10px;\n    right: 10px;\n    font-size: 14px;\n    background-color: #fff;\n    z-index: 9999;\n    overflow: hidden;\n    box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.1), -1px 10px 10px rgba(0, 0, 0, 0.06);\n    border-radius: 4px;\n}\n\n#LearningEnglish2023 .openAIAnswer {\n    line-height: 30px;\n}\n\n#LearningEnglish2023 .userInput {\n    margin: 10px 0;\n}\n\n#LearningEnglish2023 .contentBox {\n    padding: 20px;\n    overflow: scroll;\n}\n\n#LearningEnglish2023 #ScouterNav {\n    display: flex;\n    justify-content: start;\n    align-items: center;\n    padding: 10px 19px;\n    border-bottom: 1px solid rgba(5, 5, 5, .06);\n    font-weight: bold;\n}\n\n#LearningEnglish2023 #ScouterNav img {\n    width: auto;\n    height: 24px;\n    margin-right: 6px;\n}\n\n#LearningEnglish2023 #ScouterSelection span {\n    background-color: rgba(0, 0, 0, .04);\n    /* border: 1px solid #d9d9d9; */\n    padding: 4px 8px;\n    border-radius: 2px;\n}\n\n#LearningEnglish2023 #ScouterSelection {\n    margin-bottom: 14px;\n}",""]);const g=c},412:(e,n,t)=>{t.r(n),t.d(n,{default:()=>x});var o=t(379),r=t.n(o),a=t(795),i=t.n(a),l=t(569),s=t.n(l),u=t(565),c=t.n(u),d=t(216),g=t.n(d),f=t(589),p=t.n(f),h=t(424),m={};m.styleTagTransform=p(),m.setAttributes=c(),m.insert=s().bind(null,"head"),m.domAPI=i(),m.insertStyleElement=g(),r()(h.Z,m);const x=h.Z&&h.Z.locals?h.Z.locals:void 0},824:function(e,n,t){var o=this&&this.__createBinding||(Object.create?function(e,n,t,o){void 0===o&&(o=t);var r=Object.getOwnPropertyDescriptor(n,t);r&&!("get"in r?!n.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return n[t]}}),Object.defineProperty(e,o,r)}:function(e,n,t,o){void 0===o&&(o=t),e[o]=n[t]}),r=this&&this.__setModuleDefault||(Object.create?function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}:function(e,n){e.default=n}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&o(n,e,t);return r(n,e),n},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.Nav=void 0;const l=a(t(294)),s=t(757),u=i(t(123));n.Nav=function(e){const[n,t]=(0,l.useState)(0),[o,r]=(0,l.useState)();return(0,l.useEffect)((()=>{}),[]),l.default.createElement(l.default.Fragment,null,l.default.createElement("div",{id:"ScouterNav"},l.default.createElement("img",{src:u.default}),l.default.createElement("div",{className:"rightBtnBox",style:{flex:1,textAlign:"right"}},"success"==e.addToAnkiStatus?"✅ Added to Anki":l.default.createElement(s.Button,{size:"small",type:"link",loading:"loading"===e.addToAnkiStatus,disabled:"standby"===e.addToAnkiStatus,onClick:()=>{console.log("Nav:handleSaveToAnkiBtnClick"),e.handleSaveToAnkiBtnClick()}},"Add to Anki"))))}},266:function(e,n,t){var o=this&&this.__createBinding||(Object.create?function(e,n,t,o){void 0===o&&(o=t);var r=Object.getOwnPropertyDescriptor(n,t);r&&!("get"in r?!n.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return n[t]}}),Object.defineProperty(e,o,r)}:function(e,n,t,o){void 0===o&&(o=t),e[o]=n[t]}),r=this&&this.__setModuleDefault||(Object.create?function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}:function(e,n){e.default=n}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&o(n,e,t);return r(n,e),n};Object.defineProperty(n,"__esModule",{value:!0}),n.Selection=void 0;const i=a(t(294));n.Selection=function(e){return(0,i.useEffect)((()=>{console.log("Selection:"),console.log(e)}),[]),i.default.createElement(i.default.Fragment,null,i.default.createElement("div",{id:"ScouterSelection"},i.default.createElement("span",null,e.title)))}},785:function(e,n,t){var o=this&&this.__createBinding||(Object.create?function(e,n,t,o){void 0===o&&(o=t);var r=Object.getOwnPropertyDescriptor(n,t);r&&!("get"in r?!n.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return n[t]}}),Object.defineProperty(e,o,r)}:function(e,n,t,o){void 0===o&&(o=t),e[o]=n[t]}),r=this&&this.__setModuleDefault||(Object.create?function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}:function(e,n){e.default=n}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&o(n,e,t);return r(n,e),n},i=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))((function(r,a){function i(e){try{s(o.next(e))}catch(e){a(e)}}function l(e){try{s(o.throw(e))}catch(e){a(e)}}function s(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,l)}s((o=o.apply(e,n||[])).next())}))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.PopupCard=void 0;const s=l(t(150)),u=a(t(294));t(412);const c=t(824),d=t(266),g=t(757),{TextArea:f}=g.Input;n.PopupCard=function(e){const[n,t]=(0,u.useState)(""),[o,r]=(0,u.useState)(""),[a,l]=(0,u.useState)(!0),[p,h]=(0,u.useState)("standby"),[m,x]=(0,u.useState)(!1),[b,v]=(0,u.useState)(!1),[y,w]=(0,u.useState)(!1),[A,S]=(0,u.useState)(""),[O,E]=(0,u.useState)("");(0,u.useEffect)((()=>{console.log("## PopupCard useEffect");let n=e.selection.toString(),t=e.selection.anchorNode.data;t.length<=n.length&&(t=e.selection.anchorNode.parentNode.parentNode.innerText),S(n),E(t),l(!0),s.default.storage.sync.get({currentLanguage:"English",targetLanguage:"Spanish"}).then((e=>{console.log(e);let o=`Please provide your responses in ${e.currentLanguage} for all of the following:\n      - Please explain the meaning of the word '${n}' in the following sentence using ${e.currentLanguage}:\n      "${t}"\n      - Provide two example sentences, both of which must contain the word '${n}', along with their translations. Please provide the sentences first in ${e.targetLanguage}, followed by the translations in ${e.currentLanguage}.\n      - Provide two ${e.currentLanguage} to ${e.targetLanguage} translation test questions based on appeals, both of which must contain the word '${n}'. Please do not provide the answers to the test questions.\n\n      sentence is sentence\n\n      Please format your responses as follows:\n      \n      <Explanation in ${e.currentLanguage}>\n      <h3>Example Sentences</h3>\n      <ul>\n        <li><Sentence 1 in ${e.targetLanguage}> - <Translation 1 in ${e.currentLanguage}></li>\n        <li><Sentence 2 in ${e.targetLanguage}> - <Translation 2 in ${e.currentLanguage}></li>\n      </ul>\n      <h3>Translation Test Questions</h3>\n      <ul>\n        <li><Test Question 1 in ${e.currentLanguage}></li>\n        <li><Test Question 2 in ${e.currentLanguage}></li>\n      </ul>\n      `;n.length>20&&(o=`Please provide your responses in ${e.currentLanguage} for all of the following:\n          - Analyze the following sentence, explain the grammar involved in the original sentence using ${e.currentLanguage}, and provide two examples for each knowledge point:\n          "${n}"\n          - Finally, create 2 test questions based on the grammar knowledge you've described. These questions should ask for the translation of a ${e.currentLanguage} phrase to ${e.targetLanguage}, but don't provide the answers.\n          Please respond in the following format:\n  \n          <h3><Grammar Knowledge Point></h3>\n          <p><Description of the grammar knowledge></p>\n          <ul>\n          <li><Example sentence><translation></li>\n          <li><Another example sentence><translation></li>\n          </ul>\n  \n          ...\n  \n          <h3>Test Questions</h3>\n          <ul>\n          <li><Test question 1></li>\n          <li><Test question 2></li>\n          </ul>`),P([{role:"user",content:o}])}))}),[e]);const P=(e,n="as1")=>i(this,void 0,void 0,(function*(){console.log("getGPTMsg:");let o=s.default.runtime.connect({name:"popup-name"});o.postMessage({type:"getGPTMsg",messages:e}),o.onMessage.addListener((e=>{console.log("port.onMessage.addListener"),"erro"===e.status&&("as2"===n?r(e.content):t(e.content),l(!1)),"end"===e.status&&("as2"===n?w(!0):(x(!0),h("normal"))),"begin"===e.status&&("as2"===n?r(""):t(""),l(!1)),"process"===e.status&&("as2"===n?r((n=>n+e.content)):t((n=>n+e.content)))}))}));return u.default.createElement("div",{id:"LearningEnglish2023"},u.default.createElement(c.Nav,{handleSaveToAnkiBtnClick:()=>{console.log("Popup:handleSaveToAnkiBtnClick"),h("loading");const e=A.length<=20?O:"",t={note:{deckName:"Default",modelName:"Basic",fields:{Front:A,Back:"<p>"+e+"</p>"+n+'<a href="'+window.location.href+'">Source</a>'},tags:["Scouter"]}};s.default.runtime.sendMessage({type:"addToAnki",messages:t}).then((function(e){console.log(e),null===e.error?h("success"):(alert(e.error),h("normal"))}),(function(e){h("normal"),console.log(e)}))},addToAnkiStatus:p,title:"Scouter"}),u.default.createElement("div",{className:"contentBox"},u.default.createElement(g.ConfigProvider,{theme:{token:{colorPrimary:"#FEB825"}}},u.default.createElement(d.Selection,{title:A}),a&&!m?u.default.createElement(g.Skeleton,{active:!0,title:!1}):u.default.createElement("div",{className:"openAIAnswer",dangerouslySetInnerHTML:{__html:n},style:{}}),m?u.default.createElement("div",{className:"userInput"},u.default.createElement(f,{rows:3,placeholder:"Press the Enter ⏎ key to submit.",onPressEnter:e=>{if(console.log(e),!e.shiftKey&&""!==e.target.defaultValue.replace(/(\r\n|\n|\r)/gm,"")){let t=`针对你提供的测试题，请检查我的回答，如果有误请指出错误的原因，最后提供正确答案，我的回答是："${e.target.defaultValue} "，如果回答和测试题无关，请直接提供测试题的答案`;v(!0),P([{role:"assistant",content:n},{role:"user",content:t}],"as2")}},disabled:b})):"",a&&!y&&m?u.default.createElement(g.Skeleton,{active:!0,title:!1}):u.default.createElement("div",{className:"openAIAnswer",dangerouslySetInnerHTML:{__html:o},style:{}}))))}},777:function(e,n,t){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const r=o(t(150)),a=o(t(294)),i=o(t(935)),l=t(785);console.log("before browser.runtime.onMessage.addListener"),r.default.runtime.onMessage.addListener((function(e,n,t){var o,r;if(console.log("content script onMessage:"),console.log(e),"open-souter"===e.type){null!==window.getSelection()&&console.log(null===(o=window.getSelection())||void 0===o?void 0:o.toString());let e=document.getElementById("__jiang-souter"),n=document.createElement("div");null!=e&&(console.log("已存在 Box 容器"),null===(r=e.parentNode)||void 0===r||r.removeChild(e)),e=document.createElement("div"),e.id="__jiang-souter",document.getElementsByTagName("html")[0].appendChild(e);const t=null==e?void 0:e.attachShadow({mode:"open"});t.appendChild(n);const s=document.createElement("link");s.rel="stylesheet",s.href="https://cdn.bootcdn.net/ajax/libs/antd/4.17.1/antd.min.css",t.appendChild(s);const u=document.createElement("style");u.textContent="\n    @font-face {\n      font-family: 'OPPOSans-R';\n      src: url('../public/font/OPPOSans-R.ttf') format('truetype');\n    }\n\n    #LearningEnglish2023 {\n        font-family: sans-serif;\n        width: 380px;\n        height: 500px;\n        color: #333;\n        position: fixed;\n        display: flex;\n        flex-direction: column;\n        top: 10px;\n        right: 10px;\n        font-size: 13px;\n        background-color: #fff;\n        z-index: 9999;\n        overflow: hidden;\n        box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.1), -1px 10px 10px rgba(0, 0, 0, 0.06);\n        border-radius: 4px;\n    }\n\n    #LearningEnglish2023,#LearningEnglish2023 textarea {\n      \n    }\n\n    #LearningEnglish2023 .openAIAnswer {\n        line-height: 30px;\n    }\n\n    #LearningEnglish2023 .userInput {\n        margin: 10px 0;\n    }\n\n    #LearningEnglish2023 .contentBox {\n        padding: 20px;\n        overflow: scroll;\n    }\n\n    #LearningEnglish2023 #ScouterNav {\n        display: flex;\n        justify-content: start;\n        align-items: center;\n        padding: 10px 19px;\n        border-bottom: 1px solid rgba(5, 5, 5, .06);\n        font-weight: bold;\n    }\n\n    #LearningEnglish2023 #ScouterNav img {\n        width: auto;\n        height: 24px;\n        margin-right: 6px;\n    }\n\n    #LearningEnglish2023 #ScouterSelection span {\n        background-color: rgba(0, 0, 0, .04);\n        /* border: 1px solid #d9d9d9; */\n        padding: 4px 8px;\n        border-radius: 2px;\n    }\n\n    #LearningEnglish2023 #ScouterSelection {\n        margin-bottom: 14px;\n    }\n  ",t.appendChild(u),function(e,n){console.log("showPopupCard:"),console.log(e),i.default.render(a.default.createElement(a.default.StrictMode,null,a.default.createElement(l.PopupCard,{selection:e})),n)}(window.getSelection(),n),document.onclick=function(n){var t;null!=e&&(e===n.target||e.contains(n.target)||(console.log("点击窗口外区域"),e.style.display="none",null===(t=e.parentNode)||void 0===t||t.removeChild(e)))}}}))},123:(e,n,t)=>{t.r(n),t.d(n,{default:()=>o});const o="data:image/png;base64,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"}},r={};function a(e){var n=r[e];if(void 0!==n)return n.exports;var t=r[e]={id:e,exports:{}};return o[e].call(t.exports,t,t.exports,a),t.exports}a.m=o,e=[],a.O=(n,t,o,r)=>{if(!t){var i=1/0;for(c=0;c<e.length;c++){for(var[t,o,r]=e[c],l=!0,s=0;s<t.length;s++)(!1&r||i>=r)&&Object.keys(a.O).every((e=>a.O[e](t[s])))?t.splice(s--,1):(l=!1,r<i&&(i=r));if(l){e.splice(c--,1);var u=o();void 0!==u&&(n=u)}}return n}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[t,o,r]},a.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return a.d(n,{a:n}),n},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var r=Object.create(null);a.r(r);var i={};n=n||[null,t({}),t([]),t(t)];for(var l=2&o&&e;"object"==typeof l&&!~n.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((n=>i[n]=()=>e[n]));return i.default=()=>e,a.d(r,i),r},a.d=(e,n)=>{for(var t in n)a.o(n,t)&&!a.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.j=828,a.p="/",(()=>{a.b=document.baseURI||self.location.href;var e={828:0};a.O.j=n=>0===e[n];var n=(n,t)=>{var o,r,[i,l,s]=t,u=0;if(i.some((n=>0!==e[n]))){for(o in l)a.o(l,o)&&(a.m[o]=l[o]);if(s)var c=s(a)}for(n&&n(t);u<i.length;u++)r=i[u],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(c)},t=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})(),a.nc=void 0;var i=a.O(void 0,[736],(()=>a(777)));i=a.O(i)})();