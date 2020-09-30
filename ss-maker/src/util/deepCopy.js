export default function deepCopy(target) {
    let result
    if (typeof target === 'object') {
        if (Array.isArray(target)) {
            result = []
            const keys = Object.keys(target)
            keys.forEach(key => {
                result.push(deepCopy(target[key]))
            })
        } else if (target === null) {
            result = null
        } else if (target.constructor === RegExp) {
            result = target
        } else {
            result = {}
            const keys = Object.keys(target)
            keys.forEach(key => {
                result[key] = deepCopy(target[key])
            })
        }
    } else {
        result = target
    }
    return result
}
