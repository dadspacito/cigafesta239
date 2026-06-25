function shuffle(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

const bandcampQueue = shuffle(window.BANDCAMP_TRACKS || []);
let bandcampIndex = 0;
let playerOpen = false;
let autoplayReloaded = false;

function cleanText(value = "") {
  return String(value)
    .replace(/[-_]+/g, " ")
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

function getEmbedUrl(track) {
  if (typeof track === "string") return track;
  return track?.embedUrl || "";
}

function getArtistName(track) {
  if (typeof track === "string") return "CIGA239";

  return cleanText(
    track?.artist ||
      track?.subtextLinkText ||
      track?.subtext ||
      track?.artistName ||
      track?.band ||
      "CIGA239",
  );
}

function getTrackTitle(track) {
  if (typeof track === "string") return titleFromUrl(track);

  return cleanText(
    track?.title ||
      track?.titleLinkText ||
      track?.trackTitle ||
      track?.name ||
      titleFromUrl(track?.pageUrl || track?.url || track?.embedUrl || "") ||
      "TRANSMISSÃO",
  );
}

function formatTrackLabel(track) {
  const artist = getArtistName(track);
  const title = getTrackTitle(track);
  return `◄ ${artist} · ${title} ►`.toUpperCase();
}

function forceAutoplayUrl(url = "") {
  if (!url) return "";

  let next = String(url).trim();

  if (!next.includes("bandcamp.com/EmbeddedPlayer")) {
    return next;
  }

  next = next.replace(/#.*$/, "").replace(/\?.*$/, "");
  next = next.replace(/\/+$/, "");

  if (!/\/autoplay=true(\/|$)/.test(next)) {
    next += "/autoplay=true";
  }

  if (!/\/tracklist=false(\/|$)/.test(next)) {
    next += "/tracklist=false";
  }

  if (!/\/transparent=true(\/|$)/.test(next)) {
    next += "/transparent=true";
  }

  return `${next}/`;
}

function setPanelOpen(open) {
  const playerPanel = document.getElementById("player-panel");
  const playerToggle = document.getElementById("player-toggle");

  playerOpen = open;
  playerPanel?.classList.toggle("is-open", open);
  playerToggle?.setAttribute("aria-expanded", String(open));
}

function updateBandcampLabel(track) {
  const srcLabel = document.getElementById("src-label");
  if (!srcLabel) return;

  srcLabel.textContent = track ? formatTrackLabel(track) : "SINAL INDISPONÍVEL_";
}

function armIframeForAutoplay(iframe) {
  iframe.setAttribute("allow", "autoplay; encrypted-media");
  iframe.setAttribute("loading", "eager");
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("seamless", "");
}

function setIframeSrcHard(iframe, url) {
  autoplayReloaded = false;
  armIframeForAutoplay(iframe);

  iframe.src = "about:blank";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      iframe.src = url;
    });
  });

  iframe.onload = () => {
    if (autoplayReloaded) return;
    autoplayReloaded = true;

    setTimeout(() => {
      if (iframe.src === url) {
        iframe.src = "about:blank";
        requestAnimationFrame(() => {
          iframe.src = url;
        });
      }
    }, 900);
  };
}

function loadBandcampTrack(index = 0) {
  const iframe = document.getElementById("bandcamp-player");

  if (!iframe || !bandcampQueue.length) {
    updateBandcampLabel(null);
    return;
  }

  bandcampIndex = ((index % bandcampQueue.length) + bandcampQueue.length) % bandcampQueue.length;

  const track = bandcampQueue[bandcampIndex];
  const embedUrl = forceAutoplayUrl(getEmbedUrl(track));

  if (!embedUrl) {
    updateBandcampLabel(null);
    return;
  }

  setIframeSrcHard(iframe, embedUrl);
  updateBandcampLabel(track);
}

function nextBandcampTrack() {
  setPanelOpen(true);
  loadBandcampTrack(bandcampIndex + 1);
}

function initBandcampPlayer() {
  const playerToggle = document.getElementById("player-toggle");
  const btnReload = document.getElementById("btn-reload");

  playerToggle?.addEventListener("click", () => {
    setPanelOpen(!playerOpen);
  });

  btnReload?.addEventListener("click", nextBandcampTrack);

  setPanelOpen(false);
  loadBandcampTrack(0);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBandcampPlayer);
} else {
  initBandcampPlayer();
}
