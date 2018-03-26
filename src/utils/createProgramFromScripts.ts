import { createProgram } from './createProgram';
import { createShader } from './createShader';

export const createProgramFromScripts = (
    gl: WebGLRenderingContext,
    vertexShaderSource: string,
    fragmentShaderSource: string
): WebGLProgram => {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    return createProgram(gl, vertexShader, fragmentShader);
};