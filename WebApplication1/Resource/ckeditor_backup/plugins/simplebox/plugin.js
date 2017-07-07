CKEDITOR.plugins.add( 'simplebox', {
	// This plugin requires the Widgets System defined in the 'widget' plugin.
	requires: 'widget',

	// Register the icon used for the toolbar button. It must be the same
	// as the name of the widget.
	icons: 'simplebox',

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		// Register the editing dialog.
		CKEDITOR.dialog.add( 'simplebox', this.path + 'dialogs/simplebox.js' );

		// Register the simplebox widget.
		editor.widgets.add( 'simplebox', {
			requiredContent: 'span(simplebox)',

			template:
				'<span class="simplebox" questionid="">' +
					'<span class="simplebox-title">Vi Tri </span>' +
					' <span class="simplebox-content"></span>' +
					' <span class="simplebox-close">x</span>' +
				'</span>',


			button: 'Highlight/Note',
			dialog: 'simplebox',

			upcast: function( element ) {
				return element.name == 'span' && element.hasClass( 'simplebox' );
			},

			init: function() {
                var selectedText = editor.getSelection().getSelectedText();
                this.data.title = selectedText;
                this.element.findOne( '.simplebox-title' ).setText(selectedText);;
			},
			data: function() {

                var eTitle = this.element.findOne('.simplebox-title');
                var eContent = this.element.findOne('.simplebox-content');
                if(this.data.title && this.data.content){

                    eTitle.setText(this.data.title);
                    eContent.setText(this.data.content);

                }

                var that = this;
				var closeElement = this.element.findOne( '.simplebox-close' );
				if(closeElement)
					closeElement.on( 'click', function( event ) {
						 //destroys the dom of the widget
					    that.wrapper.remove();
					    //destroys widget from memory
					    CKEDITOR.instances.editor1.widgets.destroy(that, true);
						
					} );
			}
		} );
	}
} );
