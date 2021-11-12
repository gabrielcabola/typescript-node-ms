import ImageController from './image.controller'
import * as ImageRepository from '../repositories/image.repository'
import {generateImageData, generateImagesListData} from '../../test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe("ImageController", () => {

  describe("getImage", () => {

    test("should return null if Image not found", async () => {
      const id = 1
      const spy = jest.spyOn(ImageRepository, 'getImage').mockResolvedValueOnce(null)
      const controller = new ImageController()
      const image = await controller.getImage(id.toString())
      expect(image).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return Image from the database", async () => {
      const id = 1
      const imageData = generateImageData({ id });
      const spy = jest.spyOn(ImageRepository, 'getImage').mockResolvedValueOnce(imageData)
      const controller = new ImageController();
      const image = await controller.getImage(id.toString());
      expect(image).toEqual(imageData)
      expect(image?.id).toBe(id)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("getImages List", () => {
      test("should return empty array", async () => {
        const uploadId = 1
        const spy = jest.spyOn(ImageRepository, 'getImages').mockResolvedValueOnce([])
        const controller = new ImageController()
        const images = await controller.getImages(uploadId.toString())
        expect(images).toEqual([])
        expect(spy).toHaveBeenCalledWith(uploadId)
        expect(spy).toHaveBeenCalledTimes(1)
      })
  
      test("should return Image list", async () => {
        const uploadId = 99
        const user = 1001;
        const imagesData = generateImagesListData(20, { uploadId, user })
        const spy = jest.spyOn(ImageRepository, 'getImages').mockResolvedValueOnce(imagesData)
        const controller = new ImageController()
        const images = await controller.getImages(uploadId.toString())
        expect(images).toEqual(imagesData)
        expect(spy).toHaveBeenCalledWith(uploadId)
        expect(spy).toHaveBeenCalledTimes(1)
      })
  })
  
})