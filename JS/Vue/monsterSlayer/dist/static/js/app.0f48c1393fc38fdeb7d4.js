webpackJsonp([1],{NHnr:function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=a("7+uW"),s={name:"App",data:function(){return{playerLife:100,monsterLife:100,play:!1,actions:[]}},methods:{startGame:function(){this.play=!0,this.playerLife=100,this.monsterLife=100,this.actions=[]},checkWin:function(){0===this.playerLife?(confirm("You lose."),this.give()):0===this.monsterLife&&(confirm("You win."),this.give())},attack:function(){var t=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());this.playerLife=Math.max(0,this.playerLife-=t),this.monsterLife=Math.max(0,this.monsterLife-=i),this.actions.push({monster:"MONSTER HITS PLAYER FOR "+t,player:"PLAYER HITS MONSTER FOR "+i}),this.checkWin()},special:function(){var t=Math.floor(10*Math.random()),i=Math.floor(15*Math.random());this.playerLife=Math.max(0,this.playerLife-=t),this.monsterLife=Math.max(0,this.monsterLife-=i),this.actions.push({monster:"MONSTER HITS PLAYER FOR "+t,player:"PLAYER HITS MONSTER FOR "+i}),this.checkWin()},heal:function(){var t=Math.floor(10*Math.random()),i=Math.floor(10*Math.random());this.playerLife=Math.min(100,this.playerLife+=t),this.monsterLife=Math.min(100,this.monsterLife+=i),this.actions.push({monster:"MONSTER HEALS FOR "+i,player:"PLAYER HEALS FOR "+t})},give:function(){this.play=!1,this.actions=[]}}},n={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{attrs:{id:"app"}},[t._m(0),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"bar"},[a("div",{staticClass:"life",style:{width:t.playerLife+"%"},attrs:{id:"playerLife"}},[t._v("\n        "+t._s(t.playerLife)+"\n      ")])]),t._v(" "),a("div",{staticClass:"bar"},[a("div",{staticClass:"life",style:{width:t.monsterLife+"%"},attrs:{id:"monsterLife"}},[t._v("\n        "+t._s(t.monsterLife)+"\n      ")])])]),t._v(" "),a("div",{staticClass:"container"},[t.play?t._e():a("button",{staticClass:"button",staticStyle:{"background-color":"greenyellow"},on:{click:t.startGame}},[t._v("\n      START NEW GAME\n    ")]),t._v(" "),t.play?a("button",{staticClass:"button",staticStyle:{"background-color":"red"},on:{click:t.attack}},[t._v("\n      ATTACK\n    ")]):t._e(),t._v(" "),t.play?a("button",{staticClass:"button",staticStyle:{"background-color":"orange"},on:{click:t.special}},[t._v("\n      SPECIAL ATTACK\n    ")]):t._e(),t._v(" "),t.play?a("button",{staticClass:"button",staticStyle:{"background-color":"greenyellow"},on:{click:t.heal}},[t._v("\n      HEAL\n    ")]):t._e(),t._v(" "),t.play?a("button",{staticClass:"button",staticStyle:{"background-color":"white"},on:{click:t.give}},[t._v("\n      GIVE UP\n    ")]):t._e()]),t._v(" "),a("div",{attrs:{id:"actions"}},t._l(t.actions,function(i,e){return a("div",{key:e},[a("div",{staticClass:"action",staticStyle:{"background-color":"pink",color:"red"}},[t._v("\n         "+t._s(i.monster)+"\n       ")]),t._v(" "),a("div",{staticClass:"action",staticStyle:{"background-color":"lightblue",color:"blue"}},[t._v("\n        "+t._s(i.player)+"\n      ")])])}))])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"container"},[i("div",{staticClass:"name"},[this._v("You")]),this._v(" "),i("div",{staticClass:"name"},[this._v("Monster")])])}]};var o=a("VU/8")(s,n,!1,function(t){a("wezo")},null,null).exports;e.a.config.productionTip=!1,new e.a({el:"#app",components:{App:o},template:"<App/>"})},wezo:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.0f48c1393fc38fdeb7d4.js.map