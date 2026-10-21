import json
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
manifest = json.loads((ROOT / 'publishing/2026-10-12/manifest.json').read_text())
articles = [article for article in manifest['articles'] if 'thumbnailPath' in article]
bold = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
regular = '/System/Library/Fonts/Supplemental/Arial.ttf'
palettes = [
    ((18, 32, 54), (41, 169, 157), (247, 190, 80)),
    ((34, 26, 58), (121, 91, 180), (73, 203, 184)),
    ((36, 45, 38), (83, 153, 91), (246, 179, 75)),
    ((57, 31, 40), (184, 75, 103), (247, 190, 80)),
]

for index, article in enumerate(articles):
    background, accent, gold = palettes[index % len(palettes)]
    image = Image.new('RGB', (1200,630), background)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((32, 32, 1168, 598), 24, outline=gold, width=3)
    for row in range(4):
        y = 105 + row * 105
        x = 835 + (index * 31 + row * 29) % 100
        draw.rounded_rectangle((x, y, x + 255, y + 64), 24, outline=accent, width=4)
        draw.ellipse((x + 18, y + 19, x + 44, y + 45), fill=gold)
        draw.line((x + 62, y + 23, x + 220, y + 23), fill=accent, width=4)
        draw.line((x + 62, y + 41, x + 180, y + 41), fill=gold, width=3)
    label = 'CUSTOMER SUCCESS GUIDE' if article['section'] == 'Blog' else 'CUSTOMER SUCCESS RESEARCH'
    draw.rounded_rectangle((65, 60, 465, 110), 12, fill=accent)
    draw.text((84, 72), label, font=ImageFont.truetype(bold, 21), fill='white')
    for size in range(48, 29, -2):
        font = ImageFont.truetype(bold, size)
        lines = textwrap.wrap(article['title'], width=max(23, int(37 * 42 / size)))
        if len(lines) <= 4 and max(draw.textbbox((0, 0), line, font=font)[2] for line in lines) < 700:
            break
    y = 160
    for line in lines:
        draw.text((65, y), line, font=font, fill='white')
        y += size + 12
    draw.line((65, 490, 740, 490), fill=gold, width=4)
    draw.text((65, 518), 'Customer Success Managers', font=ImageFont.truetype(bold, 29), fill='white')
    draw.text((65, 558), 'context  •  adoption  •  verified outcomes', font=ImageFont.truetype(regular, 20), fill=accent)
    target = ROOT / article['thumbnailPath']
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, 'WEBP', quality=88, method=6)

print(f'Generated {len(articles)} declared thumbnails')
