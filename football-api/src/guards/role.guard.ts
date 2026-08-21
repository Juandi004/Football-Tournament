import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector : Reflector ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if(!requiredRoles){
            return true
        }

        const {user} = context.switchToHttp().getRequest()

        if(!user){
            throw new ForbiddenException("No existe usuario, intente nuevamente");
        }

        const hasRole : boolean = requiredRoles.includes(user.role)

        if(!hasRole){
            throw new ForbiddenException('No tiene permisos para realizar esta acción');
        }

        return true
    }
}