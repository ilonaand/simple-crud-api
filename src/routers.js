module.exports = 
  Router = () => ({
    endpoints = {},
  
    request = (method, path, handler) => {
      if (!this.endpoints[path]) {
        this.endpoints[path] = {};
      }
      const endpoint = this.endpoints[path];
      if (endpoint[method]) {
        throw new Error(` method ${method} for endpoint ${path} alredy exists`);
      };

      endpoint[method] = handler;
    },

    get = (path, handler) => this.request('GET', path, handler),

    post = (path, handler) => this.request('POST', path, handler),

    put = (path, handler) => this.request('PUT', path, handler),

    del = (path, handler) => this.request('DELETE', path, handler),

  });

  /**
   * endpoints = {
   *   "/persons" : {
   *      "GET" : (req, res) => {},
   *      "POST" : (req, res) => {},
   *      "PUT" : (req, res) => {},
   *      "DELETE" : (req, res) => {},
   *    },
   * }
   * 
   */
