function format(d) {
    return (
        '<dl>' +
        '<dt>Brief Synopsis:</dt>' +
        '<dd>' +
        d.brief_synopsis +
        '</dd>' +
        '</dl>'
    );
}

$(document).ready(function () {
    //    fetch('./assets\\data\\books.json')
    //TODO: Change URL after merge to main
    fetch('https://raw.githubusercontent.com/mavehur/rbs-mhl-project/mh/search-pane/Src/assets/data/books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let table = new DataTable('#myTable', {
                data: data,
                dom: 'PBfrtip',
                columns: [
                    {
                        className: 'dt-control',
                        orderable: false,
                        data: null,
                        defaultContent: ''
                    },
                    {
                        data: 'topic',
                        render: {
                            _: '[, ]',
                            sp: '[]'
                        },
                        searchPanes: {
                            orthogonal: 'sp'
                        }
                    },
                    {
                        data: 'title', render: function (data, type, row) {
                            return data ? data + ' ' + '<a href="' + row['link_to_good_reads'] + '" target="_blank">' + '<img src="./assets\\images\\greads_icon.png" width="20" height="20">' : '';
                        }
                    },
                    {
                        data: 'author',
                        render: {
                            _: '[, ]',
                            sp: '[]'
                        },
                        searchPanes: {
                            orthogonal: 'sp'
                        }

                    },
                    {
                        //                    data: 'age_range', render: function (data, type, row) {
                        //                        if (Array.isArray(data) && data.length > 0) {
                        //                            return data[0] + ' - ' + data[data.length - 1];
                        //                        } else {
                        //                            return '';
                        //                        }
                        //                    }
                        data: 'age_range',
                        render: {
                            _: '[, ]',
                            sp: '[]'
                        },
                        searchPanes: {
                            orthogonal: 'sp'
                        }
                    },
                    {
                        data: 'language',
                        render: {
                            _: '[, ]',
                            sp: '[]'
                        },
                        searchPanes: {
                            orthogonal: 'sp'
                        }
                    },
                    { data: 'number_of_times_recommended' },
                    {
                        data: 'who_recommended',
                        render: {
                            _: '[, ]',
                            sp: '[]'
                        },
                        searchPanes: {
                            orthogonal: 'sp'
                        }
                    }
                ],
                order: [[1, 'asc']],
                //filtering section
                layout: {
                    top1: {
                        searchPanes: {
                            columns: [1, 3, 4, 5, 6, 7],
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
                            viewCount: true,
                            orderable: false,
                            dtOpts: {
                                select: {
                                    style: 'multi'
                                }
                            },
                        },
                        targets: [1, 3, 4, 5, 6, 7] //search category
                    }
                ],
                stateSave: true,
            });
            table.on('click', 'td.dt-control', function (e) {
                let tr = e.target.closest('tr');
                let row = table.row(tr);

                if (row.child.isShown()) {
                    row.child.hide();
                }
                else {
                    row.child(format(row.data())).show();
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
