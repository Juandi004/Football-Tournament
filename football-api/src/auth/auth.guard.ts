import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {Request} from "express"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private jwtService: JwtService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const [type, token] = request.headers.authorization?.split(' ') ?? []

    if(type != 'Bearer' || !token){
      throw new UnauthorizedException('No existe token o el tipo es inválido')
    }

    try{
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });
      request['user']=payload
      return true
    }catch(err: any){
      throw new UnauthorizedException('No tiene acceso', err)
    }
  }
}