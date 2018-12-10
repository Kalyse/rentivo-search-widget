import React from 'react';

import { storiesOf } from '@storybook/react';
import withDocs from 'storybook-readme/with-docs';
import { number, object, text, withKnobs } from '@storybook/addon-knobs';

import SingleSelectBox from '~components/SearchField/SingleSelectBox/SingleSelectBox';
import SingleSelectBoxDocs from '~docs/SEARCH_FIELD__SINGLE_SELECT_BOX.md';
import searchFieldConfig_singleSelectBox from '../jsonExamples/searchField--singleSelectBox';

import MultiSelectBox from '~components/SearchField/MultiSelectBox/MultiSelectBox';
import MultiSelectBoxDocs from '~docs/SEARCH_FIELD__MULTI_SELECT_BOX.md';
import searchFieldConfig_multiSelectBox from '../jsonExamples/searchField--multiSelectBox';

import GooglePlaces from '~components/SearchField/GooglePlaces/GooglePlaces';
import GooglePlacesDocs from '~docs/SEARCH_FIELD__GOOGLE_PLACES.md';
import searchFieldConfig_googlePlaces from '../jsonExamples/searchField--googlePlaces';

import NestedDropdown from '~components/SearchField/NestedDropdown/NestedDropdown';
import NestedDropdownDocs from '~docs/SEARCH_FIELD__NESTED_DROPDOWN.md';
import searchFieldConfig_nestedDropdown from '../jsonExamples/searchField--nestedDropdown';

import FieldWrapper from './HelperComponents/FieldWrapper';
import PreviewComponent from './HelperComponents/PreviewComponent';

import { fieldWidthDefaults } from '../constants';


storiesOf('Search Field', module)
    .addDecorator(withKnobs)
    .add(
        '"single_select_box" mode',
        withDocs({ PreviewComponent })(SingleSelectBoxDocs, () => {
            const { placeholder } = searchFieldConfig_singleSelectBox;
            return (
                <FieldWrapper width={ number(...fieldWidthDefaults) }>
                    <SingleSelectBox
                        { ...searchFieldConfig_singleSelectBox }
                        placeholder={ text('placeholder', placeholder) }
                        dumb
                    />
                </FieldWrapper>
            );
        })
    )
    .add(
        '"multi_select_box" mode',
        withDocs({ PreviewComponent })(MultiSelectBoxDocs, () => {
            const { placeholder } = searchFieldConfig_multiSelectBox;
            return (
                <FieldWrapper width={ number(...fieldWidthDefaults) }>
                    <MultiSelectBox
                        { ...searchFieldConfig_multiSelectBox }
                        placeholder={ text('placeholder', placeholder) }
                        dumb
                    />
                </FieldWrapper>
            );
        })
    )
    .add(
        '"google_places" mode',
        withDocs({ PreviewComponent })(GooglePlacesDocs, () => {
            const { searchOptions, placeholder } = searchFieldConfig_googlePlaces;
            return (
                <FieldWrapper width={ number(...fieldWidthDefaults) }>
                    <GooglePlaces
                        { ...searchFieldConfig_googlePlaces }
                        searchOptions={ object('searchOptions', searchOptions) }
                        placeholder={ text('placeholder', placeholder) }
                        dumb
                    />
                </FieldWrapper>
            );
        })
    )
    .add(
        '"nested_dropdown" mode',
        withDocs({ PreviewComponent })(NestedDropdownDocs, () => {
            const { placeholder } = searchFieldConfig_nestedDropdown;
            return (
                <FieldWrapper width={ number(...fieldWidthDefaults) }>
                    <NestedDropdown
                        { ...searchFieldConfig_nestedDropdown }
                        placeholder={ text('placeholder', placeholder) }
                        dumb
                    />
                </FieldWrapper>
            );
        })
    );

