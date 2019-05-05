// template.js
let user = [{
	name: 'mcc'
},{
	name: 'scc'
}]
module.exports = {
	vueTemplate: compoenntName => {
		return `<template>
	<div class="${compoenntName}">
		${compoenntName}组件
		${user[0].name}
		
		<ul>
		  <% for(let i=0; i < user.length; i++) { %>
		    <li><%= user[i].name %></li>
		  <% } %>
		</ul>

		<table>
		  ${user.map(addr => `
		    <tr><td data-name="${addr.name}">${addr.name}</td></tr>
		  `).join('')}
		</table>
	</div>
</template>

<script>
	export default {
		name: '${compoenntName}'
	};
</script>

<style lang="stylus" scoped>
	.${compoenntName} {};
</style>`
    },
	entryTemplate: compoenntName => {
		return `import ${compoenntName} from './main.vue'
export default [{
	path: "/${compoenntName}",
	name: "${compoenntName}",
	component: ${compoenntName}
}]`
	}
}
