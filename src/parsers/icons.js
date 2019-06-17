const fs = require('fs');
const imagemin = require('imagemin');
const imageminAdvpng = require('imagemin-advpng');
const ImageminGm = require('imagemin-gm')
const imageminOptipng = require('imagemin-optipng');
const imageminPngquant = require('imagemin-pngquant');
const imageminPngcrush = require('imagemin-pngcrush');
const Progress = require('cli-progress');
const request = require('request');
const Spritesmith = require('spritesmith');

const imageminGm = new ImageminGm('/usr/local/Cellar/graphicsmagick/1.3.31/bin');

module.exports = async () => {
  // Main list content.
  await parseContentIcons('achievements');
  await parseContentIcons('emotes');
  await parseContentIcons('minions');
  await parseContentIcons('mounts');

  // Chocobo barding has a slightly different structure.
  await parseBardingIcons();

  // Helper icons.
  await parseCraftingItemIcons();
  await parseCurrencyIcons();
  await parseItemIcons();

  // Method icons.
  await parseMethodIcons();
};

/**
 * Create a sprite sheet for a given folder of images.
 * @param {String} folderRef - A reference to a folder within the top-level icons-raw folder.
 */
async function createSpriteSheet(folderRef = '') {
  console.time(`${folderRef}Spritesheet`);
  console.info(`Creating ${folderRef} sprite sheet...`);

  const sourcePath = `./icons-raw/${folderRef}/`;
  const files = fs.readdirSync(sourcePath);
  
  if (!files.length) {
    console.warn(`No ${folderRef} icons found. Skipping.`);
    return;
  }

  const saveFolder = `./docs/icons/`;

  const isSpriteSheetReady = await new Promise((resolve, reject) => {
    Spritesmith.run({
      src: files.map(file => `${sourcePath}${file}`).filter(file => /\.png$/.test(file))
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
        new RegExp(`^\\.\\/icons-raw\\/${folderRef}\\/|\\.png$`, 'g'),
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
    const iconData = await new Promise(resolve => {
      let apiPath;
      let savePath;

      if (typeof path === 'object') {
        apiPath = `https://xivapi.com${path.path}`,
        savePath = `./icons-raw/${folderRef}/${path.as}.png`;
      } else {
        apiPath = `https://xivapi.com${path}`;
        savePath = `./icons-raw/${folderRef}/${(
          path.replace(/^.*\/([A-Za-z0-9]+)\.png$/, (_, group) => {
            if (isNaN(Number(group))) {
              return group;
            }
  
            return Number(group);
          })
        )}.png`;
      }

      // Do not fetch the image if it already exists.
      if (fs.existsSync(savePath)) {
        alreadyExists++;
        savedImagePaths.push(savePath);
        resolve();
        return;
      }

      let errors = 0;

      const getImage = (apiPath, savePath) => {
        const req = request.get(apiPath).on('response', response => {
          if (response.headers['content-type'] !== 'image/png') {
            if (++errors === 5) {
              console.warn(`\nFailed to locate icon ${apiPath} after 5 attempts. Skipping.`);
              resolve();
              return;
            }

            console.warn(
              `\nFound ${(
                response.headers['content-type']
              )} instead of image/png for ${apiPath}. Trying again...`
            );
            getImage(apiPath, savePath);
            return;
          }

          const file = fs.createWriteStream(savePath);
          req.pipe(file);
          file.on('finish', () => {
            savedImagePaths.push(savePath);
            file.close(resolve);
          })
        }).on('error', (error) => {
          console.error(error);
          console.warn(`\nUnable to fetch ${apiPath}. Skipping.`);
          resolve(false);
          return;
        });
      }

      getImage(apiPath, savePath);
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
 * Get paths for data/method/crafting.json entries.
 */
function getCraftingIconPaths() {
  const recipes = require('../../data/methods/crafting.json');

  const paths = [];

  Object.values(recipes).reduce((arr, recipeGroup) => ([
    ...arr,
    ...recipeGroup.map(recipe => recipe.iconPath)
  ]), []).forEach(iconPath => {
    const mappedPath = mapIconPath(iconPath);

    if (paths.find(path => path.as === mappedPath.as)) {
      return;
    }

    paths.push(mappedPath);
  });

  return paths;
}

/**
 * Get paths for data/methods/quest.json journal entries.
 */
function getGatheringIconPaths() {
  const nodes = require('../../data/methods/gathering.json');

  const paths = [];

  Object.values(nodes).reduce((arr, nodeGroup) => ([
    ...arr,
    ...nodeGroup.map(node => node.iconPath)
  ]), []).forEach(iconPath => {
    const mappedPath = mapIconPath(iconPath);

    if (paths.find(path => path.as === mappedPath.as)) {
      return;
    }

    paths.push(mappedPath);
  });

  return paths;
}

/**
 * Get paths for data/methods/quest.json journal entries.
 */
function getQuestJournalIconPaths() {
  const quests = require('../../data/methods/quests.json');

  const paths = [];

  Object.values(quests).reduce((arr, nodeGroup) => ([
    ...arr,
    ...nodeGroup.map(quest => quest.iconPath)
  ]), []).forEach(iconPath => {
    const mappedPath = mapIconPath(iconPath);

    if (paths.find(path => path.as === mappedPath.as)) {
      return;
    }

    paths.push(mappedPath);
  });

  return paths;
}

/**
 * Map an icon reference to a different icon.
 * @param {String} iconPath - The path to the icon on XIVAPI.
 */
function mapIconPath(iconPath) {
  const pathAfterReplace = iconPath.replace(/^.*\/([A-Za-z0-9]+)\.png$/, (_, group) => {
    if (isNaN(Number(group))) {
      return group;
    }

    return Number(group);
  });

  switch (pathAfterReplace) {
    // Crafting classes
    case 'alchemist':
      return { path: '/i/092000/092037.png', as: 'c1' };
    case 'armorer':
      return { path: '/i/092000/092033.png', as: 'c2' };
    case 'blacksmith':
      return { path: '/i/092000/092032.png', as: 'c3' };
    case 'carpenter':
      return { path: '/i/092000/092031.png', as: 'c4' };
    case 'culinarian':
      return { path: '/i/092000/092038.png', as: 'c5' };
    case 'goldsmith':
      return { path: '/i/092000/092034.png', as: 'c6' };
    case 'leatherworker':
      return { path: '/i/092000/092035.png', as: 'c7' };
    case 'weaver':
      return { path: '/i/092000/092036.png', as: 'c8' };

    // Gathering classes
    case '60438': // Miner
      return { path: '/i/092000/092039.png', as: 'g1' };
    case '60432': // Botanist
      return { path: '/i/092000/092040.png', as: 'g2' };
    case '60929': // Fisher
      return { path: '/i/092000/092041.png', as: 'g3' };

    // Quests
    case '71201': // Regular quests
      return { path: iconPath, as: 'q1' };
    case '71221': // Main Scenario quests
      return { path: iconPath, as: 'q2' };
    case '80101': // Event quest: Halloween 1
    case '80102': // Event quest: FFXIII collaboration
    case '80103': // Event quest: Halloween 2
    case '80104': // Event quest: Slime
    case '80105': // Event quest: Little Ladies Day
    case '80106': // Event quest: Christmas
    case '80107': // Event quest: Pegasus
    case '80108': // Event quest: Valentine's Day
    case '80109': // Event quest: Flowers
    case '80110': // Event quest: Easter
    case '80111': // Event quest: Chinese New Year
    case '80112': // Event quest: Chinese New Year: Sheep
    case '80113': // Event quest: Generic event
    case '80115': // Event quest: Chinese New Year: Monkey
    case '80116': // Event quest: Gold Saucer
    case '80117': // Event quest: Yokai Watch collaboration
    case '80118': // Event quest: Chinese New Year: Rooster
    case '80119': // Event quest: Chinese New Year: Dog
    case '80120': // Event quest: Chinese New Year: Boar
    case '80121': // Event quest: Monster Hunter collaboration
    case '80123': // Event quest: FFXV collaboration
      return { path: '/i/092000/092012.png', as: 'q3' };


    default:
      console.warn(`No mapped icon path for ${pathAfterReplace} (${iconPath})`);
      return { path: iconPath, as: pathAfterReplace };
  }
}

/**
 * Minify a folder of icon images.
 * @param {Array} savedImagePaths - An array of saved image paths.
 * @param {String} folderRef - A reference to a folder within the top-level icons-raw folder.
 * @param {Object} [config] - Additional options.
 */
async function minifySavedIcons(savedImagePaths = [], folderRef = '', config) {
  console.time(`${folderRef}Minify`);
  console.info(`Minifying ${folderRef} icons...`);
  
  const use =  [
    imageminAdvpng()
  ];

  if (config) {
    const {
      resize
    } = config;

    if (resize) {
      use.push(imageminGm.resize({
        gravity: 'Center',
        height: resize,
        width: resize
      }));
    }
  }

  await imagemin(savedImagePaths, `./icons-raw/${folderRef}/`, {
    plugins: [
      imageminPngquant({ quality: '5-10' }),
      imageminPngcrush({ reduce: true }),
      imageminOptipng()
    ],
    use
  });

  console.info(`Finished minifying ${folderRef} icons.`);
  console.time(`${folderRef}Minify`);
}

/**
 * Parse and create sprite sheet for data/content/barding.json entries.
 */
async function parseBardingIcons() {
  console.time('BardingIcons');
  const content = require('../../data/content/barding.json');

  const bodyPaths = [];
  const headAndLegsPaths = [];

  content.forEach(entry => {
    const {
      iconBodyPath,
      iconHeadPath,
      iconLegsPath
    } = entry;

    if (iconBodyPath && bodyPaths.indexOf(iconBodyPath) === -1) {
      bodyPaths.push(iconBodyPath);
    }

    if (iconHeadPath && headAndLegsPaths.indexOf(iconHeadPath) === -1) {
      headAndLegsPaths.push(iconHeadPath);
    }

    if (iconLegsPath && headAndLegsPaths.indexOf(iconLegsPath) === -1) {
      headAndLegsPaths.push(iconLegsPath);
    }
  });

  await processIconGroup(bodyPaths, 'barding');
  await processIconGroup(headAndLegsPaths, 'barding-extra');

  console.timeEnd('BardingIcons');
}

/**
 * Parse and create sprite sheet for data/content/*.json entries.
 * @param {String} contentRef - A reference to the content to be parsed (e.g. 'minions').
 */
async function parseContentIcons(contentRef) {
  console.time(`${contentRef}Icons`);
  const content = require(`../../data/content/${contentRef}.json`);

  const paths = [];
  const largePaths = [];

  content.forEach(entry => {
    const {
      iconLargePath,
      iconPath
    } = entry;

    if (iconPath && paths.indexOf(iconPath) === -1) {
      paths.push(iconPath);
    }

    if (iconLargePath && largePaths.indexOf(iconLargePath) === -1) {
      largePaths.push(iconLargePath);
    }
  });

  await processIconGroup(paths, contentRef);

  if (largePaths.length) {
    await processIconGroup(largePaths, `${contentRef}-large`);
  }

  console.timeEnd(`${contentRef}Icons`);
}

/**
 * Parse and create sprite sheet for data/method/crafting.json item entries.
 */
async function parseCraftingItemIcons() {
  console.time('CraftingItemIcons');
  const recipes = require('../../data/methods/crafting.json');

  const paths = [];

  Object.values(recipes).reduce((arr, recipeGroup) => ([
    ...arr,
    ...recipeGroup
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
 * Parse and create sprite sheet for data/currency.json entries.
 */
async function parseCurrencyIcons() {
  console.time('CurrencyIcons');
  const currencies = require('../../data/currencies.json');

  const paths = [];

  currencies.forEach(currency => {
    const {
      iconPath
    } = currency;

    if (paths.indexOf(iconPath) !== -1) {
      return;
    }

    paths.push(iconPath);
  });

  await processIconGroup(paths, 'currency');
  console.timeEnd('CurrencyIcons');
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
 * Parse obtain method helper icons.
 */
async function parseMethodIcons() {
  console.time('ObtainMethodIcons');

  const paths = [
    ...getCraftingIconPaths(),
    ...getGatheringIconPaths(),
    ...getQuestJournalIconPaths(),
    { path: '/i/092000/092019.png', as: 1 }, // Shop.
    { path: '/i/092000/092013.png', as: 2 }, // Achievement.
    { path: '/i/092000/092016.png', as: 3 }, // Collectors Edition.
    { path: '/i/092000/092106.png', as: 4 }, // Instanced Content.
    { path: '/i/092000/092003.png', as: 5 }, // Legacy-related.
    { path: '/i/092000/092044.png', as: 6 }, // Recruit a Friend campaign.
    { path: '/i/092000/092065.png', as: 7 }, // Mog Station.
    { path: '/i/092000/092047.png', as: 8 }, // Fan Festival.
  ];

  await processIconGroup(paths, 'methods', { resize: 24 });
  console.timeEnd('ObtainMethodIcons');
}

/**
 * 
 * @param {Array} paths - An array of image paths to process.
 * @param {String} folderRef - A reference to a folder within the top-level icons-raw folder.
 * @param {Object} [config] - Additional options to pass through to the generator.
 */
async function processIconGroup(paths = [], folderRef = '', config) {
  const savedIcons = await fetchIconsFromPaths(paths, folderRef);

  if (!savedIcons) {
    console.info(`No new ${folderRef} icons found; skipping.`);
    return;
  }

  await minifySavedIcons(savedIcons, folderRef, config);
  await createSpriteSheet(folderRef);
}