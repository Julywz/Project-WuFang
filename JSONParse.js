/**
* 解析JSON文件
* @param  json格式的字符串 
* @return 返回读取的内容
*/
var i = 0
var JSONParse = (function() { 
  return function(json) { 
    return deleteGap(json)
  }

  function deleteGap(json) {
    var arr = []
    for (var j = 0; j < json.length; j++) {
      if (!(json.charCodeAt(j) == 32 || json.charCodeAt(j) == 160 || json.charCodeAt(j) == 9229)) {
        arr.push(json[j])
      }
    }
    return parseJson2(arr.join(""))
  }

  function parseJson2(json) {
    //对象      
    if (json[i] == '{') {
      if (json[i + 1] == '}') {
        return {}
      }
      return parseObject(json, i)
    }
    //数组
    if (json[i] == '[') {
      if (json[i + 1] == ']') {
        return []
      }
      return parseArray(json)
    }
    //true
    if (json[i] == 't') {
      return parseTrue(json)
    }
    //false
    if (json[i] == 'f') {
      return parseFalse(json)
    }
    //null
    if (json[i] == 'n') {
      return parseNull(json)
    }
    //字符串
    if (json[i] == '"') {
      return parseString(json)
    }
    //数字
    if (isNum(json[i])) {
      return parseNum(json)
    }
  }

  function parseObject(json) {
    var newObj = {}
    i++
    for (;; i++) {
      if (json[i] == '"') {
        var key = parseJson2(json)
      }
      if (json[i] == ':') {
        i++
        var keyValue = parseJson2(json)
        newObj[key] = keyValue
      }
      if (json[i] == '}') {
        i++
        return newObj
      }
    }
  }

  function parseArray(json) {
    var result = []
    i++
    for (;; i++) {
      if (json[i] == ']') {
        i++
        return result
      }
      result.push(parseJson2(json))
      if (json[i] == ']') {
        i++
        return result
      }
    }
  }

  function parseTrue(json) {
    i += 4
    return true
  }

  function parseFalse(json) {
    i += 5
    return false
  }

  function parseNull(json) {
    i += 4
    return null
  }

  function parseNum(json) {
    for (var j = i + 1;; j++) {
      if (!isNum(json[j])) {
        break
      }
    }
    var str = json.slice(i, j)
    i = j
    return parseInt(str)
  }

  function parseString(json) {
    var endIndex = json.indexOf('"', i + 1)
    var newStr = json.slice(i + 1, endIndex)
    i = endIndex
    return newStr
  }
  //判断是不是数字
  function isNum(char) {
    if (char == undefined) {
      return false
    }
    return ((char.charCodeAt(0) >= '0'.charCodeAt(0) && char.charCodeAt(0) <= '9'.charCodeAt(0)))
  }
})()
