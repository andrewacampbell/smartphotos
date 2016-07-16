/**
 * take an array an convert it values into a rgb value
 * @param  array
 * @return RGB
 */
function arrayToRGB(array){
  return "rgb(" + array[0] + ", " + array[1] + ", " + array[2] + ")";
}

/**
 * take an array an parse it for an RGBA value
 * @param   array
 * @param   alpha
 * @return RGBA
 */
function arrayToRGBA(array, alpha){
  return "rgba(" + array[0] + ", " + array[1] + ", " + array[2] + ", "+ alpha +")";
}

/**
 * Take and rgb comma delimted string and turn it into a array
 * @param take an rgb color string
 * @return an array
 */
function rgbToArray(rgb) {
  return rgb.replace(/[^\d,]/g, '').split(',');
}

/**
 * calculateSRGB value from val receive
 * @param  {[type]} val [color value]
 * @return {[type]}     [srgb value]
 */
function calculateSRGB(val){
  val /=255;
  return (val <= 0.03928) ? val / 12.92 : Math.pow(((val + 0.055) / 1.55), 2.4);
}

/**
 * calculate luminance of given srgb color
 * @param  {[type]} color [srgb color]
 * @return {[type]}       [luminance of sRGB color]
 */
function calculateLuminance(color){
  return (calculateSRGB(color[0] ) * 0.2126) + (calculateSRGB(color[1] ) * 0.7152 ) + (calculateSRGB(color[2] ) * 0.0722 );
}

function calColorRatio(color1, color2) {
  var lum1 = calculateLuminance(color1),
      lum2 = calculateLuminance(color2);

      return Math.round(((lum1 +0.05) / (lum2 + 0.05)) *100 ) /100;
}

function processImages() {
  var targetIamges = $(".gallery-item img"),
      colorThief = new ColorThief(),
      ratios = [],
      colors = [],
      dominantColor, colorPalette,
      textColor, contrastRatio;

      targetIamges.each( function( index ){
        var $this = $( this ),
            mainOverlay = $this.siblings(".main-overlay"),
            secondaryOverlay = $this.siblings(".secondary-overlay");

            dominantColor = colorThief.getColor(targetIamges[index]);

            //Set dominate color for overlay
            secondaryOverlay.children(".dominant-color").css("background-color", arrayToRGB(dominantColor));
            //mainOverlay.css("background-color", arrayToRGBA(dominantColor, .8));

            // create color palette base on images
            colorPalette = colorThief.getPalette(targetIamges[index], 6);

            // get text color to compare
            textColor = mainOverlay.find(".overlay-content h1").css("color");


            $.each(colorPalette, function(index){
              $("<li>").appendTo(secondaryOverlay.children(".color-palette")).css("background-color", arrayToRGB($(this)));

              contrastRatio = calColorRatio(rgbToArray(textColor), $(this));

              ratios[index] = (contrastRatio >= 7) ? contrastRatio : 1000;
              colors[index] = $(this);

            });
            //calculate best constrast color base on text color and dominant color of pic
            contrastRatio = calColorRatio(rgbToArray(textColor), dominantColor);

            dominantColor = (contrastRatio >= 7 ) ? dominantColor : colors[ratios.indexOf(Math.min.apply(Math, ratios))];
            mainOverlay.css("background-color", arrayToRGBA(dominantColor, .8));
      });
}

/**
 * function that animate primary and secondary overlay on mouseenter
 * and mouseleave
 * @param  none
 * @return none
 */
$(function(){

  $("body").imagesLoaded().done(function(instance){
      processImages();
  });
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
