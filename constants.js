export const imageSource = './image-utils/img-src';
export const imageDestination = './image-utils/img-out';
export const imageSizes = {
    xs: 480,
    sm: 640,
    md: 800,
    lg: 1600,
    xl: 2000,
};
export const isImageSize = (size) => Object.keys(imageSizes).includes(size);
