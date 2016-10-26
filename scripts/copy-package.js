var fs = require('fs');
var process = require('process');
var path = require('path');
var process = require('process');

var originalPath = path.join(process.cwd(), 'package.json');
var tempPath = path.join(process.cwd(), 'package_tmp.json');
var packageJson = require(originalPath);
var readme = fs.readFileSync(path.join(process.cwd(), 'README.md'));

if (! packageJson) {
  throw new Error('Can\'t find package json');
}

delete packageJson.devDependencies;
delete packageJson.dependencies;
delete packageJson.scripts;

console.log(originalPath);
fs.renameSync(originalPath, tempPath);
fs.writeFile(originalPath, JSON.stringify(packageJson, null, 2));
fs.rmdirSync(originalPath);
fs.renameSync(tempPath, originalPath);
