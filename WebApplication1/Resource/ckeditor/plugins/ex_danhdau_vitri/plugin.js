CKEDITOR.plugins.add( 'ex_danhdau_vitri', {
	requires: 'widget',
	icons: 'ex_danhdau_vitri',

	init: function( editor ) {
		CKEDITOR.dialog.add( 'dlgDanhdauVitri', this.path + 'dialogs/dlgDanhdauVitri.js' );

		editor.widgets.add( 'ex_danhdau_vitri', {
			allowedContent:'span(ckwg,wgdanhdauvitri,wgdanhdauvitri-display-text);span[vitri]',
			requiredContent: 'span(wgdanhdauvitri)',
			template:
				'<span class="ckwg wgdanhdauvitri">' +
					'<span vitri="" class="wgdanhdauvitri-display-text"></span>' +
                '</span>',

			dialog: 'dlgDanhdauVitri',
			upcast: function( element ) {
				return element.name == 'span' && element.hasClass( 'wgdanhdauvitri' );
			},
			init: function() {
                var elementDisplayText = this.element.findOne( '.wgdanhdauvitri-display-text' );
                if(elementDisplayText && elementDisplayText.getAttribute('vitri')){
                    this.data.vitri = elementDisplayText.getAttribute('vitri');
				}
			},
			data: function() {
                var elementDisplayText = this.element.findOne( '.wgdanhdauvitri-display-text' );
                if(this.data.vitri && elementDisplayText){
                	elementDisplayText.setAttribute('vitri', this.data.vitri);
                    elementDisplayText.setText('....('+this.data.vitri+')....');
				}
			}
		});
        editor.ui.addButton( 'ex_danhdau_vitri', {
            label: 'Thêm đánh dấu vị trí',
            command: 'ex_danhdau_vitri',
            toolbar: 'newgroup,0'
        })
	}
} );
