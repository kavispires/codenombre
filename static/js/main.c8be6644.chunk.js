(this.webpackJsonpcodenombre=this.webpackJsonpcodenombre||[]).push([[0],{100:function(e){e.exports=JSON.parse('["unicorn","frog","bear","dog","cow","horse","monster","elf","warrior","priest","table","coffee","box","piano","sax","ice","water","tea","orange","red","truck","bag","china","italy","brazil","america","france","headphones","ipad","dominoes","game","soccer","teacher","student","book","number","egg","social","tinder","computer","mario","sonic","airplane","couch","money","quarantine","sick","glasses","icecream","cheese","code","november","cell","cough","geek","dinner","sex","temperature","k-pop","salsa","taco","burrito","assassin","pen","stool","poop","dennis","paint","saturday","murder","music","despacito","time","beauty","whatsapp","australia","coronavirus","sad","distance","power","line","flower","virgin","google","apple","zombie","pandemic","mystery","story","love","husband","alone","online","circle","dinosaur","cable","explosion","cthulhu","pig","sailor","moon","mercury","roof","coyote","maze","math","review","order","word","mexico"]')},109:function(e,a,t){"use strict";t.r(a);var n,s=t(0),r=t.n(s),i=t(13),c=t.n(i),l=(t(99),t(5)),o=t(163),u=t(161),m=t(24),d=t(11),g=t(46),h=t(47),b={GG:2,AA:1,AG:1,AB:1,GA:1,BA:1,BB:3,GB:3,BG:3},f={classic:25,simple:16,pictures:20,dixit:16,deception:20},p={classic:{GG:3,AA:1,AG:1,AB:1,GA:1,BA:1,BB:7,GB:5,BG:5},simple:b,pictures:{GG:3,AA:1,AG:1,AB:1,GA:1,BA:1,BB:4,GB:4,BG:4},dixit:b},v={A:"alpha",B:"bravo",C:"charlie",D:"delta",E:"echo",F:"foxtrot",G:"golf",H:"hotel",I:"india",J:"juliet",K:"kilo",L:"lima",M:"mike",N:"november",O:"oscar",P:"papa",Q:"quebek",R:"romeo",S:"sierra",T:"tango",U:"uniform",V:"victor",W:"whiskey",X:"x-ray",Y:"yankee",Z:"zulu"},y=function(e){var a=Object(m.a)(e);return a.sort((function(){return Math.random()-.5})),a},E={codenames:["america","book","coffee","disco","emerald","fork","gorilla","helicopter","island","job","key","lemon","mountain","november","olive","parrot","queen","rat","sex","tamborine","uber","vase","water","yellow","zombie"],difficulty:"normal",gameID:"ABCD",keyCard:["AG","BB","BG","GB","BB","BB","BB","GB","GB","AA","BG","BG","BB","GA","AB","GB","BB","BG","GG","GB","BA","BB","GG","BG","GG"],mode:"classic",players:["Kavis","Dennis"],turnOrder:["Kavis","Dennis"],timestamps:[0,0],turn:0,phase:"setup",mock:!0,messages:[]},O=function(e){var a=["pandemic","bagel","store","purchase","nine","investigator","body","morning","mother","daisy","son","love","date","drink","drugs","fabric","rigid","see","detail","information","palm","print","alaska","headphones","table","tomato","clue","amazing"];return new Array(e).fill(" ").map((function(e,t){return{clue:a[t],number:Math.floor(4*Math.random()),user:E.turnOrder[t%2]}}))},k=function(e){var a=Date.now();switch(e){case"setup":return Object(d.a)({},E,{timestamps:[a,a],turn:0,phase:"setup"});case"turn1.clue-giving":return Object(d.a)({},E,{timestamps:[a,a],turn:1,phase:"clue-giving"});case"turn1.guessing":return Object(d.a)({},E,{timestamps:[a,a],turn:1,phase:"guessing",messages:O(1)});case"turn2.clue-giving":return Object(d.a)({},E,{timestamps:[a,a],turn:2,phase:"clue-giving",messages:O(20)});case"turn2.guessing":return Object(d.a)({},E,{timestamps:[a,a],turn:2,phase:"guessing",messages:O(2)});default:return Object(d.a)({},E,{timestamps:[a,a]})}},j=t(100),N='Analyse the codenames.<br>Your goal is to help your ally to find as many agents (cards) on their side.<br>When you think you have a good clue in mind, press "I want to start"!',I="Come up with a one-word clue and the number of cards that match your clue.<br>Watch out for matching Assassins (black-bordered cards), if your ally selects one of them, it's game over.",D="Waiting for your ally to come up with a clue that matches as many codenames as possible.<br>Stay in position!",G="Check the message board for your clue. The number is how many codenames match the clue.<br>Don't fail me agent! Click on the cards you think are a match. You need to make at least one guess to be able to pass.",w="Your ally is trying to make contact with the spies.<br>Was your clue clear enough? Wait and see",_="Your ally selected the WRONG agent!",B="You selected the WRONG agent!",C=new(function(){function e(){Object(g.a)(this,e),this._dbRef=null,this.gameID=null,this.mode=null,this.difficulty=null,this.players=[],this.online=[!1,!1],this.timestamps=[0,0],this.me=null,this.turn=0,this.turnOrder=[],this.phase="setup",this.messages=[],this.codenames=[],this.guesses={},this._tempSaveObj=null,this._interval=null}return Object(h.a)(e,[{key:"init",value:function(e,a,t){return this.reset(),this.gameID=e,this.mode=a,this.difficulty=t,this.setup(),this.state}},{key:"updateOnline",value:function(){return this.online=this.timestamps.map((function(e){return Date.now()-e<6e5})),this.online}},{key:"delaySave",value:function(){var e=this;this._interval?console.warn("There`s already a save interval running"):this._interval=setInterval((function(){e._dbRef&&(e.save(Object(d.a)({},e._tempSaveObj)),e._tempSaveObj=null,clearInterval(e._interval))}),1e3)}},{key:"save",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!this._dbRef)return this._tempSaveObj=e,this.delaySave();console.log("%cSaving...","background:LightSalmon",e),this.timestamps[this.myDatabaseIndex]=Date.now(),this._dbRef.update(Object(d.a)({},e,{timestamps:e.mock?e.timestamps:this.timestamps}))}},{key:"update",value:function(e){return console.log("%cUpdating game...","background:GreenYellow",e),this.gameID=e.gameID,this.mode=e.mode,this.difficulty=e.difficulty,this.players=e.players||[],this.timestamps=e.timestamps||[0,0],this.turn=e.turn,this.phase=e.phase,this.turnOrder=e.turnOrder||[],this.messages=e.messages||[],this.codenames=e.codenames,this.keyCard=e.keyCard,this.state}},{key:"reset",value:function(){}},{key:"setup",value:function(){var e=f[this.mode],a=p[this.mode],t=Object.entries(a).reduce((function(e,a){var t=Object(l.a)(a,2),n=t[0],s=t[1],r=new Array(s).fill(n);return[].concat(Object(m.a)(e),Object(m.a)(r))}),[]);this.keyCard=y(t),this.codenames=function(e,a){for(var t=y(e),n=new Array(a).fill(null),s=0;s<n.length;s++){var r=t[s];n[s]=r}return n}(j,e)}},{key:"setDbRef",value:function(e){this._dbRef||(this._dbRef=e)}},{key:"setGameID",value:function(e){this.gameID=e}},{key:"setPlayer",value:function(e){if(this.me=e,this.isGameFull)throw Error("Game is full, try a different game ID");this.players.includes(e)?this.save():(this.players.push(e),this.save({players:this.players}))}},{key:"setMe",value:function(e){this.me||(this.me=e),this.save()}},{key:"setTurnOrder",value:function(){var e=0===this.myDatabaseIndex?Object(m.a)(this.players):Object(m.a)(this.players).reverse();this.save({turnOrder:e,turn:this.turn+1,phase:"clue-giving"})}},{key:"submitClue",value:function(e){this.save({phase:"guessing",messages:[].concat(Object(m.a)(this.messages),[{clue:e.clue,number:e.number||0,player:this.me}])})}},{key:"submitGuess",value:function(e){var a=this.keyCard[e][this.allyDatabaseIndex];switch(console.log("key",this.keyCard[e]),console.log("myGuess",a),a){case"A":console.log("CASE A");break;case"G":console.log("CASE G");break;case"B":console.log("CASE B");break;default:console.log("CASE ?")}}},{key:"pass",value:function(){}},{key:"mock",value:function(e){this.save(k(e))}},{key:"myDatabaseIndex",get:function(){var e=this;return this.players.findIndex((function(a){return a===e.me}))}},{key:"allyDatabaseIndex",get:function(){var e=this;return this.turnOrder.findIndex((function(a){return a!==e.me}))}},{key:"myTurnIndex",get:function(){var e=this;return this.turnOrder.findIndex((function(a){return a===e.me}))}},{key:"myAllyIndex",get:function(){var e=this;return this.turnOrder.findIndex((function(a){return a!==e.me}))}},{key:"allysName",get:function(){return this.players[this.allyDatabaseIndex]||"OP"}},{key:"isGameFull",get:function(){return!this.amISet&&2===this.players.length}},{key:"amISet",get:function(){return this.me&&this.players.includes(this.me)}},{key:"turnRole",get:function(){return this.turn%2===this.myTurnIndex?"passive":"active"}},{key:"dialog",get:function(){switch(this.phase){case"setup":return N;case"clue-giving":return"active"===this.turnRole?I:D;case"guessing":return"active"===this.turnRole?G:w;case"wrong-guess":return"active"===this.turnRole?_:B;default:return""}}},{key:"state",get:function(){return{gameID:this.gameID,mode:this.mode,difficulty:this.difficulty,players:this.players,timestamps:this.timestamps,turn:this.turn,phase:this.phase,messages:this.messages||[],turnOrder:this.turnOrder,codenames:this.codenames,keyCard:this.keyCard}}}]),e}()),x=t(69),A={gameID:null,nickname:null,isLoading:!1,game:C.state,dbRef:null,screen:"home",toast:{isVisible:!1,message:""},dialog:{isVisible:!1,message:""},online:[!1,!1]},S=Object(x.createGlobalState)(A).useGlobalState,R=t(70),T=t.n(R),V=(t(102),T.a.initializeApp({apiKey:"AIzaSyA5uW5M2mnsbTe5FageZQeOtVuQ6hwLcD0",authDomain:"game-session.firebaseapp.com",databaseURL:"https://game-session.firebaseio.com",projectId:"game-session",storageBucket:"game-session.appspot.com",messagingSenderId:"446752882490",appId:"1:446752882490:web:559aec721133be173e1a03",measurementId:"G-61D49M1X04"}).database()),W={error:function(e,a){return Object(d.a)({},e,{isVisible:!0,severity:"error",message:a})},info:function(e,a){return Object(d.a)({},e,{isVisible:!0,severity:"info",message:a})},success:function(e,a){return Object(d.a)({},e,{isVisible:!0,severity:"success",message:a})},warning:function(e,a){return Object(d.a)({},e,{isVisible:!0,severity:"warning",message:a})}},L=t(154),M=t(155),z=t(75),P=t.n(z),F=t(171),J=t(150),Y=function(e){var a=e.isOnline,t=e.name;return r.a.createElement(J.a,{color:"secondary",overlap:"circle",anchorOrigin:{vertical:"bottom",horizontal:"right"},variant:"dot",className:"badge ".concat(a?"badge--online":"badge--offline")},r.a.createElement(F.a,null,t))},K=function(e){var a=e.gameID,t=S("online"),n=Object(l.a)(t,1)[0],s=C.allysName.substring(0,2);return r.a.createElement(L.a,{className:"header header--flex",position:"static"},r.a.createElement("div",{className:"header__left-area"},r.a.createElement(M.a,{"aria-label":"reload",onClick:function(){return C.save()}},r.a.createElement(P.a,null))),r.a.createElement("div",{className:"header__game-center"},r.a.createElement("div",{className:"header__game-id"},"game id"),r.a.createElement("h1",null,a),r.a.createElement("div",{className:"header__military-translation"},function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.split("").map((function(e){return v[e]})).join(" \u2022 ")}(a))),r.a.createElement("div",{className:"header__right-area"},r.a.createElement(Y,{name:s,isOnline:n[C.allyDatabaseIndex]}),r.a.createElement(Y,{name:"Me",isOnline:n[C.myDatabaseIndex]})))},U=t(76),q=t.n(U),H=t(156),Q=t(54),X=new Array(11).fill(null).map((function(e,a){return a+1})),Z=function(){var e=S("game"),a=Object(l.a)(e,1)[0];return r.a.createElement("div",{className:"grid-timeline game-timeline"},X.map((function(e,t){return r.a.createElement("div",{key:"counter-".concat(e,"-").concat(t),className:"game-timeline__round"},r.a.createElement("span",{className:"game-timeline__round-number"},e),r.a.createElement(q.a,{className:"round-marker",style:a.turn-1===t?{color:H.a[50]}:{color:Q.a[500]},fontSize:"large"}))})))},$=function(){var e=C.dialog.split("<br>");return r.a.createElement("div",{className:"grid-instructions dialog-container"},r.a.createElement("h3",null,"Instructions"),r.a.createElement("div",{className:"dialog-box"},e.map((function(e){return r.a.createElement("p",{key:e},e)}))))},ee=function(){var e=S("game"),a=Object(l.a)(e,1)[0];return r.a.createElement("div",{className:"grid-chat game-chat"},a.messages&&a.messages.map((function(e,a){return e.user===C.me?r.a.createElement("div",{key:"".concat(e.clue,"-").concat(a),className:"message message-mine"},r.a.createElement("span",{className:"message-text"},e.clue,", ",e.number)):r.a.createElement("div",{key:"".concat(e.clue,"-").concat(a),className:"message message-their"},r.a.createElement("span",{className:"message-text"},e.clue,", ",e.number))})))},ae=t(77),te=t.n(ae),ne=t(78),se=t.n(ne),re=t(79),ie=t.n(re),ce=function(e){var a=e.codename,t=e.state,n=e.imageSource,s=e.type;switch(t){case"revealed-me":case"revealed-you":default:return r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{className:"codename__background",src:n,alt:n}),"word"===s&&r.a.createElement("span",{className:"codename__word"},a),"word"===s&&r.a.createElement("span",{className:"codename__word-updsidedown"},a))}},le=function(e){var a=e.codename,t=e.codenameID,n=e.type,s=e.size,i=e.keyClass,c=e.isButton,l=e.state,o=function(e){switch(e){case"agent":return te.a;case"assassin":return se.a;default:return ie.a}}(i);return c?r.a.createElement("button",{className:"codename codename--button codename--".concat(n," codename--").concat(s," codename--").concat(i),onClick:function(){return C.submitGuess(t)}},r.a.createElement(ce,{codename:a,state:l,imageSource:o,type:n})):r.a.createElement("div",{className:"codename codename--".concat(n," codename--").concat(s," codename--").concat(i)},r.a.createElement(ce,{codename:a,state:l,imageSource:o,type:n}))},oe=function(){var e=S("game"),a=Object(l.a)(e,1)[0],t="guessing"===a.phase&&"passive"===C.turnRole;return r.a.createElement("div",{className:"grid-gameboard codenames-grid"},a.codenames.map((function(e,n){var s=function(e,a,t){switch(t[e][a]){case"A":return"assassin";case"G":return"agent";default:return"bystander"}}(n,C.myDatabaseIndex,a.keyCard),i=t&&!"".startsWith("revaled");return r.a.createElement(le,{key:e,codename:e,codenameID:n,type:"word",size:5,keyClass:s,isButton:i,state:""})})))},ue=t(157),me=t(164),de=t(160),ge=t(80),he=t.n(ge),be=function(){var e=S("game"),a=Object(l.a)(e,1)[0],t=Object(s.useState)({clue:null,number:null}),n=Object(l.a)(t,2),i=n[0],c=n[1],o=function(e,a){a&&("clue"===e?c(Object(d.a)({},i,{clue:a})):"number"===e&&c(Object(d.a)({},i,{number:a})))},u=i.clue&&!i.clue.includes(" ")&&i.number>=0;return r.a.createElement("div",{className:"grid-actions game-actions"},"setup"===a.phase&&r.a.createElement("div",{className:"game-actions__actions game-actions__actions--setup"},r.a.createElement(ue.a,{className:"mui-block",variant:"contained",color:"primary",style:{background:Q.a[500]},onClick:function(){return C.setTurnOrder()}},"I want to start!")),"clue-giving"===a.phase&&"active"===C.turnRole&&r.a.createElement("div",{className:"game-actions__actions game-actions__actions--clue-giving"},r.a.createElement(me.a,{className:"block",id:"clue",label:"Clue",inputProps:{autocomplete:"off"},onChange:function(e){return o("clue",e.target.value)}}),r.a.createElement(me.a,{id:"filled-number",label:"Number",type:"number",inputProps:{min:"0",max:"25",step:"1"},onChange:function(e){return o("number",+e.target.value)}}),r.a.createElement(ue.a,{className:"block",variant:"contained",color:"primary",disabled:!u,style:{background:Q.a[500]},onClick:function(){C.submitClue(i)}},r.a.createElement(he.a,null))),"guessing"===a.phase&&"passive"===C.turnRole&&r.a.createElement("div",{className:"game-actions__actions game-actions__actions--guessing"},r.a.createElement(ue.a,{className:"block",variant:"contained",color:"primary",disabled:!1,style:{background:Q.a[500]},onClick:function(){return console.log("OK")}},"PASS")),("clue-giving"===a.phase&&"passive"===C.turnRole||"guessing"===a.phase&&"active"===C.turnRole)&&r.a.createElement("div",{className:"game-actions__actions game-actions__actions--waiting"},r.a.createElement(de.a,{style:{color:Q.a[500]}})))},fe=function(){var e=S("dialog"),a=Object(l.a)(e,2)[1],t=C.dialog;return Object(s.useEffect)((function(){a({isVisible:!0,duration:"long",message:t})}),[t,a]),r.a.createElement("div",{className:"game-content game-session"},r.a.createElement(Z,null),r.a.createElement($,null),r.a.createElement(oe,null),r.a.createElement(ee,null),r.a.createElement(be,null))},pe=function(){var e=S("dbRef"),a=Object(l.a)(e,1)[0],t=S("game"),n=Object(l.a)(t,1)[0],i=S("gameID"),c=Object(l.a)(i,2)[1],o=S("nickname"),u=Object(l.a)(o,1)[0],m=S("online"),d=Object(l.a)(m,1)[0],g=S("screen"),h=Object(l.a)(g,2)[1],b=S("toast"),f=Object(l.a)(b,2),p=f[0],v=f[1],y=S("dialog"),E=Object(l.a)(y,2)[1];return Object(s.useEffect)((function(){try{a&&!C.amISet&&C.setPlayer(u)}catch(e){v(W.error(p,"Game is full, try a different game ID")),c(null),h("home")}}),[a,u,c,h,v,p]),Object(s.useEffect)((function(){C.me||C.setMe(u),function(e){return e.every((function(e){return e}))}(d)&&(h("game.stage.setup"),E({isVisible:!0,duration:"long",message:C.dialog}))}),[n,h,u,d,E]),r.a.createElement("div",{className:"game-content game-waiting-room"},r.a.createElement(de.a,{style:{color:Q.a[500]}}),r.a.createElement("div",{className:"game-waiting-room__message"},"Hi, ",u),r.a.createElement("div",{className:"game-waiting-room__message"},"Waiting for another player to join..."))},ve=function(){var e=S("dbRef"),a=Object(l.a)(e,2),t=a[0],n=a[1],i=S("game"),c=Object(l.a)(i,2),o=c[0],u=c[1],m=S("gameID"),d=Object(l.a)(m,2),g=d[0],h=d[1],b=S("isLoading"),f=Object(l.a)(b,2)[1],p=S("screen"),v=Object(l.a)(p,2),y=v[0],E=v[1],O=S("toast"),k=Object(l.a)(O,2),j=k[0],N=k[1],I=S("online"),D=Object(l.a)(I,2)[1];return Object(s.useEffect)((function(){null===o.gameID&&g&&(f(!0),V.ref("codenombre/".concat(g)).once("value",(function(e){if(e.val()){var a=V.ref().child("codenombre").child(g);C.setGameID(g),C.setDbRef(a),u(C.update(e.val())),n(a)}else h(null),C.setGameID(null),N(W.error(j,"Failed to start game session")),E("home");u(C.state),f(!1)})))}),[o.gameID,g,n,u,h,f,E,N,j]),Object(s.useEffect)((function(){if(t){t.on("value",(function(e){f(!0),e.val()&&(u(C.update(e.val())),D(C.updateOnline())),f(!1)}));var e=function(e){f(!1),N(W.info(j,"Server disconnected")),E("home")};return function(){t.off("value",e)}}}),[t,u,f,E,N,j,D]),r.a.createElement("div",{className:"game"},r.a.createElement(K,{gameID:g}),"game.waiting"===y&&r.a.createElement(pe,null),y.startsWith("game.stage")&&r.a.createElement(fe,null))},ye=new(function(){function e(){Object(g.a)(this,e),this.store={nickname:"",gameID:""},this.isLoaded=!1,this.init()}return Object(h.a)(e,[{key:"init",value:function(){return this.load(),this.get()}},{key:"get",value:function(e){return this.isLoaded||this.load(),e?this.store[e]||null:this.store}},{key:"load",value:function(){var e=JSON.parse(window.localStorage.getItem("codenombre"));e&&(this.store=e,this.isLoaded=!0)}},{key:"set",value:function(e){this.isLoaded||this.load();var a=typeof e;"string"===a||"object"===a?("string"===typeof e?this.store[e]=!this.store[e]:(Object.entries(e).forEach((function(a){var t=Object(l.a)(a,2),n=t[0],s=t[1];null!==s&&void 0!==s||delete e[n]})),this.store=Object(d.a)({},this.store,{},e)),this.save()):console.error("localStorage set value must be a string or a key-value object")}},{key:"save",value:function(){this.notLoaded&&this.load(),window.localStorage.setItem("codenombre",JSON.stringify(this.store)),this.load()}},{key:"getDefaults",value:function(){return[this.store.gameID,this.store.nickname]}},{key:"setDefaults",value:function(e,a){this.set({gameID:e,nickname:a})}}]),e}()),Ee=function(e){e.gameID;return r.a.createElement(L.a,{className:"header",position:"static"},r.a.createElement("div",{className:"header__game-id"},"Welcome to"),r.a.createElement("h1",null,"CODENOMBRE"))},Oe=function(e){var a=e.tempGameID,t=e.setTempGameID,n=e.tempNickname,i=S("gameID"),c=Object(l.a)(i,2),o=c[0],m=c[1],d=S("isLoading"),g=Object(l.a)(d,2),h=g[0],b=g[1],f=S("nickname"),p=Object(l.a)(f,2),v=p[0],y=p[1],E=S("screen"),O=Object(l.a)(E,2)[1],k=Object(s.useState)(!1),j=Object(l.a)(k,2),N=j[0],I=j[1],D=Object(s.useState)(!1),G=Object(l.a)(D,2),w=G[0],_=G[1],B=Object(s.useState)(""),C=Object(l.a)(B,2),x=C[0],A=C[1];Object(s.useEffect)((function(){n&&y(n)})),Object(s.useEffect)((function(){o!==a&&4===(null===a||void 0===a?void 0:a.length)&&(b(!0),V.ref("codenombre/".concat(a.toUpperCase())).once("value",(function(e){e.val()?(m(a.toUpperCase()),I(!0),A("")):(A("Provided Game ID does not exist. Try again."),I(!1)),b(!1)}))),(null===a||void 0===a?void 0:a.length)<4&&I(!1),a===o&&(I(!0),A("")),(null===v||void 0===v?void 0:v.length)>=3||(null===n||void 0===n?void 0:n.length)>=3?_(!0):_(!1)}),[o,a,m,I,b,v,_,n]);return r.a.createElement("div",{className:"home-section join-game"},r.a.createElement(me.a,{className:"mui-full-width",required:!0,id:"game-id",label:"Game ID",defaultValue:a,onChange:function(e){return t(e.target.value)},helperText:x,inputProps:{maxLength:"4"}}),r.a.createElement(me.a,{className:"mui-full-width",required:!0,id:"nickname",label:"Nickname",defaultValue:n,onChange:function(e){return y(e.target.value)},inputProps:{maxLength:"8"},helperText:v&&!w?"Nickname must be at least 3 characters long.":""}),r.a.createElement("div",null,h&&r.a.createElement(u.a,{style:{background:Q.a[800]}})),r.a.createElement(ue.a,{className:"mui-block",variant:"contained",color:"primary",disabled:!w||!N,onClick:function(){return ye.setDefaults(o,v),void O("game.waiting")},style:{background:Q.a[500]}},"Join ",o),r.a.createElement("div",{className:"home-section home-secion--separator"},"- or -"),r.a.createElement("div",{className:"home-section create-game"},r.a.createElement(ue.a,{className:"block",variant:"contained",color:"default",onClick:function(){O("home.create")}},"Create a Game")))},ke=t(45),je=t(173),Ne=t(172),Ie=t(158),De=t(167),Ge=t(170),we=function(e){var a=e.setTempGameID,t=S("isLoading"),n=Object(l.a)(t,2),i=n[0],c=n[1],o=S("screen"),u=Object(l.a)(o,2)[1],m=S("toast"),g=Object(l.a)(m,2),h=g[0],b=g[1],f=Object(s.useState)("classic"),p=Object(l.a)(f,2),v=p[0],y=p[1],E=Object(s.useState)("normal"),O=Object(l.a)(E,2),k=O[0],j=O[1],N=function(){c(!0);var e=function(){for(var e="ABCDEFGHIJKLMNOPQRSTUVWXYZ",a="";a.length<4;)a+=e[Math.floor(Math.random()*e.length)];return a}(),t=C.init(e,v,k);try{V.ref("/codenombre").update(Object(ke.a)({},e,Object(d.a)({},t))),a(e),b(W.success(h,"Game created successfully. ID: ".concat(e))),c(!1),u("home")}catch(n){b(W.error(h,"Creating game has failed"))}finally{c(!1)}};return r.a.createElement("div",{className:"home-section create-game"},r.a.createElement(je.a,{component:"fieldset"},r.a.createElement(Ie.a,{component:"legend",className:"create-game-label"},"Game Type"),r.a.createElement(Ge.a,{name:"game-type",value:v,onChange:function(e){return y(e.target.value)}},r.a.createElement(Ne.a,{value:"classic",control:r.a.createElement(De.a,null),label:"Classic"}),r.a.createElement(Ne.a,{value:"simple",disabled:!0,control:r.a.createElement(De.a,null),label:"Simple"}),r.a.createElement(Ne.a,{value:"pictures",disabled:!0,control:r.a.createElement(De.a,null),label:"Pictures"}),r.a.createElement(Ne.a,{value:"dixit",disabled:!0,control:r.a.createElement(De.a,null),label:"Dixit"}),r.a.createElement(Ne.a,{value:"deception",disabled:!0,control:r.a.createElement(De.a,null),label:"Deception"})),r.a.createElement(Ie.a,{component:"legend",className:"create-game-label"},"Difficulty"),r.a.createElement(Ge.a,{name:"game-difficulty",value:k,onChange:function(e){return j(e.target.value)}},r.a.createElement(Ne.a,{value:"easy",control:r.a.createElement(De.a,null),label:"Easy"}),r.a.createElement(Ne.a,{value:"normal",control:r.a.createElement(De.a,null),label:"Normal"}))),r.a.createElement(ue.a,{className:"mui-block",variant:"contained",color:"primary",style:{background:Q.a[500]},onClick:function(){return N()},disabled:i},"Create ",v," game"),r.a.createElement(ue.a,{className:"mui-block create-game-back-button",color:"default",onClick:function(){return u("home")}},"Back"))},_e=function(){var e=ye.getDefaults(),a=Object(l.a)(e,2),t=a[0],n=a[1],i=S("screen"),c=Object(l.a)(i,1)[0],o=Object(s.useState)(t),u=Object(l.a)(o,2),m=u[0],d=u[1],g=Object(s.useState)(n),h=Object(l.a)(g,1)[0];return r.a.createElement("div",{className:"home"},r.a.createElement(Ee,null),r.a.createElement("div",{className:"home-content"},"home"===c&&r.a.createElement(Oe,{tempGameID:m,setTempGameID:d,tempNickname:h}),"home.create"===c&&r.a.createElement(we,{tempGameID:m,setTempGameID:d})))},Be=t(168),Ce=t(162),xe=Object(s.forwardRef)((function(e,a){return r.a.createElement(Ce.a,Object.assign({direction:"up",ref:a},e))})),Ae=function(){var e,a=S("dialog"),t=Object(l.a)(a,2),i=t[0],c=t[1],o=function(){c({isVisible:!1}),clearTimeout(n)};Object(s.useEffect)((function(){if(i.isVisible&&(!i.duration||"fixed"!==i.duration)){var e="long"===i.duration?12e3:5e3;n=setTimeout((function(){c({isVisible:!1})}),e)}}),[i,c]);var u=(null===i||void 0===i||null===(e=i.message)||void 0===e?void 0:e.split("<br>"))||[];return r.a.createElement(Be.a,{open:i.isVisible,TransitionComponent:xe,keepMounted:!0,onClose:o,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description"},r.a.createElement("div",{className:"popup-container"},u.map((function(e){return r.a.createElement("p",{key:e},e)})),("long"===i.duration||"fixed"===i.duration)&&r.a.createElement(ue.a,{variant:"contained",color:"primary",style:{background:Q.a[300]},onClick:function(){return o()}},"OK")),"fixed"!==i.duration&&r.a.createElement("div",{className:"popup-timeleft"},r.a.createElement("span",{className:"popup-timeleft__bar popup-timeleft__bar--".concat("long"===i.duration?"long":"short")})))},Se=t(169),Re=t(165),Te=function(){var e=S("toast"),a=Object(l.a)(e,2),t=a[0],n=a[1],s=function(){n(Object(d.a)({},t,{isVisible:!1}))};return r.a.createElement(Se.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:t.isVisible,autoHideDuration:6e3,onClose:s},r.a.createElement(Re.a,{onClose:s,severity:t.severity},t.message))},Ve=function(){var e=S("isLoading"),a=Object(l.a)(e,1)[0],t=S("screen"),n=Object(l.a)(t,1)[0];return r.a.createElement(s.Fragment,null,r.a.createElement(o.a,{maxWidth:"lg",className:"full-screen"},a?r.a.createElement(u.a,null):r.a.createElement("div",{className:"progress-bar-placeholder"}),n.startsWith("home")&&r.a.createElement(_e,null),n.startsWith("game")&&r.a.createElement(ve,null)),r.a.createElement(Te,null),r.a.createElement(Ae,null),!1)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(s.StrictMode,null,r.a.createElement(Ve,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},77:function(e,a,t){e.exports=t.p+"static/media/card-agent.f0e3c1ab.jpg"},78:function(e,a,t){e.exports=t.p+"static/media/card-assassin.8914189c.jpg"},79:function(e,a,t){e.exports=t.p+"static/media/card-bystander.c3509259.jpg"},94:function(e,a,t){e.exports=t(109)},99:function(e,a,t){}},[[94,1,2]]]);
//# sourceMappingURL=main.c8be6644.chunk.js.map