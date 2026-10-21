#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const vsixName = `${pkg.name}-${pkg.version}.vsix`;
const vsixDest = path.join(rootDir, vsixName);

console.log(`Building VSIX package: ${vsixName}...`);

const tmpDir = path.join('/tmp', `vsix-build-${Date.now()}`);
fs.mkdirSync(tmpDir, { recursive: true });

try {
  // 1. [Content_Types].xml
  const contentTypes = `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension=".json" ContentType="application/json"/><Default Extension=".vsixmanifest" ContentType="text/xml"/><Default Extension=".md" ContentType="text/markdown"/></Types>`;
  fs.writeFileSync(path.join(tmpDir, '[Content_Types].xml'), contentTypes, 'utf8');

  // 2. extension.vsixmanifest
  const tags = (pkg.keywords || []).concat(['color-theme', '__web_extension']).join(',');
  const categories = (pkg.categories || ['Themes']).join(',');
  const manifest = `<?xml version="1.0" encoding="utf-8"?>
\t<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
\t\t<Metadata>
\t\t\t<Identity Language="en-US" Id="${pkg.name}" Version="${pkg.version}" Publisher="${pkg.publisher}" />
\t\t\t<DisplayName>${pkg.displayName}</DisplayName>
\t\t\t<Description xml:space="preserve">${pkg.description}</Description>
\t\t\t<Tags>${tags}</Tags>
\t\t\t<Categories>${categories}</Categories>
\t\t\t<GalleryFlags>Public</GalleryFlags>
\t\t\t<Properties>
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.Engine" Value="${pkg.engines?.vscode || '^1.60.0'}" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.ExtensionDependencies" Value="" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.ExtensionPack" Value="" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.ExtensionKind" Value="ui,workspace,web" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Code.LocalizedLanguages" Value="" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Services.GitHubFlavoredMarkdown" Value="true" />
\t\t\t\t<Property Id="Microsoft.VisualStudio.Services.Content.Pricing" Value="Free"/>
\t\t\t</Properties>
\t\t</Metadata>
\t\t<Installation>
\t\t\t<InstallationTarget Id="Microsoft.VisualStudio.Code"/>
\t\t</Installation>
\t\t<Dependencies/>
\t\t<Assets>
\t\t\t<Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
\t\t\t<Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true" />
\t\t</Assets>
\t</PackageManifest>`;
  fs.writeFileSync(path.join(tmpDir, 'extension.vsixmanifest'), manifest, 'utf8');

  // 3. extension payload directory
  const extDir = path.join(tmpDir, 'extension');
  fs.mkdirSync(extDir, { recursive: true });

  // Copy package.json & README.md
  fs.copyFileSync(pkgPath, path.join(extDir, 'package.json'));
  if (fs.existsSync(path.join(rootDir, 'README.md'))) {
    fs.copyFileSync(path.join(rootDir, 'README.md'), path.join(extDir, 'README.md'));
  }

  // Copy themes/
  const themesSrc = path.join(rootDir, 'themes');
  const themesDest = path.join(extDir, 'themes');
  fs.mkdirSync(themesDest, { recursive: true });
  for (const file of fs.readdirSync(themesSrc)) {
    if (file.endsWith('.json')) {
      fs.copyFileSync(path.join(themesSrc, file), path.join(themesDest, file));
    }
  }

  // Copy extensions-pack/ if present
  const packSrc = path.join(rootDir, 'extensions-pack');
  if (fs.existsSync(packSrc)) {
    fs.cpSync(packSrc, path.join(extDir, 'extensions-pack'), { recursive: true });
  }

  // 4. Zip archive into .vsix
  if (fs.existsSync(vsixDest)) {
    try {
      fs.unlinkSync(vsixDest);
    } catch (_) {}
  }

  execSync(`zip -q -r "${vsixDest}" * "\\[Content_Types\\].xml"`, {
    cwd: tmpDir,
    stdio: 'inherit'
  });

  const stats = fs.statSync(vsixDest);
  console.log(`Successfully built: ${vsixName} (${(stats.size / 1024).toFixed(1)} KB)`);
} finally {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (_) {}
}
