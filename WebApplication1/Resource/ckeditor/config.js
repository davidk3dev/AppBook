/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

 CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.extraPlugins = "ex_danhdau_vitri,ex_note,ex_highlight,ckeditor_wiris";
	//config.extraPlugins += (config.extraPlugins.length == 0 ? '' : ',') + 'ckeditor_wiris';
	config.toolbarGroups = [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        //{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        //{ name: 'forms', groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        //{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        // { name: 'links', groups: [ 'links' ] },
        // { name: 'styles', groups: [ 'styles' ] },
        // { name: 'colors', groups: [ 'colors' ] },
        // { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        // { name: 'about', groups: [ 'about' ] },
        //{ name: 'insert', groups: [ 'insert' ] },
        { name: 'newgroup', groups: [ 'newgroup' ] }
    ];

    config.removeButtons = 'Superscript,Subscript';
	//config.toolbar_Full.push({name:'wiris', items:['ckeditor_wiris_formulaEditor', 'ckeditor_wiris_formulaEditorChemistry']});
	//config.allowedContent = true;
	//config.height = '250px';
};
