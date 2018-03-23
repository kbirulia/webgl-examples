import { GlController } from '../GlController';
import { GlColor } from '../utils/colorConverters';

export class Renderer {
    constructor(private _controller: GlController) {};

    public renderRectangle(x: number, y: number, width: number, height: number, color: GlColor) {
        const gl = this._controller.gl;
        const colorUniformLocation = this._controller.colorUniformLocation;

        this.setRectangle( x, y, width, height);

        gl.uniform4f(colorUniformLocation, color.red, color.green, color.blue, color.opacity);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    private setRectangle(x: number, y: number, width: number, height: number): void {
        const gl = this._controller.gl;

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
}