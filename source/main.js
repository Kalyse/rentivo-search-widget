import searchSchema from '~core/searchSchema.json';

$(function () {
    $('#root').rentivoSearchbar({
        baseUrl: 'http://localhost:3000/',
        searchSchema,
    });
});
