import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src={
                    'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/8bae59a0b4aafda468125b9f1b31b84f~c5_300x300.webp?x-expires=1657760400&x-signature=z1Vedk9m0CESHpaWrV0XNlfRvNQ%3D'
                }
                alt="avatar"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyễn Ngọc Nguyên Hương</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <p className={cx('username')}>nhuongne</p>
            </div>
        </div>
    );
}

export default AccountItem;
