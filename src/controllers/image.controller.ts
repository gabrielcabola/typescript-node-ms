import { Get, Route, Tags, Post, Path } from "tsoa";
import { Image } from '../models'
import { getImages, getImage } from "../repositories/image.repository";

@Route("image")
@Tags("image")
export default class ImageController {

  @Get("/upload/:uploadId")
  public async getImages(@Path() uploadId: string): Promise<Array<Image>> {
    return getImages(Number(uploadId))
  }

  @Get("/:id")
  public async getImage(@Path() id: string): Promise<Image | null> {
    return getImage(Number(id))
  }
}