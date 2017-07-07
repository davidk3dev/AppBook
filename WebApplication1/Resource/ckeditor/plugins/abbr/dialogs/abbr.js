/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * The abbr plugin dialog window definition.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Our dialog definition.
CKEDITOR.dialog.add( 'abbrDialog', function( editor ) {
    //Get selected text
    var mySelection ;//= editor.getSelection().getSelectedText();

	return {

		// Basic properties of the dialog window: title, minimum size.
		title: 'Chức năng chú thích đoạn văn',
		minWidth: 400,
		minHeight: "100%",

		// Dialog window content definition.
		contents: [
			{
				// Definition of the Basic Settings dialog tab (page).
				id: 'tab-basic',
				label: 'Nội dung chú thích',

				// The tab content.
				elements: [
                    {
                        id: 'tucanchuthich',
                        type: 'html',
                        html: '<div id="tu-can-chu-thich"><div class="tu-can-chu-thich-title">Từ cần chú thích</div><div class="tu-can-chu-thich-text">'+mySelection+'</div></div></div>'
                    },
					{
                        type: 'textarea',
                        id: 'message',
                        label: 'Nội dung chú thích',
                        'default': 'default text',
                        validate: function() {
                            if ( this.getValue().length < 5 ) {
                                api.openMsgDialog( 'The comment is too short.' );
                                return false;
                            }
                        }
					}
				]
			}
		],

		// This method is invoked once a user clicks the OK button, confirming the dialog.
		onOk: function() {

			// The context of this function is the dialog object itself.
			// http://docs.ckeditor.com/#!/api/CKEDITOR.dialog
			var dialog = this;

			// Create a new <abbr> element.
			var abbr = editor.document.createElement( 'abbr' );

			// Set element attribute and text by getting the defined field values.
			abbr.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'message' ) );
			// abbr.setText( dialog.getValueOf( 'tab-basic', 'abbr' ) );
            abbr.setText( mySelection );

			// Now get yet another field value from the Advanced Settings tab.
			// var id = dialog.getValueOf( 'tab-adv', 'id' );
			// if ( id )
			// 	abbr.setAttribute( 'id', id );

			// Finally, insert the element into the editor at the caret position.
			editor.insertElement( abbr );
		},
        onShow:function () {
            //this.getContentElement('tab-basic','tucanchuthich').html = '<p>Blah Blah Blah</p>';
			//console.log(this.getContentElement('tab-basic','tucanchuthich').html);
            //this.getContentElement('tab-basic','tucanchuthich').html = "cong trinh dang thi cong";
            //console.log(this.getContentElement('tab-basic','tucanchuthich').html);

            var selectedText = editor.getSelection().getSelectedText();
            mySelection = selectedText;
            var document = this.getElement().getDocument();
            var element = document.getById('tu-can-chu-thich');
            if (element) {
                element.setHtml('<div id="tu-can-chu-thich"><div class="tu-can-chu-thich-title">Từ cần chú thích</div><div class="tu-can-chu-thich-text">'+selectedText+'</div></div></div>');
            }
        }
	};
});
