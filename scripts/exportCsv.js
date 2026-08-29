const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/startups.ts');
const fileText = fs.readFileSync(filePath, 'utf8');

const match = fileText.match(/export const INITIAL_STARTUPS[^=]*=\s*(\[\s*\{[\s\S]*?\}\s*\]);/);

if (match) {
  try {
    const startups = eval(match[1]);
    const lines = ['id,name,website,industry,area,careers_url,job_title,job_category,salary_range,experience_level'];
    
    startups.forEach((s) => {
      const id = s.id || '';
      const name = `"${(s.name || '').replace(/"/g, '""')}"`;
      const website = s.website || '';
      const industry = `"${(s.industry || '').replace(/"/g, '""')}"`;
      const area = `"${(s.location?.area || '').replace(/"/g, '""')}"`;
      const careersUrl = website ? `${website.replace(/\/+$/, '')}/careers` : '';
      
      lines.push(`${id},${name},${website},${industry},${area},${careersUrl},,,,`);
    });

    const outputPath = path.join(__dirname, '../public/hyderabad_startups_list.csv');
    fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
    console.log(`EXPORT_SUCCESS: Exported ${startups.length} companies to public/hyderabad_startups_list.csv`);
  } catch (err) {
    console.error('EXPORT_ERROR:', err);
  }
} else {
  console.error('MATCH_NOT_FOUND');
}
