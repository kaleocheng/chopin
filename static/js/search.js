

window.onload = function () {

    const search = instantsearch({
        appId: 'BK6XCVA3VV',
        apiKey: 'dd9a7f5909d378ca7d003e2bb59d07f6',
        indexName: 'blog',
        routing: true
    });

    search.addWidget(
        instantsearch.widgets.searchBox({
            container: '#search-box',
            placeholder: '搜索'
        })
    );

    search.addWidget(
        instantsearch.widgets.refinementList({
            container: '#refinement-list',
            attributeName: 'section'
        })
    );

    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                empty: 'No results',
                item: '<em> {{title}}</em>'
            }
        })
    );

    search.start();

};
