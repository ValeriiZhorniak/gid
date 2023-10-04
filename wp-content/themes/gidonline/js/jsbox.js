jQuery(document).ready(function($){

        jQuery("select#actors-dropdown").change(function(){
                window.location.href = jQuery(this).val();
        });
        jQuery("select#director-dropdown").change(function(){
                window.location.href = jQuery(this).val();
        });
        jQuery("select#country-dropdown").change(function(){
                window.location.href = jQuery(this).val();
        });
        jQuery("select#year-dropdown").change(function(){
        window.location.href = jQuery(this).val();
        });

});

function preventSelection(element){
  var preventSelection = false;

  function addHandler(element, event, handler){
    if (element.attachEvent) 
      element.attachEvent('on' + event, handler);
    else 
      if (element.addEventListener) 
        element.addEventListener(event, handler, false);
  }
  function removeSelection(){
    if (window.getSelection) { window.getSelection().removeAllRanges(); }
    else if (document.selection && document.selection.clear)
      document.selection.clear();
  }
  function killCtrlA(event){
    var event = event || window.event;
    var sender = event.target || event.srcElement;

    if (sender.tagName.match(/INPUT|TEXTAREA/i))
      return;

    var key = event.keyCode || event.which;
    if (event.ctrlKey && key == 'A'.charCodeAt(0)) 
    {
      removeSelection();

      if (event.preventDefault) 
        event.preventDefault();
      else
        event.returnValue = false;
    }
  }

  addHandler(element, 'mousemove', function(){
    if(preventSelection)
      removeSelection();
  });
  addHandler(element, 'mousedown', function(event){
    var event = event || window.event;
    var sender = event.target || event.srcElement;
    preventSelection = !sender.tagName.match(/INPUT|TEXTAREA/i);
  });


  addHandler(element, 'mouseup', function(){
    if (preventSelection)
      removeSelection();
    preventSelection = false;
  });

  addHandler(element, 'keydown', killCtrlA);
  addHandler(element, 'keyup', killCtrlA);
}
preventSelection(document);

function getElem(id) { return document.getElementById(id); }

Function.prototype.NEW = function() {
	var c = new this();
	c.__init__.apply(c, arguments);
	return c;
}

Function.prototype.bind = function(obj) {
	return callback(obj, this);
}

function callback(obj, f) {
	return function() {
		return f.apply(obj, arguments)
	}
}

SelectFilm = function() {};

SelectFilm.prototype.__init__ = function(){
	this._series = window.MP_SETTINGS.SERIES_LIST;
	
	this._fillSelectSeries();
	this._selectSeries();
}

SelectFilm.prototype._fillSelectSeries = function(){

	var select = getElem('series'), i = 0,j = 0,
		series = this._series, optgroup, option;
	
	select.onchange = this._selectSeries.bind(this);
	var epCount=0;
	for(;i < series.length; i++){
		optgroup = document.createElement('optgroup');
		optgroup.label = 'Сезон '+(i+1);
		select.appendChild(optgroup);
		if(!series[i]) continue;
		for(j = 0;j < series[i].length; j++){
			if(!series[i][j]) continue;
			option = document.createElement('option');
			option.innerHTML = 'Серия ' + (j+1);
			option.value = series[i][j];
			optgroup.appendChild(option);
			epCount++;
		}
	}
	select.options[epCount-1].selected = true;
}

SelectFilm.prototype._selectSeries = function(){
	getElem('ifr').src = getElem('series').value;
}

    function grin(tag) {
    	if (typeof tinyMCE != 'undefined') {
    		grin_tinymcecomments(tag);
    	} else {
    		grin_plain(tag);
    	}
    }
    function grin_tinymcecomments(tag) {
    	tinyMCE.execCommand('mceInsertContent', false, ' ' + tag + ' ');
    }
    
    function grin_plain(tag) {
    	var myField;
    	var myCommentTextarea = "comment";
    	tag = ' ' + tag + ' ';
        if (document.getElementById(myCommentTextarea) && document.getElementById(myCommentTextarea).type == 'textarea') {
    		myField = document.getElementById(myCommentTextarea);
    	} else {
    		return false;
    	}
    	if (document.selection) {
    		myField.focus();
    		sel = document.selection.createRange();
    		sel.text = tag;
    		myField.focus();
    	}
    	else if (myField.selectionStart || myField.selectionStart == '0') {
    		var startPos = myField.selectionStart;
    		var endPos = myField.selectionEnd;
    		var cursorPos = endPos;
    		myField.value = myField.value.substring(0, startPos)
    					  + tag
    					  + myField.value.substring(endPos, myField.value.length);
    		cursorPos += tag.length;
    		myField.focus();
    		myField.selectionStart = cursorPos;
    		myField.selectionEnd = cursorPos;
    	}
    	else {
    		myField.value += tag;
    		myField.focus();
    	}
    }

var loadingsee = [];

function addToSee(userId, filmId, el){
            var hash = userId + ',' + filmId;
            var thisEl = jQuery(el);
            var actn = 'add';
            
            if(thisEl.hasClass('added')){
                actn = 'removed';
            }
            
              if (loadingsee.indexOf(hash) !== -1) return;
  
              loadingsee.push(hash);

              function stopLoading() {
               loadingsee.splice(loadingsee.indexOf(hash));
              }
            
            jQuery.ajax({
                url: addToSeeParth + "/functions/add_to_see.php",
                data: 'userID=' + userId + '&filmID=' + filmId + '&action=' + actn,
                success: function(data){
      var flItem = thisEl.parent('.post');
      
      if(data == 'added') {
        showLinkBm(thisEl, 'add', stopLoading);
      } else if (data == 'removed') {
        if(thisEl.hasClass('favListItem')) {    
          flItem.animate({ opacity: 0 }, 300, function(){ jQuery(this).hide(); });
    }
    showLinkBm(thisEl, 'remove', stopLoading);
   } else if(data == 'empty') {
    flItem.animate({ opacity: 0 }, 300, function(){ jQuery(this).hide().after('<div id="searchno">Ваш список на потом пуст</div>') });
    showLinkBm(thisEl, 'remove', stopLoading);
    }
   }
  });
 }

var loading = [];

function addToFav(userId, filmId, el) {
  var hash = userId + ',' + filmId;
  var thisEl = jQuery(el);
  var actn = 'add';

  if (thisEl.hasClass('added')) {
    actn = 'removed';
  }

  if (loading.indexOf(hash) !== -1) return;
  
  loading.push(hash);

  function stopLoading() {
    loading.splice(loading.indexOf(hash));
  }

  jQuery.ajax({
    url: addToFavParth + "/functions/add_to_favorite.php",
    data: 'userID=' + userId + '&filmID=' + filmId + '&action=' + actn,
    success: function(data) {
      var flItem = thisEl.parent('.post');
      
      if (data == 'added') {
        showLinkBm(thisEl, 'add', stopLoading);
      } else if (data == 'removed') {
        if (thisEl.hasClass('favListItem')) {    
          flItem.animate({ opacity: 0 }, 300, function(){ jQuery(this).hide(); });
        }
        showLinkBm(thisEl, 'remove', stopLoading);
      } else if (data == 'empty') {
        flItem.animate({ opacity: 0 }, 300, function(){ jQuery(this).hide().after('<div id="searchno">В избранном ничего нет</div>') });
        showLinkBm(thisEl, 'remove', stopLoading);
      }
    }
  });

}

function showLinkBm(el, arg, cb) {
  var duration = 300;
  var linkText = jQuery('.' + arg, el);
  var hiddenLink = jQuery('span:hidden', el);

  if (linkText.is(':visible')) {
   linkText.fadeOut(duration, function() {
    if (arg == 'add') {
     el.addClass('added'); 
    } else {
     el.removeClass('added'); 
    }

    hiddenLink.fadeIn(duration)
    cb();
   });
  }
}


function validate_form ( )
{
 valid = true;

        if ( document.contact_form.author.value.length <= 2 )
        {
        alert("Минимум 3 буквы для вашего имени пожалуйста!");
                valid = false;
    
        } 
                if ( document.contact_form.author.value.length >= 20 )
        {
        alert("Слишком длинное имя!");
                valid = false;
     
        }
        
  if ( document.contact_form.comment.value.length <= 9 )
        {
        alert("Так мало букв... Добавьте пару слов в комментарий пожалуйста!");
                valid = false;
        }

        return valid;
}

function validate_form_logged ( )
{
 valid = true;
       
  if ( document.contact_form.comment.value.length <= 9 )
        {
        alert("Так мало букв... Добавьте пару слов в комментарий пожалуйста!");
                valid = false;
        }

        return valid;
}

var ratingsL10n = {
	plugin_url: "/wp-content/plugins/wp-postratings",
	ajax_url: "/wp-content/plugins/wp-postratings/wp-postratings.php",
	text_wait: "Не так быстро!",
	image: "stars_crystal",
	image_ext: "png",
	max: "10",
	show_loading: "1",
	show_fading: "1",
	custom: "0"
};
var ratings_mouseover_image=new Image();ratings_mouseover_image.src=ratingsL10n.plugin_url+"/images/"+ratingsL10n.image+"/rating_over."+ratingsL10n.image_ext;

function textmore(a,b,c,d){var a=jQuery(a),b=b*d,c=c||500,d=d||18;a.css("position","relative");a.wrapInner("<div class='content-wrapper'></div>");a.find(".content-wrapper").css("line-height",d+"px").parent().find("p.more-link").css("line-height",d+"px");var i=a.height(),s="Свернуть",o="Подробнее...";if(i>b){a.append('<p class="more-link"><a class="more">'+o+"</a></p>").find(".content-wrapper").addClass("contracted").height(b).parent().find("p > a.more").click(function(){var a=jQuery(this),d=a.parent().prev(".content-wrapper");if(d.is(".contracted")){d.addClass("locked").animate({height:i+"px"},{duration:c,complete:function(){d.removeClass("contracted").addClass("expanded").removeClass("locked");a.text(s)}})}else{d.addClass("locked").animate({height:b+"px"},{duration:c,complete:function(){d.removeClass("expanded").addClass("contracted").removeClass("locked");a.text(o)}})}})}}