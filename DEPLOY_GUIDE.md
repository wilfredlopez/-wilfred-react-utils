# Deploy Guide

### TEST ALL
```
npm run test
```
### TEST ONE
```
npm run test  -t 'NameOfTheTestHere or Regex'
```
### BUILD AND DEPLOY
1. Push to Git
2. `npm run build`
3. `npm version patch -m "Upgrade reasons"`
4. `npm publish --access public`


#### UPGRADE BABEL DEPENDENCIES
```
npx babel-upgrade --write --install
```