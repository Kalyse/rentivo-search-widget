import React from "react";

import { storiesOf } from '@storybook/react';
import withDocs from 'storybook-readme/with-docs';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import DatesFields from '~components/DatesFields/DatesFields';
import DatesFieldsDocs from '~docs/DATES_FIELDS.md';
import datesFieldsConfig from '../jsonExamples/datesFields';

import PreviewComponent from "./HelperComponents/PreviewComponent";
import FieldWrapper from "./HelperComponents/FieldWrapper";

import { fieldWidthDefaults } from '../constants';

storiesOf('Dates Fields', module)
    .addDecorator(withKnobs)
    .add(
        'default',
        withDocs({ PreviewComponent })(DatesFieldsDocs, () => {
            const {
                      inputDateFormat,
                      appendToBody,
                      startDatePlaceholderText,
                      endDatePlaceholderText
                  } = datesFieldsConfig;
            return (
                <FieldWrapper width={ number(...fieldWidthDefaults) } style={ { paddingBottom: '335px' } }>
                    <DatesFields
                        { ...datesFieldsConfig }
                        inputDateFormat={ text('inputDateFormat', inputDateFormat) }
                        startDatePlaceholderText={ text('startDatePlaceholderText', startDatePlaceholderText) }
                        endDatePlaceholderText={ text('endDatePlaceholderText', endDatePlaceholderText) }
                        appendToBody={ boolean('appendToBody', appendToBody) }
                    />
                </FieldWrapper>
            );
        })
    );