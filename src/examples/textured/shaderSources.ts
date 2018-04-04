const vertex = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    
    uniform vec2 u_resolution;
    uniform vec2 u_texResolution;
    
    varying vec2 v_texCoord;

    void main() {    
        vec2 ratio = a_position / u_resolution * 2.0 - 1.0;
        gl_Position = vec4(ratio * vec2(1, -1), 0, 1);
        
        v_texCoord = a_texCoord / u_texResolution;
    }
`;

const fragment = `
    precision mediump float;
    
    uniform sampler2D u_image;
    
    varying vec2 v_texCoord;

    void main() {
       gl_FragColor = texture2D(u_image, v_texCoord);
    }
`;

export const TexturedShaderSource = {vertex, fragment};