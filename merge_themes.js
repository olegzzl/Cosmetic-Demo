const fs = require('fs');

const lightCss = fs.readFileSync('d:\\ANTIGRAVITY\\COSMETIC\\styles.css', 'utf-8');
const darkCss = fs.readFileSync('d:\\ANTIGRAVITY\\COSMETIC Black\\styles.css', 'utf-8');

const lightMatch = lightCss.match(/:root\s*\{([\s\S]*?)\/\*\s*Spacing\s*\*\//);
const lightVars = lightMatch ? lightMatch[1].trim() : '';

const darkMatch = darkCss.match(/:root\s*\{([\s\S]*?)\/\*\s*Spacing\s*\*\//);
const darkVars = darkMatch ? darkMatch[1].trim() : '';

if (lightVars && darkVars) {
    const newColorsBlock = `  ${lightVars}\n}\n\n[data-theme="dark"] {\n  ${darkVars}\n`;
    const newDarkCss = darkCss.replace(/:root\s*\{[\s\S]*?\/\*\s*Spacing\s*\*\//, `:root {\n${newColorsBlock}  /* Spacing */`);
    
    fs.writeFileSync('d:\\ANTIGRAVITY\\COSMETIC Black\\styles.css', newDarkCss, 'utf-8');
    console.log("CSS themes merged successfully.");
} else {
    console.log("Failed to match variables.");
}
