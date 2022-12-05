import configMap from '../../config/applicaion.json';

const LevenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  let matrix = []
  let i
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  let j
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ) // deletion
      }
    }
  }
  return matrix[b.length][a.length]
}

let postfix = ''

if (configMap['REACT_APP_API_URI_EX'] !== undefined) {
  let exScore = LevenshteinDistance(
    window.location.origin,
    configMap['REACT_APP_API_URI_EX']
  )
  let inScore = LevenshteinDistance(
    window.location.origin,
    configMap['REACT_APP_API_URI']
  )
  if (exScore < inScore) {
    postfix = '_EX'
  }
}

localStorage.setItem('reactAppDebug', configMap.REACT_APP_DEBUG)
localStorage.setItem('reactAppKey', configMap.REACT_APP_KEY)
localStorage.setItem('reactAppApiUri', configMap[`REACT_APP_API_URI${postfix}`])
localStorage.setItem(
  'reactAppRemoteUri',
  configMap[`REACT_APP_REMOTE_URI${postfix}`]
)
localStorage.setItem('reactAppFileUri', configMap[`REACT_APP_FILE_URI${postfix}`])
