"use strict";(self.webpackChunk_99_typescript_template=self.webpackChunk_99_typescript_template||[]).push([[585],{8316:function(e,n,a){a(2791);var s=a(184);n.Z=function(e){var n=e.value,a=e.text,t=void 0===a?"":a,l=e.color,r=void 0===l?"#f8e825":l;return(0,s.jsxs)("div",{className:"rating py-2",children:[(0,s.jsx)("span",{children:(0,s.jsx)("i",{style:{color:r},className:n>=1?"fas fa-star":n>=.5?"fas fa-star-half-alt":"far fa-star"})}),(0,s.jsx)("span",{children:(0,s.jsx)("i",{style:{color:r},className:n>=2?"fas fa-star":n>=1.5?"fas fa-star-half-alt":"far fa-star"})}),(0,s.jsx)("span",{children:(0,s.jsx)("i",{style:{color:r},className:n>=3?"fas fa-star":n>=2.5?"fas fa-star-half-alt":"far fa-star"})}),(0,s.jsx)("span",{children:(0,s.jsx)("i",{style:{color:r},className:n>=4?"fas fa-star":n>=3.5?"fas fa-star-half-alt":"far fa-star"})}),(0,s.jsx)("span",{children:(0,s.jsx)("i",{style:{color:r},className:n>=5?"fas fa-star":n>=4.5?"fas fa-star-half-alt":"far fa-star"})}),(0,s.jsx)("span",{children:t&&t})]})}},3096:function(e,n,a){a(2791);var s=a(828),t=a(184);n.Z=function(){return(0,t.jsx)("div",{className:"flex justify-center my-10",children:(0,t.jsx)(s.Cd,{className:"animate-spin text-6xl"})})}},1585:function(e,n,a){a.r(n),a.d(n,{default:function(){return I}});var s=a(9439),t=a(2791),l=a(4590),r=a(7689),i=a(1087),o=a(8316),c=a(8649),d=a(8660),u=a(184),m=function(e){var n=e.increament,a=e.decreament,s=e.qty,t=e.countInStock;return(0,u.jsxs)("div",{className:"border rounded-lg",children:[(0,u.jsx)("button",{className:"p-3 px-5",onClick:function(){return a()},disabled:1===s,children:"-"}),(0,u.jsx)("span",{className:"border-x p-3 px-5",children:s}),(0,u.jsx)("button",{className:"p-3 px-5",onClick:function(){return n()},disabled:s===t,children:"+"})]})},h=a(3096),x=a(4164),f=a(2752),v="Modal_backdrop__XJC8y",p="Modal_modal__-rH8A",j="Modal_header__fr2Jy",g="Modal_content__i7XdU",N=function(e){return(0,u.jsx)("div",{className:v,onClick:e.onConfirm})},y=function(e){return(0,u.jsxs)(f.Z,{className:p,children:[(0,u.jsx)("header",{className:j,children:(0,u.jsx)("h2",{children:e.title})}),(0,u.jsx)("div",{className:g,children:e.children})]})},b=function(e){return(0,u.jsxs)(t.Fragment,{children:[x.createPortal((0,u.jsx)(N,{onConfirm:e.onConfirm}),document.getElementById("backdrop-root")),x.createPortal((0,u.jsx)(y,{onConfirm:e.onConfirm,title:e.title,message:e.message,children:e.children}),document.getElementById("overlay-root"))]})},C=function(e){var n=e.value,a=e.onChange,s=e.name,t=function(e){var n=Number(e.target.value);a(n)},l=function(e){return n>=e};return(0,u.jsx)("div",{className:"rating rating-lg",children:[2,4,6,8,10].map((function(e){return(0,u.jsx)("input",{type:"radio",name:s,className:"mask mask-star-2 ".concat(l(e)?"bg-orange-400":"bg-orange-200"),checked:l(e),value:e,onChange:t},e)}))})},k=a(9085),_=a(5705),w=a(859),I=function(){var e,n=(0,t.useState)(!1),a=(0,s.Z)(n,2),x=a[0],f=a[1],v=(0,t.useState)(0),p=(0,s.Z)(v,2),j=p[0],g=p[1],N=(0,r.UO)(),y=(0,r.s0)(),I=(0,c.o)(),S=I.increamentQty,Z=I.decreamentQty,A=I.addToCart,M=I.resetQty,E=(0,d.C)((function(e){return e.ui})).qty,q=N.productId?parseInt(N.productId,10):0,T=(0,l.lZ)(q),F=T.data,Q=T.isLoading,R=(0,l.kF)(),U=(0,s.Z)(R,1)[0],B=function(){f(!x)},G=(0,_.TA)({initialValues:{comment:"",rating:j},onSubmit:function(e){U({rating:j,comment:e.comment,productId:q}).unwrap().then((function(e){k.Am.success("Thank you to leave reviews!"),f(!1)})).catch((function(e){k.Am.error("Didn't leaved reviews, error occured!"),console.log("Error:",e)}))},validationSchema:w.WG}),H=G.values,J=G.handleChange,L=G.handleSubmit;return(0,u.jsxs)(u.Fragment,{children:[x&&(0,u.jsx)(b,{title:"How would you rate this product?",onConfirm:B,children:(0,u.jsxs)("form",{onSubmit:L,children:[(0,u.jsx)(C,{name:"rating",value:j,onChange:g}),(0,u.jsx)("div",{className:"input-box py-4 ",children:(0,u.jsx)("textarea",{name:"comment",className:"h-20 placeholder:p-4 outline",placeholder:"Type sometings...",value:H.comment,onChange:J})}),(0,u.jsx)("button",{className:"button float-right",children:"Continue"}),(0,u.jsx)("button",{className:"button float-right mx-4",onClick:function(){return f(!1)},children:"Cancel"})]})}),Q?(0,u.jsx)(h.Z,{}):(0,u.jsxs)("div",{className:"py-10 px-4",children:[(0,u.jsx)(i.rU,{to:"..",className:"uppercase p-4 px-6 bg-white hover:bg-gray-200",children:"Go back"}),(0,u.jsx)("button",{className:"uppercase p-4 px-6 bg-white hover:bg-gray-200",onClick:B,children:"Leave Rating"}),(0,u.jsxs)("div",{className:"grid grid-cols-1 grid-rows-1 lg:grid-cols-2 my-6",children:[(0,u.jsx)("div",{children:(0,u.jsx)("img",{src:null===F||void 0===F?void 0:F.image_url,alt:"".concat(null===F||void 0===F?void 0:F.name)})}),(0,u.jsxs)("div",{className:"px-4",children:[(0,u.jsx)("h2",{className:"title",children:null===F||void 0===F?void 0:F.name}),(0,u.jsx)(o.Z,{value:Math.ceil(null!==(e=null===F||void 0===F?void 0:F.rating)&&void 0!==e?e:0),text:"".concat(null===F||void 0===F?void 0:F.numReviews," reviews")}),(0,u.jsxs)("p",{className:"text-xl text-gray-600 font-medium py-4",children:["$",null===F||void 0===F?void 0:F.price]}),(0,u.jsx)("p",{className:"pb-4",children:null===F||void 0===F?void 0:F.description}),(0,u.jsxs)("div",{className:"flex flex-row space-x-6 items-center",children:[(0,u.jsx)("button",{className:"button",onClick:function(){var e,n,a,s,t;A({countInStock:null!==(e=null===F||void 0===F?void 0:F.countInStock)&&void 0!==e?e:0,qty:E,product:null!==(n=null===F||void 0===F?void 0:F.id)&&void 0!==n?n:0,price:null!==(a=null===F||void 0===F?void 0:F.price)&&void 0!==a?a:"",name:null!==(s=null===F||void 0===F?void 0:F.name)&&void 0!==s?s:"",image:null!==(t=null===F||void 0===F?void 0:F.image_url)&&void 0!==t?t:""}),M(),y("/cart")},children:"Add to Cart"}),(null===F||void 0===F?void 0:F.countInStock)&&(0,u.jsx)(m,{increament:S,decreament:Z,qty:E,countInStock:null===F||void 0===F?void 0:F.countInStock})]})]})]}),(0,u.jsx)("h2",{className:"title py-4",children:"REVIEWS"}),null!==F&&void 0!==F&&F.reviews.length&&F.reviews.length>0?null===F||void 0===F?void 0:F.reviews.map((function(e){return(0,u.jsxs)("div",{className:"flex flex-col space-y-1 shadow-md rounded-md p-4 mb-4",children:[(0,u.jsx)("h2",{className:"font-bold text-lg",children:e.name}),(0,u.jsxs)("div",{className:"flex flex-row space-x-3 items-center",children:[(0,u.jsx)("span",{children:(0,u.jsx)(o.Z,{value:Math.ceil(e.rating/2)})}),(0,u.jsx)("span",{className:"font-mono",children:e.createdAt.substring(0,10)})]}),(0,u.jsx)("p",{className:"font-serif",children:e.comment})]},e.id)})):(0,u.jsx)("h2",{children:"No reviews"})]})]})}}}]);
//# sourceMappingURL=585.9110db04.chunk.js.map