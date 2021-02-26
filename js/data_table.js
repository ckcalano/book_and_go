$(document).ready( function () {
    $('#bngtable').DataTable();
} );

var someTableDT = $("#bngtable").on("draw.dt", function () {
    $(this).find(".dataTables_empty").parents('tbody').empty();
}).DataTable(/*init object*/);