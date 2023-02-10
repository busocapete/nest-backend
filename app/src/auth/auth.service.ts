import { Injectable } from '@nestjs/common';
//import * as argon from 'argon2';
import { AuthDto, SignInDto, SignUpDto } from './dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
//import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  getAll() {
    return this.users.find();
  }

  async signup(dto: SignUpDto) {
    //generate password
    //const hash = await argon.hash(dto.password);
    const hash = dto.password;

    const userToAdd = new UserEntity();
    userToAdd.email = dto.email;
    userToAdd.hash = hash;
    userToAdd.isAdmin = false;

    //in real project would use UUID for userId
    //userToAdd.id = randomUUID();
    console.log('userToAdd', userToAdd);
    //save the user in the db
    try {
      const createdUserToSignIn = await this.users.save({ ...userToAdd });
      console.log(createdUserToSignIn);
      //await this.users.save(userToSignIn);

      //return the user
      return this.signToken(createdUserToSignIn.id, createdUserToSignIn.email);
    } catch (error) {
      //Log error
      console.log(error);

      //TODO: Add error codes and responses for typical errors
      //i.e. email already exists
      //password strengh etc
    }
  }

  async signin(dto: SignInDto) {
    console.log('Auth Service Signin:- ', dto);
    //find user
    const user = await this.users.findOne({
      where: {
        email: dto.email,
      },
    });

    console.log(user);

    //if user doesn't exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');
    //compare password

    //const pwMatches = await argon.verify(user.hash, dto.password);
    const pwMatches = user.hash === dto.password;

    //if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    //return the user
    delete user.hash;

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    };
  }

  async validateUserOrganisation(
    user: UserEntity,
    organisationId: number,
  ): Promise<any> {
    if (user.organisationId === organisationId) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
