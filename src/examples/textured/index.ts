import { markButtonAsActive } from '../../utils/markButtonAsActive';
import { getGLRenderingContext } from '../../utils/getGLRenderingContext';
import { createProgramFromScripts } from '../../utils/createProgramFromScripts';
import { TexturedShaderSource } from './shaderSources';
import { createNewEmptyScene } from '../../utils/createNewEmptyScene';
import { Coordinates2D } from '../../model/coordinates';
//@ts-ignore
import * as imgUrl from '../../textures/texture_1.jpg';

export const textured = (e?: Event) => {
    e && markButtonAsActive(e.target as HTMLButtonElement);

    const image = new Image();
    image.src = imgUrl;
    image.onload = () => startWebGl(image);
};

export const startWebGl = (image: HTMLImageElement): void => {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');

    const gl = getGLRenderingContext(canvas);

    const program = createProgramFromScripts(gl, TexturedShaderSource.vertex, TexturedShaderSource.fragment);

    gl.useProgram(program);

    const positionALocation = gl.getAttribLocation(program, 'a_position');
    const texcoordALocation = gl.getAttribLocation(program, "a_texCoord");

    const resolutionULocation = gl.getUniformLocation(program, 'u_resolution');
    const texResolutionULocation = gl.getUniformLocation(program, "u_texResolution");

    gl.uniform2f(texResolutionULocation, image.width, image.height);

    gl.enableVertexAttribArray(positionALocation);
    gl.enableVertexAttribArray(texcoordALocation);

    createNewEmptyScene(gl, resolutionULocation);

    const positionBuffer = gl.createBuffer();
    const texcoordBuffer = gl.createBuffer();

    const vertexCount = 12;
    const sideWidth = 200;

    const polygonCenter: Coordinates2D = {
        x: gl.canvas.width / 2,
        y: gl.canvas.height / 2,
    };
    let prevXY = {
        x: polygonCenter.x + sideWidth,
        y: polygonCenter.y
    };
    const texCenter: Coordinates2D = {
        x: image.width / 2,
        y: image.height / 2
    };

    let prevTexXY = {
        x: texCenter.x + sideWidth,
        y: texCenter.y
    };

    cratePolygon();

    function cratePolygon() {
        for (let triangleNumber = 1; triangleNumber <= vertexCount; triangleNumber++) {
            const polygonX = getVertexX(polygonCenter.x, triangleNumber);
            const polygonY = getVertexY(polygonCenter.y, triangleNumber);

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            setGeometry(polygonX, polygonY);
            gl.vertexAttribPointer(positionALocation, 2, gl.FLOAT, false, 0,0);

            const texX = getVertexX(texCenter.x, triangleNumber);
            const texY = getVertexY(texCenter.y, triangleNumber);

            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            setTexture(texX, texY);
            gl.vertexAttribPointer(texcoordALocation, 2, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLES, 0, 3);

            prevXY = {x: polygonX ,y: polygonY};
            prevTexXY = {x: texX ,y: texY};
        }
    }

    function getVertexX(centerX: number, triangleNumber: number): number {
        return centerX + sideWidth * Math.cos(2 * Math.PI * triangleNumber / vertexCount);
    }

    function getVertexY(centerY: number, triangleNumber: number): number {
        return centerY + sideWidth * Math.sin(2 * Math.PI * triangleNumber / vertexCount);
    }

    function setGeometry(x ,y): void {
        // console.log(`CANVAS: (${polygonCenter.x},${polygonCenter.y}), (${x},${y}), (${prevXY.x},${prevXY.y})`);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            polygonCenter.x, polygonCenter.y,
            x,y,
            prevXY.x, prevXY.y
        ]), gl.STATIC_DRAW)
    }

    function setTexture(x: number, y: number) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            texCenter.x, texCenter.y,
            x,  y,
            prevTexXY.x,  prevTexXY.y,
        ]), gl.STATIC_DRAW);

        // Create a texture.
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    }
};