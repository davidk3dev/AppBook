/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 */

// Note: This automatic widget to dialog window binding (the fact that every field is set up from the widget
// and is committed to the widget) is only possible when the dialog is opened by the Widgets System
// (i.e. the widgetDef.dialog property is set).
// When you are opening the dialog window by yourself, you need to take care of this by yourself too.

CKEDITOR.dialog.add( 'dlgHighlight', function( editor ) {
    var dialog;
    var selectedQuestion;
	return {
		title: 'Widget High Light',
		minWidth: 200,
		minHeight: 100,
		contents: [
			{
				id: 'info',
				elements: [
                    {
                        id: 'tucan_highlight',
                        type: 'html',
                        html: '<div id="tu-can-high-light"><div class="tu-can-high-light-text">dgdfgd</div></div>',
                        setup: function( widget ) {

                            var document = dialog.getElement().getDocument();
                            var element = document.getById('tu-can-high-light');
                            if (element) {
                                element.setHtml('<div id="tu-can-high-light"><div class="tu-can-high-light-text">'+widget.data.tucanhighlight+'</div></div>');
                            }
                        }
                    },
                    {
                        type: 'select',
                        id: 'question',
                        label: 'Highlight cho câu hỏi',
                        items: [],
                        //'default': 'Football',
                        setup:function(widget){
                            var self = this;
                            this.clear();
                            widget.data.listQuestions.forEach(function (item, index) {
                                self.add('Cau hoi: ' + item, item);
                            })
                        },
                        // onChange: function( api ) {
                        //     console.log(this.getValue());
                        //     selectedQuestion = this.getValue();
                        // },
                        commit:function (widget) {
                            //widget.data.question = selectedQuestion;
                            widget.data.question = this.getValue();
                        }
                    },
                    {
                        type: 'textarea',
                        id: 'noidung_highlight',
                        label: 'Nội dung highlight',
                        //'default': 'default text',
                        validate: function() {
                            if ( this.getValue().length < 5 ) {
                                //api.openMsgDialog( 'Noi dung qua ngan.' );
                                return false;
                            }
                        },
						setup: function(widget){
                            this.setValue( widget.data.noidunghighlight );
						},
                        commit: function( widget ) {
                            widget.setData( 'noidunghighlight', this.getValue() );
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
        }
	};
} );