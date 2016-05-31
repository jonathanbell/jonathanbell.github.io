/**
 * Load our fonts.
 * https://css-tricks.com/loading-web-fonts-with-the-web-font-loader/
 */
WebFontConfig = {
  custom: {
    families: ['content-sans-serif:n4,n3,n7', 'content-serif'],
    urls: ['dist/fonts.css'],
    timeout: 2000
  },
  active: function() {
    sessionStorage.fonts = true;
  }
};

/**
 * Figure out how many years you have been programming and append the text in 
 * the CV with the English word.
 */
var a = ['zero','one','two','three','four', 'five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen', 'twenty'];

function inWords(num) {
  if (num > 20) return a[20];
  return a[num];
}

var yearsProgramming = inWords(Math.floor((Math.floor(Date.now() / 1000) - 1326286860) / 31536000));
document.getElementById('yearsProgramming').innerHTML = ' over ' + yearsProgramming + ' years ';

/**
 * Add unicorns to the page when the user clicks the "Javascript" "link" in the 
 * "Summary" section of the resume.
 */
if (screen.width >= 1024) {

  var unicornButton = document.getElementById('unicornTime');
  unicornButton.addEventListener('click', function() {
    cornify.pizzazz();
    clearUnicorns.style.display = 'block';
  });

  var clearUnicorns = document.createElement('div');
  clearUnicorns.setAttribute('id', 'clearUnicorns');
  clearUnicornsContent = document.createTextNode('Get these unicorns outta here!!');
  clearUnicorns.appendChild(clearUnicornsContent);
  // add the newly created element and its content into the DOM
  var jonathanBell = document.getElementById('jonathanBell'); // main content wrapper
  document.body.insertBefore(clearUnicorns, jonathanBell);

  // get rid of the unicorns onclick
  clearUnicorns.onclick = function() {
    cornify.clear();
    clearUnicorns.style.display = 'none';
  };

} // if screen is wider than 1024px

/**
 * Print when we click the print button.
 */
document.getElementById('printButton').addEventListener('click', function(event) {
  event.preventDefault();
  window.print();
});
