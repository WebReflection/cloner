var cloner=function(e){"use strict";var t=function(t){try{return Reflect.ownKeys}catch(e){var r=t.getOwnPropertyNames,n=t.getOwnPropertySymbols;return function(e){return r(e).concat(n?n(e):[])}}}(Object),r=Object.create,o=Object.defineProperty,u=Object.getPrototypeOf,f=Object.getOwnPropertyDescriptor;return e.default=function n(c){var a=r(u(c));return t(c).forEach(function(e){var t=f(c,e),r=t.value;if(r)switch(!0){case r instanceof Date:t.value=new Date(+r);break;case r instanceof RegExp:t.value=new RegExp(r.source,r.flags);break;case r instanceof Object:"function"!=typeof r&&(t.value=n(r))}o(a,e,t)}),a},e}({}).default;