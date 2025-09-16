# H2WW Component Library Plugin - Troubleshooting

Quick solutions voor common Figma plugin issues.

## 🚨 Manifest Errors

### Error: "Expected 'manifest.menu[2]' to be one of the following"

**Cause**: Complex menu structures niet supported in alle Figma versions
**Solution**: Use the minimal `manifest-simple.json`

```bash
# Backup current manifest
mv manifest.json manifest-complex.json

# Use simple version
cp manifest-simple.json manifest.json

# Rebuild
npm run build
```

### Error: "Recursive type definition"

**Cause**: TypeScript types conflicting met Figma plugin API
**Solution**:
1. Check `tsconfig.json` settings
2. Use minimal manifest without advanced features
3. Remove complex menu structures

## 🔧 Quick Fixes

### Option 1: Minimal Manifest (Recommended)
```json
{
  "name": "H2WW Component Library",
  "id": "h2ww-component-library-simple",
  "api": "1.0.0",
  "main": "dist/main.js",
  "ui": "dist/ui.html"
}
```

### Option 2: Try Different Plugin ID
Change `"id"` to a unique string:
```json
{
  "id": "h2ww-plugin-test-123"
}
```

### Option 3: Fresh Install
```bash
# Clean everything
rm -rf node_modules dist
npm install
npm run build
```

## ✅ Testing Steps

1. **Build successfully**: `npm run build`
2. **Check files exist**: `ls dist/` should show `main.js`, `ui.html`, `ui.js`
3. **Validate JSON**: `node -e "JSON.parse(require('fs').readFileSync('manifest.json'))"`
4. **Import in Figma**: Use Figma Desktop → Development → Import plugin

## 🎯 Working Version

If alle else fails, use deze exacte manifest:

```json
{
  "name": "H2WW Test Plugin",
  "id": "h2ww-test-simple",
  "api": "1.0.0",
  "main": "dist/main.js",
  "ui": "dist/ui.html"
}
```

## 📞 Emergency Steps

1. Use `manifest-simple.json`
2. Change plugin name/id
3. Clean build: `rm -rf dist && npm run build`
4. Try importing again in Figma

**The plugin WILL work - it's just a manifest configuration issue! 🚀**