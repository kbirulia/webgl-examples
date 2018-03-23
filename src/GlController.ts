export class GlController {

    private _colorUniformLocation: WebGLUniformLocation;

    constructor(private _gl: WebGLRenderingContext, private _program: WebGLProgram) {
        const gl = this._gl;
        const program = this._program;

        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        const resolutionULocation = gl.getUniformLocation(program, "u_resolution");

        this._colorUniformLocation = gl.getUniformLocation(program, "u_color");

        //-------------------------------------------------------

        const positionBuffer = this.gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        gl.enableVertexAttribArray(positionAttributeLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        const size = 2;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset1 = 0;
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset1);

        gl.uniform2f(resolutionULocation, gl.canvas.width, gl.canvas.height);
    }

    get gl(): WebGLRenderingContext {
        return this._gl;
    }

    get colorUniformLocation(): WebGLUniformLocation {
        return this._colorUniformLocation;
    }
}