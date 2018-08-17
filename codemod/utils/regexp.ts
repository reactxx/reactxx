export const replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(string2RegExpLiteral(find), 'g'), replace);

const string2RegExpLiteral = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")

export const matchAll = (regEx: RegExp, str: string, onMatch: (match: RegExpExecArray | null, lastIdx: number) => void) => {
    let lastIdx = 0
    while (true) {
        const match: RegExpExecArray = regEx.exec(str)
        if (!match) break
        onMatch(match, lastIdx)
        lastIdx = match.index + match[0].length
    }
    onMatch(null, lastIdx)
}

export const processMatchAll = (regEx: RegExp, str: string, onMatch: (match: RegExpExecArray | null, res: string[]) => void) => {
    const res: string[] = []

    matchAll(regEx, str, (match, idx) => {
        const matchIdx = match ? match.index : str.length
        if (matchIdx > idx) res.push(str.substring(idx, matchIdx))
        if (match) onMatch(match, res)
    })

    return res.join('')
}
