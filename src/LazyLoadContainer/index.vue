<template lang="pug">
.lazy-load-container(ref="scrollContainer")
    .clearfix
        slot
    .bottom-indicator(v-show="list.length >= 30")
        .loading(v-show="hasMore") 加载中...
        .no-more(v-show="!hasMore") 没有更多数据了
</template>

<script>

export default {
    props: {
        list: {
            type: Array,
            required: true
        },
        pageNumber: {
            type: Number,
            default: 0,
        },
        hasMore: {
            type: Boolean,
            default: true,
        }
    },
    data () {
        return {
            lock: false,
        }
    },
    mounted() {
        let node = this.$refs.scrollContainer
        node.addEventListener('scroll', () => {
            this.scroll(node)
        })
    },
    updated() {
        this.lock = false
    },
    methods: {
        scroll(el) {
            let { scrollTop, scrollHeight, offsetHeight } = el
            if (Math.abs(scrollTop + offsetHeight - scrollHeight) < 5) {
                this.loadMore()
            }
        },

        loadMore() {
            if (!this.hasMore || this.lock) {
                return
            }
            let pageNumber = this.pageNumber
            this.lock = true
            this.$emit('loadNextPageData', ++pageNumber)
        }

    }
}
    
</script>

<style lang="stylus" scoped>
$break = 768px

.lazy-load-container {
    padding: 0 50px 20px 22px;
    overflow-x: hidden;
    overflow-y: auto;

    @media screen and (max-width: $break) {
        padding: 20px 30px;
    }


    .bottom-indicator {
        text-align: center;
        height: 30px;
        line-height: 30px;
        color: gray;
    }
}
</style>
