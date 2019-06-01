# API v3

Work in progress. Nothing to see here... yet.

## Installation

Simply download the repo and run:

```
npm install
```

## Updating stuff

### Everything

Running this will update _everything_ and will likely take up to an hour if not longer to complete.

```
node src/update.js
```

### Individual parts

To update parts individually, you can append a keyword to the end of the command to update everything to just update specific chunks:

#### Data

This updates all data required to ulitimately form the obtain method information and sprite sheets.

```
node src/update.js data
```

#### Icons

This will create sprite sheets from the fetched data.

```
node src/update.js icons
```