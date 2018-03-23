import { Renderer } from '../render/Renderer';
import { convertRGBAToClColor } from '../utils/colorConverters';

export const rectangles = (gl: WebGLRenderingContext, renderer: Renderer) => {
    const amount = 15;
    const width  =  100;
    const height = 100;
    const stepX = gl.canvas.width / (amount + 1);
    const stepY = gl.canvas.height / (amount + 1);
    const stepColor = 255 / (amount + 1);

    for (let i = 0, x = 0, y = 0, color = 240; i < amount; ++i, x += stepX, y += stepY, color -= stepColor) {

        const glColor = convertRGBAToClColor(0, 0, color, 1);
        console.log(x, y, width, height, glColor);

        renderer.renderRectangle(x, y, width, height, glColor)
    }
}