import re

with open(r'd:\ANTIGRAVITY\COSMETIC Black\styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's fix the specific area from --brand-text-secondary to the Reset & Base comment
# We know the light theme is currently [data-theme="light"] { ... }

# Find the start of the file up to --brand-lavender
start_match = re.search(r'(--brand-lavender:\s*[^;]+;)', content)
if start_match:
    start_pos = start_match.end()
    
# We will just replace everything from --brand-text-secondary up to /* --- Reset & Base --- */
# with a clean block.

clean_block = """
  --brand-text-secondary: #A0A0A0;

  /* Spacing */
  --page-margin: 1.25rem;
  --stack-sm: 0.5rem;
  --stack-md: 1rem;
  --stack-lg: 1.5rem;
  --gutter: 0.75rem;

  /* Radius */
  --radius-card: 22px;
  --radius-card-lg: 24px;
  --radius-pill: 999px;
  --radius-md: 16px;
  --radius-sm: 12px;

  /* Shadows */
  --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.06);
  --shadow-nav: 0 -10px 20px rgba(0, 0, 0, 0.03);

  /* Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: 200ms var(--ease-out);
  --transition-normal: 350ms var(--ease-out);
  --transition-page: 400ms var(--ease-out);
}

[data-theme="light"] {
  --bg: #FDFBF9;
  --surface: #fbf9f8;
  --surface-dim: #dbdad9;
  --surface-container: #efeded;
  --surface-container-low: #f5f3f3;
  --surface-container-high: #e9e8e7;
  --surface-container-highest: #e4e2e2;
  --surface-container-lowest: #ffffff;
  --surface-variant: #e4e2e2;

  --primary: #615c67;
  --primary-container: #eae3f0;
  --on-primary: #ffffff;
  --on-primary-container: #69646f;
  --on-surface: #1b1c1c;
  --on-surface-variant: #48464b;
  --on-background: #1b1c1c;
  --secondary: #605e5c;
  --secondary-container: #e6e2df;
  --on-secondary-container: #666462;
  --tertiary: #5d5f5f;
  --tertiary-container: #e6e6e6;
  --outline: #79767c;
  --outline-variant: #cac5cb;
  --inverse-surface: #303031;

  --lavender: #E6DFEE;
  --lavender-light: #EBE4F2;
  --beige: #F8F2EC;
  --brand-button: #EBE6DC;
  --brand-lavender: #E2E2ED;
  --brand-text-secondary: #7A7A7A;
}

/* --- Reset & Base --- */"""

# Replace everything between --brand-text-secondary and /* --- Reset & Base --- */
new_content = re.sub(r'--brand-text-secondary:[\s\S]*?/\*\s*---\s*Reset\s*&\s*Base\s*---\s*\*/', clean_block, content)

with open(r'd:\ANTIGRAVITY\COSMETIC Black\styles.css', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed CSS syntax!")
