const path = require('path');

module.exports = {
    title: 'Giphy Search Style Guide',

    // Adding index js to default ignore list
    ignore: [
        '**/__tests__/**',
        '**/index.{js, ts}',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        '**/*.d.ts'
    ],

    // attaching 3rd party styles to have the same look and feel
    require: [
        path.join(__dirname, 'node_modules/semantic-ui-css/semantic.min.css')
    ],

    sections: [
        {
            name: 'Introduction',
            content: 'docs/Introduction.md'
        },
        {
            name: 'Components',
            content: 'docs/Components.md',
            components: 'src/**/components/**/[A-Z]*.js',
        },
        {
            name: 'Containers',
            content: 'docs/Containers.md'
        }
    ]
};