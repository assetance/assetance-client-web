export default {
  setCookie(
    cName,
    cValue,
    exdays = undefined,
    cPath = import.meta.env.VITE_DOMAIN_URL,
    cDomain = import.meta.env.VITE_DOMAIN_URL
  ) {
    let expires = '';
    if (exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      expires = 'expires=' + d.toUTCString() + ';';
    }
    try {
      document.cookie = `${cName}=${cValue}; ${expires} domain=${cDomain}; path=${cPath};secure;`;
    } catch (error) {
      console.log(error);
    }
  },
  getCookie(cName) {
    let name = cName + '=';
    let cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return false;
  },
  deleteCookie(cName) {
    document.cookie = cName + '=; expires=Thu, 01 Jan 2020 00:00:01 GMT';
  },
};
