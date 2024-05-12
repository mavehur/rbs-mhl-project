$(document).ready(function () {
    fetch('./assets\\data\\books.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        $('#myTable').DataTable({
            data: data,
            dom: 'PBfrtip',
            columns: [
               {
                    data: 'Topic', render: function (data, type, row) {
                        if (Array.isArray(data) && data.length > 0) {
                            return data.join(', ');
                        } else {
                            return '';
                        }
                    }
                },
                {
                    data: 'Title', render: function (data, type, row) {
                        return data ? data + ' ' + '<a href="' + row['Link to GoodReads'] + '" target="_blank">' + '<img src="./assets\\images\\greads_icon.png" width="20" height="20">' : '';
                    }
                },
                { data: 'Author' },
                {
                    data: 'Age Range', render: function (data, type, row) {
                        if (Array.isArray(data) && data.length > 0) {
                            return data[0] + ' - ' + data[data.length - 1];
                        } else {
                            return '';
                        }
                    }
                },
                {
                    data: 'Language', render: function (data, type, row) {
                        if (Array.isArray(data) && data.length > 0) {
                            return data.join(', ');
                        } else {
                            return '';
                        }
                    }
                },
                { data: 'Number of Times Recommended' },
                {
                    data: 'Who Recommended', render: function (data, type, row) {
                        if (Array.isArray(data) && data.length > 0) {
                            return data.join(', ');
                        } else {
                            return '';
                        }
                    }
                }
            ],
            //filtering section
            layout: {
                top1: {
                    searchPanes: {
                        columns: [0, 2, 3, 4, 5, 6],
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
                        cascadePanes: true, //panes to be filtered based on the values selected in the other panes.
                        show: true,
                        viewCount: false,
                        orderable: false,
                        collapse: false,
                        dtOpts:{
                            select:{
                                style: 'multi'
                            }
                        }
                    },
                    targets: [0, 2, 3, 4, 5, 6] //search category
                }
            ],
            stateSave: true,
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
