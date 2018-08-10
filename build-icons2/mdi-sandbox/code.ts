let icons: any
let text: string
const words = text.split(/[\s\-]/)
const selected = []
for (const key in icons.list)
    if (icons.list.hasOwnProperty(key)) {
        const icon = icons.list[key];
        if (icon.articles.main) {
            if (words.every(word => icon.keywords.some(item => item.startsWith(word)))) 
              selected.push(key)
        }
    }