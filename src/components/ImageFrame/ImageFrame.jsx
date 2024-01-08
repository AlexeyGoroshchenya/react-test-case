import React from 'react';
import styles from './ImageFrame.module.css'

const ImageFrame = React.memo(({image}) => {
    console.log('image render');
    return (
        <div className={styles.body}>
            <div className={styles.frame}>
                <img src={`${process.env.PUBLIC_URL}/assets/images/${image}`} alt="" />
            </div>
        </div>
    );
});

export default ImageFrame;