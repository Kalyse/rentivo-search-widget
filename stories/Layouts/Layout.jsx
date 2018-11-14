import React from 'react';
import CCenter from './CCenter';
import CSection from './CSection';
import CTitle from './CTitle';

export default ({ children }) => (
    <main style={ {
        boxSizing:  "border-box",
        margin:     0,
        padding:    "15px",
        fontFamily: 'Arial, sans-serif'
    } }>
        <CSection>
            <CTitle>Full width</CTitle>
            <CCenter maxWidth='100%'>{ children }</CCenter>
        </CSection>
        <CSection>
            <CTitle>Max width = 1000px</CTitle>
            <CCenter maxWidth='1000px'>{ children }</CCenter>
        </CSection>
        <CSection>
            <CTitle>Max width = 800px</CTitle>
            <CCenter maxWidth='800px'>{ children }</CCenter>
        </CSection>
        <CSection>
            <CTitle>Max width = 600px</CTitle>
            <CCenter maxWidth='600px'>{ children }</CCenter>
        </CSection>
        <CSection>
            <CTitle>Max width = 400px</CTitle>
            <CCenter maxWidth='400px'>{ children }</CCenter>
        </CSection>
        <CSection last>
            <CTitle>Max width = 320px</CTitle>
            <CCenter maxWidth='320px'>{ children }</CCenter>
        </CSection>
    </main>
);