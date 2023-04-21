"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[83],{8762:function(e,n,s){s.d(n,{z:function(){return d},Z:function(){return g}});var a=s(1413),r=s(4925),t=s(2791),c=s(1087),i=s(8506),l=s(184),o=["children","className","type","isLoading","disabled","href","style"],d=function(e){var n=e.children,s=e.className,t=void 0===s?"button":s,d=e.type,u=void 0===d?"button":d,m=e.isLoading,h=e.disabled,x=e.href,g=e.style,j=(0,r.Z)(e,o),v=m?(0,l.jsx)(i.g,{}):n;return""!==x&&"string"===typeof x?(0,l.jsx)(c.OL,{style:g,className:"button ".concat(t),to:x,children:v}):(0,l.jsx)("button",(0,a.Z)((0,a.Z)({type:u,disabled:h,className:"button ".concat(t)},j),{},{children:v}))},u=s(9439),m=s(5705),h=["on"],x=function(e){var n=e.on,s=(0,r.Z)(e,h),t=(0,m.U$)(s),c=(0,u.Z)(t,1)[0];return(0,l.jsx)("div",{className:"toggle",children:(0,l.jsxs)("label",{children:[(0,l.jsx)("input",(0,a.Z)((0,a.Z)({className:"hidden-input"},s),c)),(0,l.jsx)("div",(0,a.Z)((0,a.Z)({className:"toggle-container ".concat(n?"on":"")},s),{},{children:(0,l.jsx)("span",{className:"toggle-circle  ".concat(n?"on":"")})}))]})})},g=(0,t.memo)(x)},4099:function(e,n,s){s.d(n,{g:function(){return c}});var a=s(2791),r=s(184),t=function(e){var n=e.children;return(0,r.jsx)("div",{className:"field",children:n})},c=(0,a.memo)(t)},3244:function(e,n,s){s.d(n,{cw:function(){return c},w5:function(){return l},p7:function(){return d}});var a=s(2791),r=s(184),t=function(e){var n=e.children;return(0,r.jsx)("div",{className:"form-group",children:n})},c=(0,a.memo)(t),i=function(e){var n=e.children;return(0,r.jsx)("div",{className:"form-radio",children:n})},l=(0,a.memo)(i),o=function(e){var n=e.children;return(0,r.jsx)("div",{className:"form-row",children:n})},d=(0,a.memo)(o)},7904:function(e,n,s){s.d(n,{ZS:function(){return i},X6:function(){return t},Vp:function(){return l}});var a=s(2791),r=s(184),t=function(e){var n=e.children;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("h2",{className:"heading",children:n})})},c=function(e){var n=e.children,s=e.title;return(0,r.jsxs)("div",{className:"dashboard-heading",children:[(0,r.jsx)("h1",{className:"dashboard-title",children:n}),(0,r.jsx)("p",{className:"dashboard-desc",children:s})]})},i=(0,a.memo)(c),l=function(e){var n=e.children;return(0,r.jsx)("span",{className:"tag",children:n})}},882:function(e,n,s){s.d(n,{U:function(){return g},I:function(){return u}});var a=s(1413),r=s(9439),t=s(4925),c=s(2791),i=s(5705),l=s(184),o=["className","children"],d=function(e){e.className;var n=e.children,s=(0,t.Z)(e,o),c=(0,i.U$)(s),d=(0,r.Z)(c,2),u=d[0],m=d[1];return(0,l.jsxs)("div",{style:{width:"100%"},children:[(0,l.jsxs)("div",{className:"relative",children:[(0,l.jsx)("input",(0,a.Z)((0,a.Z)({className:"input ".concat(n?"input-active-eye":""," ").concat(m.touched&&m.error?"input-error":"")},s),u)),n]}),m.touched&&m.error?(0,l.jsxs)("span",{className:"error-massage",children:[(0,l.jsx)("i",{className:"fa-solid fa-circle-exclamation"})," ",m.error]}):null]})},u=(0,c.memo)(d),m=s(8506),h=["name","progress","onDeleteImage","messError","image","className","trash"],x=function(e){var n=e.name,s=e.progress,r=void 0===s?0:s,i=e.onDeleteImage,o=e.messError,d=e.image,u=void 0===d?"":d,x=e.className,g=e.trash,j=(0,t.Z)(e,h);return(0,l.jsx)("div",{className:"image-upload",children:(0,l.jsxs)("label",{className:"image-upload-label ".concat(x),children:[(0,l.jsx)("input",(0,a.Z)({name:n,className:"hidden-input"},j)),!u&&0===r&&(0,l.jsxs)("div",{className:"image-default ",children:[(0,l.jsx)("img",{src:"/img/img-upload.png",alt:"upload-img",className:""}),o?(0,l.jsxs)("span",{className:"error-massage",children:[(0,l.jsx)("i",{className:"fa-solid fa-circle-exclamation"})," ",o]}):(0,l.jsx)("p",{children:"Choose photo"})]}),0!==r&&!u&&(0,l.jsx)(m.g,{className:"img"}),u&&(0,l.jsxs)(c.Fragment,{children:[(0,l.jsx)("img",{src:u,className:"immage-load",alt:""}),g&&(0,l.jsx)("button",{type:"button",className:"btn-trash",onClick:i,children:(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-6 h-6",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})})]}),!u&&(0,l.jsx)("div",{className:"not-image",style:{width:"".concat(Math.ceil(r),"%")}})]})})},g=(0,c.memo)(x)},610:function(e,n,s){s.d(n,{_:function(){return c},A:function(){return i}});var a=s(2791),r=s(184),t=function(e){var n=e.children,s=e.htmlFor,a=void 0===s?"":s;return(0,r.jsx)("label",{htmlFor:a,className:"label",children:n})},c=(0,a.memo)(t),i=function(e){var n=e.children,s=e.className,a=void 0===s?"default":s;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("span",{className:"labelTable ".concat(a),children:n})})}},8506:function(e,n,s){s.d(n,{g:function(){return r}});s(2791);var a=s(184),r=function(e){var n=e.className;return(0,a.jsx)("div",{className:"loading ".concat(n)})}},9572:function(e,n,s){s.d(n,{Y:function(){return u}});var a=s(1413),r=s(9439),t=s(4925),c=s(2791),i=s(5705),l=s(184),o=["children","checked"],d=function(e){var n=e.children,s=e.checked,c=(0,t.Z)(e,o),d=(0,i.U$)(c),u=(0,r.Z)(d,1)[0];return(0,l.jsx)("div",{className:"radio",children:(0,l.jsxs)("label",{children:[(0,l.jsx)("input",(0,a.Z)((0,a.Z)({},c),u)),(0,l.jsxs)("div",{className:"radio-container",children:[(0,l.jsx)("div",{className:"content ".concat(s?"bg-green":"bg-gray"),children:(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),(0,l.jsx)("span",{children:n})]})]})})},u=(0,c.memo)(d)},5083:function(e,n,s){s.r(n),s.d(n,{categoryStatus:function(){return p}});var a=s(1413),r=(s(2791),s(5705)),t=s(8007),c=s(610),i=s(882),l=s(8762),o=s(3244),d=s(7904),u=s(4099),m=s(9572),h=s(333),x=s.n(h),g=s(9434),j=s(8193),v=s(9085),f=s(184),p={APPROVED:1,UNAPPROVED:2};n.default=function(e){var n=(0,g.I0)(),s=new Date,h=s.toLocaleDateString("vi-VI"),N=s.toLocaleTimeString();return(0,f.jsxs)("div",{className:"create-category",children:[(0,f.jsx)(d.ZS,{children:"Create category"}),(0,f.jsx)(r.J9,{initialValues:{name:"",slug:"",status:1},validationSchema:t.Ry({name:t.Z_().required(" "),slug:t.Z_().required(" ")}),onSubmit:function(e,s){var r=s.setSubmitting,t=s.resetForm,c=(0,a.Z)({},e);c.slug=x()(e.slug||e.name,{lower:!0}),c.status=Number(e.status),setTimeout((function(){n((0,j.KV)((0,a.Z)((0,a.Z)({},c),{},{createAt:N+" - "+h}))),r(!1),v.Am.success("Create new category successfully!"),t()}),500)},children:function(e){var n=e.isSubmitting,s=e.values.status;return(0,f.jsxs)(r.l0,{children:[(0,f.jsxs)(o.cw,{children:[(0,f.jsxs)(u.g,{children:[(0,f.jsx)(c._,{htmlFor:"name",children:"Name"}),(0,f.jsx)(i.I,{id:"name",type:"text",name:"name",placeholder:"Enter your category name"})]}),(0,f.jsxs)(u.g,{children:[(0,f.jsx)(c._,{htmlFor:"slug",children:"Slug"}),(0,f.jsx)(i.I,{id:"slug",type:"text",name:"slug",placeholder:"Enter your slug"})]})]}),(0,f.jsx)(o.cw,{children:(0,f.jsxs)(u.g,{children:[(0,f.jsx)(c._,{htmlFor:"status",children:"Status"}),(0,f.jsxs)(o.w5,{children:[(0,f.jsx)(m.Y,{type:"radio",name:"status",value:p.APPROVED,checked:Number(s)===p.APPROVED,children:"Approved"}),(0,f.jsx)(m.Y,{type:"radio",name:"status",value:p.UNAPPROVED,checked:Number(s)===p.UNAPPROVED,children:"Unapproved"})]})]})}),(0,f.jsx)(l.z,{type:"submit",className:"secondary button-loading",isLoading:n,disabled:n,children:"Add new category"})]})}})]})}}}]);
//# sourceMappingURL=83.71be3fae.chunk.js.map