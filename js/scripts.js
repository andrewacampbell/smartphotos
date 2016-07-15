/**
 * take an array an convert it values into a rgb value
 * @param  array
 * @return RGB
 */
function arrayToRGB(array){
  return "rbg(" + array[0] + ", "array[1]+ ", "array[2] + ")";
}
/**
 * take an array an parse it for an RGBA value
 * @param   array
 * @param   alpha
 * @return RGBA
 */
function arrayToRGBA(array, alpha){
  return "rgba(" + array[0] + ", " + array[1] + ", " + array[2] + ", "alpha +")";
}

function processImages() {
  var targetIamges = $(".gallery-item img"),
      colorThief = new ColorThief(),
      dominantColor, colorPalette;

      targetIamges.each( function( index ){
        var $this = $( this ),
            mainOverlay = $this.siblings(".main-overlay"),
            secondaryOverlay = $this.siblings(".secondary-overlay");

            dominantColor = colorThief.getColor(targetIamges[index]);



      });
}

/**
 * function that animate primary and secondary overlay on mouseenter
 * and mouseleave
 * @param  none
 * @return none
 */
$(function(){

  processImages();
  $(".gallery-item").mouseenter( function(){

    $( this ).children(".main-overlay").animate({"left":"0"}, 500, function() {

      $( this ).siblings(".secondary-overlay").animate({"left": "65%"},500);

    });
  }).mouseleave( function(){
    $( this ).children(".main-overlay").animate({"left":"-65%"}, 500, function() {

      $( this ).siblings(".secondary-overlay").animate({"left": "100%"},500);
    });
  });
});
