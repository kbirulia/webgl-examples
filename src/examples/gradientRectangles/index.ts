import { getGLRenderingContext } from '../../utils/getGLRenderingContext';
import { createProgramFromScripts } from '../../utils/createProgramFromScripts';
import { gradientRectanglesShadersSource } from './shaderSource';
import { resizeCanvasToDisplaySize } from '../../utils/resizeCanvasToDisplaySize';
import { convertRGBAToClColor } from '../../utils/colorConverters';
import { Coordinates2D } from '../../model/coordinates';
import { markButtonAsActive } from '../../utils/markButtonAsActive';

export const gradientRectangles = (e?: Event): void  => {
    e && markButtonAsActive(e.target as HTMLButtonElement);

    const canvas = <HTMLCanvasElement>document.getElementById('canvas');

    const gl = getGLRenderingContext(canvas);

    const program = createProgramFromScripts(gl, gradientRectanglesShadersSource.vertex, gradientRectanglesShadersSource.fragment);

    gl.useProgram(program);

    const positionALocation = gl.getAttribLocation(program, 'a_position');
    const colorALocation = gl.getAttribLocation(program, 'a_color');
    const resolutionULocation = gl.getUniformLocation(program, 'u_resolution');

    gl.enableVertexAttribArray(positionALocation);
    gl.enableVertexAttribArray(colorALocation);

    const sizePosition = 2;
    const sizeColor = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    createScene();

    gl.vertexAttribPointer(positionALocation, sizePosition, type, normalize, stride, offset);

    const amount = 15;
    const width  =  200;
    const height = 200;
    const stepColor = 255 / (amount + 1);
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    for (let i = 0, color = 240; i < amount; ++i, color -= stepColor) {
        initBuffers(i, color);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function initBuffers(num: number, color: number): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        const {x, y} = getCoords(num);
        setGeometry( x, y, width, height);
        gl.vertexAttribPointer(positionALocation, sizePosition, type, normalize, stride, offset);

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        const glColor = convertRGBAToClColor(0, color, 0, 1);
        setColors(glColor);
        gl.vertexAttribPointer(colorALocation, sizeColor, type, normalize, stride, offset);

    }


    function createScene(): void {
        resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform2f(resolutionULocation, gl.canvas.width, gl.canvas.height);
    }

    function getCoords(num: number): Coordinates2D {
        const canvasWidth = gl.canvas.width;
        const canvasHeight = gl.canvas.height;

        const lastX = canvasWidth - width;
        const lastY = canvasHeight - height;

        return {
            x: lastX / (amount - 1) * num,
            y: lastY / (amount - 1) * num
        }
    }

    function setGeometry(x: number, y: number, width: number, height: number): void {
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
    }

    function setColors({red, green, blue, opacity}): void {

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            red, green, blue, opacity,
            1,1,1,1,
            1,1,1,1,
            1,1,1,1,
            1,1,1,1,
            red, green, blue, opacity]), gl.STATIC_DRAW);
    }
};

