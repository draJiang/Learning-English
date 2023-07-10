(()=>{"use strict";var e,t,n,a={5595:function(e,t,n){var a=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n);var l=Object.getOwnPropertyDescriptor(t,n);l&&!("get"in l?!t.__esModule:l.writable||l.configurable)||(l={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,a,l)}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return l(t,e),t},r=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(l,o){function r(e){try{i(a.next(e))}catch(e){o(e)}}function u(e){try{i(a.throw(e))}catch(e){o(e)}}function i(e){var t;e.done?l(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,u)}i((a=a.apply(e,t||[])).next())}))},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Options=void 0;const i=u(n(93150)),c=o(n(67294)),f=n(29882),s=n(21838);n(51149);const d=u(n(92607)),m=n(71214);t.Options=()=>{const[e,t]=(0,c.useState)(null),[n,a]=(0,c.useState)(""),[l,o]=(0,c.useState)(["Default"]),[u,p]=(0,c.useState)(!0),[g]=s.Form.useForm(),{Option:y}=s.Select;return console.log(Object.keys(m.lang)),(0,c.useEffect)((()=>{console.log("options useEffect:");let e="";(function(){return r(this,void 0,void 0,(function*(){return yield i.default.storage.sync.get(["openApiKey","unsplashApiKey","currentLanguage","targetLanguage","ankiDeckName"])}))})().then((t=>r(void 0,void 0,void 0,(function*(){console.log(t),console.log(t.ankiDeckName),yield(0,f.getDefaultDeckName)().then((t=>{e=t.defaultDeckName})),g.setFieldsValue({openApiKey:t.openApiKey,unsplashApiKey:t.unsplashApiKey,currentLanguage:t.currentLanguage,targetLanguage:t.targetLanguage,ankiDeckName:e})}))))}),[l.join("")]),(0,c.useEffect)((()=>{(0,f.ankiAction)("deckNames",6).then((e=>{console.log(e),o(e.result)})).catch((e=>{p(!1)}))}),[l.join(""),u]),c.default.createElement(c.default.Fragment,null,c.default.createElement("div",{id:"MyOptions"},c.default.createElement(s.ConfigProvider,{theme:{token:{colorPrimary:"#F08A24"}}},c.default.createElement(s.Form,{onFinish:function(e){return r(this,void 0,void 0,(function*(){console.log("Options save"),console.log(e),yield i.default.storage.sync.set({openApiKey:e.openApiKey,unsplashApiKey:e.unsplashApiKey,currentLanguage:e.currentLanguage,targetLanguage:e.targetLanguage,ankiDeckName:e.ankiDeckName}).then((e=>{console.log(e),console.log("browser"),a(" ✅ Saved"),setTimeout((()=>{a("")}),2e3)}))}))},layout:"vertical",form:g},c.default.createElement(s.Form.Item,{name:"openApiKey",label:"Your Open API Key"},c.default.createElement(s.Input,{placeholder:"We will not use your Key for any other purposes.",type:"password"})),c.default.createElement(s.Form.Item,{name:"currentLanguage",label:"Current Language"},c.default.createElement(s.Select,{placeholder:"What language do you use?"},Object.keys(m.lang).map((e=>c.default.createElement(y,{key:e,value:e},e))))),c.default.createElement(s.Form.Item,{name:"targetLanguage",label:"What language do you want to learn"},c.default.createElement(s.Select,{placeholder:"What do you want to learn"},Object.keys(m.lang).map((e=>c.default.createElement(y,{key:e,value:e},e))))),c.default.createElement(s.Form.Item,{name:"ankiDeckName",label:"Anki Deck Name",extra:!u&&c.default.createElement("p",{style:{color:"#666"}},"Anki client and related settings not found. Please ",c.default.createElement("a",{target:"__blank",href:"https://jiangzilong.notion.site/Use-the-Add-to-Anki-feature-7ab95ff8aa5e419c978e8a2a0a451324"},"configure")," and try again")},c.default.createElement(s.Select,{placeholder:"Anki Deck Name",disabled:!u},l.map((e=>c.default.createElement(y,{key:e,value:e},e))))),c.default.createElement(s.Form.Item,{style:{margin:"0"}},c.default.createElement(s.Button,{type:"primary",htmlType:"submit"},"Save"),c.default.createElement("span",null,n))),c.default.createElement(s.Divider,null),c.default.createElement("div",{className:"instructions"},c.default.createElement("h2",null,"Usage"),c.default.createElement("ul",{style:{marginBottom:"14px"}},c.default.createElement("li",null,c.default.createElement("p",null,"Set up your API Key"),c.default.createElement("p",null,c.default.createElement("a",{target:"_blank",href:"https://platform.openai.com/account/api-keys"},"Get Open API Key"))),c.default.createElement("li",null,c.default.createElement("p",null,"Select text, then right-click and choose Scouter."),c.default.createElement("img",{src:d.default}))),c.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"left",width:"100%"}},c.default.createElement(s.Button,{style:{width:"300px",marginBottom:"14px"},onClick:()=>window.open("https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330")},"🌳 Find all Wiki"),c.default.createElement(s.Button,{style:{width:"300px",marginBottom:"14px"},onClick:()=>window.open("https://discord.com/invite/7Pm3vmz87n")},"💬 Join our Discord community"),c.default.createElement(s.Button,{style:{width:"300px"},onClick:()=>window.open("https://www.buymeacoffee.com/jiangzilong")},"☕ Buy me a coffee"))))))}},51548:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=a(n(67294)),o=a(n(73935)),r=n(5595);o.default.render(l.default.createElement(l.default.StrictMode,null,l.default.createElement(r.Options,null)),document.getElementById("root"))}},l={};function o(e){var t=l[e];if(void 0!==t)return t.exports;var n=l[e]={id:e,exports:{}};return a[e].call(n.exports,n,n.exports,o),n.exports}o.m=a,e=[],o.O=(t,n,a,l)=>{if(!n){var r=1/0;for(f=0;f<e.length;f++){for(var[n,a,l]=e[f],u=!0,i=0;i<n.length;i++)(!1&l||r>=l)&&Object.keys(o.O).every((e=>o.O[e](n[i])))?n.splice(i--,1):(u=!1,l<r&&(r=l));if(u){e.splice(f--,1);var c=a();void 0!==c&&(t=c)}}return t}l=l||0;for(var f=e.length;f>0&&e[f-1][2]>l;f--)e[f]=e[f-1];e[f]=[n,a,l]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var l=Object.create(null);o.r(l);var r={};t=t||[null,n({}),n([]),n(n)];for(var u=2&a&&e;"object"==typeof u&&!~t.indexOf(u);u=n(u))Object.getOwnPropertyNames(u).forEach((t=>r[t]=()=>e[t]));return r.default=()=>e,o.d(l,r),l},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j=42,o.p="/",(()=>{o.b=document.baseURI||self.location.href;var e={42:0,798:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var a,l,[r,u,i]=n,c=0;if(r.some((t=>0!==e[t]))){for(a in u)o.o(u,a)&&(o.m[a]=u[a]);if(i)var f=i(o)}for(t&&t(n);c<r.length;c++)l=r[c],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(f)},n=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),o.nc=void 0;var r=o.O(void 0,[736],(()=>o(51548)));r=o.O(r)})();