/**
 * @module pageReducer
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 02:42
 * @version 2018.03.26, 20:58
 */

import { SET_PAGE } from 'redux/actions/pageActions';
import config from 'config';
import hashTools from 'libs/hashTools';

function getModeForPage (page) {
  return (page === config.site.defaultPage) ? config.site.defaultMode: config.site.contentMode;
}

const page = hashTools.getPageIdFromWindow() || config.site.defaultPage;
const mode = getModeForPage(page);
const initialState = {page, mode};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
      const page = action.page
      const mode = action.mode || getModeForPage(page);
      return {page, mode};
    default:
      return state;
  }
}
