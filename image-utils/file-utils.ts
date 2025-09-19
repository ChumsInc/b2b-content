import {readlink, readdir, unlink, readFile, copyFile} from "node:fs/promises";
import * as path from "node:path";
import {imageDestination, imageSource} from "../constants.js";
import {FilenameParts, ImageSize} from "./types.js";

export async function getSourceFile(fileName: string):Promise<Buffer> {
    try {
        return await readFile(path.join(imageSource, fileName))
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("getSourceFile()", err.message);
            return Promise.reject(err);
        }
        console.debug("getSourceFile()", err);
        return Promise.reject(new Error('Error in getSourceFile()'));
    }
}

export async function getSourceFiles():Promise<string[]> {
    try {
        return await readdir(imageSource);
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("getSourceFiles()", err.message);
            return Promise.reject(err);
        }
        console.debug("getSourceFiles()", err);
        return Promise.reject(new Error('Error in getSourceFiles()'));
    }
}

export async function clearDestination() {
    try {
        const files = await readdir(imageDestination);
        for await (const file of files) {
            await unlink(path.join(imageDestination, file));
        }
        console.log("Destination cleared");
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("clearDestination()", err.message);
            return Promise.reject(err);
        }
        console.debug("clearDestination()", err);
        return Promise.reject(new Error('Error in clearDestination()'));
    }
}

export function splitFileName(filename: string):FilenameParts {
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    return {
        name,
        ext: ext.slice(1)
    }
}

export function getDestinationFilename(filename: string, size?: ImageSize):string {
    if (!size) {
        return path.join(imageDestination, filename);
    }
    const {name, ext} = splitFileName(filename);
    return path.join(imageDestination, `${name}--${size}.${ext}`);
}

export async function copyOriginalFile(filename: string) {
    try {
        console.log('copyOriginalFile()', filename);
        await copyFile(path.join(imageSource, filename), getDestinationFilename(filename))
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("copyOriginalFile()", err.message);
            return Promise.reject(err);
        }
        console.debug("copyOriginalFile()", err);
        return Promise.reject(new Error('Error in copyOriginalFile()'));
    }
}
