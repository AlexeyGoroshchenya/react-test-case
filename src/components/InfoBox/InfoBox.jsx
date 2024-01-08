import React, { useContext } from 'react';
import styles from './InfoBox.module.css'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const InfoBox = ({object, add, selectedTags, setSelectedTags}) => {


    


const removeTag = (tagId)=>{
    setSelectedTags(selectedTags.filter(item => item.id !== tagId))
}

 

    return (
        <div className={styles.body}>
            <div className={styles.box}>
                <div className={styles.column}>
                    <div className={styles.tags}>
                        {
                            selectedTags?.map(tag =>
                                <div key={tag.id} className={styles.tag}>
                                    <div className={styles.tag__label}>
                                        {tag.name}
                                    </div>
                                    <div className={styles.tag__delete}
                                        onClick={()=>{removeTag(tag.id)}}>
                                        +
                                    </div>
                                </div>
                            )
                        }

                        <div className={styles.tag__add}
                            onClick={add}>
                            +
                        </div>

                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.properties}>
                        <div className={styles.property}>
                            <div className={styles.key}>
                                Название:
                            </div>
                            <div className={styles.value}>
                                {object.name}
                            </div>
                        </div>
                        <div className={styles.property}>
                            <div className={styles.key}>
                                Описание:
                            </div>
                            <div className={styles.value}>
                                {object.desc}
                            </div>
                        </div>
                        <div className={styles.property}>
                            <div className={styles.key}>
                                Характеристика:
                            </div>
                            <div className={styles.value}>
                                {object.price}
                            </div>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    );
};

export default InfoBox;