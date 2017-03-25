/**
 * Created by MonoKmm on 2017/3/22.
 */
    // Load native UI library
var gui = require('nw.gui');
var fs = require('fs');
var ts = require('./node_modules/dirTemplate.js');
// var ts = new TemplateString();
// Get the current window
var win = gui.Window.get();
var clipboard = gui.Clipboard.get();

(function ($) {
// ****************
//  Dom Cache
// ****************
var $c_view_pre = $('.c_view pre');
// ****************
//  Editor
// ****************
    var template = ace.edit("template");
    template.setTheme("ace/theme/monokai");
    template.session.setMode("ace/mode/javascript");
    template.setOption("tabSize",4);
    $('#template').data({template:template});
    var replacement = ace.edit("replacement");
    replacement.setTheme("ace/theme/monokai");
    replacement.session.setMode("ace/mode/json");
    $('#replacement').data({replacement:replacement});
    var result = ace.edit("result");
    result.setTheme("ace/theme/monokai");
    result.session.setMode("ace/mode/json");
    $('#result').data({result:result});
// ****************
//  Event Handler
// ****************

// ****************
//  Event
// ****************
    $('#close').on('click',function () {
        win.close();
    });

    $('#fileDialog').on('click', function (event) {
        document.getElementById('btn_file').click();
    }).on('change', function (event) {
        event.preventDefault();
        var files = $('#btn_file')[0].files[0].path;
            // console.log(files);
        $('#control > p').text(files);
            ts.fnWalkDir(files,function (dirList) {
                console.log(dirList);
                var array = [];
                for (var i = 0,len=dirList.length; i < len; i++) {
                    array[i] = '<li><span class="icon-folder"></span><nobr>'+ dirList[i]+'</nobr></li>'
                }
                $('#control ul').html(array.join(''));
            })
    });

    $('#btn-group').on('click', function (event) {
        var $ele = $(event.target).closest('button');
        console.log($ele.attr('id'));
        switch ($ele.attr('id')){
            case "copy-btn":
                console.log('copy');
                $c_view_pre.each(function () {
                    var $this = $(this);
                    if($this.css("display")=="block"){
                        clipboard.set($this.data($this.attr('id')).getValue(),'text');
                        return;
                    }
                });
                break;
            case "create-btn":
                ts.transform($('#control > p').text(),template.getValue(),replacement.getValue(),function (data) {
                    console.log(data);
                    result.setValue(data);
                    setTimeout(function () {

                    },800)
                });
                break;
            case "json-btn":
                console.log('json');

                break;
            default :
                break;
        }
    });

    $('#c_viewSwitcher').on('click', function (event) {
        var $ele = $(event.target).closest('a');
        switch ($ele.attr('data-target')){
            case "replacement":
                $ele.addClass('selected-view').siblings().removeClass('selected-view');
                $c_view_pre.hide().filter('#replacement').show();
                break;
            case "template":
                $ele.addClass('selected-view').siblings().removeClass('selected-view');
                $c_view_pre.hide().filter('#template').show();
                break;
            case "result":
                $ele.addClass('selected-view').siblings().removeClass('selected-view');
                $c_view_pre.hide().filter('#result').show();
                break;
            default :
                break;
        }

    });


})(jQuery);