import { clearDestination, copyOriginalFile, getDestinationFilename, getSourceFile, getSourceFiles } from "./file-utils.js";
import sharp from "sharp";
import { isImageSize } from "../constants.js";
export async function processImages(options) {
    try {
        const { sizes } = options;
        await clearDestination();
        const files = await getSourceFiles();
        for await (const file of files) {
            const buffer = await getSourceFile(file);
            const metadata = await sharp(buffer).metadata();
            console.log('processImages() //original size:', { width: metadata.width, height: metadata.height });
            for await (const size of Object.keys(sizes)) {
                if (isImageSize(size) && sizes[size] !== undefined && sizes[size] < metadata.width) {
                    const width = sizes[size];
                    const filename = await getDestinationFilename(file, size);
                    await resizeImage(buffer, width, filename);
                }
            }
            await copyOriginalFile(file);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.debug("processImages()", err.message);
            return Promise.reject(err);
        }
        console.debug("processImages()", err);
        return Promise.reject(new Error('Error in processImages()'));
    }
}
export async function resizeImage(buffer, width, filename) {
    try {
        console.log('resizeImage()', width, filename);
        return await sharp(buffer)
            .resize(width)
            .toFile(filename);
    }
    catch (err) {
        if (err instanceof Error) {
            console.debug("resizeImage()", err.message);
            return Promise.reject(err);
        }
        console.debug("resizeImage()", err);
        return Promise.reject(new Error('Error in resizeImage()'));
    }
}
