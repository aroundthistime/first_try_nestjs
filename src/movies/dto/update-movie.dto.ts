import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) { }
// PartialType으로 하면 원래 하던 거에서 필수가 아닌 것으로 바꿔서 extension