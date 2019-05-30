const fetch = require('node-fetch');
const fs = require('fs');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminPngcrush = require('imagemin-pngcrush');
const imageminOptipng = require('imagemin-optipng');
const imageminAdvpng = require('imagemin-advpng');
const Progress = require('cli-progress');
const request = require('request');
const Spritesmith = require('spritesmith');

module.exports = async () => {
  await parseItemIcons();
};

/**
 * Fetch all icons for a given set of paths.
 * @param {Array} paths - An array of icon paths.
 * @param {String} folderRef - A reference to a folder within the top-level icons-raw folder.
 * @returns {Array} - An array of saved image paths.
 */
async function fetchIconsFromPaths(paths = [], folderRef = '') {
  console.time(`${folderRef}Fetch`);
  console.info(`Fetching ${folderRef} icons...`);

  const savedImagePaths = [];

  const progressBar = new Progress.Bar({}, Progress.Presets.shades_grey);
  progressBar.start(paths.length, 0);

  for (const [index, path] of paths.entries()) {
    await new Promise(resolve => {
      const apiPath = `https://xivapi.com${path}`;
  
      const savePath = `../icons-raw/${folderRef}/${(
        path.replace(/^.*\/(\d+)\.png$/, (_, group) => {
          return Number(group);
        })
      )}.png`;
    
      request.get(apiPath, () => {
        savedImagePaths.push(savePath);
        resolve();
      }).pipe(fs.createWriteStream(savePath));
    });

    progressBar.update(index + 1);
  }

  progressBar.stop();
  console.info(`Finished fetching ${folderRef} icons.`);
  console.timeEnd(`${folderRef}Fetch`);

  return savedImagePaths;
}

/**
 * Minify a folder of icon images.
 * @param {Array} savedImagePaths - An array of saved image paths.
 * @param {String} folderRef - A reference to a folder within the top-level icons-raw folder.
 */
async function minifySavedIcons(savedImagePaths = [], folderRef = '') {
  console.info(`Minifying ${folderRef} icons...`);

  await imagemin(savedImagePaths, `../icons-raw/${folderRef}/`, {
    plugins: [
      imageminPngquant({ quality: '5-10' }),
      imageminPngcrush({ reduce: true }),
      imageminOptipng()
    ],
    use: [
      imageminAdvpng()
    ]
  });

  console.info(`Finished minifying ${folderRef} icons.`);
}

/**
 * Parse and create sprite sheet for data/items.json entries.
 */
async function parseItemIcons() {
  console.time('ItemIcons');
  const items = require('../../data/items.json');

  const paths = [];

  Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []).forEach(item => {
    const {
      iconPath
    } = item;

    if (paths.indexOf(iconPath) !== -1) {
      return;
    }

    paths.push(iconPath);
  });

  const savedImagePaths = await fetchIconsFromPaths(paths, 'item');
  await minifySavedIcons(savedImagePaths, 'item');
  console.timeEnd('ItemIcons');
}