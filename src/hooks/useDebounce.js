import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value, debouncedValue), delay);
        //! Clean up function sẽ luôn được gọi trước khi call backđược gọi
        //? Vì vậy mỗi khi "value" bị thay đổi giá trị => clearTimeout luôn xoá đi setTimeout hiện tại => callback sẽ tạo setTimeout mới => chỉ gọi API khi chúng ta ngừng gõ
        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
}
export default useDebounce;
