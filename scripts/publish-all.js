const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const packages = ['tokens', 'styles', 'core', 'angular'];
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Publishing all 4 Nova UI packages to npm (@nova-ui-library)...\n');

for (const pkg of packages) {
  const pkgDir = path.join(rootDir, 'packages', pkg);
  const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));

  console.log(`========================================`);
  console.log(`📦 Publishing ${pkgJson.name}@${pkgJson.version}`);
  console.log(`========================================\n`);

  const result = spawnSync('npm', ['publish', '--access', 'public'], {
    cwd: pkgDir,
    stdio: 'inherit',
    shell: true,
  });

  if (result.status !== 0) {
    console.error(`\n❌ Failed to publish ${pkgJson.name}. Stopping process.`);
    process.exit(result.status);
  }

  console.log(`\n✅ Successfully published ${pkgJson.name}@${pkgJson.version}!\n`);
}

console.log('🎉 All 4 packages have been successfully published to npm!');
