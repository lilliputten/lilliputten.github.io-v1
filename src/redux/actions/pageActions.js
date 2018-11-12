/**
 * @module pageActions
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 02:42
 * @version 2018.03.19, 02:53
 */

export const SET_STATUS = 'SET_STATUS';
export const SET_PAGE = 'SET_PAGE';
export const SET_MODE = 'SET_MODE';

export function setStatus(status) {
  return { type : SET_STATUS, status };
}
export function setPage(page) {
  return { type : SET_PAGE, page };
}
export function setMode(mode) {
  return { type : SET_MODE, mode };
}
