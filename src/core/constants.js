export const SEARCH_FIELD_MODES = {
    SINGLE_SELECT_BOX: 'single_select_box',
    MULTI_SELECT_BOX:  'multi_select_box',
    GOOGLE_PLACES:     'google_places',
    NESTED_DROPDOWN:   'nested_dropdown',
};

export const GUESTS_FIELD_MODES = {
    SINGLE_SELECT_BOX: 'single_select_box',
    PLUS_MINUS:        'plus_minus'
};

export const URL_TRANSFORMER_SCHEMES = {
    DEFAULT:               'default',
    ENCODED_GOOGLE_PLACES: 'encoded_google_places',
    ALTERNATIVE:           'alternative'
};

export const WIDGET_SIZES = {
    DEFAULT:     {
        id:         'DEFAULT',
        width:      0,
        classnames: '',
    },
    TINY:        {
        id:         'TINY',
        width:      480,
        classnames: 'rsw-tn',
    },
    EXTRA_SMALL: {
        id:         'EXTRA_SMALL',
        width:      620,
        classnames: 'rsw-tn rsw-xs',
    },
    SMALL:       {
        id:         'SMALL',
        width:      768,
        classnames: 'rsw-tn rsw-xs rsw-sm',
    },
    MIDDLE:      {
        id:         'MIDDLE',
        width:      992,
        classnames: 'rsw-tn rsw-xs rsw-sm rsw-md',
    },
    LARGE:       {
        id:         'LARGE',
        width:      1200,
        classnames: 'rsw-tn rsw-xs rsw-sm rsw-md rsw-lg',
    },
    EXTRA_LARGE: {
        id:         'EXTRA_LARGE',
        width:      1440,
        classnames: 'rsw-tn rsw-xs rsw-sm rsw-md rsw-lg rsw-xg'
    },
};

export const ROOT_MENUS_ID = {
    DEFAULT:        'defaultRootMenu',
    SEARCH_RESULTS: 'searchResultsMenu'
};

export const COOKIE_PREFIX = 'RSW_';
