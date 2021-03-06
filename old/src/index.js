$(function(){
    var area = new DragArea({selector : '.drag-area'});
    $('.drag-area').click(function(e){
        var self = $(this);
        var radio = $('.buttons-box :radio:checked');
        if(radio.length){
            if(radio.val() == 'entity'){
                var entity = area.newEntity();
                document.querySelector('#modal-entity').showModal();
                $('input[type=hidden][name=id_entity]').val(entity.getId());
                $('.form-entity input#entity-name').val('');
                $('.buttons-box :radio[value=move]').click();
            }
        }
    });
    $('.buttons-box :radio').change(function(){
        var val = $(this).val();
        if(val == 'move'){
            $('.drag-area').css('cursor','');
        } else if(val == 'entity'){
            $('.drag-area').css('cursor','crosshair');
        }
    });
    $('form.form-entity').submit(function(e){
        e.preventDefault();
        var form = $(this);
        var id_entity = form.find('input[name=id_entity]').val();
        var entity = area.getChild(id_entity);
        var name = form.find('input#entity-name').val();
        entity.setName(name);
        document.querySelector('#modal-entity').close();
    });
    $('.build_sql').click(function(e){
        e.preventDefault();
        var sql = '';
        var list = area.getChildren();
        for(var i in list ){
            var child = list[i];
            sql += child.getSQL();
        }
        var modal = $('#modal-sql');
        modal.find('code').html(sql);
        modal[0].showModal();
    });
    $('dialog .close').click(function(){
        $(this).parents('dialog')[0].close();
    });
    $('.buttons-box').buttonset();
});

