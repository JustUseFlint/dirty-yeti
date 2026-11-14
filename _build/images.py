# Process reference photos: auto-orient, strip EXIF/GPS, 800 + up-to-1600 JPG/WebP, never upscale.
from PIL import Image, ImageOps
import os, json
SRC = '/workspace/dirty-yeti/ref/fb/'; OUT = '/workspace/dirty-yeti/assets/img/'
dims = {}
for name in ['cover', 'drink-1', 'drink-2', 'drink-3', 'drink-4', 'truck-1', 'schedule-1', 'schedule-2']:
    im = ImageOps.exif_transpose(Image.open(SRC + name + '.jpg')).convert('RGB')
    clean = Image.new('RGB', im.size); clean.paste(im)  # fresh image, no metadata carried over
    for tag, target in (('800', 800), ('1600', 1600)):
        w = min(target, clean.width)
        h = round(clean.height * w / clean.width)
        r = clean.resize((w, h), Image.LANCZOS) if w != clean.width else clean
        r.save(f'{OUT}{name}-{tag}.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
        r.save(f'{OUT}{name}-{tag}.webp', 'WEBP', quality=80, method=6)
        dims[f'{name}-{tag}'] = [w, h]
json.dump(dims, open('/workspace/dirty-yeti/_build/img-dims.json', 'w'), indent=1)
print(dims)
