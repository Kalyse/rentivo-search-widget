import React from 'react';
import PropTypes from 'prop-types';

import { convertSchemaToSingleSelectBoxData } from '~core/helpers/convertSchema';
import { generateSingleSelectBoxPart } from '~core/helpers/prepareSubmitUrl';

export default (SingleSelectBox) => {
    class SingleSelectBoxController extends React.PureComponent {
        convertedData = convertSchemaToSingleSelectBoxData(this.props.results);
        state         = {
            value: this.props.initialValue || this.convertedData[0].id
        };

        generateUrlPart = () => generateSingleSelectBoxPart(this.state.value, this.props.results);

        handleOptionSelect = e => this.setState({ value: e.target.value });

        render() {
            return (
                <SingleSelectBox
                    value={ this.state.value }
                    data={ this.convertedData }
                    onSelect={ this.handleOptionSelect }
                    options={ {
                        minimumResultsForSearch: 'Infinity'
                    } }
                />
            );
        }
    }

    SingleSelectBoxController.propTypes = {
        initialValue: PropTypes.string,
        results:      PropTypes.shape({
            categoryTitle: PropTypes.string.isRequired,
            categoryKey:   PropTypes.string.isRequired,
            categoryValue: PropTypes.arrayOf(
                PropTypes.shape({
                    itemTitle: PropTypes.string.isRequired,
                    itemValue: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired,
    };

    return SingleSelectBoxController;
}