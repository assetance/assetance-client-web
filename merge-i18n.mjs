
/* merge-i18n.cjs */
// const fs = require('fs');
// const path = require('path');

// const baseLocalesPath = path.resolve(__dirname, 'src/localizer/locales');
// console.log(baseLocalesPath);
// const mergeFilesForLanguage = async (languageFolder) => {
//   const languagePath = path.join(baseLocalesPath, languageFolder);
//   const files = await fs.readdir(languagePath);
//   const mergedTranslations = {};

//   for (const file of files) {
//     if (file.endsWith('.json')) {
//       const sectionName = file.replace(/\.json$/, '');
//       const filePath = path.resolve(languagePath, file);
//       const content = await fs.readFile(filePath, 'utf-8');
//       mergedTranslations[sectionName] = JSON.parse(content);
//     }
//   }

//   const mergedFilePath = path.join(baseLocalesPath, `${languageFolder}.json`);
//   await fs.writeFile(mergedFilePath, JSON.stringify(mergedTranslations, null, 2), 'utf-8');
// };

// const mergeAllLanguages = async () => {
//   const languageFolders = await fs.readdir(baseLocalesPath);

//   for (const languageFolder of languageFolders) {
//     await mergeFilesForLanguage(languageFolder);
//   }
// };

// mergeAllLanguages().catch((error) => {
//   console.error('Error:', error);
// });

/////////////////////////////////
/* merge-i18n.mjs */
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseLocalesPath = path.resolve(__dirname, 'src/localizer/locales');

console.log("################################    \x1b[1m%s\x1b[22m    ################################", "Generating .json Locales Files");
console.log("path : \x1b[35m%s\x1b[0m", baseLocalesPath);

const mergeFilesForLanguage = async (languageFolder) => {
    const languagePath = path.join(baseLocalesPath, languageFolder);

    try {
        const stats = await fs.stat(languagePath);

        if (stats.isDirectory()) {
            const files = await fs.readdir(languagePath);
            const mergedTranslations = {};

            for (const file of files) {
                if (file.endsWith('.json')) {
                    const sectionName = file.replace(/\.json$/, '');
                    const filePath = path.resolve(languagePath, file);
                    const content = await fs.readFile(filePath, 'utf-8');
                    mergedTranslations[sectionName] = JSON.parse(content);
                }
            }

            const mergedFilePath = path.join(baseLocalesPath, `${languageFolder}.json`);
            await fs.writeFile(mergedFilePath, JSON.stringify(mergedTranslations, null, 2), 'utf-8');
            console.log('\x1b[32m%s\x1b[0m', `generated ${languageFolder}.json`);
        }
    } catch (error) {
        console.error(`\x1b[31mError processing "${languagePath}": \x1b[41m%s\x1b[0m`, error.message);
    }
};

const mergeAllLanguages = async () => {
    const languageFolders = await fs.readdir(baseLocalesPath);

    for (const languageFolder of languageFolders) {
        await mergeFilesForLanguage(languageFolder);
    }
};

mergeAllLanguages().catch((error) => {
    console.error('Error:', error);
});
