import HealthController from './health.controller'

test("should return pong message", async () => {
  const controller = new HealthController();
  const response = await controller.getMessage();
 
  expect(response.database_conn).toBe(true)
  expect(response.queue_conn).toBe(true)
  expect(response.status).toBe("ok")
})