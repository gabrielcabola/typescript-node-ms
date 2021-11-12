import faker from 'faker'
import { Upload, Image } from '../../src/models';

export function generateUploadData(more = {}) {
  return {
    id: faker.datatype.number(),
    uuid: faker.datatype.uuid(),
    user: faker.datatype.number(),
    totalFiles: faker.datatype.number(99999),
    images: [],
    isFinished: faker.datatype.boolean(),
    totalMBSize: faker.datatype.number(9999),
    watermark: faker.datatype.number(10),
    renderConfig: {
      quality: faker.datatype.number(100),
      resizeEngine: faker.system.mimeType(),
      maxImgDimension: faker.datatype.number(12000)
    },
    startedAt: new Date(),
    finishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...more
  }
}

export function generateUploadsListData(total: number = 1) {
  return Array.from({
    length: total
  }, (_, i) => {
    return generateUploadData()
  });
}

export function generateUploadPayload() {
  return {
    user: faker.datatype.number(),
    renderConfig: {
      quality: faker.datatype.number(100),
      resizeEngine: faker.system.mimeType(),
      maxImgDimension: faker.datatype.number(12000)
    }
  }
}

/**
 * Images
 */

export function generateImageData(more = {}) {
  return {
      id: faker.datatype.number(),
      uuid: faker.datatype.uuid(),
      user: faker.datatype.number(),
      filePath: faker.image.imageUrl(),
      fileName: faker.system.fileName(),
      originalFileName:faker.system.commonFileName(),
      startedAt: new Date(),
      finishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isProccessed: faker.datatype.boolean(),
      processedAt: new Date(),
      uploadId: faker.datatype.number(),
      ...more
  }
}

export function generateImagesListData(total: number = 1, more = {}) {
  return Array.from({
    length: total
  }, (_, i) => {
    return generateImageData(more)
  });
}

export function generateImagePayload(more = {}) {
  return {
    user: faker.datatype.number(),
    originalFileName: faker.system.commonFileName(),
    filePath: faker.system.filePath(),
    fileName: faker.system.fileName(),
    uploadId: faker.datatype.number(),
    ...more
  }
}