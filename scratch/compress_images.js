const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '../public/网站素材');

// Helper to get all files recursively
function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalSize = fs.statSync(filePath).size;
  
  if (originalSize === 0) return { success: false, reason: 'Empty file' };

  try {
    // Read file into memory first to avoid Windows file locking during writeBack
    const inputBuffer = fs.readFileSync(filePath);
    let pipeline = sharp(inputBuffer);
    
    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: 75, palette: true });
    } else {
      return { success: false, reason: `Unsupported extension: ${ext}` };
    }

    const compressedBuffer = await pipeline.toBuffer();
    const compressedSize = compressedBuffer.length;

    if (compressedSize < originalSize) {
      // Overwrite the original file
      fs.writeFileSync(filePath, compressedBuffer);
      return {
        success: true,
        originalSize,
        compressedSize,
        savedBytes: originalSize - compressedSize,
        ratio: ((1 - compressedSize / originalSize) * 100).toFixed(1) + '%'
      };
    } else {
      return {
        success: false,
        originalSize,
        compressedSize,
        reason: 'Compressed size was larger or equal'
      };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function run() {
  const files = getFilesRecursively(assetsDir);
  console.log(`Found ${files.length} files to check for compression...\n`);
  
  let totalSavedBytes = 0;
  let totalOriginalBytes = 0;
  let totalCompressedBytes = 0;

  for (const file of files) {
    const relativePath = path.relative(assetsDir, file);
    const result = await compressImage(file);
    
    if (result.success) {
      totalSavedBytes += result.savedBytes;
      totalOriginalBytes += result.originalSize;
      totalCompressedBytes += result.compressedSize;
      console.log(`[COMPRESSED] ${relativePath}:`);
      console.log(`  Before: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  After:  ${(result.compressedSize / 1024).toFixed(1)} KB`);
      console.log(`  Saved:  ${(result.savedBytes / 1024 / 1024).toFixed(2)} MB (${result.ratio})`);
    } else if (result.reason) {
      totalOriginalBytes += result.originalSize || 0;
      totalCompressedBytes += result.originalSize || 0;
      console.log(`[SKIPPED] ${relativePath}: ${result.reason}`);
    } else {
      console.error(`[ERROR] ${relativePath}: ${result.error}`);
    }
    console.log('--------------------------------------------------');
  }

  console.log('\n==================================================');
  console.log('Compression Summary:');
  console.log(`  Total Original Size:   ${(totalOriginalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Total Compressed Size: ${(totalCompressedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Total Saved Size:      ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
  if (totalOriginalBytes > 0) {
    console.log(`  Overall Ratio:         ${((totalSavedBytes / totalOriginalBytes) * 100).toFixed(1)}%`);
  }
  console.log('==================================================');
}

run();
