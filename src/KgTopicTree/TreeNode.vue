<template lang="pug">
.tree-menu
    .row(
        :style="{paddingLeft: Number(level * 18)  + 'px' }"
        :class="{selected: isSelected, disabled: !isEnabled}"
    )
        .item.toggle-icon.pointer(
            :class="{'ba-icon-list-expand': expand, 'ba-icon-list-collapse': !expand, 'hidden': !children || children.length === 0}"
            @click="toggleMenu"
        )

        .item.text.pointer(
            @click="selectTopic"
            :title="topicName"
            :class="{invalidedClass:invalid,shareProductClass:shareProduct}"
        ) 
            highlight-text(
                :keyWords="keyWords"
                :content="topicName"
            )
        .shared(v-if="level===1 && share && !isDUI && !isMove && !isKnowledgeShare") (已分享)
        .invalidedClass(v-if="level===1 && invalid && !isDUI && !isMove && !isKnowledgeShare") (已失效)
        topic-menu.topic-menu(
            v-if="hasTopicMenu"
            :topicId="topicId"
            :skillId="skillId"
            :topicName="topicName"
            :children="children"
            :shareProduct="shareProduct"
            :invalid="invalid"
            :level="level"
            :buttons="availableButtons"
        )
    template(
        v-if="isEnabled && level <= maxLevel"
    )
        tree-node(
            v-for="(node,index) in children"
            :key="index"
            :keyWords="keyWords"
            :children="node.children"
            :topicName="node.topicName"
            :topicId="node.topicId"
            :skillId="node.skillId"
            :level="level + 1"
            :command="command"
            :isMove = "isMove"
            :isKnowledgeShare = "isKnowledgeShare"
            :shareProduct="!!node.shareProduct"
            :isManager = "isManager"
            :maxLevel="maxLevel"
            v-show="expand"
            :hasTopicMenu="hasTopicMenu"
            :currentSelectTopic="currentSelectTopic"
            :unselectableTopic="unselectableTopic"
            :isDUI="isDUI"
            @userSelectTopic="emitUserSelect"
        )
</template>

<script>
import {removeItem} from '../../../util'
import TopicMenu from './TopicMenu'
import HighlightText from '../HighlightText'

export default {
    name: "tree-node",
    components: {
        TopicMenu,
        HighlightText
    },
    props: {
        keyWords: {
            type: Array,
            default: () => []
        },
        topicId: {},
        skillId: {},
        topicName: {},
        children: {},
        level: {
            type: Number,
            default: 1
        },
        command: {
            type: String,
            default: 'expand',
        },
        hasTopicMenu: {
            type: Boolean,
            default: false
        },
        share: {
            type: Boolean,
            default: false
        },
        shareProduct: {
            type: Boolean,
            default: false
        },
        invalid: {
            type: Boolean,
            default: false
        },
        currentSelectTopic: {
            type: Object
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
        unselectableTopic: {
            type: Object,
            default: () => ({})
        },
        maxLevel: {
            type: Number,
            default: 20
        }
    },
    data () {
        return {
            expand: true,
        }
    },
    created(){

    },
    computed: {
        isSelected () {           
            if (this.currentSelectTopic) {
                return this.topicId === this.currentSelectTopic.topicId
            }
            return false    
        },
        isEnabled () {
            if ((this.topicId === this.unselectableTopic.topicId) && !this.shareProduct) {
                return false
            }
            return true
        },

        availableButtons () {
             let btns = ['share','add', 'edit', 'del', 'move'];



            if(this.level === 1 && this.shareProduct && !this.isDUI){
                return ['del']
            }

            if(this.level > 1 && this.shareProduct && !this.isDUI){
                return []
            }

            if(this.isDUI || this.level > 1 || !this.isManager){
                removeItem(btns, 'share')
            }

            if (this.isDUI && this.level === 1) {
                removeItem(btns, 'edit')
                removeItem(btns, 'del')
            }
            if (this.isDUI && this.level === 3) {
                removeItem(btns, 'add')
            }
            if (this.level > 3) {
                removeItem(btns, 'add')
            }
            return btns;
        },
    },
    methods: {
        toggleMenu () {
            if (!this.children || !this.children.length) {
                return this.expand = true
            }
            this.expand = !this.expand;
        },
        selectTopic () {
         if(this.invalid && !this.isDUI){
             this.$alert('知识所有者已取消分享或删除了此条知识，' +
                 '您将无法使用其中的内容。', '提示', {
                 confirmButtonText: '知道了'
             });
             return
         }

            this.$emit('userSelectTopic', {
                topicName: this.topicName,
                topicId: this.topicId,
                skillId: this.skillId,
                level: this.level,
                invalid: this.invalid,
                shareProduct: this.shareProduct,
            })
        },

        emitUserSelect (topic) {
            this.$emit('userSelectTopic', topic)
        }
    },

    watch: {
        command (curVal, oldVal) {
            if (curVal.indexOf('expand') > -1 ) {
                this.expand = true
            } else if (curVal.indexOf('collapse') > -1 ) {
                this.expand = false
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.tree-menu    
    user-select none

    .hidden
        visibility hidden

    .row:hover
        background: #F1F4FD;

    .row
        height 48px
        line-height 48px
        width 100%
        color #696969
        position relative

        .toggle-icon
            margin-right 5px
            width 15px
            height 15px

        .item
            display inline-block
            vertical-align middle

        .text
            max-width: calc(100% - 80px)
            overflow hidden
            white-space nowrap
            text-overflow ellipsis

        .shared
            display inline-block
            vertical-align middle
            color #FB6664

        .shareProductClass
            color #FFB700

        .invalidedClass
            display inline-block
            vertical-align middle
            color #B6B5B4


    .row:hover .topic-menu
        display block

    .row.selected
        background #CCDBFE


</style>
