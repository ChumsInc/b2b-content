import commandLineArgs from 'command-line-args';
import {processImages} from "./image-utils.js";
import {imageSizes} from "../constants.js";

const clOptions = [
    {name: 'verbose', alias: 'v', type: Boolean},
    {name: 'action', type: String},
];
const options = commandLineArgs(clOptions);

console.log(options);
switch (options.action) {
    case 'resize':
        processImages({sizes: imageSizes})
            .then(() => {
                console.log('Images resized');
            })
            .catch((err: unknown) => {
                console.error(err);
            })
            .finally(() => {
                console.log('Done');
            })
}
