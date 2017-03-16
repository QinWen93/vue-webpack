<script>
	export default {
		el: '#app',
		data () {
			return {
				name: "qinwen",
				career: "programmer"
			}
		}
	}
</script>

<template>
	<div>
		<h1>姓名：{{ name }}</h1>
		<h2>职业：{{ career }}</h2>
	</div>
</template>

<style lang="sass">
	$color: #098;
	body {
		background: $color;
		h1 {
			margin: 0;
			background: #eee;
			color: red;
			transform: translate(10%, 10%);
			&:hover {
				height: 100px;
			}
		}
		h2 {
			margin: 0;
			background: #999;
		}
	}
</style>