import re

# Read both styles
with open(r'd:\ANTIGRAVITY\COSMETIC\styles.css', 'r', encoding='utf-8') as f_light:
    light_css = f_light.read()

with open(r'd:\ANTIGRAVITY\COSMETIC Black\styles.css', 'r', encoding='utf-8') as f_dark:
    dark_css = f_dark.read()

# Extract light variables
light_match = re.search(r':root\s*\{([\s\S]*?)/* Spacing */', light_css)
light_vars = light_match.group(1).strip() if light_match else ""

# Extract dark variables
dark_match = re.search(r':root\s*\{([\s\S]*?)/* Spacing */', dark_css)
dark_vars = dark_match.group(1).strip() if dark_match else ""

# The new block to replace the current :root colors in dark_css
new_colors_block = f"""  {light_vars}
}}

[data-theme="dark"] {{
  {dark_vars}
"""

# Replace the variables block in dark_css
new_dark_css = re.sub(r':root\s*\{[\s\S]*?/\* Spacing \*/', f":root {{\n{new_colors_block}\n  /* Spacing */", dark_css, count=1)

with open(r'd:\ANTIGRAVITY\COSMETIC Black\styles.css', 'w', encoding='utf-8') as f:
    f.write(new_dark_css)

print("CSS themes merged.")
