(function(g){var window=this;'use strict';var e4=function(a){g.V.call(this,{G:"div",L:"ytp-miniplayer-ui"});this.We=!1;this.player=a;this.T(a,"minimized",this.ah);this.T(a,"onStateChange",this.kJ)},f4=function(a){g.oL.call(this,a);
this.j=new e4(this.player);this.j.hide();g.bL(this.player,this.j.element,4);a.Af()&&(this.load(),g.N(a.getRootNode(),"ytp-player-minimized",!0))};
g.w(e4,g.V);g.h=e4.prototype;
g.h.OG=function(){this.tooltip=new g.lP(this.player,this);g.H(this,this.tooltip);g.bL(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.Cc=new g.jM(this.player);g.H(this,this.Cc);this.Hh=new g.V({G:"div",L:"ytp-miniplayer-scrim"});g.H(this,this.Hh);this.Hh.Ba(this.element);this.T(this.Hh.element,"click",this.vC);var a=new g.V({G:"button",Ea:["ytp-miniplayer-close-button","ytp-button"],W:{"aria-label":"Close"},U:[g.sI()]});g.H(this,a);a.Ba(this.Hh.element);this.T(a.element,"click",this.Gj);
a=new g.u_(this.player,this);g.H(this,a);a.Ba(this.Hh.element);this.jr=new g.V({G:"div",L:"ytp-miniplayer-controls"});g.H(this,this.jr);this.jr.Ba(this.Hh.element);this.T(this.jr.element,"click",this.vC);var b=new g.V({G:"div",L:"ytp-miniplayer-button-container"});g.H(this,b);b.Ba(this.jr.element);a=new g.V({G:"div",L:"ytp-miniplayer-play-button-container"});g.H(this,a);a.Ba(this.jr.element);var c=new g.V({G:"div",L:"ytp-miniplayer-button-container"});g.H(this,c);c.Ba(this.jr.element);this.kQ=new g.KN(this.player,
this,!1);g.H(this,this.kQ);this.kQ.Ba(b.element);b=new g.IN(this.player,this);g.H(this,b);b.Ba(a.element);this.nextButton=new g.KN(this.player,this,!0);g.H(this,this.nextButton);this.nextButton.Ba(c.element);this.Kh=new g.YO(this.player,this);g.H(this,this.Kh);this.Kh.Ba(this.Hh.element);this.Mc=new g.UN(this.player,this);g.H(this,this.Mc);g.bL(this.player,this.Mc.element,4);this.kC=new g.V({G:"div",L:"ytp-miniplayer-buttons"});g.H(this,this.kC);g.bL(this.player,this.kC.element,4);a=new g.V({G:"button",
Ea:["ytp-miniplayer-close-button","ytp-button"],W:{"aria-label":"Close"},U:[g.sI()]});g.H(this,a);a.Ba(this.kC.element);this.T(a.element,"click",this.Gj);a=new g.V({G:"button",Ea:["ytp-miniplayer-replay-button","ytp-button"],W:{"aria-label":"Close"},U:[g.yI()]});g.H(this,a);a.Ba(this.kC.element);this.T(a.element,"click",this.pZ);this.T(this.player,"presentingplayerstatechange",this.Yc);this.T(this.player,"appresize",this.xb);this.T(this.player,"fullscreentoggled",this.xb);this.xb()};
g.h.show=function(){this.ye=new g.xp(this.rs,null,this);this.ye.start();this.We||(this.OG(),this.We=!0);0!==this.player.getPlayerState()&&g.V.prototype.show.call(this);this.Mc.show();this.player.unloadModule("annotations_module")};
g.h.hide=function(){this.ye&&(this.ye.dispose(),this.ye=void 0);g.V.prototype.hide.call(this);this.player.Af()||(this.We&&this.Mc.hide(),this.player.loadModule("annotations_module"))};
g.h.qa=function(){this.ye&&(this.ye.dispose(),this.ye=void 0);g.V.prototype.qa.call(this)};
g.h.Gj=function(){this.player.stopVideo();this.player.Ka("onCloseMiniplayer")};
g.h.pZ=function(){this.player.playVideo()};
g.h.vC=function(a){if(a.target===this.Hh.element||a.target===this.jr.element)this.player.V().N("kevlar_miniplayer_play_pause_on_scrim")?g.vH(this.player.yb())?this.player.pauseVideo():this.player.playVideo():this.player.Ka("onExpandMiniplayer")};
g.h.ah=function(){g.N(this.player.getRootNode(),"ytp-player-minimized",this.player.Af())};
g.h.Td=function(){this.Mc.Tb();this.Kh.Tb()};
g.h.rs=function(){this.Td();this.ye&&this.ye.start()};
g.h.Yc=function(a){g.U(a.state,32)&&this.tooltip.hide()};
g.h.xb=function(){g.jO(this.Mc,0,this.player.Xa().getPlayerSize().width,!1);g.XN(this.Mc)};
g.h.kJ=function(a){this.player.Af()&&(0===a?this.hide():this.show())};
g.h.pc=function(){return this.tooltip};
g.h.If=function(){return!1};
g.h.gg=function(){return!1};
g.h.Bj=function(){return!1};
g.h.zz=function(){};
g.h.bp=function(){};
g.h.Au=function(){};
g.h.Ap=function(){return null};
g.h.Xx=function(){return null};
g.h.Gk=function(){return new g.Lm(0,0,0,0)};
g.h.handleGlobalKeyDown=function(){return!1};
g.h.handleGlobalKeyUp=function(){return!1};
g.h.Bs=function(a,b,c,d,e){var f=0,k=d=0,l=g.Zm(a);if(b){c=g.Fp(b,"ytp-prev-button")||g.Fp(b,"ytp-next-button");var m=g.Fp(b,"ytp-play-button"),n=g.Fp(b,"ytp-miniplayer-expand-watch-page-button");c?f=k=12:m?(b=g.Xm(b,this.element),k=b.x,f=b.y-12):n&&(k=g.Fp(b,"ytp-miniplayer-button-top-left"),f=g.Xm(b,this.element),b=g.Zm(b),k?(k=8,f=f.y+40):(k=f.x-l.width+b.width,f=f.y-20))}else k=c-l.width/2,d=25+(e||0);b=this.player.Xa().getPlayerSize().width;e=f+(e||0);l=g.Bh(k,0,b-l.width);e?(a.style.top=e+"px",
a.style.bottom=""):(a.style.top="",a.style.bottom=d+"px");a.style.left=l+"px"};
g.h.showControls=function(){};
g.h.Hm=function(){};
g.h.Wl=function(){return!1};g.w(f4,g.oL);f4.prototype.create=function(){};
f4.prototype.dj=function(){return!1};
f4.prototype.load=function(){this.player.hideControls();this.j.show()};
f4.prototype.unload=function(){this.player.showControls();this.j.hide()};g.nL("miniplayer",f4);})(_yt_player);
