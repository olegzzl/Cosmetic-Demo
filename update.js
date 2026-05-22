const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// Replace names
content = content.replace(/Анна/g, 'Наталья');
content = content.replace(/Анны/g, 'Натальи');
content = content.replace(/Анне/g, 'Наталье');
content = content.replace(/Анну/g, 'Наталью');
content = content.replace(/Анней/g, 'Натальей');

content = content.replace(/Anna Aesthetics/g, 'Natalia Aesthetics');
content = content.replace(/Anna/g, 'Natalia');
content = content.replace(/anna/g, 'natalia');

// Replace Rubles with Hryvnias
content = content.replace(/₽/g, '₴');
content = content.replace(/руб/g, 'грн');

// Replace Russia with Ukraine
content = content.replace(/России/g, 'Украине');
content = content.replace(/Россия/g, 'Украина');

// Replace avatars
content = content.replace(/src="[^"]+"(\s+alt="(?:Наталья Косметолог|Обо мне|Косметолог|Natalia|Наталья)")/g, 'src="avatar.jpg"$1');

fs.writeFileSync('index.html', content, 'utf-8');
console.log("HTML modified successfully.");
