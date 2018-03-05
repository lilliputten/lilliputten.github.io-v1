module.exports = video

//          % [  title  ]    (  src   )
var reg = /^%\[([^\]]*)\]\s*\(([^)]+)\)/

function video(state, silent) {
  // it is surely not our rule, so we could stop early
  if (state.src[state.pos] !== '%') return false

  var match = reg.exec(state.src.slice(state.pos))
  if (!match) return false

  // in silent mode it shouldn't output any tokens or modify pending
  if (!silent) {
    state.push({
      type: 'video',
      title: match[1],
      src: match[2],
      level: state.level,
    })
  }

  // every rule should set state.pos to a position after token's contents
  state.pos += match[0].length

  return true
}
