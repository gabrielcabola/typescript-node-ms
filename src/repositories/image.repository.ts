import { getRepository } from "typeorm";
import { Image } from '../models'

export interface IImagePayload {
  user: number;
  originalFileName: string;
  filePath: string;
  fileName: string;
  uploadId: number;
}

export const createImage = async (payload: IImagePayload) :Promise<Image> => {
  const imageRepository = getRepository(Image);
  const image = new Image()
  return imageRepository.save({
    ...image,
    ...payload
  })
}

export const getImages = async (uploadId: number): Promise<Array<Image>> => {
  const imageRepository = getRepository(Image);
  return imageRepository.find({ uploadId: uploadId })
}

export const getImage = async (id: number) :Promise<Image | null> => {
  const imageRepository = getRepository(Image);
  const image = await imageRepository.findOne({id: id})
  if (!image) return null
  return image
}