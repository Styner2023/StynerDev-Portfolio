#!/usr/bin/env bash
# Optimize client portfolio media into web-ready assets/images/portfolio/.
# Originals stay untouched in assets/ecotones-webdev/.
set -euo pipefail

SRC="$(cd "$(dirname "$0")/.." && pwd)/assets/ecotones-webdev/Portfolio "
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/images/portfolio"
MAX_PX=1920
JPEG_Q=70
VIDEO_MAX=1280
VIDEO_CRF=27

mkdir -p "$OUT"/{broom-pulling,burning,canticle-creek,canticle-pond,parkridge-pond,training}

img() {
  # img <src> <dst-jpg>
  local src="$1" dst="$2"
  sips -s format jpeg -s formatOptions "$JPEG_Q" -Z "$MAX_PX" "$src" --out "$dst" >/dev/null
}

vid() {
  # vid <src> <dst-mp4>  -- transcodes + writes a poster jpg
  local src="$1" dst="$2"
  local poster="${dst%.mp4}-poster.jpg"
  ffmpeg -y -loglevel error -i "$src" \
    -vf "scale='min($VIDEO_MAX,iw)':'-2'" \
    -c:v libx264 -preset medium -crf "$VIDEO_CRF" -pix_fmt yuv420p -movflags +faststart \
    -c:a aac -b:a 96k -ac 2 \
    "$dst"
  ffmpeg -y -loglevel error -i "$src" -ss 00:00:01 -vframes 1 \
    -vf "scale='min($MAX_PX,iw)':'-2'" -q:v 4 "$poster"
}

echo "→ broom-pulling"
vid "$SRC/Broom pulling /IMG_4782.MOV"  "$OUT/broom-pulling/pulling-1.mp4"
vid "$SRC/Broom pulling /IMG_4796.MOV"  "$OUT/broom-pulling/pulling-2.mp4"

echo "→ burning"
img "$SRC/Burning /IMG_2770.png"        "$OUT/burning/burn-1.jpg"
img "$SRC/Burning /IMG_4940.png"        "$OUT/burning/burn-2.jpg"
img "$SRC/Burning /IMG_4941.png"        "$OUT/burning/burn-3.jpg"
vid "$SRC/Burning /IMG_2335.MOV"        "$OUT/burning/burn-action.mp4"
vid "$SRC/Burning /Pile burning Timelapse.MOV" "$OUT/burning/burn-timelapse.mp4"

echo "→ canticle-creek"
img "$SRC/Canticle Creek /Before 1.jpg" "$OUT/canticle-creek/creek-before-1.jpg"
img "$SRC/Canticle Creek /Before 2.jpg" "$OUT/canticle-creek/creek-before-2.jpg"
img "$SRC/Canticle Creek /After 1.png"  "$OUT/canticle-creek/creek-after-1.jpg"
img "$SRC/Canticle Creek /After 2.png"  "$OUT/canticle-creek/creek-after-2.jpg"
img "$SRC/Canticle Creek /IMG_3507.png" "$OUT/canticle-creek/creek-1.jpg"
img "$SRC/Canticle Creek /IMG_6641.png" "$OUT/canticle-creek/creek-2.jpg"

echo "→ canticle-pond"
img "$SRC/Canticle pond /IMG_7026.png"  "$OUT/canticle-pond/pond-1.jpg"
img "$SRC/Canticle pond /IMG_7584.png"  "$OUT/canticle-pond/pond-2.jpg"
img "$SRC/Canticle pond /IMG_8092.png"  "$OUT/canticle-pond/pond-3.jpg"
vid "$SRC/Canticle pond /IMG_8104.MOV"  "$OUT/canticle-pond/pond-clip.mp4"

echo "→ parkridge-pond"
img "$SRC/Parkridge Pond/IMG_5480.png"  "$OUT/parkridge-pond/parkridge-1.jpg"
img "$SRC/Parkridge Pond/IMG_5493.png"  "$OUT/parkridge-pond/parkridge-2.jpg"
img "$SRC/Parkridge Pond/IMG_5495.png"  "$OUT/parkridge-pond/parkridge-3.jpg"
img "$SRC/Parkridge Pond/IMG_5915.png"  "$OUT/parkridge-pond/parkridge-4.jpg"
img "$SRC/Parkridge Pond/IMG_6020.png"  "$OUT/parkridge-pond/parkridge-5.jpg"
vid "$SRC/Parkridge Pond/Parkridge Pond .MOV" "$OUT/parkridge-pond/parkridge-overview.mp4"

echo "→ training (deduped)"
img "$SRC/Training /Kingmakersxcanticle.JPG"                                          "$OUT/training/training-1.jpg"
img "$SRC/Training /SEC Resilient Landscaping Class 4-26-25 Austin Noble-1.JPEG"      "$OUT/training/training-2.jpg"
img "$SRC/Training /SEC Resilient Landscaping Class 4-26-25 Austin Noble-3.JPEG"      "$OUT/training/training-3.jpg"
img "$SRC/Training /SEC Resilient Landscaping Class 4-26-25 Austin Noble-5.JPEG"      "$OUT/training/training-4.jpg"
img "$SRC/Training /SEC Resilient Landscaping Class 4-26-25 Austin Noble-8.JPEG"      "$OUT/training/training-5.jpg"
img "$SRC/Training /SEC Resilient Landscaping Class 4-26-25 Austin Noble-11.JPEG"     "$OUT/training/training-6.jpg"
img "$SRC/Training /SEC Resilient Landscaping Class 4-26-25 Austin Noble-18.JPEG"     "$OUT/training/training-7.jpg"
img "$SRC/Training /0928a5e6-bfed-4d71-bd25-537b1eb6c284.jpg"                         "$OUT/training/training-8.jpg"
img "$SRC/Training /12e4a139-8430-4fc7-b589-239cdba5d615.jpg"                         "$OUT/training/training-9.jpg"
img "$SRC/Training /40982365-efd8-42a8-b5bd-4377b8171afa.jpg"                         "$OUT/training/training-10.jpg"
img "$SRC/Training /7a90f34d-3924-4435-b30f-b92d059b6778.jpg"                         "$OUT/training/training-11.jpg"
img "$SRC/Training /IMG_6398.JPG"                                                     "$OUT/training/training-12.jpg"
img "$SRC/Training /IMG_6399.JPG"                                                     "$OUT/training/training-13.jpg"

echo
echo "Done. Sizes:"
du -sh "$OUT"/*
echo
echo "Total:"
du -sh "$OUT"
