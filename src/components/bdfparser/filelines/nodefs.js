import * as fs from 'fs';
import * as readline from 'readline';
/**
 * Read text file line by line with Node.js file system lib
 *
 * See ./fetch.ts for native fetch() version and ../../deno/filelines.ts for Deno file system version
 *
 * @param filepath - Path of the text file
 *
 * @returns An asynchronous iterable iterator representing each line in string text from the text file
 */
export default (filepath) => {
    const fileStream = fs.createReadStream(filepath);
    const rl = readline.createInterface({
        input: fileStream,
    });
    return rl[Symbol.asyncIterator]();
};
