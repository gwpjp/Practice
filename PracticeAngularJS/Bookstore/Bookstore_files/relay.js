;(function(){var e=["https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js","http://external-production.codecademy.com/assets/jquery.expect.js"],t=function(e,n){if(n<e.length){var r=document.createElement("script");r.type="text/javascript",document.querySelector("body").appendChild(r),r.onload=function(){t(e,n+1)},r.src=e[n]}else window.parent.postMessage({location:window.location.href},"*")};t(e,0),window.addEventListener("message",function(e){if(e.data.event==="webSCT:request"){var t;try{window.eval(e.data.code)}catch(n){t=n.message}window.top.postMessage({event:"webSCT:response",error:t},"*")}})})()