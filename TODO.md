### TODO

* Handlebars helper for menu dividers http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44
* Datepicker https://github.com/eternicode/bootstrap-datepicker
* Timepicker https://github.com/rendom/bootstrap-3-timepicker
* Factor out menu leaf rendering, add icon support

<div class="btn-group" data-toggle="buttons">

{{#each data.filters.radios}}
  <label class="btn btn-default btn-sm {{#if @first}}active{{/if}}">
    <input type="radio" name="options" id="option1" autocomplete="off" {{#if @first}}checked{{/if}}> {{this}}
  </label>
{{/each}}
</div>