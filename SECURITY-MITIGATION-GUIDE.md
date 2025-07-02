# Quick Security Mitigation Guide

## webpack-dev-server Vulnerability (CVE-2025-30360)

### ⚡ Immediate Actions Required

1. **Ensure dev server is localhost only**
   ```bash
   # Run the security check script
   chmod +x check-webpack-dev-server-security.sh
   ./check-webpack-dev-server-security.sh
   ```

2. **For development, use ONLY these browsers:**
   - ✅ Chrome 94+
   - ✅ Microsoft Edge (Chromium)
   - ✅ Brave
   - ❌ Firefox (vulnerable)
   - ❌ Safari (vulnerable)

### 🛡️ Best Practices

1. **Never run dev server with `--host 0.0.0.0`**
2. **Use VPN on public networks**
3. **Don't visit untrusted websites while dev server is running**

### 🔄 Long-term Fix Options

#### Option 1: Use Docusaurus Faster (Recommended)
```bash
cd apps/docs
pnpm add @docusaurus/faster
```

Then add to `docusaurus.config.js`:
```js
future: {
  experimental_faster: true,
}
```

#### Option 2: Wait for Docusaurus Update
Monitor https://github.com/facebook/docusaurus/releases

### 📊 Risk Level
- **Production sites:** ✅ NOT AFFECTED
- **Local development:** ⚠️ LOW RISK (if following guidelines)

### 🆘 Questions?
See full report: `webpack-dev-server-vulnerability-report.md`