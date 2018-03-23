import { createProgram } from './createProgram';
import { createShader } from './createShader';

export enum ShaderType {
    VERTEX_SHADER = "VERTEX_SHADER",
    FRAGMENT_SHADER = "FRAGMENT_SHADER",
}

export type ShaderSourceMap = Map<ShaderType, string>;

export const createProgramFromScripts = (gl: WebGLRenderingContext, shaderSourceMap: ShaderSourceMap): WebGLProgram => {
    const shaders = new Map<ShaderType, WebGLShader>();

    shaderSourceMap.forEach((shaderScriptId, shaderType) => {
        const shaderSource = (document.getElementById(shaderScriptId) as HTMLScriptElement).text;
        shaders.set(shaderType, createShader(gl, gl[shaderType], shaderSource));

    });

    return createProgram(gl, shaders.get(ShaderType.VERTEX_SHADER), shaders.get(ShaderType.FRAGMENT_SHADER));
};
