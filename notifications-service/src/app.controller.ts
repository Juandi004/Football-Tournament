import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {

  @EventPattern('team_created')
  handleTeamCreated(@Payload() data: { id: string; name: string; playersCount: number }) {
    console.log(`[EVENT] Equipo Creado: "${data.name}" con ${data.playersCount} jugadores inscritos.`);
  }

  @EventPattern('team_updated')
  handleTeamUpdated(@Payload() data: { id: string; name: string }) {
    console.log(`[EVENT] Equipo Actualizado: "${data.name}" (ID: ${data.id})`);
  }

  @EventPattern('team_deleted')
  handleTeamDeleted(@Payload() data: { id: string; name: string }) {
    console.log(`[EVENT] Equipo Eliminado: "${data.name}" (ID: ${data.id})`);
  }
}