import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminRequest {
  @ApiProperty({ example: 'Ivan2' })
  username: string;

  @ApiProperty({ example: 'ivan123' })
  password: string;
}

export class LoginAdminResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'admin',
        password: 'admin',
      },
    },
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };
}

export class SignupAdminResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'admin' })
  username: string;

  @ApiProperty({
    example: '$2b$10$90H0Hn.6Nx0SbrHQCX2xeeYjq.02nS5VpkIIwFAtDtCHEqHK',
  })
  password: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  createdAt: string;
}
