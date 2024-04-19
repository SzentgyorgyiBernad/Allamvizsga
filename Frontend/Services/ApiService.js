export default class ApiService {
  baseUrl = "http://192.168.0.191:8000";

  static instance = null;

  constructor() {
    if (ApiService.instance) {
      return ApiService.instance;
    } else {
      ApiService.instance = this;
      return this;
    }
  }

  async fetchData(endPoint, method, options) {
    try {
      const response = await fetch("${this.baseUrl}/${endPoint}", {
        method,
        headers: {
          "Content-type": "application/json",
          Authorization: options?.token ? "Bearer ${options.token}" : "",
        },
        body: JSON.stringify(options?.body),
      });

      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (error) {
      console.log("Error while fetching: ", error);
      return null;
    }
  }

  async get(endPoint, options) {
    return await this.fetchData(endPoint, "GET", {
      token: options?.token,
    });
  }

  async post(endPoint, options) {
    return await this.fetchData(endPoint, "POST", options);
  }
}
