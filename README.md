# Getting Started with Create React App

> Dedicated UI for weather-node project

# Development requirements

Download this repository then install the project dependencies

```bash
node --version
# Verify you have node v14.21.3, you can install this version with nvm
npm i
# To upload the project to firebase
npm install -g firebase-tools
#login to firebase
firebase login
```

To upload the project, it has to be build then deployed to firebase (the front end only as shown bellow)

```bash
npm run build
firebase deploy --only hosting
```
