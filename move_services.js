const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

const homeMainEnd = content.indexOf('</main>\n      </div>\n\n      <!-- ==================== SERVICES LIST (Grid) ==================== -->');

const startMarker = '<!-- ==================== SERVICES LIST (Grid) ==================== -->\n      <div class="screen" id="page-services" data-page="services">';
const endMarker = '<!-- ==================== NATURAL BEAUTY PAGE ==================== -->';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (homeMainEnd !== -1 && startIdx !== -1 && endIdx !== -1) {
    const pageServicesFull = content.slice(startIdx, endIdx);
    
    const innerStart = pageServicesFull.indexOf('<header class="top-bar">');
    const innerEnd = pageServicesFull.lastIndexOf('</div>\n\n');
    
    if (innerStart !== -1 && innerEnd !== -1) {
        const innerContent = pageServicesFull.slice(innerStart, innerEnd);
        
        const servicesSection = '\n        <!-- Services Section Appended -->\n        <section id="services-section" style="padding-bottom: 2rem;">\n' + innerContent + '\n        </section>\n';
        
        content = content.slice(0, startIdx) + '\n      ' + content.slice(endIdx);
        
        const insertPos = content.indexOf('</main>\n      </div>');
        content = content.slice(0, insertPos) + servicesSection + content.slice(insertPos);
        
        // Replace navigateTo('services') with scrollToServices() globally
        content = content.replace(/navigateTo\('services'\)/g, "scrollToServices()");
        
        fs.writeFileSync('index.html', content, 'utf-8');
        console.log("HTML Refactored.");
    } else {
        console.log("Could not find inner content.");
    }
} else {
    console.log("Could not find markers.");
}
