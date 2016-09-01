(function () {
  
  function xhr(method, url, headers, data, cb) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {
        cb(xmlhttp);
      }
    }
    Object.keys(headers).forEach(function(key) {
      xmlhttp.setRequestHeader(key, headers[key]);
    });
    xmlhttp.send(data);
  }

  function doRequest(method, url, data, headers) {
    headers = headers || {};
    headers['Content-type'] = headers['Content-type'] || 'application/json';
    headers['Accept'] = headers['Accept'] || 'application/json';

    return new Promise(function(resolve, reject) {
      xhr(method, encodeURI(url), headers, JSON.stringify(data), function(xmlhttp) {
        if (xmlhttp.status < 300) {
          if (xmlhttp.response && headers['Accept'] === 'application/json') {
            xmlhttp.responseData = JSON.parse(xmlhttp.response);
          }
          resolve(xmlhttp);
        }
        else {
          reject(xmlhttp);
        }
      });
    });
  }
  
  function doGet(url, headers) {
    return doRequest('GET', url, null, headers);
  }
  
  function doPost(url, data, headers) {
    return doRequest('POST', url, data, headers);
  }
  
  function doPut(url, data, headers) {
    return doRequest('PUT', url, data, headers);
  }
  
  function doDelete(url, headers) {
    return doRequest('DELETE', url, null, headers);
  }
  
  window.slim = {
    get: doGet,
    post: doPost,
    put: doPut,
    delete: doDelete
  };

})();