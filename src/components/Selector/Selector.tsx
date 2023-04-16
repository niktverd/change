import { useCallback, useEffect, useState } from 'react';
import { Xmark } from '@gravity-ui/icons';
import { Magnifier } from '@gravity-ui/icons';
import { CaretDown } from '@gravity-ui/icons';
import { Input } from '../Input/Input';
import { Image } from '../Image/Image';
import styles from './Selector.module.css';
import itemStyles from './SelectorItem.module.css';
import clsx from 'clsx';

const IMAGE_SIZE = 48;

export type SelectorItemType = {
    title: string;
    value: string | number;
    icon?: string;
    subtitle?: string;
    arrow?: boolean;
};

type SelectorProps = {
    selectedItem?: SelectorItemType['value'];
    items?: SelectorItemType[];
    popupTitle?: string;
    arrow?: boolean;
};

type SelectorItemHandler = {
    onClick?: (value: SelectorItemType['value']) => void;
};

const SelectorItem = (props: SelectorItemType & SelectorItemHandler) => {
    const { icon, value, title, subtitle, onClick, arrow = false } = props;
    return (
        <div className={itemStyles.container} onClick={() => onClick?.(value)}>
            {icon && (
                <div className={itemStyles.icon}>
                    <Image src={icon} width={IMAGE_SIZE} height={IMAGE_SIZE} />
                </div>
            )}
            <div className={itemStyles.content}>
                <div className={clsx(itemStyles.title)}>{title}</div>
                {subtitle && (
                    <div className={clsx(itemStyles.subtitle)}>{subtitle}</div>
                )}
            </div>
            {arrow && (
                <CaretDown
                    className={clsx(itemStyles.arrow)}
                    width={64}
                    height={24}
                />
            )}
        </div>
    );
};

export const Selector = ({
    selectedItem,
    items = [],
    popupTitle,
    onClick,
    arrow = false,
}: SelectorProps & SelectorItemHandler) => {
    const [selected, setSelected] = useState<SelectorItemType | null>(null);
    const [showList, setShowList] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const found = items.find((item) => item.value === selectedItem);
        if (found) {
            setSelected(found);
        } else {
            setSelected(null);
        }
    }, [selectedItem]);

    const onShowList = useCallback(() => {
        setShowList(true);
    }, []);

    const onHideList = useCallback(() => {
        setShowList(false);
    }, []);

    const handleSelect = useCallback((value: SelectorItemType['value']) => {
        onClick?.(value);
        onHideList();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.button} onClick={onShowList}>
                {selected ? <SelectorItem {...selected} arrow={arrow} /> : '-'}
            </div>
            {showList && (
                <div className={styles.items} onClick={onHideList}>
                    <div
                        className={styles['items-content']}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles['popup-header']}>
                            <h2 className={styles['popup-header-title']}>
                                {popupTitle}
                            </h2>
                            <div
                                className={styles['popup-header-close']}
                                onClick={onHideList}
                            >
                                <Xmark />
                            </div>
                        </div>
                        <div className={styles['popup-search']}>
                            <Magnifier />
                            <Input
                                type="text"
                                className={styles['popup-search-input']}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {items &&
                            items
                                .filter((item) =>
                                    searchQuery
                                        ? `${item.value}`.includes(
                                              searchQuery
                                          ) || item.title.includes(searchQuery)
                                        : true
                                )
                                .map((item, index) => {
                                    return (
                                        <SelectorItem
                                            {...item}
                                            key={`${item.value}_${index}`}
                                            onClick={handleSelect}
                                        />
                                    );
                                })}
                    </div>
                </div>
            )}
        </div>
    );
};
