import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

import MarkerGenerator from './ast/marker-generator';
import debounce from './util/debounce';

const defaultValue = `struct Foo {
    bar: Baz,
}
`;

const markerGenerator = new MarkerGenerator();

const parser = import('xshade-parser-wasm')

let markers = [];
let value = '';

function onChange(newValue) {
    value = newValue;
    parser.then(p => {
        const result = p.parse(value);
        const ast = JSON.parse(result);

        markers = markerGenerator.generateMarkers(ast, value);

        rerender();
    }).catch(e => {
        markers = [];
        rerender();
    });
}

const debouncedOnChange = debounce(onChange, 250);

const rerender = () => {
    render(
        <AceEditor
            value={value}
            defaultValue={defaultValue}
            mode="java"
            theme="github"
            onChange={debouncedOnChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
            markers={markers}
            setOptions={{
                fontFamily: 'Hack',
                fontSize: '0.9rem',
            }}
        />,
        document.getElementById('example')
    );
};

onChange(defaultValue);
