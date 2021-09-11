function abbreviate(stringList) {
  
  var abb = "";
  if ((!stringList) || (stringList.length == 0) || (typeof stringList !== "object")) {
    return abb;
  }
  stringList.forEach(element => abb += abbrev(element) + '/');
  return abb.slice(0, -1);
}


function abbrev(string) {
    var s = string.toUpperCase();
    if (!(s.trim().indexOf(' ') != -1)) {
      return string;
    } else {
      return s.match(/\b([A-Z])/g).join('')
    }
  
}
