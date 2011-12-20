(function($){
	var contentManager = {		
			elements : [],
			
			/**
			 * This is slightly horrible, ideally this should just use the selector used
			 * in the query as an identificator but I can't seem to get access to it, an alternative
			 * would be to generate a hash of the object
			 * 
			 * Example of how this would be best implemented:
			 * 
			 * var hash_map = {};
			 * hash_map[jQuery.selector()].data('sizes' '768', content);
			 * 
			 */
			push : function(delement, size, content) {
				var sizes = delement.data('sizes');
				if(typeof sizes === 'undefined') {
					 sizes = {};
				}
				
				sizes[size.toString()] = content;
				
				if(typeof sizes.minWidth === 'undefined') {
					sizes.minWidth = 0;
				}
				
				$.each(sizes, function(key, value){
					if(sizes.minWidth === 0) {
						sizes.minWidth = parseInt(key);
					}
					if(sizes.minWidth > parseInt(key)) {
						sizes.minWidth = parseInt(key);
					}
				});
				
				delement.data('sizes', sizes);
				this.elements.push(delement);
				
				//trim down the array so it only keeps one reference pr DOM element
				this.elements = jQuery.unique(this.elements);
				return this;
			},
			
			update : function() {
				
				var max, currentWindowSize;
				
				currentWindowSize = document.documentElement.clientWidth;
				$.each(this.elements, function(key, element){
					widths = element.data('sizes');
					
					if(currentWindowSize < widths.minWidth) {
						element.html('');
						
					} else {
						max = 0;
						for(key in widths) {	
							if(key !== 'minWidth') {
								if(parseInt(key) <= currentWindowSize) {
									max = parseInt(key);
								}
							}
						}
						if(max !== 0) {
							element.html(widths[max.toString()]);
						}
					}
					
				});
				return this;
			}

	};
	
	$.fn.extend({
		content : function(options) {
			contentManager.push(this, options.size, options.html);
			contentManager.update();
			
		
			$(window).resize(function(){
				contentManager.update();
			});
			return this;
		}
		
	});
	
})(jQuery);