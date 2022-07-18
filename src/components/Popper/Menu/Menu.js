import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx = classNames.bind(styles);

const defaultFunc = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFunc }) {
    const [history, setHistory] = useState([{ data: items }]);

    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, key) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={key}
                    data={item}
                    onClick={() => {
                        //TODO: Nếu có menu con, thì khi bấm vào sẽ render menu con
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children]);
                        }
                        //TODO: Nếu không có menu con, thì khi bấm vào sẽ làm gì đó
                        else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    //TODO: Khi ẩn menu đi thì menu tự động quay về level 1;
    const handleResetMenu = () => {
        setHistory((pre) => pre.slice(0, 1));
    };

    //TODO: Khi nhấn vào nút back sẽ trở về menu level trước
    const handleReturnToPreMenu = () => {
        setHistory((pre) => pre.slice(0, pre.length - 1));
    };

    return (
        <Tippy
            interactive={true}
            offset={[12, 8]}
            onHide={handleResetMenu}
            hideOnClick={hideOnClick}
            delay={[0, 500]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title={current.title} onBack={handleReturnToPreMenu} />}
                        <div className={cx('menu-body')}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
