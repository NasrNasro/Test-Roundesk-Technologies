import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from 'src/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ApiProperty()
  @Column({ type: 'text', name: 'username' })
  username: string;

  @ApiProperty()
  @Column({ type: 'text', name: 'password' })
  password: string;

  @ApiProperty()
  @Column({
    type: "enum",
    enum: UserProfile,
    default: UserProfile.USER
  })
  profile: UserProfile;
}
