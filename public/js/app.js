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


$.ajaxSetup({async: true})

$.get('./data/test.yml', function(data) {
 
    data = yaml.load(data)
console.log(data)
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

  //  $("table").tablesorter();

    $('.table-actions .btn, .modal .btn').on('click', function(e) {

       $('.modal').modal('toggle')
       e.preventDefault()

    })
})

