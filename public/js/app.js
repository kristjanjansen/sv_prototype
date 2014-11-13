// Set the theme CSS file based on query parameter

var css = (urlParameter('theme') || 'blue')
$('.theme-css').attr('href', './themes/' + css + '.css')


// Load and compile templates

$.ajaxSetup({async: false, cache: false})

var tplKeys = [
    'wrapper',
    'nav',
    'sidebar',
    'main',
    'filters',
    'actions_top',
    'actions_bottom',
    'table',
    'modal',
    'exports',
    'alert',
    'table_actions',
    'config',
]

var tpl = {}

tplKeys.forEach(function(key) {
    $.get('./templates/' + key + '.html', function(html) {
       tpl[key] = Handlebars.compile(html)
    })
})


// Load the page file based on URL parameter

$.ajaxSetup({async: true})

var page = (urlParameter('page') || 'default')

$.get('./pages/' + page + '.yml', function(data) {
 
    data = yaml.load(data)

    // Generate the HTML based on templates

    $('body').html(tpl.wrapper({
      nav: tpl.nav({data: data}),
      sidebar: tpl.sidebar({data: data}),
      main: tpl.main({
        data: data,
        alert: tpl.alert({data: data}),
        filters: tpl.filters({data: data}),
        exports: tpl.exports({data: data}),
        config: tpl.config({data: data}),
        actions_bottom: tpl.actions_bottom({data: data}),
        actions_top: tpl.actions_top({data: data}),
        table: tpl.table({
          data: data,
          table_actions: tpl.table_actions({data: data})
        }),
      }),
      modal: tpl.modal({
        data: data,
        actions_bottom: tpl.actions_bottom({data: data})
      })

    }))

    // Launch event handlers

    $("table").tablesorter();

    $('.table-actions .btn, .modal .btn').on('click', function(e) {

       $('.modal').modal('toggle')
       e.preventDefault()

    })
})




// Parse the URL parameters

function urlParameter(param) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == param) {
      return pair[1];
    }
  }
  return(false);
}

