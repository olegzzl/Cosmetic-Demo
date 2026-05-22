import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace names
content = content.replace('Анна', 'Наталья')
content = content.replace('Анны', 'Натальи')
content = content.replace('Анне', 'Наталье')
content = content.replace('Анну', 'Наталью')
content = content.replace('Анней', 'Натальей')

content = content.replace('Anna Aesthetics', 'Natalia Aesthetics')
content = content.replace('Anna', 'Natalia')
content = content.replace('anna', 'natalia')

# Replace Rubles with Hryvnias
content = content.replace('₽', '₴')
content = content.replace('руб', 'грн')

# Replace Russia with Ukraine
content = content.replace('России', 'Украине')
content = content.replace('Россия', 'Украина')

# Replace avatars
content = re.sub(r'src="[^"]+"(\s+alt="(?:Наталья Косметолог|Обо мне|Косметолог|Natalia|Наталья)")', r'src="avatar.jpg"\1', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML modified successfully.")
