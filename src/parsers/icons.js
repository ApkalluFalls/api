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
  await parseCraftingItemIcons();
  await parseGatheringIcons();
  await parseItemIcons();
  await parseQuestJournalIcons();
};

/**
 * Create a sprite sheet for a given folder of images.
 * @param {String} folderRef - A reference to a folder within the top-level icons-raw folder.
 */
async function createSpriteSheet(folderRef = '') {
  console.time(`${folderRef}Spritesheet`);
  console.info(`Creating ${folderRef} sprite sheet...`);

  const sourcePath = `../icons-raw/${folderRef}/`;
  const files = fs.readdirSync(sourcePath);
  
  if (!files.length) {
    console.warn(`No ${folderRef} icons found. Skipping.`);
    return;
  }

  const saveFolder = `../docs/icons/`;

  const isSpriteSheetReady = await new Promise((resolve, reject) => {
    Spritesmith.run({
      src: files.map(file => `${sourcePath}${file}`)
    }, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    })
  }).then(result => {
    console.info(`Writing ${folderRef} co-ordinates...`);

    const coordinates = {};
    Object.keys(result.coordinates).forEach(k => {
      const { 
        height,
        width,
        x,
        y
      } = result.coordinates[k];

      const response = [x, y];
      
      if (width !== 40) {
        response.push(width);
      }

      if (height !== 40) {
        response.push(height);
      }

      coordinates[k.replace(
        new RegExp(`^\\.\\.\\/icons-raw\\/${folderRef}\\/|\\.png$`, 'g'),
        ''
      )] = response;
    });

    fs.writeFileSync(`${saveFolder}${folderRef}.png`, result.image);
    fs.writeFileSync(`${saveFolder}${folderRef}.json`, JSON.stringify(coordinates));
    return true;
  }).catch(error => {
    console.error(error);
    console.warn(`Spritesmith threw the above error. Skipping.`);
  });

  if (!isSpriteSheetReady) {
    return;
  }

  console.info(`Optimising ${folderRef} sprite sheet...`);

  await imagemin([`${saveFolder}${folderRef}.png`], saveFolder, {
    plugins: [
      imageminPngquant({ quality: [0.5, 1], speed: 1, floyd: 0.1 }),
      imageminPngcrush({ reduce: true }),
      imageminOptipng()
    ]
  });

  console.info(`Finished creating ${folderRef} sprite sheet.`);
  console.timeEnd(`${folderRef}Spritesheet`);
}

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
  let alreadyExists = 0;

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

      // Do not fetch the image if it already exists.
      if (fs.existsSync(savePath)) {
        alreadyExists++;
        savedImagePaths.push(savePath);
        resolve();
        return;
      }
    
      request.get(apiPath, () => {
        savedImagePaths.push(savePath);
        resolve();
      }).pipe(fs.createWriteStream(savePath));
    });

    progressBar.update(index + 1);
  }

  progressBar.stop();

  if (alreadyExists === savedImagePaths.length) {
    return false;
  }

  const newEntries = savedImagePaths.length - alreadyExists;

  console.info(`Finished fetching ${folderRef} icons; found ${newEntries} new ${(
    newEntries === 1 ? 'entry' : 'entries'
  )}.`);
  console.timeEnd(`${folderRef}Fetch`);

  return savedImagePaths;
}

/**
 * Minify a folder of icon images.
 * @param {Array} savedImagePaths - An array of saved image paths.
 * @param {String} folderRef - A reference to a folder within the top-level icons-raw folder.
 */
async function minifySavedIcons(savedImagePaths = [], folderRef = '') {
  console.time(`${folderRef}Minify`);
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
  console.time(`${folderRef}Minify`);
}

/**
 * Parse and create sprite sheet for data/method/crafting.json entries.
 */
async function parseCraftingItemIcons() {
  console.time('CraftingItemIcons');
  const recipes = require('../../data/methods/crafting.json');

  const paths = [];

  Object.values(recipes).reduce((arr, recipeGroup) => ([
    ...arr,
    ...recipeGroup.reduce((arr2, recipe) => ([
      ...arr2,
      ...recipe.items
    ]), [])
  ]), []).forEach(item => {
    const {
      iconPath
    } = item;

    if (paths.indexOf(iconPath) !== -1) {
      return;
    }

    paths.push(iconPath);
  });

  await processIconGroup(paths, 'craft-item');
  console.timeEnd('CraftingItemIcons');
}

/**
 * Parse and create sprite sheet for data/methods/quest.json journal entries.
 */
async function parseGatheringIcons() {
  console.time('GatheringIcons');
  const nodes = require('../../data/methods/gathering.json');

  const paths = [];

  Object.values(nodes).reduce((arr, nodeGroup) => ([
    ...arr,
    ...nodeGroup.map(node => node.iconPath)
  ]), []).forEach(iconPath => {
    if (paths.indexOf(iconPath) !== -1) {
      return;
    }

    paths.push(iconPath);
  });

  await processIconGroup(paths, 'gathering');
  console.timeEnd('GatheringIcons');
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

  await processIconGroup(paths, 'item');
  console.timeEnd('ItemIcons');
}

/**
 * Parse and create sprite sheet for data/methods/quest.json journal entries.
 */
async function parseQuestJournalIcons() {
  console.time('QuestIcons');
  const quests = require('../../data/methods/quests.json');

  const paths = [];

  Object.values(quests).reduce((arr, questGroup) => ([
    ...arr,
    ...questGroup.map(quest => quest.iconPath)
  ]), []).forEach(iconPath => {
    if (paths.indexOf(iconPath) !== -1) {
      return;
    }

    paths.push(iconPath);
  });

  await processIconGroup(paths, 'quest');
  console.timeEnd('QuestIcons');
}

/**
 * 
 * @param {Array} paths - An array of image paths to process.
 * @param {String} folderRef - A reference to a folder within the top-level icons-raw folder.
 */
async function processIconGroup(paths = [], folderRef = '') {
  const savedIcons = await fetchIconsFromPaths(paths, folderRef);

  if (!savedIcons) {
    console.info(`No new ${folderRef} icons found; skipping.`);
    return;
  }

  await minifySavedIcons(savedIcons, folderRef);
  await createSpriteSheet(folderRef);
}