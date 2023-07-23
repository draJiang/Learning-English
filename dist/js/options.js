(()=>{"use strict";var e,t,n,a={5595:function(e,t,n){var a=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,a,o)}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return o(t,e),t},l=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(o,r){function l(e){try{u(a.next(e))}catch(e){r(e)}}function i(e){try{u(a.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,i)}u((a=a.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Options=void 0;const u=i(n(93150)),c=r(n(67294)),s=n(29882),d=n(21838);n(51149);const f=n(71214),p=f.lang;t.Options=()=>{const[e,t]=(0,c.useState)(null),[n,a]=(0,c.useState)(""),[o,r]=(0,c.useState)(["Default"]),[i,m]=(0,c.useState)(!0),[g]=d.Form.useForm(),{Option:y}=d.Select;return console.log(Object.keys(f.lang)),(0,c.useEffect)((()=>{console.log("options useEffect:");let e="";(function(){return l(this,void 0,void 0,(function*(){return yield u.default.storage.sync.get(["openApiKey","openApiEndpoint","unsplashApiKey","currentLanguage","targetLanguage","ankiDeckName"])}))})().then((t=>l(void 0,void 0,void 0,(function*(){console.log(t),console.log(t.ankiDeckName),yield(0,s.getDefaultDeckName)().then((t=>{e=t.defaultDeckName})),g.setFieldsValue({openApiKey:t.openApiKey,openApiEndpoint:t.openApiEndpoint,unsplashApiKey:t.unsplashApiKey,currentLanguage:t.currentLanguage,targetLanguage:t.targetLanguage,ankiDeckName:e})}))))}),[o.join("")]),(0,c.useEffect)((()=>{(0,s.ankiAction)("deckNames",6).then((e=>{console.log(e),r(e.result)})).catch((e=>{m(!1)}))}),[o.join(""),i]),c.default.createElement(c.default.Fragment,null,c.default.createElement("div",{id:"MyOptions"},c.default.createElement(d.ConfigProvider,{theme:{token:{colorPrimary:"#F08A24"}}},c.default.createElement(d.Form,{onFinish:function(e){return l(this,void 0,void 0,(function*(){console.log("Options save"),console.log(e),yield u.default.storage.sync.set({openApiKey:e.openApiKey,openApiEndpoint:e.openApiEndpoint,unsplashApiKey:e.unsplashApiKey,currentLanguage:e.currentLanguage,targetLanguage:e.targetLanguage,ankiDeckName:e.ankiDeckName}).then((e=>{console.log(e),console.log("browser"),a(" ✅ Saved"),setTimeout((()=>{a("")}),2e3)}))}))},layout:"vertical",form:g},c.default.createElement("section",null,c.default.createElement(d.Form.Item,{name:"openApiKey",label:"🔑Your Open API Key"},c.default.createElement(d.Input,{placeholder:"We will not use your Key for any other purposes.",type:"password"})),c.default.createElement(d.Form.Item,{name:"openApiEndpoint",label:"🔗API Endpoint",extra:c.default.createElement("p",{style:{color:"#666"}},"If you use a third-party API endpoint, fill in the endpoint address. ",c.default.createElement("a",{target:"__blank",href:"https://jiangzilong.notion.site/Set-up-your-API-Key-96266d5236fa462ca707683d9bb275c6?pvs=4"},"Learn More"))},c.default.createElement(d.Input,{placeholder:"https://api.openai.com",type:"url"}))),c.default.createElement("section",null,c.default.createElement(d.Form.Item,{name:"currentLanguage",label:"💬Current Language"},c.default.createElement(d.Select,{placeholder:"What language do you use?"},Object.keys(p).map((e=>c.default.createElement(y,{key:e,value:e},p[e].name+"("+e+")"))))),c.default.createElement(d.Form.Item,{name:"targetLanguage",label:"💬What language do you want to learn"},c.default.createElement(d.Select,{placeholder:"What do you want to learn"},Object.keys(p).map((e=>c.default.createElement(y,{key:e,value:e},p[e].name+"("+e+")")))))),c.default.createElement("section",null,c.default.createElement(d.Form.Item,{name:"ankiDeckName",label:"📘Anki Deck Name",extra:!i&&c.default.createElement("p",{style:{color:"#666"}},"Anki client and related settings not found. Please ",c.default.createElement("a",{target:"__blank",href:"https://jiangzilong.notion.site/Use-the-Add-to-Anki-feature-7ab95ff8aa5e419c978e8a2a0a451324"},"configure")," and try again")},c.default.createElement(d.Select,{placeholder:"Anki Deck Name",disabled:!i},o.map((e=>c.default.createElement(y,{key:e,value:e},e)))))),c.default.createElement("section",null,c.default.createElement("div",{style:{padding:"0 0 8px"}},c.default.createElement("label",null,"⌨️Keyboard shortcut")),c.default.createElement("a",{target:"__blank",href:"https://jiangzilong.notion.site/keyboard-shortcut-94a604055ef148a3b7c835e6436543f0?pvs=4"},"Viewing and Setting Keyboard Shortcuts ↗️")),c.default.createElement(d.Form.Item,{style:{margin:"0",position:"sticky",bottom:0,padding:"10px 0",display:"flex",justifyContent:"end",backdropFilter:"blur(5px)"}},c.default.createElement("span",{style:{marginRight:"10px"}},n),c.default.createElement(d.Button,{type:"primary",htmlType:"submit"},"Save"))),c.default.createElement(d.Divider,null),c.default.createElement("div",{className:"instructions"},c.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"left",width:"100%"}},c.default.createElement(d.Button,{style:{marginBottom:"14px"},onClick:()=>window.open("https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330")},"🌳 Find all Wiki"),c.default.createElement(d.Button,{style:{marginBottom:"14px"},onClick:()=>window.open("https://discord.com/invite/7Pm3vmz87n")},"💬 Join our Discord community"),c.default.createElement(d.Button,{style:{},onClick:()=>window.open("https://www.buymeacoffee.com/jiangzilong")},"☕ Buy me a coffee"))))))}}},o={};function r(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={id:e,exports:{}};return a[e].call(n.exports,n,n.exports,r),n.exports}r.m=a,e=[],r.O=(t,n,a,o)=>{if(!n){var l=1/0;for(s=0;s<e.length;s++){for(var[n,a,o]=e[s],i=!0,u=0;u<n.length;u++)(!1&o||l>=o)&&Object.keys(r.O).every((e=>r.O[e](n[u])))?n.splice(u--,1):(i=!1,o<l&&(l=o));if(i){e.splice(s--,1);var c=a();void 0!==c&&(t=c)}}return t}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[n,a,o]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);r.r(o);var l={};t=t||[null,n({}),n([]),n(n)];for(var i=2&a&&e;"object"==typeof i&&!~t.indexOf(i);i=n(i))Object.getOwnPropertyNames(i).forEach((t=>l[t]=()=>e[t]));return l.default=()=>e,r.d(o,l),o},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.j=798,r.p="/",(()=>{r.b=document.baseURI||self.location.href;var e={798:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,o,[l,i,u]=n,c=0;if(l.some((t=>0!==e[t]))){for(a in i)r.o(i,a)&&(r.m[a]=i[a]);if(u)var s=u(r)}for(t&&t(n);c<l.length;c++)o=l[c],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(s)},n=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),r.nc=void 0;var l=r.O(void 0,[736],(()=>r(5595)));l=r.O(l)})();