import META from './meta';

function msgToValue(msg) {
    if (msg.length < 34) {
        return {
            error: true,
            msg: '电文长度不正确'
        }
    }
    const bitMap = msg.substring(18, 34)
    const bitMapArr = []
    for (let i = 0; i < 8; i++) {
        const bit = bitMap.substring(i * 2, i * 2 + 2)
        const map = parseInt(bit, 16).toString(2).padStart(8, '0')
        for (let j = 0; j < 8; j++) {
            if (map.charAt(j) === '1') {
                bitMapArr.push((i * 8 + j + 1).toString())
            }
        }
    }
    const keys = Object.keys(META)
    let index = 34
    const values = {}
    for (let key of bitMapArr) {
        if (keys.indexOf(key) === -1) {
            return {
                error: true,
                msg: 'bitmap不正确'
            }
        }
        const meta = META[key]
        const {type, length} = meta
        if (type === 'c') {
            index += 4
            values[key] = []
            const {content: contents} = meta
            for (let i = 0; i < contents.length; i++) {
                const content = contents[i]
                const {type: ctype, length: clength} = content
                try {
                    const result = parseValue(msg, ctype, clength, index)
                    values[key].push(result.value)
                    index = result.end
                } catch (e) {
                    return {
                        error: true,
                        key,
                        idx: i,
                        msg: '电文长度不正确'
                    }
                }
            }
        } else {
            try {
                const result = parseValue(msg, type, length, index)
                values[key] = (result.value)
                index = result.end
            } catch (e) {
                return {
                    error: true,
                    key,
                    msg: '电文长度不正确'
                }
            }
        }
    }
    return values
}

function parseValue(msg, type, length, start) {
    let end = start
    if (type === 'z') {
        let ll = -length
        if (ll % 2 === 1) {
            ll = ll + 1
        }
        const llHex = msg.substring(end, end += ll)
        length = parseInt(llHex, 10)
        let nLength = length
        if (length % 2 === 1) {
            nLength = length + 1
        }
        const valueHex = msg.substring(end, end += nLength).substring(0, length)
        return {
            end,
            value: valueHex
        }
    }
    if (type === 'n') {
        if (length > 0) {
            let nLength = length
            if (length % 2 === 1) {
                nLength = length + 1
            }
            let valueHex = msg.substring(end, end += nLength)
            valueHex = valueHex.substring(valueHex.length - length, valueHex.length)
            return {
                end,
                value: valueHex
            }
        } else {
            let ll = -length
            if (ll % 2 === 1) {
                ll = ll + 1
            }
            const llHex = msg.substring(end, end += ll)
            length = parseInt(llHex, 10)
            let nLength = length
            if (length % 2 === 1) {
                nLength = length + 1
            }
            let valueHex = msg.substring(end, end += nLength)
            valueHex = valueHex.substring(valueHex.length - length, valueHex.length)
            return {
                end,
                value: valueHex
            }
        }
    }
    if (type === 's') {
        if (length > 0) {
            const valueHex = msg.substring(end, end += length * 2)
            return {
                end,
                value: hexToStr(valueHex)
            }
        } else {
            let ll = -length
            if (ll % 2 === 1) {
                ll = ll + 1
            }
            const llHex = msg.substring(end, end += ll)
            length = parseInt(llHex, 10)
            const valueHex = msg.substring(end, end += length * 2)
            return {
                end,
                value: hexToStr(valueHex)
            }
        }
    }
    if (type === 'h') {
        if (length > 0) {
            const valueHex = msg.substring(end, end += length * 2)
            return {
                end,
                value: valueHex
            }
        } else {
            let ll = -length
            if (ll % 2 === 1) {
                ll = ll + 1
            }
            const llHex = msg.substring(end, end += ll)
            length = parseInt(llHex, 10)
            const valueHex = msg.substring(end, end += length * 2)
            return {
                end,
                value: valueHex
            }
        }
    }
    if (type === 'b') {
        const valueHex = msg.substring(end, end += length / 4)
        return {
            end,
            value: valueHex
        }
    }
}

function hexToStr(hex) {
    if (hex) {
        const result = []
        for (let i = 0; i < hex.length / 2; i++) {
            const byte = hex.substring(i * 2, i * 2 + 2)
            result.push(String.fromCharCode(parseInt(byte, 16)))
        }
        return result.join('')
    }
    return ''
}

export default msgToValue
