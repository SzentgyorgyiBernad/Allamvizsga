export default class ApiService {
  baseUrl = "http://192.168.1.7:8000";

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
    // console.log("Api fetch:", this.baseUrl, endPoint, method, options);
    // console.log("Api fetch:", options, method, endPoint);
    // console.log("Api fetch:");
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method,
        headers: {
          "Content-type": "application/json",
          Authorization: options?.token ? `Bearer ${options.token}` : "",
        },
        body: JSON.stringify(options?.body),
      });
      // console.log("resp");
      // console.log(JSON.stringify(response));
      // console.log("lassuk ok vagy nem", response);
      if (!response.ok) {
        // console.log(respnse);
        return response.json();
      }
      // console.log("ApiService fetch data", response);
      return await response.json();
    } catch (error) {
      console.log("Error while fetching: ", error);
      return null;
    }
  }

  async get(endPoint, options) {
    // console.log("ApiService get", options);
    return await this.fetchData(endPoint, "GET", {
      token: options?.body.token,
    });
  }

  async post(endPoint, options) {
    // console.log("ApiService", options?.body);
    return await this.fetchData(endPoint, "POST", options);
  }
}
