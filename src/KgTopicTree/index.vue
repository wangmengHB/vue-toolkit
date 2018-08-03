<template lang="pug">
.content
    .item(
        v-for="(item, index) in topicTree"
        :key="index"
    )
        tree-node(
            :keyWords="keyWords"
            :topicName="item.topicName"
            :topicId="item.topicId"
            :skillId="item.skillId"
            :share="item.share"
            :invalid="item.invalid"
            :shareProduct="!!item.shareProduct"
            :children="item.children"
            :level="item.level"
            :command="toggle"
            :isMove = "isMove"
            :maxLevel="maxLevel"
            :hasTopicMenu="hasTopicMenu"
            :currentSelectTopic="currentSelectTopic"
            :unselectableTopic="unselectableTopic"
            :isDUI="isDUI"
            :isKnowledgeShare = "isKnowledgeShare"
            :isManager = "isManager"
            @userSelectTopic="userSelectTopic"
        )
    .item.fake-root.pointer(
        v-if="hasFakeRoot"
        @click="selectFakeRootTopic"
        :class="{selected: currentSelectTopic.topicId === 0}"
    )   (新根话题)
 
        
         
</template>

<script>
import TreeNode from './TreeNode'

export default {
    components: {
        TreeNode
    },
    props: {
        keyWords: {
            type: Array,
            default: () => []
        },
        topicTree: {
            type: Array
        },
        currentSelectTopic: {
            type: Object
        },
        hasTopicMenu: {
            type: Boolean,
            default: false
        },
        isDUI: {
            type: Boolean,
            default: false,
        },
        isKnowledgeShare: {
            type: Boolean,
            default: false,
        },
        isMove: {
            type: Boolean,
            default: false,
        },
        isManager: {
            type: Boolean,
            default: false,
        },
        toggle: {
            type: String,
            default: 'expand'
        },
        unselectableTopic: {
            type: Object,
            default: () => ({})
        },
        maxLevel: {
            type: Number,
            default: 20
        },
        hasFakeRoot: {
            type: Boolean,
            default: false
        }
        
    },

    data () {
        return {

        }
    },
    methods: {
        userSelectTopic (topic) {
            this.$emit("update:currentSelectTopic", topic)          
        },

        selectFakeRootTopic () {
            let fakeTopic = {
                topicId: 0,
                skillId: 0,
                depth: 0,
                level: 0
            }
            this.$emit("update:currentSelectTopic", fakeTopic)
        }
    },
}
    
</script>

<style lang="stylus" scoped>
.fake-root
    height 48px
    line-height 48px
    width 100%
    color #696969
    padding-left 38px 
    &:hover
        background: #F1F4FD;
    
    &.selected
        background #CCDBFE       
</style>
