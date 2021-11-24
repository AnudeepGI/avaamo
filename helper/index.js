class Helper {
  static slitIntoArray(data) {
    return data.split(/\s+/);
  }
  static isNumeric(num) {
    let value1 = num.toString();
    let value2 = parseFloat(num).toString();
    return value1 === value2;
  }
  static sortedArray(obj,limit = 10) {
    return Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map((person) => ({ [person[0]]: person[1] }))
      .slice(0, limit);
  }
  static genrateArray(data){
    var obj = new Object();
    let newVal = '';
    for (var i = 0; i < data.length; i++) {
      newVal = data[i].toLowerCase();
      newVal = newVal
        .replace(/[`~!@#$%^&*()_|+\-=÷¿?;:’'–",.<>\{\}\[\]\\\/]/gi, "")
        .trim();
      if (!Helper.isNumeric(newVal) && newVal.length > 1) {
        obj[newVal] = obj[newVal] != null ? obj[newVal] + 1 : 1;
      }
    }
    return obj;
  }
}

module.exports = Helper;
