import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import images from '~/assets/images';
import classNames from 'classnames';

import styles from './Image.module.scss';

function Image({ className, src, alt, fallback: customFallback = images.noImg, ...props }, ref) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };
    return (
        <img
            className={classNames(className, styles.wrapper)}
            src={fallback || src}
            alt={alt}
            {...props}
            ref={ref}
            onError={handleError}
        />
    );
}

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
};

export default forwardRef(Image);
