#!/bin/bash

read -p "This action will bump the project version and create a new CHANGELOG.md file. Run this action when you are ready to release a new version and you have committed all previous bug and feature changes. Proceed? (y/N): " response
if [[ "$response" != "y" ]]; then
  echo "Exiting..."
  exit 1
fi

npm run version:bump
rm -f CHANGELOG.md
npm run changelog
# Remove the first character from the CHANGELOG.md file
sed -i '' '1s/^.//' ./CHANGELOG.md
# Lint the CHANGELOG.md file
npm run prettier:fix:file -- CHANGELOG.md
git add CHANGELOG.md
git commit -m "chore(release): v$(node -e "console.log(require('./package.json').version)")"
git tag -a "v$(node -e "console.log(require('./package.json').version)")" -m "chore(release): v$(node -e "console.log(require('./package.json').version)")"
git push --follow-tags
