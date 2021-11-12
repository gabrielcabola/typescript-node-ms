import UploadController from './upload.controller';
import * as UploadRepository from '../repositories/upload.repository';
import {generateUploadData, generateUploadPayload, generateUploadsListData} from '../../test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe("UploadController", () => {

  describe("Create a new Upload", () => {
    test("should add Upload to the database", async () => {
      const payload = generateUploadPayload()
      const uploadData = generateUploadData(payload)
      const spy = jest.spyOn(UploadRepository, 'createUpload').mockResolvedValueOnce(uploadData)
      const controller = new UploadController();
      const upload = await controller.createUpload(payload);
      expect(upload).toMatchObject(payload)
      expect(upload).toEqual(uploadData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("getUpload details", () => {
    test("should return Upload from the database", async () => {
      const id = 1
      const uploadData = generateUploadData({id})
      const spy = jest.spyOn(UploadRepository, 'getUpload').mockResolvedValueOnce(uploadData)
      const controller = new UploadController();
      const upload = await controller.getUpload(id.toString());
      expect(upload).toEqual(uploadData)
      expect(upload?.id).toBe(id)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return null if Upload not found", async () => {
      const id = 1
      const spy = jest.spyOn(UploadRepository, 'getUpload').mockResolvedValueOnce(null)
      const controller = new UploadController();
      const upload = await controller.getUpload(id.toString());
      expect(upload).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    describe("getUploads", () => {
      test("should return empty array", async () => {
        //TODO: Mock user if from token
        const userId = 123;
        const spy = jest.spyOn(UploadRepository, 'getUploads').mockResolvedValueOnce([])
        const controller = new UploadController();
        const uploads = await controller.getUploads();
        expect(uploads).toEqual([])
        expect(spy).toHaveBeenCalledWith(userId)
        expect(spy).toHaveBeenCalledTimes(1)
      })
  
      test("should return Upload list", async () => {
        //TODO: Mock user if from token
        const userId = 123;
        const UploadsData = generateUploadsListData(7)
        const spy = jest.spyOn(UploadRepository, 'getUploads').mockResolvedValueOnce(UploadsData)
        const controller = new UploadController();
        const uploads = await controller.getUploads();
        expect(uploads).toEqual(UploadsData)
        expect(spy).toHaveBeenCalledWith(userId)
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })

  })
})