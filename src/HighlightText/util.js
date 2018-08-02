
class Chunk {
    constructor (content, isKey = false) {
        this.isKey = isKey
        this.content = content
    }
}



export function findAllChunks (keyWords = [], content = '') {
    let chunks = []
    let keys = keyWords.slice()
    // todo: 需要对keys中的词做合并处理，
    // 如，ab, bc,  ==> abc, ab, bc
    keys.sort((a, b) => b.length - a.length)
    let start = 0
    while ( start < content.length) {
        let blocks = []
        let subStr = content.substring(start)
        keys.forEach( key => {
            let index = subStr.indexOf(key)
            if (index > -1) {
                blocks.push({
                    start: start + index,
                    end: start + index + key.length
                })
            }
        })
        // todo: 起点一致，比较终点，选择最长的那个.
        blocks.sort((a, b) => a.start - b.start)
        if (blocks.length > 0) {
            let x1 = blocks[0].start
            let x2 = blocks[0].end
            chunks.push(new Chunk(content.substring(start, x1)))
            chunks.push(new Chunk(content.substring(x1, x2), true))
            start = x2
        } else {
            let end = content.length
            chunks.push(new Chunk(content.substring(start, end)))
            start = end
        }
    
    }
    return chunks

}


export function buildChunks (chunks) {
    let html = ''
    chunks.forEach(item => {
        if (item.isKey) {
            html += `<span class="highlight">${item.content}</span>`
        } else {
            html += item.content
        }
    })
    // todo: check xss attack here.

    return html
}