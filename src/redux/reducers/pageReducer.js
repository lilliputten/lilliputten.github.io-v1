/**
 * @module pageReducer
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 02:42
 * @version 2018.03.26, 20:58
 */

import { SET_PAGE, SET_STATUS, SET_MODE } from 'redux/actions/pageActions';
import config from 'config';
import hashTools from 'libs/hashTools';

function getModeForPage (page) {
  return (page === config.site.defaultPage) ? config.site.defaultMode: config.site.contentMode;
}

const page = hashTools.getPageIdFromWindow() || config.site.defaultPage;
const mode = config.site.initialMode; // getModeForPage(page);
const status = config.site.emptyStatus;
const initialState = {page, mode, status};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.mode || config.site.emptyMode,
      };
    case SET_STATUS:
      const status = action.status || config.site.emptyStatus;
      const wasReady = state.wasReady || (status === config.site.readyStatus);
      return {...state, status, wasReady};
    case SET_PAGE:
      const page = action.page;
      return {
        ...state,
        page,
        mode: action.mode || getModeForPage(page)};
    default:
      return state;
  }
}
