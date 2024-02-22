
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserProfile } from 'src/enums';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  password: string;

  @IsEnum(UserProfile)
  profile: UserProfile;
}