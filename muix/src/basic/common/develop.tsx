import React from 'react'

const DEV_MODE = process.env.NODE_ENV === 'development'

export const LoremIpsum = (words: 2 | 5 | 10 | 20 | 40 | 80 | 160) => {
  switch (words) {
    case 2: return 'Lorem ipsum. '
    case 5: return 'Lorem ipsum dolor sit amet. '
    case 10: return 'Lorem ipsum dolor sit amet, usu vocibus eleifend accommodare te. '
    case 20: return 'Lorem ipsum dolor sit amet, ei eius elitr numquam mei, ubique utamur pericula ad mel! Quo at dicta lobortis salutatus. '
    case 40: return 'Lorem ipsum dolor sit amet, offendit comprehensam te nam! Dicam incorrupte id his, veri ipsum singulis mel ex! Mei ei cetero convenire. Ius quas dolorem no? Te usu rebum delectus scribentur, vel an veri dissentias, mel id laboramus urbanitas et. '
    case 80: return 'Lorem ipsum dolor sit amet, ei has audire tamquam mediocritatem, vim velit postulant eu. Mel insolens intellegebat ei. Autem tincidunt intellegebat ad duo? Est ei meliore ancillae, sea an efficiendi intellegam definitiones, eum ei oratio latine aliquando! Et eos probo volumus. Propriae deleniti et sea.Ne eam tibique detracto.Vero ullum ius id, cu nobis iuvaret nec.Wisi inciderint ad vim ? Vitae docendi interesset pro eu, ei pri tota petentium! Usu munere epicurei ei, meliore graecis et est, ne per. '
    case 160: return 'Lorem ipsum dolor sit amet, no usu nominavi appetere, debet partem ei vis, ex nec fugit maiestatis. Te sint propriae sea, his augue labores in? Duo debet mollis ea, ut est denique eligendi copiosae! Natum ubique feugait mea eu, falli liber cotidieque sit in. Ad quo suas pertinacia dissentiunt! Legere accusata nominati et his, et eos possit copiosae, in mutat commodo constituam quo.Doctus scripta petentium per ad, cum cu dictas eleifend dissentiet, pro civibus lobortis accommodare id.Vim dolor signiferumque ea, brute propriae iudicabit ne pro, porro diceret appareat ad vix! Sea no zril noster adipisci, stet semper persequeris sit et.Mel ad cetero denique apeirian, oblique scribentur nam ne. No mollis nostrud vel.Vim te erat nemore.Sea ne meliore vivendum.Eum ex tollit ornatus! Doctus mandamus vel ex, ius ea enim intellegat, purto imperdiet sed ne.Mel electram mnesarchum instructior no. Sed audire tacimates ex, ex sit tincidunt definitionem.Usu tation consectetuer et, fabellas efficiendi eu vix. '
  }
}


//Helper components, counts number of its render() method calls
export class RenderCounter extends React.Component<{ children: (count: number) => React.ReactNode}> {
  counter = 0
  render() {
    this.counter++
    return this.props.children(this.counter)
  }
}

export const renderCounter = (input: () => { developer_flag: boolean }, output: (count: number) => void, next: () => React.ReactNode) => {
  const render = (count: number) => {
    output(count)
    return next()
  }
  const res = () => {
    const { developer_flag } = input()
    if (developer_flag) return <RenderCounter>{render}</RenderCounter>
    output(undefined)
    return next()
  }
  return res
}

