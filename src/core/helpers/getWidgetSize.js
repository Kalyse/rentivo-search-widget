export default function getWidgetSize(containerWidth, WIDGET_SIZES) {
    switch (true) {
        case containerWidth >= WIDGET_SIZES.EXTRA_LARGE.width:
            return WIDGET_SIZES.EXTRA_LARGE.id;
        case containerWidth >= WIDGET_SIZES.LARGE.width:
            return WIDGET_SIZES.LARGE.id;
        case containerWidth >= WIDGET_SIZES.MIDDLE.width:
            return WIDGET_SIZES.MIDDLE.id;
        case containerWidth >= WIDGET_SIZES.SMALL.width:
            return WIDGET_SIZES.SMALL.id;
        case containerWidth >= WIDGET_SIZES.EXTRA_SMALL.width:
            return WIDGET_SIZES.EXTRA_SMALL.id;
        case containerWidth >= WIDGET_SIZES.TINY.width:
            return WIDGET_SIZES.TINY.id;
        default:
            return WIDGET_SIZES.DEFAULT.id;
    }
}
