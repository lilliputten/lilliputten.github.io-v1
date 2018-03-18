/**
 * @module pageActions
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 02:42
 * @version 2018.03.19, 02:53
 */

export const SET_PAGE = 'SET_PAGE';

export function setPage(page) {
  return { type : SET_PAGE, page };
}
