import { rectangles } from './examples/rectangles';
import { coloredRectangles } from './examples/coloredRectangles';

const examples = {
    rectangles,
    coloredRectangles
};

Array.from(document.getElementsByTagName('button')).forEach(button => {
    button.addEventListener('click', examples[button.id])
});

rectangles();



