/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 */

// Note: This automatic widget to dialog window binding (the fact that every field is set up from the widget
// and is committed to the widget) is only possible when the dialog is opened by the Widgets System
// (i.e. the widgetDef.dialog property is set).
// When you are opening the dialog window by yourself, you need to take care of this by yourself too.

CKEDITOR.dialog.add( 'dlgNote', function( editor ) {
    var dialog;
	return {
		title: 'Widget Note',
		minWidth: 200,
		minHeight: 100,
		contents: [
			{
				id: 'info',
				elements: [
                    {
                        id: 'tucanchuthich',
                        type: 'html',
                        html: '<div id="tu-can-chu-thich"><div class="tu-can-chu-thich-text">dgdfgd</div></div>',
                        setup: function( widget ) {
                            // console.log(this);
                            // this.setValue('<div id="tu-can-chu-thich"><div class="tu-can-chu-thich-text">'+widget.data.tucanchuthich+'</div></div>');
                            var document = dialog.getElement().getDocument();
                            var element = document.getById('tu-can-chu-thich');
                            if (element) {
                                element.setHtml('<div id="tu-can-chu-thich"><div class="tu-can-chu-thich-text">'+widget.data.tucanchuthich+'</div></div>');
                            }
                        }
                    },
                    {
                        type: 'textarea',
                        id: 'message',
                        label: 'Nội dung chú thích',
                        //'default': 'default text',
                        validate: function() {
                            if ( this.getValue().length < 5 ) {
                                //api.openMsgDialog( 'Chu thich qua ngan.' );
                                return false;
                            }
                        },
						setup: function(widget){
                            this.setValue( widget.data.noidungchuthich );
						},
                        commit: function( widget ) {
                            widget.setData( 'noidungchuthich', this.getValue() );
                        }
                    }
				]
			}
		],
        onShow:function () {
			dialog = this;
            //this.getContentElement('tab-basic','tucanchuthich').html = '<p>Blah Blah Blah</p>';
            //console.log(this.getContentElement('tab-basic','tucanchuthich').html);
            //this.getContentElement('tab-basic','tucanchuthich').html = "cong trinh dang thi cong";
            //console.log(this.getContentElement('tab-basic','tucanchuthich').html);

            // var selectedText = editor.getSelection().getSelectedText();
            // //mySelection = selectedText;
            // var document = this.getElement().getDocument();
            // var element = document.getById('tu-can-chu-thich');
            // if (element) {
            //     element.setHtml('<div id="tu-can-chu-thich"><div class="tu-can-chu-thich-text">'+selectedText+'</div></div>');
            // }
        },
        onOk:function(){
            console.log(editor.element.$);
        }
	};
} );