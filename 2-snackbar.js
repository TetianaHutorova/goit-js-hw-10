import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as o}from"./assets/vendor-BbbuE1sJ.js";const n=document.querySelector(".form");n.addEventListener("submit",m);function m(e){e.preventDefault();const{delay:t,state:r}=e.target.elements,i=r.value==="fulfilled",s=u(Number(t.value),i);l(s),e.currentTarget.reset()}function u(e,t){return new Promise((r,i)=>{setTimeout(()=>{t?r(`✅ Fulfilled promise in ${e}ms`):i(`❌ Rejected promise in ${e}ms`)},e)})}function l(e){e.then(t=>o.success({message:t,position:"topRight"})).catch(t=>o.error({message:t,position:"topRight"}))}
//# sourceMappingURL=2-snackbar.js.map