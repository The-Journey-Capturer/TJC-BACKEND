import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'; // Use bcryptjs for better compatibility
import { UsersService } from '../users/users.service';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env variables

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate the user with email and password
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user.toObject(); // Remove password before returning user data
      return result; // Return user data without password
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Login user and generate JWT token
  async login(user: any) {
    const payload = { sub: user._id, email: user.email, role: user.role };

    // Sign the JWT token with a secret key and expiration time from the .env file
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET, // Secret from .env file
      expiresIn: '1h', // Set the token expiration time (1 hour here)
    });

    return { token }; // Return the token to the user
  }
}
