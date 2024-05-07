new DataTable('#myTable', {
    //filtering section
    layout: {
        top1: {
            searchPanes: {
                cascadePanes: true, //panes to be filtered based on the values selected in the other panes.
                columns: [0, 6, 9, 4, 7, 8],
                viewCount: false,
                orderable: false,
                collapse: false,
            }
        },
        topStart: {
            //TODO: add 'pdf'. currently it's not working
            buttons: ['copy', 'csv', 'excel', 'print']
        }
    },
    //data section
    columnDefs: [
        {
            searchPanes: {
                show: true,
            },
            targets: [0, 4, 6, 7, 8, 9] //search category
        }
    ],
    stateSave: true,
});