<template lang="pug">
.wrapper(
    v-html="htmlContent"
)    
</template>

<script>
import {findAllChunks, buildChunks} from './util.js'

export default {
    props: {
        keyWords: {
            type: Array
        },
        content: {
            type: String
        }
    },
    data () {
        return {}
    },
    computed: {
        htmlContent () {
            let chunks = findAllChunks(this.keyWords, this.content)
            let html = buildChunks(chunks)
            return html
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrapper >>> .highlight
    color red

</style>