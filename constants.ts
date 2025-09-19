import {ImageSize, ImageSizes} from "./image-utils/types.js";

export const imageSource = './image-utils/img-src';
export const imageDestination = './image-utils/img-out';

export const imageSizes:ImageSizes = {
    xs: 480,
    sm: 640,
    md: 800,
    lg: 1600,
    xl: 2000,
}

export const isImageSize = (size:string|ImageSize):size is ImageSize => Object.keys(imageSizes).includes(size);
