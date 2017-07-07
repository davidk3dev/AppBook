/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * Simple CKEditor Widget (Part 2).
 *
 * Created out of the CKEditor Widget SDK:
 * http://docs.ckeditor.com/#!/guide/widget_sdk_tutorial_2
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'ex_highlight', {
	// This plugin requires the Widgets System defined in the 'widget' plugin.
	requires: 'widget',

	// Register the icon used for the toolbar button. It must be the same
	// as the name of the widget.
	icons: 'ex_highlight',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		// Register the editing dialog.
		CKEDITOR.dialog.add( 'dlgHighlight', this.path + 'dialogs/dlgHighlight.js' );

		// Register the simplebox widget.
		editor.widgets.add( 'ex_highlight', {
			// Allow all HTML elements, classes, and styles that this widget requires.
			// Read more about the Advanced Content Filter here:
			// * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
			// * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
			// allowedContent:'span(wgnote);span(wgnote-display-text);span(wgnote-content);span(wgnote-info);i(fa fa-info-circle);'+
			// 	'span(wgnote-close-button)',
            //allowedContent:'span(wgnote,wgnote-display-text,wgnote-content,wgnote-info,wgnote-close-button);i(fa)',
            allowedContent:'span(ckwg,wghighlight,ckwg-display-text,ckwg-content,ckwg-info,icon,ckwg-close-button);span[value]',

			// Minimum HTML which is required by this widget to work.
			requiredContent: 'span(wghighlight)',

			// Define the template of a new Simple Box widget.
			// The template will be used when creating new instances of the Simple Box widget.
			template:
				'<span id="" class="ckwg wghighlight">' +
					'<span class="ckwg-display-text"></span>' +
                	'<span class="ckwg-content"></span>' +
					'<span value="" class="ckwg-info"><span class="icon"></span></span>' +
                	'<span class="ckwg-close-button">x</span>' +
                '</span>',



			// Define the label for a widget toolbar button which will be automatically
			// created by the Widgets System. This button will insert a new widget instance
			// created from the template defined above, or will edit selected widget
			// (see second part of this tutorial to learn about editing widgets).
			//
			// Note: In order to be able to translate your widget you should use the
			// editor.lang.simplebox.* property. A string was used directly here to simplify this tutorial.
			//button: 'Create a simple box',

			// Set the widget dialog window name. This enables the automatic widget-dialog binding.
			// This dialog window will be opened when creating a new widget or editing an existing one.
			dialog: 'dlgHighlight',

			// Check the elements that need to be converted to widgets.
			//
			// Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
			// so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
			// during data processing which is done on DOM represented by JavaScript objects.
			upcast: function( element ) {
				// Return "true" (that element needs to converted to a Simple Box widget)
				// for all <div> elements with a "simplebox" class.
				return element.name == 'span' && element.hasClass( 'wghighlight' );
			},

			// When a widget is being initialized, we need to read the data ("align" and "width")
			// from DOM and set it by using the widget.setData() method.
			// More code which needs to be executed when DOM is available may go here.
			init: function() {
				var that = this;
                var selectedText = '';
                var elementDisplayText = this.element.findOne( '.ckwg-display-text' );
                var elementContent = this.element.findOne( '.ckwg-content' );
                this.data.listQuestions = [];

                if(this.element.getAttribute('id')){
                    this.data.wgid = this.element.getAttribute('id');
                }
                else {
                    this.data.wgid = genGuid();
                }

                if(elementDisplayText.getHtml()){
                    selectedText = elementDisplayText.getHtml();
                }
                else{
                    selectedText = editor.getSelection().getSelectedText();
                }
				if(elementContent.getValue()){
                	this.data.noidunghighlight = elementContent.getValue();
				}
				this.element.setAttribute('id', this.data.wgid);
                if(!selectedText){
                	alert('Chon text can chu thich truoc.');
                    //this.wrapper.remove();
                	this.destroy();
                	return;
				}
				this.data.tucanhighlight = selectedText;
                elementDisplayText.setText(selectedText);

                //Load question
				var elePhanDanhSachCauHoi = $(editor.element.$).closest('.box-content-editing').first()
					.find('.phandanhsachcauhoi > .box.cauhoi');

				if(elePhanDanhSachCauHoi.length < 1){
                    alert('Không có câu hỏi');
                    this.destroy();
                    return;
				}
                elePhanDanhSachCauHoi.each(function (idx, ele) {
					var stt = $(ele).taocauhoi('option', 'stt');
					that.data.listQuestions.push(stt);
                    //console.log(that.data.listQuestions);
                });

                var closeElement = this.element.findOne( '.ckwg-close-button' );
                if(closeElement){
                    closeElement.on( 'click', function( event ) {
                        //destroys the dom of the widget
                        that.wrapper.remove();
                        //destroys widget from memory
                        //CKEDITOR.instances.editor1.widgets.destroy(that, true);
                        editor.insertText(selectedText);
						that.destroy();
                    });
				}


			},

			// Listen on the widget#data event which is fired every time the widget data changes
			// and updates the widget's view.
			// Data may be changed by using the widget.setData() method, which we use in the
			// Simple Box dialog window.
			data: function() {
                var elementContent = this.element.findOne( '.ckwg-content' );
                var elementInfo = this.element.findOne( '.ckwg-info' );
                var elementIcon = this.element.findOne( '.icon' );
                if(this.data.noidunghighlight && elementContent){
                    elementContent.setText(this.data.noidunghighlight);
				}
                if(this.data.question && elementInfo){
                    elementInfo.setAttribute('value', this.data.question);
                }
                if(this.data.question && elementIcon){
                    elementIcon.setText('{'+this.data.question+'}');
                }

                //Xu ly phan chu thich cua cau hoi
                if(this.data.question){
                    var elePhanDanhSachCauHoi = $(editor.element.$).closest('.box-content-editing').first()
                        .find('.phandanhsachcauhoi > .box.cauhoi');
                    var eleCauHoi = elePhanDanhSachCauHoi[this.data.question];
                    console.log(eleCauHoi);
                }

                var elePhanChuThichContainer = $(editor.element.$).closest('.box-content-editing').first()
                    .find('.phandanhsachcauhoi > .box.cauhoi');
                //phannoidunghighlight
			}
		} );
        editor.ui.addButton( 'ex_highlight', {
            label: 'Highlight',
            command: 'ex_highlight',
            toolbar: 'newgroup,2'
        })
	}
} );
