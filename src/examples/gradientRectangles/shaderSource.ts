const fragment = `
    precision mediump float;
    varying vec4 v_color;
    
    void main() {
        gl_FragColor = v_color;
    }
`;

const vertex = `
    attribute vec2 a_position;
    attribute vec4 a_color;
    uniform vec2 u_resolution;
    varying vec4 v_color;

    void main() {
        vec2 zeroToOne = a_position.xy / u_resolution;
        vec2 zeroToTwo = zeroToOne * 2.0;
        vec2 clipSpace = zeroToTwo - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        v_color = a_color;
    }
`;

export const gradientRectanglesShadersSource = {fragment, vertex};