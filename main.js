var svg = $('svg');

var templates = {
  schematics:     { x: 40,    y: 114, enabled: true },
  pcb:            { x: 21,    y: 74,  enabled: true },
  firmware:       { x: 40,    y: 35,  enabled: true },
  mechanical:     { x: 77,    y: 18,  enabled: true },
  documentation:  { x: 118.5, y: 35,  enabled: true },
  bom:            { x: 137,   y: 74,  enabled: true },
  commercial:     { x: 118.5, y: 114, enabled: true }
};
var logoPaths = [
  { d: "M45.597,180.781h3.613v-12.254c0-4.426-3.046-5.914-7.473-5.914c-2.692,0-4.675,0.707-6.056,2.621l2.833,2.16c0.637-1.027,1.523-1.383,3.4-1.383c2.585,0,3.683,0.604,3.683,2.303v1.877h-4.994c-3.86,0-5.843,2.445-5.843,5.313c0,3.117,2.337,5.49,6.339,5.49c2.444,0,3.684-0.566,4.427-1.807h0.071V180.781z M45.597,174.476c0,2.799-1.027,3.117-4.037,3.117c-2.444,0-3.401-1.063-3.401-2.266c0-1.311,0.992-2.162,3.118-2.162h4.32V174.476z", evenodd: true },
  { d: "M53.178,180.781h3.612v-10.803c0-2.619,1.736-3.754,3.507-3.754c0.921,0,1.523,0.248,2.373,0.887l2.62-3.117c-1.098-0.85-2.301-1.381-3.754-1.381c-1.912,0-3.542,0.709-4.675,2.125H56.79v-1.912h-3.612V180.781z", evenodd: true },
  { d: "M76.095,180.781h3.612v-25.217h-3.612v9.174c-1.346-1.275-2.798-2.125-4.64-2.125c-2.196,0-3.789,0.99-4.816,2.338c-0.992,1.273-1.275,2.441-1.275,6.836c0,4.426,0.283,5.594,1.275,6.869c1.027,1.346,2.62,2.338,4.816,2.338c1.842,0,3.507-0.852,4.64-2.09V180.781z M72.553,166.224c3.365,0,3.542,2.977,3.542,5.563c0,2.621-0.177,5.594-3.542,5.594c-3.4,0-3.577-2.797-3.577-5.594C68.976,169.023,69.153,166.224,72.553,166.224", evenodd: true },
  { points: "98.143,180.781 101.332,180.781 107.068,162.826 103.242,162.826 99.809,175.398 99.736,175.398 95.664,162.826 93.043,162.826 88.971,175.398 88.9,175.398 85.464,162.826 81.64,162.826 87.377,180.781 90.564,180.781 94.318,168.208 94.389,168.208 ", evenodd: true },
  { d: "M118.186,180.781h3.613v-12.254c0-4.426-3.047-5.914-7.473-5.914 c-2.691,0-4.676,0.707-6.057,2.621l2.834,2.16c0.637-1.027,1.521-1.383,3.398-1.383c2.586,0,3.684,0.604,3.684,2.303v1.877h-4.994 c-3.859,0-5.844,2.445-5.844,5.313c0,3.117,2.338,5.49,6.34,5.49c2.443,0,3.684-0.566,4.428-1.807h0.07V180.781z M118.186,174.476 c0,2.799-1.027,3.117-4.037,3.117c-2.443,0-3.4-1.063-3.4-2.266c0-1.311,0.992-2.162,3.117-2.162h4.32V174.476z", evenodd: true },
  { d: "M125.768,180.781h3.611v-10.803c0-2.619,1.734-3.754,3.506-3.754 c0.922,0,1.523,0.248,2.373,0.887l2.621-3.117c-1.098-0.85-2.303-1.381-3.754-1.381c-1.912,0-3.541,0.709-4.674,2.125h-0.072v-1.912 h-3.611V180.781z", evenodd: true },
  { d: "M152.748,173.167v-2.977c0-4.639-3.434-7.578-7.4-7.578 c-3.471,0-7.402,2.266-7.402,9.242c0,7.367,4.285,9.139,7.969,9.139c2.408,0,4.709-0.85,6.48-2.904l-2.621-2.232 c-1.063,1.1-2.551,1.736-3.93,1.736c-2.48,0-4.285-1.488-4.285-4.426H152.748z M141.559,170.191c0.07-2.727,1.664-4.18,3.789-4.18 s3.684,1.453,3.789,4.18H141.559z", evenodd: true },
  { evenodd: true, d: "M0,143.425c0,3.895,0.566,5.383,1.947,6.906c0.992,1.098,2.657,2.301,5.455,2.301 c2.797,0,4.462-1.203,5.454-2.301c1.381-1.523,1.948-3.012,1.948-6.906c0-3.861-0.567-5.348-1.948-6.871 c-0.992-1.098-2.657-2.303-5.454-2.303c-2.798,0-4.463,1.205-5.455,2.303C0.566,138.078,0,139.564,0,143.425 M11.191,143.46 c0,2.586-0.212,3.293-0.885,4.25c-0.532,0.744-1.665,1.311-2.904,1.311c-1.24,0-2.373-0.566-2.904-1.311 c-0.673-0.957-0.886-1.664-0.886-4.285c0-2.586,0.213-3.295,0.886-4.25c0.531-0.744,1.664-1.311,2.904-1.311 c1.239,0,2.372,0.566,2.904,1.311C10.979,140.13,11.191,140.839,11.191,143.46" },
  { evenodd: true, d: "M49.469,144.806v-2.975c0-4.641-3.435-7.58-7.401-7.58 c-3.472,0-7.402,2.268-7.402,9.244c0,7.365,4.285,9.137,7.968,9.137c2.409,0,4.71-0.85,6.481-2.904l-2.621-2.23 c-1.062,1.098-2.549,1.736-3.93,1.736c-2.48,0-4.286-1.488-4.286-4.428H49.469z M38.278,141.832c0.071-2.729,1.665-4.18,3.79-4.18 s3.683,1.451,3.789,4.18H38.278z" },
  { evenodd: true, d: "M52.552,152.419h3.612v-10.693c0-2.445,1.523-3.861,3.577-3.861 c2.019,0,3.542,1.416,3.542,3.861v10.693h3.612v-11.934c0-4.074-3.187-6.234-5.985-6.234c-1.912,0-3.542,0.709-4.674,2.125h-0.072 v-1.912h-3.612V152.419z" },
  { evenodd: true, d: "M76.662,149.41c2.302,2.16,4.994,3.223,7.898,3.223c4.179,0,7.437-2.018,7.437-5.525 c0-2.867-1.486-5.135-5.206-5.383l-2.975-0.211c-1.806-0.143-2.372-0.922-2.372-1.701c0-1.238,0.779-2.16,3.08-2.16 c1.949,0,3.402,0.674,4.818,1.664l2.23-2.619c-1.771-1.488-3.895-2.445-7.049-2.445c-3.789,0-6.693,1.877-6.693,5.525 c0,3.08,2.196,4.852,5.17,5.1l3.188,0.283c1.241,0.105,2.196,0.496,2.196,1.771c0,1.523-1.489,2.301-3.542,2.301 c-2.408,0-4.108-0.777-5.666-2.301L76.662,149.41z" },
  { evenodd: true, d: "M94.051,143.425c0,3.895,0.568,5.383,1.949,6.906c0.992,1.098,2.656,2.301,5.453,2.301 c2.799,0,4.463-1.203,5.455-2.301c1.381-1.523,1.947-3.012,1.947-6.906c0-3.861-0.566-5.348-1.947-6.871 c-0.992-1.098-2.656-2.303-5.455-2.303c-2.797,0-4.461,1.205-5.453,2.303C94.619,138.078,94.051,139.564,94.051,143.425 M105.242,143.46c0,2.586-0.211,3.293-0.885,4.25c-0.531,0.744-1.664,1.311-2.904,1.311c-1.238,0-2.373-0.566-2.902-1.311 c-0.674-0.957-0.887-1.664-0.887-4.285c0-2.586,0.213-3.295,0.887-4.25c0.529-0.744,1.664-1.311,2.902-1.311 c1.24,0,2.373,0.566,2.904,1.311C105.031,140.13,105.242,140.839,105.242,143.46" },
  { evenodd: true, d: "M111.939,146.4c0,4.072,3.188,6.232,6.021,6.232c1.875,0,3.506-0.709,4.639-2.125h0.07 v1.914h3.611v-17.957h-3.611v10.695c0,2.443-1.523,3.861-3.543,3.861c-2.053,0-3.576-1.418-3.576-3.861v-10.695h-3.611V146.4z" },
  { evenodd: true, d: "M130.242,152.419h3.613v-10.801c0-2.621,1.734-3.754,3.506-3.754 c0.922,0,1.523,0.248,2.373,0.885l2.621-3.117c-1.1-0.85-2.301-1.381-3.754-1.381c-1.912,0-3.543,0.709-4.676,2.125h-0.07v-1.912 h-3.613V152.419z" },
  { evenodd: true, d: "M153.859,147.144c-0.885,1.098-2.16,1.877-3.646,1.877 c-2.939,0-4.676-1.666-4.676-5.563c0-3.93,1.736-5.594,4.676-5.594c1.486,0,2.762,0.779,3.646,1.877l2.656-2.373 c-1.557-1.807-3.719-3.117-6.445-3.117c-4.143,0-8.145,2.621-8.145,9.207c0,6.555,4.002,9.174,8.145,9.174 c2.727,0,4.889-1.311,6.445-3.115L153.859,147.144z" },
  { evenodd: true, d: "M172.238,144.806v-2.975c0-4.641-3.438-7.58-7.402-7.58 c-3.473,0-7.402,2.268-7.402,9.244c0,7.365,4.285,9.137,7.969,9.137c2.408,0,4.711-0.85,6.48-2.904l-2.621-2.23 c-1.063,1.098-2.549,1.736-3.93,1.736c-2.48,0-4.285-1.488-4.285-4.428H172.238z M161.047,141.832c0.07-2.729,1.664-4.18,3.789-4.18 s3.682,1.451,3.789,4.18H161.047z" },
  { d: "M25.041,149.021c3.4,0,3.577-2.799,3.577-5.561c0-2.799-0.177-5.596-3.577-5.596 c-3.364,0-3.542,2.975-3.542,5.596C21.499,146.046,21.676,149.021,25.041,149.021 M17.873,180.781v-46.316h3.626v1.877 c1.134-1.24,2.798-2.09,4.64-2.09c2.195,0,3.79,0.992,4.817,2.338c0.991,1.275,1.274,2.443,1.274,6.871 c0,4.391-0.283,5.561-1.274,6.834c-1.027,1.346-2.622,2.338-4.817,2.338c-1.842,0-3.294-0.85-4.64-2.125l-0.013,14.23 c1.204-1.416,2.833-2.125,4.745-2.125c2.798,0,5.985,2.16,5.985,6.232v11.936h-3.612v-10.695c0-2.445-1.523-3.861-3.542-3.861 c-2.054,0-3.576,1.416-3.576,3.861v10.695H17.873z" }
];
var logoType = 'logo-on';
var logoFont = null;

opentype.load('Ubuntu-B.ttf', function (err, font) {
  logoFont = font;
  for (var k in templates) {
    if (templates[k].enabled) {
      svg.append(createText(k));
    }
  }
});


$('body').on('change', 'input[type="checkbox"]', function (e) {
  change($(this).attr('id'), this.checked);
});

$('body').on('change', 'input[type="radio"]', function (e) {
  if ($(this).val()) {
    logoType = $(this).attr('id');
  }

  if (logoType === 'logo-on') {
    svg.find('#text').remove();
    svg.append(createLogoText());
    for (var k in templates) {
      if (templates[k].enabled) {
        svg.append(createText(k));
      }
    }
  } else {
    svg.find('#logo-text').remove();
    svg.find('.on-logo-text').remove();
    svg.append(createCombined());
    updateText();
  }
});

$('button').on('click', function () {
  var a = document.createElement('a');
  a.setAttribute('target', '_blank');
  a.setAttribute('download', 'oshw.svg');
  a.setAttribute('href', 'data:image/svg+xml;utf8,' + unescape(svg[0].outerHTML).replaceAll("#", "%23"));
  $('body').append(a);
  a.click();
  $(a).remove();
});

function change(what, value) {
  templates[what].enabled = !templates[what].enabled;

  if (templates[what].enabled === true && value === true) {
    if (logoType === 'logo-on') {
      svg.append(createText(what));
    } else {
      updateText();
    }
  } else if (templates[what].enabled === false && value === false) {
    if (logoType === 'logo-on') {
      svg.find('#' + what.charAt(0)).remove();
    } else {
      updateText();
    }
  }
}

function measureCenter(d) {
  var elem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  var gear = document.getElementById('gear').getBBox();

  elem.setAttribute('d', d);
  svg.append(elem);
  var eb = elem.getBBox();

  $(elem).remove();

  return gear.width / 2 - eb.width / 2 + gear.x - 2;
};

function updateText() {
  var text = Object.keys(templates).reduce(function (a, b) { return a + (templates[b].enabled ? b.charAt(0).toUpperCase(): '') }, '');
  var d = logoFont.getPath(text, 10, 160, 30).toPathData(3);
  d = logoFont.getPath(text, measureCenter(d), 150, 30).toPathData(3);
  $('#text').attr('d', d);
}

function createLogoText() {
  var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('id', 'logo-text');

  logoPaths.forEach(function (v) {
    var elem = document.createElementNS('http://www.w3.org/2000/svg', typeof v.d === 'undefined' ? 'polygon': 'path');
    if (typeof v.d === 'undefined') {
      elem.setAttribute('points', v.points);
    } else {
      elem.setAttribute('d', v.d);
    }

    if (v.evenodd) {
      elem.setAttribute('fill-rule', 'evenodd');
    }

    elem.setAttribute('fill', '#0099B0');

    g.appendChild(elem);
  });

  return g;
}

function createText(what) {
  var glyph = logoFont.charToGlyph(what.charAt(0).toUpperCase());
  var d = glyph.getPath(templates[what].x, templates[what].y, 20).toPathData(3);
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('fill', '#ffffff');
  path.setAttribute('id', what.charAt(0));
  path.setAttribute('class', 'on-logo-text');
  return path;
}

function createCombined() {
  var text = Object.keys(templates).reduce(function (a, b) { return a + (templates[b].enabled ? b.charAt(0).toUpperCase(): '') }, '');
  var d = logoFont.getPath(text, 10, 160, 30).toPathData(3);
  d = logoFont.getPath(text, measureCenter(d), 150, 30).toPathData(3);
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('id', 'text');
  path.setAttribute('fill', '#0099B0');
  return path;
}
