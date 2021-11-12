import { Get, Route } from "tsoa";
import { getConnection } from "typeorm";
import dbConfig from '../config/database'

interface HealthResponse {
  database_conn: boolean,
  queue_conn: boolean,
  status: string
}

@Route("health-check")
export default class HealthController {
  @Get("/")
  public async getMessage(): Promise<HealthResponse> {
  
    const connection = await getConnection(dbConfig.name);
    return {
      database_conn: (connection?.isConnected),
      queue_conn: false,
      status: "ok",
    };
  }
}
