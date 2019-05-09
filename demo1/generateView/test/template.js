// template.js
let user = [{
	name: 'mcc'
},{
	name: 'scc'
}]
module.exports = {
	vueTemplate: compoenntName => {
		return `<template>
<table>
  ${user.map(addr => `
    <tr><td data-name="${addr.name}">${addr.name}</td></tr>
  `).join('')}
</table>
</template>

<script>
	export default {
		name: 'table'
	};
</script>
