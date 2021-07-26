import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: "Test Movie",
        genres: ["test genre"],
        year: 2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual("Test Movie");
    })
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual("Movie with id 999 not found");
      }
    })
  })

  describe("deleteOne", () => {
    it("delete a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test genre"],
        year: 2000
      });
      const beforeDeleteCount = service.getAll().length;
      service.deleteOne(1);
      const afterDeleteCount = service.getAll().length;
      expect(afterDeleteCount).toBeLessThan(beforeDeleteCount);
    })
    it("should return 404", () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('create', () => {
    it("should create a movie", () => {
      const beforeCreateCount = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: ["test genre"],
        year: 2000
      });
      const afterCreateCount = service.getAll().length;
      expect(afterCreateCount).toBeGreaterThan(beforeCreateCount);
    })
  })

  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test genre"],
        year: 2000
      });
      service.update(1, { title: "Updated Title" });
      const updatedMovie = service.getOne(1);
      expect(updatedMovie.title).toEqual("Updated Title");
      expect(updatedMovie.year).toEqual(2000);
    })
    it("should throw NotFoundException", () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
