import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";

// Load env vars like Vite does
config();
if (fs.existsSync(".env.local")) {
  config({ path: ".env.local", override: true });
}
if (process.env.NODE_ENV) {
  const envModePath = `.env.${process.env.NODE_ENV}`;
  if (fs.existsSync(envModePath)) {
    config({ path: envModePath, override: true });
  }
  const envModeLocalPath = `.env.${process.env.NODE_ENV}.local`;
  if (fs.existsSync(envModeLocalPath)) {
    config({ path: envModeLocalPath, override: true });
  }
}

if (process.env.SKIP_GALLERY_FETCH === "true") {
  console.log("⏭️  Skipping gallery fetch (SKIP_GALLERY_FETCH=true)");
  const outPath = path.resolve("src/data/gallery.generated.json");
  if (!fs.existsSync(outPath)) {
    console.log("   Creating fallback empty gallery stub to prevent bundler errors.");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, "{}");
  }
  process.exit(0);
}

// Use paths.ts correctly
import { IK_FOLDERS, GALLERY_YEAR_MAP, type IKFolderKey } from "../src/lib/imagekit.paths";

interface ImageKitFile {
  url: string;
  [key: string]: unknown;
}

type GalleryData = Record<string, string[]>;

/**
 * Checks if a string is a placeholder or missing.
 */
function isPlaceholder(val: string | undefined): boolean {
  if (!val) return true;
  const v = val.toLowerCase();
  return v.includes("your_") || v === "placeholder" || v.includes("...");
}

async function fetchFolder(folderKey: IKFolderKey): Promise<string[]> {
  /**
   * IMAGEKIT_PRIVATE_KEY Security:
   * This key is ONLY consumed by this build-time script.
   * It is never bundled into the frontend code (notice the lack of VITE_ prefix).
   */
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (isPlaceholder(privateKey)) {
    console.warn(
      `  [skip] IMAGEKIT_PRIVATE_KEY is missing or a placeholder — skipping ${folderKey}`,
    );
    return [];
  }

  const folderPath = IK_FOLDERS[folderKey];
  const credentials = Buffer.from(`${privateKey}:`).toString("base64");

  const allFiles: string[] = [];
  let hasMore: boolean;

  do {
    const url = new URL("https://api.imagekit.io/v1/files");
    url.searchParams.set("path", folderPath);
    url.searchParams.set("type", "file");
    url.searchParams.set("limit", "100");
    url.searchParams.set("skip", String(allFiles.length));

    try {
      const res = await fetch(url.toString(), {
        headers: { Authorization: `Basic ${credentials}` },
      });

      if (!res.ok) {
        throw new Error(`ImageKit API returned ${res.status}: ${res.statusText}`);
      }

      const files = (await res.json()) as ImageKitFile[] | { files: ImageKitFile[] };

      let filesArray: ImageKitFile[] = [];
      if (Array.isArray(files)) {
        filesArray = files;
      } else if (files && typeof files === "object" && Array.isArray(files.files)) {
        filesArray = files.files;
      }

      const urls = filesArray
        .filter((f) => typeof f?.url === "string")
        .map((f: ImageKitFile) => f.url);

      allFiles.push(...urls);

      if (allFiles.length > filesArray.length) {
        process.stdout.write(`.`);
      }

      hasMore = filesArray.length === 100;
    } catch (err) {
      console.error(`  [error] Failed to fetch folder ${folderPath}:`, err);
      throw err;
    }
  } while (hasMore);

  return allFiles;
}

function loadExistingGallery(outPath: string): GalleryData {
  if (fs.existsSync(outPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(outPath, "utf-8"));
      console.log(
        `  [info] Loaded existing gallery data with ${Object.keys(parsed).length} years.\n`,
      );
      return parsed;
    } catch (err) {
      console.warn(
        `  [warn] Failed to parse existing gallery data, starting fresh.`,
        err instanceof Error ? err.message : err,
      );
    }
  }
  return {};
}

async function processGalleryFolders(gallery: GalleryData, isSecretMissing: boolean) {
  for (const [year, folderKey] of Object.entries(GALLERY_YEAR_MAP)) {
    process.stdout.write(`  → ${year} (${folderKey})... `);

    // If secrets missing AND we already have data for this year, preserve it
    if (isSecretMissing && gallery[year] && gallery[year].length > 0) {
      console.log(`preserved (${gallery[year].length} images)`);
      continue;
    }

    try {
      const urls = await fetchFolder(folderKey);
      if (urls.length > 0) {
        gallery[year] = urls;
        console.log(`${urls.length} images`);
      } else if (gallery[year]) {
        console.log(`kept existing (${gallery[year].length} images)`);
      } else {
        gallery[year] = [];
        console.log(`0 images (fallback)`);
      }
    } catch (err) {
      console.log(`failed!`);
      // If we have data from a previous run, don't fail the build, just warn
      if (gallery[year] && gallery[year].length > 0) {
        console.warn(`  [warn] Fetch failed but preserving existing data for ${year}.`);
      } else {
        throw err;
      }
    }
  }
}

function saveGallery(gallery: GalleryData, outPath: string, outDir: string) {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    const jsonOutput = JSON.stringify(gallery, null, 2);
    // Ignore writes in pure Node due to EBADF Windows node bug
    try {
      const { writeFileSync } = fs;
      writeFileSync(outPath, jsonOutput, "utf-8");
      console.log(`\n✅ Saved to src/data/gallery.generated.json\n`);
    } catch (writeErr) {
      console.warn(
        `\n⚠️  Failed to save file to disk (node Windows EBADF bug) but skipping to continue build.`,
        writeErr instanceof Error ? writeErr.message : writeErr,
      );
    }
  } catch (err) {
    console.warn(`\n⚠️  Build script continuing after non-fatal filesystem error: ${err}`);
  }
}

async function main() {
  console.log("\n🖼  Fetching gallery images from ImageKit...\n");

  const outPath = path.resolve("src/data/gallery.generated.json");
  const outDir = path.dirname(outPath);

  const gallery = loadExistingGallery(outPath);
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const isSecretMissing = isPlaceholder(privateKey);

  await processGalleryFolders(gallery, isSecretMissing);
  saveGallery(gallery, outPath, outDir);
}

try {
  await main();
} catch (err) {
  console.error("\n❌ Uncaught error in main:", err);
  process.exit(1);
}
