!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=15)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(10);t.createNewEmptyScene=function(e,t){n.resizeCanvasToDisplaySize(e.canvas),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.uniform2f(t,e.canvas.width,e.canvas.height)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.markButtonAsActive=function(e){e.parentElement.getElementsByClassName("active")[0].classList.remove("active"),e.classList.add("active")}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(13),o=r(12);t.createProgramFromScripts=function(e,t,r){var a=o.createShader(e,e.VERTEX_SHADER,t),i=o.createShader(e,e.FRAGMENT_SHADER,r);return n.createProgram(e,a,i)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getGLRenderingContext=function(e){try{return e.getContext("webgl")||e.getContext("experimental-webgl")}catch(e){throw new Error("Unable to initialize WebGL. Your browser may not support it.")}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.convertHexToClColor=function(e,r){e=e.replace("#","");var n=parseInt(e.substring(0,2),16),o=parseInt(e.substring(2,4),16),a=parseInt(e.substring(4,6),16);return t.convertRGBAToClColor(n,o,a,r)},t.convertRGBAToClColor=function(e,t,r,n){return{red:e/255,green:t/255,blue:r/255,opacity:n}}},function(e,t,r){e.exports=r.p+"src/textures/texture_1.jpg"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.TexturedShaderSource={vertex:"\n    attribute vec2 a_position;\n    attribute vec2 a_texCoord;\n    \n    uniform vec2 u_resolution;\n    uniform vec2 u_texResolution;\n    \n    varying vec2 v_texCoord;\n\n    void main() {    \n        vec2 ratio = a_position / u_resolution * 2.0 - 1.0;\n        gl_Position = vec4(ratio * vec2(1, -1), 0, 1);\n        \n        v_texCoord = a_texCoord / u_texResolution;\n    }\n",fragment:"\n    precision mediump float;\n    \n    uniform sampler2D u_image;\n    \n    varying vec2 v_texCoord;\n\n    void main() {\n       gl_FragColor = texture2D(u_image, v_texCoord);\n    }\n"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),o=r(3),a=r(2),i=r(6),c=r(0),u=r(5);t.textured=function(e){e&&n.markButtonAsActive(e.target);var r=new Image;r.src=u,r.onload=function(){return t.startWebGl(r)}},t.startWebGl=function(e){var t=document.getElementById("canvas"),r=o.getGLRenderingContext(t),n=a.createProgramFromScripts(r,i.TexturedShaderSource.vertex,i.TexturedShaderSource.fragment);r.useProgram(n);var u=r.getAttribLocation(n,"a_position"),s=r.getAttribLocation(n,"a_texCoord"),l=r.getUniformLocation(n,"u_resolution"),v=r.getUniformLocation(n,"u_texResolution");r.uniform2f(v,e.width,e.height),r.enableVertexAttribArray(u),r.enableVertexAttribArray(s),c.createNewEmptyScene(r,l);var f=r.createBuffer(),d=r.createBuffer(),_=12,g=200,A={x:r.canvas.width/2,y:r.canvas.height/2},m={x:A.x+g,y:A.y},R={x:e.width/2,y:e.height/2},x={x:R.x+g,y:R.y};function T(e,t){return e+g*Math.cos(2*Math.PI*t/_)}function p(e,t){return e+g*Math.sin(2*Math.PI*t/_)}function y(t,n){r.bufferData(r.ARRAY_BUFFER,new Float32Array([R.x,R.y,t,n,x.x,x.y]),r.STATIC_DRAW);var o=r.createTexture();r.bindTexture(r.TEXTURE_2D,o),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,e)}!function(){for(var e=1;e<=_;e++){var t=T(A.x,e),n=p(A.y,e);r.bindBuffer(r.ARRAY_BUFFER,f),i=t,c=n,r.bufferData(r.ARRAY_BUFFER,new Float32Array([A.x,A.y,i,c,m.x,m.y]),r.STATIC_DRAW),r.vertexAttribPointer(u,2,r.FLOAT,!1,0,0);var o=T(R.x,e),a=p(R.y,e);r.bindBuffer(r.ARRAY_BUFFER,d),y(o,a),r.vertexAttribPointer(s,2,r.FLOAT,!1,0,0),r.drawArrays(r.TRIANGLES,0,3),m={x:t,y:n},x={x:o,y:a}}var i,c}()}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.gradientRectanglesShadersSource={fragment:"\n    precision mediump float;\n    varying vec4 v_color;\n    \n    void main() {\n        gl_FragColor = v_color;\n    }\n",vertex:"\n    attribute vec2 a_position;\n    attribute vec4 a_color;\n    uniform vec2 u_resolution;\n    varying vec4 v_color;\n\n    void main() {\n        vec2 zeroToOne = a_position.xy / u_resolution;\n        vec2 zeroToTwo = zeroToOne * 2.0;\n        vec2 clipSpace = zeroToTwo - 1.0;\n        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n        v_color = a_color;\n    }\n"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3),o=r(2),a=r(8),i=r(4),c=r(1),u=r(0);t.gradientRectangles=function(e){e&&c.markButtonAsActive(e.target);var t=document.getElementById("canvas"),r=n.getGLRenderingContext(t),s=o.createProgramFromScripts(r,a.gradientRectanglesShadersSource.vertex,a.gradientRectanglesShadersSource.fragment);r.useProgram(s);var l=r.getAttribLocation(s,"a_position"),v=r.getAttribLocation(s,"a_color"),f=r.getUniformLocation(s,"u_resolution");r.enableVertexAttribArray(l),r.enableVertexAttribArray(v);var d=2,_=4,g=r.FLOAT,A=!1,m=0,R=0;u.createNewEmptyScene(r,f),r.vertexAttribPointer(l,d,g,A,m,R);for(var x=15,T=200,p=200,y=255/(x+1),b=r.createBuffer(),E=r.createBuffer(),S=0,h=240;S<x;++S,h-=y)P(S,h),r.drawArrays(r.TRIANGLES,0,6);function P(e,t){r.bindBuffer(r.ARRAY_BUFFER,b);var n=function(e){var t=r.canvas.width,n=r.canvas.height;return{x:(t-T)/(x-1)*e,y:(n-p)/(x-1)*e}}(e);!function(e,t,n,o){var a=e,i=e+n,c=t,u=t+o;r.bufferData(r.ARRAY_BUFFER,new Float32Array([a,c,i,c,a,u,a,u,i,c,i,u]),r.STATIC_DRAW)}(n.x,n.y,T,p),r.vertexAttribPointer(l,d,g,A,m,R),r.bindBuffer(r.ARRAY_BUFFER,E),function(e){var t=e.red,n=e.green,o=e.blue,a=e.opacity;r.bufferData(r.ARRAY_BUFFER,new Float32Array([t,n,o,a,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,t,n,o,a]),r.STATIC_DRAW)}(i.convertRGBAToClColor(0,t,0,1)),r.vertexAttribPointer(v,_,g,A,m,R)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.resizeCanvasToDisplaySize=function(e,t){t=t||1;var r=e.clientWidth*t|0,n=e.clientHeight*t|0;return(e.width!==r||e.height!==n)&&(e.width=r,e.height=n,!0)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.RectanglesShadersSource={fragment:"\n    precision mediump float;\n\n    uniform vec4 u_color;\n    \n    void main() {\n       gl_FragColor = u_color;\n    }\n",vertex:"\n    attribute vec2 a_position;    \n    uniform vec2 u_resolution;\n    \n    void main() {\n        vec2 zeroToOne = a_position.xy / u_resolution;\n        vec2 zeroToTwo = zeroToOne * 2.0;\n        vec2 clipSpace = zeroToTwo - 1.0;\n        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n    }\n"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createShader=function(e,t,r){var n=e.createShader(t);if(e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))return n;console.log(e.getShaderInfoLog(n)),e.deleteShader(n)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createProgram=function(e,t,r){var n=e.createProgram();if(e.attachShader(n,t),e.attachShader(n,r),e.linkProgram(n),e.getProgramParameter(n,e.LINK_STATUS))return n;console.log(e.getProgramInfoLog(n)),e.deleteProgram(n)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3),o=r(2),a=r(4),i=r(11),c=r(1),u=r(0);t.rectangles=function(e){e&&c.markButtonAsActive(e.target);var t=document.getElementById("canvas"),r=n.getGLRenderingContext(t),s=o.createProgramFromScripts(r,i.RectanglesShadersSource.vertex,i.RectanglesShadersSource.fragment);r.useProgram(s);var l=r.getAttribLocation(s,"a_position"),v=r.getUniformLocation(s,"u_resolution"),f=r.getUniformLocation(s,"u_color");r.useProgram(s),r.enableVertexAttribArray(l),u.createNewEmptyScene(r,v);for(var d=2,_=r.FLOAT,g=!1,A=0,m=0,R=15,x=200,T=200,p=255/(R+1),y=r.createBuffer(),b=0,E=240;b<R;++b,E-=p)S(b,E),r.drawArrays(r.TRIANGLES,0,6);function S(e,t){r.bindBuffer(r.ARRAY_BUFFER,y);var n=function(e){var t=r.canvas.width,n=r.canvas.height;return{x:(t-x)/(R-1)*e,y:(n-T)/(R-1)*e}}(e);!function(e,t){var n=e,o=e+x,a=t,i=t+T;r.bufferData(r.ARRAY_BUFFER,new Float32Array([n,a,o,a,n,i,n,i,o,a,o,i]),r.STATIC_DRAW)}(n.x,n.y);var o=a.convertRGBAToClColor(0,0,t,1);r.uniform4f(f,o.red,o.green,o.blue,o.opacity),r.vertexAttribPointer(l,d,_,g,A,m),r.drawArrays(r.TRIANGLES,0,6)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(14),o=r(9),a=r(7),i={rectangles:n.rectangles,gradientRectangles:o.gradientRectangles,textured:a.textured};Array.from(document.getElementsByTagName("button")).forEach(function(e){e.addEventListener("click",i[e.id])}),a.textured()}]);
//# sourceMappingURL=bundle.js.map