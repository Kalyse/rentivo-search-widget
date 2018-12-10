import React from 'react';
import Center from './Center';
import Section from './Section';
import Title from './Title';

const sizeExamples = [
    {
        title:    'Full width',
        maxWidth: '100%'
    },
    {
        title:    'Container max-width = 1000px',
        maxWidth: '1000px'
    },
    {
        title:    'Container max-width = 800px',
        maxWidth: '800px'
    },
    {
        title:    'Container max-width = 600px',
        maxWidth: '600px'
    },
    {
        title:    'Container max-width = 400px',
        maxWidth: '400px'
    },
    {
        title:    'Container max-width = 320px',
        maxWidth: '320px'
    }
];

export default ({ children }) => {
    return (
        <main style={ {
            boxSizing:  "border-box",
            margin:     0,
            padding:    "15px",
            fontFamily: 'Arial, sans-serif'
        } }>{ sizeExamples.map((size, idx) => (
            <Section key={ idx }>
                <Title>{ size.title }</Title>
                <Center maxWidth={ size.maxWidth }>{ children }</Center>
            </Section>
        )) }</main>
    );
};