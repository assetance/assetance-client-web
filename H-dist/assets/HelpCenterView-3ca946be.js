import{_ as q,o as n,c as p,m as C,u as X,r as i,q as k,a as e,n as w,d as $,t as o,s as oe,F as M,g as x,l as D,w as _,p as V,e as A,v as j,x as ne,b as m,y as ue,T as W,L as re,z as Y,h as ie,j as de,A as ce,P as pe,B as H,S as G}from"./index-d8e9b970.js";const _e={},ve={class:"dropdownOption",role:"option"};function fe(t,u){return n(),p("li",ve,[C(t.$slots,"option",{},void 0,!0)])}const me=q(_e,[["render",fe],["__scopeId","data-v-08588a15"]]);const Z=t=>(V("data-v-f57cd33d"),t=t(),A(),t),he={class:"buttonsContainer"},ge=["aria-expanded"],be={class:"label"},ye=Z(()=>e("span",{class:"material-symbols-rounded"}," expand_more ",-1)),$e=Z(()=>e("span",{class:"material-symbols-rounded"}," close ",-1)),Se=[$e],Ie={class:"errMsg"},qe={class:"listBox"},we=["placeholder","value"],ke={class:"list",role:"listbox"},Ce={__name:"SelectInput",props:{options:{type:Array,required:!0},selection:{type:[String,Object],required:!1,default:"select"},isSearchable:{type:Boolean,required:!1,default:!0},isResettable:{type:Boolean,required:!1,default:!0},status:{type:String,required:!1,default:"default"},errorMsg:{type:String,required:!1,default:""}},emits:["update:selection"],setup(t,{emit:u}){const d=t,s=u,{t:v}=X(),f=i(""),l=i(!1),r=k(()=>typeof d.selection=="object"?d.selection.option:v("global.form.select")),a=k(()=>r.value!=v("global.form.select")),c=k(()=>{switch(d.status){case"valid":return"valid";case"invalid":return"invalid";default:return""}}),R=k(()=>{if(f.value){let I=d.options.filter(g=>{if(g.option.includes(f.value))return g});return I.length?I:[{option:v("global.form.no-options-found")}]}else return d.options});return(I,g)=>(n(),p("div",{class:w([a.value?"selectInputContainer__selected":"",l.value?"selectInputContainer__expanded":"","selectInputContainer"]),onClickout:g[3]||(g[3]=y=>{l.value=!1})},[e("div",he,[e("button",{role:"combobox","aria-labelledby":"select button","aria-haspopup":"listbox","aria-expanded":l.value,"aria-controls":"select-dropdown",onClick:g[0]||(g[0]=y=>{l.value==!1&&(f.value=""),l.value=!l.value}),class:w([c.value])},[e("div",be,[C(I.$slots,"label",{},()=>[$(" Label ")],!0)]),e("p",null,o(r.value),1),ye],10,ge),e("button",{class:w(["reset",a.value&&t.isResettable?"reset__active":""]),onClick:g[1]||(g[1]=y=>s("update:selection",""))},Se,2)]),e("sub",Ie,o(t.errorMsg),1),e("div",qe,[t.isSearchable?(n(),p("input",{key:0,type:"text",name:"search",id:"search",placeholder:I.$t("global.form.search"),value:f.value,onInput:g[2]||(g[2]=y=>{f.value=y.target.value})},null,40,we)):oe("",!0),e("ul",ke,[(n(!0),p(M,null,x(R.value,y=>(n(),D(me,{key:y.option,onClick:T=>{s("update:selection",y),l.value=!1}},{option:_(()=>[C(I.$slots,"option",{option:y},void 0,!0)]),default:_(()=>[$(o(y.option)+" ",1)]),_:2},1032,["onClick"]))),128))])])],34))}},Me=q(Ce,[["__scopeId","data-v-f57cd33d"]]);const B=t=>(V("data-v-448c163a"),t=t(),A(),t),xe={class:"articles"},Ve=B(()=>e("span",{class:"material-symbols-rounded"}," category ",-1)),Ae={class:"material-symbols-rounded"},Be={key:0,"slides-per-view":"auto","free-mode":"true","scrollbar-hide":"false"},Oe=["src"],Fe={class:"infromatives"},Re={class:"tags"},Te={key:1,"slides-per-view":"auto","free-mode":"true","scrollbar-hide":"true"},je=B(()=>e("div",{class:"loadingShader"},null,-1)),Le={class:"infromatives loading"},De={class:"tags loadingShader"},Ne=B(()=>e("p",null,"loading",-1)),Qe=B(()=>e("article",null,[e("h2",{class:"loadingShader"}," loading "),e("p",{class:"loadingShader"}," loading ")],-1)),Ue=B(()=>e("p",{class:"loadingShader"}," loading ",-1)),Ee={__name:"ArticlesSupport",setup(t){const u=i([]);j.getCategories().then(l=>{u.value=l.categories.map(r=>({option:r}))});const d=i(""),s=i({status:"",errMsg:""}),v=i(!0),f=i("");return j.getSupportRand().then(l=>{f.value=l,v.value=!1}),ne(d,async()=>{d.value!=""?(v.value=!0,j.getByCategory(d.value.option).then(l=>{f.value=l,v.value=!1})):(v.value=!0,f.value=await j.getSupportRand(),v.value=!1)}),(l,r)=>(n(),p("section",xe,[e("h1",null,o(l.$t("help.articles.view-articles")),1),e("p",null,o(l.$t("help.articles.view-articles-from-knowledge-center")),1),m(Me,{options:u.value,"is-searchable":!0,selection:d.value,"onUpdate:selection":r[0]||(r[0]=a=>d.value=a),"error-msg":s.value.errMsg,status:s.value.status},{label:_(()=>[Ve,e("p",null,o(l.$t("help.articles.category")),1)]),option:_(a=>[e("span",Ae,o(a.option.icon),1),e("p",null,o(a.option.option),1)]),_:1},8,["options","selection","error-msg","status"]),v.value?(n(),p("swiper-container",Te,[(n(),p(M,null,x(5,a=>e("swiper-slide",{key:a,style:Y(`opacity: ${1-a/5};`)},[je,e("div",Le,[e("div",De,[m(W,null,{default:_(()=>[$(" loading ")]),_:1}),Ne]),Qe,Ue])],4)),64))])):(n(),p("swiper-container",Be,[(n(!0),p(M,null,x(f.value,a=>(n(),p("swiper-slide",{key:a.id},[e("img",{src:a.image,alt:"article image"},null,8,Oe),e("div",Fe,[e("div",Re,[m(W,null,{default:_(()=>[$(o(a.category),1)]),_:2},1024),e("p",null,o(l.$t("help.articles.read-time",Math.floor(a.readingTime/60),{n:Math.floor(a.readingTime/60)})),1)]),e("article",null,[e("h2",null,o(a.title),1),e("p",null,o(a.summary),1)]),m(re,null,{default:_(()=>[$(o(l.$t("global.read-more")),1)]),_:1})])]))),128))])),m(ue,{icon:"local_library"},{default:_(()=>[$(o(l.$t("global.pages.knowledge-base")),1)]),_:1})]))}},Pe=q(Ee,[["__scopeId","data-v-448c163a"]]);const ze={key:0,class:"inputContainer"},He=["id","type","value","placeholder","required","disabled"],Ge=["for"],Je={key:1,class:"inputContainer"},Ke=["id","value","placeholder","required","disabled"],We=["for"],Xe={__name:"TextInput",props:{modelValue:{type:String,default:""},label:{type:String,required:!0},type:{type:String,default:"text",required:!0},id:{type:String,required:!0},placeholder:{type:String,default:"type here",required:!1},required:{type:Boolean,default:!1,required:!1},disabled:{type:Boolean,default:!1,required:!1},status:{type:String,default:"default"},errorMsg:{type:String,required:!1,default:" "}},emits:["update:modelValue"],setup(t,{expose:u,emit:d}){const s=t,v=d,f=i(null);u({inputField:f});const l=k(()=>{switch(s.status){case"valid":return"input__valid";case"invalid":return"input__invalid";default:return""}});return(r,a)=>(n(),p("div",null,[s.type!="textarea"?(n(),p("div",ze,[e("input",{ref_key:"inputField",ref:f,id:s.id,class:w(["input",l.value]),type:s.type,value:t.modelValue,placeholder:s.placeholder,required:s.required,disabled:s.disabled,onInput:a[0]||(a[0]=c=>v("update:modelValue",c.target.value))},null,42,He),e("label",{for:s.id},o(s.label),9,Ge),e("sub",null,o(t.errorMsg),1)])):(n(),p("div",Je,[e("textarea",{ref_key:"inputField",ref:f,id:s.id,class:w(["input",l.value]),value:t.modelValue,placeholder:s.placeholder,required:s.required,disabled:s.disabled,rows:"5",onInput:a[1]||(a[1]=c=>v("update:modelValue",c.target.value))},null,42,Ke),e("label",{for:s.id},o(s.label),9,We),e("sub",null,o(t.errorMsg),1)]))]))}},L=q(Xe,[["__scopeId","data-v-ecddfb3a"]]),Ye=ie.create({baseURL:"../demoData/support/",withCredentials:!1}),Ze={getAvailability(){return new Promise(t=>{setTimeout(()=>{Ye.get("availability.json").then(u=>{t(u.data)})},1e3)})}};const O=t=>(V("data-v-f610023e"),t=t(),A(),t),et={class:"contactSupport"},tt={class:"supportOptions"},lt=O(()=>e("span",{class:"material-symbols-rounded"}," chat ",-1)),at=O(()=>e("span",{class:"material-symbols-rounded"}," phone ",-1)),st={class:"optionsDivider"},ot=O(()=>e("hr",null,null,-1)),nt=O(()=>e("hr",null,null,-1)),ut={class:"emailOption"},rt={class:"informatives"},it=O(()=>e("span",{class:"material-symbols-rounded"}," email ",-1)),dt=["onSubmit"],ct={__name:"ContactSupport",async setup(t){let u,d;const{t:s}=X(),v=i(([u,d]=de(()=>Ze.getAvailability()),u=await u,d(),u));function f({label:h="input",id:b="testerId",type:S="text",placeholder:K="",required:te=!0,disabled:le=!1,status:ae="default",errorMsg:se=""}={}){return{label:h,type:S,id:b,get placeholder(){return K||this.label},required:te,disabled:le,status:ae,errorMsg:se}}const l=i({...f({label:s("global.form.name"),id:"nameInput"})}),r=i({...f({label:s("global.form.email"),id:"emailInput",type:"email"})}),a=i({...f({label:s("global.form.subject"),id:"subjectInput"})}),c=i({...f({label:s("global.form.message"),id:"messageInput",type:"textarea"})}),R=i(null),I=i(null),g=i(null),y=i(null),T=i(""),N=i(""),Q=i(""),U=i(""),E=i(s("global.submit")),P=i("send"),z=i(!1);function ee(){l.value.status="defaul",r.value.status="defaul",a.value.status="defaul",c.value.status="defaul",l.value.errorMsg="",r.value.errorMsg="",a.value.errorMsg="",c.value.errorMsg="";let h=!0;R.value.inputField.validity.valid||(l.value.errorMsg=s("global.form.name-err-msg"),l.value.status="invalid",h=!1),I.value.inputField.validity.valid||(r.value.errorMsg=s("global.form.email-err-msg"),r.value.status="invalid",h=!1),g.value.inputField.validity.valid||(a.value.errorMsg=s("global.form.subject-err-msg"),a.value.status="invalid",h=!1),y.value.inputField.validity.valid||(c.value.errorMsg=s("global.form.message-err-msg"),c.value.status="invalid",h=!1),h&&(l.value.status="valid",r.value.status="valid",a.value.status="valid",c.value.status="valid",l.value.errorMsg="",r.value.errorMsg="",a.value.errorMsg="",c.value.errorMsg="",z.value=!0,setTimeout(()=>{z.value=!1,P.value="",E.value=s("global.done"),T.value="",N.value="",Q.value="",U.value="",setTimeout(()=>{P.value="send",E.value=s("global.submit"),l.value.status="default",r.value.status="default",a.value.status="default",c.value.status="default"},3e3)},1e3))}function J(h){switch(h){case"tel":window.open(`tel:${v.value.phoneNumber}`);break;case"chat":alert("floater should open");break}}return(h,b)=>(n(),p("aside",et,[e("ul",tt,[e("li",{class:w(["supportOption",v.value.isAvailable?"":"supportOption__disabled"]),onClick:b[0]||(b[0]=S=>J("chat"))},[lt,e("div",null,[e("h2",null,o(h.$t("help.contact.live-chat")),1),e("p",null,o(h.$t("help.contact.availability")),1)])],2),e("li",{class:w(["supportOption",v.value.isAvailable?"":"supportOption__disabled"]),onClick:b[1]||(b[1]=S=>J("tel"))},[at,e("div",null,[e("h2",null,o(h.$t("help.contact.phone-line")),1),e("p",null,o(v.value.phoneNumber),1),e("p",null,o(h.$t("help.contact.availability")),1)])],2),e("li",st,[ot,e("span",null,o(h.$t("help.contact.or")),1),nt]),e("li",ut,[e("div",rt,[it,e("div",null,[e("h2",null,o(h.$t("help.contact.send-mail")),1),e("p",null,o(h.$t("help.contact.avg-reply-time",v.value.avgReplyTime)),1)])]),e("form",{class:"contactForm",onSubmit:ce(ee,["prevent"]),novalidate:""},[m(L,{ref_key:"nameInputRef",ref:R,id:l.value.id,modelValue:T.value,"onUpdate:modelValue":b[2]||(b[2]=S=>T.value=S),class:"textInput",label:l.value.label,type:l.value.type,placeholder:l.value.placeholder,required:l.value.required,disabled:l.value.disabled,status:l.value.status,"error-msg":l.value.errorMsg},null,8,["id","modelValue","label","type","placeholder","required","disabled","status","error-msg"]),m(L,{ref_key:"emailInputRef",ref:I,id:r.value.id,modelValue:N.value,"onUpdate:modelValue":b[3]||(b[3]=S=>N.value=S),class:"textInput",label:r.value.label,type:r.value.type,placeholder:r.value.placeholder,required:r.value.required,disabled:r.value.disabled,status:r.value.status,"error-msg":r.value.errorMsg},null,8,["id","modelValue","label","type","placeholder","required","disabled","status","error-msg"]),m(L,{ref_key:"subjectInputRef",ref:g,id:a.value.id,modelValue:Q.value,"onUpdate:modelValue":b[4]||(b[4]=S=>Q.value=S),class:"textInput",label:a.value.label,type:a.value.type,placeholder:a.value.placeholder,required:a.value.required,disabled:a.value.disabled,status:a.value.status,"error-msg":a.value.errorMsg},null,8,["id","modelValue","label","type","placeholder","required","disabled","status","error-msg"]),m(L,{ref_key:"messageInputRef",ref:y,id:c.value.id,modelValue:U.value,"onUpdate:modelValue":b[5]||(b[5]=S=>U.value=S),class:"textInput",label:c.value.label,type:c.value.type,placeholder:c.value.placeholder,required:c.value.required,disabled:c.value.disabled,status:c.value.status,"error-msg":c.value.errorMsg},null,8,["id","modelValue","label","type","placeholder","required","disabled","status","error-msg"]),m(pe,{icon:P.value,"is-loading":z.value},{default:_(()=>[$(o(E.value),1)]),_:1},8,["icon","is-loading"])],40,dt)])])]))}},pt=q(ct,[["__scopeId","data-v-f610023e"]]);const _t={},F=t=>(V("data-v-0bf6ff26"),t=t(),A(),t),vt={class:"contactSupport"},ft={class:"supportOptions"},mt=F(()=>e("li",{class:"supportOption loadingShader"},null,-1)),ht=F(()=>e("li",{class:"supportOption loadingShader"},null,-1)),gt={class:"optionsDivider"},bt=F(()=>e("hr",null,null,-1)),yt=F(()=>e("hr",null,null,-1)),$t=F(()=>e("li",{class:"emailOption loadingShader"},null,-1));function St(t,u){return n(),p("aside",vt,[e("ul",ft,[mt,ht,e("li",gt,[bt,e("span",null,o(t.$t("help.contact.or")),1),yt]),$t])])}const It=q(_t,[["render",St],["__scopeId","data-v-0bf6ff26"]]);const qt={__name:"DetailsElement",props:{cssStyle:{type:String,required:!1,default:""}},setup(t){const u=t;return(d,s)=>(n(),p("details",{style:Y(u.cssStyle)},[e("summary",null,[e("strong",null,[C(d.$slots,"summary",{},()=>[$("Summary")],!0)])]),e("p",null,[C(d.$slots,"details",{},()=>[$(" Details ")],!0)])],4))}},wt=q(qt,[["__scopeId","data-v-1b8bf475"]]);const kt={class:"faq"},Ct={__name:"FAQSupport",setup(t){return(u,d)=>(n(),p("section",kt,[e("h1",null,o(u.$t("help.faqs.faq")),1),e("ul",null,[(n(),p(M,null,x(5,s=>e("li",{key:s},[m(wt,null,{summary:_(()=>[$(o(u.$t(`help.faqs.faq${s}.question`)),1)]),details:_(()=>[$(o(u.$t(`help.faqs.faq${s}.answer`)),1)]),_:2},1024)])),64))])]))}},Mt=q(Ct,[["__scopeId","data-v-03bcf901"]]);const xt={},Vt=t=>(V("data-v-caa7f95a"),t=t(),A(),t),At={class:"faq"},Bt=Vt(()=>e("h1",null,"FAQs",-1));function Ot(t,u){return n(),p("section",At,[Bt,e("ul",null,[(n(),p(M,null,x(5,d=>e("li",{key:d,class:"loadingShader"})),64))])])}const Ft=q(xt,[["render",Ot],["__scopeId","data-v-caa7f95a"]]);const Rt={class:"helpCenter"},Tt={class:"wl"},jt={class:"container"},Dt={__name:"HelpCenterView",setup(t){return(u,d)=>(n(),p("div",Rt,[e("main",Tt,[e("div",jt,[e("h1",null,o(u.$t("help.help-center")),1),m(H,{name:"fade"},{default:_(()=>[(n(),D(G,null,{default:_(()=>[m(Mt)]),fallback:_(()=>[m(Ft)]),_:1}))]),_:1}),m(H,{name:"fade"},{default:_(()=>[(n(),D(G,null,{default:_(()=>[m(Pe)]),fallback:_(()=>[$(" Loading Articles ... ")]),_:1}))]),_:1})]),m(H,{name:"fade"},{default:_(()=>[(n(),D(G,null,{default:_(()=>[m(pt)]),fallback:_(()=>[m(It)]),_:1}))]),_:1})])]))}};export{Dt as default};
