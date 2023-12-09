(()=>{"use strict";var e,t,n,a={5595:function(e,t,n){var a=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n);var l=Object.getOwnPropertyDescriptor(t,n);l&&!("get"in l?!t.__esModule:l.writable||l.configurable)||(l={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,a,l)}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return l(t,e),t},r=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(l,o){function r(e){try{c(a.next(e))}catch(e){o(e)}}function i(e){try{c(a.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?l(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,i)}c((a=a.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Options=void 0;const c=i(n(3150)),u=o(n(7294)),d=o(n(9852)),s=n(9882),f=n(9285),p=n(974),m=n(1838),y=n(198),g=n(2569);n(1149);const h=n(9882),b=n(1214),v=n(112),E=b.lang;t.Options=()=>{const[e,t]=(0,u.useState)("myOwnOpenAiKey"),[n,a]=(0,u.useState)(!1),[l,o]=(0,u.useState)(!1),[i,b]=(0,u.useState)(!0),[k,O]=(0,u.useState)(""),[w,_]=(0,u.useState)(["Default"]),[K,x]=(0,u.useState)(!0),[A]=m.Form.useForm(),P=(0,u.useRef)(null),{Option:j}=m.Select;(0,u.useEffect)((()=>{S().then((e=>{const t=e.userId;d.init("ed720e33b4190ef29a0718a040bbb55a",t,{defaultTracking:{pageViews:!1,sessions:!1}}),d.track("openOptions")}));let e="";(0,g.getSettings)().then((n=>r(void 0,void 0,void 0,(function*(){console.log(n),"chatGPTWeb"===n.apiKeySelection?t("chatGPTWeb"):"myOwnOpenAiKey"===n.apiKeySelection?t("myOwnOpenAiKey"):t("licenseKey"),yield(0,s.getDefaultDeckName)().then((t=>{e=t.defaultDeckName})),A.setFieldsValue({openApiKey:n.openApiKey,apiKeySelection:n.apiKeySelection,openApiEndpoint:n.openApiEndpoint,unsplashApiKey:n.unsplashApiKey,currentLanguage:n.currentLanguage,targetLanguage:n.targetLanguage,ankiDeckName:e,licenseKey:n.licenseKey,chatGPTWeb:n.chatGPTWeb,model:n.model,newLicenseKey:n.newLicenseKey})}))))}),[]),(0,u.useEffect)((()=>{(0,s.ankiAction)("deckNames",6).then((e=>{_(e.result)})).catch((e=>{x(!1)}))}),[w.join(""),K]);const S=()=>new Promise(((e,t)=>{(0,h.getUserInfo)().then((t=>{a(t.verified),e(t)}))}));return u.default.createElement(u.default.Fragment,null,u.default.createElement("div",{id:"MyOptions",ref:P},u.default.createElement(m.ConfigProvider,{theme:{token:{colorPrimary:"#F08A24",colorLink:"#F08A24",colorLinkHover:"#ffc478",colorLinkActive:"#c96914"}}},u.default.createElement(m.Form,{onFinish:function(e){return r(this,void 0,void 0,(function*(){yield c.default.storage.sync.set({openApiKey:e.openApiKey,openApiEndpoint:e.openApiEndpoint,unsplashApiKey:e.unsplashApiKey,currentLanguage:e.currentLanguage,targetLanguage:e.targetLanguage,ankiDeckName:e.ankiDeckName,licenseKey:e.licenseKey,chatGPTWeb:e.chatGPTWeb,model:e.model,apiKeySelection:e.apiKeySelection,newLicenseKey:e.newLicenseKey}).then((e=>{O(" ✅ Saved"),setTimeout((()=>{O("")}),2e3)})),S()}))},layout:"vertical",form:A},u.default.createElement("section",{style:{border:"1px solid #ffd9a1",backgroundColor:"#fffaf0"}},u.default.createElement(m.Form.Item,{name:"newLicenseKey",style:{},extra:u.default.createElement("div",{style:{display:"flex",alignItems:"center"}},"Unlock more features",u.default.createElement(m.Button,{style:{paddingLeft:"2px",paddingRight:"0"},type:"link",onClick:()=>{window.open("https://jiang.lemonsqueezy.com/checkout/buy/e31f8c18-7bf2-4f6b-85c2-508fb500ce84")}},"Get License⚡"))},u.default.createElement(m.Input,{style:{paddingLeft:"5px"},prefix:u.default.createElement("span",{style:{marginRight:"4px"}}," ",u.default.createElement(p.ProTag,null)),suffix:n&&u.default.createElement(y.CheckCircleTwoTone,{twoToneColor:"#52c41a"}),placeholder:"License Key",type:"password"}))),u.default.createElement("section",{style:{}},u.default.createElement(m.Form.Item,{name:"apiKeySelection",label:"🔋In use"},u.default.createElement(m.Radio.Group,{onChange:e=>{t(e.target.value)},value:e,style:{marginBottom:0,display:"flex"}},u.default.createElement(m.Radio.Button,{value:"myOwnOpenAiKey",style:{flex:"1",textAlign:"center"}},"OpenAI"),u.default.createElement(m.Radio.Button,{value:"licenseKey",style:{flex:"1",textAlign:"center"}},"OpenRouter"),u.default.createElement(m.Radio.Button,{value:"chatGPTWeb",style:{flex:"1",textAlign:"center"}},"ChatGPT"))),u.default.createElement("div",{style:{display:"myOwnOpenAiKey"===e?"block":"none"}},u.default.createElement(m.Form.Item,{name:"openApiKey",label:"🔑Your Open API Key"},u.default.createElement(m.Input,{placeholder:"We will not use your Key for any other purposes.",type:"password"})),u.default.createElement(m.Form.Item,{name:"openApiEndpoint",label:"🔗API Endpoint",extra:u.default.createElement("p",{style:{color:"#666"}},"If you are using ",u.default.createElement("strong",null,"Azure")," or a third-party endpoint, please fill in the endpoint address. ",u.default.createElement("a",{target:"__blank",href:"https://jiangzilong.notion.site/Set-up-your-API-Key-96266d5236fa462ca707683d9bb275c6?pvs=4"},"Learn More↗️"))},u.default.createElement(m.Input,{placeholder:"https://api.openai.com",type:"url"}))),u.default.createElement("div",{style:{display:"licenseKey"===e?"block":"none"}},u.default.createElement(m.Form.Item,{name:"licenseKey",label:"🔑Key",style:{marginBottom:"16px"}},u.default.createElement(m.Input,{placeholder:"We will not use your Key for any other purposes.",type:"password"})),u.default.createElement(m.Form.Item,{name:"model",label:"🤖Model"},u.default.createElement(m.Select,{placeholder:"",defaultValue:v.models[0].name},v.models.map((e=>u.default.createElement(j,{key:e.id,value:e.id},e.name)))))),u.default.createElement("div",{style:{display:"chatGPTWeb"===e?"block":"none"}},"⚠️This Feature is Unstable, Use With Caution. Please Ensure that You Are Logged into ",u.default.createElement("a",{target:"__blank",href:"https://chat.openai.com/"},"ChatGPT"),".")),u.default.createElement("section",null,u.default.createElement(m.Form.Item,{name:"currentLanguage",label:"💬Native Language"},u.default.createElement(m.Select,{placeholder:"What language do you use?"},Object.keys(E).map((e=>u.default.createElement(j,{key:e,value:e},E[e].name+"("+e+")"))))),u.default.createElement(m.Form.Item,{name:"targetLanguage",label:"💬Target Language"},u.default.createElement(m.Select,{placeholder:"What do you want to learn"},Object.keys(E).map((e=>u.default.createElement(j,{key:e,value:e},E[e].name+"("+e+")")))))),u.default.createElement("section",null,u.default.createElement(m.Form.Item,{name:"ankiDeckName",label:"📘Anki Deck Name",extra:!K&&u.default.createElement("p",{style:{color:"#666"}},"Anki client and related settings not found. Please ",u.default.createElement("a",{target:"__blank",href:"https://jiangzilong.notion.site/Use-the-Add-to-Anki-feature-7ab95ff8aa5e419c978e8a2a0a451324"},"configure↗️")," and try again")},u.default.createElement(m.Select,{placeholder:"Anki Deck Name",disabled:!K},w.map((e=>u.default.createElement(j,{key:e,value:e},e)))))),u.default.createElement(m.Form.Item,{style:{margin:"0",position:"sticky",bottom:0,padding:"14px 0",display:"flex",backdropFilter:"blur(5px)",justifyContent:"end"}},u.default.createElement("span",{style:{marginRight:"10px"}},k),u.default.createElement(m.Button,{type:"primary",htmlType:"submit"},"Save"))),u.default.createElement(m.Drawer,{title:"Get License",placement:"bottom",maskClosable:!0,closable:!1,height:"80%",open:l,bodyStyle:{overscrollBehavior:"contain"},extra:u.default.createElement(m.Space,null,u.default.createElement(m.Button,{style:{zIndex:"9"},onClick:()=>{o(!1)}},"Cancel"))},u.default.createElement(f.BuyLicenseKeyDrawer,null)),u.default.createElement(m.Divider,null),u.default.createElement("div",{className:"instructions"},u.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"left",width:"100%"}},u.default.createElement(m.Button,{style:{marginBottom:"14px"},onClick:()=>window.open("https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330")},"🌳 Find all Wiki"),u.default.createElement(m.Button,{style:{marginBottom:"14px"},onClick:()=>window.open("https://discord.com/invite/7Pm3vmz87n")},"💬 Join our Discord community"),u.default.createElement(m.Button,{style:{marginBottom:"14px"},onClick:()=>window.open("mailto:jzlong666@gmail.com?subject=%5BScouter%20-%20feedback%5D&body=")},"📫 Feedback"))))))}},48:function(e,t,n){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=a(n(7294)),o=a(n(3935)),r=n(5595);o.default.render(l.default.createElement(l.default.StrictMode,null,l.default.createElement(r.Options,null)),document.getElementById("root"))}},l={};function o(e){var t=l[e];if(void 0!==t)return t.exports;var n=l[e]={id:e,exports:{}};return a[e].call(n.exports,n,n.exports,o),n.exports}o.m=a,e=[],o.O=(t,n,a,l)=>{if(!n){var r=1/0;for(d=0;d<e.length;d++){for(var[n,a,l]=e[d],i=!0,c=0;c<n.length;c++)(!1&l||r>=l)&&Object.keys(o.O).every((e=>o.O[e](n[c])))?n.splice(c--,1):(i=!1,l<r&&(r=l));if(i){e.splice(d--,1);var u=a();void 0!==u&&(t=u)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[n,a,l]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var l=Object.create(null);o.r(l);var r={};t=t||[null,n({}),n([]),n(n)];for(var i=2&a&&e;"object"==typeof i&&!~t.indexOf(i);i=n(i))Object.getOwnPropertyNames(i).forEach((t=>r[t]=()=>e[t]));return r.default=()=>e,o.d(l,r),l},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.j=42,(()=>{var e={42:0,798:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var a,l,[r,i,c]=n,u=0;if(r.some((t=>0!==e[t]))){for(a in i)o.o(i,a)&&(o.m[a]=i[a]);if(c)var d=c(o)}for(t&&t(n);u<r.length;u++)l=r[u],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(d)},n=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),o.nc=void 0;var r=o.O(void 0,[736],(()=>o(48)));r=o.O(r)})();