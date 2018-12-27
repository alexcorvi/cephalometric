bash scripts/lint.sh &
rm -rf dist/* &&
cp sample.png dist/sample.png
node_modules/.bin/webpack -w