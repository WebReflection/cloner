var cloner=function(e){"use strict";var t=Reflect.ownKeys;const{create:c,defineProperty:n,getPrototypeOf:a,getOwnPropertyDescriptor:r}=Object,o=e=>{const s=c(a(e));return t(e).forEach(t=>{const c=r(e,t),{value:a}=c;if(a)switch(!0){case a instanceof Date:c.value=new Date(+a);break;case a instanceof RegExp:c.value=new RegExp(a.source,a.flags);break;case a instanceof Object:"function"!=typeof a&&(c.value=o(a))}n(s,t,c)}),s};return e.default=o,e}({}).default;