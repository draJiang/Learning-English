(()=>{"use strict";var e,t,l,a={43366:function(e,t,l){var a=this&&this.__createBinding||(Object.create?function(e,t,l,a){void 0===a&&(a=l);var n=Object.getOwnPropertyDescriptor(t,l);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(e,a,n)}:function(e,t,l,a){void 0===a&&(a=l),e[a]=t[l]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)"default"!==l&&Object.prototype.hasOwnProperty.call(e,l)&&a(t,e,l);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(l(67294)),i=l(21838),c=l(60112),s=l(24697);t.default=({settings:e,saveOptions:t})=>{const[l]=i.Form.useForm(),{Option:a}=i.Select,[n,r]=(0,o.useState)("myOwnOpenAiKey");(0,o.useEffect)((()=>{e&&(r(e.apiKeySelection),l.setFieldsValue({apiKeySelection:e.apiKeySelection,openApiKey:e.openApiKey,openApiEndpoint:e.openApiEndpoint,licenseKey:e.licenseKey,chatGPTWeb:e.chatGPTWeb,model:e.model,freeModel:e.freeModel,newLicenseKey:e.newLicenseKey,ollamaApiEndpoint:e.ollamaApiEndpoint,ollamaModel:e.ollamaModel}))}),[e]);const u=(0,s.useDebouncedCallback)((e=>{console.log(e),t(e)}),300);return o.default.createElement(i.Form,{onValuesChange:u,form:l,layout:"horizontal"},o.default.createElement("section",null,o.default.createElement(i.Form.Item,{name:"apiKeySelection",label:"🔋In use"},o.default.createElement(i.Radio.Group,{onChange:e=>{r(e.target.value)},value:n,size:"small",style:{marginBottom:0,display:"flex"}},o.default.createElement(i.Radio.Button,{value:"scouterFreeAI",style:{flex:"1",textAlign:"center"}},"Scouter"),o.default.createElement(i.Radio.Button,{value:"myOwnOpenAiKey",style:{flex:"1",textAlign:"center"}},"OpenAI"),o.default.createElement(i.Radio.Button,{value:"ollama",style:{flex:"1",textAlign:"center"}},"Ollama"),o.default.createElement(i.Radio.Button,{value:"licenseKey",style:{flex:"1",textAlign:"center"}},"OpenRouter"))),o.default.createElement("div",{style:{display:"scouterFreeAI"===n?"block":"none"}},o.default.createElement(i.Form.Item,{name:"freeModel",label:"🤖Model",initialValue:c.freeModels[0].name},o.default.createElement(i.Select,{placeholder:""},c.freeModels.map((e=>o.default.createElement(a,{key:e.id,value:e.id},e.name)))))),o.default.createElement("div",{style:{display:"myOwnOpenAiKey"===n?"block":"none"}},o.default.createElement(i.Form.Item,{name:"openApiEndpoint",label:"🔗API Endpoint",extra:o.default.createElement("p",{style:{color:"#666"}},"If you are using ",o.default.createElement("strong",null,"Azure")," or a third-party endpoint, please fill in the endpoint address. ",o.default.createElement("a",{target:"__blank",href:"https://jiangzilong.notion.site/Set-up-your-API-Key-96266d5236fa462ca707683d9bb275c6?pvs=4"},"Learn More↗️"))},o.default.createElement(i.Input,{placeholder:"https://api.openai.com",type:"url"})),o.default.createElement(i.Form.Item,{name:"openApiKey",label:"🔑Your Open API Key"},o.default.createElement(i.Input,{placeholder:"We will not use your Key for any other purposes.",type:"password"}))),o.default.createElement("div",{style:{display:"ollama"===n?"block":"none"}},o.default.createElement(i.Form.Item,{name:"ollamaApiEndpoint",label:"🔗API Endpoint"},o.default.createElement(i.Input,{placeholder:"http://localhost:11434",type:"url"})),o.default.createElement(i.Form.Item,{name:"ollamaModel",label:"🤖Model",extra:o.default.createElement("p",{style:{color:"#666"}}," ",o.default.createElement("a",{target:"__blank",href:"https://jiangzilong.notion.site/How-to-use-Ollama-f8ff0d71198945b883e71e08f09cc9f5?pvs=4"},"Learn More↗️"))},o.default.createElement(i.Input,{placeholder:"llama2",type:"text"}))),o.default.createElement("div",{style:{display:"licenseKey"===n?"block":"none"}},o.default.createElement(i.Form.Item,{name:"licenseKey",label:"🔑Key",style:{marginBottom:"16px"}},o.default.createElement(i.Input,{placeholder:"We will not use your Key for any other purposes.",type:"password"})),o.default.createElement(i.Form.Item,{name:"model",label:"🤖Model",initialValue:c.models[0].name},o.default.createElement(i.Select,{placeholder:""},c.models.map((e=>o.default.createElement(a,{key:e.id,value:e.id},e.name)))))),o.default.createElement("div",{className:" text-center",style:{display:"chatGPTWeb"===n?"block":"none",color:"#F08A24"}},"⚠️Sorry, this feature is temporarily unavailable.")))}},86059:function(e,t,l){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(l(93150)),r=a(l(67294));t.default=()=>r.default.createElement("header",{className:"w-full p-8 flex items-center"},r.default.createElement("div",{className:"flex items-center flex-auto"},r.default.createElement("div",{className:"flex items-center mr-2"},r.default.createElement("img",{className:"w-5 h-5 mr-2",src:"icon128.png"}),r.default.createElement("h1",{className:"text-xl text-gray-800"},"Scouter")),r.default.createElement("a",{className:"text-gray-500 text-sm pt-1",target:"_blank",href:"https://jiangzilong.notion.site/Version-Change-log-79ae9243bafb48dab3160f10ed90f584?pvs=4"},n.default.runtime.getManifest().version)),r.default.createElement("div",{className:"flex flex-row items-center"},r.default.createElement("a",{className:"text-gray-800  text-sm mr-4 flex flex-row items-center",target:"_blank",href:"https://jiangzilong.notion.site/3dc5b8da86b6451296fc326c340ce6ba?v=c40102b71c3b48888ca7f37525f6a330&pvs=4"},r.default.createElement("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{d:"M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H7.5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z",fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd"})),"Wiki"),r.default.createElement("a",{className:"text-gray-800 text-sm mr-4 flex flex-row items-center",target:"_blank",href:"https://discord.gg/wMaMmH7MMK"},r.default.createElement("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.07451 1.82584C5.03267 1.81926 4.99014 1.81825 4.94803 1.82284C4.10683 1.91446 2.82673 2.36828 2.07115 2.77808C2.02106 2.80525 1.97621 2.84112 1.93869 2.88402C1.62502 3.24266 1.34046 3.82836 1.11706 4.38186C0.887447 4.95076 0.697293 5.55032 0.588937 5.98354C0.236232 7.39369 0.042502 9.08728 0.0174948 10.6925C0.0162429 10.7729 0.0351883 10.8523 0.0725931 10.9234C0.373679 11.496 1.02015 12.027 1.66809 12.4152C2.32332 12.8078 3.08732 13.1182 3.70385 13.1778C3.85335 13.1922 4.00098 13.1358 4.10282 13.0255C4.2572 12.8581 4.5193 12.4676 4.71745 12.1643C4.80739 12.0267 4.89157 11.8953 4.95845 11.7901C5.62023 11.9106 6.45043 11.9801 7.50002 11.9801C8.54844 11.9801 9.37796 11.9107 10.0394 11.7905C10.1062 11.8957 10.1903 12.0269 10.2801 12.1643C10.4783 12.4676 10.7404 12.8581 10.8947 13.0255C10.9966 13.1358 11.1442 13.1922 11.2937 13.1778C11.9102 13.1182 12.6742 12.8078 13.3295 12.4152C13.9774 12.027 14.6239 11.496 14.925 10.9234C14.9624 10.8523 14.9813 10.7729 14.9801 10.6925C14.9551 9.08728 14.7613 7.39369 14.4086 5.98354C14.3003 5.55032 14.1101 4.95076 13.8805 4.38186C13.6571 3.82836 13.3725 3.24266 13.0589 2.88402C13.0214 2.84112 12.9765 2.80525 12.9264 2.77808C12.1708 2.36828 10.8907 1.91446 10.0495 1.82284C10.0074 1.81825 9.96489 1.81926 9.92305 1.82584C9.71676 1.85825 9.5391 1.96458 9.40809 2.06355C9.26977 2.16804 9.1413 2.29668 9.0304 2.42682C8.86968 2.61544 8.71437 2.84488 8.61428 3.06225C8.27237 3.03501 7.90138 3.02 7.5 3.02C7.0977 3.02 6.72593 3.03508 6.38337 3.06244C6.28328 2.84501 6.12792 2.61549 5.96716 2.42682C5.85626 2.29668 5.72778 2.16804 5.58947 2.06355C5.45846 1.96458 5.2808 1.85825 5.07451 1.82584ZM11.0181 11.5382C11.0395 11.5713 11.0615 11.6051 11.0838 11.6392C11.2169 11.843 11.3487 12.0385 11.4508 12.1809C11.8475 12.0916 12.352 11.8818 12.8361 11.5917C13.3795 11.2661 13.8098 10.8918 14.0177 10.5739C13.9852 9.06758 13.7993 7.50369 13.4773 6.21648C13.38 5.82759 13.2038 5.27021 12.9903 4.74117C12.7893 4.24326 12.5753 3.82162 12.388 3.5792C11.7376 3.24219 10.7129 2.88582 10.0454 2.78987C10.0308 2.79839 10.0113 2.81102 9.98675 2.82955C9.91863 2.881 9.84018 2.95666 9.76111 3.04945C9.71959 3.09817 9.68166 3.1471 9.64768 3.19449C9.953 3.25031 10.2253 3.3171 10.4662 3.39123C11.1499 3.6016 11.6428 3.89039 11.884 4.212C12.0431 4.42408 12.0001 4.72494 11.788 4.884C11.5759 5.04306 11.2751 5.00008 11.116 4.788C11.0572 4.70961 10.8001 4.4984 10.1838 4.30877C9.58933 4.12585 8.71356 3.98 7.5 3.98C6.28644 3.98 5.41067 4.12585 4.81616 4.30877C4.19988 4.4984 3.94279 4.70961 3.884 4.788C3.72494 5.00008 3.42408 5.04306 3.212 4.884C2.99992 4.72494 2.95694 4.42408 3.116 4.212C3.35721 3.89039 3.85011 3.6016 4.53383 3.39123C4.77418 3.31727 5.04571 3.25062 5.35016 3.19488C5.31611 3.14738 5.27808 3.09831 5.23645 3.04945C5.15738 2.95666 5.07893 2.881 5.01081 2.82955C4.98628 2.81102 4.96674 2.79839 4.95217 2.78987C4.28464 2.88582 3.25999 3.24219 2.60954 3.5792C2.42226 3.82162 2.20825 4.24326 2.00729 4.74117C1.79376 5.27021 1.61752 5.82759 1.52025 6.21648C1.19829 7.50369 1.01236 9.06758 0.97986 10.5739C1.18772 10.8918 1.61807 11.2661 2.16148 11.5917C2.64557 11.8818 3.15003 12.0916 3.5468 12.1809C3.64885 12.0385 3.78065 11.843 3.9138 11.6392C3.93626 11.6048 3.95838 11.5708 3.97996 11.5375C3.19521 11.2591 2.77361 10.8758 2.50064 10.4664C2.35359 10.2458 2.4132 9.94778 2.63377 9.80074C2.85435 9.65369 3.15236 9.71329 3.29941 9.93387C3.56077 10.3259 4.24355 11.0201 7.50002 11.0201C10.7565 11.0201 11.4392 10.326 11.7006 9.93386C11.8477 9.71329 12.1457 9.65369 12.3663 9.80074C12.5869 9.94779 12.6465 10.2458 12.4994 10.4664C12.2262 10.8762 11.8041 11.2598 11.0181 11.5382ZM4.08049 7.01221C4.32412 6.74984 4.65476 6.60162 5.00007 6.59998C5.34538 6.60162 5.67603 6.74984 5.91966 7.01221C6.16329 7.27459 6.30007 7.62974 6.30007 7.99998C6.30007 8.37021 6.16329 8.72536 5.91966 8.98774C5.67603 9.25011 5.34538 9.39833 5.00007 9.39998C4.65476 9.39833 4.32412 9.25011 4.08049 8.98774C3.83685 8.72536 3.70007 8.37021 3.70007 7.99998C3.70007 7.62974 3.83685 7.27459 4.08049 7.01221ZM9.99885 6.59998C9.65354 6.60162 9.3229 6.74984 9.07926 7.01221C8.83563 7.27459 8.69885 7.62974 8.69885 7.99998C8.69885 8.37021 8.83563 8.72536 9.07926 8.98774C9.3229 9.25011 9.65354 9.39833 9.99885 9.39998C10.3442 9.39833 10.6748 9.25011 10.9184 8.98774C11.1621 8.72536 11.2989 8.37021 11.2989 7.99998C11.2989 7.62974 11.1621 7.27459 10.9184 7.01221C10.6748 6.74984 10.3442 6.60162 9.99885 6.59998Z",fill:"currentColor"})),"Discord"),r.default.createElement("a",{className:"text-gray-800 text-sm mr-4 flex flex-row items-center",target:"_blank",href:"https://chromewebstore.google.com/detail/scouter/mncfcjnabpfoagocanfjglfcpmmnkicb"},r.default.createElement("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.default.createElement("path",{d:"M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z",fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd"})),"Evaluation")))},43953:function(e,t,l){var a=this&&this.__createBinding||(Object.create?function(e,t,l,a){void 0===a&&(a=l);var n=Object.getOwnPropertyDescriptor(t,l);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(e,a,n)}:function(e,t,l,a){void 0===a&&(a=l),e[a]=t[l]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)"default"!==l&&Object.prototype.hasOwnProperty.call(e,l)&&a(t,e,l);return n(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(l(67294)),c=l(21838),s=l(7704),u=l(80974),d=l(3820),f=l(24697),m=o(l(39883));t.default=({settings:e,saveOptions:t})=>{const[l]=c.Form.useForm(),a=(0,d.useUserInfoContext)(),[n,r]=(0,i.useState)(!1);(0,i.useEffect)((()=>{e&&l.setFieldsValue({newLicenseKey:e.newLicenseKey})}),[e]),(0,i.useEffect)((()=>{(null==a?void 0:a.user.verified)&&(0,m.default)({particleCount:140,spread:170,origin:{y:.4}})}),[null==a?void 0:a.user.verified]);const o=(0,f.useDebouncedCallback)((e=>{t(e)}),300);return i.default.createElement("div",null,i.default.createElement(c.Form,{form:l,onValuesChange:o,labelCol:{span:4},layout:"horizontal"},i.default.createElement(c.Form.Item,{name:"newLicenseKey",style:{}},i.default.createElement(c.Input,{style:{paddingLeft:"5px"},prefix:i.default.createElement("span",{style:{marginRight:"4px"}}," ",i.default.createElement(u.ProTag,null)),suffix:(null==a?void 0:a.user.verified)&&i.default.createElement(s.CheckCircleTwoTone,{twoToneColor:"#52c41a"}),placeholder:"License Key",type:"password"}))),i.default.createElement("section",{className:"bg-white "},i.default.createElement("div",{className:"py-8 px-4 mx-auto max-w-screen-xl lg:py-9 lg:px-6"},i.default.createElement("div",{className:"mx-auto max-w-screen-md text-center mb-8 lg:mb-12"},i.default.createElement("h2",{className:"mb-4 text-4xl tracking-tight font-extrabold text-gray-900 "},"Bridging the gap between theory and practice")),i.default.createElement("div",{className:"flex flex-row justify-center"},i.default.createElement("div",{className:"flex flex-col p-6 mx-4 min-w-72 max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow  xl:p-8 "},i.default.createElement("div",{className:"flex flex-col gap-3 mb-8"},i.default.createElement("h3",{className:"text-2xl font-semibold"},"Starter"),i.default.createElement("p",{className:"font-light text-gray-500 sm:text-lg "},"/"),i.default.createElement("div",{className:"flex justify-center items-baseline"},i.default.createElement("span",{className:"mr-2 text-5xl font-extrabold"},"$0"))),i.default.createElement("ul",{role:"list",className:"mb-8 space-y-4 text-left"},i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"AI")),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"Online dictionary")),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"Add to Anki")),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-gray-500 ",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd"})),i.default.createElement("span",null,"Learning in YouTube")),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-gray-500 ",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd"})),i.default.createElement("span",null,"Search images")),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-gray-500 ",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{d:"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd"})),i.default.createElement("span",null,"Append query")))),i.default.createElement("div",{className:"flex flex-col p-6 mx-4 min-w-72 max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow  xl:p-8 "},i.default.createElement("div",{className:"flex flex-col gap-3 mb-8"},i.default.createElement("h3",{className:"text-2xl font-semibold"},"Pro"),i.default.createElement("p",{className:"font-light text-gray-500 sm:text-lg "},"One-time"),i.default.createElement("div",{className:"flex justify-center items-baseline"},i.default.createElement("span",{className:"mr-2 text-5xl font-extrabold"},"$5"))),i.default.createElement("ul",{role:"list",className:"mb-8 space-y-4 text-left"},i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"AI")),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"Online dictionary")),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"Add to Anki")),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"Learning in YouTube"),i.default.createElement("a",{target:"_blank",href:"https://jiangzilong.notion.site/Learning-in-YouTube-YouTube-1d61fd50815a42a5af394db4a695c712?pvs=4"},i.default.createElement("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{d:"M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})))),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"Search images"),i.default.createElement("a",{target:"_blank",href:"https://jiangzilong.notion.site/Search-images-396d245dece948ff803b9e51f56bb38f?pvs=4"},i.default.createElement("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{d:"M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})))),i.default.createElement("li",{className:"flex items-center space-x-3"},i.default.createElement("svg",{className:"flex-shrink-0 w-5 h-5 text-green-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{"fill-rule":"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z","clip-rule":"evenodd"})),i.default.createElement("span",null,"Append query"),i.default.createElement("a",{target:"_blank",href:"https://jiangzilong.notion.site/Follow-up-question-c321072e9cbc4bcfb51843647aa72045?pvs=4"},i.default.createElement("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i.default.createElement("path",{d:"M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))))),i.default.createElement("a",{href:"#",onClick:()=>{window.open("https://jiang.lemonsqueezy.com/checkout/buy/e31f8c18-7bf2-4f6b-85c2-508fb500ce84")},className:"text-white hover:text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "},"Get started"),i.default.createElement(i.default.Fragment,null,i.default.createElement("a",{href:"#",onClick:()=>{r(!0)},className:" mt-2 hover:text-orange-500 text-orange-400  focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "},"微信支付"),i.default.createElement(c.Modal,{title:"WeChatPay",open:n,onCancel:()=>{r(!1)},footer:null,maskClosable:!0},i.default.createElement("div",{className:"flex flex-col justify-center items-center gap-3"},i.default.createElement("p",null,"请在付款时备注你的邮箱，激活码将发送至邮箱中"),i.default.createElement("img",{width:240,src:"images/WeChatPay.png"}),i.default.createElement("p",null,"我们会尽快发送激活码，若未收到可联系 ",i.default.createElement("a",{className:"text-orange-400",href:"mailto:jzlong666@gmail.com?subject=请发送 Scouter 激活码"},"jzlong666@gmail.com"))))))))))}},2240:function(e,t,l){var a=this&&this.__createBinding||(Object.create?function(e,t,l,a){void 0===a&&(a=l);var n=Object.getOwnPropertyDescriptor(t,l);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(e,a,n)}:function(e,t,l,a){void 0===a&&(a=l),e[a]=t[l]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)"default"!==l&&Object.prototype.hasOwnProperty.call(e,l)&&a(t,e,l);return n(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const o=r(l(67294)),i=l(21838),c=l(24697);t.default=({settings:e,saveOptions:t})=>{const[l]=i.Form.useForm();(0,o.useEffect)((()=>{console.log(e),e&&l.setFieldsValue({showYoutubeButton:e.showYoutubeButton})}),[e]);const a=(0,c.useDebouncedCallback)((e=>{t(e)}),300);return o.default.createElement(i.Form,{onValuesChange:a,form:l,labelCol:{span:4},layout:"horizontal"},o.default.createElement("section",null,o.default.createElement(i.Form.Item,{name:"showYoutubeButton",valuePropName:"checked",label:"📺 YouTube shortcut",extra:o.default.createElement("div",null,o.default.createElement("img",{className:" w-full py-2 max-w-2xl",src:"images/youtube.png"}))},o.default.createElement(i.Switch,null))))}},5595:function(e,t,l){var a=this&&this.__createBinding||(Object.create?function(e,t,l,a){void 0===a&&(a=l);var n=Object.getOwnPropertyDescriptor(t,l);n&&!("get"in n?!t.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return t[l]}}),Object.defineProperty(e,a,n)}:function(e,t,l,a){void 0===a&&(a=l),e[a]=t[l]}),n=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)"default"!==l&&Object.prototype.hasOwnProperty.call(e,l)&&a(t,e,l);return n(t,e),t},o=this&&this.__awaiter||function(e,t,l,a){return new(l||(l=Promise))((function(n,r){function o(e){try{c(a.next(e))}catch(e){r(e)}}function i(e){try{c(a.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof l?t:new l((function(e){e(t)}))).then(o,i)}c((a=a.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Options=void 0;const c=r(l(67294)),s=i(l(73935)),u=r(l(89852)),d=i(l(83972)),f=i(l(43366)),m=i(l(43953)),p=i(l(86059)),g=i(l(2240)),h=l(5990),C=l(21838),v=l(29882),x=l(62569),w=l(3820);l(51149),l(44722),t.Options=()=>{const[e,t]=(0,c.useState)({userId:"",verified:!1,contextMenu:!1,showYoutubeButton:!0}),[l,a]=(0,c.useState)(),n=(0,c.useRef)(null),r=[{name:"General",content:c.default.createElement(d.default,{settings:l,saveOptions:s})},{name:"AI",content:c.default.createElement(f.default,{settings:l,saveOptions:s})},{name:"YouTube",content:c.default.createElement(g.default,{settings:l,saveOptions:s})},{name:"⚡Pro",content:c.default.createElement(m.default,{settings:l,saveOptions:s})}],i=()=>new Promise(((e,t)=>{(0,v.getUserInfo)().then((t=>{e(t)}))}));function s(e){return o(this,void 0,void 0,(function*(){(0,x.saveOptions)(e);const l=Object.entries(e);for(const[e,a]of l)if("newLicenseKey"===e){const e=yield i();t(e)}}))}return(0,c.useEffect)((()=>{o(void 0,void 0,void 0,(function*(){const e=yield(0,x.getSettings)();a(e);const l=yield i();t(l);const n=l.userId;u.init("ed720e33b4190ef29a0718a040bbb55a",n,{defaultTracking:{pageViews:!1,sessions:!1}}),u.track("openOptions")}))}),[]),c.default.createElement(w.UserInfoContext.Provider,{value:{user:e,anki:null}},c.default.createElement("div",{className:"flex flex-col items-center h-screen"},c.default.createElement(p.default,null),c.default.createElement("div",{id:"MyOptions",ref:n,className:" flex-1"},c.default.createElement(C.ConfigProvider,{theme:{token:{colorPrimary:"#F08A24",colorLink:"#F08A24",colorLinkHover:"#ffc478",colorLinkActive:"#c96914"}}},c.default.createElement(C.Tabs,{className:"w-full h-full grow",tabPosition:"left",items:r.map(((e,t)=>{const l=String(t+1);return{label:e.name,key:l,children:e.content}}))})))))},s.default.render(c.default.createElement(c.default.StrictMode,null,c.default.createElement(h.StyleProvider,null,c.default.createElement(t.Options,null))),document.getElementById("root"))}},n={};function r(e){var t=n[e];if(void 0!==t)return t.exports;var l=n[e]={id:e,exports:{}};return a[e].call(l.exports,l,l.exports,r),l.exports}r.m=a,e=[],r.O=(t,l,a,n)=>{if(!l){var o=1/0;for(u=0;u<e.length;u++){for(var[l,a,n]=e[u],i=!0,c=0;c<l.length;c++)(!1&n||o>=n)&&Object.keys(r.O).every((e=>r.O[e](l[c])))?l.splice(c--,1):(i=!1,n<o&&(o=n));if(i){e.splice(u--,1);var s=a();void 0!==s&&(t=s)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[l,a,n]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},l=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var n=Object.create(null);r.r(n);var o={};t=t||[null,l({}),l([]),l(l)];for(var i=2&a&&e;"object"==typeof i&&!~t.indexOf(i);i=l(i))Object.getOwnPropertyNames(i).forEach((t=>o[t]=()=>e[t]));return o.default=()=>e,r.d(n,o),n},r.d=(e,t)=>{for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.j=798,(()=>{var e={798:0};r.O.j=t=>0===e[t];var t=(t,l)=>{var a,n,[o,i,c]=l,s=0;if(o.some((t=>0!==e[t]))){for(a in i)r.o(i,a)&&(r.m[a]=i[a]);if(c)var u=c(r)}for(t&&t(l);s<o.length;s++)n=o[s],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(u)},l=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})(),r.nc=void 0;var o=r.O(void 0,[736],(()=>r(5595)));o=r.O(o)})();