/*
 * Jquery Extension
 */

/* File[image] Handler */
(function($, doc){
    /* private function */
    var _show = function(e){
	var files = this.files;
        for(var i = 0; i < files.length; i++){
            if( _isImage(files[i]) ){                
                _loadImageFile(files[i], function(dataURL){
                    _appendImage(dataURL);
                });                
            }
        }
    };

    var _loadImageFile = function(file ,callback){
	var reader = new FileReader();
        reader.onload = function(){
	    callback(this.result);
        };
        reader.readAsDataURL(file);
    };
 
    var _appendImage = function(dataURL){
	var config = $.fn.handleImageSelect.config;
	var img = '<img class="handle-image" />';
	config.elem.html(img);
	var imgElem = config.elem.find('.handle-image');
	imgElem.attr('src', dataURL);
	imgElem.width(config.width);
    };

    var _isImage = function(file){
	return file.type.match("image.*")? true : false;
    };

    $.fn.handleImageSelect = function(option){
	if(!option){
	    $(this).after('<div id="image_field"></div>');
	    var elem = $('#image_field');
	    option = {elem: elem};
	}
	$.extend($.fn.handleImageSelect.config, option);
	$(this).bind('change' , _show);
    };

    /* Setting */
    $.fn.handleImageSelect.config = {
	width: '150',
	elem: {}
    };
})(jQuery , document);
