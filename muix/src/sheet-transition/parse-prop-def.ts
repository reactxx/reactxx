import warning from 'warning'

/* interval: 
  '': duration
  '-50', '50-', '30-70': percent of duration
  7: '300': 0-300 ms 
  2 '200,100': 100ms start, 200ms len
  6',100': from 100ms to duration end
  5'200,' from 200ms (from duration end) to duration end
*/
export const parsePropDef = (interval: string, $duration: number) => {
    let leftGap = 0, rightGap = 0, duration = $duration
    warning(typeof interval === 'string', 'Interval must be string')

    if (interval === '') return { leftGap, rightGap, duration }

    const parsed = regx.exec(interval)

    const idx = parsed ? parsed.findIndex((val, idx) => idx > 0 && !!val) : 0
    warning(idx > 0, `Found '${interval}, expected: '' or -50' or '50-' or '30-70' or '300' or '200,100' or ',100' or '200,'`)
    if (idx<=0) return { leftGap, rightGap, duration }
    
    const value: string = parsed[idx]
    let arr: number[]

    //1(\d+-\d+)|2(\d+,\d+)|3(-\d+)|4(\d+-)5|(\d+,)|6(,\d+)|7(\d+)
    switch (idx) {
        case 1: case 3: case 4:
            arr = value.split('-').map(v => v ? parseInt(v) : 0)
            if (idx===3) arr[0] = 0
            else if (idx===4) arr[1]=100
            const [beg, end] = arr
            leftGap = beg * $duration / 100; rightGap = $duration - end * $duration / 100
            warning(leftGap >= 0 && rightGap >=0 && leftGap + rightGap < $duration, `Range error in percent inerval: '${interval}`)
            break
        case 2: case 5: case 6: case 7:
            // 2 '200,100': 100ms start, 200ms len
            // 5 '200,' from 200ms (from duration end) to duration end
            // 6 ',100': from 100ms to duration end
            // 7 '300': 0-300 ms 
            // duratin to arr[0], delay to arr1
            arr = value.split(',').map(v => parseInt(v))
            if (idx===5) arr[1] = duration - arr[0]
            else if (idx===6) arr[0] = duration - arr[1]
            else if (idx===7) arr.push(0)
            const [dur, delay] = arr
            warning(dur > 0 && delay >=0 && dur + delay <= duration, `Range error in millisecond inerval: '${interval}`)
            leftGap = delay; rightGap = $duration - dur - delay
            break
    }

    duration = $duration - rightGap - leftGap
    return { leftGap, rightGap, duration }

}
const regx = /^(\d+-\d+)|(\d+,\d+)|(-\d+)|(\d+-)|(\d+,)|(,\d+)|(\d+)$/