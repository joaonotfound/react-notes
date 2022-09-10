interface Environment {
  backend_api_url: string,
  backend_api_port: Number
}
export const env: Environment = {
  backend_api_port: 60,
  backend_api_url: "http://localhost"
}