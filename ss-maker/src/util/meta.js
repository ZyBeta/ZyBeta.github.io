const META = {
    2: {
        name: '会員番号・口座番号(PAN)',
        type: 'n',
        length: -2,
        default: ''
    },
    3: {
        name: 'プロセシングコード',
        type: 'n',
        length: 6,
        default: '000000'
    },
    4: {
        name: '取引金額',
        type: 'n',
        length: 12,
        default: '000000010000'
    },
    11: {
        name: 'システムトレースオーディットナンバー',
        type: 'n',
        length: 6,
        default: '000001'
    },
    12: {
        name: '現地取引時刻(hhmmss)',
        type: 'n',
        length: 6,
        default: '123005'
    },
    14: {
        name: '有効期限',
        type: 'n',
        length: 4,
        default: ''
    },
    18: {
        name: '加盟店業種',
        type: 'n',
        length: 4,
        default: ''
    },
    22: {
        name: 'POS入力モード',
        type: 'n',
        length: 3,
        default: '070'
    },
    35: {
        name: 'トラック2データ',
        type: 'z',
        length: -2,
        default: '4761739001010119d271220112345678'
    },
    37: {
        name: 'リトリーバルリファレンスナンバー',
        type: 's',
        length: 12,
        default: ''
    },
    38: {
        name: '承認コード',
        type: 's',
        length: 6,
        default: ''
    },
    39: {
        name: 'レスポンスコード',
        type: 's',
        length: 2,
        default: ''
    },
    48: {
        name: '個社用追加データ',
        type: 'c',
        content: [
            {
                name: '売上件数',
                type: 's',
                length: 6,
                default: '000000'
            },
            {
                name: '売上金額',
                type: 's',
                length: 8,
                default: '00000000'
            },
            {
                name: '取消件数',
                type: 's',
                length: 6,
                default: '000000'
            },
            {
                name: '取消金額',
                type: 's',
                length: 8,
                default: '00000000'
            }
        ]
    },
    55: {
        name: 'IC格納データ',
        type: 'h',
        length: -3,
        default: '8407A00000000410105F3401019F26089A28957C62702EC69F2701809F1008010103A4000022DD9F3704FF7E73059F360100950500000088009A031411109C01009F02060000000200005F2A020392820258009F1A0203929F03060000000000009F3303E0B0C89F34034103029F3501229F1E0835333800000000005A0852500243210799999F21031334149F08020002'
    },
    57: {
        name: 'エラーコード',
        type: 's',
        length: 4,
        default: ''
    },
    58: {
        name: '各国用予約域',
        type: 'c',
        content: [
            {
                name: '業務区分',
                type: 's',
                length: 2,
                default: '01'
            },
            {
                name: 'TID',
                type: 's',
                length: 13,
                default: '9999500000005'
            },
            {
                name: '処理年月日',
                type: 's',
                length: 6,
                default: '200922'
            },
            {
                name: 'カード区分',
                type: 's',
                length: 1,
                default: '5'
            },
            {
                name: '取消・返品区分',
                type: 's',
                length: 1,
                default: ' '
            },
            {
                name: '取扱区分',
                type: 's',
                length: 3,
                default: '   '
            },
            {
                name: '伝票番号',
                type: 's',
                length: 5,
                default: '     '
            },
            {
                name: 'mPOSフラグ',
                type: 's',
                length: 1,
                default: '0'
            },
            {
                name: '商品コード',
                type: 's',
                length: 7,
                default: '0000000'
            },
            {
                name: '自動取消フラグ',
                type: 's',
                length: 1,
                default: '0'
            },
            {
                name: 'dukpt用KSN',
                type: 'b',
                length: 80,
                default: '00000000000000000000'
            },
            {
                name: 'dukpt用JIS1Track2MAC',
                type: 'b',
                length: 64,
                default: '0011223344556677'
            },
            {
                name: '予備',
                type: 's',
                length: 8,
                default: '        '
            },
            {
                name: 'IC格納データ部用MAC',
                type: 'b',
                length: 64,
                default: '0011223344556677'
            },
        ]
    },
    59: {
        name: '支払方法',
        type: 's',
        length: -3,
        default: ''
    },
    61: {
        name: '予約域',
        type: 'h',
        length: -3,
        default: ''
    },
    62: {
        name: 'VCT域',
        type: 'c',
        content: [
            {
                name: 'VCT取引識別',
                type: 's',
                length: 1,
                default: '1'
            },
            {
                name: 'VCTオーソリリカバリ識別',
                type: 's',
                length: 1,
                default: '1'
            },
            {
                name: '受け渡しトランザクションID',
                type: 's',
                length: 15,
                default: '               '
            },
            {
                name: '受け取りトランザクションID',
                type: 's',
                length: 15,
                default: '               '
            },
            {
                name: '受け取りPaynetAccountReference',
                type: 's',
                length: 29,
                default: '                             '
            },
        ]
    },
}

export default META
