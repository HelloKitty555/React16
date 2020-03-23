

function format(num) {
  return '' + (num < 10 ? '0' + num : num)
}

// /**
//  * 获取时间 e.g. 2013年09月13日 星期三 下午3:30
//  *               10:33:25 Jan 14, 2014 (TuesDay)
//  * @param  {object} date
//  * @return {string}
//  */
// export function getTextFull(date) {
//   if ($translate.use() === 'zh_CN') {
//     return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + ' ' +
//       $translate.instant('CA_DAY_' + date.getDay()) + ' ' +
//       (date.getHours() < 12 ? $translate.instant('CA_AMPMS_0') : $translate.instant('CA_AMPMS_1')) +
//       format(date.getHours()) + ':' + format(date.getMinutes())
//   } else {
//     return format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds()) + ' ' +
//       $translate.instant('CA_SHORTMONTH_' + (date.getMonth() + 1)) + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' +
//       '(' + $translate.instant('CA_DAY_' + date.getDay()) + ')'
//   }
// }

// /**
//  * 获取年月日 e.g. 2013年09月13日
//  *               Jan 14, 2014
//  * @param  {object} date
//  * @return {string}
//  */
// export function getDateString(date) {
//   if ($translate.use() === 'zh_CN') {
//     return date.getFullYear() + $translate.instant('CA_YEAR') +
//       (date.getMonth() + 1) + $translate.instant('CA_MONTH') +
//       date.getDate() + $translate.instant('CA_DAY')
//   } else {
//     // $translate.preferredLanguage() ==  'en'
//     return $translate.instant('CA_SHORTMONTH_' + (date.getMonth() + 1)) + ' ' + date.getDate() + ', ' + date.getFullYear()
//   }
// }

// 获取时间 e.g. 2013-09-13
export function getTextSimple(date) {
  return date.getFullYear() + '-' + format(date.getMonth() + 1) + '-' + format(date.getDate())
}
// 获取时间 e.g. 09-13
export function getTextWithoutYear(date) {
  return format(date.getMonth() + 1) + '-' + format(date.getDate())
}

// 判断给定两个date对象是否为同一日
export function isSameDate(date0, date1) {
  return (date0.getFullYear() == date1.getFullYear() && date0.getMonth() == date1.getMonth() &&
    date0.getDate() == date1.getDate())
}
// 判断前一个日期date0是否为后一个日期date1的昨天
export function isYesterday(date0, date1) {
  return (date0.getFullYear() == date1.getFullYear() && date0.getMonth() == date1.getMonth() &&
    (date0.getDate() + 1) == date1.getDate())
}
// 判断前一个日期date0是否为后一个日期date1的前天
export function isTheDayBeforeYesterday(date0, date1) {
  return (date0.getFullYear() == date1.getFullYear() && date0.getMonth() == date1.getMonth() &&
    (date0.getDate() + 2) == date1.getDate())
}
// 判断给定两个date对象是否为同一年
export function isSameYear(date0, date1) {
  return date0.getFullYear() == date1.getFullYear()
}

export function getTimeAMPM(date) {
  return (date.getHours() < 12 ? $translate.instant('CA_AMPMS_0') : $translate.instant('CA_AMPMS_1')) + this.getTimeSimple(date)
}

// 获取时分 03:30
export function getTimeSimple(date) {
  return format(date.getHours()) + ':' + format(date.getMinutes())
}

//  获取当前时间的Date对象
export function getCurrentDate() {
  return new Date()
}
// 获取星期
export function getTextDay(date) {
  return $translate.instant('CA_DAY_' + date.getDay())
}

// 将日期变成相应的格式,如 yyyy-MM-dd yyyy-MM-dd hh:mm:ss
export function formatDate(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}

export function formatLocaleDate(date, locale) {
  const cacheLang = $translate.use()
  locale = (locale || cacheLang).toLowerCase()
  let formatType = 'YYYY-MM-DD HH:mm:ss'
  if (locale === 'en_us') {
    formatType = 'DD/MM/YYYY, hh:mm:ss A'
  }
  return fnsFormat(date, formatType)
}

export function convertToISO8601(string, timezone) {
  timezone = timezone || ''
  string = string.replace(/ /, 'T')
  string = string.replace(/([0-9][0-9]?:[0-9][0-9]?:[0-9][0-9]?)/, '$1.0')
  timezone = timezone ? '+' + (timezone < 10 ? '0' + timezone : timezone) + '00' : ''

  return string + timezone
}
