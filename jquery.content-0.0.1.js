
(function($){
	
	var contentManager = {
			elements : {},
			
			push : function(delement, size, content) {
				var el = {element : delement, size: size, content : content};
				if(typeof this.elements[size] === 'undefined') {
					this.elements[size] = [];
				}
				this.elements[size].push(el);
				if(typeof this.sizes)
				return this;
			},
			
			update : function() {
				var sizes = [];
				for(key in this.elements) {
					if(typeof this.elements[key] === 'object') {
						sizes.push(key);
					}
				}
				this.findElements(sizes);
			},
			
			findElements : function(sizes) {
				sizes = sizes.reverse();
				var found = false;
				for(var size = 0; size < sizes.length; size++) {	
					if(document.documentElement.clientWidth > parseInt(sizes[size])) {
						if(found) {
							continue;
						}
						found = true;
						for(var j = 0; j < this.elements[sizes[size]].length; j++) {
							
							this.elements[sizes[size]][j].element.html(this.elements[sizes[size]][j].content);
						}
					} else {
						for(var k = 0; k < this.elements[sizes[size]].length; k++) {
							this.elements[sizes[size]][k].element.html('');
							
						}
					}
					
				}
			}
				
	};
	
	$.fn.extend({
		content : function(options) {

			var me = this;
			
			contentManager.push(this, options.size, options.html);
			contentManager.update();
			
		
			$(window).resize(function(){
				contentManager.update();
			});
			return this;
		}
		
	});
	
})(jQuery);