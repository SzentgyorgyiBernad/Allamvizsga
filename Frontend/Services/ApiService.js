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
    // console.log("Api fetch:", this.baseUrl, endPoint, method, options);
    // console.log(JSON.stringify(options?.body));
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
    // console.log("ApiService get");
    return await this.fetchData(endPoint, "GET", {
      token: options?.token,
    });
  }

  async post(endPoint, options) {
    // console.log("ApiService login asd");
    return await this.fetchData(endPoint, "POST", options);
  }
}
