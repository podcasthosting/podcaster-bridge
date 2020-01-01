# /admin
The settings page in the Wordpress admin panel is based upon ReactJS. This folder contains the source code for the React application portion of the plugin.

## Setting up the Development Environment
You need to have yarn installed on your computer.
First you need to pull all of the Javascript dependencies.
```
yarn
```

Then you can run `yarn start` to start a live development session. It runs a local webserver with the scaffolding of the Wordpress admin.

## Building the React Application
Make sure you've set up the development environment.

Run `yarn build` the React application will be built to the dist directory.

Then, you can just copy the whole plugin to your Wordpress instance. It is preferable for your time and sanity to avoid copying the node_modules folder as it is very large and not necessary. In fact, the dist folder and class-podcaster-bridge-admin.php file and the .htaccess file are all you need from the admin folder for the plugin to work.

## Translations
The Wordpress CLI doesn't have the capability to discover localization calls in .tsx and .ts files, so we have some in-between steps to get to get our translations ready. 

First, we need to build the React application.

Next we need to go to the root plugin directory and run the following:
```
wp i18n make-pot . --domain=podcaster-bridge --merge=admin/languages/react-strings.pot
```

Now, our translations for the React application are in the plugin's pot file.

For each language, we need to generate the json file for Javascript to use the translations. Replace the en_US with whichever language code you are translating to.
```
npx po2json languages/podcaster-bridge-en_US.po languages/podcaster-bridge-en_US-main.js.json -f jed
```

