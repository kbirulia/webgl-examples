import { rectangles } from './examples/rectangles';
import { gradientRectangles } from './examples/gradientRectangles';

const examples = {
    rectangles,
    gradientRectangles: gradientRectangles
};

Array.from(document.getElementsByTagName('button')).forEach(button => {
    button.addEventListener('click', examples[button.id]);
});

rectangles();



