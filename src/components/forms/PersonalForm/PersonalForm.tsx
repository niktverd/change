import { useEffect, useState } from 'react';
import styles from './PersonalForm.module.css';
import { Input } from 'src/components/Input/Input';

export type PersonalFormType = {
    lastName: string;
    firstName: string;
    middleName: string;
};

export type PersonalFormProps = {
    extractFormData?: (data: PersonalFormType) => void;
};

export const PersonalForm = ({ extractFormData }: PersonalFormProps) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');

    useEffect(() => {
        extractFormData?.({ firstName, lastName, middleName });
    }, [firstName, lastName, middleName]);

    return (
        <div className={styles.container}>
            <h2>Личные данные</h2>
            <div className={styles.fields}>
                <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                />
            </div>
        </div>
    );
};
