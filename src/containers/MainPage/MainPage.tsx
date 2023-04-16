import type { NextPage } from 'next';
import { PropsWithChildren, useCallback, useState } from 'react';
import fromCurrencies from 'public/content/fromCurrencies.json';
import toCurrencies from 'public/content/toCurrencies.json';
import crosses from 'public/content/crosses.json';
import styles from './MainPage.module.css';
import { Selector, SelectorItemType } from 'src/components/Selector/Selector';
import { Input } from 'src/components/Input/Input';
import { FieldContainer } from '../FieldContainer/FieldContainer';
import { PersonalForm } from 'src/components/forms/PersonalForm/PersonalForm';

type MainPageProps = {
    hideNavigation?: boolean;
} & PropsWithChildren;

export const MainPage: NextPage<MainPageProps> = ({
    hideNavigation = false,
    children,
}: MainPageProps) => {
    const [fromCurrency, setFromCurrency] = useState<SelectorItemType['value']>(
        fromCurrencies[0].value
    );
    const [toCurrency, setToCurrency] = useState<SelectorItemType['value']>(
        toCurrencies[0].value
    );
    const [fromAmount, setFromAmount] = useState<number>(100);
    const [toAmount, setToAmount] = useState<number>(100);
    const handleSelectFromCurrency = useCallback(
        (value: SelectorItemType['value']) => {
            if (value) {
                setFromCurrency(value);
            }
        },
        []
    );
    const handleSelectToCurrency = useCallback(
        (value: SelectorItemType['value']) => {
            console.log('handleSelectToCurrency');
            if (value) {
                setToCurrency(value);
            }
        },
        []
    );
    const handleChangeFromAmount = useCallback((value: string) => {
        // const replaced1 = value.replace(/[^0-9.,]/g, '');
        // const [splitted1, ...splitted2] = replaced1.split(',');
        // const replaced2 = `${splitted1}.${
        //     splitted2.length ? splitted2.join('') : '00'
        // }`;
        // const [splitted3, ...splitted4] = replaced1.split('.');
        // const replaced3 = `${splitted3}.${
        //     splitted4.length ? splitted4.join('') : '00'
        // }`;
        // const replaced4 = replaced3.replace(/^0+(?!$)/, '');
        const number = Number(value);
        setFromAmount(number);
    }, []);
    const handleChangeToAmount = useCallback((value: string) => {
        const number = Number(value);
        setToAmount(number);
    }, []);
    console.log({ fromCurrency, toCurrency });
    return (
        <div className={styles.container}>
            {!hideNavigation && (
                <div className={styles.navigation}>navigation</div>
            )}
            <div className={styles.content}>
                <div className={styles.layout}>
                    <div className={styles.left}>
                        <div className={styles.content2}>
                            <div>
                                <h2>Отдаете</h2>
                                <FieldContainer>
                                    <Selector
                                        selectedItem={fromCurrency}
                                        items={fromCurrencies}
                                        popupTitle="Валюта"
                                        onClick={handleSelectFromCurrency}
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Input
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        value={fromAmount}
                                        onChange={(e) =>
                                            handleChangeFromAmount(
                                                e.target.value
                                            )
                                        }
                                    />
                                </FieldContainer>
                            </div>
                            <div>
                                <h2>Получаете</h2>
                                <FieldContainer>
                                    <Selector
                                        selectedItem={toCurrency}
                                        items={toCurrencies}
                                        popupTitle="Валюта"
                                        onClick={handleSelectToCurrency}
                                    />
                                </FieldContainer>
                                <FieldContainer>
                                    <Input
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        value={toAmount}
                                        onChange={(e) =>
                                            handleChangeToAmount(e.target.value)
                                        }
                                    />
                                </FieldContainer>
                            </div>
                            <div>
                                <PersonalForm />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.content2}>
                            <h2>Курсы валют</h2>
                            {crosses &&
                                crosses.map((cross) => (
                                    <div key={cross.value}>123</div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className={styles.content2}>ADVANTAGES</div>
                <div className={styles.content2} style={{ height: 5000 }}>
                    FOOTER
                </div>
                <div className={styles.content2}>{children}</div>
            </div>
        </div>
    );
};