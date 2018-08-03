<template lang="pug">
.panel-topic.clearfix
    template(v-if="btnNum <= 2")
        .panel-btn.pointer(
            v-for="(btn, index) in buttons"
            :key='btn'
            @click="TOPIC_BUTTON_MAP[btn].command(topicId, skillId)"
            :title="TOPIC_BUTTON_MAP[btn].title"
        )
            i.icon(:class="TOPIC_BUTTON_MAP[btn].cls")

    template(v-if="btnNum > 2")
        .panel-btn.pointer(
            @click="TOPIC_BUTTON_MAP[buttons[0]].command(topicId, skillId)"
            :title="TOPIC_BUTTON_MAP[buttons[0]].title"
        )
            i.icon(
                :class="TOPIC_BUTTON_MAP[buttons[0]].cls"
            )
        .panel-btn.more.pointer(
            @click="toggleMoreMenu"
        )
            i.icon.ba-icon-topic-menu-more
            .more-menu(
                v-show="showMoreMenu"
                :style="{width: `${moreMenuWidth}px`}"
            )
                .panel-btn.pointer(
                    v-for="(btn, index) in moreBtns"
                    :key='btn'
                    @click="TOPIC_BUTTON_MAP[btn].command(topicId, skillId)"
                    :title="TOPIC_BUTTON_MAP[btn].title"
                )
                    i.icon(
                        :class="TOPIC_BUTTON_MAP[btn].cls"
                    )

</template>

<script>
import {deleteTopic, getTopics} from '../../../api'
import {calcTreeDepth} from '../../../util'


export default {
    props: {
        topicId: {
            required: true
        },
        skillId: {
            required: true
        },
        topicName: {
            required: true,
        },
        level: {
            required: true,
        },
        shareProduct: {
            type: Boolean,
            default: false
        },
        invalid: {
            type: Boolean,
            default: false
        },
        children: {
            required: true
        },
        buttons: {
            type: Array,
        },
    },

    data () {
        let btnNum = this.buttons.length
        return {
            btnNum,
            TOPIC_BUTTON_MAP: {
                'add': {
                    command: this.addTopic, 
                    cls: 'ba-icon-topic-menu-add',
                    title: '添加话题',
                },
                'edit': {
                    command: this.editTopic,
                    cls: 'ba-icon-topic-menu-edit',
                    title: '编辑话题'
                },
                'del': {
                    command: this.deleteTopic,
                    cls: 'ba-icon-topic-menu-trash',
                    title: '删除话题',
                },
                'move': {
                    command: this.moveTopic,
                    cls: 'ba-icon-topic-menu-transfer',
                    title: '移动话题',
                },
                'share': {
                    command: this.shareTopic,
                    cls: 'ba-icon-topic-menu-share',
                    title: '分享话题',
                }
            },
            showMoreMenu: false            
        }
    },
    computed: {
        moreBtns () {
            let btns = this.buttons.slice(1)
            return btns
        },
        moreMenuWidth () {
            let len = this.moreBtns.length
            let count = len
            if (len > 3) {
                count = 3
            }
            let width = 32 * count
            return width + 12
        }
    },

    methods: {
        toggleMoreMenu () {
            this.showMoreMenu = !this.showMoreMenu
        },

        hideMoreMenu () {
            this.$nextTick(() => {
                this.showMoreMenu = false
            })
        },

        addTopic (topicId, skillId) {
            this.hideMoreMenu()
            this.$store.dispatch({
                type: 'OPEN_DIALOG',
                name: 'ADD_TOPIC_DIALOG',
                param: {
                    type: 'add',
                    topicId: topicId,
                    skillId: skillId
                }
            })
        },

        editTopic (topicId, skillId) {
            this.hideMoreMenu()
            this.$store.dispatch({
                type: 'OPEN_DIALOG',
                name: 'ADD_TOPIC_DIALOG',
                param: {
                    type: 'edit',
                    topicId: topicId,
                    skillId: skillId
                }
            })
        },

        deleteTopic (topicId,skillId) {
            this.hideMoreMenu()

            let confirmStr = '此操作将永久删除该话题, 是否继续?';
            if(this.invalid || this.shareProduct){
                confirmStr = '此操作将从本精灵中删除该话题，是否继续';
            }

            this.$confirm(confirmStr, this.$t('WARNING'), {
                confirmButtonText: this.$t('OK'),
                cancelButtonText: this.$t('CANCEL'),
                type: 'warning'
            }).then(() => {
                if(this.shareProduct){
                    this.$store.dispatch({
                        type: 'ACTION_DELETE_QUOTE_TOPIC',
                        targetSkillId: skillId
                    })
                }else {
                    this.$store.dispatch({
                        type: 'ACTION_DELETE_TOPIC',
                        targetTopicId: topicId
                    })
                }
            })
        },

        shareTopic(){
            this.$store.dispatch({
                type: 'OPEN_DIALOG',
                name: 'KNOWLEDGE_SHARE_DIALOG',
                param: {
                    skillId : this.skillId, 
                    topicName : this.topicName, 
                    knowledgeLibrary : true, 
                    storeProduct : null,
                }
            })
        },

        moveTopic (topicId) {
            this.hideMoreMenu()
            let depth = calcTreeDepth(this.children);
            this.$store.dispatch({
                type: 'OPEN_DIALOG',
                name: 'TOPIC_MOVE_DIALOG',
                param: {
                    sourceTopic: {
                        topicName: this.topicName,
                        topicId: this.topicId,
                        skillId: this.skillId,
                        level: this.level,
                        depth: depth,
                    }
                }
            })
        }
    }
}


    
</script>

<style lang="stylus">


.panel-topic
    display none
    position absolute
    top 8px
    right 2px
    height 32px
    background-color #FFFFFF
    box-shadow 0px 0px 9px rgba(146,146,147,0.33)

    .panel-btn
        float left
        width 32px
        height 32px
        line-height 32px
        text-align center

        .icon
            display inline-block            
            vertical-align middle

    .panel-btn:active,
    .panel-btn:hover
        background #CFD4E3
    
    .more
        position relative
        z-index 1
        .more-menu
            position absolute
            top 40px
            right 1px
            padding 6px
            background-color #FFFFFF
            box-shadow 0px 0px 9px rgba(146,146,147,0.33)
            
            
        .more-menu:before
            content: ''
            width 8px
            height 8px
            border: 4px solid transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
            box-shadow -1px -1px 0px rgba(146,146,147,0.33)
            background-color #FFFFFF
            position absolute
            top -6px
            right 10px           
            transform translateY(2px) rotate(45deg)
            
            

.panel-topic:hover
    display block

</style>
