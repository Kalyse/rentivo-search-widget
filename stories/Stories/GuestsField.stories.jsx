import React from 'react';
import { UIConfig } from '../../.storybook/constants'

import { storiesOf } from '@storybook/react';
import withDocs from 'storybook-readme/with-docs';
import { number, text, withKnobs } from '@storybook/addon-knobs';

import SingleSelectBox from '~components/GuestsField/SingleSelectBox/SingleSelectBox';
import SingleSelectBoxDocs from '~docs/GUESTS_FIELD__SINGLE_SELECT_BOX.md';
import guestsFieldConfig_singleSelectBox from '../jsonExamples/guestsField--singleSelectBox';

import PlusMinusDropdown from '~components/GuestsField/PlusMinusDropdown/PlusMinusDropdown';
import PlusMinusDropdownDocs from '~docs/GUESTS_FIELD__PLUS_MINUS.md';
import guestsFieldConfig_plusMinus from '../jsonExamples/guestsField--plusMinus';

import FieldWrapper from './HelperComponents/FieldWrapper';
import PreviewComponent from './HelperComponents/PreviewComponent';

import { fieldWidthDefaults } from '../constants';

storiesOf('Guests Field', module)
    .addDecorator(withKnobs)
    .add(
        '"single_select_box" mode',
        withDocs({ PreviewComponent })(SingleSelectBoxDocs, () => {
            return (
                <FieldWrapper width={ number(...fieldWidthDefaults) }>
                    <SingleSelectBox
                        { ...guestsFieldConfig_singleSelectBox }
                    />
                </FieldWrapper>
            );
        })
    )
    .add(
        '"plus_minus" mode',
        withDocs({ PreviewComponent })(PlusMinusDropdownDocs, () => {
            const { placeholder, incDecInterval } = guestsFieldConfig_plusMinus;
            return (
                <FieldWrapper width={ number(...fieldWidthDefaults) }>
                    <PlusMinusDropdown
                        { ...guestsFieldConfig_plusMinus }
                        placeholder={ text('placeholder', placeholder) }
                        incDecInterval={ number('incDecInterval', incDecInterval) }
                    />
                </FieldWrapper>
            );
        })
    );