<header>Templates</header>
<section>
	{{#each pages}}
		{{> templatePage}}
	{{/each}}

	<div class="page add">
		<div class="controls">
			<span class="add"></span>
		</div>
		<input type="text" value="Add New Page" disabled="disabled"  maxlength="15">
	</div>
</section>
