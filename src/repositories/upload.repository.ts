import { rejects } from "assert";
import { getRepository } from "typeorm";
import { Upload } from '../models'

export interface IUploadPayload {
  user: number;
  renderConfig: {
    quality: number,
    resizeEngine: string,
    maxImgDimension: number
  };
}

export const getUploads = async (user: number): Promise<Array<Upload>> => {
  const UploadRepository = getRepository(Upload);
  return UploadRepository.find({user})
}

export const createUpload = async (payload: IUploadPayload): Promise<Upload> => {
  const UploadRepository = getRepository(Upload);
  const upload = new Upload()
  return UploadRepository.save({
    ...upload,
    ...payload
  })
}

export const getUpload  = async (id: number) :Promise<Upload | null> => {
  const UploadRepository = getRepository(Upload);
  const upload = await UploadRepository.findOne({id: id})
  if (!upload) return null
  return upload
}