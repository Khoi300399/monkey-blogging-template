"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[24],{2024:function(e,t,s){s.r(t);var n=s(1413),a=s(9439),i=s(2791),l=s(5705),o=s(8007),r=s(7904),c=s(4099),u=s(610),d=s(882),m=s(9434),g=s(8762),h=s(3244),v=s(9572),f=s(138),x=s(276),p=s(9085),j=s(8193),y=s(333),b=s.n(y),N=s(7689),k=s(1087),_=s(3606),Z=s(184);t.default=function(e){var t,s=(0,N.s0)(),y=(0,k.lr)(),C=(0,a.Z)(y,1)[0].get("id"),E=(0,m.I0)(),I=(0,m.v9)((function(e){return e.postReducer})),S=I.categories,P=I.post,w=(0,m.v9)((function(e){return e.userReducer})).userInfo,F=(0,i.useState)((null===P||void 0===P?void 0:P.image)||""),R=(0,a.Z)(F,2),U=R[0],V=R[1],A=(0,i.useState)(0),D=(0,a.Z)(A,2),q=D[0],T=D[1],B=(0,i.useState)((null===P||void 0===P||null===(t=P.category)||void 0===t?void 0:t.name)||""),H=(0,a.Z)(B,2),J=H[0],Y=H[1],L={title:(null===P||void 0===P?void 0:P.title)||"",slug:(null===P||void 0===P?void 0:P.slug)||"",author:(null===P||void 0===P?void 0:P.author)||"",status:(null===P||void 0===P?void 0:P.status)||0,category:(null===P||void 0===P?void 0:P.category)||{},imageName:(null===P||void 0===P?void 0:P.imageName)||"",hot:(null===P||void 0===P?void 0:P.hot)||!1,content:(null===P||void 0===P?void 0:P.content)||"",categoryId:""};(0,i.useEffect)((function(){E((0,j.BH)())}),[E]);var z=(0,i.useCallback)((function(e){var t=(0,x.cF)(),s=(0,x.iH)(t,"images/"+e.name),n=(0,x.B0)(s,e);n.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes*100;switch(T(t),e.state){case"paused":console.log("Upload is paused");break;case"running":console.log("Upload is running");break;default:console.log("Nothing at all")}}),(function(e){console.log("Error")}),(function(){(0,x.Jt)(n.snapshot.ref).then((function(e){V(e)}))}))}),[]),G=(0,i.useCallback)((function(e){var t=(0,x.cF)(),s=(0,x.iH)(t,"images/"+e);(0,x.oq)(s).then((function(){p.Am.success("Remove image successfully!"),V(""),T(0)})).catch((function(e){p.Am.error("Can not delete image!")}))}),[]);return(0,Z.jsxs)("div",{className:"create-post",children:[(0,Z.jsx)(r.ZS,{title:"Update your post ID: ".concat(C),children:"Update post"}),(0,Z.jsx)(l.J9,{initialValues:L,validationSchema:o.Ry({title:o.Z_().required("Please enter title!"),category:o.Ry({name:o.Z_().required("Please select a category!")}),imageName:o.Z_().required("Please choose a image!")}),onSubmit:function(e,t){var a=t.setSubmitting,i=t.resetForm,l=(0,n.Z)({user:w,image:U},e);l.slug=b()(e.slug||e.title,{lower:!0}),l.status=Number(e.status),l.author=w.name,console.log("cloneValues",l),setTimeout((function(){E((0,j.n5)(C,(0,n.Z)({},l))),a(!1),p.Am.success("Update post successfully!"),V((function(e){return""})),T((function(e){return 0})),Y(""),i(),s("/post-manage")}),500)},children:function(e){var t,s,a=e.isSubmitting,i=e.values,o=e.setFieldValue,m=e.errors,x=i.status,p=i.hot;return(0,Z.jsxs)(l.l0,{children:[(0,Z.jsxs)(h.cw,{children:[(0,Z.jsxs)(c.g,{children:[(0,Z.jsx)(u._,{htmlFor:"title",children:"Title"}),(0,Z.jsx)(d.I,{id:"title",type:"text",name:"title",placeholder:"Enter your title"})]}),(0,Z.jsxs)(c.g,{children:[(0,Z.jsx)(u._,{htmlFor:"slug",children:"Slug"}),(0,Z.jsx)(d.I,{id:"slug",type:"text",name:"slug",placeholder:"Enter your slug"})]})]}),(0,Z.jsxs)(h.cw,{children:[(0,Z.jsxs)(c.g,{children:[(0,Z.jsx)(u._,{children:"Image"}),(0,Z.jsx)(d.U,{trash:!!U,onDeleteImage:function(){G(i.imageName)},image:U,name:"image",type:"file",progress:q,onChange:function(e){if(e.target.files&&e.target.files.length>0){var t=e.target.files[0];if(!t)return;o("imageName",t.name),z(t)}},messError:m.imageName})]}),(0,Z.jsxs)(c.g,{children:[(0,Z.jsx)(u._,{children:"Category"}),(0,Z.jsxs)(f.Lt,{children:[(0,Z.jsx)(f.Ph,{placeholder:J||"Please select a category"}),(0,Z.jsx)(f.aV,{children:null===S||void 0===S?void 0:S.map((function(e){return(0,Z.jsx)(f.Wx,{onClick:function(){o("category",(0,n.Z)({},e)),o("categoryId",e.id),Y(e.name||"")},children:e.name},e.id)}))})]}),(null===(t=m.category)||void 0===t?void 0:t.name)&&(0,Z.jsxs)("span",{className:"error-massage",children:[(0,Z.jsx)("i",{className:"fa-solid fa-circle-exclamation"})," ",null===(s=m.category)||void 0===s?void 0:s.name]}),!!J&&(0,Z.jsx)(r.Vp,{children:J})]})]}),(0,Z.jsxs)(h.p7,{children:[(0,Z.jsx)(u._,{children:"Content"}),(0,Z.jsx)(_.m,{control:"tiny-mce",name:"content"})]}),(0,Z.jsxs)(h.cw,{children:[(0,Z.jsxs)(c.g,{children:[(0,Z.jsx)(u._,{children:"Feature post"}),(0,Z.jsx)(g.Z,{type:"checkbox",name:"hot",on:p})]}),(0,Z.jsxs)(c.g,{children:[(0,Z.jsx)(u._,{htmlFor:"status",children:"Status"}),(0,Z.jsxs)(h.w5,{children:[(0,Z.jsx)(v.Y,{type:"radio",name:"status",value:1,checked:Number(x)===j.cf.APPROVED,children:"Approved"}),(0,Z.jsx)(v.Y,{type:"radio",name:"status",value:2,checked:Number(x)===j.cf.PENDING,children:"Pending"}),(0,Z.jsx)(v.Y,{type:"radio",name:"status",value:3,checked:Number(x)===j.cf.REJECTED,children:"Reject"})]})]})]}),(0,Z.jsx)(g.z,{type:"submit",className:"secondary button-loading",height:56,isLoading:a,disabled:a,children:"Update"})]})}})]})}}}]);
//# sourceMappingURL=24.512f3be8.chunk.js.map