import { getGLRenderingContext } from '../../utils/getGLRenderingContext';
import { createProgramFromScripts } from '../../utils/createProgramFromScripts';
import { convertRGBAToClColor} from '../../utils/colorConverters';
import { Coordinates2D } from '../../model/coordinates';
import { resizeCanvasToDisplaySize } from '../../utils/resizeCanvasToDisplaySize';
import { RectanglesShadersSource } from './shaderSources';
import { markButtonAsActive } from '../../utils/markButtonAsActive';
import { createNewEmptyScene } from '../../utils/createNewEmptyScene';

export const rectangles = (e?: Event) => {
    e && markButtonAsActive(e.target as HTMLButtonElement);

    const canvas = <HTMLCanvasElement>document.getElementById('canvas');

    const gl = getGLRenderingContext(canvas);

    const program = createProgramFromScripts(gl, RectanglesShadersSource.vertex, RectanglesShadersSource.fragment);

    gl.useProgram(program);

    const positionALocation = gl.getAttribLocation(program, "a_position");
    const resolutionULocation = gl.getUniformLocation(program, "u_resolution");

    const colorULocation = gl.getUniformLocation(program, "u_color");

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionALocation);

    createNewEmptyScene(gl, resolutionULocation);

    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    const amount = 15;
    const width  =  200;
    const height = 200;
    const stepColor = 255 / (amount + 1);
    const positionBuffer = gl.createBuffer();

    for (let i = 0, color = 240; i < amount; ++i, color -= stepColor) {
        initBuffer(i, color);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function initBuffer(num: number, color: number): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const {x, y} = getCoords(num);
        setGeometry(x, y);

        const glColor = convertRGBAToClColor(0, 0, color, 1);
        gl.uniform4f(colorULocation, glColor.red, glColor.green, glColor.blue, glColor.opacity);

        gl.vertexAttribPointer(positionALocation, size, type, normalize, stride, offset);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function setGeometry(x: number, y: number): void {
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
};