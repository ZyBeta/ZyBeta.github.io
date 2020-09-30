import META from './meta.js'

function valueToMsg(mti, values) {
    const keys = Object.keys(values)
    const bitMap = []
    const message = []
    for (const key of keys) {
        if (values[key] && META[key]) {
            const meta = META[key]
            const value = values[key]
            const {type, length} = meta
            let hex = ''
            if (type === 'c') {
                const {content: contents} = meta
                const contentValueHexArr = []
                for (let i = 0; i < contents.length; i++) {
                    const content = contents[i]
                    const cvalue = value[i]
                    const {type: ctype, length: clength} = content
                    try {
                        const chex = makeValue(ctype, clength, cvalue)
                        contentValueHexArr.push(chex)
                    } catch (e) {
                        return {
                            error: true,
                            key,
                            idx: i,
                            msg: e.message
                        }
                    }
                }
                const contentValueHex = contentValueHexArr.join('')
                if (contentValueHex) {
                    const ll = contentValueHex.length / 2
                    const llHex = ll.toString().padStart(4, '0')
                    hex = llHex + contentValueHex
                }
            } else {
                try {
                    hex = makeValue(type, length, value)
                } catch (e) {
                    return {
                        error: true,
                        key,
                        msg: e.message
                    }
                }
            }
            if (hex) {
                bitMap.push(key)
                message.push(hex)
            }
        }
    }
    const bitMapStrArr = []
    for (let i = 0; i < 8; i++) {
        const bit = []
        for (let j = 0; j < 8; j++) {
            const idx = i * 8 + j + 1
            if (bitMap.indexOf(idx.toString(10)) !== -1) {
                bit.push(1)
            } else {
                bit.push(0)
            }
        }
        let hex = parseInt(bit.join(''), 2).toString(16)
        hex = hex.padStart(2, '0')
        bitMapStrArr.push(hex)
    }
    const bitMapHex = bitMapStrArr.join('')
    const msg = '6000190000' + mti + bitMapHex + message.join('')
    const tlength = (msg.length + 4) / 2
    return tlength.toString(16).padStart(4, '0') + msg
}

function makeValue(type, length, value) {
    if (!value) {
        return
    }
    if (type === 'z') {
        const hexReg = /^[0-9a-fA-F]*$/
        if (!hexReg.test(value)) {
            throw new Error('必须为16进制字符串')
        }
        let ll = -length
        length = value.length
        if (length >= Math.pow(10, ll)) {
            throw new Error('长度过长')
        }
        if (ll % 2 === 1) {
            ll = ll + 1
        }
        const llHex = length.toString().padStart(ll, '0')
        if (length % 2 === 1) {
            length = length + 1
        }
        const valueHex = value.padEnd(length, '0')
        return llHex + valueHex
    }
    if (type === 'n') {
        const hexReg = /^[0-9]*$/
        if (!hexReg.test(value)) {
            throw new Error('必须为数字')
        }
        if (length > 0) {
            if (value.length !== length) {
                throw new Error('长度错误')
            }
            if (length % 2 === 1) {
                length = length + 1
            }
            if (value.length < length) {
                value = value.padStart(length, '0')
            }
            return value
        } else {
            let ll = -length
            length = value.length
            if (length >= Math.pow(10, ll)) {
                throw new Error('长度过长')
            }
            if (ll % 2 === 1) {
                ll = ll + 1
            }
            const llHex = length.toString().padStart(ll, '0')
            if (length % 2 === 1) {
                length = length + 1
            }
            const valueHex = value.padStart(length, '0')
            return llHex + valueHex
        }
    }
    if (type === 's') {
        // eslint-disable-next-line no-control-regex
        const hexReg = /^[\x00-\xff]*$/
        if (!hexReg.test(value)) {
            throw new Error('必须为字符')
        }
        if (length > 0) {
            if (value.length !== length) {
                throw new Error('长度错误')
            }
            return strToHex(value)
        } else {
            let ll = -length
            length = value.length
            if (length >= Math.pow(10, ll)) {
                throw new Error('长度过长')
            }
            if (ll % 2 === 1) {
                ll = ll + 1
            }
            const llHex = length.toString().padStart(ll, '0')
            const valueHex = strToHex(value)
            return llHex + valueHex
        }
    }
    if (type === 'h') {
        const hexReg = /^[0-9a-fA-F]*$/
        if (!hexReg.test(value)) {
            throw new Error('必须为16进制字符串')
        }
        if (length > 0) {
            if (value.length !== length * 2) {
                throw new Error('长度错误')
            }
            return value
        } else {
            if (value.length % 2 === 1) {
                throw new Error('必须为16进制字符串')
            }
            let ll = -length
            length = value.length / 2
            if (length >= Math.pow(10, ll)) {
                throw new Error('长度过长')
            }
            if (ll % 2 === 1) {
                ll = ll + 1
            }
            const llHex = length.toString().padStart(ll, '0')
            return llHex + value
        }
    }
    if (type === 'b') {
        const hexReg = /^[0-9a-fA-F]*$/
        if (!hexReg.test(value)) {
            throw new Error('必须为16进制字符串')
        }
        if (value.length * 4 !== length) {
            throw new Error('长度错误')
        }
        return value
    }
}

function strToHex(str) {
    if (str) {
        const result = []
        for (let i = 0; i < str.length; i++) {
            result.push(str.charCodeAt(i).toString(16))
        }
        return result.join('')
    }
    return ''
}

export default valueToMsg
