export function up2(param) {
    return param != null && ("" + param).length < 2 ? '0' + param : param;
}

export function fineDate(date) {
    return fineDateShort(date) + ' ' + up2(date.getHours()) + ':' + up2(date.getMinutes()) + ':' + up2(date.getSeconds());
}

export function fineDateShort(date) {
    return '' + date.getFullYear() + '-' + up2(date.getMonth() + 1) + '-' + up2(date.getDate());
}