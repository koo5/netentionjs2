function newTagSliders(self, tags, result, onChanged) {
        
    var x = $('<div></div>');
    for (var k = 0; k < tags.length; k++) {
        (function() {
            var t = tags[k];
            var tt = self.getTag(t);
            var name = t;
            if (tt) {
                name = tt.name;
            }
            var st = $('<div></div>').addClass('tagSlider');
            st.slider({ 
                min: 0, max: 1.0, step: 0.25, value: 0,
                slide: function (event, ui) {
                    var v = ui.value;
                    if (v == 0)
                        delete result[t];
                    else
                        result[t] = v;
                    
                    onChanged(result);
                }
            });
            $('<div>' + name + '</div>').addClass('tagSliderLabel').appendTo(x);
            st.appendTo(x);
        })();
    }    
    x.append('<div style="clear:both;"></div>');
    x.result = result;
    
    return x;
}

function setFocusWithTagSliderResult(result) {
    var f = {
        uri: uuid(),
        tag: [ ],
        tagStrength: [ ]
    };
    
    for (var rt in result) {
        var kt = result[rt];
        f.tag.push(rt);
        f.tagStrength.push(kt);
    }
    
    window.self.set('focus', f);
    
}

var EmotionFocus = {
    
    start: function(self, target) {
        $('#EmotionFocus').html('');
        $('#EmotionFocus').append('<img style="width: 100%" src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Plutchik-wheel.svg"/>');
    
        var t = { };
        $('#EmotionFocus').append(newTagSliders(
            self,
            [ 'emotion.calm', 'emotion.happy', 'emotion.sad', 'emotion.trusting', 'emotion.anticipating', 
            'emotion.surprised', 'emotion.afraid', 'emotion.angry', 'emotion.disgusted', 'emotion.tired', 'emotion.energized' ],
        t, setFocusWithTagSliderResult));
        
        $('#EmotionFocus').show();    
    },
    
    stop: function(target) {
        $('#EmotionFocus').hide();
    },
        
    set: function(x) {
            
    },
    
    clear: function() {
    
    },
    
    get : function() {
        return { };        
    }
    
};
