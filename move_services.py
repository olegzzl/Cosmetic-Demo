import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the end of home-main
home_main_end = content.find('</main>\n      </div>\n\n      <!-- ==================== SERVICES LIST (Grid) ==================== -->')

# Extract page-services
start_marker = '<!-- ==================== SERVICES LIST (Grid) ==================== -->\n      <div class="screen" id="page-services" data-page="services">'
end_marker = '<!-- ==================== NATURAL BEAUTY PAGE ==================== -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if home_main_end != -1 and start_idx != -1 and end_idx != -1:
    # Extract the inner part of page-services
    page_services_full = content[start_idx:end_idx]
    
    # We want to grab what's inside <div class="screen" id="page-services" data-page="services">
    inner_start = page_services_full.find('<header class="top-bar">')
    inner_end = page_services_full.rfind('</div>\n\n')
    
    inner_content = page_services_full[inner_start:inner_end]
    
    # Replace `<main class="services-main">` with `<div class="services-main">` or just keep it
    # We will wrap it in <section id="services-section">
    services_section = '\n        <!-- Services Section Appended -->\n        <section id="services-section">\n' + inner_content + '\n        </section>\n'
    
    # Remove page_services_full from content
    content = content[:start_idx] + '\n      ' + content[end_idx:]
    
    # Insert services_section before `</main>` of home
    insert_pos = content.find('</main>\n      </div>')
    content = content[:insert_pos] + services_section + content[insert_pos:]
    
    # Replace navigateTo('services') with scrollToServices()
    content = content.replace("navigateTo('services')", "scrollToServices()")
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("HTML Refactored.")
else:
    print("Could not find markers.")
