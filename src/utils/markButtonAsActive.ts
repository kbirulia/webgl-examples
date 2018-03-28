export const markButtonAsActive = (target: HTMLButtonElement) => {
    target.parentElement.getElementsByClassName('active')[0].classList.remove('active');
    target.classList.add('active');
};