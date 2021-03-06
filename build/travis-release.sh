#!/bin/bash
set -ev

# Update version.js with latest
NIGHTLY_VERSION=`npm info | grep latest | cut -d " " -f 2`
echo "window.SIMPUT_VERSION = '$NIGHTLY_VERSION';" > dist/version.js

npm run build:release
npm run validate
npm run types
git config --global user.name "Sebastien Jourdain"
git config --global user.email "sebastien.jourdain@kitware.com"
export GIT_PUBLISH_URL=https://${GH_TOKEN}@github.com/Kitware/simput.git
npm run semantic-release

# Needed if not a release for nightly bundle
npm run bundle

# Generate website
npm run doc:publish
