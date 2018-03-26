import { getGLRenderingContext } from '../../utils/getGLRenderingContext';
import { createProgramFromScripts } from '../../utils/createProgramFromScripts';
import { vertexShaderSource, fragmentShaderSource } from './shaderSources';
import { convertRGBAToClColor} from '../../utils/colorConverters';
import { Coordinates2D } from '../../model/coordinates';
import { resizeCanvasToDisplaySize } from '../../utils/resizeCanvasToDisplaySize';
import { GlColor } from '../../model/color';
let positionALocation, resolutionULocation, colorULocation, gl;

export const rectangles = () => {
    console.log('rectangles');

    const canvas = <HTMLCanvasElement>document.getElementById('canvas');

    gl = getGLRenderingContext(canvas);

    const program = createProgramFromScripts(gl, vertexShaderSource, fragmentShaderSource);

    gl.useProgram(program);

    positionALocation = gl.getAttribLocation(program, "a_position");
    resolutionULocation = gl.getUniformLocation(program, "u_resolution");

    colorULocation = gl.getUniformLocation(program, "u_color");

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionALocation);

    createScene();
    createBuffer();
    render();
};

const createBuffer = () => {
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2;         // 2 components per iteration
    const type = gl.FLOAT;  // the data is 32bit floats
    const normalize = false;// don't normalize the data
    const stride = 0;       // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;       // start at the beginning of the buffer
    gl.vertexAttribPointer(positionALocation, size, type, normalize, stride, offset);

    gl.uniform2f(resolutionULocation, gl.canvas.width, gl.canvas.height);
};

const createScene = () => {
    resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};

const setRectangle = (x: number, y: number, width: number, height: number): void => {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,]), gl.STATIC_DRAW);
};

const amount = 15;
const width  =  100;
const height = 100;

export const render = () => {
    const stepColor = 255 / (amount + 1);

    for (let i = 0, color = 240; i < amount; ++i, color -= stepColor) {

        const {x, y} = getCoords(i);
        const glColor = convertRGBAToClColor(0, 0, color, 1);

        renderRectangle(x, y, width, height, glColor)
    }
};

const getCoords = (num: number): Coordinates2D => {
    const canvasWidth = gl.canvas.width;
    const canvasHeight = gl.canvas.height;

    const lastX = canvasWidth - width;
    const lastY = canvasHeight - height;

    if (num === amount) {
        return{
            x:  lastX,
            y:  lastY,
        }
    }

    return {
        x: lastX / (amount - 1) * num,
        y: lastY / (amount - 1) * num
    }
};

const renderRectangle = (x: number, y: number, width: number, height: number, color: GlColor) => {

    setRectangle( x, y, width, height);

    gl.uniform4f(colorULocation, color.red, color.green, color.blue, color.opacity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
};
