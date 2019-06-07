# API v3

Work in progress. Not much to see here yet!

## Installation

Simply download the repo and run:

```
npm install
```

## Updating stuff

### Everything

Running this will update _everything_ and will likely take up to an hour if not longer to complete.

```
npm run update
```

This will automatically increase the memory to 4096. If this isn't required on your machine, simply remove `--max-old-space-size=4096` from the update script within package.json.

### Individual parts

To update parts individually, you can append a keyword to the end of the command to update everything to just update specific chunks:

#### Data

This updates all data required to ulitimately form the obtain method information and sprite sheets.

```
npm run update data
```

#### Content

This updates the content which the main website uses to function (like the achievements list, individual minions, and other fancy stuff).

```
npm run update content
```

#### Icons

This will create sprite sheets from the fetched data.

```
npm run update icons
```

*Important:* In order to update icons, GraphicsMagick must be installed on your machine. You'll then need to manually modify `src/parsers/icons.js` to link to the correct binary.

### Cached Data

To avoid bombarding the API with repeated calls every time we want to fetch data, any API call which is paginated will be saved in `data/cached`. This can be cleared by running:

```
npm run update cache
```