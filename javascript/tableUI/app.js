$(document).ready(function(){
    var table_items = $('[class*=table-item-]')
    $(document).on('mouseover','[class*=table-item-]',function(e){
        var $this = $(e.target)
        var $tooltip = $('<div class="table-tooltip"></div>')
        $tooltip.text($this.text())
        $this.append($tooltip)
    })
    $(document).on('mouseout','[class*=table-item-]',function(e){
        $('.table-tooltip').remove()
    })
    
})