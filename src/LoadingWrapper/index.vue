<template lang="pug">
.wrapper
    slot
    .loading(v-if="loading")
        img.loading-spinner(
            src="./loading_spinner.gif"
        )
    
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false,
        }
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrapper
    position relative
    z-index 1

    .loading
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        z-index 2
        background white

        .loading-spinner
            position absolute
            left 50%
            top 50%
            transform translateX(-50%) translateY(-50%)
            width 50px
            height 50px

</style>
