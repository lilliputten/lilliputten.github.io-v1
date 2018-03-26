/**
 * @module View-ContentWrapper
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.25, 06:31
 * @version 2018.03.25, 06:31
 */

import { decl } from 'bem-react-core';

const __ContentWrapper_proto = /** @lends View-ContentWrapper.prototype */{

  block: 'View',
  elem: 'ContentWrapper',

  /** mods ** {{{ Modifiers... */
  mods(self) {
    return { ...self.mods,
      mode: this.props.mode,
    };
  },/*}}}*/

}

export default decl(__ContentWrapper_proto);
