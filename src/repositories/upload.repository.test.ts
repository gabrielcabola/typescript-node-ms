import * as UploadRepository from './upload.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateUploadData, generateUploadPayload, generateUploadsListData} from '../../test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("UploadRepository", () => {
  describe("getUploads", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const user = 12334;
      const Uploads = await UploadRepository.getUploads(user);
      expect(Uploads).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith({ user })
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test("should return Uploads list", async () => {
      const UploadsData = generateUploadsListData(3)
      const user = 12334;
      mockedGetRepo.find.mockResolvedValue(UploadsData)
      const Uploads = await UploadRepository.getUploads(user);
      expect(Uploads).toEqual(UploadsData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith({ user })
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe("createUpload", () => {
    test("should add Upload to the database", async () => {
      const payload = generateUploadPayload()
      const UploadData = generateUploadData(payload)
      mockedGetRepo.save.mockResolvedValue(UploadData)
      const Upload = await UploadRepository.createUpload(payload);
      expect(Upload).toMatchObject(payload)
      expect(Upload).toEqual(UploadData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe("getUpload", () => {
    test("should return Upload from the database", async () => {
      const id = 1
      const UploadData = generateUploadData({id})
      mockedGetRepo.findOne.mockResolvedValue(UploadData)
      const Upload = await UploadRepository.getUpload(id);
      expect(Upload).toEqual(UploadData)
      expect(Upload?.id).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test("should return null if Upload not found", async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const Upload = await UploadRepository.getUpload(id);
      expect(Upload).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})