/**
 * @module pageMapper
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 02:42
 * @version 2018.03.26, 20:58
 */

export default function mapStateToProps(state) {
  const { page } = state.page || {};
  return { page };
}

