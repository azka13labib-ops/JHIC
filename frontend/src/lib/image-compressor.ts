/**
 * Client-Side Image Compression Utility
 * Mengompres gambar di browser (sisi client) sebelum dikirim ke server backend.
 * 0% beban server, upload 10x lebih cepat, hemat storage.
 */

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
}

export async function compressImageClient(
  file: File,
  maxDimension = 1920,
  quality = 0.85
): Promise<CompressionResult> {
  const originalSize = file.size;

  // Jika ukuran file sudah di bawah 800 KB, tidak perlu dikompres agresif
  if (originalSize <= 800 * 1024 && !file.type.includes('png')) {
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      reductionPercentage: 0,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scaling proporsional jika dimensi melebihi maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            file,
            originalSize,
            compressedSize: originalSize,
            reductionPercentage: 0,
          });
          return;
        }

        // Gambar ulang di canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert ke JPEG / WebP dengan kompresi kualitas
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({
                file,
                originalSize,
                compressedSize: originalSize,
                reductionPercentage: 0,
              });
              return;
            }

            // Jika ukuran hasil kompresi ternyata lebih besar dari aslinya, gunakan file asli
            if (blob.size >= originalSize) {
              resolve({
                file,
                originalSize,
                compressedSize: originalSize,
                reductionPercentage: 0,
              });
              return;
            }

            const cleanFileName = file.name.replace(/\.[^/.]+$/, '') + (outputType === 'image/jpeg' ? '.jpg' : '.png');
            const compressedFile = new File([blob], cleanFileName, {
              type: outputType,
              lastModified: Date.now(),
            });

            const reduction = Math.round(((originalSize - blob.size) / originalSize) * 100);

            resolve({
              file: compressedFile,
              originalSize,
              compressedSize: blob.size,
              reductionPercentage: reduction,
            });
          },
          outputType,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Gagal membaca gambar untuk dikompres'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca berkas file'));
    };
  });
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
