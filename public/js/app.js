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
    'actions',
    'table',
    'modal',
    'exports',
    'alert',
    'table_actions',
    'config',
    'form'
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
        actions_bottom: tpl.actions({actions: data.actions_bottom}),
        actions_top: tpl.actions({actions: data.actions_top}),
        table: tpl.table({
          table: data.table,
          table_actions: tpl.table_actions({table_actions: data.table.actions})
        }),
      }),
      modal: tpl.modal({
        data: data,
        form: tpl.form({form: data.modal.form}),
        table: tpl.table({
          table: data.modal.table,
          table_actions: tpl.table_actions({table_actions: data.modal.table.actions})
        }),
        actions_bottom: tpl.actions({actions: data.modal.actions_bottom})
      })

    }))

    // Launch event handlers

    $("table").tablesorter();

   //    $('.modal').modal('toggle')

    $('.table-actions .btn, .modal .btn, .btn-primary').on('click', function(e) {

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


// From http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44

Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

    var operators, result;
    
    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }
    
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    
    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    
    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    
    result = operators[operator](lvalue, rvalue);
    
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});