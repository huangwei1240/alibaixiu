// 封装格式时间的函数
// console.log(formateDate('2020-08-03T16:00:00.000Z'))
template.defaults.imports.formateDate = formateDate;
function formateDate (date){
  var dateObj = new Date(date)
  var result = dateObj.getFullYear()+'/'+dateObj.getMonth()+'/'+dateObj.getDate()
  return result
}