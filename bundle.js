!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=11)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.markButtonAsActive=function(e){e.parentElement.getElementsByClassName("active")[0].classList.remove("active"),e.classList.add("active")}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.resizeCanvasToDisplaySize=function(e,r){r=r||1;var t=e.clientWidth*r|0,n=e.clientHeight*r|0;return(e.width!==t||e.height!==n)&&(e.width=t,e.height=n,!0)}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.convertHexToClColor=function(e,t){e=e.replace("#","");var n=parseInt(e.substring(0,2),16),o=parseInt(e.substring(2,4),16),a=parseInt(e.substring(4,6),16);return r.convertRGBAToClColor(n,o,a,t)},r.convertRGBAToClColor=function(e,r,t,n){return{red:e/255,green:r/255,blue:t/255,opacity:n}}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(9),o=t(8);r.createProgramFromScripts=function(e,r,t){var a=o.createShader(e,e.VERTEX_SHADER,r),i=o.createShader(e,e.FRAGMENT_SHADER,t);return n.createProgram(e,a,i)}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.getGLRenderingContext=function(e){try{return e.getContext("webgl")||e.getContext("experimental-webgl")}catch(e){throw new Error("Unable to initialize WebGL. Your browser may not support it.")}}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});r.gradientRectanglesShadersSource={fragment:"\n    precision mediump float;\n    varying vec4 v_color;\n    \n    void main() {\n        gl_FragColor = v_color;\n    }\n",vertex:"\n    attribute vec2 a_position;\n    attribute vec4 a_color;\n    uniform vec2 u_resolution;\n    varying vec4 v_color;\n\n    void main() {\n        vec2 zeroToOne = a_position.xy / u_resolution;\n        vec2 zeroToTwo = zeroToOne * 2.0;\n        vec2 clipSpace = zeroToTwo - 1.0;\n        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n        v_color = a_color;\n    }\n"}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(4),o=t(3),a=t(5),i=t(1),c=t(2),u=t(0);r.gradientRectangles=function(e){e&&u.markButtonAsActive(e.target);var r=document.getElementById("canvas"),t=n.getGLRenderingContext(r),s=o.createProgramFromScripts(t,a.gradientRectanglesShadersSource.vertex,a.gradientRectanglesShadersSource.fragment);t.useProgram(s);var l=t.getAttribLocation(s,"a_position"),v=t.getAttribLocation(s,"a_color"),f=t.getUniformLocation(s,"u_resolution");t.enableVertexAttribArray(l),t.enableVertexAttribArray(v);var d=2,g=4,_=t.FLOAT,p=!1,m=0,A=0;i.resizeCanvasToDisplaySize(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.uniform2f(f,t.canvas.width,t.canvas.height),t.vertexAttribPointer(l,d,_,p,m,A);for(var b=15,h=200,R=200,y=255/(b+1),S=t.createBuffer(),T=t.createBuffer(),P=0,x=240;P<b;++P,x-=y)C(P,x),t.drawArrays(t.TRIANGLES,0,6);function C(e,r){t.bindBuffer(t.ARRAY_BUFFER,S);var n=function(e){var r=t.canvas.width,n=t.canvas.height;return{x:(r-h)/(b-1)*e,y:(n-R)/(b-1)*e}}(e);!function(e,r,n,o){var a=e,i=e+n,c=r,u=r+o;t.bufferData(t.ARRAY_BUFFER,new Float32Array([a,c,i,c,a,u,a,u,i,c,i,u]),t.STATIC_DRAW)}(n.x,n.y,h,R),t.vertexAttribPointer(l,d,_,p,m,A),t.bindBuffer(t.ARRAY_BUFFER,T),function(e){var r=e.red,n=e.green,o=e.blue,a=e.opacity;t.bufferData(t.ARRAY_BUFFER,new Float32Array([r,n,o,a,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,r,n,o,a]),t.STATIC_DRAW)}(c.convertRGBAToClColor(0,r,0,1)),t.vertexAttribPointer(v,g,_,p,m,A)}}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});r.RectanglesShadersSource={fragment:"\n    precision mediump float;\n\n    uniform vec4 u_color;\n    \n    void main() {\n       gl_FragColor = u_color;\n    }\n",vertex:"\n    attribute vec2 a_position;    \n    uniform vec2 u_resolution;\n    \n    void main() {\n        vec2 zeroToOne = a_position.xy / u_resolution;\n        vec2 zeroToTwo = zeroToOne * 2.0;\n        vec2 clipSpace = zeroToTwo - 1.0;\n        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n    }\n"}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.createShader=function(e,r,t){var n=e.createShader(r);if(e.shaderSource(n,t),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))return n;console.log(e.getShaderInfoLog(n)),e.deleteShader(n)}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.createProgram=function(e,r,t){var n=e.createProgram();if(e.attachShader(n,r),e.attachShader(n,t),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))return n;console.log(e.getProgramInfoLog(n)),e.deleteProgram(n)}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(4),o=t(3),a=t(2),i=t(1),c=t(7),u=t(0);r.rectangles=function(e){e&&u.markButtonAsActive(e.target);var r=document.getElementById("canvas"),t=n.getGLRenderingContext(r),s=o.createProgramFromScripts(t,c.RectanglesShadersSource.vertex,c.RectanglesShadersSource.fragment);t.useProgram(s);var l=t.getAttribLocation(s,"a_position"),v=t.getUniformLocation(s,"u_resolution"),f=t.getUniformLocation(s,"u_color");t.useProgram(s),t.enableVertexAttribArray(l),i.resizeCanvasToDisplaySize(t.canvas),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.uniform2f(v,t.canvas.width,t.canvas.height);for(var d=2,g=t.FLOAT,_=!1,p=0,m=0,A=15,b=200,h=200,R=255/(A+1),y=t.createBuffer(),S=0,T=240;S<A;++S,T-=R)P(S,T),t.drawArrays(t.TRIANGLES,0,6);function P(e,r){t.bindBuffer(t.ARRAY_BUFFER,y);var n=function(e){var r=t.canvas.width,n=t.canvas.height;return{x:(r-b)/(A-1)*e,y:(n-h)/(A-1)*e}}(e);!function(e,r){var n=e,o=e+b,a=r,i=r+h;t.bufferData(t.ARRAY_BUFFER,new Float32Array([n,a,o,a,n,i,n,i,o,a,o,i]),t.STATIC_DRAW)}(n.x,n.y);var o=a.convertRGBAToClColor(0,0,r,1);t.uniform4f(f,o.red,o.green,o.blue,o.opacity),t.vertexAttribPointer(l,d,g,_,p,m),t.drawArrays(t.TRIANGLES,0,6)}}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(10),o=t(6),a={rectangles:n.rectangles,gradientRectangles:o.gradientRectangles};Array.from(document.getElementsByTagName("button")).forEach(function(e){e.addEventListener("click",a[e.id])}),n.rectangles()}]);
//# sourceMappingURL=bundle.js.map