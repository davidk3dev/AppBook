CKEDITOR.editorConfig = function( config )
{
    // Add WIRIS to the plugin list
    config.extraPlugins += (config.extraPlugins.length == 0 ? '' : ',') + 'ckeditor_wiris';
	config.toolbar_Full.push({name:'wiris', items:['ckeditor_wiris_formulaEditor', 'ckeditor_wiris_formulaEditorChemistry']});
	config.allowedContent = true;
	config.height = '250px';
};