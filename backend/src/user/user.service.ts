import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    const {name, email, password} = registerDto;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    try{
      const savedUser = await this.userRepository.save(user);

      const { password, ...result } = savedUser; // operador delete não estava funcionando, tive que trocar por esse

      return result;

    }catch(error){
      if (error.code === '23505') {
        throw new ConflictException('Este email já está em uso.');
      } else {
        throw new InternalServerErrorException('Ocorreu um erro ao criar o usuário.');
      }
    }
  }

  async findByEmail(email: string): Promise<Omit<User, 'password' | 'hashPassword'> | null> {
    return this.userRepository.findOne({ where: {email}});
  }

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({ where: {id}});
    if(!user){
      return null;
    }
    
    const { password, ...result } = user; // operador delete não estava funcionando, tive que trocar por esse
  
    return result;
  }
}
