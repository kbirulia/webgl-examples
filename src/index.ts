import { rectangles } from './examples/rectangles';
import { gradientRectangles } from './examples/gradientRectangles';
import { textured } from './examples/textured';

const examples = {
    rectangles,
    gradientRectangles,
    textured
};

Array.from(document.getElementsByTagName('button')).forEach(button => {
    button.addEventListener('click', examples[button.id]);
});

rectangles();



