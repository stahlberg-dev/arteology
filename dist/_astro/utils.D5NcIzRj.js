function r(u,i){let l=!1,t=null,e=null;return function s(...n){if(l){t=n,e=this;return}u.apply(this,n),l=!0,setTimeout(()=>{l=!1,t&&(s.apply(e,t),t=null,e=null)},i)}}export{r as t};
