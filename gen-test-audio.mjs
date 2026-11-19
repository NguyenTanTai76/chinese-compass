// Generate silent WAV files of specific durations for Playwright testing
// Usage: node gen-test-audio.mjs

import fs from "fs";

function writeWav(filePath, durationSec, sampleRate = 16000) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const numSamples = sampleRate * durationSec;
  const dataSize = numSamples * blockAlign;
  const fileSize = 36 + dataSize;

  const buf = Buffer.alloc(fileSize);

  // RIFF header
  buf.write("RIFF", 0);
  buf.writeUInt32LE(fileSize - 8, 4);
  buf.write("WAVE", 8);

  // fmt subchunk
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(numChannels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(byteRate, 28);
  buf.writeUInt16LE(blockAlign, 32);
  buf.writeUInt16LE(bitsPerSample, 34);

  // data subchunk
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);

  fs.writeFileSync(filePath, buf);
  console.log(
    `Created ${filePath}: ${durationSec}s, ${(dataSize / 1024 / 1024).toFixed(2)} MB`,
  );
}

writeWav("tests/fixtures/audio-2min.wav", 120);
writeWav("tests/fixtures/audio-5min.wav", 300);
