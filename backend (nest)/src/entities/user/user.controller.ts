import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  UseInterceptors, UseGuards, HttpCode, HttpStatus, ForbiddenException, ConflictException, UploadedFile,
} from '@nestjs/common';
import { Response, Request } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '@entities/user/user.service';
import { UpdateUserDto } from '@entities/user/dto/updateUser.dto';
import { AuthService } from '@services/auth/auth.service';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { LoginUserDto } from '@entities/user/dto/loginUser.dto';
import { compare } from 'bcrypt';
import { RegisterUserDto } from '@entities/user/dto/registerUser.dto';
import { User } from '@utils/user.decorator';
import { T_ReqUser } from '@entities/user/types';
import { MinioService } from '../../minio/minio.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly minioService: MinioService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllUsers(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const usersData = await this.userService.getUsers()
    return res.send({data: usersData})
  }

  @Get('/:id')
  async getUser(
    @Req() req: Request,
    @Param("id", ParseIntPipe) id:number,
    @Res() res: Response,
  ) {
    const userData = await this.userService.getUserData(id)
    delete userData.password
    return res.send({data: userData})
  }

  @Post('/')
  @UseInterceptors(FileInterceptor(''))
  async createUser(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.userService.createUser(req.body)
    return res.status(200).send("created")
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('photo'))
  async updateUser(
    @Req() req: Request,
    @Param("id", ParseIntPipe) id:number,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.userService.updateUserData(id, req.body)
    if (file) {
      const avatarUrl = await this.minioService.uploadFile("users", file)
      await this.userService.updateUserAvatar(id, avatarUrl)
    }

    const data = await this.userService.getUserData(id)
    delete data.password
    return res.send({...data})
  }

  @Delete('/:id')
  async deleteUser(
    @Param("id", ParseIntPipe) id:number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id)
    return res.send({status: "ok"})
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginUserDto,
    @Res({passthrough: true}) res: Response
  ) {
    console.log("login")
    console.log(body)

    const { email, password } = body

    const foundUser = await this.userService.getUserByEmail(email)
    if (!foundUser) throw new ForbiddenException()

    const isPasswordMatch = await compare(password as string, foundUser.password)
    if (!isPasswordMatch) throw new ForbiddenException()

    const jwt = await this.authService.setSession({ userId: foundUser.id })
    res.cookie('jwt', jwt, {httpOnly: true});

    delete foundUser.password
    return res.send({...foundUser})
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({passthrough: true}) response: Response
  ) {
    response.clearCookie('jwt');
    await this.authService.deleteSession(req.cookies.jwt)

    return {
      status: 'ok'
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/check')
  async check(
    @Req() req: Request,
    @Res() res: Response,
    @User() user: T_ReqUser
  ) {
    console.log("check")
    const {userId} = user

    const data = await this.userService.getUserData(userId)
    delete data.password
    return res.send({...data})
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: RegisterUserDto,
    @Res({passthrough: true}) response: Response
  ) {
    console.log("register")
    const { email } = body

    const foundUser = await this.userService.getUserByEmail(email)
    if (foundUser) throw new ConflictException("user with that email already exists")

    const newUser = await this.userService.createUser(body)

    console.log(newUser)

    const jwt = await this.authService.setSession({ userId: newUser.id })
    response.cookie('jwt', jwt, {httpOnly: true});

    return {
      status: 'ok'
    }
  }
}