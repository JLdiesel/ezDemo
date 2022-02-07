function isIEBrowser() {
  const isAtLeastIE11 = !!(
    navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/)
  );

  if (isAtLeastIE11) {
    return true;
  }

  return navigator.appName.indexOf('Microsoft Internet') !== -1;
}
//是否是空串
function isEmptyStr(str) {
  if (
    str === undefined ||
    str === null ||
    str.replace(/(^\s*)|(\s*$)/g, '') === ''
  ) {
    return true;
  }
  return false;
}
