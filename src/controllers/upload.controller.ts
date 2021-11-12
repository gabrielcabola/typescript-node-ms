import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Upload } from '../models'
import { createUpload, getUploads, IUploadPayload, getUpload } from "../repositories/upload.repository";

@Route("upload")
@Tags("Upload")
export default class UploadController {
  @Get("/")
  public async getUploads(): Promise<Array<Upload>> {
    //TODO: pass user id extracted from header token
    const user = 123;
    return getUploads(user).catch((error) => error?.message);
  }

  @Post("/")
  public async createUpload(@Body() body: IUploadPayload): Promise<Upload> {
    return createUpload(body).catch((error) => error?.message);
  }

  @Get("/:id")
  public async getUpload(@Path() id: string): Promise<Upload | null> {
    return getUpload(Number(id)).catch((error) => error?.message);
  }
}