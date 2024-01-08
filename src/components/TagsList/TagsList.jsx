import React, { useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import styles from './TagsList.module.css'

const TagsList = observer(({ selectedTags, setSelectedTags }) => {

    const { objects } = useContext(Context)

    const changeSelected = (selected, tag) => {
        selected ?

            setSelectedTags(selectedTags.filter(item => item.id !== tag.id))
            :
            setSelectedTags([...selectedTags, {...tag}])
    }

    return (
        <div className={styles.inner}>
            {
                objects.tags.map(tag => {
                    const selected = selectedTags.find(item => item.id === tag.id) ? true : false
                    return <div key={tag.id + tag.name}
                        className={selected ? styles.tag + ' ' + styles.tag_selected : styles.tag}
                        onClick={() => { changeSelected(selected, tag) }}
                    >
                        {tag.name}
                    </div>
                }
                )
            }
        </div>
    );
});

export default TagsList;