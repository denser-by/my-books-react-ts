export function up2(param) {
    return param != null && ("" + param).length < 2 ? '0' + param : param;
}

export function fineDate(date) {
    return '' + date.getFullYear() + '-' + up2(date.getMonth()) + '-' + up2(date.getDay()) + ' ' + up2(date.getHours()) + ':' + up2(date.getMinutes()) + ':' + up2(date.getSeconds());
}