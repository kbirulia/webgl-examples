import { resizeCanvasToDisplaySize } from './resizeCanvasToDisplaySize';

export const createNewEmptyScene = (gl: WebGLRenderingContext, resolutionULocation: WebGLUniformLocation) => {
    resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(resolutionULocation, gl.canvas.width, gl.canvas.height);
};