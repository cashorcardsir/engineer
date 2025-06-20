function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  window.onload = function() {
    let goParam = getQueryParam('login');
    if (goParam) {
      let url = Ultraviolet.codec.base64.decode(goParam);
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url;
      localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      window.navigator.serviceWorker.register("/sw.js", {
        scope: "/studentrecords/",
      });
      window.navigator.serviceWorker.register("/lab.js", {
        scope: '/assignments/',
      });
      location.href = '/mastery';
    }
  }
  
  function isUrl(val = "") {
    if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) return true;
    return false;
  }
