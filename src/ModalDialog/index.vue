<template lang="pug">
	transition(name="fade")
		.mask(v-if="show")
			.dialog-wrapper(
				:style="{width: width, height: height}"
			)
				.close.ba-icon-dialog-close.pointer(
					@click="close"
				)
				slot
</template>

<script >
export default{
    name: "index",
	props:{
		show:{
			type:Boolean,
			required: true,
			default:false,
		},
		width:{
			type:String,
			default: '50%',
		},
		height: {
			type: String,
			default: 'auto'
		}
	},
	data(){
		return {

		}
	},
	methods: {
		close () {
			this.$emit('close')
		}
	}
}
</script>

<style lang='scss' scoped>

.mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100% !important;
	height: 100% !important;
	z-index: 100;
	background: rgba(0,0,0,0.5);

	.dialog-wrapper {
		position:absolute;
		left:50%;
		top:50%;
		transform:translateX(-50%) translateY(-50%);
		z-index:101;
		padding:15px;
		min-width: 280px;
		background:#fff;
		border-radius:2px;
		box-shadow:7px 7px 10px rgba(110,110,110,0.2);
		
		.close {
			position: absolute;
			top: 0;
			right: -38px;
		}
	}
}


.fade-enter-active, .fade-leave-active {
	transition: opacity .3s
}
.fade-enter, .fade-leave-to {
	opacity: 0
}
</style>
