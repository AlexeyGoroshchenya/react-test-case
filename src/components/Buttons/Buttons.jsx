import React, { useState } from 'react';
import styles from './Buttons.module.css'

const Buttons = ({ goToPervPage, goToNextPage, saveChanges, deleteObject, isLoading }) => {

    const [saveOn, setSaveOn] = useState(false)

    const toggleSaveMode = () => {
        setSaveOn(prev => !prev)
    }

    return (
        <div className={styles.body}>

            <div className={styles.buttons}>
                <div className={!isLoading ? styles.button + ' ' + styles.button__reverse : styles.button + ' ' + styles.button__reverse + ' ' + styles.button__disactive}
                    onClick={() => {
                        if (!isLoading) { goToPervPage() }
                    }}>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/icons/arrow.svg`} alt="" />
                </div>
                <div className={saveOn ? styles.button : styles.button + ' ' + styles.button__disactive}
                    onClick={toggleSaveMode}
                >
                    <img src={`${process.env.PUBLIC_URL}/assets/images/icons/save.svg`} alt="" />
                </div>
                <div className={!isLoading ? styles.button : styles.button + ' ' + styles.button__disactive}
                    onClick={deleteObject}
                >
                    <img src={`${process.env.PUBLIC_URL}/assets/images/icons/delete.svg`} alt="" />
                </div>
                <div className={!isLoading ? styles.button : styles.button + ' ' + styles.button__disactive}
                    onClick={() => {
                        if (!isLoading) {
                            if (saveOn) {
                                saveChanges()
                                setSaveOn(false)
                            } else {
                                goToNextPage()
                            }

                        }

                    }

                    }>
                    <img src={`${process.env.PUBLIC_URL}/assets/images/icons/arrow.svg`} alt="" />
                </div>
            </div>

        </div>
    );
};

export default Buttons;