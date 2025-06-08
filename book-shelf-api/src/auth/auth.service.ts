import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto, changePwUserDto } from './dto/index';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';



@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    //private readonly personalLibreryService: PersonalLibreryService
  ) { }

  async create(createAuthDto: CreateUserDto) {
    try {
      const { password, ...userData } = createAuthDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);
      
      return {
        ...user,
        token: this.getJwtToken({ username: user.username })
      };

    } catch (error) {
      this.handleDBEerrors(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {

    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { username },
      select: { email: true, password: true, username: true }
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return {
      ...user,
      token: this.getJwtToken({ username: user.username })
    };

  }


  private handleDBEerrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    console.log(error)
    throw new BadRequestException('Check server logs for more details');
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }


  async changePassword(changePwUserDto: changePwUserDto) {
    const { email, password, newPassword } = changePwUserDto;


    const user = await this.userRepository.findOne({
      where: { email },
      select: { password: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas');
    }


    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales no válidas');
    }


    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await this.userRepository.update({ email }, { password: hashedPassword });

 
    return {
      email
    };
  }


  async resetPasswordAndSendEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado con ese correo');
    }

    // Generar nueva contraseña aleatoria
    const newPassword = randomBytes(4).toString('hex'); // 8 caracteres

    // Encriptarla
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Guardarla
    user.password = hashedPassword;
    await this.userRepository.save(user);

    // Enviar por correo
    await this.sendNewPasswordEmail(user.email, newPassword);
  }

  private async sendNewPasswordEmail(email: string, newPassword: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.EMAIL, 
        pass: process.env.PASS_APP, 
      },
    });

    const mailOptions = {
      from: 'sa@practica.com',
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Hola, tu nueva contraseña es: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions);
  }
}

