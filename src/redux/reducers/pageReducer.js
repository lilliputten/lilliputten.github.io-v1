/**
 * @module pageReducer
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 02:42
 * @version 2018.03.19, 02:53
 */

import { SET_PAGE } from 'redux/actions/pageActions'
import config from 'config'
import hashTools from 'libs/hashTools'

const pageId = hashTools.getPageIdFromWindow() || config.site.defaultPage;
const initialState = { page : pageId };

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
      return { page : action.page };
    default:
      return state;
  }
}
