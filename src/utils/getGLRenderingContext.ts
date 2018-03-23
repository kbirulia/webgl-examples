export const getGLRenderingContext = (canvas: HTMLCanvasElement): WebGLRenderingContext => {
    try {
        return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {
        throw new Error("Unable to initialize WebGL. Your browser may not support it.");
    }
};