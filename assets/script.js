!function(){const t=document.currentScript?.getAttribute("data-domain");if(!t)return void console.warn("data-domain attribute is missing");function e(e,n=null,i=null){fetch("https://phinxer.com/api/event",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:t,referrer:document.referrer||null,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,event:e,data:n,extra_data:i})})}let n;function i(){n!==location.pathname&&(n=location.pathname,e("pageview",location.href))}"prerender"===document.visibilityState?document.addEventListener("visibilitychange",(function(){n||"visible"!==document.visibilityState||i()})):i();const o=window.history;if(o.pushState){const t=o.pushState;o.pushState=function(){t.apply(this,arguments),i()},window.addEventListener("popstate",i)}window.trackEvent=e}();