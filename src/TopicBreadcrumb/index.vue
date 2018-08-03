<template lang="pug">
.bread-crumb
    .item.root.pointer(
        v-if="hasExtraRoot"
        :class="{'none-events':!clickable}"
        @click="selectRoot"
    ) {{extraRoot}}
    .item.pointer(
        v-for="(item, index) in topicsInPath"
        :key="index"
        :class="{'none-events':!clickable}"
        @click="selectTopic(item)" 
    ) {{item.topicName}}
    
</template>

<script>

export default {
    props: {
        clickable: {
            type: Boolean,
            default: false,
        },
        hasExtraRoot: {
            type: Boolean,
            default: false,
        },
        extraRoot: {
            type: String,
            default: '全部知识',
        },
        topicsInPath: {
            type: Array,
        }
    },
    data () {
        return {

        }
    },
    methods: {
        selectRoot () {
            this.$emit('selectRoot')
        },
        selectTopic (item) {
            this.$emit('selectTopic', item)
        }
    }
}
    
</script>

<style lang="stylus" scoped>
.bread-crumb
    line-height 20px
    overflow hidden
    text-overflow ellipsis
    color #6C7EA0

    .item
        display inline-block
        margin-right 10px

    .item:after
        content '>'
        padding-left 10px

    .item:last-child:after
        content ''

    .root
        font-weight 600

.none-events
    pointer-events: none;


</style>
