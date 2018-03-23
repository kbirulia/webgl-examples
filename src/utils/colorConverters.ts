
export interface GlColor {
    red: number,
    green: number,
    blue: number,
    opacity: number
}

export const convertHexToClColor = (hex: string, opacity: number): GlColor => {
    hex = hex.replace('#','');
    const red = parseInt(hex.substring(0,2), 16);
    const green = parseInt(hex.substring(2,4), 16);
    const blue = parseInt(hex.substring(4,6), 16);

    return convertRGBAToClColor(red, green, blue, opacity);
};

export const convertRGBAToClColor = (red: number, green: number, blue: number, opacity: number): GlColor => {
    return {
        red: red / 255,
        green: green / 255,
        blue: blue / 255,
        opacity
    };
};