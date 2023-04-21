"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[216],{3216:function(e,t,s){s.r(t);var n=s(1413),a=s(9439),r=s(2791),i=s(5705),c=s(8007),l=s(7904),o=s(4099),u=s(610),d=s(882),m=s(9434),g=s(8762),h=s(3244),f=s(9572),x=s(138),j=s(276),p=s(9085),y=s(8193),v=s(333),b=s.n(v),N=s(3606),k=s(184);t.default=function(e){var t=new Date,s=t.toLocaleDateString("vi-VI"),v=t.toLocaleTimeString(),_=(0,m.I0)(),w=(0,m.v9)((function(e){return e.postReducer})).categories,C=(0,m.v9)((function(e){return e.userReducer})).userInfo,S=(0,r.useState)(""),Z=(0,a.Z)(S,2),I=Z[0],E=Z[1],P=(0,r.useState)(0),F=(0,a.Z)(P,2),R=F[0],A=F[1],D=(0,r.useState)(void 0),V=(0,a.Z)(D,2),T=V[0],q=V[1];(0,r.useEffect)((function(){_((0,y.BH)())}),[_]);var L=(0,r.useCallback)((function(e){var t=(0,j.cF)(),s=(0,j.iH)(t,"images/"+e.name),n=(0,j.B0)(s,e);n.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;switch(A(t),e.state){case"paused":console.log("Upload is paused");break;case"running":console.log("Upload is running");break;default:console.log("Nothing at all")}}),(function(e){console.log("Error")}),(function(){(0,j.Jt)(n.snapshot.ref).then((function(e){E(e)}))}))}),[]),B=(0,r.useCallback)((function(e){var t=(0,j.cF)(),s=(0,j.iH)(t,"images/"+e);(0,j.oq)(s).then((function(){p.Am.success("Remove image successfully!"),E(""),A(0)})).catch((function(e){p.Am.error("Can not delete image!")}))}),[]);return(0,k.jsxs)("div",{className:"create-post",children:[(0,k.jsx)(l.ZS,{children:"Create new post"}),(0,k.jsx)(i.J9,{initialValues:{title:"",slug:"",author:"",status:0,category:{},imageName:"",hot:!1,content:"",categoryId:""},validationSchema:c.Ry({title:c.Z_().required("Please enter title!"),category:c.Ry({name:c.Z_().required("Please select a category!")}),imageName:c.Z_().required("Please choose a image!")}),onSubmit:function(e,t){var a=t.setSubmitting,r=t.resetForm,i=(0,n.Z)({user:C,userId:(null===C||void 0===C?void 0:C.id)||"",image:I},e);i.slug=b()(e.slug||e.title,{lower:!0}),i.status=Number(e.status),i.author=C.name,setTimeout((function(){_((0,y.f1)((0,n.Z)((0,n.Z)({},i),{},{createAt:v+" - "+s}))),a(!1),p.Am.success("Create new post successfully!"),E((function(e){return""})),A((function(e){return 0})),q(""),r()}),500)},children:function(e){var t,s,a=e.isSubmitting,r=e.values,c=e.setFieldValue,m=e.errors,j=r.status,p=r.hot;return(0,k.jsxs)(i.l0,{children:[(0,k.jsxs)(h.cw,{children:[(0,k.jsxs)(o.g,{children:[(0,k.jsx)(u._,{htmlFor:"title",children:"Title"}),(0,k.jsx)(d.I,{id:"title",type:"text",name:"title",placeholder:"Enter your title"})]}),(0,k.jsxs)(o.g,{children:[(0,k.jsx)(u._,{htmlFor:"slug",children:"Slug"}),(0,k.jsx)(d.I,{id:"slug",type:"text",name:"slug",placeholder:"Enter your slug"})]})]}),(0,k.jsxs)(h.cw,{children:[(0,k.jsxs)(o.g,{children:[(0,k.jsx)(u._,{children:"Image"}),(0,k.jsx)(d.U,{onDeleteImage:function(){B(r.imageName)},image:I,name:"image",type:"file",progress:R,onChange:function(e){if(e.target.files&&e.target.files.length>0){var t=e.target.files[0];if(!t)return;c("imageName",t.name),L(t)}},messError:m.imageName})]}),(0,k.jsxs)(o.g,{children:[(0,k.jsx)(u._,{children:"Category"}),(0,k.jsxs)(x.Lt,{children:[(0,k.jsx)(x.Ph,{placeholder:T||"Please select a category"}),(0,k.jsx)(x.aV,{children:null===w||void 0===w?void 0:w.map((function(e){return(0,k.jsx)(x.Wx,{onClick:function(){c("category",(0,n.Z)({},e)),c("categoryId",e.id),q(e.name)},children:e.name},e.id)}))})]}),(null===(t=m.category)||void 0===t?void 0:t.name)&&(0,k.jsxs)("span",{className:"error-massage",children:[(0,k.jsx)("i",{className:"fa-solid fa-circle-exclamation"})," ",null===(s=m.category)||void 0===s?void 0:s.name]}),!!T&&(0,k.jsx)(l.Vp,{children:T})]})]}),(0,k.jsxs)(h.p7,{children:[(0,k.jsx)(u._,{children:"Content"}),(0,k.jsx)(N.m,{control:"tiny-mce",name:"content"})]}),(0,k.jsxs)(h.cw,{children:[(0,k.jsxs)(o.g,{children:[(0,k.jsx)(u._,{children:"Feature post"}),(0,k.jsx)(g.Z,{type:"checkbox",name:"hot",on:p})]}),(0,k.jsxs)(o.g,{children:[(0,k.jsx)(u._,{htmlFor:"status",children:"Status"}),(0,k.jsxs)(h.w5,{children:[(0,k.jsx)(f.Y,{type:"radio",name:"status",value:1,checked:Number(j)===y.cf.APPROVED,children:"Approved"}),(0,k.jsx)(f.Y,{type:"radio",name:"status",value:2,checked:Number(j)===y.cf.PENDING,children:"Pending"}),(0,k.jsx)(f.Y,{type:"radio",name:"status",value:3,checked:Number(j)===y.cf.REJECTED,children:"Reject"})]})]})]}),(0,k.jsx)(g.z,{type:"submit",className:"secondary button-loading",height:56,isLoading:a,disabled:a,children:"Add new post"})]})}})]})}}}]);
//# sourceMappingURL=216.777cb128.chunk.js.map