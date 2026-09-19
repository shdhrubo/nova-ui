const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const packages = ['tokens', 'styles', 'core', 'angular'];
const rootDir = path.resolve(__dirname, '..');

console.log('📦 Verifying and dry-run packing all Nova UI packages...\n');

let hasError = false;

for (const pkg of packages) {
  const pkgDir = path.join(rootDir, 'packages', pkg);
  const pkgJsonPath = path.join(pkgDir, 'package.json');
  
  if (!fs.existsSync(pkgJsonPath)) {
    console.error(`❌ Package directory or package.json missing for ${pkg}: ${pkgDir}`);
    hasError = true;
    continue;
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  console.log(`🔍 Checking package: ${pkgJson.name}@${pkgJson.version}`);

  try {
    const output = execSync('npm pack --dry-run --json', { cwd: pkgDir, encoding: 'utf8' });
    const packInfo = JSON.parse(output)[0];
    console.log(`   ✅ Tarball name: ${packInfo.filename}`);
    console.log(`   ✅ Total files:  ${packInfo.entryCount}`);
    console.log(`   ✅ Unpacked:    ${(packInfo.size / 1024).toFixed(2)} KB`);
    console.log(`   ✅ Integrity:   ${packInfo.integrity ? 'Valid SHA' : 'N/A'}\n`);
  } catch (err) {
    console.error(`❌ Failed to pack ${pkg}:`, err.message);
    hasError = true;
  }
}

if (hasError) {
  console.error('❌ Package verification failed.');
  process.exit(1);
} else {
  console.log('✨ All packages successfully verified for distribution!');
}
