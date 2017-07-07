/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 */

// Note: This automatic widget to dialog window binding (the fact that every field is set up from the widget
// and is committed to the widget) is only possible when the dialog is opened by the Widgets System
// (i.e. the widgetDef.dialog property is set).
// When you are opening the dialog window by yourself, you need to take care of this by yourself too.

CKEDITOR.dialog.add( 'dlgDanhdauVitri', function( editor ) {
	return {
		title: 'Edit Simple Box',
		minWidth: 200,
		minHeight: 100,
		contents: [
			{
				id: 'info',
				elements: [
					{
						id: 'vitri',
						type: 'text',
						label: 'Vi tri',
						width: '50px',
						setup: function( widget ) {
							this.setValue( widget.data.vitri );
						},
						commit: function( widget ) {
							widget.setData( 'vitri', this.getValue() );
						}
					}
				]
			}
		]
	};
} );