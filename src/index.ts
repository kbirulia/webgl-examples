import { GlController } from './GlController';
import { createProgramFromScripts, ShaderSourceMap, ShaderType } from './utils/createProgramFromScripts';
import { getGLRenderingContext } from './utils/getGLRenderingContext';
import { Renderer } from './render/Renderer';
import { rectangles } from './examples/rectangles';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

const shaders: ShaderSourceMap = new Map();
shaders.set(ShaderType.VERTEX_SHADER, '2d-vertex-shader');
shaders.set(ShaderType.FRAGMENT_SHADER, '2d-fragment-shader');

const gl = getGLRenderingContext(canvas);

const program = createProgramFromScripts(gl, shaders);

const glController = new GlController(gl, program);

const renderer = new Renderer(glController);

rectangles(gl, renderer);



