/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 */

// Note: This automatic widget to dialog window binding (the fact that every field is set up from the widget
// and is committed to the widget) is only possible when the dialog is opened by the Widgets System
// (i.e. the widgetDef.dialog property is set).
// When you are opening the dialog window by yourself, you need to take care of this by yourself too.

CKEDITOR.dialog.add( 'simplebox', function( editor ) {
	return {
		title: 'Edit Simple Box',
		minWidth: 400,
		minHeight: 200,
		contents: [
			{
				id: 'info',
				elements: [
					{
                        id: 'tucanchuthich',
                        type: 'html',
                        html: '<div id="tu-can-chu-thich"><div class="tu-can-chu-thich-text"></div></div>',
						setup: function( widget ) {
							var document = this.getDialog().getElement().getDocument();
							var element = document.getById('tu-can-chu-thich');
							if (element) {
								element.setHtml('<div id="tu-can-chu-thich"><div class="tu-can-chu-thich-text">'+widget.data.title+'</div></div>');
							}
						}
                    },
					{
						type: 'select',
						id: 'idcauhoi',
						className: 'ckedtor-dialog-control-dropdownlist',
						label: 'Chọn câu hỏi',
						items: [ ],
						default: 'Cau hoi 1',
						setup: function (widget) {
                             this.clear();
                             var that = this;
                            // this.add('Please Choose', '');
                            // this.add('Option 1', '1');
                            // this.add('Option 2', '2');

                            baidangchon.find('.box.cauhoi div.box-title-text').each(function (i) {
                                that.add($(this).text(), i);
							});
                        },
                        commit: function( widget ) {
                            widget.setData( 'questionid', this.getValue());
                        }
					},
					{
						id: 'noidungchuthich',
						type: 'textarea',
						label: 'Noi dung chu thich',
						// When setting up this field, set its value to the "align" value from widget data.
						// Note: Align values used in the widget need to be the same as those defined in the "items" array above.
						setup: function( widget ) {
							this.setValue( widget.data.content );
						},
						// When committing (saving) this field, set its value to the widget data.
						commit: function( widget ) {							
							widget.setData( 'content', this.getValue());
						}
					}
					
				]
			}
		],
		onShow:function () {
            //this.getContentElement('tab-basic','tucanchuthich').html = '<p>Blah Blah Blah</p>';
			//console.log(this.getContentElement('tab-basic','tucanchuthich').html);
            //this.getContentElement('tab-basic','tucanchuthich').html = "cong trinh dang thi cong";
            //console.log(this.getContentElement('tab-basic','tucanchuthich').html);
			
			

            //var selectedText = editor.getSelection().getSelectedText();
            //mySelection = selectedText;
			//console.log(mySelection);            
        },
        onOk:function(){
        	console.log("sdfsdf");
        }
	};
} );