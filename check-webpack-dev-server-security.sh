#!/bin/bash

echo "=== webpack-dev-server Security Check ==="
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if the dev server is running
if lsof -i :4000 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Development server is currently running on port 4000${NC}"
    echo "Checking if it's exposed to the network..."
    
    # Check if it's listening on all interfaces (0.0.0.0)
    if lsof -i :4000 | grep -q "0.0.0.0:4000"; then
        echo -e "${RED}❌ SECURITY RISK: Dev server is exposed to all network interfaces!${NC}"
        echo "Please stop the server and restart with localhost only."
    else
        echo -e "${GREEN}✅ Dev server is listening on localhost only${NC}"
    fi
else
    echo "Development server is not currently running."
fi

echo
echo "=== Checking package.json configuration ==="

# Check if the dev script has explicit host configuration
if grep -q '"dev":.*--host' apps/docs/package.json; then
    echo -e "${GREEN}✅ Dev script has explicit host configuration${NC}"
else
    echo -e "${YELLOW}⚠️  Dev script doesn't have explicit host configuration${NC}"
    echo "It will default to localhost, but it's better to be explicit."
    echo
    echo "Would you like to update the dev script to explicitly use localhost? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        # Backup the original file
        cp apps/docs/package.json apps/docs/package.json.backup
        
        # Update the dev script
        sed -i '' 's/"dev": "docusaurus start --port 4000"/"dev": "docusaurus start --host localhost --port 4000"/' apps/docs/package.json
        
        echo -e "${GREEN}✅ Updated dev script to explicitly use localhost${NC}"
        echo "Original file backed up to apps/docs/package.json.backup"
    fi
fi

echo
echo "=== Recommendations ==="
echo "1. Always use Chromium-based browsers for development (Chrome, Edge, Brave)"
echo "2. Never expose the dev server to public networks"
echo "3. Consider testing Docusaurus Faster (Rspack) as an alternative"
echo
echo "For more details, see: webpack-dev-server-vulnerability-report.md"