function abbreviate(stringList) {

  /** 
* 
* @summary Takes a list of strings. If string is more than one word, abbreviate it. Return a composite short-title made from the strings. 
* @param {Array} stringList - An array of strings listing technique titles
* @return {String} A short title made from the technique titles
*/
  
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
