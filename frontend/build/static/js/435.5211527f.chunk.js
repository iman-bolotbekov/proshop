"use strict";(self.webpackChunk_99_typescript_template=self.webpackChunk_99_typescript_template||[]).push([[435],{8316:function(e,r,n){n(2791);var a=n(184);r.Z=function(e){var r=e.value,n=e.text,t=void 0===n?"":n,i=e.color,s=void 0===i?"#f8e825":i;return(0,a.jsxs)("div",{className:"rating py-2",children:[(0,a.jsx)("span",{children:(0,a.jsx)("i",{style:{color:s},className:r>=1?"fas fa-star":r>=.5?"fas fa-star-half-alt":"far fa-star"})}),(0,a.jsx)("span",{children:(0,a.jsx)("i",{style:{color:s},className:r>=2?"fas fa-star":r>=1.5?"fas fa-star-half-alt":"far fa-star"})}),(0,a.jsx)("span",{children:(0,a.jsx)("i",{style:{color:s},className:r>=3?"fas fa-star":r>=2.5?"fas fa-star-half-alt":"far fa-star"})}),(0,a.jsx)("span",{children:(0,a.jsx)("i",{style:{color:s},className:r>=4?"fas fa-star":r>=3.5?"fas fa-star-half-alt":"far fa-star"})}),(0,a.jsx)("span",{children:(0,a.jsx)("i",{style:{color:s},className:r>=5?"fas fa-star":r>=4.5?"fas fa-star-half-alt":"far fa-star"})}),(0,a.jsx)("span",{children:t&&t})]})}},2752:function(e,r,n){var a=n(1413),t=n(5987),i=(n(2791),n(184)),s=["children","className"];r.Z=function(e){var r=e.children,n=e.className,o=(0,t.Z)(e,s),l="inline-block border border-gray-300 rounded-lg p-2 ".concat(n);return(0,i.jsx)("div",(0,a.Z)((0,a.Z)({className:l},o),{},{children:r}))}},3096:function(e,r,n){n(2791);var a=n(828),t=n(184);r.Z=function(){return(0,t.jsx)("div",{className:"flex justify-center my-10",children:(0,t.jsx)(a.Cd,{className:"animate-spin text-6xl"})})}},1585:function(e,r,n){n.r(r),n.d(r,{default:function(){return Z}});var a=n(9439),t=n(2791),i=n(4590),s=n(7689),o=n(1087),l=n(8316),c=n(8649),d=n(8660),u=n(184),m=function(e){var r=e.increament,n=e.decreament,a=e.qty,t=e.countInStock;return(0,u.jsxs)("div",{className:"border rounded-lg",children:[(0,u.jsx)("button",{className:"p-3 px-5",onClick:function(){return n()},disabled:1===a,children:"-"}),(0,u.jsx)("span",{className:"border-x p-3 px-5",children:a}),(0,u.jsx)("button",{className:"p-3 px-5",onClick:function(){return r()},disabled:a===t,children:"+"})]})},f=n(3096),h=n(4164),v=n(2752),p="Modal_backdrop__KyJXZ",x="Modal_modal__xw6Go",g="Modal_header__7Gkfz",y="Modal_content__ikUAg",j=function(e){return(0,u.jsx)("div",{className:p,onClick:e.onConfirm})},N=function(e){return(0,u.jsxs)(v.Z,{className:x,children:[(0,u.jsx)("header",{className:g,children:(0,u.jsx)("h2",{children:e.title})}),(0,u.jsx)("div",{className:y,children:e.children})]})},b=function(e){return(0,u.jsxs)(t.Fragment,{children:[h.createPortal((0,u.jsx)(j,{onConfirm:e.onConfirm}),document.getElementById("backdrop-root")),h.createPortal((0,u.jsx)(N,{onConfirm:e.onConfirm,title:e.title,message:e.message,children:e.children}),document.getElementById("overlay-root"))]})},w=function(e){var r=e.value,n=e.onChange,a=e.name,t=function(e){var r=Number(e.target.value);n(r)},i=function(e){return r>=e};return(0,u.jsx)("div",{className:"rating rating-lg",children:[2,4,6,8,10].map((function(e){return(0,u.jsx)("input",{type:"radio",name:a,className:"mask mask-star-2 ".concat(i(e)?"bg-orange-400":"bg-orange-200"),checked:i(e),value:e,onChange:t},e)}))})},_=n(9085),q=n(5705),C=n(1124),Z=function(){var e,r=(0,t.useState)(!1),n=(0,a.Z)(r,2),h=n[0],v=n[1],p=(0,t.useState)(0),x=(0,a.Z)(p,2),g=x[0],y=x[1],j=(0,s.UO)(),N=(0,s.s0)(),Z=(0,c.o)(),k=Z.increamentQty,I=Z.decreamentQty,P=Z.addToCart,O=Z.resetQty,S=(0,d.C)((function(e){return e.ui})).qty,R=j.productId?parseInt(j.productId,10):0,E=(0,i.lZ)(R),A=E.data,M=E.isLoading,z=(0,i.kF)(),G=(0,a.Z)(z,1)[0],F=function(){v(!h)},T=(0,q.TA)({initialValues:{comment:"",rating:g},onSubmit:function(e){G({rating:g,comment:e.comment,productId:R}).unwrap().then((function(e){_.Am.success("Thank you to leave reviews!"),v(!1)})).catch((function(e){_.Am.error("Didn't leaved reviews, error occured!"),console.log("Error:",e)}))},validationSchema:C.WG}),W=T.values,B=T.handleChange,H=T.handleSubmit;return(0,u.jsxs)(u.Fragment,{children:[h&&(0,u.jsx)(b,{title:"How would you rate this product?",onConfirm:F,children:(0,u.jsxs)("form",{onSubmit:H,children:[(0,u.jsx)(w,{name:"rating",value:g,onChange:y}),(0,u.jsx)("div",{className:"input-box py-4 ",children:(0,u.jsx)("textarea",{name:"comment",className:"h-20 placeholder:p-4 outline",placeholder:"Type sometings...",value:W.comment,onChange:B})}),(0,u.jsx)("button",{className:"button float-right",children:"Continue"}),(0,u.jsx)("button",{className:"button float-right mx-4",onClick:function(){return v(!1)},children:"Cancel"})]})}),M?(0,u.jsx)(f.Z,{}):(0,u.jsxs)("div",{className:"py-10 px-4",children:[(0,u.jsx)(o.rU,{to:"..",className:"uppercase p-4 px-6 bg-white hover:bg-gray-200",children:"Go back"}),(0,u.jsx)("button",{className:"uppercase p-4 px-6 bg-white hover:bg-gray-200",onClick:F,children:"Leave Rating"}),(0,u.jsxs)("div",{className:"grid grid-cols-1 grid-rows-1 lg:grid-cols-2 my-6",children:[(0,u.jsx)("div",{children:(0,u.jsx)("img",{src:null===A||void 0===A?void 0:A.image_url,alt:"".concat(null===A||void 0===A?void 0:A.name)})}),(0,u.jsxs)("div",{className:"px-4",children:[(0,u.jsx)("h2",{className:"title",children:null===A||void 0===A?void 0:A.name}),(0,u.jsx)(l.Z,{value:Math.ceil(null!==(e=null===A||void 0===A?void 0:A.rating)&&void 0!==e?e:0),text:"".concat(null===A||void 0===A?void 0:A.numReviews," reviews")}),(0,u.jsxs)("p",{className:"text-xl text-gray-600 font-medium py-4",children:["$",null===A||void 0===A?void 0:A.price]}),(0,u.jsx)("p",{className:"pb-4",children:null===A||void 0===A?void 0:A.description}),(0,u.jsxs)("div",{className:"flex flex-row space-x-6 items-center",children:[(0,u.jsx)("button",{className:"button",onClick:function(){var e,r,n,a,t;P({countInStock:null!==(e=null===A||void 0===A?void 0:A.countInStock)&&void 0!==e?e:0,qty:S,product:null!==(r=null===A||void 0===A?void 0:A.id)&&void 0!==r?r:0,price:null!==(n=null===A||void 0===A?void 0:A.price)&&void 0!==n?n:"",name:null!==(a=null===A||void 0===A?void 0:A.name)&&void 0!==a?a:"",image:null!==(t=null===A||void 0===A?void 0:A.image_url)&&void 0!==t?t:""}),O(),N("/cart")},children:"Add to Cart"}),(null===A||void 0===A?void 0:A.countInStock)&&A.countInStock>0&&(0,u.jsx)(m,{increament:k,decreament:I,qty:S,countInStock:null===A||void 0===A?void 0:A.countInStock})]})]})]}),(0,u.jsx)("h2",{className:"title py-4",children:"REVIEWS"}),null!==A&&void 0!==A&&A.reviews.length&&A.reviews.length>0?null===A||void 0===A?void 0:A.reviews.map((function(e){return(0,u.jsxs)("div",{className:"flex flex-col space-y-1 shadow-md rounded-md p-4 mb-4",children:[(0,u.jsx)("h2",{className:"font-bold text-lg",children:e.name}),(0,u.jsxs)("div",{className:"flex flex-row space-x-3 items-center",children:[(0,u.jsx)("span",{children:(0,u.jsx)(l.Z,{value:Math.ceil(e.rating/2)})}),(0,u.jsx)("span",{className:"font-mono",children:e.createdAt.substring(0,10)})]}),(0,u.jsx)("p",{className:"font-serif",children:e.comment})]},e.id)})):(0,u.jsx)("h2",{children:"No reviews"})]})]})}},1124:function(e,r,n){n.d(r,{O4:function(){return t},Od:function(){return l},WG:function(){return d},X0:function(){return c},fE:function(){return o},nm:function(){return i},vF:function(){return u},yS:function(){return s}});var a=n(6727),t=a.Ry().shape({email:a.Z_().required("Email is required").email("Invalide email"),password:a.Z_().required("Password is required").min(8,"Password min 8")}),i=a.Ry().shape({name:a.Z_().required("Name is required"),email:a.Z_().required("Email is required").email("Invalide email"),password:a.Z_().required("Password is required").min(8,"Password min 8"),rePassword:a.Z_().required("Confirm Password is required").oneOf([a.iH("password")],"Passwords must match")}),s=a.Ry().shape({address:a.Z_().required("Address is required"),city:a.Z_().required("City is required"),postalCode:a.Rx().required("Postal Code is required"),country:a.Z_().required("Country is required")}),o=a.Ry().shape({paymentMethod:a.Z_().required("Payment method is required")}),l=a.Ry().shape({name:a.Z_(),email:a.Z_().email("Invalide email"),password:a.Z_().min(8,"Password min 8"),rePassword:a.Z_().oneOf([a.iH("password")],"Passwords must match")}),c=a.Ry().shape({name:a.Z_(),email:a.Z_().email("Invalide email"),isAdmin:a.O7()}),d=a.Ry().shape({rating:a.Rx().required("Rating is required!"),comment:a.Z_()}),u=a.Ry().shape({name:a.Z_().required("Name is required"),category:a.Z_().required("Category is required"),description:a.Z_().required("Description is required"),price:a.Rx().required("Price is required"),countInStock:a.Rx().required("Count in stock is required"),brand:a.Z_().required("Brand is required"),image:a.Z_().required("Image is required")})},9983:function(e,r,n){n.d(r,{w_:function(){return c}});var a=n(2791),t={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=a.createContext&&a.createContext(t),s=function(){return s=Object.assign||function(e){for(var r,n=1,a=arguments.length;n<a;n++)for(var t in r=arguments[n])Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t]);return e},s.apply(this,arguments)},o=function(e,r){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&r.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var t=0;for(a=Object.getOwnPropertySymbols(e);t<a.length;t++)r.indexOf(a[t])<0&&Object.prototype.propertyIsEnumerable.call(e,a[t])&&(n[a[t]]=e[a[t]])}return n};function l(e){return e&&e.map((function(e,r){return a.createElement(e.tag,s({key:r},e.attr),l(e.child))}))}function c(e){return function(r){return a.createElement(d,s({attr:s({},e.attr)},r),l(e.child))}}function d(e){var r=function(r){var n,t=e.attr,i=e.size,l=e.title,c=o(e,["attr","size","title"]),d=i||r.size||"1em";return r.className&&(n=r.className),e.className&&(n=(n?n+" ":"")+e.className),a.createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,t,c,{className:n,style:s(s({color:e.color||r.color},r.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),l&&a.createElement("title",null,l),e.children)};return void 0!==i?a.createElement(i.Consumer,null,(function(e){return r(e)})):r(t)}}}]);
//# sourceMappingURL=435.5211527f.chunk.js.map