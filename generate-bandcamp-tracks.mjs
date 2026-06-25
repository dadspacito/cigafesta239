import { writeFile } from "node:fs/promises";

const INPUT = String.raw`
https://ciga239.bandcamp.com/track/ice-cream
https://ciga239.bandcamp.com/track/rebolim
https://ciga239.bandcamp.com/track/franklin
https://ciga239.bandcamp.com/track/dj-f1lhot-x-silvveira-fdprincesa
https://ciga239.bandcamp.com/track/silvveira-x-dj-vicecity-n-o-sei-andar-de-skate
https://ciga239.bandcamp.com/track/dj-vicecity-x-silvveira-nen-fares
https://ciga239.bandcamp.com/track/dj-mafia-x-she-co-vira
https://ciga239.bandcamp.com/track/dj-420-a-i-want-nothing-at-all
https://ciga239.bandcamp.com/track/caucenus-x-dj-420-a-abuso
https://ciga239.bandcamp.com/track/cigalenha-come-e-cala-te
https://ciga239.bandcamp.com/track/piedade-intro
https://ciga239.bandcamp.com/track/-
https://ciga239.bandcamp.com/track/--2
https://ciga239.bandcamp.com/track/setembro
https://ciga239.bandcamp.com/track/promessa
https://ciga239.bandcamp.com/track/desculpa
https://ciga239.bandcamp.com/track/--3
https://ciga239.bandcamp.com/track/ahahmmmm-2
https://ciga239.bandcamp.com/track/segredo
https://ciga239.bandcamp.com/track/agora-sei-outro
https://ciga239.bandcamp.com/track/beautiful-lie-caucenus-volt-mix
https://ciga239.bandcamp.com/track/pbj-time
https://ciga239.bandcamp.com/track/as-princesas-tambe-m-fazem-coco
https://ciga239.bandcamp.com/track/photobombing
https://ciga239.bandcamp.com/track/ahahmmmm
https://ciga239.bandcamp.com/track/tiny-grains-of-sand
https://ciga239.bandcamp.com/track/valentino-cuts
https://ciga239.bandcamp.com/track/question-mark
https://ciga239.bandcamp.com/track/mhor
https://ciga239.bandcamp.com/track/2h39-no-cidral-subsi-dio-de-fe-rias-dub
https://ciga239.bandcamp.com/track/dungeons-brega
https://ciga239.bandcamp.com/track/agora-diz-se-zi-a
https://ciga239.bandcamp.com/track/acid-heat
https://ciga239.bandcamp.com/track/focus
https://ciga239.bandcamp.com/track/projections
https://ciga239.bandcamp.com/track/tenho-de-ouvir-os-p-ssaros
https://ciga239.bandcamp.com/track/primary-recuperative-state
https://ciga239.bandcamp.com/track/sentido-este-tico
https://ciga239.bandcamp.com/track/prima-vera
https://ciga239.bandcamp.com/track/salve-as-folhas-she-co-edit
https://ciga239.bandcamp.com/track/vem-me-satisfazer-caucenus-drytek-edit
https://ciga239.bandcamp.com/track/pausa
https://ciga239.bandcamp.com/track/espero-que-este-som-te-encontre-bem
https://ciga239.bandcamp.com/track/the-warplanes-must-be-silent
https://ciga239.bandcamp.com/track/resinosa
https://ciga239.bandcamp.com/track/after-no-sereia
https://ciga239.bandcamp.com/track/intro
https://ciga239.bandcamp.com/track/lan-a-de-rampamento
https://ciga239.bandcamp.com/track/fundo-monet-rio-internacional
https://ciga239.bandcamp.com/track/7-da-manh-em-nantes
https://ciga239.bandcamp.com/track/fan-ticos-da-vida-noturna
https://ciga239.bandcamp.com/track/can-o-da-n-ria
https://ciga239.bandcamp.com/track/239-indicativo
https://ciga239.bandcamp.com/track/nissan-sunny-spoiler
https://ciga239.bandcamp.com/track/ora-o-pelas-coisas-perdidas
https://ciga239.bandcamp.com/track/mpd-para-sempre
https://ciga239.bandcamp.com/track/balada-da-despedida-type-beat
https://ciga239.bandcamp.com/track/j
https://ciga239.bandcamp.com/track/magia-negra
https://ciga239.bandcamp.com/track/dejvicka
https://ciga239.bandcamp.com/track/ramb
https://ciga239.bandcamp.com/track/interlude
https://ciga239.bandcamp.com/track/podji-senta
https://ciga239.bandcamp.com/track/untitled
https://ciga239.bandcamp.com/track/mews
https://ciga239.bandcamp.com/track/alc-ntara-mar-original-mix
https://ciga239.bandcamp.com/track/alc-ntara-mar-puff-puff-remix
https://ciga239.bandcamp.com/track/alc-ntara-mar-deep-garage-remix
https://ciga239.bandcamp.com/track/alc-ntara-mar-short-term-memory-loss-remix
https://ciga239.bandcamp.com/track/lzn-2
https://ciga239.bandcamp.com/track/lzn-instrumental
https://ciga239.bandcamp.com/track/na-simbiose
https://ciga239.bandcamp.com/track/1-futuro
https://ciga239.bandcamp.com/track/p-ntano
https://ciga239.bandcamp.com/track/vidrinhos
https://ciga239.bandcamp.com/track/vento-digital
https://ciga239.bandcamp.com/track/welcome-to-the-simulacrum-please-enjoy-your-stay
https://ciga239.bandcamp.com/track/rave-presence-and-sublimation
https://ciga239.bandcamp.com/track/the-afterlife-after-party-set-me-free
https://ciga239.bandcamp.com/track/late-stage-feudalism-work-it-baby
https://ciga239.bandcamp.com/track/aaaaaa
https://ciga239.bandcamp.com/track/bbbbbb
https://ciga239.bandcamp.com/track/boylife
https://ciga239.bandcamp.com/track/ravelife
https://ciga239.bandcamp.com/track/uma-vez-fui-a-berlim
https://ciga239.bandcamp.com/track/sauce-for-contigo
https://ciga239.bandcamp.com/track/s-o-martinho-do-bispo
https://ciga239.bandcamp.com/track/contra
`;

const EMBED_OPTIONS =
  "size=large/bgcol=fffdf7/linkcol=F5A623/tracklist=false/artwork=small/transparent=true";

const urls = [
  ...new Set(
    INPUT.split(/\s+/)
      .map((s) => s.trim())
      .filter((s) => s.startsWith("https://")),
  ),
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeHtml(value = "") {
  return String(value)
    .replaceAll("&quot;", '"')
    .replaceAll("&#34;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#039;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function cleanText(value = "") {
  return decodeHtml(String(value).replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromUrl(url = "") {
  try {
    const last = new URL(url).pathname.split("/").filter(Boolean).pop();
    return cleanText(decodeURIComponent(last || ""));
  } catch {
    return cleanText(String(url).split("/").filter(Boolean).pop() || "");
  }
}

function matchFirst(text, patterns) {
  for (const pattern of patterns) {
    const found = text.match(pattern);
    if (found?.[1]) return found[1];
  }
  return "";
}

function getMetaContent(html, selectorName) {
  const meta = html.match(
    new RegExp(`<meta[^>]+(?:name|property)=["']${selectorName}["'][^>]*>`, "i"),
  )?.[0];

  if (!meta) return "";

  return decodeHtml(meta.match(/content=(["'])(.*?)\1/i)?.[2] || "");
}

function getBcPageProperties(html) {
  const meta = html.match(/<meta[^>]+name=["']bc-page-properties["'][^>]*>/i)?.[0];
  if (!meta) return null;

  const content = meta.match(/content=(["'])(.*?)\1/i)?.[2];
  if (!content) return null;

  try {
    return JSON.parse(decodeHtml(content));
  } catch {
    return null;
  }
}

function extractDataTralbum(html) {
  const attr = html.match(/data-tralbum=(["'])([\s\S]*?)\1/i)?.[2];
  if (!attr) return null;

  try {
    return JSON.parse(decodeHtml(attr));
  } catch {
    return null;
  }
}

function extractIds(html) {
  const decoded = decodeHtml(html);
  const props = getBcPageProperties(html);
  const tralbum = extractDataTralbum(html);

  const trackId =
    props?.item_type === "track" && props?.item_id
      ? String(props.item_id)
      : tralbum?.current?.type === "track" && tralbum?.current?.id
        ? String(tralbum.current.id)
        : matchFirst(decoded, [
            /<!--\s*track id\s+(\d+)\s*-->/i,
            /track=(\d+)/i,
            /"track_id"\s*:\s*(\d+)/i,
            /"item_type"\s*:\s*"track"[\s\S]{0,300}?"item_id"\s*:\s*(\d+)/i,
            /"item_id"\s*:\s*(\d+)[\s\S]{0,300}?"item_type"\s*:\s*"track"/i,
          ]);

  const albumId =
    tralbum?.current?.type === "album" && tralbum?.current?.id
      ? String(tralbum.current.id)
      : matchFirst(decoded, [
          /<!--\s*album id\s+(\d+)\s*-->/i,
          /album=(\d+)/i,
          /"album_id"\s*:\s*(\d+)/i,
        ]);

  return { trackId, albumId, tralbum };
}

function buildEmbedUrl({ trackId, albumId }) {
  if (albumId && trackId) {
    return `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/track=${trackId}/${EMBED_OPTIONS}/`;
  }

  return `https://bandcamp.com/EmbeddedPlayer/track=${trackId}/${EMBED_OPTIONS}/`;
}

function extractLinkTextById(html, id) {
  const pattern = new RegExp(`<a\\b[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/a>`, "i");
  return cleanText(html.match(pattern)?.[1] || "");
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.text();
}

async function fetchEmbedMetadata(embedUrl) {
  try {
    const html = await fetchText(embedUrl);

    return {
      artist: extractLinkTextById(html, "subtextlink"),
      title: extractLinkTextById(html, "titlelink"),
      embedHtml: html,
    };
  } catch (error) {
    console.warn(`  aviso: não consegui ler embed metadata: ${error.message}`);
    return { artist: "", title: "", embedHtml: "" };
  }
}

function extractPageTitle(html, pageUrl, tralbum) {
  const fromTralbum = cleanText(
    tralbum?.current?.title ||
      tralbum?.trackinfo?.find?.((track) => track?.track_id)?.title ||
      "",
  );

  if (fromTralbum) return fromTralbum;

  const fromOg = cleanText(getMetaContent(html, "og:title"));
  if (fromOg) return fromOg.replace(/\s*\|\s*.*$/, "");

  const fromTitle = cleanText(matchFirst(html, [/<title[^>]*>([\s\S]*?)<\/title>/i]));
  if (fromTitle) return fromTitle.replace(/\s*\|\s*.*$/, "");

  return titleFromUrl(pageUrl);
}

function extractPageArtist(html) {
  const ogTitle = cleanText(getMetaContent(html, "og:title"));
  const byMatch = ogTitle.match(/\s+by\s+(.+)$/i);
  if (byMatch?.[1]) return cleanText(byMatch[1]);

  const siteName = cleanText(getMetaContent(html, "og:site_name"));
  if (siteName) return siteName;

  return "";
}

const tracks = [];
const failed = [];

for (const pageUrl of urls) {
  const slug = new URL(pageUrl).pathname.split("/").filter(Boolean).pop() || "track";

  try {
    const pageHtml = await fetchText(pageUrl);
    const { trackId, albumId, tralbum } = extractIds(pageHtml);

    if (!trackId) {
      throw new Error("não consegui encontrar trackId");
    }

    const embedUrl = buildEmbedUrl({ trackId, albumId });
    const embedMetadata = await fetchEmbedMetadata(embedUrl);

    const title = cleanText(embedMetadata.title || extractPageTitle(pageHtml, pageUrl, tralbum) || titleFromUrl(pageUrl));
    const artist = cleanText(embedMetadata.artist || extractPageArtist(pageHtml) || "CIGA239");

    tracks.push({
      artist,
      title,
      slug,
      pageUrl,
      trackId,
      albumId: albumId || null,
      embedUrl,
    });

    console.log(`OK ${artist} · ${title} → ${trackId}`);
  } catch (error) {
    failed.push({ pageUrl, error: error.message });
    console.warn(`FALHOU ${pageUrl}: ${error.message}`);
  }

  await sleep(300);
}

const output = `window.BANDCAMP_TRACKS = ${JSON.stringify(tracks, null, 2)};\n`;

await writeFile("tracks.js", output, "utf8");

console.log(`\nGerado tracks.js com ${tracks.length} tracks.`);

if (failed.length) {
  console.log("\nFalharam estas:");
  console.table(failed);
}
