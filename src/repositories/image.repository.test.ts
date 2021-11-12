import * as ImageRepository from './image.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateImageData, generateImagesListData, generateImagePayload} from '../../test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("ImageRepository", () => {
  describe("getImages", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const uploadId = 100
      const Images = await ImageRepository.getImages(uploadId);
      expect(Images).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith({ uploadId })
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test("should return Images list", async () => {
      const ImagesData = generateImagesListData(5)
      const uploadId = 100
      mockedGetRepo.find.mockResolvedValue(ImagesData)
      const Images = await ImageRepository.getImages(uploadId);
      expect(Images).toEqual(ImagesData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith({ uploadId })
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe("createImage", () => {
    test("should add Image to the database", async () => {
      const payload = generateImagePayload({
        totalMBSize: 123,
      })
      const ImageData = generateImageData(payload)
      mockedGetRepo.save.mockResolvedValue(ImageData)
      const Image = await ImageRepository.createImage(payload);
      expect(Image).toMatchObject(payload)
      expect(Image).toEqual(ImageData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe("getImage", () => {
    test("should return Image from the database", async () => {
      const id = 1
      const ImageData = generateImageData({id})
      mockedGetRepo.findOne.mockResolvedValue(ImageData)
      const Image = await ImageRepository.getImage(id);
      expect(Image).toEqual(ImageData)
      expect(Image?.id).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test("should return null if Image not found", async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const Image = await ImageRepository.getImage(id);
      expect(Image).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})